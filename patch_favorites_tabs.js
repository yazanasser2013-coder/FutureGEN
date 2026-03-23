const fs = require('fs');
const file = 'd:/Yazan Nasser/FutureGEN/js/main.js';
let content = fs.readFileSync(file, 'utf8');

let modified = false;

// 1. Comment out setupEventListeners attach
const setupEvents = `  // Favorites button
  const favoritesBtn = document.getElementById('favoritesBtn');
  if (favoritesBtn) {
    favoritesBtn.addEventListener('click', showFavorites);
  }`;
if (content.includes(setupEvents)) {
  content = content.replace(setupEvents, `  // Favorites button
  const favoritesBtn = document.getElementById('favoritesBtn');
  // if (favoritesBtn) {
  //   favoritesBtn.addEventListener('click', showFavorites);
  // } // removed duplicate listener`);
  modified = true;
  console.log('Fixed setupEventListeners duplicate');
}

// 2. Comment out initEventListeners attach
const initEvents = `  // Favorites button
  const favoritesBtn = document.getElementById('favoritesBtn');
  if (favoritesBtn) {
    favoritesBtn.addEventListener('click', function () {
      showFavorites();
    });
  }`;
if (content.includes(initEvents)) {
  content = content.replace(initEvents, `  // Favorites button
  const favoritesBtn = document.getElementById('favoritesBtn');
  // if (favoritesBtn) {
  //   favoritesBtn.addEventListener('click', function () {
  //     showFavorites();
  //   });
  // } // removed duplicate listener`);
  modified = true;
  console.log('Fixed initEventListeners duplicate');
}

// 3. Comment out updateUserInterface override
const updateUI = `favoritesBtn.onclick = showFavorites;`;
if (content.includes(updateUI)) {
  const replacement = `// favoritesBtn.onclick = showFavorites; // Removed duplicate click assignment`;
  content = content.split(updateUI).join(replacement);
  modified = true;
  console.log('Fixed updateUserInterface duplicate');
}

if (modified) {
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully patched main.js to fix duplicate favorite modals');
} else {
  console.log('No matches found for patch in main.js. Double check strings.');
}
