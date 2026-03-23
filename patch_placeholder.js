const fs = require('fs');
const file = 'd:/Yazan Nasser/FutureGEN/js/main.js';
let content = fs.readFileSync(file, 'utf8');

const badPlaceholder = `onerror="this.src='./Images/placeholder-logo.png'"`;
const goodPlaceholder = `onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvZ28gTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='"`;

if (content.includes(badPlaceholder) || content.includes(badPlaceholder.replace('"', '\\"'))) {
  content = content.replace(/onerror=["']this\.src=['"]\.\/Images\/placeholder-logo\.png['"](?:;?)["']/g, goodPlaceholder);
  
  // Try hard-coded split join just in case
  content = content.split(`onerror="this.src='./Images/placeholder-logo.png'"`).join(goodPlaceholder);
  content = content.split(`onerror='this.src="./Images/placeholder-logo.png"'`).join(goodPlaceholder);
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully patched missing placeholder-logo.png occurrences in main.js');
} else {
  console.log('No matches found for placeholder-logo.png in main.js');
}
