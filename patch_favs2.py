import sys
import re

file_path = r"d:\Yazan Nasser\FutureGEN\js\main.js"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

pattern2 = re.compile(r"favoritesBtn\.style\.display\s*=\s*getFavoritesArray\(\)\.length\s*\?\s*\"inline-block\"\s*:\s*\"none\";")

replacement2 = 'favoritesBtn.style.display = "inline-block";'

content, count2 = pattern2.subn(replacement2, content)
print(f"Replaced target 2: {count2} times")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done patching.")
