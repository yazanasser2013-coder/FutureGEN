# news_scrape_rss_translate.py
# يجلب أخبار من RSS + صورة شغّالة + محتوى + ترجمة عربية ويخرج JSON بالنمط الذي طلبته


import os, re, json, time, hashlib
from datetime import datetime
from urllib.parse import urlparse, urljoin


import feedparser
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm


# Readability (اختياري لكنه يعطي body أفضل)
try:
    from readability import Document
    HAS_READABILITY = True
except Exception:
    HAS_READABILITY = False


from transformers import MarianMTModel, MarianTokenizer


# ================== المسارات ==================
PROJECT_DIR = r"E:\Yazan Nasser\FutureGEN"
OUT_PATH = os.path.join(PROJECT_DIR, "site", "data", "news.json")
TEMP_PATH = os.path.join(PROJECT_DIR, "scrapers", "news_temp.json")


# ================== مصادر الأخبار (RSS) ==================
# تقدر تزيد/تنقص بسهولة
RSS_FEEDS = [
    "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    "https://www.technologyreview.com/feed/",
    "https://feeds.arstechnica.com/arstechnica/index",
    "https://venturebeat.com/category/ai/feed/",
    "https://hnrss.org/frontpage",
]


UA = "Mozilla/5.0 Chrome/123 Safari/537.36"


# ================== تصنيفات الأخبار ==================
CATEGORY_MAP = {
    "ai": ("AI", "الذكاء الاصطناعي"),
    "artificial intelligence": ("AI", "الذكاء الاصطناعي"),
    "machine learning": ("AI", "الذكاء الاصطناعي"),
    "future": ("Future Trends", "توجهات مستقبلية"),
    "trends": ("Future Trends", "توجهات مستقبلية"),
    "research": ("Research", "البحث"),
    "business": ("Business", "الأعمال"),
    "security": ("Security", "الأمن"),
    "policy": ("Policy", "السياسات"),
}
DEFAULT_CAT = ("AI News", "أخبار الذكاء الاصطناعي")


# ================== الترجمة (مجانية/أوفلاين) ==================
MODEL_NAME = "Helsinki-NLP/opus-mt-en-ar"
tokenizer = MarianTokenizer.from_pretrained(MODEL_NAME)
model = MarianMTModel.from_pretrained(MODEL_NAME)


MAX_CHARS = 1500
BATCH = 16


def shorten(text: str) -> str:
    text = (text or "").strip()
    return text[:MAX_CHARS] if len(text) > MAX_CHARS else text


def translate_batch(texts):
    texts = [shorten(t) for t in texts]
    if not any(t.strip() for t in texts):
        return ["" for _ in texts]
    batch = tokenizer(texts, return_tensors="pt", padding=True, truncation=True, max_length=256)
    out = model.generate(**batch, max_length=256, num_beams=3)
    return [tokenizer.decode(o, skip_special_tokens=True) for o in out]


def strip_text(html: str) -> str:
    try:
        soup = BeautifulSoup(html or "", "lxml")
        return soup.get_text(" ", strip=True)
    except Exception:
        return (html or "").strip()


def escape_html(s):
    return (s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;"))


def to_para_html(text):
    text = (text or "").strip()
    if not text:
        return ""
    parts = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]
    if not parts:
        return ""
    # خفف العدد عشان ملفك ما يصير ضخم
    return "\n".join([f"<p>{escape_html(p)}</p>" for p in parts[:20]])


def norm_url(u: str) -> str:
    u = (u or "").strip()
    try:
        p = urlparse(u)
        return p._replace(query="", fragment="").geturl()
    except Exception:
        return u


def stable_id(url: str) -> str:
    return hashlib.md5(url.encode("utf-8")).hexdigest()[:12]


def entry_date(entry) -> str:
    for key in ("published_parsed", "updated_parsed"):
        if entry.get(key):
            dt = datetime(*entry[key][:6])
            return dt.strftime("%Y-%m-%d")
    return datetime.utcnow().strftime("%Y-%m-%d")


def pick_category(entry) -> tuple:
    cats = []
    for c in entry.get("tags", []) or []:
        term = (c.get("term") or "").lower()
        if term:
            cats.append(term)
    title = (entry.get("title") or "").lower()
    blob = " ".join(cats + [title])
    for k, v in CATEGORY_MAP.items():
        if k in blob:
            return v
    return DEFAULT_CAT


def author_name(entry):
    return (entry.get("author") or entry.get("dc_creator") or "").strip()


def first_img_in_html(html: str) -> str:
    html = html or ""
    if "<img" not in html.lower():
        return ""
    try:
        soup = BeautifulSoup(html, "lxml")
        im = soup.find("img")
        if im and im.get("src"):
            return im.get("src")
    except Exception:
        pass
    return ""


def extract_image_from_entry(entry) -> str:
    media = entry.get("media_content") or entry.get("media_thumbnail") or []
    if media:
        u = media[0].get("url") or ""
        if u:
            return u


    enc = entry.get("enclosures") or []
    for e in enc:
        u = e.get("href") or e.get("url") or ""
        t = (e.get("type") or "").lower()
        if u and ("image" in t or u.lower().endswith((".jpg",".jpeg",".png",".webp",".gif"))):
            return u


    for block in entry.get("content", []) or []:
        html = block.get("value") or ""
        img = first_img_in_html(html)
        if img:
            return img


    img = first_img_in_html(entry.get("summary", "") or "")
    if img:
        return img


    return ""


def fetch_html(url: str) -> str:
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=18)
        if r.status_code != 200:
            return ""
        return r.text
    except Exception:
        return ""


def og_image_from_html(html: str, base_url: str) -> str:
    if not html:
        return ""
    try:
        soup = BeautifulSoup(html, "lxml")
        m = soup.find("meta", attrs={"property":"og:image"})
        if m and m.get("content"):
            u = m["content"].strip()
            if u.startswith("//"):
                u = "https:" + u
            if u.startswith("/"):
                u = urljoin(base_url, u)
            return u
    except Exception:
        pass
    return ""


def body_html_from_entry_or_readability(entry, html: str) -> str:
    # 1) RSS content (أفضل لأنه جاهز HTML)
    blocks = entry.get("content", []) or []
    for b in blocks:
        v = (b.get("value") or "").strip()
        if len(strip_text(v)) > 200:
            return v


    # 2) summary
    summ = (entry.get("summary") or "").strip()
    if len(strip_text(summ)) > 200:
        return summ


    # 3) Readability من الصفحة
    if HAS_READABILITY and html:
        try:
            doc = Document(html)
            content_html = doc.summary(html_partial=True)
            if len(strip_text(content_html)) > 200:
                return content_html
        except Exception:
            pass


    # 4) fallback: أول فقرات من الصفحة
    if html:
        try:
            soup = BeautifulSoup(html, "lxml")
            ps = soup.find_all("p")
            parts = []
            for p in ps[:12]:
                t = p.get_text(" ", strip=True)
                if len(t) > 40:
                    parts.append(f"<p>{escape_html(t)}</p>")
            return "\n".join(parts)
        except Exception:
            pass


    return ""


def main():
    items = []
    seen = set()


    print("📰 Fetching RSS feeds ...")
    for feed_url in RSS_FEEDS:
        d = feedparser.parse(feed_url)
        for e in d.entries:
            link = norm_url(e.get("link") or "")
            if not link or link in seen:
                continue
            seen.add(link)


            cat_en, cat_ar = pick_category(e)


            item = {
                "title_en": (e.get("title") or "").strip(),
                "title_ar": "",
                "summary_en": strip_text(e.get("summary") or ""),
                "summary_ar": "",
                "category_en": cat_en,
                "category_ar": cat_ar,
                "date": entry_date(e),
                "author_en": author_name(e) or "",
                "author_ar": "",
                "image": "",
                "body_en": "",
                "body_ar": "",
                # اختياري: مفيد للتتبع
                "source_url": link,
                "id": stable_id(link),
            }


            item["image"] = extract_image_from_entry(e) or ""
            items.append((item, e))


    print(f"🧩 Enriching {len(items)} articles (body/image) ...")
    enriched = []
    for (item, entry) in tqdm(items, desc="Enrich", total=len(items)):
        url = item["source_url"]


        html = ""
        # اجلب صفحة الخبر فقط إذا نحتاج body أو نحتاج صورة
        need_fetch = (not item["image"]) or (len(item["summary_en"]) < 80)
        if need_fetch:
            html = fetch_html(url)


        if not item["image"]:
            item["image"] = og_image_from_html(html, url) or ""


        body_html = body_html_from_entry_or_readability(entry, html)
        item["body_en"] = body_html


        if not item["summary_en"]:
            item["summary_en"] = strip_text(body_html)[:240]


        enriched.append(item)


        if len(enriched) % 25 == 0:
            os.makedirs(os.path.dirname(TEMP_PATH), exist_ok=True)
            with open(TEMP_PATH, "w", encoding="utf-8") as f:
                json.dump(enriched, f, ensure_ascii=False, indent=2)


        time.sleep(0.08)


    print("🌍 Translating to Arabic ...")
    total = len(enriched)
    for i in tqdm(range(0, total, BATCH), desc="Translate batches"):
        chunk = enriched[i:i+BATCH]


        titles = [c["title_en"] for c in chunk]
        sums   = [c["summary_en"] for c in chunk]
        auths  = [c["author_en"] for c in chunk]
        cats   = [c["category_en"] for c in chunk]
        body_text = [strip_text(c["body_en"]) for c in chunk]


        tr_titles = translate_batch(titles)
        tr_sums   = translate_batch(sums)
        tr_auths  = translate_batch(auths)
        tr_cats   = translate_batch(cats)
        tr_body   = translate_batch([t[:1200] for t in body_text])


        for j, c in enumerate(chunk):
            c["title_ar"] = tr_titles[j]
            c["summary_ar"] = tr_sums[j]
            c["author_ar"] = tr_auths[j]
            c["category_ar"] = tr_cats[j]
            c["body_ar"] = to_para_html(tr_body[j])


        remain = total - (i + len(chunk))
        tqdm.write(f"Remaining: {remain}")


    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(enriched, f, ensure_ascii=False, indent=2)


    print("\n✅ DONE")
    print("Articles:", len(enriched))
    print("Saved:", OUT_PATH)


if __name__ == "__main__":
    main()




