const fs = require('fs');
const file = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// Fix 1: Stop generic click listener from intercepting favorite/star/link clicks
const oldDetailListener = `  // Delegated details click (survives any re-render)
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.view-details-btn, .details-btn, [data-tool-id], [data-id]');
    if (!btn) return;

    const raw = btn.dataset.toolId || btn.dataset.id || btn.getAttribute('data-tool-id') || btn.getAttribute('data-id');
    if (raw == null) return;

    const id = parseInt(raw, 10);
    if (Number.isNaN(id)) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    showToolDetailsSmart(id);
  }, true);`;

const newDetailListener = `  // Delegated details click (survives any re-render)
  document.addEventListener('click', function (e) {
    // DO NOT intercept if clicking on a favorite toggle, a star, or a visit button
    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn, a[target=\"_blank\"]')) return;

    const btn = e.target.closest('.view-details-btn, .details-btn, [data-tool-id], [data-id]');
    if (!btn) return;

    // Additionally check if the element has one of the specific action classes to be extra safe
    if (btn.classList.contains('favorite-toggle') || btn.classList.contains('star-click')) return;

    // Only allow redirect if the button actually clicked is the details button
    // Or if the user clicked inside the card (which has data-tool-id), BUT NOT on an interactive element
    const raw = btn.dataset.toolId || btn.dataset.id || btn.getAttribute('data-tool-id') || btn.getAttribute('data-id');
    if (raw == null) return;

    const id = parseInt(raw, 10);
    if (Number.isNaN(id)) return;

    e.preventDefault();
    e.stopPropagation();
    try { e.stopImmediatePropagation(); } catch(err) {}
    showToolDetailsSmart(id);
  }, true);`;

if (content.includes(oldDetailListener)) {
    content = content.replace(oldDetailListener, newDetailListener);
}

// Fix 2: Another aggressive details click listener at the bottom
const oldAggressiveListener = `(function () {
  // Override at the earliest possible moment
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.view-details-btn');
    if (!btn) return;

    // Stop everything else
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();`;

const newAggressiveListener = `(function () {
  // Override at the earliest possible moment
  document.addEventListener('click', function (e) {
    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn, a[target=\"_blank\"]')) return;

    const btn = e.target.closest('.view-details-btn');
    if (!btn) return;

    // Stop everything else
    e.preventDefault();
    e.stopPropagation();
    try { e.stopImmediatePropagation(); } catch(err) {}`;

if (content.includes(oldAggressiveListener)) {
    content = content.replace(oldAggressiveListener, newAggressiveListener);
}

// Fix 3: Restore Categories logic on default, but show ALL tools on sort, + Back Button
const oldDisplayCategories = `function displayToolsByCategories(sortMode) {
    const container = document.getElementById('featured-tools-container');
    container.innerHTML = '';

    // Sorting Filter Bar
    const isArLang = (localStorage.getItem('lang') === 'ar');
    const filterBar = document.createElement('div');
    filterBar.className = 'sorting-filter-bar d-flex flex-wrap gap-2 justify-content-center mb-4';
    filterBar.style.cssText = 'padding: 10px 0;';
    const sortOptions = [
        { key: 'newest', labelEn: 'Newest First', labelAr: '\\u0627\\u0644\\u0623\\u062d\\u062f\\u062b \\u0623\\u0648\\u0644\\u0627\\u064b' },
        { key: 'oldest', labelEn: 'Oldest First', labelAr: '\\u0627\\u0644\\u0623\\u0642\\u062f\\u0645 \\u0623\\u0648\\u0644\\u0627\\u064b' },
        { key: 'rated', labelEn: 'Most Rated', labelAr: '\\u0627\\u0644\\u0623\\u0639\\u0644\\u0649 \\u062a\\u0642\\u064a\\u064a\\u0645\\u0627\\u064b' }
    ];
    sortOptions.forEach(function (opt) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm ' + (sortMode === opt.key ? 'btn-primary' : 'btn-outline-primary');
        btn.style.cssText = 'border-radius: 20px; padding: 6px 18px; font-weight: 600;';
        btn.textContent = isArLang ? opt.labelAr : opt.labelEn;
        btn.addEventListener('click', function () { displayToolsByCategories(opt.key); });
        filterBar.appendChild(btn);
    });
    container.appendChild(filterBar);

    // Build sorted tools list
    let sortedTools = aiTools.slice(); // clone
    if (sortMode === 'oldest') {
        sortedTools.reverse();
    } else if (sortMode === 'rated') {
        sortedTools.sort(function (a, b) {
            var rA = getUserRating(aiTools.indexOf(a)) || a.rating || 0;
            var rB = getUserRating(aiTools.indexOf(b)) || b.rating || 0;
            return rB - rA;
        });
    }
    // 'newest' = default order

    // Render ALL tools directly without categories
    const toolsGrid = document.createElement('div');
    toolsGrid.className = 'row g-4';

    // To prevent browser lag with 4000+ cards, render top 100
    const toolsToShow = sortedTools.slice(0, 100);

    toolsToShow.forEach(function (tool) {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);
    });

    container.appendChild(toolsGrid);
}`;

const newDisplayCategories = `function displayToolsByCategories(sortMode) {
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
    let sortedTools = aiTools.slice(); // clone
    if (sortMode === 'oldest') {
        sortedTools.reverse(); // assuming arrays default is newest
    } else if (sortMode === 'rated') {
        sortedTools.sort(function (a, b) {
            var rA = getUserRating(aiTools.indexOf(a)) || a.rating || 0;
            var rB = getUserRating(aiTools.indexOf(b)) || b.rating || 0;
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

            // Just feature 6 initially to keep DOM clean
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
        // FILTER APPLIED: Show ALL tools sequentially
        const toolsGrid = document.createElement('div');
        toolsGrid.className = 'row g-4 mb-5';

        // Render ALL tools per user request
        const toolsToShow = sortedTools;

        // Note: Rendering 4200 DOM nodes at once might lag the browser for ~2 seconds.
        // If they specifically requested this exact behavior:
        toolsToShow.forEach(function (tool) {
            const toolCard = createToolCard(tool);
            toolsGrid.appendChild(toolCard);
        });

        container.appendChild(toolsGrid);
    }
}`;

if (content.includes(oldDisplayCategories)) {
    content = content.replace(oldDisplayCategories, newDisplayCategories);
} else {
    // If not found, perhaps I need to find the specific block I patched before
    const patchSearchStr = `    // To prevent browser lag with 4000+ cards, render top 100
    const toolsToShow = sortedTools.slice(0, 100);`;
    if (content.includes(patchSearchStr)) {
        // Construct Regex or string replacement specifically
        const exactCurrentStr = `function displayToolsByCategories(sortMode) {
    const container = document.getElementById('featured-tools-container');
    container.innerHTML = '';

    // Sorting Filter Bar
    const isArLang = (localStorage.getItem('lang') === 'ar');
    const filterBar = document.createElement('div');
    filterBar.className = 'sorting-filter-bar d-flex flex-wrap gap-2 justify-content-center mb-4';
    filterBar.style.cssText = 'padding: 10px 0;';
    const sortOptions = [
        { key: 'newest', labelEn: 'Newest First', labelAr: '\\u0627\\u0644\\u0623\\u062d\\u062f\\u062b \\u0623\\u0648\\u0644\\u0627\\u064b' },
        { key: 'oldest', labelEn: 'Oldest First', labelAr: '\\u0627\\u0644\\u0623\\u0642\\u062f\\u0645 \\u0623\\u0648\\u0644\\u0627\\u064b' },
        { key: 'rated', labelEn: 'Most Rated', labelAr: '\\u0627\\u0644\\u0623\\u0639\\u0644\\u0649 \\u062a\\u0642\\u064a\\u064a\\u0645\\u0627\\u064b' }
    ];
    sortOptions.forEach(function (opt) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm ' + (sortMode === opt.key ? 'btn-primary' : 'btn-outline-primary');
        btn.style.cssText = 'border-radius: 20px; padding: 6px 18px; font-weight: 600;';
        btn.textContent = isArLang ? opt.labelAr : opt.labelEn;
        btn.addEventListener('click', function () { displayToolsByCategories(opt.key); });
        filterBar.appendChild(btn);
    });
    container.appendChild(filterBar);

    // Build sorted tools list
    let sortedTools = aiTools.slice(); // clone
    if (sortMode === 'oldest') {
        sortedTools.reverse();
    } else if (sortMode === 'rated') {
        sortedTools.sort(function (a, b) {
            var rA = getUserRating(aiTools.indexOf(a)) || a.rating || 0;
            var rB = getUserRating(aiTools.indexOf(b)) || b.rating || 0;
            return rB - rA;
        });
    }
    // 'newest' = default order

    // Render ALL tools directly without categories
    const toolsGrid = document.createElement('div');
    toolsGrid.className = 'row g-4';

    // To prevent browser lag with 4000+ cards, render top 100
    const toolsToShow = sortedTools.slice(0, 100);

    toolsToShow.forEach(function (tool) {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);
    });

    container.appendChild(toolsGrid);
}`;
        content = content.replace(exactCurrentStr, newDisplayCategories);
    }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Patch 2 complete. Replacements made.');
