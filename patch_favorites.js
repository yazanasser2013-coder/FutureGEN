const fs = require('fs');

const file = 'd:/Yazan Nasser/FutureGEN/js/main.js';
let content = fs.readFileSync(file, 'utf8');

const target = `  var existingModal = document.getElementById('favoritesModal');
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  var favoritesModal = new bootstrap.Modal(document.getElementById('favoritesModal'));
  favoritesModal.show();`;

const replacement = `  var existingModal = document.getElementById('favoritesModal');
  var favoritesModal;

  if (existingModal) {
    document.getElementById('favoritesListContainer').innerHTML = favCardsHtml;
    existingModal.querySelector('.modal-title').textContent = modalTitle;
    existingModal.querySelector('.btn-secondary').textContent = closeText;
    favoritesModal = bootstrap.Modal.getInstance(existingModal) || new bootstrap.Modal(existingModal);
  } else {
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    existingModal = document.getElementById('favoritesModal');
    favoritesModal = new bootstrap.Modal(existingModal);
  }

  favoritesModal.show();`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Successfully patched showFavorites array modal instantiation.');
} else {
  console.log('Target string not found, patch failed.');
}
