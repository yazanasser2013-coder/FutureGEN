/**
 * FAST FUTURETOOLS LOGO FIXER
 * 
 * This script ONLY processes tools with:
 * 1. Fallback logos (svg_fallback)
 * 2. Valid FutureTools directory URLs
 * 
 * It uses Playwright to scrape logos directly from FutureTools pages,
 * which has 100% success rate for tools in their database.
 * 
 * Run: node scrapers/fast_futuretools_fixer.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { chromium } = require('playwright');

// ================= CONFIGURATION =================
const IN_PATH = path.join(__dirname, 'tools.json');
const OUT_PATH = path.join(__dirname, 'tools.json');
const BACKUP_PATH = path.join(__dirname, `tools_BACKUP_${Date.now()}.json`);
const REPORT_PATH = path.join(__dirname, 'fast_fix_report.json');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MIN_FILE_SIZE = 200;

// ================= HELPERS =================

function isFallbackLogo(logoUrl) {
    if (!logoUrl) return true;
    if (logoUrl.startsWith('data:image/svg+xml;base64,')) {
        try {
            const base64Part = logoUrl.replace('data:image/svg+xml;base64,', '');
            const svgContent = Buffer.from(base64Part, 'base64').toString('utf-8');
            if (svgContent.includes('letter-spacing="-8"') && svgContent.includes('font-weight="700"')) {
                const textMatch = svgContent.match(/<text[^>]*>([^<]+)<\/text>/);
                if (textMatch && textMatch[1].trim().length === 2) return true;
            }
        } catch (e) { }
    }
    return false;
}

function needsFixing(tool) {
    if (tool.logo_source === 'svg_fallback') return true;
    if (isFallbackLogo(tool.logo)) return true;
    return false;
}

function hasValidFutureToolsUrl(tool) {
    return tool.directory_url && tool.directory_url.includes('futuretools.io/tools/');
}

async function validateLogoUrl(url) {
    try {
        if (!url || !url.startsWith('http')) return false;
        const response = await axios.get(url, {
            timeout: 8000,
            responseType: 'arraybuffer',
            headers: { 'User-Agent': USER_AGENT },
            maxRedirects: 5,
            validateStatus: (status) => status === 200
        });
        return response.data.length >= MIN_FILE_SIZE;
    } catch (e) {
        return false;
    }
}

// ================= FUTURETOOLS SCRAPER =================

async function scrapeFutureToolsPage(directoryUrl, page) {
    try {
        await page.goto(directoryUrl, {
            waitUntil: 'networkidle',
            timeout: 25000
        });

        await page.waitForTimeout(1500);

        // Find main tool logo (not from Similar Tools section)
        const logoUrl = await page.evaluate(() => {
            // Primary: Link to futuretools.link contains the logo
            const mainLink = document.querySelector('a[href*="futuretools.link"]');
            if (mainLink) {
                const img = mainLink.querySelector('img');
                if (img && img.src && !img.src.startsWith('data:')) {
                    return img.src;
                }
            }

            // Secondary: First large image in the main content area
            const images = document.querySelectorAll('img');
            for (let i = 0; i < Math.min(5, images.length); i++) {
                const img = images[i];
                if (img.src &&
                    !img.src.startsWith('data:') &&
                    !img.src.includes('avatar') &&
                    img.src.includes('website-files.com')) {
                    return img.src;
                }
            }

            return null;
        });

        if (logoUrl && await validateLogoUrl(logoUrl)) {
            return logoUrl;
        }

        return null;
    } catch (e) {
        return null;
    }
}

// ================= MAIN =================

async function main() {
    console.log('='.repeat(70));
    console.log('🚀 FAST FUTURETOOLS LOGO FIXER');
    console.log('='.repeat(70));

    // Load and analyze tools
    console.log('\n📂 Loading tools...');
    const tools = JSON.parse(fs.readFileSync(IN_PATH, 'utf-8'));
    console.log(`📊 Total tools: ${tools.length}`);

    // Filter to only tools that need fixing AND have valid FutureTools URLs
    const toolsToFix = tools.filter(t => needsFixing(t) && hasValidFutureToolsUrl(t));
    const toolsNoUrl = tools.filter(t => needsFixing(t) && !hasValidFutureToolsUrl(t));

    console.log(`\n🔧 Need fixing (with FutureTools URL): ${toolsToFix.length}`);
    console.log(`⚠️  Need fixing (no valid URL - skipped): ${toolsNoUrl.length}`);

    if (toolsToFix.length === 0) {
        console.log('\n✅ No tools with valid FutureTools URLs need fixing!');
        return;
    }

    // Create backup
    console.log(`\n💾 Creating backup: ${path.basename(BACKUP_PATH)}`);
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(tools, null, 2));

    // Launch browser
    console.log('\n🌐 Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    const stats = { fixed: 0, failed: 0 };
    const results = [];

    try {
        for (let i = 0; i < toolsToFix.length; i++) {
            const tool = toolsToFix[i];
            const name = tool.name || 'Unknown';

            console.log(`\n[${i + 1}/${toolsToFix.length}] 🔧 ${name.substring(0, 50)}...`);

            try {
                const logo = await scrapeFutureToolsPage(tool.directory_url, page);

                if (logo) {
                    tool.logo = logo;
                    tool.icon = logo;
                    tool.logo_source = 'futuretools_fast';
                    tool.logo_updated = new Date().toISOString().split('T')[0];

                    console.log(`   ✅ Fixed: ${logo.substring(0, 60)}...`);
                    stats.fixed++;
                    results.push({ name, status: 'fixed', logo: logo.substring(0, 80) });
                } else {
                    console.log(`   ❌ Failed`);
                    stats.failed++;
                    results.push({ name, status: 'failed' });
                }
            } catch (e) {
                console.log(`   ❌ Error: ${e.message}`);
                stats.failed++;
                results.push({ name, status: 'failed', error: e.message });
            }

            // Progress update
            if ((i + 1) % 20 === 0) {
                console.log(`\n📈 Progress: ${i + 1}/${toolsToFix.length} | Fixed: ${stats.fixed} | Failed: ${stats.failed}`);
            }
        }
    } finally {
        await page.close();
        await browser.close();
    }

    // Save
    console.log(`\n💾 Saving updated tools...`);
    fs.writeFileSync(OUT_PATH, JSON.stringify(tools, null, 2));

    // Report
    const report = {
        timestamp: new Date().toISOString(),
        total_tools: tools.length,
        processed: toolsToFix.length,
        fixed: stats.fixed,
        failed: stats.failed,
        skipped_no_url: toolsNoUrl.length,
        success_rate: `${(stats.fixed / toolsToFix.length * 100).toFixed(1)}%`,
        fixed_tools: results.filter(r => r.status === 'fixed'),
        failed_tools: results.filter(r => r.status === 'failed')
    };
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('✅ COMPLETE!');
    console.log('='.repeat(70));
    console.log(`📊 Fixed: ${stats.fixed}/${toolsToFix.length} (${report.success_rate})`);
    console.log(`⚠️  Skipped (no URL): ${toolsNoUrl.length}`);
    console.log(`📁 Report: ${REPORT_PATH}`);
}

main().catch(console.error);
