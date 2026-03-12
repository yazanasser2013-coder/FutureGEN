const fs = require('fs');
const file = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(file, 'utf8');

let oldFilterBarLogic = `    // Sorting Filter Bar
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
    
    container.appendChild(filterBar);`;

let newFilterBarLogic = `    // Sorting Filter Bar
    const isArLang = (localStorage.getItem('lang') === 'ar');
    const filterBar = document.createElement('div');
    filterBar.className = 'sorting-filter-bar d-flex flex-wrap justify-content-center mb-4';
    filterBar.style.cssText = 'padding: 15px 0; gap: 12px; align-items: center;';
    const sortOptions = [
        { key: 'newest', labelEn: 'Newest', labelAr: 'الأحدث' },
        { key: 'oldest', labelEn: 'Oldest', labelAr: 'الأقدم' },
        { key: 'rated', labelEn: 'Most Rated', labelAr: 'الأكثر تقييماً' }
    ];
    sortOptions.forEach(function (opt) {
        const btn = document.createElement('button');
        btn.className = 'btn shadow-sm ' + (sortMode === opt.key ? 'btn-primary' : 'btn-outline-primary');
        // Unify padding, line-height, and height
        btn.style.cssText = 'border-radius: 25px; padding: 10px 24px; font-size: 15px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; height: 44px; transition: all 0.3s ease; letter-spacing: 0.3px;';
        
        btn.textContent = isArLang ? opt.labelAr : opt.labelEn;
        btn.addEventListener('click', function () { displayToolsByCategories(opt.key); });
        filterBar.appendChild(btn);
    });

    // Add Back / Reset Filter button
    if (sortMode) {
        const resetBtn = document.createElement('button');
        // Remove 'back-button' and 'btn-danger' to drop any interfering CSS that shrinks it / breaks gradient
        resetBtn.className = 'btn shadow-sm';
        // Add a nice dark gradient or soft dark grey
        resetBtn.style.cssText = 'border-radius: 25px; padding: 10px 24px; font-size: 15px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; height: 44px; transition: all 0.3s ease; letter-spacing: 0.3px; background: linear-gradient(135deg, #4b5563, #374151); color: #ffffff; border: none; margin-inline-start: 10px;';
        
        resetBtn.innerHTML = '<i class="fas fa-arrow-left me-2"></i> ' + (isArLang ? 'العودة' : 'Back');
        resetBtn.addEventListener('click', function () { displayToolsByCategories(null); });
        
        // Hover effect helper for inline background
        resetBtn.onmouseover = function() { this.style.opacity = '0.85'; this.style.transform = 'translateY(-2px)'; };
        resetBtn.onmouseout = function() { this.style.opacity = '1'; this.style.transform = 'translateY(0)'; };
        
        filterBar.appendChild(resetBtn);
    }
    
    container.appendChild(filterBar);`;

let normalizedContent = content.replace(/\r\n/g, '\n');
let normalizedBlock = oldFilterBarLogic.replace(/\r\n/g, '\n');

if (normalizedContent.indexOf(normalizedBlock) !== -1) {
    let replaced = normalizedContent.replace(normalizedBlock, newFilterBarLogic);
    fs.writeFileSync(file, replaced, 'utf8');
    console.log("Filter UI patched successfully.");
} else {
    // try fallback regex just in case
    let fallbackRegex = /\/\/ Sorting Filter Bar[\s\S]*?container\.appendChild\(filterBar\);/;
    if (fallbackRegex.test(content)) {
        let replaced = content.replace(fallbackRegex, newFilterBarLogic);
        fs.writeFileSync(file, replaced, 'utf8');
        console.log("Filter UI patched successfully with fallback regex.");
    } else {
        console.log("Could not find filter UI block.");
    }
}
