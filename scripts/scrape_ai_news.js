/**
 * FutureGEN AI News Scraper (Robust)
 * - First run: collect 50 articles
 * - Daily: add 6 new articles from last 24h
 * - External image URLs only (no proxy, no downloads)
 * - Retry/backoff for feeds & article fetch
 * - Outputs: scraped_data/ai_news.json + scraped_data/ai_news_index.json
 */


const axios = require("axios");
const cheerio = require("cheerio");
const translate = require("@vitalets/google-translate-api");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");


// ============= Paths =============
const OUT_FILE = path.join("scraped_data", "ai_news.json");
const INDEX_FILE = path.join("scraped_data", "ai_news_index.json");


// ============= Feeds =============
// زودنا مصادر RSS قوية لرفع احتمالية الوصول لـ 50 بسهولة.
// تقدر تضيف/تحذف مصادر (لازم تكون RSS صالح).
const FEEDS = [
  { name: "AI News", url: "https://www.artificialintelligence-news.com/feed/" },
  { name: "TechCrunch AI", url: "https://techcrunch.com/tag/artificial-intelligence/feed/" },
  { name: "The Verge AI", url: "https://www.theverge.com/artificial-intelligence/rss/index.xml" },
];


// ============= Rules =============
const FIRST_RUN_TARGET = 50;
const DAILY_NEW_LIMIT = 6;
const DAILY_WINDOW_HOURS = 24;


// نفحص كثير عشان نضمن أول تشغيل 50 حتى لو بعض الروابط تفشل
const RSS_SCAN_LIMIT_PER_FEED = 1200;


// تهدئة أساسية بين المقالات
const BASE_SLEEP_MS = 900;


// أقصى عدد نحتفظ به في الملف (تاريخيًا)
const MAX_STORE = 800;


// Retry/Backoff
const FEED_MAX_ATTEMPTS = 3;
const ARTICLE_MAX_ATTEMPTS = 4;
const BACKOFF_BASE_MS = 1200;
const BACKOFF_JITTER_MS = 700;


const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; FutureGEN-NewsBot/2.0; +https://futuregen.space/)",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};


// ============= Helpers =============
function ensureDirForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}


function loadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return fallback;
  }
}


function saveJson(filePath, data) {
  ensureDirForFile(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
}


function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}


function jitter(ms) {
  return ms + Math.floor(Math.random() * BACKOFF_JITTER_MS);
}


function parseRssDateToMs(dateStr) {
  const ms = Date.parse(dateStr || "");
  return Number.isFinite(ms) ? ms : null;
}


function md5(s) {
  return crypto.createHash("md5").update(s).digest("hex");
}


function pickFirst(...vals) {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}


function isRetryableAxiosError(e) {
  const status = e?.response?.status;
  if (!status) return true; // network/timeouts
  if (status === 408 || status === 429) return true;
  if (status >= 500 && status <= 599) return true;
  return false;
}


async function withRetry(fn, { attempts, label }) {
  let lastErr = null;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn(i);
    } catch (e) {
      lastErr = e;
      const status = e?.response?.status;
      const retryable = isRetryableAxiosError(e);


      console.log(
        `❌ ${label} attempt ${i}/${attempts} failed${status ? ` (HTTP ${status})` : ""}: ${e.message}`
      );


      if (!retryable || i === attempts) break;


      const backoff = jitter(BACKOFF_BASE_MS * Math.pow(2, i - 1));
      console.log(`⏳ Backoff ${backoff}ms then retry...`);
      await sleep(backoff);
    }
  }
  throw lastErr;
}


// ============= Translation (best-effort, لا يكسر الخبر) =============
async function tr_en_ar(text) {
  if (!text) return "";
  try {
    const res = await translate(text, { from: "en", to: "ar" });
    return res.text || "";
  } catch {
    return "";
  }
}


async function translateHtml_en_to_ar(html) {
  if (!html) return "";
  const $ = cheerio.load(html);


  const tasks = [];
  $("*")
    .contents()
    .each(function () {
      if (this.type === "text" && this.data.trim()) {
        const original = this.data;
        tasks.push(
          tr_en_ar(original)
            .then((translated) => {
              if (translated) $(this).replaceWith(translated);
            })
            .catch(() => {})
        );
      }
    });


  await Promise.all(tasks);
  return "\n                " + $.html().trim() + "\n            ";
}


// ============= Scrape Article -> schema =============
async function get_article_json(url, fallbackCategoryEn) {
  const res = await axios.get(url, { headers: HEADERS, timeout: 35000 });
  const $ = cheerio.load(res.data);


  // Title
  const title_en = pickFirst(
    $('meta[property="og:title"]').attr("content"),
    $("h1").first().text()
  );


  // Date
  let date_iso = "";
  const published = pickFirst(
    $('meta[property="article:published_time"]').attr("content"),
    $("time").first().attr("datetime"),
    $('meta[name="pubdate"]').attr("content"),
    $('meta[name="date"]').attr("content")
  );
  if (published) date_iso = published.slice(0, 10);


  // Author
  const author_en = pickFirst(
    $('meta[name="author"]').attr("content"),
    $('a[rel="author"]').first().text(),
    $('span[class*="author"]').first().text()
  );


  // Category
  const category_en = pickFirst(
    $('meta[property="article:section"]').attr("content"),
    $('a[href*="/category/"]').first().text(),
    fallbackCategoryEn || "Artificial Intelligence"
  );


  // Image (external only)
  const image = pickFirst(
    $('meta[property="og:image"]').attr("content"),
    $('meta[name="twitter:image"]').attr("content")
  );


  // Summary
  const summary_en = pickFirst(
    $('meta[name="description"]').attr("content"),
    $('meta[property="og:description"]').attr("content")
  );


  // Body HTML best-effort
  let body_en = "";
  const article = $("article").first();
  const allowed = ["p", "h2", "h3", "ul", "ol", "li", "blockquote"];


  if (article.length) {
    const parts = [];
    article.find(allowed.join(", ")).each((i, el) => parts.push($.html(el)));
    if (parts.length) body_en = "\n                " + parts.join("\n                ").trim() + "\n            ";
  } else {
    const main = $("main").first();
    if (main.length) {
      const parts = [];
      main.find(allowed.join(", ")).each((i, el) => parts.push($.html(el)));
      if (parts.length) body_en = "\n                " + parts.join("\n                ").trim() + "\n            ";
    }
  }


  // Arabic fields (best-effort)
  const title_ar = (await tr_en_ar(title_en)) || title_en;
  const summary_ar = (await tr_en_ar(summary_en)) || "";
  const category_ar = (await tr_en_ar(category_en)) || "";
  const author_ar = (await tr_en_ar(author_en)) || "";
  const body_ar = body_en ? await translateHtml_en_to_ar(body_en) : "";


  return {
    id: "article_" + md5(url).slice(0, 12),
    title_en,
    title_ar,
    summary_en,
    summary_ar,
    category_en,
    category_ar,
    date: date_iso,
    author_en,
    author_ar,
    image, // external only
    link: url,
    body_en: body_en || "",
    body_ar: body_ar || "",
  };
}


// ============= Read RSS Items (with retry) =============
async function readFeedItems(feed) {
  return await withRetry(
    async () => {
      const rssRes = await axios.get(feed.url, { headers: HEADERS, timeout: 30000 });
      const $ = cheerio.load(rssRes.data, { xmlMode: true });


      const items = [];
      $("item").each((i, el) => {
        if (i >= RSS_SCAN_LIMIT_PER_FEED) return false;


        const $el = $(el);
        const link = ($el.find("link").text().trim() || "").trim();
        const pubDate = $el.find("pubDate").text().trim();
        const pubMs = parseRssDateToMs(pubDate);
        const cat = $el.find("category").first().text().trim();


        if (!link) return;
        items.push({ link, pubMs, category: cat || "", feedName: feed.name });
      });


      return items;
    },
    { attempts: FEED_MAX_ATTEMPTS, label: `Feed ${feed.name}` }
  );
}


// ============= Main =============
async function main() {
  ensureDirForFile(OUT_FILE);
  ensureDirForFile(INDEX_FILE);


  const existing = loadJson(OUT_FILE, { metadata: {}, articles: [] });
  const index = loadJson(INDEX_FILE, { seen_urls: [] });


  const seen = new Set(Array.isArray(index.seen_urls) ? index.seen_urls : []);
  const existingArticles = Array.isArray(existing.articles) ? existing.articles : [];


  const isFirstRun = existingArticles.length === 0;


  const nowMs = Date.now();
  const cutoffMs = nowMs - DAILY_WINDOW_HOURS * 60 * 60 * 1000;


  // 1) Collect candidates from all feeds
  const candidates = [];
  for (const feed of FEEDS) {
    try {
      const items = await readFeedItems(feed);
      for (const it of items) {
        if (seen.has(it.link)) continue;


        if (isFirstRun) {
          candidates.push(it);
        } else {
          if (it.pubMs && it.pubMs >= cutoffMs) candidates.push(it);
        }
      }
    } catch (e) {
      console.log(`❌ Feed permanently failed: ${feed.name} -> ${e.message}`);
    }
  }


  // newest first
  candidates.sort((a, b) => (b.pubMs || 0) - (a.pubMs || 0));


  const articles = [...existingArticles];
  let added = 0;
  let attempted = 0;


  // 2) Decide limit for this run
  const runLimit = isFirstRun ? FIRST_RUN_TARGET : DAILY_NEW_LIMIT;


  // 3) Fetch articles with retry/backoff until reaching runLimit
  for (const c of candidates) {
    if (added >= runLimit) break;


    attempted++;
    try {
      const item = await withRetry(
        async (tryNo) => {
          // Mild sleep to reduce bans; increase a bit on first run
          if (tryNo === 1) await sleep(isFirstRun ? BASE_SLEEP_MS : 450);
          return await get_article_json(c.link, c.category);
        },
        { attempts: ARTICLE_MAX_ATTEMPTS, label: `Article ${c.feedName}` }
      );


      // Basic validation: must have title + link
      if (!item.title_en || !item.link) throw new Error("Invalid article (missing title/link)");


      articles.push(item);
      seen.add(c.link);
      added++;
      console.log(`✅ Added: ${item.title_en}`);
    } catch (e) {
      console.log(`🔥 Give up: ${c.link}`);
      // do not add to seen so it can be retried later
    }
  }


  // 4) Sort & trim
  articles.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const trimmed = articles.slice(0, MAX_STORE);


  const output = {
    metadata: {
      sources: FEEDS.map((f) => f.url),
      total_articles: trimmed.length,
      scraped_at: new Date().toISOString(),
      mode: isFirstRun ? "first_run_50" : "daily_add_6_last_24h",
      attempted,
      added,
      images: "external_only",
      retry: {
        feed_attempts: FEED_MAX_ATTEMPTS,
        article_attempts: ARTICLE_MAX_ATTEMPTS,
        backoff_base_ms: BACKOFF_BASE_MS,
      },
    },
    articles: trimmed,
  };


  saveJson(OUT_FILE, output);
  saveJson(INDEX_FILE, { seen_urls: Array.from(seen) });


  console.log(`\n📝 Updated: ${OUT_FILE}`);
  console.log(`Mode: ${output.metadata.mode} | Added this run: ${added} | Total stored: ${trimmed.length}`);
}


if (require.main === module) {
  main();
}




