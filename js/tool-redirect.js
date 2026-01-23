/**
 * ULTIMATE FIX: Replace all Details buttons with actual links
 * This runs immediately and continuously watches for new buttons
 */
(function () {
    'use strict';

    function generateSlug(name) {
        return (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    function convertButtonToLink(btn) {
        if (btn.dataset.converted === 'true') return;
        btn.dataset.converted = 'true';

        var toolIndex = btn.getAttribute('data-tool-id');
        if (!toolIndex) {
            var container = btn.closest('[data-tool-id]');
            if (container) toolIndex = container.getAttribute('data-tool-id');
        }

        var tools = window.aiTools || [];
        var tool = tools[parseInt(toolIndex, 10)];

        if (tool && tool.name) {
            var slug = generateSlug(tool.name);
            if (slug) {
                var href = '/tools/' + slug + '.html';

                // Create a real link
                var link = document.createElement('a');
                link.href = href;
                link.className = btn.className;
                link.innerHTML = btn.innerHTML;
                link.style.cssText = btn.style.cssText;

                // Replace button with link
                if (btn.parentNode) {
                    btn.parentNode.replaceChild(link, btn);
                }
            }
        }
    }

    function convertAllButtons() {
        var buttons = document.querySelectorAll('.view-details-btn');
        buttons.forEach(convertButtonToLink);
    }

    // Run immediately
    convertAllButtons();

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', convertAllButtons);
    }

    // Watch for new buttons being added
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) {
                    if (node.classList && node.classList.contains('view-details-btn')) {
                        setTimeout(function () { convertButtonToLink(node); }, 50);
                    }
                    var nestedBtns = node.querySelectorAll ? node.querySelectorAll('.view-details-btn') : [];
                    nestedBtns.forEach(function (b) {
                        setTimeout(function () { convertButtonToLink(b); }, 50);
                    });
                }
            });
        });
    });

    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });

    // Also run periodically as backup
    setInterval(convertAllButtons, 2000);

    console.log('✅ Details buttons converted to links');
})();
