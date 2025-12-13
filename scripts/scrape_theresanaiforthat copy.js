const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const { URL } = require("url");

const SITE_ORIGIN = "https://theresanaiforthat.com";
const OUTPUT_DIR = path.resolve(__dirname, "scraped_data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "theresanaiforthat_tools_final.json");

const GLOBAL_TOOL_LIMIT = 3000;
const HEADLESS = true;
const MAX_RETRIES = 3;

const LIBRETRANSLATE_URL = "https://libretranslate.de/translate";
const TRANSLATION_BATCH_SIZE = 50;
const TRANSLATION_DELIMITER = "\n\n|||SPLIT|||SEP|||\n\n";

// —————————————————————————————————————————————
// YOUR CATEGORIES (unchanged)
// —————————————————————————————————————————————
const categories = [
    { name: "AI Detection", name_ar: "كشف الذكاء الاصطناعي", icon: "bi bi-search" },
    { name: "Avatar", name_ar: "الصور الرمزية", icon: "bi bi-person" },
    { name: "Copywriting", name_ar: "كتابة النصوص", icon: "bi bi-file-earmark-text" },
    { name: "For Fun", name_ar: "للمتعة", icon: "bi bi-emoji-smile" },
    { name: "Generative Art", name_ar: "الفن التوليدي", icon: "bi bi-palette" },
    { name: "Generative Video", name_ar: "توليد الفيديو", icon: "bi bi-camera-video" },
    { name: "Image Scanning", name_ar: "مسح الصور", icon: "bi bi-image" },
    { name: "Marketing", name_ar: "التسويق", icon: "bi bi-megaphone" },
    { name: "Music", name_ar: "الموسيقى", icon: "bi bi-music-note" },
    { name: "Productivity", name_ar: "الإنتاجية", icon: "bi bi-graph-up" },
    { name: "Research", name_ar: "البحث", icon: "bi bi-lightbulb" },
    { name: "Social Media", name_ar: "التواصل الاجتماعي", icon: "bi bi-share" },
    { name: "Text-To-Speech", name_ar: "تحويل النص إلى كلام", icon: "bi bi-volume-up" },
    { name: "Translation", name_ar: "الترجمة", icon: "bi bi-translate" },
    { name: "Voice Modulation", name_ar: "تعديل الصوت", icon: "bi bi-mic" },
    { name: "Aggregators", name_ar: "المجمعات", icon: "bi bi-collection" },
    { name: "Chat", name_ar: "المحادثة", icon: "bi bi-chat-dots" },
    { name: "Finance", name_ar: "المالية", icon: "bi bi-wallet2" },
    { name: "Gaming", name_ar: "الألعاب", icon: "bi bi-controller" },
    { name: "Generative Code", name_ar: "توليد الكود", icon: "bi bi-code-slash" },
    { name: "Image Improvement", name_ar: "تحسين الصور", icon: "bi bi-brush" },
    { name: "Inspiration", name_ar: "الإلهام", icon: "bi bi-sun" },
    { name: "Podcasting", name_ar: "البودكاست", icon: "bi bi-headphones" },
    { name: "Prompt Guides", name_ar: "أدلة الأوامر", icon: "bi bi-list-check" },
    { name: "Self-Improvement", name_ar: "تطوير الذات", icon: "bi bi-person-check" },
    { name: "Speech-To-Text", name_ar: "تحويل الكلام إلى نص", icon: "bi bi-soundwave" },
    { name: "Text-To-Video", name_ar: "تحويل النص إلى فيديو", icon: "bi bi-film" },
    { name: "Video Editing", name_ar: "تعديل الفيديو", icon: "bi bi-scissors" },
    { name: "Education", name_ar: "التعليم", icon: "bi bi-mortarboard" },
    { name: "E-commerce", name_ar: "التجارة الإلكترونية", icon: "bi bi-cart" },
    { name: "SEO", name_ar: "تحسين محركات البحث", icon: "bi bi-search" },
    { name: "Career", name_ar: "الوظائف", icon: "bi bi-briefcase" }
];

// —————————————————————————————————————————————
// HELPERS
// —————————————————————————————————————————————
const sanitize = t => typeof t === "string" ? t.replace(/\s+/g, " ").trim() : "";

const delay = ms => new Promise(r => setTimeout(r, ms));

const categoryIcon = c => {
    const found = categories.find(x => x.name === c);
    return found ? found.icon : "bi bi-app";
};

const fallbackLogo = url => {
    try {
        const host = new URL(url).hostname.replace("www.", "");
        return `https://logo.clearbit.com/${host}`;
    } catch { return ""; }
};


// —————————————————————————————————————————————
// STEP 1 — GET ALL TOOL LINKS
// —————————————————————————————————————————————
async function getAllToolLinks() {
    const browser = await puppeteer.launch({ headless: HEADLESS });
    const page = await browser.newPage();
    await page.goto(SITE_ORIGIN, { waitUntil: "domcontentloaded" });

    const categoryLinks = await page.evaluate(() => {
        const set = new Set();
        document.querySelectorAll("a[href]").forEach(a => {
            const h = a.href || "";
            if (
                h.includes("/category/") ||
                h.includes("/tools") ||
                h.includes("/ai/") ||
                h.includes("/ai-tools")
            ) {
                set.add(h.split("#")[0].split("?")[0]);
            }
        });
        return [...set];
    });

    const finalSet = new Set();

    for (const cat of categoryLinks) {
        let next = cat;

        while (next && finalSet.size < GLOBAL_TOOL_LIMIT) {
            await page.goto(next, { waitUntil: "domcontentloaded" });

            const tools = await page.evaluate(() => {
                const out = [];
                document.querySelectorAll('a[href*="/ai/"]').forEach(a => {
                    out.push(a.href.split("#")[0].split("?")[0]);
                });
                return out;
            });

            tools.forEach(t => finalSet.add(t));

            next = await page.evaluate(() => {
                const nxt =
                    document.querySelector('a[rel="next"]') ||
                    [...document.querySelectorAll("a")].find(a =>
                        ["next", "older"].includes(a.innerText.toLowerCase())
                    );
                return nxt ? nxt.href.split("#")[0].split("?")[0] : null;
            });
        }
    }

    await browser.close();
    return [...finalSet];
}


// —————————————————————————————————————————————
// STEP 2 — SCRAPE SINGLE TOOL
// —————————————————————————————————————————————
async function scrapeTool(url, browser) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const page = await browser.newPage();
        try {
            await page.goto(url, {
                waitUntil: "domcontentloaded",
                timeout: 45000
            });

            const data = await page.evaluate(() => {
                const get = n => {
                    const m =
                        document.querySelector(`meta[name="${n}"]`) ||
                        document.querySelector(`meta[property="${n}"]`);
                    return m ? m.content : "";
                };

                const title =
                    document.querySelector("h1")?.innerText.trim() ||
                    get("og:title") ||
                    document.title;

                const description =
                    get("og:description") ||
                    document.querySelector("article p")?.innerText ||
                    document.querySelector("p")?.innerText ||
                    "";

                const logo =
                    get("og:logo") ||
                    get("og:image") ||
                    get("twitter:image") ||
                    document.querySelector(".tool-logo img")?.src ||
                    document.querySelector('img[src*="logo"]')?.src ||
                    "";

                const category =
                    document.querySelector("[data-category]")?.innerText.trim() ||
                    document.querySelector(".tool-category")?.innerText.trim() ||
                    document.querySelector('a[href*="/category/"]')?.innerText.trim() ||
                    "Other";

                // TAGS REAL
                const tags = [];
                document.querySelectorAll("a[href*='/tag/']").forEach(a => {
                    const t = a.innerText.trim();
                    if (t) tags.push(t);
                });

                return { title, description, logo, category, tags };
            });

            await page.close();

            return {
                name: sanitize(data.title),
                url,
                description: sanitize(data.description),
                description_ar: "",
                logo: data.logo || fallbackLogo(url),
                category: sanitize(data.category),
                icon: categoryIcon(sanitize(data.category)),
                tags: data.tags || [],
                featured: false
            };

        } catch (e) {
            await page.close();
        }
    }
    return null;
}


// —————————————————————————————————————————————
// TRANSLATION — Arabic
// —————————————————————————————————————————————
async function translateBatch(texts) {
    const safe = texts.map(t => sanitize(t).slice(0, 4000));
    const joined = safe.join(TRANSLATION_DELIMITER);

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const res = await fetch(LIBRETRANSLATE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    q: joined,
                    source: "auto",
                    target: "ar",
                    format: "text"
                })
            });

            const data = await res.json();
            const split = data.translatedText.split(TRANSLATION_DELIMITER);

            return split.length === safe.length ? split : safe;

        } catch (err) { }
    }
    return safe;
}


// —————————————————————————————————————————————
// MAIN SCRIPT
// —————————————————————————————————————————————
(async () => {
    await fs.ensureDir(OUTPUT_DIR);

    console.log("Collecting tool links…");
    const links = await getAllToolLinks();

    console.log("Tools collected:", links.length);

    const finalLinks = links.slice(0, GLOBAL_TOOL_LIMIT);

    const browser = await puppeteer.launch({ headless: HEADLESS });

    const results = [];

    // SCRAPE EACH TOOL
    for (let i = 0; i < finalLinks.length; i++) {
        console.log(`Scraping ${i + 1}/${finalLinks.length}`);
        const tool = await scrapeTool(finalLinks[i], browser);
        if (tool) results.push(tool);
    }

    await browser.close();

    // TRANSLATION — Arabic
    console.log("Translating descriptions to Arabic…");

    const toTranslate = results.map(x => x.description);

    for (let i = 0; i < toTranslate.length; i += TRANSLATION_BATCH_SIZE) {
        const slice = toTranslate.slice(i, i + TRANSLATION_BATCH_SIZE);
        const translated = await translateBatch(slice);

        translated.forEach((t, idx) => {
            results[i + idx].description_ar = sanitize(t);
        });

        await delay(500);
    }

    // SAVE
    await fs.writeJson(OUTPUT_FILE, results, { spaces: 2 });

    console.log("DONE — Saved:", results.length);
})();
