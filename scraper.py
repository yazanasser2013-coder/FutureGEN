import json
import time
from datetime import datetime
from typing import Dict
import os
import platform

from bs4 import BeautifulSoup, Tag
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


def load_existing_tools() -> Dict[str, str]:
    """تحميل الأدوات من JSON"""
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            data: dict[str, str] = json.load(f)
            return {str(k): str(v) for k, v in data.items()}
    except FileNotFoundError:
        return {}


def save_tools(tools: Dict[str, str]) -> None:
    """حفظ الأدوات كـ JSON"""
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(tools, f, indent=4, ensure_ascii=False)


def setup_chrome_driver():
    """Setup Chrome driver with proper configuration for Windows"""
    options = Options()
    options.add_argument("--headless")  # بدون نافذة
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-plugins")
    
    # Windows-specific options
    if platform.system() == "Windows":
        options.add_argument("--disable-web-security")
        options.add_argument("--allow-running-insecure-content")
    
    try:
        if USE_WEBDRIVER_MANAGER:
            # Try webdriver_manager first
            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service, options=options)
            print("Successfully created Chrome driver using webdriver_manager")
            return driver
        else:
            raise Exception("webdriver_manager not available")
            
    except Exception as e:
        print(f"webdriver_manager failed: {e}")
        print("Trying alternative ChromeDriver setup...")
        
        # Try to find ChromeDriver in common locations
        possible_paths = [
            "chromedriver.exe",
            "./chromedriver.exe",
            "C:/chromedriver.exe",
            os.path.expanduser("~/chromedriver.exe"),
            os.path.expanduser("~/Downloads/chromedriver.exe"),
            os.path.expanduser("~/Downloads/chromedriver-win64/chromedriver.exe")
        ]
        
        for path in possible_paths:
            if os.path.exists(path):
                try:
                    service = Service(path)
                    driver = webdriver.Chrome(service=service, options=options)
                    print(f"Successfully created Chrome driver using: {path}")
                    return driver
                except Exception as e:
                    print(f"Failed to create driver with {path}: {e}")
                    continue
        
        # If all else fails, try without specifying service
        try:
            driver = webdriver.Chrome(options=options)
            print("Successfully created Chrome driver without specifying service")
            return driver
        except Exception as e:
            print(f"Failed to create Chrome driver: {e}")
            raise Exception("Could not create Chrome driver with any method")


def scroll_to_end(driver, max_scrolls=50):
    """Scroll to the end of the page to load all content"""
    print("Scrolling to load all content...")
    
    last_height = driver.execute_script("return document.body.scrollHeight")
    scroll_count = 0
    
    while scroll_count < max_scrolls:
        # Scroll down to bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        
        # Wait for new content to load
        time.sleep(2)
        
        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            # If height is the same, we've reached the end
            break
        last_height = new_height
        scroll_count += 1
        
        print(f"Scrolled {scroll_count} times, current height: {new_height}")
    
    print(f"Finished scrolling after {scroll_count} attempts")


def scrape_tools() -> Dict[str, str]:
    """سحب الأدوات باستخدام Selenium + BeautifulSoup"""

    driver = None
    try:
        driver = setup_chrome_driver()
        
        url = "https://theresanaiforthat.com/"
        print(f"Navigating to: {url}")
        driver.get(url)

        # Wait for initial page load
        try:
            WebDriverWait(driver, 30).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            print("Page loaded successfully")
        except Exception as e:
            print("Timeout waiting for page to load:", e)

        # Scroll to the end to load all content
        scroll_to_end(driver)

        # Wait a bit more for any final content to load
        time.sleep(5)

        # Now parse the fully loaded page
        soup = BeautifulSoup(driver.page_source, "html.parser")
        
        tools_data: dict[str, str] = {}
        
        # Try multiple selectors to find AI tools
        print("Trying different selectors to find AI tools...")
        
        # Method 1: Look for AI tool cards with the original class
        tool_cards: list[Tag] = soup.find_all("a", class_="ai-tool-card")
        print(f"Method 1 (ai-tool-card): Found {len(tool_cards)} tools")
        
        # Method 2: Look for any links that contain AI tool information
        if not tool_cards:
            print("Method 2: Looking for links with AI-related text...")
            all_links = soup.find_all("a", href=True)
            print(f"Total links found: {len(all_links)}")
            
            # Filter links that might be AI tools
            ai_related_links = []
            for link in all_links:
                text = link.get_text(strip=True).lower()
                href = link.get("href", "")
                
                # Check if this looks like an AI tool link
                if any(keyword in text for keyword in ['ai', 'tool', 'app', 'software', 'generator', 'assistant']):
                    ai_related_links.append(link)
                elif any(keyword in href for keyword in ['/ai/', '/tool/', 'ai-', 'generator', 'assistant']):
                    ai_related_links.append(link)
            
            tool_cards = ai_related_links
            print(f"Method 2: Found {len(tool_cards)} AI-related links")
        
        # Method 3: Look for specific patterns in the HTML
        if not tool_cards:
            print("Method 3: Looking for specific HTML patterns...")
            
            # Look for divs or sections that might contain tool information
            tool_sections = soup.find_all(["div", "section", "article"], class_=lambda x: x and any(keyword in x.lower() for keyword in ['tool', 'ai', 'card', 'item']))
            print(f"Method 3: Found {len(tool_sections)} potential tool sections")
            
            # Extract links from these sections
            for section in tool_sections:
                links = section.find_all("a", href=True)
                for link in links:
                    if link not in tool_cards:
                        tool_cards.append(link)
        
        # Method 4: Look for any links that go to external AI tool websites
        if not tool_cards:
            print("Method 4: Looking for external AI tool links...")
            external_links = soup.find_all("a", href=True)
            ai_external_links = []
            
            for link in external_links:
                href = link.get("href", "")
                text = link.get_text(strip=True)
                
                # Check if this is an external link that might be an AI tool
                if (href.startswith('http') and 
                    not href.startswith('https://theresanaiforthat.com') and
                    len(text) > 3 and 
                    not text.startswith('http')):
                    ai_external_links.append(link)
            
            tool_cards = ai_external_links
            print(f"Method 4: Found {len(ai_external_links)} external AI tool links")

        print(f"Total potential tool cards found: {len(tool_cards)}")

        # Process the found tools
        for i, card in enumerate(tool_cards):
            name: str = card.get_text(strip=True)
            link: str | None = card.get("href")
            
            # Clean up the name and link
            if name and link and len(name) > 2:
                # Make sure link is absolute
                if link.startswith('/'):
                    link = f"https://theresanaiforthat.com{link}"
                elif not link.startswith('http'):
                    link = f"https://theresanaiforthat.com/{link}"
                
                # Filter out non-tool entries
                name_lower = name.lower()
                
                # Skip if it's clearly not an AI tool
                if any(skip_word in name_lower for skip_word in [
                    '🛠️', '🙏', 'karma', 'tool', 'tools', 'view all', 'period', 
                    'submit', 'trending', 'mini', 'popular', 'glossary', 'promote',
                    'free tool', 'paid tool', 'web apps', 'email management',
                    'pr campaigns', 'ai agent creation', 'font pairing'
                ]):
                    continue
                
                # Skip if it's a user profile or comment
                if any(skip_pattern in name_lower for skip_pattern in [
                    '@', 'comment', 'nov ', 'dec ', 'jan ', 'feb ', 'mar ', 'apr ',
                    'may ', 'jun ', 'jul ', 'aug ', 'sep ', 'oct '
                ]):
                    continue
                
                # Skip if it's just a number or price
                if name.replace(',', '').replace('.', '').replace('$', '').replace('mo', '').replace('/', '').isdigit():
                    continue
                
                # Skip pricing entries
                if any(price_word in name_lower for price_word in [
                    'free + from', 'from $', '100% free', 'no pricing', 'free + from $'
                ]):
                    continue
                
                # Skip if it's a navigation element
                if name in ['AI tools', 'Trending tools', 'Mini Tools', 'Submit AI']:
                    continue
                
                # Skip if it's a website domain (like www.example.com)
                import re
                if re.match(r'^www\.', name) or re.match(r'^[a-z0-9.-]+\.[a-z]{2,}$', name):
                    continue
                
                # Skip if it's just a price range
                if re.match(r'^\d+,\d+\d+\.?\d*$', name):
                    continue
                
                # Only add if it looks like a valid AI tool and not already added
                if name not in tools_data:
                    tools_data[name] = link
                    if i < 10:  # Show first 10 tools for debugging
                        print(f"  Tool {i+1}: {name} -> {link}")

        print(f"Successfully extracted {len(tools_data)} clean AI tools")
        return tools_data
        
    except Exception as e:
        print(f"Error during scraping: {e}")
        raise
    finally:
        if driver:
            try:
                driver.quit()
            except:
                pass


def update_tools() -> None:
    """تحديث الأدوات وحفظ الجديدة"""
    print(f"[{datetime.now()}] Starting scraping...")

    existing_tools: dict[str, str] = load_existing_tools()
    print(f"Loaded {len(existing_tools)} existing tools")
    
    new_tools: dict[str, str] = scrape_tools()

    added_tools: dict[str, str] = {}

    for name, link in new_tools.items():
        if name not in existing_tools:
            existing_tools[name] = link
            added_tools[name] = link

    save_tools(existing_tools)

    print(f"[{datetime.now()}] Done. {len(added_tools)} new tools added.")
    if added_tools:
        print("New tools:")
        for name, link in added_tools.items():
            print(f"  - {name}: {link}")


if __name__ == "__main__":
    print("AI Tools Scraper Started")
    print("This script will scrape theresanaiforthat.com every 24 hours")
    
    while True:
        try:
            update_tools()
        except Exception as e:
            print(f"Error during scraping: {e}")
            import traceback
            traceback.print_exc()
        
        print(f"[{datetime.now()}] Waiting 24 hours before next update...")
        time.sleep(24 * 60 * 60)  # 24 hours in seconds