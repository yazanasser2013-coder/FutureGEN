/**
 * MANJA.AI LOGO FIXER
 * 
 * Fixes tools that incorrectly have the manja.ai logo.
 * These tools redirect to manja.ai but are actually different tools
 * with their own logos on FutureTools.io pages.
 * 
 * Run: node scrapers/fix_manja_logos.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { chromium } = require('playwright');

// ================= CONFIG =================
const IN_PATH = path.join(__dirname, 'tools.json');
const OUT_PATH = path.join(__dirname, 'tools.json');
const BACKUP_PATH = path.join(__dirname, `tools_BACKUP_manja_${Date.now()}.json`);
const REPORT_PATH = path.join(__dirname, 'manja_fix_report.json');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

// ================= HELPERS =================

function hasManjaiLogo(tool) {
    const logo = (tool.logo || '').toLowerCase();
    const icon = (tool.icon || '').toLowerCase();
    const domain = (tool.domain || '').toLowerCase();

    return logo.includes('manja.ai') ||
        icon.includes('manja.ai') ||
        domain === 'manja.ai';
}

function hasFutureToolsUrl(tool) {
    return tool.directory_url && tool.directory_url.includes('futuretools.io/tools/');
}

async function validateLogoUrl(url) {
    try {
        if (!url || !url.startsWith('http')) return false;
        const response = await axios.get(url, {
            timeout: 8000,
            responseType: 'arraybuffer',
            headers: { 'User-Agent': USER_AGENT },
            validateStatus: (status) => status === 200
        });
        return response.data.length >= 200;
    } catch (e) {
        return false;
    }
}

// ================= FUTURETOOLS SCRAPER =================

async function scrapeFutureToolsLogo(directoryUrl, page) {
    try {
        await page.goto(directoryUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        await page.waitForTimeout(2000);

        // Find the main tool logo (from FutureTools CDN)
        const logoUrl = await page.evaluate(() => {
            // Look for the main tool image in a link to futuretools.link
            const mainLink = document.querySelector('a[href*="futuretools.link"]');
            if (mainLink) {
                const img = mainLink.querySelector('img');
                if (img && img.src && img.src.includes('website-files.com')) {
                    return img.src;
                }
            }

            // Find any image from the FutureTools CDN
            const images = document.querySelectorAll('img');
            for (const img of images) {
                if (img.src && img.src.includes('cdn.prod.website-files.com') &&
                    !img.src.includes('avatar') &&
                    !img.src.includes('similar')) {
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
        console.log(`      Error: ${e.message.substring(0, 40)}`);
        return null;
    }
}

// ================= MAIN =================

async function main() {
    console.log('='.repeat(70));
    console.log('🐱 MANJA.AI LOGO FIXER - Fixing incorrectly assigned logos');
    console.log('='.repeat(70));

    // Load tools
    console.log('\n📂 Loading tools...');
    const tools = JSON.parse(fs.readFileSync(IN_PATH, 'utf-8'));
    console.log(`📊 Total tools: ${tools.length}`);

    // Find tools with manja.ai logo that have FutureTools URLs
    const toolsToFix = tools.filter(t => hasManjaiLogo(t) && hasFutureToolsUrl(t));

    console.log(`\n🐱 Tools with manja.ai logo: ${toolsToFix.length}`);

    if (toolsToFix.length === 0) {
        console.log('\n✅ No tools with manja.ai logo to fix!');
        return;
    }

    // Show which tools will be fixed
    console.log('\n📋 Tools to fix:');
    toolsToFix.slice(0, 10).forEach(t => console.log(`   - ${t.name}`));
    if (toolsToFix.length > 10) console.log(`   ... and ${toolsToFix.length - 10} more`);

    // Create backup
    console.log(`\n💾 Creating backup...`);
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
            const name = (tool.name || 'Unknown').substring(0, 40);

            console.log(`\n[${i + 1}/${toolsToFix.length}] 🔧 ${name}...`);
            console.log(`   FT URL: ${tool.directory_url}`);

            try {
                const logo = await scrapeFutureToolsLogo(tool.directory_url, page);

                if (logo) {
                    tool.logo = logo;
                    tool.icon = logo;
                    tool.logo_source = 'futuretools_manja_fix';
                    tool.logo_updated = new Date().toISOString().split('T')[0];

                    console.log(`   ✅ Fixed: ${logo.substring(0, 55)}...`);
                    stats.fixed++;
                    results.push({ name, status: 'fixed', logo: logo.substring(0, 60) });
                } else {
                    console.log(`   ❌ No logo found`);
                    stats.failed++;
                    results.push({ name, status: 'failed' });
                }
            } catch (e) {
                console.log(`   ❌ Error: ${e.message.substring(0, 40)}`);
                stats.failed++;
            }

            // Save every 10 tools
            if ((i + 1) % 10 === 0) {
                console.log(`\n📈 Progress: ${i + 1}/${toolsToFix.length} | Fixed: ${stats.fixed}`);
                fs.writeFileSync(OUT_PATH, JSON.stringify(tools, null, 2));
            }
        }
    } finally {
        await page.close();
        await browser.close();
    }

    // Save
    console.log('\n💾 Saving...');
    fs.writeFileSync(OUT_PATH, JSON.stringify(tools, null, 2));

    // Report
    const report = {
        timestamp: new Date().toISOString(),
        processed: toolsToFix.length,
        fixed: stats.fixed,
        failed: stats.failed,
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
    console.log(`📁 Report: ${REPORT_PATH}`);
}

main().catch(console.error);
