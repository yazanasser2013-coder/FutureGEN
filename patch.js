const fs = require('fs');
const file = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// 1. Fix favorite click handler
const oldFavHandler = `(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    // Check if the click is on a favorite button or any element inside it
    var favBtn = e.target.closest('.favorite-toggle');
    if (!favBtn) return;

    // Stop ALL propagation immediately
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Get the tool ID and call toggleFavorite
    var toolId = parseInt(favBtn.getAttribute('data-tool-id'), 10);
    if (!isNaN(toolId) && typeof window.toggleFavorite === 'function') {
      window.toggleFavorite(toolId, favBtn);
    } else if (!isNaN(toolId)) {
      // Backup: queue for when toggleFavorite becomes available
      console.log('Favorite clicked for tool ID:', toolId);
      setTimeout(function () {
        if (typeof window.toggleFavorite === 'function') {
          window.toggleFavorite(toolId, favBtn);
        }
      }, 0);
    }
  }, true); // TRUE = CAPTURE PHASE - fires before ANY bubble phase handlers
})();`;

const newFavHandler = `(function () {
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
    }
  }, true);
})();`;

content = content.replace(oldFavHandler, newFavHandler);

// 2. Fix toggleFavoriteByIndex
const oldToggleFavBody = `        document.querySelectorAll('.favorite-toggle[data-tool-index="' + index + '"]').forEach(function (b) { updateFavButtonUI(b, false); });
        if (typeof showToast !== "undefined") showToast(currentLang === "ar" ? "\\u062a\\u0645\\u062a \\u0627\\u0644\\u0625\\u0632\\u0627\\u0644\\u0629 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629" : "Removed from favorites", "info");
    } else {
        favs.push(index);
        saveFavoritesArray(favs);
        document.querySelectorAll('.favorite-toggle[data-tool-index="' + index + '"]').forEach(function (b) { updateFavButtonUI(b, true); });
        if (typeof showToast !== "undefined") showToast(currentLang === "ar" ? "\\u062a\\u0645\\u062a \\u0627\\u0644\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0625\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629" : "Added to favorites", "success");
    }

    updateFavoritesButton();

    if (typeof renderFavoritesModal === "function") {
        var modal = document.getElementById("favoritesModal");
        if (modal && modal.classList.contains("show")) {
            renderFavoritesModal();
        }
    }
};

window.isFavorite = isFavorite;

// Capture-phase favorite toggle handler (runs before bubble handlers)
document.addEventListener("click", function (e) {
    var btn = e.target.closest(".favorite-toggle");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    try { e.stopImmediatePropagation(); } catch (err) { }

    var index = btn.dataset.toolIndex;
    if (index === undefined) return;

    toggleFavoriteByIndex(index, btn);
}, true);`;

const newToggleFavBody = `        document.querySelectorAll('.favorite-toggle[data-tool-index="' + index + '"], .favorite-toggle[data-tool-id="' + index + '"]').forEach(function (b) { updateFavButtonUI(b, false); });
        if (typeof showToast !== "undefined") showToast(currentLang === "ar" ? "\\u062a\\u0645\\u062a \\u0627\\u0644\\u0625\\u0632\\u0627\\u0644\\u0629 \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629" : "Removed from favorites", "info");
    } else {
        favs.push(index);
        saveFavoritesArray(favs);
        document.querySelectorAll('.favorite-toggle[data-tool-index="' + index + '"], .favorite-toggle[data-tool-id="' + index + '"]').forEach(function (b) { updateFavButtonUI(b, true); });
        if (typeof showToast !== "undefined") showToast(currentLang === "ar" ? "\\u062a\\u0645\\u062a \\u0627\\u0644\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0625\\u0644\\u0649 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629" : "Added to favorites", "success");
    }

    updateFavoritesButton();

    if (typeof renderFavoritesModal === "function") {
        var modal = document.getElementById("favoritesModal");
        if (modal && modal.classList.contains("show")) {
            renderFavoritesModal();
        }
    }
};

window.isFavorite = isFavorite;`;

content = content.replace(oldToggleFavBody, newToggleFavBody);

// 3. Remove login requirement for rating
const oldRatingCheck = `    // Check login
    var userData;
    try { userData = JSON.parse(localStorage.getItem('currentUser')); } catch (ex) { }
    if (!userData || !userData.isLoggedIn) {
        showToast(currentLang === 'en' ? 'Please login to rate tools' : '\\u064a\\u0631\\u062c\\u0649 \\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062f\\u062e\\u0648\\u0644 \\u0644\\u062a\\u0642\\u064a\\u064a\\u0645 \\u0627\\u0644\\u0623\\u062f\\u0648\\u0627\\u062a', 'info');
        return;
    }`;
const newRatingCheck = `    // Allow rating without login requirement
    var userData;`;
content = content.replace(oldRatingCheck, newRatingCheck);

// 4. displayToolsByCategories
const oldDisplayCategories = `    // 'newest' = default order

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
        sectionHeader.className = 'category-header';
        sectionHeader.innerHTML = '<h3 class="fw-bold">' + category + '</h3>' +
            '<span class="badge bg-secondary">' + categoryTools.length + ' ' + (isArLang ? '\\u0623\\u062f\\u0648\\u0627\\u062a' : 'tools') + '</span>';

        const toolsGrid = document.createElement('div');
        toolsGrid.className = 'row g-4';

        const toolsToShow = categoryTools.slice(0, 6);

        toolsToShow.forEach(function (tool) {
            const toolCard = createToolCard(tool);
            toolsGrid.appendChild(toolCard);
        });

        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'btn btn-primary show-more-btn';
        showMoreBtn.innerHTML = isArLang ? '\\u0639\\u0631\\u0636 \\u0627\\u0644\\u0645\\u0632\\u064a\\u062f' : 'Show More';
        showMoreBtn.onclick = function () { showAllCategoryTools(category); };

        categorySection.appendChild(sectionHeader);
        categorySection.appendChild(toolsGrid);

        if (categoryTools.length > 6) {
            categorySection.appendChild(showMoreBtn);
        }

        container.appendChild(categorySection);
    });
}`;
const newDisplayCategories = `    // 'newest' = default order

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

content = content.replace(oldDisplayCategories, newDisplayCategories);

// Normalize back to OS line endings if needed, but it works fine with \n
fs.writeFileSync(file, content, 'utf8');
console.log('Patch complete. Replacements made.');
