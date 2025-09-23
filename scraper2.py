import json
import time
import random
from datetime import datetime
from typing import Dict, List
import os
import re
import shutil
from urllib.parse import urlparse, urljoin
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import logging

# إعداد التسجيل
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scraper.log", encoding='utf-8'),
        logging.StreamHandler()
    ]
)

JSON_FILE = "tools.json"
INDEX_FILE = "index.html"
BASE_URL = "https://theresanaiforthat.com"

# قائمة وكلاء المستخدم
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15"
]

def load_existing_tools() -> Dict[str, dict]:
    """تحميل الأدوات من JSON"""
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            # تصفية البيانات غير الصالحة
            return {k: v for k, v in data.items() if isinstance(v, dict)}
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError as e:
        logging.error(f"tools.json غير صالح: {e}. إنشاء نسخة احتياطية والبدء من جديد.")
        try:
            backup = f"{JSON_FILE}.{datetime.now().strftime('%Y%m%d%H%M%S')}.bak"
            shutil.copyfile(JSON_FILE, backup)
            logging.info(f"تم إنشاء نسخة احتياطية: {backup}")
        except Exception as be:
            logging.error(f"فشل في إنشاء نسخة احتياطية: {be}")
        return {}

def save_tools(tools: Dict[str, dict]) -> None:
    """حفظ الأدوات كـ JSON"""
    # تصفية الأدوات غير الصالحة قبل الحفظ
    valid_tools = {k: v for k, v in tools.items() if isinstance(v, dict)}
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(valid_tools, f, indent=4, ensure_ascii=False)

def setup_chrome_driver():
    """إعداد متصفح Chrome"""
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-plugins")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument(f'--user-agent={random.choice(USER_AGENTS)}')
    
    try:
        from webdriver_manager.chrome import ChromeDriverManager
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        logging.info("تم إنشاء متصفح Chrome بنجاح")
        return driver
    except Exception as e:
        logging.error(f"فشل في إنشاء متصفح Chrome: {e}")
        raise

def scroll_to_end(driver, max_scrolls=10):
    """التمرير إلى نهاية الصفحة"""
    logging.info("جاري التمرير لتحميل المحتوى...")
    
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
    
    logging.info(f"تم التمرير {scroll_count} مرات")

def extract_tool_details(driver, tool_url):
    """استخراج تفاصيل الأداة"""
    try:
        logging.info(f"جاري استخراج التفاصيل من: {tool_url}")
        driver.get(tool_url)
        
        # الانتظار حتى يتم تحميل الصفحة
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        time.sleep(3)  # انتظار إضافي لتحميل المحتوى
        
        # تحليل HTML باستخدام BeautifulSoup
        soup = BeautifulSoup(driver.page_source, "html.parser")
        
        # استخراج الاسم
        name = "Unknown"
        name_element = soup.find("h1")
        if name_element:
            name = name_element.get_text(strip=True)
        
        # استخراج الوصف
        description = ""
        desc_element = soup.find("meta", property="og:description")
        if desc_element and desc_element.get("content"):
            description = desc_element["content"]
        else:
            desc_element = soup.find("meta", attrs={"name": "description"})
            if desc_element and desc_element.get("content"):
                description = desc_element["content"]
            else:
                # محاولة أخرى للعثور على الوصف في المحتوى
                desc_elements = soup.find_all("p")
                for p in desc_elements:
                    text = p.get_text(strip=True)
                    if text and len(text) > 50:
                        description = text[:200] + "..." if len(text) > 200 else text
                        break
        
        # استخراج الفئة
        category = "AI Tool"
        category_elements = soup.find_all("a", href=lambda x: x and "/category/" in x)
        for element in category_elements:
            cat_text = element.get_text(strip=True)
            if cat_text and cat_text != "AI" and len(cat_text) < 30:
                category = cat_text
                break
        
        # استخراج السعر
        pricing = "Unknown"
        pricing_elements = soup.find_all(string=re.compile(r'\$|free|paid|price', re.IGNORECASE))
        for element in pricing_elements:
            if hasattr(element, 'parent') and element.parent.name not in ['script', 'style']:
                text = element.get_text(strip=True) if hasattr(element, 'get_text') else str(element)
                if text and len(text) < 50:
                    pricing = text
                    break
        
        # استخراج الصورة
        image = ""
        img_element = soup.find("meta", property="og:image")
        if img_element and img_element.get("content"):
            image = img_element["content"]
        else:
            img_elements = soup.find_all("img", src=True)
            for img in img_elements:
                src = img["src"]
                # تخطى الصور الصغيرة أو الرموز
                if not any(x in src.lower() for x in ["icon", "logo", "avatar", "placeholder", "favicon"]):
                    image = src
                    if image.startswith("//"):
                        image = "https:" + image
                    elif image.startswith("/"):
                        image = f"{BASE_URL}{image}"
                    break
        
        # استخراج الرابط الحقيقي
        real_url = tool_url
        website_links = soup.find_all("a", href=re.compile(r'^https?://'))
        for link in website_links:
            href = link.get("href", "")
            if href and "theresanaiforthat.com" not in href:
                real_url = href
                break
        
        return {
            "name": name,
            "url": real_url,
            "description": description,
            "category": category,
            "pricing": pricing,
            "image": image,
            "scraped_date": datetime.now().isoformat()
        }
        
    except Exception as e:
        logging.error(f"خطأ في استخراج التفاصيل من {tool_url}: {e}")
        return None

def find_tool_links(soup):
    """البحث عن روابط الأدوات في الصفحة"""
    tool_links = set()
    
    # البحث عن روابط الأدوات بطرق مختلفة
    selectors = [
        "a[href*='/ai/']",
        ".tool-card a",
        ".product-card a",
        ".app-card a",
        "a[class*='tool']",
        "a[class*='product']",
        "a[class*='app']"
    ]
    
    for selector in selectors:
        elements = soup.select(selector)
        for element in elements:
            href = element.get("href", "")
            if href and "/ai/" in href and not href.endswith("/ai/"):
                if not href.startswith("http"):
                    href = urljoin(BASE_URL, href)
                tool_links.add(href)
    
    return list(tool_links)

def scrape_all_tools():
    """سحب جميع الأدوات من الموقع"""
    driver = None
    try:
        driver = setup_chrome_driver()
        url = f"{BASE_URL}/ai/"
        logging.info(f"جاري التوجه إلى: {url}")
        driver.get(url)
        
        # الانتظار حتى يتم تحميل الصفحة
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # التمرير لأسفل لتحميل كل المحتوى
        scroll_to_end(driver)
        time.sleep(3)
        
        # تحليل HTML باستخدام BeautifulSoup
        soup = BeautifulSoup(driver.page_source, "html.parser")
        
        # البحث عن روابط جميع الأدوات
        tool_links = find_tool_links(soup)
        
        logging.info(f"تم العثور على {len(tool_links)} أداة")
        
        # استخراج تفاصيل كل أداة
        tools_data = {}
        for i, tool_url in enumerate(tool_links[:20]):  # الحد إلى 20 أداة للاختبار
            if not tool_url:
                continue
                
            # تأخير عشوائي بين الطلبات
            delay = random.uniform(2, 5)
            time.sleep(delay)
            
            tool_details = extract_tool_details(driver, tool_url)
            
            if tool_details and tool_details["name"] != "Unknown":
                tools_data[tool_details["name"]] = tool_details
                logging.info(f"تم استخراج الأداة {i+1}: {tool_details['name']}")
            else:
                logging.warning(f"فشل في استخراج الأداة {i+1}")
        
        return tools_data
        
    except Exception as e:
        logging.error(f"خطأ أثناء السحب: {e}")
        return {}
    finally:
        if driver:
            driver.quit()

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
    category = _sanitize_js(tool_details.get("category", "AI Tool"))
    pricing = _sanitize_js(tool_details.get("pricing", "Unknown"))
    image = _sanitize_js(tool_details.get("image", ""))
    
    # وصف عربي
    description_ar = f"أداة ذكاء اصطناعي في فئة {category}. {pricing}"
    
    # استخدام الصورة المباشرة إذا كانت متاحة، وإلا استخدام فافيكون
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
    start = html.find("const aiTools = [")
    if start == -1:
        return set()
    end = html.find("];", start)
    block = html[start:end]
    names = set(re.findall(r'name:\s*"([^"]+)"', block))
    return names

def _replace_aiTools_array(html: str, tool_objects: list[str]) -> str:
    """استبدال مصفوفة aiTools بأكملها"""
    # البحث عن مصفوفة aiTools
    start = html.find("const aiTools = [")
    if start == -1:
        raise ValueError("لم يتم العثور على مصفوفة aiTools في index.html")
    
    # العثور على نهاية المصفوفة
    end = html.find("];", start) + 2
    if end == -1:
        raise ValueError("لم يتم العثور على نهاية المصفوفة aiTools")
    
    # بناء المصفوفة الجديدة
    new_array = "const aiTools = [\n" + ",\n".join(tool_objects) + "\n];"
    
    # استبدال المصفوفة القديمة
    new_html = html[:start] + new_array + html[end:]
    return new_html

def update_index_html(all_tools: Dict[str, dict]) -> None:
    """تحديث index.html بالأدوات الجديدة"""
    if not all_tools:
        logging.info("لا توجد أدوات جديدة لإضافتها إلى index.html")
        return
        
    if not os.path.exists(INDEX_FILE):
        logging.error(f"لم يتم العثور على {INDEX_FILE}")
        return

    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    # إنشاء كائنات JavaScript لجميع الأدوات
    tool_objects = []
    for tool_name, tool_data in all_tools.items():
        if not isinstance(tool_data, dict):
            logging.warning(f"تخطي الأداة '{tool_name}' لأن نوع البيانات غير صحيح")
            continue
        tool_objects.append(_js_tool_object(tool_data))

    if not tool_objects:
        logging.error("لا توجد كائنات أدوات صالحة للإضافة إلى index.html")
        return

    # إنشاء نسخة احتياطية
    backup = f"{INDEX_FILE}.{datetime.now().strftime('%Y%m%d%H%M%S')}.bak"
    shutil.copyfile(INDEX_FILE, backup)
    logging.info(f"تم إنشاء نسخة احتياطية: {backup}")

    try:
        # استبدال مصفوفة aiTools بأكملها
        new_html = _replace_aiTools_array(html, tool_objects)
        with open(INDEX_FILE, "w", encoding="utf-8") as f:
            f.write(new_html)
        logging.info(f"تم تحديث index.html بـ {len(tool_objects)} أداة")
    except Exception as e:
        logging.error(f"فشل في تحديث index.html: {e}")
        logging.info("جاري الاستعادة من النسخة الاحتياطية...")
        shutil.copyfile(backup, INDEX_FILE)
        logging.info("تم استعادة index.html من النسخة الاحتياطية")

def main():
    """الدالة الرئيسية"""
    logging.info("بدء سحب أدوات الذكاء الاصطناعي")
    
    # سحب الأدوات
    tools_data = scrape_all_tools()
    
    if not tools_data:
        logging.error("لم يتم سحب أي أدوات")
        return
        
    # حفظ الأدوات في JSON
    existing_tools = load_existing_tools()
    existing_tools.update(tools_data)
    save_tools(existing_tools)
    
    logging.info(f"تم سحب {len(tools_data)} أداة وحفظها في {JSON_FILE}")
    
    # تحديث index.html
    update_index_html(existing_tools)
    
    logging.info("تم الانتهاء من عملية السحب والتحديث")

if __name__ == "__main__":
    main()