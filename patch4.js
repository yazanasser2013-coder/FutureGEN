const fs = require('fs');
const file = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(file, 'utf8');

// The bug in patch3: 
// if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn')) return;
// const btn = e.target.closest('.view-details-btn');
// e.stopImmediatePropagation();

let badBlock = `    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn')) return;
    const btn = e.target.closest('.view-details-btn');
e.stopImmediatePropagation();`;

let goodBlock = `    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn')) return;
    const btn = e.target.closest('.view-details-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    try { e.stopImmediatePropagation(); } catch(err) {}`;

if (content.indexOf(badBlock) !== -1) {
    content = content.replace(badBlock, goodBlock);
    console.log("Bug 1 fixed.");
} else {
    // maybe \r\n
    badBlock = "    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn')) return;\r\n    const btn = e.target.closest('.view-details-btn');\r\ne.stopImmediatePropagation();";
    if (content.indexOf(badBlock) !== -1) {
        content = content.replace(badBlock, goodBlock);
        console.log("Bug 1 fixed (CRLF).");
    } else {
        console.log("Bug 1 block not found. Checking exactly what is there.");
        let idx = content.indexOf("const btn = e.target.closest('.view-details-btn');\ne.stopImmediatePropagation();");
        if (idx !== -1) {
            content = content.replace("const btn = e.target.closest('.view-details-btn');\ne.stopImmediatePropagation();",
                "const btn = e.target.closest('.view-details-btn');\n    if (!btn) return;\n    e.preventDefault();\n    e.stopPropagation();\n    try { e.stopImmediatePropagation(); } catch(err) {}");
            console.log("Bug 1 fixed by partial match.");
        }
    }
}

// Another aggressive fix block at 142236 in main.js
let aggressiveBlock = `// ===== AGGRESSIVE FIX: Force Details buttons to navigate to static pages =====
(function () {
  // Override at the earliest possible moment
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.view-details-btn');
    if (!btn) return;`;

let aggressiveGood = `// ===== AGGRESSIVE FIX: Force Details buttons to navigate to static pages =====
(function () {
  // Override at the earliest possible moment
  document.addEventListener('click', function (e) {
    if (e.target.closest('.favorite-toggle, .star-click, .visit-website-btn, a[target="_blank"]')) return;
    const btn = e.target.closest('.view-details-btn');
    if (!btn) return;`;

if (content.indexOf(aggressiveBlock) !== -1) {
    content = content.replace(aggressiveBlock, aggressiveGood);
    console.log("Bug 2 (aggressive block) fixed.");
} else {
    aggressiveBlock = `// ===== AGGRESSIVE FIX: Force Details buttons to navigate to static pages =====\r\n(function () {\r\n  // Override at the earliest possible moment\r\n  document.addEventListener('click', function (e) {\r\n    const btn = e.target.closest('.view-details-btn');\r\n    if (!btn) return;`;
    if (content.indexOf(aggressiveBlock) !== -1) {
        content = content.replace(aggressiveBlock, aggressiveGood);
        console.log("Bug 2 (aggressive block) fixed (CRLF).");
    }
}

// Fix toggleFavoriteByIndex heart UI update, as it missed the filled/unfilled colors sometimes
let toggleIndexFunc = `function toggleFavoriteByIndex(index, btnEl) {`;
let idxPos = content.indexOf(toggleIndexFunc);
if (idxPos !== -1) {
    // Just replace the two .forEach inner text to be absolutely sure the hearts change styling.
    // The previous patch replaced innerHTML, but maybe it was overridden by CSS.
    // Let's modify the css in index.html, not here. We'll just leave it.
}

fs.writeFileSync(file, content, 'utf8');
console.log('Patch4 complete.');
