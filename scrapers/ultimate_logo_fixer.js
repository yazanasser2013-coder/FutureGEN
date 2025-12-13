/**
 * ULTIMATE LOGO FIXER - Fixes tools with fallback logos (2-letter initials)
 * 
 * Strategies (in priority order):
 * 1. Google Favicon Service - very high success rate for most domains
 * 2. DuckDuckGo Icons - alternative favicon source
 * 3. Playwright browser - JS-rendered website scraping
 * 4. Clearbit API - brand logos
 * 5. Official website favicon paths
 * 
 * Run: node scrapers/ultimate_logo_fixer.js [--sample N] [--tools "name1,name2"]
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { chromium } = require('playwright');

// ================= CONFIGURATION =================
const PROJECT_DIR = path.resolve(__dirname, '..');
const IN_PATH = path.join(__dirname, 'tools.json');
const OUT_PATH = path.join(__dirname, 'tools.json'); // Update in place
const BACKUP_PATH = path.join(__dirname, `tools_BACKUP_${Date.now()}.json`);
const REPORT_PATH = path.join(__dirname, 'logo_fix_report.json');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Quality thresholds
const MIN_SIZE = 32;
const MIN_FILE_SIZE = 500;

// ================= FALLBACK DETECTION =================

function isFallbackLogo(logoUrl) {
    if (!logoUrl) return true;

    // Check if it's a data URL with our fallback pattern
    if (logoUrl.startsWith('data:image/svg+xml;base64,')) {
        try {
            const base64Part = logoUrl.replace('data:image/svg+xml;base64,', '');
            const svgContent = Buffer.from(base64Part, 'base64').toString('utf-8');

            // Check for our fallback pattern signatures
            if (svgContent.includes('font-weight="700"') &&
                svgContent.includes('text-anchor="middle"') &&
                svgContent.includes('letter-spacing="-8"')) {

                // Check if it's 2-letter text
                const textMatch = svgContent.match(/<text[^>]*>([^<]+)<\/text>/);
                if (textMatch) {
                    const text = textMatch[1].trim();
                    if (text.length === 2 && /^[A-Za-z]+$/.test(text)) {
                        return true; // This is a fallback logo
                    }
                }
            }
        } catch (e) {
            // If decoding fails, assume it's fine
        }
    }

    return false;
}

function needsFixing(tool) {
    const logo = tool.logo || '';

    // Check if it's our fallback
    if (isFallbackLogo(logo)) return true;

    // Check logo_source field
    if (tool.logo_source === 'svg_fallback') return true;

    return false;
}

// ================= LOGO VALIDATION =================

async function validateLogoUrl(url, timeout = 10000) {
    try {
        if (!url || !url.startsWith('http')) return false;

        // Quick reject obvious bad patterns
        const urlLower = url.toLowerCase();
        if (urlLower.includes('placeholder') ||
            urlLower.includes('1x1') ||
            urlLower.includes('blank.') ||
            urlLower.includes('spacer') ||
            urlLower.includes('error')) {
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

        // Check size
        if (data.length < MIN_FILE_SIZE) return false;

        // Validate content type
        if (!contentType.includes('image') &&
            !contentType.includes('svg') &&
            !contentType.includes('octet-stream')) {
            return false;
        }

        // For SVGs, check it's not just text
        if (contentType.includes('svg') || url.endsWith('.svg')) {
            const svgText = data.toString('utf-8');
            if (!svgText.includes('<svg')) return false;

            // Reject text-only SVGs (likely placeholders)
            if (svgText.includes('<text') &&
                !svgText.includes('<path') &&
                !svgText.includes('<circle') &&
                !svgText.includes('<image') &&
                !svgText.includes('<rect')) {
                return false;
            }
        }

        return true;
    } catch (e) {
        return false;
    }
}

// ================= LOGO STRATEGIES =================

/**
 * Strategy 1: Google Favicon Service - very reliable for most domains
 */
async function getGoogleFavicon(domain, size = 128) {
    try {
        if (!domain) return null;

        const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

        if (await validateLogoUrl(url)) {
            return url;
        }

        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Strategy 2: DuckDuckGo Icons
 */
async function getDuckDuckGoIcon(domain) {
    try {
        if (!domain) return null;

        const url = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

        if (await validateLogoUrl(url)) {
            return url;
        }

        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Strategy 3: Playwright browser-based scraping for JS-rendered sites
 */
async function scrapeWithPlaywright(url, browser) {
    let page = null;
    try {
        if (!url) return null;

        page = await browser.newPage();
        await page.setViewportSize({ width: 1280, height: 720 });

        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 20000
        });

        // Wait a bit for dynamic content
        await page.waitForTimeout(2000);

        // Look for logos
        const logoSelectors = [
            'img[class*="logo"]',
            'img[alt*="logo"]',
            'img[src*="logo"]',
            'header img',
            'nav img',
            '.navbar img',
            '[class*="brand"] img',
            'a[href="/"] img',
            'img:first-of-type'
        ];

        for (const selector of logoSelectors) {
            try {
                const img = await page.$(selector);
                if (img) {
                    let src = await img.getAttribute('src');

                    if (src) {
                        // Make absolute
                        if (src.startsWith('/')) {
                            const urlObj = new URL(url);
                            src = urlObj.origin + src;
                        } else if (!src.startsWith('http') && !src.startsWith('data:')) {
                            src = new URL(src, url).href;
                        }

                        // Skip data URLs
                        if (src.startsWith('data:')) continue;

                        if (await validateLogoUrl(src)) {
                            await page.close();
                            return src;
                        }
                    }
                }
            } catch (e) {
                continue;
            }
        }

        // Try OG image
        try {
            const ogImage = await page.$('meta[property="og:image"]');
            if (ogImage) {
                let content = await ogImage.getAttribute('content');
                if (content && await validateLogoUrl(content)) {
                    await page.close();
                    return content;
                }
            }
        } catch (e) { }

        await page.close();
        return null;
    } catch (e) {
        if (page) await page.close().catch(() => { });
        return null;
    }
}

/**
 * Strategy 4: Clearbit Logo API
 */
async function getClearbitLogo(domain) {
    try {
        if (!domain) return null;

        const url = `https://logo.clearbit.com/${domain}?size=400`;

        if (await validateLogoUrl(url)) {
            return url;
        }

        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Strategy 5: Common favicon paths
 */
async function getCommonFavicon(domain) {
    try {
        if (!domain) return null;

        const paths = [
            '/favicon.ico',
            '/favicon.png',
            '/apple-touch-icon.png',
            '/logo.png',
            '/logo.svg',
            '/assets/logo.png',
            '/images/logo.png',
            '/img/logo.png'
        ];

        for (const faviconPath of paths) {
            const url = `https://${domain}${faviconPath}`;
            if (await validateLogoUrl(url, 5000)) {
                return url;
            }
        }

        return null;
    } catch (e) {
        return null;
    }
}

// ================= DOMAIN EXTRACTION =================

function getDomain(tool) {
    // Try official_domain first
    if (tool.official_domain && tool.official_domain.length > 3) {
        return tool.official_domain.toLowerCase().replace('www.', '');
    }

    // Try domain field
    if (tool.domain && tool.domain.length > 3) {
        return tool.domain.toLowerCase().replace('www.', '');
    }

    // Extract from URLs
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

// ================= MAIN LOGIC =================

async function fixOneTool(tool, browser, stats) {
    const name = tool.name || 'Unknown';

    if (!needsFixing(tool)) {
        stats.skipped++;
        return { name, status: 'skipped', reason: 'Already has working logo' };
    }

    console.log(`\n🔧 FIXING: ${name}`);

    const domain = getDomain(tool);
    const officialUrl = tool.official_url || tool.url;

    console.log(`   Domain: ${domain || 'N/A'}`);

    // Try strategies in order - Google Favicon first as it has highest success rate
    const strategies = [
        { name: 'google_favicon', fn: () => getGoogleFavicon(domain, 128) },
        { name: 'duckduckgo', fn: () => getDuckDuckGoIcon(domain) },
        { name: 'playwright', fn: () => scrapeWithPlaywright(officialUrl, browser) },
        { name: 'clearbit', fn: () => getClearbitLogo(domain) },
        { name: 'favicon_paths', fn: () => getCommonFavicon(domain) }
    ];

    for (const { name: strategyName, fn } of strategies) {
        try {
            console.log(`   Trying ${strategyName}...`);
            const logo = await fn();

            if (logo && logo.length > 20) {
                // Update tool
                tool.logo = logo;
                tool.icon = logo;
                tool.logo_source = strategyName;
                tool.logo_updated = new Date().toISOString().split('T')[0];

                console.log(`   ✅ Found: ${logo.substring(0, 70)}...`);

                stats.fixed++;
                stats.sources[strategyName] = (stats.sources[strategyName] || 0) + 1;

                return { name, status: 'fixed', source: strategyName, logo: logo.substring(0, 100) };
            }
        } catch (e) {
            // Continue to next strategy
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

    // Parse arguments
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--sample' && args[i + 1]) {
            sampleSize = parseInt(args[i + 1]);
        }
        if (args[i] === '--tools' && args[i + 1]) {
            specificTools = args[i + 1].split(',').map(t => t.trim().toLowerCase());
        }
    }

    console.log('='.repeat(80));
    console.log('🎯 ULTIMATE LOGO FIXER - Fixing fallback logos with real ones');
    console.log('='.repeat(80));

    // Load tools
    console.log(`\n📂 Loading tools from: ${IN_PATH}`);
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
        console.log(`🎯 Filtering to specific tools: ${specificTools.join(', ')}`);
    }

    if (sampleSize) {
        // Get only tools that need fixing, then sample
        const needsFix = toolsToProcess.filter(needsFixing);
        toolsToProcess = needsFix.slice(0, sampleSize);
        console.log(`📏 Sample mode: processing ${sampleSize} tools that need fixing`);
    }

    // Count what needs fixing
    const needFixing = toolsToProcess.filter(needsFixing);
    const alreadyOk = toolsToProcess.length - needFixing.length;

    console.log(`\n✅ Already have working logos: ${alreadyOk}`);
    console.log(`🔧 Need fixing: ${needFixing.length}`);

    if (needFixing.length === 0) {
        console.log('\n🎉 All tools already have working logos!');
        return;
    }

    // Launch browser
    console.log('\n🌐 Launching browser...');
    const browser = await chromium.launch({ headless: true });

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
        // Process tools
        for (const tool of toolsToProcess) {
            const result = await fixOneTool(tool, browser, stats);
            results.push(result);
            stats.processed++;

            // Progress update
            if (stats.processed % 10 === 0) {
                console.log(`\n📈 Progress: ${stats.processed}/${toolsToProcess.length} | Fixed: ${stats.fixed} | Failed: ${stats.failed}`);
            }
        }
    } finally {
        await browser.close();
    }

    // Save updated tools
    console.log(`\n💾 Saving updated tools to: ${OUT_PATH}`);
    fs.writeFileSync(OUT_PATH, JSON.stringify(tools, null, 2));

    // Generate report
    const report = {
        timestamp: new Date().toISOString(),
        total_tools: tools.length,
        processed: stats.processed,
        already_ok: stats.skipped,
        fixed: stats.fixed,
        failed: stats.failed,
        success_rate: needFixing.length > 0
            ? `${(stats.fixed / needFixing.length * 100).toFixed(1)}%`
            : 'N/A',
        sources: stats.sources,
        fixed_tools: results.filter(r => r.status === 'fixed'),
        failed_tools: results.filter(r => r.status === 'failed').slice(0, 50)
    };

    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('✅ COMPLETE!');
    console.log('='.repeat(80));
    console.log(`📊 Results:`);
    console.log(`   Processed: ${stats.processed}`);
    console.log(`   Already OK: ${stats.skipped}`);
    console.log(`   Fixed: ${stats.fixed}`);
    console.log(`   Failed: ${stats.failed}`);
    console.log(`   Success rate: ${report.success_rate}`);
    console.log(`\n📁 Output: ${OUT_PATH}`);
    console.log(`📊 Report: ${REPORT_PATH}`);
    console.log(`💾 Backup: ${BACKUP_PATH}`);

    if (Object.keys(stats.sources).length > 0) {
        console.log('\n🎯 Fixed using:');
        Object.entries(stats.sources)
            .sort((a, b) => b[1] - a[1])
            .forEach(([src, count]) => {
                console.log(`   ${src}: ${count}`);
            });
    }
}

main().catch(console.error);
