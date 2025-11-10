const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const pRetry = require('p-retry').default || require('p-retry');

const BASE_URL = 'https://theresanaiforthat.com';
const OUTPUT_FILE = './theresanaiforthat_tools.json';
const CONCURRENCY = 4; // number of pages to open concurrently
const VISIT_DELAY_MS = 600; // polite delay between requests per worker

async function openBrowser() {
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function fetchToolListingLinks(page) {
  // Try common listing pages
  const listingCandidates = [
    BASE_URL,
    `${BASE_URL}/tools`,
    `${BASE_URL}/directory`,
  ];

  const visited = new Set();
  let links = new Set();

  for (const url of listingCandidates) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 99999999 });
      // gather anchors that look like tool links: either include '/tool' or have an <img> inside
      const pageLinks = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        const candidates = [];
        for (const a of anchors) {
          try {
            const href = a.href || '';
            const hasImg = !!a.querySelector('img');
            // heuristics: tool pages usually have '/tool', '/tools', '/product', or are internal with slug-like path
            if (href && (href.includes('/tool') || href.includes('/tools/') || href.includes('/product') || hasImg)) {
              candidates.push(href);
            }
          } catch { /* ignore individual anchor errors */ }
        }
        return candidates;
      });
      for (const l of pageLinks) {
        if (l && !visited.has(l)) {
          visited.add(l);
          links.add(l.split('#')[0]);
        }
      }
    } catch (err) {
      console.warn(`Listing fetch failed for ${url}: ${err.message}`);
    }
  }

  // Filter and normalize links: keep internal pages and unique
  const normalized = Array.from(links).filter(u => {
    try {
      const urlObj = new URL(u, BASE_URL);
      // prefer pages within theresanaiforthat.com or helpful external landing pages
      return urlObj.hostname.endsWith('theresanaiforthat.com') || urlObj.pathname.length > 1;
    } catch {
      return false;
    }
  });

  // De-duplicate and return
  return Array.from(new Set(normalized));
}

async function extractFromToolPage(page, url) {
  // Navigate and extract robustly
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 99999999 });

  // Basic page metadata extraction
  const metadata = await page.evaluate(() => {
    const getMeta = (name) => {
      const m = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      return m ? m.content : null;
    };
    const title = document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : (document.title || null);
    const ogTitle = getMeta('og:title');
    const name = ogTitle || title || document.querySelector('title')?.innerText?.trim() || null;
    const ogDesc = getMeta('og:description') || getMeta('description') || null;
    const descEl = document.querySelector('p');
    const description = ogDesc || (descEl ? descEl.innerText.trim() : null);
    const ogImage = getMeta('og:image') || null;
    const canonical = document.querySelector('link[rel="canonical"]')?.href || null;

    // Find candidate official external links on page (anchors that point outside theresanaiforthat.com)
    const anchors = Array.from(document.querySelectorAll('a'))
      .map(a => ({ href: a.href, text: (a.innerText || '').trim() }))
      .filter(a => a.href && !a.href.includes('theresanaiforthat.com'));

    // Try to detect tags/categories
    const tagEls = Array.from(document.querySelectorAll('[class*="tag"], [class*="category"], .tags, .categories'));
    const tags = tagEls.length ? tagEls.map(el => el.innerText.trim()).filter(Boolean) : [];

    return { name, description, ogImage, canonical, anchors, tags };
  });

  // Decide official_url: prefer first external anchor that looks like 'visit', 'website', or is clearly external
  let official_url = null;
  if (metadata.anchors && metadata.anchors.length) {
    // look for anchors with keywords
    const keywords = ['website', 'visit', 'go', 'open', 'launch', 'official', 'homepage'];
    const candidate = metadata.anchors.find(a => keywords.some(k => a.text.toLowerCase().includes(k))) || metadata.anchors[0];
    if (candidate) official_url = candidate.href;
  }

  // Fallbacks: try to find links marked by icons or buttons
  if (!official_url) {
    try {
      const ext = await page.evaluate(() => {
        // look for elements that look like external links/buttons
        const els = Array.from(document.querySelectorAll('a'));
        for (const e of els) {
          const href = e.href || '';
          if (!href) continue;
          if (!href.includes(location.hostname)) return href;
        }
        return null;
      });
      if (ext) official_url = ext;
    } catch { /* ignore */ }
  }

  const result = {
    source_page: url,
    name: metadata.name,
    description: metadata.description,
    image: metadata.ogImage,
    canonical: metadata.canonical,
    official_url: official_url,
    tags: metadata.tags,
  };

  return result;
}

async function scrapeAll() {
  const browser = await openBrowser();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (compatible; ScraperBot/1.0; +https://example.com/bot)');
  await page.setViewport({ width: 1200, height: 800 });

  // Step 1: discover tool pages
  console.log('Fetching listing links...');
  const listingLinks = await fetchToolListingLinks(page);
  console.log(`Found ${listingLinks.length} candidate pages.`);

  // Step 2: visit each page and extract details with concurrency
  const results = [];
  const queue = listingLinks.slice();

  const workers = new Array(CONCURRENCY).fill(null).map(async (_, idx) => {
    while (queue.length) {
      const link = queue.shift();
      if (!link) break;
      try {
        console.log(`[worker ${idx}] Visiting: ${link}`);
        const p = await browser.newPage();
        await p.setUserAgent('Mozilla/5.0 (compatible; ScraperBot/1.0; +https://example.com/bot)');
        await p.setViewport({ width: 1200, height: 800 });

        // Retry navigation a few times if network hiccup
        const data = await pRetry(() => extractFromToolPage(p, link), { retries: 2 });
        results.push(data);

        await p.close();
        await new Promise(r => setTimeout(r, VISIT_DELAY_MS));
      } catch (err) {
        console.warn(`Failed to extract ${link}: ${err.message}`);
      }
    }
  });

  await Promise.all(workers);

  // Save output
  await fs.writeJson(OUTPUT_FILE, results, { spaces: 2 });
  console.log(`Saved ${results.length} items to ${OUTPUT_FILE}`);

  await browser.close();
  return results;
}

// Run when executed directly
if (require.main === module) {
  (async () => {
    try {
      await scrapeAll();
    } catch (err) {
      console.error('Scrape failed:', err);
      process.exit(1);
    }
  })();
}

module.exports = {
  scrapeAll,
};
