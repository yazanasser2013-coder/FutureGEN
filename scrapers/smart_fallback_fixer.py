# smart_fallback_fixer.py
# SMART SCRIPT - Only fixes tools with fallback logos (2-letter initials)
# Skips tools that already have working logos

import os, re, json, asyncio, time, base64
from urllib.parse import urlparse, urljoin
import httpx
from tqdm import tqdm
from PIL import Image
import io

# ================= CONFIGURATION =================
PROJECT_DIR = r"E:\Yazan Nasser\FutureGEN"
IN_PATH = os.path.join(PROJECT_DIR, "scrapers", "tools.json")
OUT_PATH = os.path.join(PROJECT_DIR, "scrapers", "tools_FIXED_FALLBACKS.json")
REPORT_PATH = os.path.join(PROJECT_DIR, "scrapers", "fallback_fix_report.json")

# API Keys
SERP_API_KEY = "c5457eb8e7f4c100340edd82086dc64b975d333008db10cc4369ad06e1c90e3e"
BRANDFETCH_KEY = "nBh4cTD7Ojew6gwx9Q-0AaXsqfUgl60uvONgPxo4SIac-hHyngEXKrY11SklRJgKJJ0-yLgsM78NOSXtNeIh1g"

# Performance
MAX_CONNECTIONS = 50
CONCURRENCY = 25  # Higher concurrency for speed
TIMEOUT = 35

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"

# Quality thresholds
MIN_WIDTH = 100
MIN_HEIGHT = 100
MIN_FILE_SIZE = 2000

# ================= DETECTION =================

def is_fallback_logo(logo_url):
    """Detect if logo is our generated fallback (2-letter initials)"""
    if not logo_url:
        return True
    
    # Check if it's a data URL with our fallback pattern
    if logo_url.startswith("data:image/svg+xml;base64,"):
        try:
            # Decode SVG
            match = re.search(r'base64,([^"]+)', logo_url)
            if match:
                svg_content = base64.b64decode(match.group(1)).decode('utf-8', errors='ignore')
                
                # Check for our fallback pattern
                if all(pattern in svg_content for pattern in [
                    '<text',
                    'font-weight="700"',
                    'text-anchor="middle"',
                    'letter-spacing="-8"'
                ]):
                    # Check if it's 2 letters (our fallback)
                    text_match = re.search(r'<text[^>]*>([^<]+)</text>', svg_content)
                    if text_match:
                        text = text_match.group(1).strip()
                        if len(text) == 2 and text.isalpha():
                            return True
            
        except:
            pass
    
    return False

def needs_fixing(tool):
    """Determine if tool needs logo fixing"""
    logo = tool.get("logo", "")
    
    # Check if it's our fallback
    if is_fallback_logo(logo):
        return True
    
    # Check logo_source field
    if tool.get("logo_source") == "svg_fallback":
        return True
    
    return False

# ================= VALIDATION =================

async def validate_logo(client, url):
    """Validate logo quality"""
    try:
        if not url or not url.startswith('http'):
            return False
        
        # Quick reject
        url_lower = url.lower()
        if any(bad in url_lower for bad in ['placeholder', '1x1', 'blank', 'spacer']):
            return False
        
        # Fetch
        r = await client.get(url, timeout=20, follow_redirects=True)
        if r.status_code != 200:
            return False
        
        ctype = r.headers.get("content-type", "").lower()
        if not any(t in ctype for t in ['image', 'svg', 'octet']):
            return False
        
        data = r.content
        if len(data) < MIN_FILE_SIZE:
            return False
        
        # SVG validation
        if 'svg' in ctype or url_lower.endswith('.svg'):
            try:
                svg_text = data.decode('utf-8', errors='ignore')
                if '<svg' not in svg_text.lower():
                    return False
                
                # Reject text-only SVGs
                if '<text' in svg_text.lower():
                    graphics = sum([
                        svg_text.lower().count('<path'),
                        svg_text.lower().count('<circle'),
                        svg_text.lower().count('<polygon'),
                        svg_text.lower().count('<image')
                    ])
                    if graphics < 2:  # Must have some graphic elements
                        return False
                
                return len(svg_text) > 200
            except:
                return False
        
        # Raster validation
        try:
            img = Image.open(io.BytesIO(data))
            w, h = img.size
            
            if w < MIN_WIDTH or h < MIN_HEIGHT:
                return False
            
            # Aspect ratio
            aspect = w / h
            if aspect > 5 or aspect < 0.2:
                return False
            
            return True
        except:
            return False
            
    except Exception as e:
        return False

# ================= SEARCH STRATEGIES =================

async def serp_multi_query(client, name, domain):
    """SERP with multiple search queries"""
    try:
        if not name:
            return ""
        
        # Multiple query strategies
        queries = [
            f'"{name}" logo official',
            f'{name} logo brand',
            f'{name} logo high resolution',
            f'{name} icon logo png',
            f'site:{domain} logo' if domain else None,
        ]
        
        for query in queries:
            if not query:
                continue
            
            try:
                params = {
                    "engine": "google",
                    "api_key": SERP_API_KEY,
                    "q": query,
                    "tbm": "isch",
                    "tbs": "isz:l",
                    "num": 40,
                    "hl": "en"
                }
                
                r = await client.get("https://serpapi.com/search", params=params, timeout=30)
                if r.status_code != 200:
                    continue
                
                data = r.json()
                
                if "images_results" not in data:
                    continue
                
                candidates = []
                
                for img in data["images_results"][:25]:
                    img_url = img.get("original") or img.get("thumbnail")
                    if not img_url:
                        continue
                    
                    score = 0
                    img_lower = img_url.lower()
                    title = (img.get("title") or "").lower()
                    
                    # Scoring
                    if domain and domain in img_lower:
                        score += 25
                    
                    if any(kw in img_lower for kw in ['logo', 'brand', 'icon']):
                        score += 15
                    
                    if any(kw in title for kw in ['logo', 'brand', 'official']):
                        score += 10
                    
                    if img_lower.endswith('.svg'):
                        score += 8
                    elif img_lower.endswith('.png'):
                        score += 5
                    
                    # Prefer official sources
                    if any(official in img_lower for official in ['.com/', '.ai/', '.io/']):
                        score += 5
                    
                    candidates.append((img_url, score))
                
                # Sort by score
                candidates.sort(key=lambda x: x[1], reverse=True)
                
                # Try top candidates
                for img_url, score in candidates:
                    if score < 5:
                        break
                    
                    if await validate_logo(client, img_url):
                        print(f"      ✅ SERP found: {img_url[:70]}")
                        return img_url
                
            except Exception as e:
                continue
        
        return ""
        
    except Exception as e:
        return ""

async def website_deep_scrape(client, domain):
    """Deep website scraping"""
    try:
        if not domain or len(domain) < 4:
            return ""
        
        url = f"https://{domain}"
        
        r = await client.get(url, timeout=25, follow_redirects=True)
        if r.status_code != 200:
            return ""
        
        html = r.text[:1000000]
        base_url = f"https://{domain}"
        
        candidates = []
        
        # 1. Meta tags
        patterns = [
            r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
            r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
            r'<link[^>]+rel=["\']apple-touch-icon["\'][^>]+href=["\']([^"\']+)["\']',
            r'<link[^>]+rel=["\']icon["\'][^>]+href=["\']([^"\']+)["\']',
        ]
        
        for pattern in patterns:
            for match in re.findall(pattern, html, re.I):
                full_url = urljoin(base_url, match)
                candidates.append((full_url, 20))
        
        # 2. Logo images
        logo_img = r'<img[^>]*(?:class|id|alt)=["\'][^"\']*(?:logo|brand)[^"\']*["\'][^>]*src=["\']([^"\']+)["\']'
        for match in re.findall(logo_img, html, re.I):
            full_url = urljoin(base_url, match)
            candidates.append((full_url, 15))
        
        # 3. Images with logo in src
        all_imgs = r'<img[^>]+src=["\']([^"\']+)["\']'
        for match in re.findall(all_imgs, html, re.I):
            if 'logo' in match.lower() or 'brand' in match.lower():
                full_url = urljoin(base_url, match)
                candidates.append((full_url, 12))
        
        # 4. Common paths
        common = [
            '/logo.svg', '/logo.png', '/assets/logo.svg', '/assets/logo.png',
            '/images/logo.svg', '/static/logo.svg', '/_next/static/media/logo.svg',
            '/img/logo.svg', '/logos/logo.svg'
        ]
        
        for path in common:
            full_url = urljoin(base_url, path)
            candidates.append((full_url, 10))
        
        # Try candidates
        candidates.sort(key=lambda x: x[1], reverse=True)
        
        for img_url, _ in candidates[:30]:
            if await validate_logo(client, img_url):
                print(f"      ✅ Website found: {img_url[:70]}")
                return img_url
        
        return ""
        
    except Exception as e:
        return ""

async def brandfetch_search(client, domain):
    """Brandfetch API"""
    try:
        if not domain or not BRANDFETCH_KEY:
            return ""
        
        url = f"https://api.brandfetch.io/v2/brands/{domain}"
        headers = {"Authorization": f"Bearer {BRANDFETCH_KEY}"}
        
        r = await client.get(url, headers=headers, timeout=20)
        if r.status_code != 200:
            return ""
        
        data = r.json()
        
        for logo in data.get("logos", []):
            for fmt in logo.get("formats", []):
                img_url = fmt.get("src")
                if img_url and await validate_logo(client, img_url):
                    print(f"      ✅ Brandfetch found: {img_url[:70]}")
                    return img_url
        
        return ""
        
    except Exception as e:
        return ""

async def logodev_search(client, domain):
    """Logo.dev"""
    try:
        if not domain:
            return ""
        
        url = f"https://img.logo.dev/{domain}?token=sk_T4SybqxkQ-matILR4MMIaw&size=400"
        if await validate_logo(client, url):
            print(f"      ✅ Logo.dev found: {url[:70]}")
            return url
        return ""
    except:
        return ""

async def clearbit_search(client, domain):
    """Clearbit"""
    try:
        if not domain:
            return ""
        
        url = f"https://logo.clearbit.com/{domain}?size=400"
        if await validate_logo(client, url):
            print(f"      ✅ Clearbit found: {url[:70]}")
            return url
        return ""
    except:
        return ""

# ================= MAIN PROCESSING =================

def get_domain(tool):
    """Extract domain"""
    for key in ["official_domain", "domain"]:
        d = tool.get(key, "")
        if d and len(d) > 3:
            return d.lower().strip()
    
    for key in ["official_url", "url"]:
        url = tool.get(key, "")
        if url:
            try:
                d = urlparse(url).netloc.lower().replace('www.', '')
                if d and len(d) > 3:
                    return d
            except:
                pass
    
    return ""

async def fix_one_tool(client, tool, sem):
    """Fix one tool's logo"""
    async with sem:
        name = tool.get("name", "Unknown")
        
        # Check if needs fixing
        if not needs_fixing(tool):
            return {
                "name": name,
                "status": "skipped",
                "reason": "Already has working logo"
            }
        
        print(f"\n🔧 FIXING: {name}")
        
        domain = get_domain(tool)
        if not domain:
            return {
                "name": name,
                "status": "failed",
                "reason": "No valid domain"
            }
        
        print(f"   Domain: {domain}")
        
        # Try all strategies
        strategies = [
            ("serp_multi", lambda: serp_multi_query(client, name, domain)),
            ("website_deep", lambda: website_deep_scrape(client, domain)),
            ("brandfetch", lambda: brandfetch_search(client, domain)),
            ("logodev", lambda: logodev_search(client, domain)),
            ("clearbit", lambda: clearbit_search(client, domain)),
        ]
        
        for strategy_name, strategy_func in strategies:
            try:
                print(f"   Trying {strategy_name}...")
                logo = await strategy_func()
                
                if logo and len(logo) > 50:
                    # Update tool
                    tool["logo"] = logo
                    tool["icon"] = logo
                    tool["logo_source"] = strategy_name
                    tool["logo_updated"] = time.strftime("%Y-%m-%d %H:%M:%S")
                    
                    return {
                        "name": name,
                        "status": "fixed",
                        "source": strategy_name,
                        "logo": logo[:100]
                    }
                    
            except Exception as e:
                continue
        
        # Failed
        return {
            "name": name,
            "status": "failed",
            "reason": "All strategies failed"
        }

async def main():
    print("=" * 80)
    print("🎯 SMART FALLBACK FIXER - Only fixes tools with 2-letter fallback logos")
    print("=" * 80)
    
    # Load
    with open(IN_PATH, "r", encoding="utf-8") as f:
        tools = json.load(f)
    
    print(f"\n📊 Total tools: {len(tools)}")
    
    # Filter tools that need fixing
    tools_to_fix = [t for t in tools if needs_fixing(t)]
    tools_already_ok = len(tools) - len(tools_to_fix)
    
    print(f"✅ Already have working logos: {tools_already_ok}")
    print(f"🔧 Need fixing (fallback logos): {len(tools_to_fix)}")
    
    if len(tools_to_fix) == 0:
        print("\n🎉 All tools already have working logos!")
        return
    
    print(f"\n🚀 Starting to fix {len(tools_to_fix)} tools...\n")
    
    # Setup
    limits = httpx.Limits(max_connections=MAX_CONNECTIONS, max_keepalive_connections=25)
    timeout = httpx.Timeout(TIMEOUT, connect=20.0)
    sem = asyncio.Semaphore(CONCURRENCY)
    
    results = []
    
    async with httpx.AsyncClient(limits=limits, timeout=timeout, follow_redirects=True) as client:
        tasks = [fix_one_tool(client, tool, sem) for tool in tools]
        
        pbar = tqdm(total=len(tasks), desc="🔍 Fixing fallback logos", unit="tool")
        
        for coro in asyncio.as_completed(tasks):
            result = await coro
            results.append(result)
            pbar.update(1)
            
            # Update progress
            if len(results) % 20 == 0:
                fixed = sum(1 for r in results if r.get("status") == "fixed")
                skipped = sum(1 for r in results if r.get("status") == "skipped")
                pbar.set_postfix({
                    "fixed": fixed,
                    "skipped": skipped
                })
        
        pbar.close()
    
    # Save
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(tools, f, ensure_ascii=False, indent=2)
    
    # Stats
    fixed = sum(1 for r in results if r.get("status") == "fixed")
    skipped = sum(1 for r in results if r.get("status") == "skipped")
    failed = sum(1 for r in results if r.get("status") == "failed")
    
    source_counts = {}
    for r in results:
        if r.get("status") == "fixed":
            src = r.get("source", "unknown")
            source_counts[src] = source_counts.get(src, 0) + 1
    
    report = {
        "total_tools": len(tools),
        "already_ok": skipped,
        "needed_fixing": len(tools_to_fix),
        "fixed": fixed,
        "failed": failed,
        "success_rate": f"{fixed/len(tools_to_fix)*100:.1f}%" if len(tools_to_fix) > 0 else "N/A",
        "sources": source_counts,
        "fixed_tools": [r for r in results if r.get("status") == "fixed"][:50]
    }
    
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 80)
    print("✅ COMPLETE!")
    print("=" * 80)
    print(f"📊 Results:")
    print(f"   Total tools: {len(tools)}")
    print(f"   Already had working logos: {skipped}")
    print(f"   Needed fixing: {len(tools_to_fix)}")
    print(f"   Successfully fixed: {fixed}")
    print(f"   Failed: {failed}")
    print(f"   Success rate: {fixed/len(tools_to_fix)*100:.1f}%")
    print(f"\n📁 Output: {OUT_PATH}")
    print(f"📊 Report: {REPORT_PATH}")
    
    if source_counts:
        print("\n🎯 Fixed using:")
        for src, count in sorted(source_counts.items(), key=lambda x: x[1], reverse=True):
            print(f"   {src}: {count}")

if __name__ == "__main__":
    asyncio.run(main())