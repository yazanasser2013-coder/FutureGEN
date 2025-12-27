/* ================================
   NEWS LOADER – FINAL PRO (SMART ARABIC EDITOR)
   - Loads /site/data/news.json (60)
   - 3 cards per row desktop (CSS)
   - Infinite scroll batches
   - Smart Arabic rewrite (journalistic)
   - Removes duplicated header image inside body
================================ */


(() => {
  "use strict";


  const NEWS_URL = "/site/data/news.json";
  const BATCH_SIZE = 60; // ✅ دفعة مناسبة للسكرول


  let cache = [];
  let indexMap = {};
  let offset = 0;
  let loading = false;
  let initialized = false;


  const el = (id) => document.getElementById(id);


  // =========================
  // Language detection
  // =========================
  function getLang() {
    const w = (window.currentLang || "").toLowerCase();
    const doc = (document.documentElement.lang || "").toLowerCase();
    return (w === "ar" || doc === "ar") ? "ar" : "en";
  }


  // =========================
  // Helpers
  // =========================
  function esc(s = "") {
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;",
      '"': "&quot;", "'": "&#039;"
    }[m]));
  }


  function normalizeSpaces(s) {
    return String(s || "")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  // =========================
  // SMART ARABIC JOURNALISTIC EDITOR
  // =========================
  function removeBoilerplateArabic(s) {
    s = normalizeSpaces(s);


    const patterns = [
      /^خبر تقني:\s*/i,
      /^تقرير مفصل عن\s*/i,
      /يشهد السوق تطورات? ملحوظة.*$/i,
      /تشير التقارير إلى.*$/i,
      /يستمر قطاع التكنولوجيا.*$/i,
      /هذا الخبر التقني يتناول.*$/i,
      /حيث يشهد السوق تطورات.*$/i,
      /مع إطلاق شركات التقنية.*$/i,
    ];


    patterns.forEach((re) => { s = s.replace(re, ""); });
    return normalizeSpaces(s);
  }


  function fixArabicPunctuation(s) {
    s = normalizeSpaces(s);
    s = s.replace(/\s*,\s*/g, "، ");
    s = s.replace(/\s*\.\s*/g, ". ");
    s = s.replace(/\s*:\s*/g, ": ");
    s = s.replace(/\s*!\s*/g, "! ");
    s = s.replace(/\s*\?\s*/g, "؟ ");
    s = s.replace(/([،.!؟])\1+/g, "$1");
    return normalizeSpaces(s);
  }


  function cleanArabicSpam(s) {
    s = normalizeSpaces(s);


    // حذف تكرار كلمة متتالٍ (ميكرو ميكرو...)
    s = s.replace(/(\b[\u0600-\u06FF]{3,}\b)(?:\s+\1){2,}/g, "$1");


    // سلسلة أحرف مثل R R R R
    if (/^(?:[A-Za-z]\s*){15,}$/i.test(s)) return "";


    // تقليل تكرار نفس الحرف
    s = s.replace(/([\u0600-\u06FF])\1{5,}/g, "$1$1");


    return normalizeSpaces(s);
  }


  function smartTruncate(text, maxLen = 380) {
    text = normalizeSpaces(text);
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
  }


  function pickLeadSentence(text) {
    text = normalizeSpaces(text);
    if (!text) return "";
    const parts = text.split(/(?<=[.!؟])\s+/).filter(Boolean);
    return normalizeSpaces(parts.slice(0, 2).join(" "));
  }


  // ✅ يعيد كتابة ملخص عربي بصياغة صحفية متوسطة
  function journalistRewriteArabic({ titleAr, categoryAr, summaryAr, bodyAr }) {
    let summary = fixArabicPunctuation(cleanArabicSpam(removeBoilerplateArabic(summaryAr)));
    let body = fixArabicPunctuation(cleanArabicSpam(removeBoilerplateArabic(bodyAr)));


    // اختر أفضل قاعدة
    let base = pickLeadSentence(summary);
    if (!base || base.length < 60) base = pickLeadSentence(body);


    // لو فاضي أو ضعيف
    if (!base || base.length < 60) {
      const cat = categoryAr ? `في مجال ${categoryAr}` : "في مجال الذكاء الاصطناعي";
      base = `يتناول هذا الخبر ${cat}، ويسلط الضوء على تطور جديد مرتبط بـ "${titleAr}".`;
    }


    // لمسة صحفية
    if (!/كشف|أعلن|أوضح|قال|أشار|أكد|أطلقت|تعمل|تواجه|تستعد|تسعى/.test(base)) {
      base = `في تطور جديد، ${base}`;
    }


    base = smartTruncate(base, 380);
    return base.trim();
  }


  // ✅ تنظيف عربي خفيف للـ HTML بدون تدمير الوسوم
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
      let fixed = fixArabicPunctuation(cleanArabicSpam(removeBoilerplateArabic(t)));
      n.nodeValue = fixed;
    });


    return wrap.innerHTML;
  }


  // =========================
  // Data load
  // =========================
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


  // =========================
  // Render card
  // =========================
  function createCard(post) {
    const lang = getLang();


    const title =
      lang === "ar"
        ? (post.title_ar || post.title_en || "")
        : (post.title_en || post.title_ar || "");


    let summary = "";
    if (lang === "ar") {
      summary = journalistRewriteArabic({
        titleAr: post.title_ar || title,
        categoryAr: post.category_ar || "",
        summaryAr: post.summary_ar || "",
        bodyAr: post.body_ar || ""
      });
    } else {
      summary = normalizeSpaces(post.summary_en || post.summary_ar || "");
      summary = smartTruncate(summary, 320);
    }


    const card = document.createElement("div");
    card.className = "news-card-item";


    card.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        ${post.image ? `
          <img src="${esc(post.image)}" alt="${esc(title)}" loading="lazy"
               onerror="this.style.display='none'">
        ` : ``}


        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold">${esc(title)}</h5>
          <p class="card-text text-muted flex-grow-1">${esc(summary)}</p>


          <button class="btn btn-primary mt-auto" data-open="${esc(post.__id)}">
            ${lang === "ar" ? "اقرأ المزيد" : "Read more"}
          </button>
        </div>
      </div>
    `;


    card.querySelector("button[data-open]").addEventListener("click", () => {
      openPost(post.__id);
    });


    return card;
  }


  // =========================
  // Batch rendering
  // =========================
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


  // =========================
  // Infinite Scroll
  // =========================
  function setupScroll() {
    window.addEventListener("scroll", () => {
      if (loading) return;
      if (offset >= cache.length) return;


      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loading = true;
        const loadingEl = el("news-loading");
        if (loadingEl) loadingEl.style.display = "block";


        setTimeout(() => {
          renderBatch(false);
          loading = false;
        }, 200);
      }
    });
  }


  // =========================
  // Open details
  // =========================
  function openPost(id) {
    const post = indexMap[String(id)];
    if (!post) return;


    const lang = getLang();


    const title = lang === "ar" ? (post.title_ar || post.title_en || "") : (post.title_en || post.title_ar || "");
    const category = lang === "ar" ? (post.category_ar || post.category_en || "") : (post.category_en || post.category_ar || "");
    const author = lang === "ar" ? (post.author_ar || post.author_en || "") : (post.author_en || post.author_ar || "");


    let body = lang === "ar" ? (post.body_ar || post.body_en || "") : (post.body_en || post.body_ar || "");
    if (lang === "ar") body = repairArabicHtml(body);


    el("blog-post-title").textContent = title;
    el("blog-post-category").textContent = category;
    el("blog-post-author").textContent = author;
    el("blog-post-date").textContent = post.date || "";


    const headerImg = el("blog-post-image");
    headerImg.src = post.image || "";
    headerImg.style.display = post.image ? "block" : "none";


    const bodyEl = el("blog-post-body-container");
    bodyEl.innerHTML = body;


    // ✅ remove duplicated image inside body
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


    // show details page
    document.querySelectorAll(".page").forEach(p => (p.style.display = "none"));
    el("blog-post-page").style.display = "block";
  }


  // =========================
  // Entry: open news page
  // =========================
  async function openNewsPageAndRender() {
    await loadOnce();
    renderBatch(true);
    if (!initialized) {
      setupScroll();
      initialized = true;
    }
  }


  // =========================
  // Bind navigation
  // =========================
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


    // back button from blog details
    const backBlog = el("back-to-home-from-blog");
    if (backBlog) {
      backBlog.addEventListener("click", () => {
        document.querySelectorAll(".page").forEach(p => (p.style.display = "none"));
        el("news-page").style.display = "block";
      });
    }
  });


  // expose
  window.openNewsPageAndRender = openNewsPageAndRender;


})();