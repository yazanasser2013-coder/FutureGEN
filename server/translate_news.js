/**
 * translate_news.js
 * - Reads ./site/data/news.json
 * - Generates title_ar + summary_ar from EN (stronger + no repeats)
 * - Uses LibreTranslate (FREE)
 * - Saves back to same file
 */


import fs from "fs";
import path from "path";
import fetch from "node-fetch";


const NEWS_FILE = path.resolve("./site/data/news.json");
const TRANSLATE_URL = "http://127.0.0.1:5000/translate";


// =======================
// Helpers
// =======================
function stripHtml(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function normalizeSpaces(s = "") {
  return String(s).replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
}


/**
 * removes insane character repeats: RRRRRRR or حححححح
 */
function removeCharSpam(s = "") {
  s = String(s);
  s = s.replace(/([A-Za-z])\1{6,}/g, "$1$1");
  s = s.replace(/([\u0600-\u06FF])\1{6,}/g, "$1$1");
  return s;
}


/**
 * removes consecutive repeated words: ميكرو ميكرو ميكرو
 */
function limitConsecutiveRepeats(text = "", max = 1) {
  const words = normalizeSpaces(text).split(" ").filter(Boolean);
  const out = [];
  let prev = "";
  let count = 0;


  for (const w of words) {
    if (w === prev) {
      count++;
      if (count <= max) out.push(w);
    } else {
      prev = w;
      count = 0;
      out.push(w);
    }
  }
  return out.join(" ");
}


/**
 * prevents one word from flooding the whole text
 */
function limitGlobalWordFrequency(text = "", maxTotal = 6) {
  const words = normalizeSpaces(text).split(" ").filter(Boolean);
  const freq = {};
  const out = [];


  for (const w of words) {
    freq[w] = (freq[w] || 0) + 1;
    if (freq[w] <= maxTotal) out.push(w);
  }
  return out.join(" ");
}


/**
 * Basic journalistic smoothing (rule-based)
 * - makes text more natural (not perfect like DeepL / OpenAI)
 */
function polishArabic(text = "") {
  let s = normalizeSpaces(text);


  // remove weird mixed punctuation spacing
  s = s.replace(/\s+([،؛:!.؟])/g, "$1");
  s = s.replace(/([،؛:!.؟])([^\s])/g, "$1 $2");


  // some common cleanup
  s = s.replace(/\bالذكاء الاصطناعي نموذج\b/g, "نموذج ذكاء اصطناعي");
  s = s.replace(/\bcommits to\b/gi, "تلتزم بـ");
  s = s.replace(/\bhits milestone\b/gi, "يحقق إنجازًا مهمًا");
  s = s.replace(/\binfrastructure\b/gi, "البنية التحتية");
  s = s.replace(/\btraining\b/gi, "التدريب");
  s = s.replace(/\binference\b/gi, "الاستدلال");
  s = s.replace(/\bcloud\b/gi, "السحابة");


  return normalizeSpaces(s);
}


function truncate(text = "", maxLen = 300) {
  const s = normalizeSpaces(text);
  if (s.length <= maxLen) return s;
  return s.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}


// =======================
// Translation
// =======================
async function translateToArabic(text) {
  const res = await fetch(TRANSLATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "ar",
      format: "text",
    }),
  });


  if (!res.ok) throw new Error("Translate failed: " + res.status);
  const data = await res.json();
  return data.translatedText || "";
}


// =======================
// Pipeline for each article
// =======================
async function buildArabicTitle(titleEn) {
  const raw = await translateToArabic(titleEn);
  let s = raw;


  s = removeCharSpam(s);
  s = limitConsecutiveRepeats(s, 0);
  s = limitGlobalWordFrequency(s, 4);
  s = polishArabic(s);


  // Title should be short
  s = truncate(s, 120);


  return s || titleEn;
}


async function buildArabicSummary(bodyEn, fallbackSummaryEn) {
  const source = bodyEn || fallbackSummaryEn || "";
  const text = stripHtml(source).slice(0, 1800); // enough to summarize


  const raw = await translateToArabic(text);
  let s = raw;


  s = removeCharSpam(s);
  s = limitConsecutiveRepeats(s, 0);
  s = limitGlobalWordFrequency(s, 6);
  s = polishArabic(s);


  // Summary length
  s = truncate(s, 320);


  return s || "";
}


// =======================
// Main
// =======================
async function run() {
  const newsRaw = fs.readFileSync(NEWS_FILE, "utf8");
  const articles = JSON.parse(newsRaw);


  if (!Array.isArray(articles)) {
    throw new Error("news.json must be an array");
  }


  for (let i = 0; i < articles.length; i++) {
    const item = articles[i];
    const titleEn = normalizeSpaces(item.title_en || "");
    const bodyEn = item.body_en || "";
    const summaryEn = item.summary_en || "";


    if (!titleEn) continue;


    // Always generate strong Arabic (do not trust broken existing Arabic)
    item.title_ar = await buildArabicTitle(titleEn);
    item.summary_ar = await buildArabicSummary(bodyEn, summaryEn);


    // Ensure body_ar exists (optional)
    if (!item.body_ar || item.body_ar.length < 20) {
      const bodyText = stripHtml(bodyEn).slice(0, 4000);
      const bodyArRaw = await translateToArabic(bodyText);
      let bodyAr = polishArabic(limitGlobalWordFrequency(limitConsecutiveRepeats(removeCharSpam(bodyArRaw), 0), 20));
      item.body_ar = bodyAr;
    }


    process.stdout.write(`\r✅ Processed ${i + 1}/${articles.length}`);
  }


  fs.writeFileSync(NEWS_FILE, JSON.stringify(articles, null, 2), "utf8");
  console.log("\n✅ news.json updated successfully with strong Arabic.");
}


run().catch((err) => {
  console.error("❌ translate_news error:", err);
  process.exit(1);
});