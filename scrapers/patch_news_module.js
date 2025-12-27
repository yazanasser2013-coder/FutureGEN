// scrapers/patch_news_module.js
// Usage:
//   node scrapers/patch_news_module.js js/main.js
// Output:
//   js/main.PATCHED.news.js

const fs = require("fs");
const path = require("path");

const INPUT = process.argv[2];
if (!INPUT) {
  console.error("❌ Usage: node scrapers/patch_news_module.js js/main.js");
  process.exit(1);
}

const src = fs.readFileSync(INPUT, "utf8");

// ---- Helpers ----

function findNextNonStringChar(text, start, targetChar) {
  let i = start;
  let inS = false, inD = false, inT = false;
  let inLine = false, inBlock = false;
  for (; i < text.length; i++) {
    const c = text[i];
    const n = text[i + 1];

    if (inLine) { if (c === "\n") inLine = false; continue; }
    if (inBlock) { if (c === "*" && n === "/") { inBlock = false; i++; } continue; }

    if (!inS && !inD && !inT) {
      if (c === "/" && n === "/") { inLine = true; i++; continue; }
      if (c === "/" && n === "*") { inBlock = true; i++; continue; }
    }

    if (!inD && !inT && c === "'" && text[i - 1] !== "\\") { inS = !inS; continue; }
    if (!inS && !inT && c === '"' && text[i - 1] !== "\\") { inD = !inD; continue; }
    if (!inS && !inD && c === "`" && text[i - 1] !== "\\") { inT = !inT; continue; }

    if (!inS && !inD && !inT && c === targetChar) return i;
  }
  return -1;
}

function findMatchingBrace(text, braceOpenIndex) {
  let i = braceOpenIndex;
  let depth = 0;
  let inS = false, inD = false, inT = false;
  let inLine = false, inBlock = false;

  for (; i < text.length; i++) {
    const c = text[i];
    const n = text[i + 1];

    if (inLine) { if (c === "\n") inLine = false; continue; }
    if (inBlock) { if (c === "*" && n === "/") { inBlock = false; i++; } continue; }

    if (!inS && !inD && !inT) {
      if (c === "/" && n === "/") { inLine = true; i++; continue; }
      if (c === "/" && n === "*") { inBlock = true; i++; continue; }
    }

    if (!inD && !inT && c === "'" && text[i - 1] !== "\\") { inS = !inS; continue; }
    if (!inS && !inT && c === '"' && text[i - 1] !== "\\") { inD = !inD; continue; }
    if (!inS && !inT && c === "`" && text[i - 1] !== "\\") { inT = !inT; continue; }

    if (inS || inD || inT) continue;

    if (c === "{") depth++;
    if (c === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function removeFunctionByName(code, name) {
  const patterns = [
    new RegExp(`\\basync\\s+function\\s+${name}\\s*\\(`, "g"),
    new RegExp(`\\bfunction\\s+${name}\\s*\\(`, "g"),
    new RegExp(`\\bconst\\s+${name}\\s*=\\s*async\\s*\\(`, "g"),
    new RegExp(`\\bconst\\s+${name}\\s*=\\s*\\(`, "g"),
    new RegExp(`\\b${name}\\s*=\\s*async\\s*\\(`, "g"),
    new RegExp(`\\b${name}\\s*=\\s*\\(`, "g"),
  ];

  let changed = false;

  for (const rgx of patterns) {
    let m;
    while ((m = rgx.exec(code)) !== null) {
      const start = m.index;
      // Safety check
      const openBrace = findNextNonStringChar(code, start, "{");
      if (openBrace === -1) break;
      const closeBrace = findMatchingBrace(code, openBrace);
      if (closeBrace === -1) break;

      let sliceEnd = closeBrace + 1;
      if (code[sliceEnd] === ';') sliceEnd++;

      code = code.slice(0, start) + "\n// Removed " + name + "\n" + code.slice(sliceEnd);
      changed = true;
      rgx.lastIndex = Math.max(0, start - 1);
    }
  }

  return { code, changed };
}

// ---- Main Patching Logic ----
let out = src;

// 1. Remove Previous News Module Injections
out = out.replace(
  /\/\/ ===== NEWS MODULE START =====[\s\S]*?\/\/ ===== NEWS MODULE END =====/g,
  ""
);

// 2. Remove Known Garbage Syntax
// remove ", true);" garbage line
out = out.replace(/\/\/\s*\n\s*,\s*true\s*\);/g, "");
out = out.replace(/^\s*,\s*true\s*\);/gm, "// Removed orphan");

// 3. Remove Duplicate "Lazy Load" News Block
out = out.replace(/\/\/ ====================== NEWS: Lazy Load[\s\S]*?\/\/ مسار ملف الأخبار/g, "// Removed old news header");

const SAFE_NEWS_FUNCTIONS = [
  "loadNews", "loadNewsOnce", "renderNewsBatch", "renderNewsFromState",
  "setupNewsInfiniteScroll", "attachNewsInfiniteScroll", "openNewsPageAndRender",
  "openBlogPostById", "viewBlogPostDetails", "renderBlogPosts", "fetchNewsJSON",
  "indexNews", "newsCardHTML", "initNewsModule", "bindNewsNavButton",
  "viewBlogPostDetailsFromNews", "viewBlogPostDetailsById", "hardProtectNewsList"
];

for (const fn of SAFE_NEWS_FUNCTIONS) {
  let res;
  let passes = 0;
  do {
    res = removeFunctionByName(out, fn);
    out = res.code;
    passes++;
  } while (res.changed && passes < 10);
}

// 4. Remove Common Event Listeners
out = out.replace(/document\.addEventListener\(\s*["']DOMContentLoaded["']\s*,\s*loadNews\s*\)\s*;?/g, "");
out = out.replace(/loadNews\s*\(\s*\)\s*;?/g, "");

// 5. Remove orphan "})();"
out = out.replace(/^\s*\}\)\(\);/gm, "// Removed orphan IIFE close");


// ---- Inject Clean Module ----
const NEWS_MODULE = `

// ===== NEWS MODULE START =====
// Clean, fast, bilingual News cards + infinite scroll (6 per batch)

(function () {
  // ---------- STATE ----------
  window.NEWS_CACHE = window.NEWS_CACHE || null;
  window.NEWS_INDEX = window.NEWS_INDEX || null;
  window.NEWS_CURSOR = 0;
  window.NEWS_PAGE_SIZE = 6;
  window.NEWS_LOADING = false;
  window.NEWS_SELECTED_ID = null;

  function getCurrentLangSafe() {
    const ls = (localStorage.getItem("lang") || "").toLowerCase();
    const w1 = (window.currentLang || "").toLowerCase();
    const w2 = (window.currentLanguage || "").toLowerCase();
    if (ls === "ar" || w1 === "ar" || w2 === "ar") return "ar";
    return "en";
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function loadNewsOnce() {
    if (Array.isArray(window.NEWS_CACHE) && window.NEWS_CACHE.length) return window.NEWS_CACHE;
    if (window.NEWS_LOADING) return window.NEWS_CACHE;

    window.NEWS_LOADING = true;
    try {
      const r = await fetch("site/data/news.json", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);

      const data = await r.json();
      const items = Array.isArray(data) ? data : (data.articles || []);
      
      window.NEWS_CACHE = items;
      window.NEWS_INDEX = {};
      for (const p of items) {
        if (p && p.id) window.NEWS_INDEX[p.id] = p;
      }
      window.NEWS_CURSOR = 0;
      return window.NEWS_CACHE;
    } catch(e) {
      console.error("News load failed", e);
      return [];
    } finally {
      window.NEWS_LOADING = false;
    }
  }

  function ensureSentinel() {
    let s = document.getElementById("news-sentinel");
    if (s) return s;
    s = document.createElement("div");
    s.id = "news-sentinel";
    s.style.cssText = "height:1px; width:100%; clear:both;";
    const wrap = document.getElementById("blog-posts-container");
    if (wrap && wrap.parentElement) wrap.parentElement.appendChild(s);
    return s;
  }

  function renderNewsBatch(reset) {
    const container = document.getElementById("blog-posts-container");
    if (!container) return;

    const lang = getCurrentLangSafe();
    const posts = Array.isArray(window.NEWS_CACHE) ? window.NEWS_CACHE : [];

    if (reset) {
      container.innerHTML = "";
      window.NEWS_CURSOR = 0;
    }

    const start = window.NEWS_CURSOR;
    const end = Math.min(posts.length, start + window.NEWS_PAGE_SIZE);
    
    if (start >= end && posts.length > 0) return;
    if (posts.length === 0 && reset) {
        container.innerHTML = '<div class="alert alert-info w-100">No news available.</div>';
        return;
    }

    const frag = document.createDocumentFragment();

    for (let i = start; i < end; i++) {
      const p = posts[i];
      if (!p) continue;

      const title = lang === "ar" ? (p.title_ar || p.title_en) : (p.title_en || p.title_ar);
      const summary = lang === "ar" ? (p.summary_ar || p.summary_en) : (p.summary_en || p.summary_ar);
      const category = lang === "ar" ? (p.category_ar || p.category_en) : (p.category_en || p.category_ar);
      const date = p.date || "";
      const author = lang === "ar" ? (p.author_ar || p.author_en || "") : (p.author_en || p.author_ar || "");
      const img = p.image || "";

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4 mb-4"; 

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0 blog-card" style="border-radius:16px; overflow:hidden;">
          <div style="height:200px; background:#f3f4f6; position:relative;">
            <img loading="lazy" src="${escapeHtml(img)}" alt="${escapeHtml(title)}"
                 style="width:100%; height:100%; object-fit:cover; display:block;"
                 onerror="this.style.display='none'">
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary">${escapeHtml(category || "AI")}</span>
              <small class="text-muted">${escapeHtml(date)}</small>
            </div>
            <h5 class="card-title fw-bold" style="min-height:48px; line-height:1.4;">${escapeHtml(title)}</h5>
            <p class="card-text text-muted" style="flex:1; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">
              ${escapeHtml(summary)}
            </p>
            <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
              <small class="text-muted">${escapeHtml(author)}</small>
              <button class="btn btn-outline-primary btn-sm rounded-pill px-3" data-news-open="${escapeHtml(p.id)}">
                ${lang === "ar" ? "اقرأ المزيد" : "Read more"}
              </button>
            </div>
          </div>
        </div>
      `;

      frag.appendChild(col);
    }

    container.appendChild(frag);
    window.NEWS_CURSOR = end;

    container.querySelectorAll("button[data-news-open]").forEach(btn => {
      if (btn.__bound) return;
      btn.__bound = true;
      btn.addEventListener("click", (e) => {
          e.stopPropagation();
          openBlogPostById(btn.getAttribute("data-news-open"));
      });
    });
    
    container.querySelectorAll(".blog-card").forEach(card => {
        if (card.__bound) return;
        card.__bound = true;
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            if (e.target.closest("button")) return;
            const btn = card.querySelector("button[data-news-open]");
            if (btn) openBlogPostById(btn.getAttribute("data-news-open"));
        });
    });
  }

  function setupNewsInfiniteScroll() {
    const sentinel = ensureSentinel();
    if (!sentinel) return;

    if (window.__NEWS_IO) {
      try { window.__NEWS_IO.disconnect(); } catch (_) {}
    }

    window.__NEWS_IO = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          renderNewsBatch(false);
        }
      }
    }, { root: null, rootMargin: "600px 0px", threshold: 0.01 });

    window.__NEWS_IO.observe(sentinel);
  }

  async function openNewsPageAndRender() {
    await loadNewsOnce();
    renderNewsBatch(true);
    setupNewsInfiniteScroll();
  }

  function renderNewsFromState() {
    if (!Array.isArray(window.NEWS_CACHE)) return;
    renderNewsBatch(true);
    setupNewsInfiniteScroll();
  }

  function openBlogPostById(id) {
    const post = window.NEWS_INDEX ? window.NEWS_INDEX[id] : null;
    if (!post) return;

    window.NEWS_SELECTED_ID = id;
    const lang = getCurrentLangSafe();
    
    const fields = {
        title: lang === "ar" ? (post.title_ar || post.title_en) : (post.title_en || post.title_ar),
        category: lang === "ar" ? (post.category_ar || post.category_en) : (post.category_en || post.category_ar),
        date: post.date || "",
        author: lang === "ar" ? (post.author_ar || post.author_en) : (post.author_en || post.author_ar),
        body: lang === "ar" ? (post.body_ar || post.body_en) : (post.body_en || post.body_ar),
        image: post.image || ""
    };

    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ""; };
    const setSrc = (id, val) => { const el = document.getElementById(id); if (el) el.src = val || ""; };
    const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val || ""; };

    setTxt("blog-post-title", fields.title);
    setTxt("blog-post-category", fields.category);
    setTxt("blog-post-date", fields.date);
    setTxt("blog-post-author", fields.author);
    setSrc("blog-post-image", fields.image);
    setHtml("blog-post-body-container", fields.body);

    if (typeof showPage === "function") {
        showPage("blog-post-page");
    } else {
        document.querySelectorAll(".page").forEach(p => p.style.display = "none");
        const pg = document.getElementById("blog-post-page");
        if (pg) pg.style.display = "block";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.openNewsPageAndRender = openNewsPageAndRender;
  window.renderNewsFromState = renderNewsFromState;
  window.openBlogPostById = openBlogPostById;
  window.loadNewsOnce = loadNewsOnce;

  window.__NEWS_ON_LANG_CHANGE__ = function () {
    const newsPage = document.getElementById("news-page");
    const blogPage = document.getElementById("blog-post-page");
    if (newsPage && newsPage.style.display !== "none") renderNewsFromState();
    if (blogPage && blogPage.style.display !== "none" && window.NEWS_SELECTED_ID) {
        openBlogPostById(window.NEWS_SELECTED_ID);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("news-link");
    if (link && !link.__newsBound) {
      link.__newsBound = true;
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        if (typeof showPage === "function") showPage("news-page");
        try { await openNewsPageAndRender(); } catch (err) { console.error(err); }
      });
    }

    const backBlog = document.getElementById("back-to-home-from-blog");
    if (backBlog) {
        backBlog.addEventListener("click", () => {
            if (typeof showPage === "function") showPage("news-page");
            renderNewsFromState();
        });
    }
  });

})();
// ===== NEWS MODULE END =====
`;

out = out.trimEnd() + "\n" + NEWS_MODULE + "\n";

const outPath = path.join(path.dirname(INPUT), path.basename(INPUT).replace(/\.js$/i, ".PATCHED.news.js"));
fs.writeFileSync(outPath, out, "utf8");
console.log("✅ Patched main.js generated:");
console.log("   " + outPath);
