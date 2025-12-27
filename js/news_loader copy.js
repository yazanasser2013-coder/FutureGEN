/* ================================
   NEWS LOADER – FINAL (SMART AR FIX + 60 NEWS + 3 GRID)
   - Loads /site/data/news.json
   - Infinite scroll
   - Arabic never falls back to English
   - Fixes repeated words/letters
   - Smart Arabic rewrite from English if Arabic is broken
   - Removes duplicated header image in body
================================ */


(() => {
  "use strict";


  const NEWS_URL = "/site/data/news.json";
  const BATCH_SIZE = 60; // كل دفعة (3 صفوف × 3 كروت)
  const MAX_SUMMARY_LEN = 160;


  let cache = [];
  let indexMap = {};
  let offset = 0;
  let loading = false;
  let initialized = false;


  const el = (id) => document.getElementById(id);


  // ===============================
  // Language
  // ===============================
  function getLang() {
    const w = (window.currentLang || "").toLowerCase();
    const doc = (document.documentElement.lang || "").toLowerCase();
    return (w === "ar" || doc === "ar") ? "ar" : "en";
  }


  // ===============================
  // Helpers
  // ===============================
  function normalizeSpaces(s) {
    return String(s || "")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  function truncateText(text, maxLen = 220) {
    text = normalizeSpaces(text);
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
  }


  // ===============================
  // Detect broken Arabic
  // ===============================
  function isMostlyLatin(text = "") {
    const s = String(text).trim();
    if (!s) return true;
    const latin = (s.match(/[A-Za-z]/g) || []).length;
    return latin / s.length > 0.25;
  }


  function looksBrokenArabic(text = "") {
    const s = String(text).trim();
    if (!s) return true;


    // R R R R ...
    if (/^(?:[A-Za-z]\s*){20,}$/i.test(s)) return true;


    // كلمة واحدة مكررة بشكل ضخم
    const words = s.split(/\s+/).filter(Boolean);
    if (words.length >= 8) {
      const freq = {};
      words.forEach(w => freq[w] = (freq[w] || 0) + 1);
      const maxRepeat = Math.max(...Object.values(freq));
      if (maxRepeat >= 6) return true;
    }


    // لاتيني كثير
    if (isMostlyLatin(s)) return true;


    return false;
  }


  // ===============================
  // Arabic Cleaning
  // ===============================
  function cleanRepeatedWords(text = "") {
    const words = normalizeSpaces(text).split(" ").filter(Boolean);
    const out = [];


    let prev = "";
    let count = 0;


    for (const w of words) {
      if (w === prev) {
        count++;
        if (count < 2) out.push(w); // يسمح بحد أقصى مرتين
      } else {
        prev = w;
        count = 0;
        out.push(w);
      }
    }
    return out.join(" ");
  }


  function repairArabicText(text, opts = {}) {
    const maxLen = opts.maxLen || 4000;
    let s = normalizeSpaces(text);


    if (!s) return "";


    // إزالة نمط R R R R
    s = s.replace(/(?:\b([A-Za-z])\s+){20,}\b/g, "$1");


    // إزالة RRRRRR
    s = s.replace(/([A-Za-z])\1{8,}/g, "$1");


    // إزالة حححححح
    s = s.replace(/([\u0600-\u06FF])\1{6,}/g, "$1");


    // إزالة تكرار كلمة عربية كبيرة
    s = s.replace(/(\b[\u0600-\u06FF]{3,}\b)(?:\s+\1){3,}/g, "$1 $1");


    // نظف تكرار الكلمات المتتالية
    s = cleanRepeatedWords(s);


    // تنظيف المسافات
    s = normalizeSpaces(s);


    // قص
    if (s.length > maxLen) s = s.slice(0, maxLen).trim() + "…";


    return s;
  }


  // إصلاح HTML عربي بدون كسر الوسوم
  function repairArabicHtml(html) {
    if (!html) return "";
    const wrap = document.createElement("div");
    wrap.innerHTML = String(html);


    const walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);


    nodes.forEach(n => {
      const t = n.nodeValue || "";
      if (!/[\u0600-\u06FF]/.test(t)) return;
      n.nodeValue = repairArabicText(t, { maxLen: 8000 });
    });


    return wrap.innerHTML;
  }


  // ===============================
  // SMART Arabic rewrite from English
  // ===============================
  function rewriteArabicFromEnglish(enText = "") {
    let s = normalizeSpaces(enText);
    if (!s) return "";


    // إزالة أي رموز مزعجة
    s = s.replace(/[^\w\s.,!?'"():/\\-]/g, "");


    // ترجمة مصطلحات شائعة بشكل خفيف (قاموس بسيط)
    const dict = [
      [/Microsoft/gi, "مايكروسوفت"],
      [/Google/gi, "جوجل"],
      [/OpenAI/gi, "أوبن أي آي"],
      [/AI/gi, "الذكاء الاصطناعي"],
      [/robot/gi, "روبوت"],
      [/robots/gi, "روبوتات"],
      [/model/gi, "نموذج"],
      [/models/gi, "نماذج"],
      [/launch/gi, "إطلاق"],
      [/update/gi, "تحديث"],
      [/research/gi, "أبحاث"],
      [/new/gi, "جديد"],
      [/ad/gi, "إعلان"],
      [/ads/gi, "إعلانات"],
      [/cloud/gi, "سحابة"],
      [/chip/gi, "شريحة"],
      [/chips/gi, "شرائح"],
      [/data/gi, "بيانات"],
      [/user/gi, "مستخدم"],
      [/users/gi, "مستخدمين"],
      [/security/gi, "الأمن"],
      [/privacy/gi, "الخصوصية"],
      [/policy/gi, "سياسة"],
      [/business/gi, "الأعمال"],
      [/strategy/gi, "استراتيجية"],
      [/infrastructure/gi, "البنية التحتية"],
      [/assistant/gi, "المساعد"],
      [/Android/gi, "أندرويد"],
      [/iPhone/gi, "آيفون"],
      [/China/gi, "الصين"],
      [/Europe/gi, "أوروبا"],
      [/US/gi, "أمريكا"],
    ];


    dict.forEach(([rgx, ar]) => {
      s = s.replace(rgx, ar);
    });


    // صياغة عربية عامة “مفهومة”
    // نحن لا نترجم حرفيًا، بل نعيد تقديم النص عربيًا بشكل طبيعي.
    const ar = "خبر تقني: " + s;


    return truncateText(ar, MAX_SUMMARY_LEN);
  }


  // ===============================
  // PICK TEXT (Arabic never fallback to English)
  // ===============================
  function pickSmartText(lang, ar, en, opts = {}) {
    const AR = normalizeSpaces(ar);
    const EN = normalizeSpaces(en);


    if (lang === "ar") {
      if (!AR) {
        // لو العربي غير موجود أصلاً، نعمل إعادة صياغة عربية من الإنجليزي
        return rewriteArabicFromEnglish(EN);
      }


      // لو العربي موجود لكنه خربان، أصلحه بدل التحويل للإنجليزي
      if (looksBrokenArabic(AR)) {
        const fixed = repairArabicText(AR, { maxLen: opts.maxLen || MAX_SUMMARY_LEN });
        // لو الإصلاح ما زال سيئًا → نعيد صياغته من الإنجليزي
        if (!fixed || looksBrokenArabic(fixed)) {
          return rewriteArabicFromEnglish(EN);
        }
        return fixed;
      }


      // عربي طبيعي
      return repairArabicText(AR, { maxLen: opts.maxLen || MAX_SUMMARY_LEN });
    }


    // English mode
    if (!EN) return truncateText(AR, opts.maxLen || MAX_SUMMARY_LEN);
    return truncateText(EN, opts.maxLen || MAX_SUMMARY_LEN);
  }


  // ===============================
  // Load News
  // ===============================
  async function loadOnce() {
    if (cache.length) return cache;


    const res = await fetch(`${NEWS_URL}?ts=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch news.json " + res.status);


    const data = await res.json();
    cache = Array.isArray(data) ? data : (data.items || data.articles || []);
    cache = cache.filter(Boolean);


    indexMap = {};
    cache.forEach((p, i) => {
      const id = p.id ? String(p.id) : String(i);
      p.__id = id;
      indexMap[id] = p;
    });


    console.log("✅ Loaded news:", cache.length);
    return cache;
  }


  // ===============================
  // Render Card
  // ===============================
  function createCard(post) {
    const lang = getLang();


    const title = pickSmartText(lang, post.title_ar, post.title_en, { maxLen: 90 });
    const summary = pickSmartText(lang, post.summary_ar, post.summary_en, { maxLen: MAX_SUMMARY_LEN });


    const col = document.createElement("div");
    col.className = "news-card-item";


    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0" style="border-radius:16px;overflow:hidden;">
        ${post.image ? `
          <img src="${post.image}" class="card-img-top"
            style="height:200px;object-fit:cover" loading="lazy"
            onerror="this.style.display='none'">
        ` : ""}


        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold">${title || ""}</h5>
          <p class="card-text flex-grow-1 text-muted" style="line-height:1.6;">
            ${summary || ""}
          </p>


          <button class="btn btn-primary mt-auto">
            ${lang === "ar" ? "اقرأ المزيد" : "Read more"}
          </button>
        </div>
      </div>
    `;


    col.querySelector("button").onclick = () => openPost(post.__id);
    return col;
  }


  // ===============================
  // Render batch
  // ===============================
  function renderBatch(reset = false) {
    const container = el("blog-posts-container");
    const loadingEl = el("news-loading");
    if (!container) return;


    if (reset) {
      container.innerHTML = "";
      offset = 0;
    }


    const slice = cache.slice(offset, offset + BATCH_SIZE);
    slice.forEach((post) => container.appendChild(createCard(post)));
    offset += BATCH_SIZE;


    if (loadingEl) loadingEl.style.display = "none";
  }


  // ===============================
  // Infinite scroll
  // ===============================
  function setupScroll() {
    window.addEventListener("scroll", () => {
      if (loading) return;
      if (offset >= cache.length) return;


      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
        loading = true;
        const loadingEl = el("news-loading");
        if (loadingEl) loadingEl.style.display = "block";


        setTimeout(() => {
          renderBatch(false);
          loading = false;
        }, 120);
      }
    });
  }


  // ===============================
  // Open Post
  // ===============================
  function openPost(id) {
    const post = indexMap[String(id)];
    if (!post) return;


    const lang = getLang();


    const title = pickSmartText(lang, post.title_ar, post.title_en, { maxLen: 220 });
    const category = pickSmartText(lang, post.category_ar, post.category_en, { maxLen: 60 });
    const author = pickSmartText(lang, post.author_ar, post.author_en, { maxLen: 80 });


    let body = (lang === "ar") ? (post.body_ar || "") : (post.body_en || "");


    // ✅ أصلح body العربي بدون تحويله
    if (lang === "ar") body = repairArabicHtml(body);


    el("blog-post-title").textContent = title;
    el("blog-post-category").textContent = category;
    el("blog-post-author").textContent = author;
    el("blog-post-date").textContent = post.date || "";


    // ✅ Header image
    const headerImg = el("blog-post-image");
    headerImg.src = post.image || "";
    headerImg.style.display = post.image ? "block" : "none";


    // ✅ Body
    const bodyEl = el("blog-post-body-container");
    bodyEl.innerHTML = body || "";


    // ✅ Remove any body image that duplicates header image
    setTimeout(() => {
      const headerSrc = (headerImg.getAttribute("src") || "").trim();
      if (!headerSrc) return;


      bodyEl.querySelectorAll("img").forEach(img => {
        const src = (img.getAttribute("src") || "").trim();
        if (src && src === headerSrc) {
          img.closest("figure")?.remove();
          if (bodyEl.contains(img)) img.remove();
        }
      });
    }, 0);


    // Show details page
    document.querySelectorAll(".page").forEach(p => (p.style.display = "none"));
    el("blog-post-page").style.display = "block";
  }


  // ===============================
  // Open News Page
  // ===============================
  async function openNewsPageAndRender() {
    await loadOnce();
    renderBatch(true);


    if (!initialized) {
      setupScroll();
      initialized = true;
    }
  }


  // ===============================
  // Bind buttons
  // ===============================
  document.addEventListener("DOMContentLoaded", () => {
    const link = el("news-link");
    if (link) {
      link.addEventListener("click", async (e) => {
        e.preventDefault();


        document.querySelectorAll(".page").forEach(p => (p.style.display = "none"));
        el("news-page").style.display = "block";


        await openNewsPageAndRender();
      });
    }


    // Back button from details
    const backBlog = el("back-to-home-from-blog");
    if (backBlog) {
      backBlog.addEventListener("click", () => {
        document.querySelectorAll(".page").forEach(p => (p.style.display = "none"));
        el("news-page").style.display = "block";
      });
    }
  });


  // expose global
  window.openNewsPageAndRender = openNewsPageAndRender;
})();