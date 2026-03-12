const fs = require('fs');
const file = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(file, 'utf8');
let modified = false;

// Helpers
function replaceBetween(content, startString, endString, newContent) {
    let startIdx = content.indexOf(startString);
    if (startIdx === -1) return content;
    let endIdx = content.indexOf(endString, startIdx);
    if (endIdx === -1) return content;

    modified = true;
    return content.substring(0, startIdx) + newContent + "\n" + content.substring(endIdx);
}

// 1. Rewrite displayToolsByCategories
let displayToolsStart = "function displayToolsByCategories(sortMode) {";
let displayToolsEnd = "// دالة لعرض جميع أدوات قسم معين";
let newDisplayTools = `function displayToolsByCategories(sortMode) {
    const container = document.getElementById('featured-tools-container');
    container.innerHTML = '';

    // Sorting Filter Bar
    const isArLang = (localStorage.getItem('lang') === 'ar');
    const filterBar = document.createElement('div');
    filterBar.className = 'sorting-filter-bar d-flex flex-wrap gap-2 justify-content-center mb-4';
    filterBar.style.cssText = 'padding: 10px 0;';
    const sortOptions = [
        { key: 'newest', labelEn: 'Newest', labelAr: 'الأحدث' },
        { key: 'oldest', labelEn: 'Oldest', labelAr: 'الأقدم' },
        { key: 'rated', labelEn: 'Most Rated', labelAr: 'الأكثر تقييماً' }
    ];
    sortOptions.forEach(function (opt) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm ' + (sortMode === opt.key ? 'btn-primary' : 'btn-outline-primary');
        btn.style.cssText = 'border-radius: 20px; padding: 6px 18px; font-weight: 600; font-family: inherit;';
        btn.textContent = isArLang ? opt.labelAr : opt.labelEn;
        btn.addEventListener('click', function () { displayToolsByCategories(opt.key); });
        filterBar.appendChild(btn);
    });

    // Add Back / Reset Filter button
    if (sortMode) {
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-sm btn-danger back-button ms-2';
        resetBtn.style.cssText = 'border-radius: 20px; padding: 6px 18px; font-weight: 600; font-family: inherit; margin-inline-start: 10px;';
        resetBtn.innerHTML = '<i class="fas fa-arrow-left me-1"></i> ' + (isArLang ? 'العودة' : 'Back');
        resetBtn.addEventListener('click', function () { displayToolsByCategories(null); });
        filterBar.appendChild(resetBtn);
    }
    
    container.appendChild(filterBar);

    // Build sorted tools list
    let sortedTools = typeof aiTools !== 'undefined' ? aiTools.slice() : [];
    if (sortMode === 'oldest') {
        sortedTools.reverse(); 
    } else if (sortMode === 'rated') {
        sortedTools.sort(function (a, b) {
            var rA = getUserRating(typeof aiTools !== 'undefined' ? aiTools.indexOf(a) : 0) || a.rating || 0;
            var rB = getUserRating(typeof aiTools !== 'undefined' ? aiTools.indexOf(b) : 0) || b.rating || 0;
            return rB - rA;
        });
    }

    if (!sortMode) {
        // DEFAULT: Show grouped by category
        const toolsByCategory = {};
        sortedTools.forEach(function (tool) {
            if (!toolsByCategory[tool.category]) {
                toolsByCategory[tool.category] = [];
            }
            toolsByCategory[tool.category].push(tool);
        });

        Object.keys(toolsByCategory).forEach(function (category) {
            const categoryTools = toolsByCategory[category];
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section mb-5';
            categorySection.id = 'category-' + category.replace(/\\s+/g, '-').toLowerCase();

            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'category-header mt-4 mb-3';
            sectionHeader.innerHTML = '<h3 class="fw-bold">' + category + '</h3>' +
                '<span class="badge bg-secondary">' + categoryTools.length + ' ' + (isArLang ? 'أداة' : 'tools') + '</span>';

            const toolsGrid = document.createElement('div');
            toolsGrid.className = 'row g-4';

            const toolsToShow = categoryTools.slice(0, 6);
            toolsToShow.forEach(function (tool) {
                const toolCard = createToolCard(tool);
                toolsGrid.appendChild(toolCard);
            });

            const showMoreBtn = document.createElement('button');
            showMoreBtn.className = 'btn btn-outline-primary show-more-btn mt-3';
            showMoreBtn.innerHTML = isArLang ? 'عرض المزيد' : 'Show More';
            showMoreBtn.onclick = function () { showAllCategoryTools(category); };

            categorySection.appendChild(sectionHeader);
            categorySection.appendChild(toolsGrid);

            if (categoryTools.length > 6) {
                categorySection.appendChild(showMoreBtn);
            }

            container.appendChild(categorySection);
        });
    } else {
        // FILTER APPLIED: Show ALL tools without truncation
        const toolsGrid = document.createElement('div');
        toolsGrid.className = 'row g-4 mb-5';

        // Render ALL tools natively - this might be large, but it's what they asked for
        sortedTools.forEach(function (tool) {
            const toolCard = createToolCard(tool);
            toolsGrid.appendChild(toolCard);
        });

        container.appendChild(toolsGrid);
    }
}
`;

content = replaceBetween(content, displayToolsStart, displayToolsEnd, newDisplayTools);
if (content.indexOf(displayToolsStart) !== -1) console.log("Filters logic patched successfully");

// 2. Fix the detailed delegated click listener (around line 141296)
let delegatedStart = "// Delegated details click (survives any re-render)\n  document.addEventListener('click', function (e) {";
let delegatedEnd = "showToolDetailsSmart(id);\n  }, true);";

if (content.indexOf(delegatedStart) === -1) {
    // try removing the newlines if different
    delegatedStart = "// Delegated details click (survives any re-render)\r\n  document.addEventListener('click', function (e) {";
}

let newDelegated = `// Delegated details click (survives any re-render)
  document.addEventListener('click', function (e) {
    // Add exclusions for stars, favorite, and general interactive elements so they don't jump to the details page
    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn, a[target="_blank"]')) return;
    
    // Check if the element has one of the specific action classes as well
    const closestFav = e.target.closest('.favorite-toggle');
    const closestStar = e.target.closest('.star-click');
    if (closestFav || closestStar) return;

    const btn = e.target.closest('.view-details-btn, .details-btn, [data-tool-id], [data-id]');
    if (!btn) return;
    
    if (btn.classList.contains('favorite-toggle') || btn.classList.contains('star-click')) return;

    const raw = btn.dataset.toolId || btn.dataset.id || btn.getAttribute('data-tool-id') || btn.getAttribute('data-id');
    if (raw == null) return;

    const id = parseInt(raw, 10);
    if (Number.isNaN(id)) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    showToolDetailsSmart(id);
  }, true);`;

if (content.indexOf(delegatedStart) !== -1) {
    content = replaceBetween(content, delegatedStart, "showToolDetailsSmart(id);\r\n  }, true);", newDelegated);
    if (content.indexOf(newDelegated) === -1) {
        content = replaceBetween(content, delegatedStart, "showToolDetailsSmart(id);\n  }, true);", newDelegated);
    }
    console.log("Delegated click patched successfully");
} else {
    console.log("Delegated click start not found! " + content.indexOf("// Delegated details click"));
}

// 3. Fix the favorite button capture-phase listener
let favStart = "(function () {\n  'use strict';\n  document.addEventListener('click', function (e) {\n    // Check if the click is on a favorite button or any element inside it";
if (content.indexOf(favStart) === -1) favStart = "(function () {\r\n  'use strict';\r\n  document.addEventListener('click', function (e) {\r\n    // Check if the click is on a favorite button or any element inside it";

let favEnd = "}, true); // TRUE = CAPTURE PHASE";
if (content.indexOf(favStart) !== -1) {
    let newFav = `(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    var favBtn = e.target.closest('.favorite-toggle');
    if (!favBtn) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var toolIdStr = favBtn.getAttribute('data-tool-id') || favBtn.getAttribute('data-tool-index');
    var toolId = parseInt(toolIdStr, 10);
    if (!isNaN(toolId) && typeof window.toggleFavoriteByIndex === 'function') {
      window.toggleFavoriteByIndex(toolId, favBtn);
    } else if (!isNaN(toolId)) {
      setTimeout(function () {
        if (typeof window.toggleFavoriteByIndex === 'function') {
          window.toggleFavoriteByIndex(toolId, favBtn);
        } else if (typeof window.toggleFavorite === 'function') {
          window.toggleFavorite(toolId, favBtn);
        }
      }, 0);
    }
  }, true);`;
    content = replaceBetween(content, favStart, favEnd, newFav);
    console.log("Favorite capture patched successfully");
} else {
    console.log("Favorite capture start not found");
}

// 4. Update the toggleFavoriteByIndex correctly
let toggleFavStart = "function toggleFavoriteByIndex(index, btnEl) {";
let toggleFavEnd = "window.isFavorite = isFavorite;";

let RegExpMatch = content.match(/function toggleFavoriteByIndex[\s\S]*?window\.isFavorite = isFavorite;/);
if (RegExpMatch && RegExpMatch[0]) {
    let toggleBody = RegExpMatch[0];
    let newToggleHTMLBody = toggleBody
        .replace(/\.favorite-toggle\[data-tool-index="\s*\+\s*index\s*\+\s*'"\]/g, '.favorite-toggle[data-tool-index="' + "' + index + '" + '"], .favorite-toggle[data-tool-id="' + "' + index + '" + '"]')
        .replace(/updateFavButtonUI\(b, false\)/g, 'updateFavButtonUI(b, false); b.classList.remove("active");')
        .replace(/updateFavButtonUI\(b, true\)/g, 'updateFavButtonUI(b, true); b.classList.add("active");')
        .replace('.forEach(function (b) { updateFavButtonUI(b, true); b.classList.add("active"); });', '.forEach(function (b) { updateFavButtonUI(b, true); b.classList.add("active"); b.innerHTML = \'<i class="fas fa-heart" style="color: #f4cf55"></i>\'; });')
        .replace('.forEach(function (b) { updateFavButtonUI(b, false); b.classList.remove("active"); });', '.forEach(function (b) { updateFavButtonUI(b, false); b.classList.remove("active"); b.innerHTML = \'<i class="far fa-heart" style="color: #ffffff"></i>\'; });');

    // Remove login check and apply fixes
    content = content.replace(RegExpMatch[0], newToggleHTMLBody);
    console.log("toggleFavoriteByIndex regex patched successfully");
}

// remove login check for ratings
let ratingStart = "function rateTool(toolIndex, rating) {";
let reqCheck = `    var userData;
    try { userData = JSON.parse(localStorage.getItem('currentUser')); } catch (ex) { }
    if (!userData || !userData.isLoggedIn) {
        showToast(currentLang === 'en' ? 'Please login to rate tools' : '\\u064a\\u0631\\u062c\\u0649 \\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062f\\u062e\\u0648\\u0644 \\u0644\\u062a\\u0642\\u064a\\u064a\\u0645 \\u0627\\u0644\\u0623\\u062f\\u0648\\u0627\\u062a', 'info');
        return;
    }`;

content = content.replace(reqCheck, "    var userData = {isLoggedIn: true}; // Replaced to allow rating without login");

// 5. Aggressive static redirect block
let staticRedirect = `// ===== PATCH: Redirect Details buttons to static tool pages =====
(function () {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.view-details-btn');`;

let staticRedirectEnd = `e.stopImmediatePropagation();`;

if (content.indexOf(staticRedirect) > -1) {
    let newStatic = `// ===== PATCH: Redirect Details buttons to static tool pages =====
(function () {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn')) return;
    const btn = e.target.closest('.view-details-btn');`;
    content = replaceBetween(content, staticRedirect, staticRedirectEnd, newStatic);
    console.log("Static redirect intercept patched successfully");
} else {
    // maybe CRLF
    let staticRedirectCRLF = `// ===== PATCH: Redirect Details buttons to static tool pages =====\r\n(function () {\r\n  document.addEventListener('click', function (e) {\r\n    const btn = e.target.closest('.view-details-btn');`;
    if (content.indexOf(staticRedirectCRLF) > -1) {
        let newStatic = `// ===== PATCH: Redirect Details buttons to static tool pages =====
(function () {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn')) return;
    const btn = e.target.closest('.view-details-btn');`;
        content = replaceBetween(content, staticRedirectCRLF, staticRedirectEnd, newStatic);
        console.log("Static redirect intercept patched successfully (CRLF)");
    }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Patch complete.');
