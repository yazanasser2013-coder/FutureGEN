/**
 * DEFINITIVE LOGO FIXER - Ultimate solution for fixing fallback logos
 * 
 * This script uses the STRONGEST available strategies to find real logos:
 * 
 * PRIORITY ORDER:
 * 1. SerpAPI Google Image Search - Search for "{tool name} logo" on Google Images
 * 2. Playwright Website Scraping - Visit actual website with JS rendering
 * 3. FutureTools Directory Scraping - Scrape logo from futuretools.io page
 * 4. Multiple Favicon Services - Google, DuckDuckGo, Clearbit
 * 5. Direct Website Paths - Common logo/favicon paths
 * 
 * Run: node scrapers/definitive_logo_fixer.js [--sample N] [--tools "name1,name2"]
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { chromium } = require('playwright');

// ================= CONFIGURATION =================
const IN_PATH = path.join(__dirname, 'tools.json');
const OUT_PATH = path.join(__dirname, 'tools.json');
const BACKUP_PATH = path.join(__dirname, `tools_BACKUP_${Date.now()}.json`);
const REPORT_PATH = path.join(__dirname, 'definitive_logo_report.json');

// SerpAPI key from existing smart_fallback_fixer.py
const SERP_API_KEY = "c5457eb8e7f4c100340edd82086dc64b975d333008db10cc4369ad06e1c90e3e";

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Lower thresholds to accept more logos
const MIN_FILE_SIZE = 200;

// ================= FALLBACK DETECTION =================

function isFallbackLogo(logoUrl) {
    if (!logoUrl) return true;

    if (logoUrl.startsWith('data:image/svg+xml;base64,')) {
        try {
            const base64Part = logoUrl.replace('data:image/svg+xml;base64,', '');
            const svgContent = Buffer.from(base64Part, 'base64').toString('utf-8');

            if (svgContent.includes('font-weight="700"') &&
                svgContent.includes('text-anchor="middle"') &&
                svgContent.includes('letter-spacing="-8"')) {

                const textMatch = svgContent.match(/<text[^>]*>([^<]+)<\/text>/);
                if (textMatch) {
                    const text = textMatch[1].trim();
                    if (text.length === 2 && /^[A-Za-z]+$/.test(text)) {
                        return true;
                    }
                }
            }
        } catch (e) { }
    }

    return false;
}

function needsFixing(tool) {
    const logo = tool.logo || '';
    if (isFallbackLogo(logo)) return true;
    if (tool.logo_source === 'svg_fallback') return true;
    return false;
}

// ================= LOGO VALIDATION =================

async function validateLogoUrl(url, timeout = 8000) {
    try {
        if (!url || !url.startsWith('http')) return false;

        const urlLower = url.toLowerCase();
        if (urlLower.includes('placeholder') || urlLower.includes('1x1') ||
            urlLower.includes('blank.') || urlLower.includes('spacer')) {
            return false;
        }

        const response = await axios.get(url, {
            timeout,
            responseType: 'arraybuffer',
            headers: { 'User-Agent': USER_AGENT },
            maxRedirects: 5,
            validateStatus: (status) => status === 200
        });

        const contentType = (response.headers['content-type'] || '').toLowerCase();
        const data = response.data;

        if (data.length < MIN_FILE_SIZE) return false;

        if (!contentType.includes('image') && !contentType.includes('svg') &&
            !contentType.includes('octet-stream') && !contentType.includes('icon')) {
            return false;
        }

        // For SVGs, check it's not just text
        if (contentType.includes('svg') || url.endsWith('.svg')) {
            const svgText = data.toString('utf-8');
            if (!svgText.includes('<svg')) return false;
            if (svgText.includes('<text') && !svgText.includes('<path') &&
                !svgText.includes('<circle') && !svgText.includes('<image')) {
                return false;
            }
        }

        return true;
    } catch (e) {
        return false;
    }
}

// ================= STRATEGY 1: SERP API GOOGLE IMAGE SEARCH =================

async function searchGoogleImages(toolName, domain) {
    try {
        if (!toolName || !SERP_API_KEY) return null;

        // Multiple search queries for better results
        const queries = [
            `"${toolName}" logo official site:${domain}`,
            `"${toolName}" logo official`,
            `"${toolName}" logo brand icon`,
            `${toolName} logo png svg`,
        ];

        for (const query of queries) {
            try {
                const response = await axios.get('https://serpapi.com/search', {
                    params: {
                        engine: 'google_images',
                        q: query,
                        api_key: SERP_API_KEY,
                        num: 20,
                        safe: 'active'
                    },
                    timeout: 15000
                });

                const images = response.data.images_results || [];

                for (const img of images.slice(0, 10)) {
                    const imgUrl = img.original || img.thumbnail;
                    if (!imgUrl) continue;

                    // Score this result
                    let score = 0;
                    const urlLower = imgUrl.toLowerCase();
                    const title = (img.title || '').toLowerCase();

                    // Higher score for domain match
                    if (domain && urlLower.includes(domain)) score += 50;

                    // Higher score for logo-related URLs
                    if (urlLower.includes('logo')) score += 30;
                    if (urlLower.includes('brand')) score += 20;
                    if (urlLower.includes('icon')) score += 15;

                    // Higher score for title match
                    if (title.includes(toolName.toLowerCase())) score += 25;
                    if (title.includes('logo')) score += 15;

                    // Prefer SVG/PNG
                    if (urlLower.endsWith('.svg')) score += 20;
                    if (urlLower.endsWith('.png')) score += 10;

                    if (score >= 20 && await validateLogoUrl(imgUrl)) {
                        return imgUrl;
                    }
                }
            } catch (e) {
                continue;
            }
        }

        return null;
    } catch (e) {
        return null;
    }
}

// ================= STRATEGY 2: PLAYWRIGHT WEBSITE DEEP SCRAPE =================

async function scrapeWebsiteWithPlaywright(url, browser) {
    let page = null;
    try {
        if (!url) return null;

        page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        // Set longer timeout and wait for network idle
        await page.goto(url, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        // Wait for any dynamic content
        await page.waitForTimeout(3000);

        // Extract ALL images from the page
        const images = await page.evaluate(() => {
            const results = [];

            // Get all img tags
            document.querySelectorAll('img').forEach((img, index) => {
                const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
                if (!src || src.startsWith('data:')) return;

                const alt = (img.alt || '').toLowerCase();
                const className = (img.className || '').toLowerCase();
                const id = (img.id || '').toLowerCase();

                let score = 100 - (index * 2); // Earlier images get higher score

                if (alt.includes('logo') || className.includes('logo') || id.includes('logo')) score += 50;
                if (alt.includes('brand') || className.includes('brand')) score += 30;
                if (alt.includes('icon') || className.includes('icon')) score += 20;
                if (src.includes('logo')) score += 40;

                results.push({ src, score });
            });

            // Get OG image
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage && ogImage.content) {
                results.push({ src: ogImage.content, score: 80 });
            }

            // Get apple-touch-icon
            const touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
            if (touchIcon && touchIcon.href) {
                results.push({ src: touchIcon.href, score: 70 });
            }

            // Get favicon
            const favicon = document.querySelector('link[rel="icon"]') ||
                document.querySelector('link[rel="shortcut icon"]');
            if (favicon && favicon.href) {
                results.push({ src: favicon.href, score: 60 });
            }

            return results;
        });

        // Sort by score and try each
        images.sort((a, b) => b.score - a.score);

        for (const { src } of images.slice(0, 15)) {
            // Make URL absolute
            let absoluteUrl = src;
            try {
                absoluteUrl = new URL(src, url).href;
            } catch (e) { }

            if (await validateLogoUrl(absoluteUrl)) {
                await page.close();
                return absoluteUrl;
            }
        }

        await page.close();
        return null;
    } catch (e) {
        if (page) await page.close().catch(() => { });
        return null;
    }
}

// ================= STRATEGY 3: FUTURETOOLS DIRECTORY SCRAPE =================

async function scrapeFutureToolsPage(directoryUrl, browser) {
    let page = null;
    try {
        if (!directoryUrl || !directoryUrl.includes('futuretools.io')) return null;

        page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        await page.goto(directoryUrl, {
            waitUntil: 'networkidle',
            timeout: 25000
        });

        await page.waitForTimeout(2000);

        // Find the main tool image (NOT from "Similar Tools" section)
        const logoUrl = await page.evaluate(() => {
            // The main tool logo is typically in a link that goes to futuretools.link
            const mainLink = document.querySelector('a[href*="futuretools.link"]');
            if (mainLink) {
                const img = mainLink.querySelector('img');
                if (img && img.src && !img.src.startsWith('data:')) {
                    return img.src;
                }
            }

            // Try finding image near the h1
            const h1 = document.querySelector('h1');
            if (h1) {
                const parent = h1.closest('div');
                if (parent) {
                    const img = parent.querySelector('img');
                    if (img && img.src && !img.src.startsWith('data:')) {
                        return img.src;
                    }
                }
            }

            return null;
        });

        await page.close();

        if (logoUrl && await validateLogoUrl(logoUrl)) {
            return logoUrl;
        }

        return null;
    } catch (e) {
        if (page) await page.close().catch(() => { });
        return null;
    }
}

// ================= STRATEGY 4: FAVICON SERVICES =================

async function tryFaviconServices(domain) {
    if (!domain) return null;

    const services = [
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        `https://logo.clearbit.com/${domain}?size=400`,
        `https://icon.horse/icon/${domain}`,
        `https://favicons.githubusercontent.com/${domain}`,
    ];

    for (const url of services) {
        if (await validateLogoUrl(url, 5000)) {
            return url;
        }
    }

    return null;
}

// ================= STRATEGY 5: COMMON PATHS =================

async function tryCommonPaths(domain) {
    if (!domain) return null;

    const paths = [
        '/logo.png', '/logo.svg', '/favicon.png', '/favicon.svg',
        '/images/logo.png', '/assets/logo.png', '/static/logo.png',
        '/apple-touch-icon.png', '/apple-touch-icon-180x180.png',
        '/_next/static/media/logo.png', '/img/logo.png',
    ];

    for (const urlPath of paths) {
        const url = `https://${domain}${urlPath}`;
        if (await validateLogoUrl(url, 4000)) {
            return url;
        }
    }

    return null;
}

// ================= DOMAIN EXTRACTION =================

function getDomain(tool) {
    if (tool.official_domain && tool.official_domain.length > 3) {
        return tool.official_domain.toLowerCase().replace('www.', '');
    }
    if (tool.domain && tool.domain.length > 3) {
        return tool.domain.toLowerCase().replace('www.', '');
    }
    for (const key of ['official_url', 'url']) {
        const url = tool[key];
        if (url) {
            try {
                const parsed = new URL(url);
                const domain = parsed.hostname.toLowerCase().replace('www.', '');
                if (domain.length > 3) return domain;
            } catch (e) { }
        }
    }
    return null;
}

// ================= MAIN PROCESSING =================

async function fixOneTool(tool, browser, stats) {
    const name = tool.name || 'Unknown';

    if (!needsFixing(tool)) {
        stats.skipped++;
        return { name, status: 'skipped', reason: 'Already has working logo' };
    }

    console.log(`\n🔧 FIXING: ${name}`);

    const domain = getDomain(tool);
    const officialUrl = tool.official_url || tool.url;
    const directoryUrl = tool.directory_url;

    console.log(`   Domain: ${domain || 'N/A'}`);

    // Try all strategies in order of reliability
    const strategies = [
        {
            name: 'serp_google_images',
            fn: () => searchGoogleImages(name, domain)
        },
        {
            name: 'playwright_website',
            fn: () => scrapeWebsiteWithPlaywright(officialUrl, browser)
        },
        {
            name: 'futuretools_page',
            fn: () => scrapeFutureToolsPage(directoryUrl, browser)
        },
        {
            name: 'favicon_services',
            fn: () => tryFaviconServices(domain)
        },
        {
            name: 'common_paths',
            fn: () => tryCommonPaths(domain)
        }
    ];

    for (const { name: strategyName, fn } of strategies) {
        try {
            console.log(`   📡 Trying ${strategyName}...`);
            const logo = await fn();

            if (logo && logo.length > 20) {
                tool.logo = logo;
                tool.icon = logo;
                tool.logo_source = strategyName;
                tool.logo_updated = new Date().toISOString().split('T')[0];

                console.log(`   ✅ SUCCESS: ${logo.substring(0, 70)}...`);

                stats.fixed++;
                stats.sources[strategyName] = (stats.sources[strategyName] || 0) + 1;

                return { name, status: 'fixed', source: strategyName, logo: logo.substring(0, 100) };
            }
        } catch (e) {
            console.log(`   ⚠️ ${strategyName} error: ${e.message}`);
        }
    }

    stats.failed++;
    console.log(`   ❌ All strategies failed`);
    return { name, status: 'failed', reason: 'All strategies failed' };
}

async function main() {
    const args = process.argv.slice(2);
    let sampleSize = null;
    let specificTools = null;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--sample' && args[i + 1]) {
            sampleSize = parseInt(args[i + 1]);
        }
        if (args[i] === '--tools' && args[i + 1]) {
            specificTools = args[i + 1].split(',').map(t => t.trim().toLowerCase());
        }
    }

    console.log('='.repeat(80));
    console.log('🚀 DEFINITIVE LOGO FIXER - The Ultimate Solution');
    console.log('='.repeat(80));
    console.log('\n📋 Strategies (in priority order):');
    console.log('   1. SerpAPI Google Image Search');
    console.log('   2. Playwright Website Deep Scraping');
    console.log('   3. FutureTools Directory Page Scraping');
    console.log('   4. Multiple Favicon Services');
    console.log('   5. Common Website Paths\n');

    // Load tools
    console.log(`📂 Loading tools from: ${IN_PATH}`);
    const tools = JSON.parse(fs.readFileSync(IN_PATH, 'utf-8'));
    console.log(`📊 Total tools: ${tools.length}`);

    // Create backup
    console.log(`💾 Creating backup: ${BACKUP_PATH}`);
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(tools, null, 2));

    // Filter tools
    let toolsToProcess = tools;

    if (specificTools) {
        toolsToProcess = tools.filter(t =>
            specificTools.some(st => t.name.toLowerCase().includes(st))
        );
        console.log(`🎯 Filtering to: ${specificTools.join(', ')}`);
    }

    if (sampleSize) {
        const needsFix = toolsToProcess.filter(needsFixing);
        toolsToProcess = needsFix.slice(0, sampleSize);
        console.log(`📏 Sample: ${sampleSize} tools that need fixing`);
    }

    const needFixing = toolsToProcess.filter(needsFixing);
    console.log(`\n✅ Already OK: ${toolsToProcess.length - needFixing.length}`);
    console.log(`🔧 Need fixing: ${needFixing.length}`);

    if (needFixing.length === 0) {
        console.log('\n🎉 All tools already have working logos!');
        return;
    }

    console.log('\n🌐 Launching browser...');
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const stats = {
        total: tools.length,
        processed: 0,
        fixed: 0,
        failed: 0,
        skipped: 0,
        sources: {}
    };

    const results = [];

    try {
        for (const tool of toolsToProcess) {
            const result = await fixOneTool(tool, browser, stats);
            results.push(result);
            stats.processed++;

            if (stats.processed % 5 === 0) {
                console.log(`\n📈 Progress: ${stats.processed}/${toolsToProcess.length} | Fixed: ${stats.fixed} | Failed: ${stats.failed}`);
            }
        }
    } finally {
        await browser.close();
    }

    // Save
    console.log(`\n💾 Saving to: ${OUT_PATH}`);
    fs.writeFileSync(OUT_PATH, JSON.stringify(tools, null, 2));

    const report = {
        timestamp: new Date().toISOString(),
        total_tools: tools.length,
        processed: stats.processed,
        fixed: stats.fixed,
        failed: stats.failed,
        skipped: stats.skipped,
        success_rate: needFixing.length > 0
            ? `${(stats.fixed / needFixing.length * 100).toFixed(1)}%`
            : 'N/A',
        sources: stats.sources,
        fixed_tools: results.filter(r => r.status === 'fixed'),
        failed_tools: results.filter(r => r.status === 'failed').slice(0, 100)
    };

    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

    console.log('\n' + '='.repeat(80));
    console.log('✅ COMPLETE!');
    console.log('='.repeat(80));
    console.log(`📊 Results:`);
    console.log(`   Processed: ${stats.processed}`);
    console.log(`   Fixed: ${stats.fixed}`);
    console.log(`   Failed: ${stats.failed}`);
    console.log(`   Success rate: ${report.success_rate}`);
    console.log(`\n📁 Output: ${OUT_PATH}`);
    console.log(`📊 Report: ${REPORT_PATH}`);

    if (Object.keys(stats.sources).length > 0) {
        console.log('\n🎯 Fixed using:');
        Object.entries(stats.sources)
            .sort((a, b) => b[1] - a[1])
            .forEach(([src, count]) => console.log(`   ${src}: ${count}`));
    }
}

main().catch(console.error);
