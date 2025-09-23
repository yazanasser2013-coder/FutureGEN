import json
import time
import random
from datetime import datetime
from typing import Dict
import os
import platform
import re
import shutil
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Try to import webdriver_manager, fallback to manual ChromeDriver if needed
try:
    from webdriver_manager.chrome import ChromeDriverManager
    USE_WEBDRIVER_MANAGER = True
except ImportError:
    USE_WEBDRIVER_MANAGER = False
    print("webdriver-manager not available, will try manual ChromeDriver setup")

JSON_FILE = "tools.json"
INDEX_FILE = "index.html"


def load_existing_tools() -> Dict[str, dict]:
    """تحميل الأدوات من JSON"""
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError as e:
        print(f"tools.json is not valid JSON: {e}. Backing up and starting fresh.")
        try:
            backup = f"{JSON_FILE}.{datetime.now().strftime('%Y%m%d%H%M%S')}.bak"
            shutil.copyfile(JSON_FILE, backup)
            print(f"Backed up invalid file to {backup}")
        except Exception as be:
            print(f"Failed to backup invalid tools.json: {be}")
        return {}


def save_tools(tools: Dict[str, dict]) -> None:
    """حفظ الأدوات كـ JSON"""
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(tools, f, indent=4, ensure_ascii=False)


def setup_chrome_driver():
    """إعداد متصفح Chrome مع خيارات تجنب الحظر"""
    options = Options()
    options.add_argument("--headless=new")  # Updated headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-plugins")
    
    # إعدادات لتجنب الحظر
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument('--disable-web-security')
    options.add_argument('--allow-running-insecure-content')
    options.add_argument('--ignore-certificate-errors')
    
    # User-Agent عشوائي
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    ]
    options.add_argument(f'--user-agent={random.choice(user_agents)}')
    
    try:
        if USE_WEBDRIVER_MANAGER:
            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service, options=options)
            
            # تنفيذ script لإخفاء automation
            driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            print("Successfully created Chrome driver using webdriver_manager")
            return driver
        else:
            # الطريقة اليدوية
            driver = webdriver.Chrome(options=options)
            driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            print("Successfully created Chrome driver without webdriver_manager")
            return driver
    except Exception as e:
        print(f"Failed to create Chrome driver: {e}")
        raise Exception("Could not create Chrome driver")


def scroll_to_end(driver, max_scrolls=30):
    """التمرير إلى نهاية الصفحة لتحميل كل المحتوى"""
    print("Scrolling to load all content...")
    
    last_height = driver.execute_script("return document.body.scrollHeight")
    scroll_count = 0
    
    while scroll_count < max_scrolls:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        scroll_count += 1
        print(f"Scrolled {scroll_count} times, current height: {new_height}")
    
    print(f"Finished scrolling after {scroll_count} attempts")


def extract_tool_details_selenium(driver, tool_url):
    """استخراج التفاصيل باستخدام Selenium بدلاً من requests"""
    try:
        print(f"Extracting details from: {tool_url}")
        
        # الانتقال إلى صفحة الأداة
        driver.get(tool_url)
        
        # انتظار تحميل الصفحة
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # الانتظار لضمان تحميل المحتوى
        time.sleep(3)
        
        # تحليل HTML باستخدام BeautifulSoup
        soup = BeautifulSoup(driver.page_source, "html.parser")
        
        # استخراج المعلومات الأساسية
        name = soup.find("h1")
        name = name.get_text(strip=True) if name else "Unknown"
        
        # إذا كان هناك حظر، نعود فوراً
        if "blocked" in name.lower() or "sorry" in name.lower() or "access denied" in name.lower():
            return None
        
        # استخراج الوصف
        description = soup.find("meta", property="og:description")
        description = description["content"] if description and description.has_attr("content") else ""
        
        if not description:
            desc_element = soup.find("div", class_=lambda x: x and "description" in x.lower())
            if desc_element:
                description = desc_element.get_text(strip=True)
        
        # استخراج الفئة
        category = "Unknown"
        category_elements = soup.find_all("a", href=lambda x: x and "/ai/" in x)
        for element in category_elements:
            if element.get_text(strip=True):
                category = element.get_text(strip=True)
                break
        
        # استخراج السعر
        pricing = "Unknown"
        pricing_elements = soup.find_all("div", class_=lambda x: x and "pricing" in x.lower())
        for element in pricing_elements:
            text = element.get_text(strip=True)
            if text and "free" not in text.lower():
                pricing = text
                break
        
        # استخراج الصورة
        image = ""
        img_element = soup.find("meta", property="og:image")
        if img_element and img_element.has_attr("content"):
            image = img_element["content"]
        
        if not image:
            img_element = soup.find("img", src=True)
            if img_element:
                image = img_element["src"]
                if image.startswith("//"):
                    image = "https:" + image
                elif image.startswith("/"):
                    image = f"https://theresanaiforthat.com{image}"
        
        return {
            "name": name,
            "url": tool_url,
            "description": description,
            "category": category,
            "pricing": pricing,
            "image": image,
            "scraped_date": datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"Error extracting details from {tool_url}: {e}")
        return None


def scrape_tools() -> Dict[str, dict]:
    """سحب الأدوات باستخدام Selenium + BeautifulSoup"""
    driver = None
    try:
        driver = setup_chrome_driver()
        
        url = "https://theresanaiforthat.com/"
        print(f"Navigating to: {url}")
        driver.get(url)

        try:
            WebDriverWait(driver, 30).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            print("Page loaded successfully")
        except Exception as e:
            print("Timeout waiting for page to load:", e)

        scroll_to_end(driver)
        time.sleep(5)

        soup = BeautifulSoup(driver.page_source, "html.parser")
        
        tools_data: dict[str, dict] = {}
        
        print("Looking for AI tool links...")
        
        # البحث عن روابط الأدوات
        tool_links = set()
        
        # البحث عن عناصر معينة بكلاسات محددة
        tool_elements = soup.find_all("a", href=lambda x: x and "/ai/" in x and x != "/ai/")
        for element in tool_elements:
            href = element.get("href", "")
            if href and not href.startswith("http"):
                href = f"https://theresanaiforthat.com{href}"
            tool_links.add(href)
        
        print(f"Found {len(tool_links)} potential tool links")
        
        # استخراج التفاصيل لكل أداة باستخدام Selenium
        for i, tool_url in enumerate(list(tool_links)[:20]):  # الحد إلى 20 أداة
            if not tool_url or "theresanaiforthat.com" not in tool_url:
                continue
                
            # تأخير عشوائي بين الطلبات
            delay = random.uniform(2, 5)
            time.sleep(delay)
            
            tool_details = extract_tool_details_selenium(driver, tool_url)
            
            if tool_details:
                tools_data[tool_details["name"]] = tool_details
                print(f"Extracted tool {i+1}: {tool_details['name']}")
            else:
                print(f"Failed to extract tool {i+1}")
        
        print(f"Successfully extracted {len(tools_data)} AI tools with details")
        return tools_data
        
    except Exception as e:
        print(f"Error during scraping: {e}")
        import traceback
        traceback.print_exc()
        return {}
    finally:
        if driver:
            try:
                driver.quit()
            except:
                pass


def _sanitize_js(s: str) -> str:
    """تنظيف النص للإدراج في JavaScript"""
    if not s:
        return ""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").replace("\r", " ").strip()


def _js_tool_object(tool_details: dict) -> str:
    """إنشاء كائن JavaScript للأداة"""
    name = _sanitize_js(tool_details.get("name", "Unknown Tool"))
    url = _sanitize_js(tool_details.get("url", "#"))
    description = _sanitize_js(tool_details.get("description", "No description available"))
    category = _sanitize_js(tool_details.get("category", "Other"))
    pricing = _sanitize_js(tool_details.get("pricing", "Unknown"))
    image = _sanitize_js(tool_details.get("image", ""))
    
    # وصف عربي (يمكن تحسينه لاحقاً باستخدام ترجمة فعلية)
    description_ar = f"أداة ذكاء اصطناعي في فئة {category}. {pricing}"
    
    # استخدام فافيكون إذا لم توجد صورة
    logo = image if image else f"https://www.google.com/s2/favicons?sz=128&domain={urlparse(url).netloc}"
    
    obj = (
        "        {\n"
        f'          name: "{name}",\n'
        f'          url: "{url}",\n'
        f'          category: "{category}",\n'
        f'          description: "{description}",\n'
        f'          description_ar: "{description_ar}",\n'
        f'          pricing: "{pricing}",\n'
        f'          logo: "{logo}",\n'
        '          icon: "fa-robot",\n'
        '          featured: false,\n'
        "        }"
    )
    return obj


def _extract_aiTools_names(html: str) -> set[str]:
    """استخراج أسماء الأدوات الموجودة في مصفوفة aiTools"""
    # Try multiple patterns to find the aiTools array
    patterns = [
        r"const aiTools\s*=\s*\[",
        r"let aiTools\s*=\s*\[",
        r"var aiTools\s*=\s*\[",
        r"aiTools\s*=\s*\["
    ]
    
    for pattern in patterns:
        match = re.search(pattern, html)
        if match:
            start = match.start()
            end = html.find("];", start)
            if end != -1:
                block = html[start:end]
                names = set(re.findall(r'name:\s*"([^"]+)"', block))
                return names
    
    return set()


def _insert_into_aiTools(html: str, tool_objects: list[str]) -> str:
    """إدراج الأدوات الجديدة في مصفوفة aiTools"""
    # Try multiple patterns to find the aiTools array
    patterns = [
        r"const aiTools\s*=\s*\[",
        r"let aiTools\s*=\s*\[",
        r"var aiTools\s*=\s*\[",
        r"aiTools\s*=\s*\["
    ]
    
    start = -1
    for pattern in patterns:
        match = re.search(pattern, html)
        if match:
            start = match.start()
            break
    
    if start == -1:
        # If aiTools array not found, create it at the end of the file before the closing </script> tag
        script_end = html.rfind("</script>")
        if script_end != -1:
            insertion = f"\nconst aiTools = [\n{','.join(tool_objects)}\n];\n"
            new_html = html[:script_end] + insertion + html[script_end:]
            return new_html
        else:
            # If no script tag found, create it at the end of the body
            body_end = html.rfind("</body>")
            if body_end != -1:
                insertion = f"\n<script>\nconst aiTools = [\n{','.join(tool_objects)}\n];\n</script>\n"
                new_html = html[:body_end] + insertion + html[body_end:]
                return new_html
            else:
                # If no body tag found, append to the end of the file
                insertion = f"\n<script>\nconst aiTools = [\n{','.join(tool_objects)}\n];\n</script>\n"
                return html + insertion
    
    # العثور على نهاية المصفوفة
    end = html.find("];", start)
    if end == -1:
        raise ValueError("Could not find closing '];' for aiTools array")

    # العثور على الموضع المناسب للإدراج
    insert_position = end
    
    # التحقق مما إذا كان我们需要添加逗号 قبل العناصر الجديدة
    prev_char_pos = end - 1
    while prev_char_pos > start and html[prev_char_pos].isspace():
        prev_char_pos -= 1
    
    needs_comma = prev_char_pos > start and html[prev_char_pos] != '['
    
    # بناء سلسلة الإدراج
    insertion = ""
    if needs_comma:
        insertion += ",\n"
    insertion += "\n".join(tool_objects) + "\n"
    
    # إدراج الأدوات الجديدة
    new_html = html[:insert_position] + insertion + html[insert_position:]
    return new_html


def update_index_html(added_tools: Dict[str, dict], index_file: str = INDEX_FILE) -> None:
    """إضافة الأدوات الجديدة إلى index.html"""
    if not added_tools:
        print("No new tools to inject into index.html")
        return
    if not os.path.exists(index_file):
        print(f"index.html not found at {index_file}, skipping HTML update.")
        return

    with open(index_file, "r", encoding="utf-8") as f:
        html = f.read()

    existing_names = _extract_aiTools_names(html)
    to_inject = []
    for name, details in added_tools.items():
        if name in existing_names:
            continue
        to_inject.append(_js_tool_object(details))

    if not to_inject:
        print("All newly scraped tools are already present in aiTools array.")
        return

    backup = f"{index_file}.{datetime.now().strftime('%Y%m%d%H%M%S')}.bak"
    shutil.copyfile(index_file, backup)
    print(f"Backup created: {backup}")

    try:
        new_html = _insert_into_aiTools(html, to_inject)
        with open(index_file, "w", encoding="utf-8") as f:
            f.write(new_html)
        print(f"Injected {len(to_inject)} new tools into index.html")
    except Exception as e:
        print(f"Failed to update index.html: {e}")
        print("Restoring from backup...")
        shutil.copyfile(backup, index_file)
        print("index.html restored from backup.")


def update_tools() -> None:
    """تحديث الأدوات وحفظ الجديدة + حقنها في index.html"""
    print(f"[{datetime.now()}] Starting scraping...")

    existing_tools: dict[str, dict] = load_existing_tools()
    print(f"Loaded {len(existing_tools)} existing tools")
    
    new_tools: dict[str, dict] = scrape_tools()

    added_tools: dict[str, dict] = {}
    for name, details in new_tools.items():
        if name not in existing_tools:
            existing_tools[name] = details
            added_tools[name] = details

    save_tools(existing_tools)

    print(f"[{datetime.now()}] Done. {len(added_tools)} new tools added.")
    if added_tools:
        print("New tools:")
        for name, details in added_tools.items():
            print(f"  - {name}: {details['url']}")

        # إضافة الأدوات الجديدة إلى index.html
        update_index_html(added_tools)


if __name__ == "__main__":
    print("AI Tools Scraper Started")
    print("This script will scrape theresanaiforthat.com every 24 hours")
    
    # التشغيل الفوري أول مرة
    update_tools()
    
    # ثم التشغيل كل 24 ساعة
    while True:
        print(f"[{datetime.now()}] Waiting 24 hours before next update...")
        time.sleep(24 * 60 * 60)  # 24 ساعة
        update_tools()