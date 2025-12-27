// Node.js script to safely append the favorite button fix
const fs = require('fs');
const path = 'd:/Yazan Nasser/FutureGEN/js/main.js';

// Read existing content with proper UTF-8 encoding
let content = fs.readFileSync(path, 'utf8');

// The fix code to append - using ASCII-safe JavaScript to avoid encoding issues
const fixCode = `

// =================================================================================
// DEFINITIVE FIX: ULTRA-HIGH-PRIORITY FAVORITE BUTTON HANDLER
// This captures ALL favorite button clicks BEFORE any other handlers
// =================================================================================
(function() {
    'use strict';
    document.addEventListener('click', function(e) {
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
            setTimeout(function() {
                if (typeof window.toggleFavorite === 'function') {
                    window.toggleFavorite(toolId, favBtn);
                }
            }, 0);
        }
    }, true); // TRUE = CAPTURE PHASE - fires before ANY bubble phase handlers
})();

// Expose toggleFavorite globally for inline onclick handlers
if (typeof toggleFavorite === 'function') {
    window.toggleFavorite = toggleFavorite;
}
if (typeof aiTools !== 'undefined') {
    window.aiTools = aiTools;
}

// Global click handler as backup
window.handleFavoriteClick = function(index, btn) {
    if (typeof toggleFavorite === 'function') {
        toggleFavorite(index, btn);
    } else {
        console.error('toggleFavorite function not found');
    }
};
`;

// Append the fix
content += fixCode;

// Write back with UTF-8 BOM to ensure proper encoding
fs.writeFileSync(path, '\ufeff' + content.replace(/^\ufeff/, ''), 'utf8');

console.log('Applied favorite button fix successfully!');
