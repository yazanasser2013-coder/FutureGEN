const fs = require('fs');

const path = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(path, 'utf8');

// Fix Language Delay
const r3 = /if\s*\(\s*typeof\s*displayToolsByCategories\s*===\s*'function'\s*\)\s*\{\s*displayToolsByCategories\(\);\s*\}/g;
if(r3.test(content)) {
  content = content.replace(r3, "if (typeof displayToolsByCategories === 'function') {\n    setTimeout(function() {\n      displayToolsByCategories();\n    }, 50);\n  }");
  console.log('Patched language delay via regex');
} else {
  // Manual string split
  const s3 = "if (typeof displayToolsByCategories === 'function') {\n    displayToolsByCategories();\n  }";
  const s3_r = "if (typeof displayToolsByCategories === 'function') {\r\n    displayToolsByCategories();\r\n  }";
  
  if(content.includes(s3)) {
     content = content.split(s3).join("if (typeof displayToolsByCategories === 'function') {\n    setTimeout(function() {\n      displayToolsByCategories();\n    }, 50);\n  }");
     console.log('Patched language delay via manual split (n)');
  } else if(content.includes(s3_r)) {
     content = content.split(s3_r).join("if (typeof displayToolsByCategories === 'function') {\r\n    setTimeout(function() {\r\n      displayToolsByCategories();\r\n    }, 50);\r\n  }");
     console.log('Patched language delay via manual split (rn)');
  }
}

// Fix fav listener 2
const r5 = /favoritesBtn\.addEventListener\('click',\s*function\s*\(\)\s*\{\s*showFavorites\(\);\s*\}\);/g;
if(r5.test(content)) {
  content = content.replace(r5, "// favoritesBtn handled centrally");
  console.log('Patched fav listener 2 via regex');
} else {
  const s5 = "favoritesBtn.addEventListener('click', function () {\n      showFavorites();\n    });";
  const s5_r = "favoritesBtn.addEventListener('click', function () {\r\n      showFavorites();\r\n    });";
  if(content.includes(s5)) {
    content = content.split(s5).join("// favoritesBtn handled centrally");
    console.log('Patched fav listener 2 via manual split (n)');
  } else if(content.includes(s5_r)) {
    content = content.split(s5_r).join("// favoritesBtn handled centrally");
    console.log('Patched fav listener 2 via manual split (rn)');
  }
}

fs.writeFileSync(path, content, 'utf8');
console.log('Saved main.js');
