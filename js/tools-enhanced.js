/*
 * TOOLS ENHANCED SCRIPT
 * ---------------------
 * Adds:
 * 1. 5-Star Rating System (Persisted in localStorage)
 * 2. Filtering & Sorting (Newest, Oldest, Most Rated)
 * 3. Overrides window.createToolCard to inject these features
 * 4. Handles switching between Categories and Tools view for filtering
 */

(function () {
    'use strict';

    // State
    let currentSortMode = 'newest'; // newest, oldest, most_rated
    const STORAGE_KEY_RATINGS = 'user_tool_ratings';

    // Log function for debugging
    function log(msg) {
        console.log(`[ToolsEnhanced] ${msg}`);
    }

    log('Script loaded. Waiting for aiTools...');

    // ==========================================
    // 1. DATA & PERSISTENCE HELPER
    // ==========================================

    function getUserRatings() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_RATINGS) || '{}');
        } catch (e) {
            return {};
        }
    }

    function getToolRating(index) {
        const ratings = getUserRatings();
        return ratings[index] || 0;
    }

    function setToolRating(index, rating) {
        const ratings = getUserRatings();
        ratings[index] = rating;
        localStorage.setItem(STORAGE_KEY_RATINGS, JSON.stringify(ratings));
        log(`Saved rating ${rating} for tool ${index}`);
    }

    function getToolDate(tool) {
        if (tool.logo_updated) {
            return new Date(tool.logo_updated.replace(' ', 'T'));
        }
        return new Date(0);
    }

    // ==========================================
    // 2. SORTING LOGIC
    // ==========================================

    function getSortedTools() {
        // Use the global aiTools
        const tools = (window.aiTools || []).map((tool, index) => ({
            ...tool,
            originalIndex: index, // CRITICAL: Keep track of original index
            userRating: getToolRating(index),
            dateObj: getToolDate(tool)
        }));

        return tools.sort((a, b) => {
            if (currentSortMode === 'newest') {
                return b.dateObj - a.dateObj;
            } else if (currentSortMode === 'oldest') {
                return a.dateObj - b.dateObj;
            } else if (currentSortMode === 'most_rated') {
                if (b.userRating !== a.userRating) {
                    return b.userRating - a.userRating;
                }
                return b.dateObj - a.dateObj;
            }
            return 0;
        });
    }

    // ==========================================
    // 3. RENDERING ENGINE (Override)
    // ==========================================

    // Capture the original function if it exists, or wait for it
    let originalCreateToolCard = window.createToolCard;

    // Defines the override function
    function createToolCardEnhanced(tool, index) {
        // Fallback to original if we haven't captured it yet
        if (!originalCreateToolCard && window.createToolCard && window.createToolCard !== createToolCardEnhanced) {
            originalCreateToolCard = window.createToolCard;
        }

        // Fix for undefined index coming from main.js category rendering
        if (index === undefined || index === null || Number.isNaN(Number(index))) {
            index = (window.aiTools || []).findIndex(t => t === tool);
            // Default to 0 if still not found to prevent NaN errors
            if (index === -1) index = 0;
        }

        let cardCol;
        if (typeof originalCreateToolCard === 'function') {
            cardCol = originalCreateToolCard(tool, index);
        } else {
            console.error('[ToolsEnhanced] originalCreateToolCard not found!');
            return document.createElement('div');
        }

        if (cardCol) {
            const realIndex = (tool.originalIndex !== undefined) ? tool.originalIndex : index;
            const rating = getToolRating(realIndex);

            injectRatingUI(cardCol, realIndex, rating);
        }
        return cardCol;
    }

    // Override the global function immediately and continuously 
    window.createToolCard = createToolCardEnhanced;

    // Exposed function to re-render the list
    // Pagination state
    let renderedCount = 0;
    const pageSize = 40;

    window.renderToolsEnhanced = function (mode) {
        if (mode) currentSortMode = mode;
        log(`Rendering with mode: ${currentSortMode}`);

        // TARGET THE CORRECT CONTAINER
        const listContainer = document.getElementById('featured-tools-container') ||
            document.getElementById('toolsContainer');

        if (!listContainer) {
            log('Error: Tool container not found');
            return;
        }

        // VIEW SWITCHING LOGIC
        // If we are filtering, we ensure the TOOLS section is visible and CATEGORIES is hidden
        const categoriesSection = document.getElementById('categories');
        const toolsSection = document.getElementById('featured') || document.getElementById('tools');

        if (categoriesSection) categoriesSection.style.display = 'none';
        if (toolsSection) {
            toolsSection.style.display = 'block';
            // Scroll to tools if needed
            toolsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Show Back Button if exists
        const backBtn = document.getElementById('backButtonTools');
        if (backBtn) {
            backBtn.style.display = 'inline-flex';
            backBtn.onclick = () => {
                if (categoriesSection) categoriesSection.style.display = 'block';
                if (toolsSection) {
                    // Do not hide the tools section
                    // toolsSection.style.display = 'none';
                    if (typeof window.renderCategories === 'function') {
                        window.renderCategories();
                    }
                    if (typeof window.displayToolsByCategories === 'function') {
                        window.displayToolsByCategories();
                    } else if (typeof window.renderTools === 'function') {
                        window.renderTools();
                    }
                }
                backBtn.style.display = 'none';

                return false;
            };
        }

        // Reset pagination
        renderedCount = 0;
        listContainer.innerHTML = '';

        // Create a ROW for the grid if not present in container (main.js sometimes creates it)
        const row = document.createElement('div');
        row.className = 'row g-4'; // Standard Bootstrap row
        listContainer.appendChild(row);

        const sortedTools = getSortedTools();
        log(`Found ${sortedTools.length} tools to render`);

        // Render ALL tools at once (Pagination Removed)
        sortedTools.forEach(toolItem => {
            const cardCol = createToolCardEnhanced(toolItem, toolItem.originalIndex);
            if (cardCol) row.appendChild(cardCol);
        });

        const existingBtn = listContainer.querySelector('.load-more-container');
        if (existingBtn) existingBtn.remove();
        updateFilterButtonsState();
    };


    function injectRatingUI(cardCol, index, currentRating) {
        const cardBody = cardCol.querySelector('.card-body');
        if (!cardBody || cardCol.querySelector('.tool-rating')) return;

        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'tool-rating mt-2 mb-2 d-flex align-items-center gap-1';
        ratingContainer.style.direction = 'ltr';

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.className = i <= currentRating ? 'fas fa-star text-warning' : 'far fa-star text-muted';
            star.style.cursor = 'pointer';
            star.style.transition = 'color 0.2s';

            star.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                setToolRating(index, i);
                currentRating = i;
                updateStarsVisual(ratingContainer, i);
            };

            star.onmouseover = () => updateStarsVisual(ratingContainer, i);
            star.onmouseout = () => updateStarsVisual(ratingContainer, currentRating);

            ratingContainer.appendChild(star);
        }

        const titleRow = cardBody.querySelector('.d-flex.justify-content-between');
        if (titleRow) {
            titleRow.after(ratingContainer);
        } else {
            cardBody.prepend(ratingContainer);
        }
    }

    function updateStarsVisual(container, activeCount) {
        const stars = container.querySelectorAll('i');
        stars.forEach((star, idx) => {
            if (idx < activeCount) {
                star.className = 'fas fa-star text-warning';
            } else {
                star.className = 'far fa-star text-muted';
            }
        });
    }

    function updateFilterButtonsState() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.sort === currentSortMode) {
                btn.classList.add('active', 'btn-primary');
                btn.classList.remove('btn-outline-primary');
            } else {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            }
        });
    }

    // ==========================================
    // 4. INITIALIZATION
    // ==========================================

    function init() {
        // Target the HEADER area of the tools section to inject filters
        // In index.html, #featured > .container contains a text-center div with title.
        // We want to inject AFTER that title.

        const toolsSection = document.getElementById('featured') || document.getElementById('tools');
        if (toolsSection) {
            const container = toolsSection.querySelector('.container');
            const titleDiv = container ? container.querySelector('.text-center') : null;

            if (container && !document.querySelector('.tools-filter-bar')) {
                const filterBar = document.createElement('div');
                filterBar.className = 'tools-filter-bar d-flex gap-2 mt-5 pt-3 mb-4 flex-wrap justify-content-center';
                filterBar.innerHTML = `
                    <button class="btn btn-outline-primary filter-btn rounded-pill" data-sort="newest">
                        <i class="fas fa-sort-amount-down"></i> <span data-ar="الأحدث" data-en="Newest">Newest</span>
                    </button>
                    <button class="btn btn-outline-primary filter-btn rounded-pill" data-sort="oldest">
                        <i class="fas fa-sort-amount-up"></i> <span data-ar="الأقدم" data-en="Oldest">Oldest</span>
                    </button>
                    <button class="btn btn-outline-primary filter-btn rounded-pill" data-sort="most_rated">
                        <i class="fas fa-star"></i> <span data-ar="الأكثر تقييماً" data-en="Most Rated">Most Rated</span>
                    </button>
                 `;

                // Insert after title
                if (titleDiv) {
                    titleDiv.after(filterBar);
                } else {
                    container.prepend(filterBar);
                }

                filterBar.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const mode = e.currentTarget.dataset.sort;
                        window.renderToolsEnhanced(mode);
                    });
                });
            }
        }

        // Poll for aiTools
        const checkTools = setInterval(() => {
            if (window.aiTools && window.aiTools.length > 0) {
                clearInterval(checkTools);
                log('aiTools found. Initializing override...');

                if (!originalCreateToolCard && window.createToolCard !== createToolCardEnhanced) {
                    originalCreateToolCard = window.createToolCard;
                }
                window.createToolCard = createToolCardEnhanced;

                // We do NOT render automatically on load because it might disrupt the default view (Categories).
                // We only render when a filter is clicked OR if we want to default to something.
                // But the user requested "Add filtering mechanism".
                // Stars should appear on existing cards naturally via the createToolCard override
                // IF main.js stays calling createToolCard.

                // However, main.js might have ALREADY rendered categories using the original function
                // before we swapped it.
                // If so, we can't easily "inject" stars into already rendered DOM without re-rendering.
                // But stars are inside the card.

                // Strategy: if cards are already there, iterate and inject?
                // But cards in categories view are "category cards", not "tool cards"? 
                // No, internal pages might have tools.

                // Let's assume the user starts navigating.
                log('Override active.');
            }
        }, 100);

        setTimeout(() => clearInterval(checkTools), 10000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
