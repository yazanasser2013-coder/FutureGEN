const axios = require('axios');
const cheerio = require('cheerio');
const translate = require('@vitalets/google-translate-api');
const fs = require('fs');
const path = require('path');


const RSS_URL = "https://techcrunch.com/tag/artificial-intelligence/feed/";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; FutureGEN-NewsBot/1.0)"
};


// ✅ مخرجات موقعك
const OUT_FILE = path.join("public_html", "data", "ai_news.json");


// ✅ ملف مساعد لمنع التكرار (urls فقط)
const INDEX_FILE = path.join("public_html", "data", "ai_news_index.json");


// إعدادات التشغيل
const FIRST_RUN_COUNT = 50;
const RSS_SCAN_LIMIT = 200;      // نفحص من RSS عدد أكبر حتى نلتقط كل أخبار 24 ساعة
const SLEEP_S = 1.0;


function ensureDirForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}


function loadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return fallback;
  }
}


function saveJson(filePath, data) {
  ensureDirForFile(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
}


function parseRssDateToMs(dateStr) {
  // pubDate مثل: "Sun, 21 Dec 2025 10:00:00 +0000"
  const ms = Date.parse(dateStr || "");
  return Number.isFinite(ms) ? ms : null;
}


// ---------- Translation helpers ----------
async function tr_en_ar(text) {
  if (!text) return "";
  const max_len = 12000; // تقسيم احتياطي
  if (text.length <= max_len) {
    try {
      const res = await translate(text, { from: 'en', to: 'ar' });
      return res.text;
    } catch {
      return text;
    }
  }
  const out = [];
  for (let i = 0; i < text.length; i += max_len) {
    try {
      const res = await translate(text.slice(i, i + max_len), { from: 'en', to: 'ar' });
      out.push(res.text);
    } catch {
      out.push(text.slice(i, i + max_len));
    }
  }
  return out.join("");
}


async function translate_html_en_to_ar(html) {
  if (!html) return "";
  const $ = cheerio.load(html);
  const promises = [];
  $('*').contents().each(function () {
    if (this.type === 'text' && this.data.trim()) {
      promises.push(
        tr_en_ar(this.data).then(translated => {
          $(this).replaceWith(translated);
        }).catch(() => {})
      );
    }
  });
  await Promise.all(promises);
  return "\n                " + $.html().trim() + "\n            ";
}


// ---------- Scraping helpers ----------
async function get_article_json(url) {
  const res = await axios.get(url, { headers: HEADERS, timeout: 30000 });
  const $ = cheerio.load(res.data);


  const title_en = $('h1').first().text().trim();


  let date_iso = "";
  const time_el = $('time').first();
  if (time_el.attr('datetime')) date_iso = time_el.attr('datetime').slice(0, 10);


  let author_en = "";
  const a_author = $('a[rel="author"]').first();
  if (a_author.length) {
    author_en = a_author.text().trim();
  } else {
    const meta_author = $('meta[name="author"]').first();
    if (meta_author.attr('content')) author_en = meta_author.attr('content').trim();
  }


  let category_en = "Artificial Intelligence";
  const tag = $('a[aria-label="Tag"]').first().length ? $('a[aria-label="Tag"]').first() : $('a[href*="/tag/"]').first();
  if (tag.length) {
    const t = tag.text().trim();
    if (t) category_en = t;
  }


  let image = "";
  const og = $('meta[property="og:image"]').first();
  if (og.attr('content')) image = og.attr('content').trim();


  let summary_en = "";
  const desc = $('meta[name="description"]').first();
  if (desc.attr('content')) {
    summary_en = desc.attr('content').trim();
  } else {
    const first_p = $('article p').first();
    if (first_p.length) summary_en = first_p.text().trim();
  }


  let body_en_html = "";
  const article = $('article');
  if (article.length) {
    const allowed = ["p", "h2", "h3", "ul", "ol", "li", "blockquote"];
    const parts = [];
    article.find(allowed.join(', ')).each((i, el) => parts.push($.html(el)));
    body_en_html = "\n                " + parts.join("\n                ").trim() + "\n            ";
  }


  const title_ar = title_en ? await tr_en_ar(title_en) : "";
  const summary_ar = summary_en ? await tr_en_ar(summary_en) : "";
  const category_ar = category_en ? await tr_en_ar(category_en) : "";
  const author_ar = author_en ? await tr_en_ar(author_en) : "";
  const body_ar_html = body_en_html ? await translate_html_en_to_ar(body_en_html) : "";


  // ✅ نفس القالب بدون أي مفاتيح إضافية (مثل سكربتك الحالي)  [oai_citation:2‡scrape_ai_news.js](sediment://file_00000000fd5c71fd8475dfcb9006f135)
  return {
    "title_en": title_en,
    "title_ar": title_ar,
    "summary_en": summary_en,
    "summary_ar": summary_ar,
    "category_en": category_en,
    "category_ar": category_ar,
    "date": date_iso,
    "author_en": author_en,
    "author_ar": author_ar,
    "image": image,
    "body_en": body_en_html,
    "body_ar": body_ar_html,
  };
}


async function main() {
  ensureDirForFile(OUT_FILE);
  ensureDirForFile(INDEX_FILE);


  const existingItems = loadJson(OUT_FILE, []);
  const index = loadJson(INDEX_FILE, { seen_urls: [] });


  const seen = new Set(Array.isArray(index.seen_urls) ? index.seen_urls : []);
  const isFirstRun = !Array.isArray(existingItems) || existingItems.length === 0;


  // Parse RSS feed
  const rssRes = await axios.get(RSS_URL, { headers: HEADERS });
  const $rss = cheerio.load(rssRes.data, { xmlMode: true });


  const nowMs = Date.now();
  const cutoffMs = nowMs - (24 * 60 * 60 * 1000);


  const candidates = [];
  $rss('item').each((i, el) => {
    if (i >= RSS_SCAN_LIMIT) return false;
    const $el = $rss(el);


    const link = ($el.find('link').text().trim() || $el.find('link').attr('href') || "").trim();
    const pubDate = $el.find('pubDate').text().trim();
    const pubMs = parseRssDateToMs(pubDate);


    if (!link) return;


    // منع التكرار
    if (seen.has(link)) return;


    if (isFirstRun) {
      candidates.push({ link, pubMs });
    } else {
      // ✅ فقط أخبار آخر 24 ساعة
      if (pubMs && pubMs >= cutoffMs) candidates.push({ link, pubMs });
    }
  });


  // أول تشغيل: خذ أول 50
  const toFetch = isFirstRun ? candidates.slice(0, FIRST_RUN_COUNT) : candidates;


  const items = Array.isArray(existingItems) ? existingItems : [];
  let newCount = 0;


  for (const e of toFetch) {
    try {
      const item = await get_article_json(e.link);
      items.push(item);
      seen.add(e.link);
      newCount++;
      console.log(`✅ Added: ${item.title_en}`);
    } catch (ex) {
      console.log(`❌ Failed: ${e.link} -> ${ex.message}`);
    }
    await new Promise(r => setTimeout(r, SLEEP_S * 1000));
  }


  // ترتيب حسب التاريخ (YYYY-MM-DD) تنازليًا
  items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  saveJson(OUT_FILE, items);
  saveJson(INDEX_FILE, { seen_urls: Array.from(seen) });


  console.log(`\n📝 Updated: ${OUT_FILE}`);
  console.log(`New items: ${newCount} | Total: ${items.length}`);
  console.log(`Mode: ${isFirstRun ? "FIRST RUN (50)" : "DAILY (last 24h)"}`);
}


if (require.main === module) {
  main();
}
