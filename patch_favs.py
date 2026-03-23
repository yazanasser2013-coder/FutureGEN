import sys
import re

file_path = r"d:\Yazan Nasser\FutureGEN\js\main.js"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern1 = re.compile(r"// دالة تحديث زر المفضلة\s*(function updateFavoritesButton\(\) \{.*?favoritesBtn\.style\.display\s*=\s*'none';\s*\}\s*\})", re.DOTALL)

replacement1 = """// دالة تحديث زر المفضلة
function updateFavoritesButton() {
  const favoritesBtn = document.getElementById('favoritesBtn');
  if (favoritesBtn) {
    favoritesBtn.style.display = 'inline-block';
  }
}"""

content, count1 = pattern1.subn(replacement1, content)
print(f"Replaced target 1: {count1} times")


pattern2 = re.compile(r"(function updateFavoritesButton\(\) \{\s*var favoritesBtn = document\.getElementById\(\"favoritesBtn\"\);\s*if \(\!favoritesBtn\) return;\s*favoritesBtn\.style\.display = getFavoritesArray\(\)\.length \? \"inline-block\" : \"none\";\s*\})", re.DOTALL)

replacement2 = """function updateFavoritesButton() {
  var favoritesBtn = document.getElementById("favoritesBtn");
  if (!favoritesBtn) return;
  favoritesBtn.style.display = "inline-block";
}"""

content, count2 = pattern2.subn(replacement2, content)
print(f"Replaced target 2: {count2} times")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done patching.")
