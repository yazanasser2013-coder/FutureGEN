const axios = require('axios');
const cheerio = require('cheerio');
const translate = require('@vitalets/google-translate-api');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


// =========================
// OUTPUT (كما عندك)
// =========================
const OUT_FILE = path.join("scraped_data", "ai_news.json");
const INDEX_FILE = path.join("scraped_data", "ai_news_index.json");


// =========================
// SOURCES (زودنا أكثر من RSS لضمان 50)
// غيّر/احذف/أضف حسب رغبتك
// =========================
const FEEDS = [
    { name: "AI News", url: "https://www.artificialintelligence-news.com/feed/" },
    { name: "TechCrunch AI", url: "https://techcrunch.com/tag/artificial-intelligence/feed/" }
];


// =========================
// RULES
// =========================
const FIRST_RUN_TARGET = 50;      // أول تشغيل
const DAILY_WINDOW_HOURS = 24;    // بعدها آخر 24 ساعة
const RSS_SCAN_LIMIT_PER_FEED = 800; // نفحص عدد كبير لضمان الوصول للهدف
const SLEEP_MS = 1200;            // تهدئة بين المقالات (لتقليل الحظر)
const MAX_STORE = 500;            // حد أقصى في الملف


const HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; FutureGEN-NewsBot/1.0)"
};


// =========================
// HELPERS
// =========================
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


function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
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


// =========================
// TRANSLATION (اختياري، لا يكسر الخبر عند الفشل)
// =========================
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
    $('*').contents().each(function () {
        if (this.type === 'text' && this.data.trim()) {
            const original = this.data;
            tasks.push(
                tr_en_ar(original).then(translated => {
                    if (translated) $(this).replaceWith(translated);
                }).catch(() => { })
            );
        }
    });


    await Promise.all(tasks);
    return "\n                " + $.html().trim() + "\n            ";
}


// =========================
// SCRAPE ARTICLE -> SCHEMA
// (روابط الصور: خارجية فقط)
// =========================
async function get_article_json(url, fallbackCategoryEn) {
    const res = await axios.get(url, { headers: HEADERS, timeout: 35000 });
    const $ = cheerio.load(res.data);


    const title_en = pickFirst(
        $('meta[property="og:title"]').attr('content'),
        $('h1').first().text()
    );


    let date_iso = "";
    const published =
        $('meta[property="article:published_time"]').attr('content') ||
        $('time').first().attr('datetime') ||
        $('meta[name="pubdate"]').attr('content') ||
        $('meta[name="date"]').attr('content');


    if (published) date_iso = published.slice(0, 10);


    let author_en = pickFirst(
        $('meta[name="author"]').attr('content'),
        $('a[rel="author"]').first().text(),
        $('span[class*="author"]').first().text()
    );


    let category_en = pickFirst(
        $('meta[property="article:section"]').attr('content'),
        $('a[href*="/category/"]').first().text(),
        fallbackCategoryEn || "Artificial Intelligence"
    );


    let image = pickFirst(
        $('meta[property="og:image"]').attr('content'),
        $('meta[name="twitter:image"]').attr('content')
    ); // <-- خارجي فقط


    let summary_en = pickFirst(
        $('meta[name="description"]').attr('content'),
        $('meta[property="og:description"]').attr('content')
    );


    // Body: أفضل محاولة
    let body_en = "";
    const article = $('article').first();
    if (article.length) {
        const allowed = ["p", "h2", "h3", "ul", "ol", "li", "blockquote"];
        const parts = [];
        article.find(allowed.join(', ')).each((i, el) => parts.push($.html(el)));
        if (parts.length) body_en = "\n                " + parts.join("\n                ").trim() + "\n            ";
    } else {
        // fallback بدائي
        const main = $('main').first();
        if (main.length) {
            const parts = [];
            main.find("p, h2, h3, ul, ol, li, blockquote").each((i, el) => parts.push($.html(el)));
            if (parts.length) body_en = "\n                " + parts.join("\n                ").trim() + "\n            ";
        }
    }


    // ترجمة (لا تفشل الخبر إذا فشلت)
    const title_ar = (await tr_en_ar(title_en)) || title_en;
    const summary_ar = (await tr_en_ar(summary_en)) || "";
    const category_ar = (await tr_en_ar(category_en)) || "";
    const author_ar = (await tr_en_ar(author_en)) || "";
    const body_ar = body_en ? (await translateHtml_en_to_ar(body_en)) : "";


    return {
        id: "article_" + md5(url).slice(0, 10),
        title_en,
        title_ar,
        summary_en,
        summary_ar,
        category_en,
        category_ar,
        date: date_iso,
        author_en,
        author_ar,
        image,      // ✅ خارجي فقط
        link: url,  // ✅ خارجي
        body_en: body_en || "",
        body_ar: body_ar || ""
    };
}


// =========================
// READ RSS ITEMS
// =========================
async function readFeedItems(feed) {
    const rssRes = await axios.get(feed.url, { headers: HEADERS, timeout: 30000 });
    const $ = cheerio.load(rssRes.data, { xmlMode: true });


    const items = [];
    $('item').each((i, el) => {
        if (i >= RSS_SCAN_LIMIT_PER_FEED) return false;


        const $el = $(el);
        const link = ($el.find('link').text().trim() || "").trim();
        const pubDate = $el.find('pubDate').text().trim();
        const pubMs = parseRssDateToMs(pubDate);


        // category من RSS
        const cat = $el.find('category').first().text().trim();


        if (!link) return;
        items.push({ link, pubMs, category: cat || "", feedName: feed.name });
    });


    return items;
}


// =========================
// MAIN
// =========================
async function main() {
    ensureDirForFile(OUT_FILE);
    ensureDirForFile(INDEX_FILE);


    const existing = loadJson(OUT_FILE, { metadata: {}, articles: [] });
    const index = loadJson(INDEX_FILE, { seen_urls: [] });


    const seen = new Set(Array.isArray(index.seen_urls) ? index.seen_urls : []);
    const existingArticles = Array.isArray(existing.articles) ? existing.articles : [];


    const isFirstRun = existingArticles.length === 0;


    const nowMs = Date.now();
    const cutoffMs = nowMs - (DAILY_WINDOW_HOURS * 60 * 60 * 1000);


    // اجمع مرشحين من كل المصادر
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
            console.log(`❌ Feed failed: ${feed.name} -> ${e.message}`);
        }
    }


    // رتب المرشحين (الأحدث أولاً)
    candidates.sort((a, b) => (b.pubMs || 0) - (a.pubMs || 0));


    const articles = [...existingArticles];
    let added = 0;
    let attempted = 0;


    for (const c of candidates) {
        if (isFirstRun && added >= FIRST_RUN_TARGET) break;


        attempted++;
        try {
            const item = await get_article_json(c.link, c.category);
            articles.push(item);
            seen.add(c.link);
            added++;
            console.log(`✅ Added [${c.feedName}]: ${item.title_en}`);
        } catch (e) {
            console.log(`❌ Failed: ${c.link} -> ${e.message}`);
            // لا نضيف seen إذا فشل، حتى يحاول مرة ثانية لاحقًا
        }


        await sleep(SLEEP_MS);
    }


    // ترتيب وقص
    articles.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const trimmed = articles.slice(0, MAX_STORE);


    const output = {
        metadata: {
            sources: FEEDS.map(f => f.url),
            total_articles: trimmed.length,
            scraped_at: new Date().toISOString(),
            mode: isFirstRun ? "first_run_50" : "daily_last_24h",
            attempted,
            added,
            images: "external_only"
        },
        articles: trimmed
    };


    saveJson(OUT_FILE, output);
    saveJson(INDEX_FILE, { seen_urls: Array.from(seen) });


    console.log(`\n📝 Updated: ${OUT_FILE}`);
    console.log(`Mode: ${output.metadata.mode} | Added: ${added} | Total: ${trimmed.length}`);
}


if (require.main === module) {
    main();
}
