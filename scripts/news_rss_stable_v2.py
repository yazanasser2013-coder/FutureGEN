# news_rss_stable_v2.py
# Stable RSS News → image/body → optional Arabic translation → JSON
# Run: python news_rss_stable_v2.py

import os
import re
import json
import time
import hashlib
from datetime import datetime
from urllib.parse import urlparse, urljoin

import feedparser
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

# ======================= SETTINGS =======================
PROJECT_DIR = r"D:\Yazan Nasser\FutureGEN"
OUT_PATH  = os.path.join(PROJECT_DIR, "scraped_data", "news.json")
TEMP_PATH = os.path.join(PROJECT_DIR, "scrapers", "news_checkpoint.json")

# RSS sources (عدّلها كما تريد)
RSS_FEEDS = [
    "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    "https://www.technologyreview.com/feed/",
    "https://feeds.arstechnica.com/arstechnica/index",
    "https://venturebeat.com/category/ai/feed/",
    "https://hnrss.org/frontpage",
]

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36"

# -------- Translation (optional) --------
ENABLE_TRANSLATION = True   # اجعله False لو ما تبغى ترجمة
MODEL_NAME = "Helsinki-NLP/opus-mt-en-ar"
TRANSLATE_BATCH = 12
MAX_TRANSLATE_CHARS = 1200

# Save checkpoint every N items
CHECKPOINT_EVERY = 30

# ======================= UTILITIES =======================
def ensure_dir(path: str):
    d = os.path.dirname(path)
    if d:
        os.makedirs(d, exist_ok=True)

def norm_url(u: str) -> str:
    u = (u or "").strip()
    try:
        p = urlparse(u)
        return p._replace(query="", fragment="").geturl()
    except Exception:
        return u

def stable_id(url: str) -> str:
    return hashlib.md5((url or "").encode("utf-8")).hexdigest()[:12]

def strip_text(html: str) -> str:
    try:
        soup = BeautifulSoup(html or "", "lxml")
        return soup.get_text(" ", strip=True)
    except Exception:
        return (html or "").strip()

def escape_html(s: str) -> str:
    s = s or ""
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def text_to_paragraphs_html(text: str, max_paras: int = 20) -> str:
    text = (text or "").strip()
    if not text:
        return ""
    parts = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]
    parts = parts[:max_paras]
    return "\n".join([f"<p>{escape_html(p)}</p>" for p in parts])

def safe_get_html(url: str, timeout: int = 15) -> str:
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=timeout)
        if r.status_code != 200:
            return ""
        return r.text
    except Exception:
        return ""

def first_img_from_html(html: str) -> str:
    if not html:
        return ""
    try:
        soup = BeautifulSoup(html, "lxml")
        img = soup.find("img")
        if img and img.get("src"):
            return (img.get("src") or "").strip()
    except Exception:
        pass
    return ""

def og_image_from_html(html: str, base_url: str) -> str:
    if not html:
        return ""
    try:
        soup = BeautifulSoup(html, "lxml")
        m = soup.find("meta", attrs={"property": "og:image"})
        if m and m.get("content"):
            u = (m.get("content") or "").strip()
            if u.startswith("//"):
                u = "https:" + u
            if u.startswith("/"):
                u = urljoin(base_url, u)
            return u
    except Exception:
        pass
    return ""

def image_from_entry(entry) -> str:
    # media:content / media:thumbnail
    try:
        media = entry.get("media_content") or entry.get("media_thumbnail") or []
        if media and isinstance(media, list):
            u = (media[0].get("url") or "").strip()
            if u:
                return u
    except Exception:
        pass

    # enclosures
    try:
        enc = entry.get("enclosures") or []
        if enc and isinstance(enc, list):
            for e in enc:
                u = (e.get("href") or e.get("url") or "").strip()
                t = (e.get("type") or "").lower()
                if u and ("image" in t or u.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif"))):
                    return u
    except Exception:
        pass

    # content/summary img
    try:
        content_blocks = entry.get("content") or []
        if content_blocks:
            for b in content_blocks:
                html = (b.get("value") or "")
                img = first_img_from_html(html)
                if img:
                    return img
    except Exception:
        pass

    try:
        img = first_img_from_html(entry.get("summary") or "")
        if img:
            return img
    except Exception:
        pass

    return ""

def entry_date(entry) -> str:
    for key in ("published_parsed", "updated_parsed"):
        try:
            if entry.get(key):
                dt = datetime(*entry[key][:6])
                return dt.strftime("%Y-%m-%d")
        except Exception:
            pass
    return datetime.utcnow().strftime("%Y-%m-%d")

def save_checkpoint(items):
    try:
        ensure_dir(TEMP_PATH)
        with open(TEMP_PATH, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
    except Exception:
        pass

# ======================= TRANSLATION =======================
tokenizer = None
model = None

def lazy_load_translation():
    global tokenizer, model
    if not ENABLE_TRANSLATION:
        return
    if tokenizer is not None and model is not None:
        return
    # Import here to avoid crashes if user disables translation
    from transformers import MarianMTModel, MarianTokenizer
    tokenizer = MarianTokenizer.from_pretrained(MODEL_NAME)
    model = MarianMTModel.from_pretrained(MODEL_NAME)

def shorten_for_mt(s: str) -> str:
    s = (s or "").strip()
    return s[:MAX_TRANSLATE_CHARS] if len(s) > MAX_TRANSLATE_CHARS else s

def translate_batch(texts):
    if not ENABLE_TRANSLATION:
        return [""] * len(texts)

    lazy_load_translation()

    clean = [shorten_for_mt(t) for t in texts]
    if not any(t.strip() for t in clean):
        return [""] * len(clean)

    batch = tokenizer(clean, return_tensors="pt", padding=True, truncation=True, max_length=256)
    out = model.generate(**batch, max_length=256, num_beams=3)
    return [tokenizer.decode(o, skip_special_tokens=True) for o in out]

# ======================= MAIN PIPELINE =======================
def main():
    seen = set()
    collected = []

    print("📰 Reading RSS feeds...", flush=True)
    for feed_url in RSS_FEEDS:
        try:
            parsed = feedparser.parse(feed_url)
            entries = parsed.entries or []
        except Exception:
            entries = []

        for e in entries:
            link = norm_url(e.get("link") or "")
            if not link or link in seen:
                continue
            seen.add(link)

            title = (e.get("title") or "").strip()
            summary_html = (e.get("summary") or "").strip()
            summary_text = strip_text(summary_html)

            item = {
                "id": stable_id(link),
                "title_en": title,
                "title_ar": "",
                "summary_en": summary_text,
                "summary_ar": "",
                "category_en": "AI News",
                "category_ar": "أخبار الذكاء الاصطناعي",
                "date": entry_date(e),
                "author_en": (e.get("author") or "").strip(),
                "author_ar": "",
                "image": image_from_entry(e),
                "body_en": "",
                "body_ar": "",
                "source_url": link,
            }

            # Prefer RSS content if exists
            body_html = ""
            try:
                content_blocks = e.get("content") or []
                if content_blocks and isinstance(content_blocks, list):
                    body_html = (content_blocks[0].get("value") or "").strip()
            except Exception:
                body_html = ""

            if not body_html:
                body_html = summary_html

            item["body_en"] = body_html
            collected.append((item, e))

    print(f"🧩 Enriching {len(collected)} articles (image/body)...", flush=True)
    enriched = []

    for idx, (item, entry) in enumerate(tqdm(collected, desc="Enrich", total=len(collected))):
        url = item["source_url"]

        # If body too short OR no image -> fetch page
        body_plain = strip_text(item["body_en"])
        need_fetch = (len(body_plain) < 250) or (not item["image"])

        page_html = ""
        if need_fetch:
            page_html = safe_get_html(url, timeout=18)

        # Fix image by og:image
        if not item["image"] and page_html:
            item["image"] = og_image_from_html(page_html, url) or ""

        # Fix body by taking first paragraphs from page
        if len(body_plain) < 250 and page_html:
            try:
                soup = BeautifulSoup(page_html, "lxml")
                ps = soup.find_all("p")
                parts = []
                for p in ps[:14]:
                    t = p.get_text(" ", strip=True)
                    if len(t) > 40:
                        parts.append(t)
                if parts:
                    item["body_en"] = text_to_paragraphs_html("\n\n".join(parts))
            except Exception:
                pass

        # Summary fallback
        if not item["summary_en"]:
            item["summary_en"] = strip_text(item["body_en"])[:240]

        enriched.append(item)

        if (idx + 1) % CHECKPOINT_EVERY == 0:
            save_checkpoint(enriched)

        time.sleep(0.02)

    # Translation
    if ENABLE_TRANSLATION:
        print("🌍 Translating to Arabic (title/summary/author/body)...", flush=True)
        total = len(enriched)

        for start in tqdm(range(0, total, TRANSLATE_BATCH), desc="Translate"):
            chunk = enriched[start:start + TRANSLATE_BATCH]

            titles = [c["title_en"] for c in chunk]
            sums   = [c["summary_en"] for c in chunk]
            auths  = [c["author_en"] for c in chunk]
            bodies = [strip_text(c["body_en"]) for c in chunk]

            try:
                tr_titles = translate_batch(titles)
                tr_sums   = translate_batch(sums)
                tr_auths  = translate_batch(auths)
                tr_body   = translate_batch(bodies)
            except Exception:
                tr_titles = [""] * len(chunk)
                tr_sums   = [""] * len(chunk)
                tr_auths  = [""] * len(chunk)
                tr_body   = [""] * len(chunk)

            for i, c in enumerate(chunk):
                c["title_ar"]   = tr_titles[i]
                c["summary_ar"] = tr_sums[i]
                c["author_ar"]  = tr_auths[i]
                c["body_ar"]    = text_to_paragraphs_html(tr_body[i])

            remaining = total - (start + len(chunk))
            tqdm.write(f"Remaining: {remaining}")

            if (start // TRANSLATE_BATCH + 1) % 5 == 0:
                save_checkpoint(enriched)

    # Save final
    ensure_dir(OUT_PATH)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(enriched, f, ensure_ascii=False, indent=2)

    print("\n✅ DONE", flush=True)
    print("Articles:", len(enriched))
    print("Saved:", OUT_PATH)
    if os.path.exists(TEMP_PATH):
        print("Checkpoint:", TEMP_PATH)

if __name__ == "__main__":
    main()


