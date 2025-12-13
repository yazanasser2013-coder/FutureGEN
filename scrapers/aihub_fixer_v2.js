/**
 * AIHUB LOGO FIXER v2
 * 
 * Fixes logos for tools with myaihub.ai directory URLs.
 * Uses Playwright to render pages and extract ProductHunt-hosted logos.
 * 
 * Run: node scrapers/aihub_fixer_v2.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { chromium } = require('playwright');

// ================= CONFIG =================
const IN_PATH = path.join(__dirname, 'tools.json');
const OUT_PATH = path.join(__dirname, 'tools.json');
const BACKUP_PATH = path.join(__dirname, `tools_BACKUP_${Date.now()}.json`);
const REPORT_PATH = path.join(__dirname, 'aihub_v2_report.json');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

// ================= HELPERS =================

function needsFixing(tool) {
    return tool.logo_source === 'svg_fallback';
}

function hasMyAIHubUrl(tool) {
    return tool.directory_url && tool.directory_url.includes('myaihub.ai/tools/');
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

// ================= SCRAPER =================

async function scrapeMyAIHubLogo(directoryUrl, page) {
    try {
        // Navigate to page
        await page.goto(directoryUrl, {
            waitUntil: 'networkidle',
            timeout: 35000
        });

        // Wait for content to load
        await page.waitForTimeout(3000);

        // Get all page content including scripts
        const pageContent = await page.content();

        // Try multiple patterns to find the ProductHunt logo URL

        // Pattern 1: Direct "logo":"https://ph-files..." pattern
        let match = pageContent.match(/"logo"\s*:\s*\\?"(https:\/\/ph-files\.imgix\.net\/[^"\\]+)/);
        if (match && match[1]) {
            const url = match[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
            if (await validateLogoUrl(url)) return url;
        }

        // Pattern 2: Escaped URL pattern
        match = pageContent.match(/ph-files\.imgix\.net\\\/([a-f0-9-]+)\.(png|jpg|gif|jpeg|svg)/i);
        if (match) {
            const url = `https://ph-files.imgix.net/${match[1]}.${match[2]}?auto=format`;
            if (await validateLogoUrl(url)) return url;
        }

        // Pattern 3: Look in toolData JSON
        match = pageContent.match(/toolData[^}]*"logo"\s*:\s*\\?"([^"\\]+ph-files[^"\\]+)/);
        if (match && match[1]) {
            const url = match[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
            if (await validateLogoUrl(url)) return url;
        }

        // Pattern 4: Any ph-files URL
        match = pageContent.match(/(https?:\/\/ph-files\.imgix\.net\/[a-f0-9-]+\.[a-z]+)/i);
        if (match && match[1]) {
            const url = match[1] + '?auto=format';
            if (await validateLogoUrl(url)) return url;
        }

        // Pattern 5: Find logo in visible page elements
        const logoFromDOM = await page.evaluate(() => {
            // Look for the tool logo container
            const imgs = document.querySelectorAll('img');
            for (const img of imgs) {
                const src = img.src || '';
                if (src.includes('ph-files.imgix.net') && !src.includes('avatar')) {
                    return src;
                }
            }
            return null;
        });

        if (logoFromDOM && await validateLogoUrl(logoFromDOM)) {
            return logoFromDOM;
        }

        return null;
    } catch (e) {
        console.log(`      Error: ${e.message.substring(0, 50)}`);
        return null;
    }
}

// ================= MAIN =================

async function main() {
    console.log('='.repeat(70));
    console.log('🚀 AIHUB LOGO FIXER v2 - Improved Scraping');
    console.log('='.repeat(70));

    // Load tools
    console.log('\n📂 Loading tools...');
    const tools = JSON.parse(fs.readFileSync(IN_PATH, 'utf-8'));
    console.log(`📊 Total tools: ${tools.length}`);

    // Filter to only tools that need fixing AND have myaihub URLs
    const toolsToFix = tools.filter(t => needsFixing(t) && hasMyAIHubUrl(t));

    console.log(`\n🔧 Need fixing (with myaihub URL): ${toolsToFix.length}`);

    if (toolsToFix.length === 0) {
        console.log('\n✅ No myaihub tools need fixing!');
        return;
    }

    // Create backup
    console.log(`💾 Creating backup...`);
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(tools, null, 2));

    // Launch browser
    console.log('\n🌐 Launching browser...');
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const context = await browser.newContext({
        userAgent: USER_AGENT,
        viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    const stats = { fixed: 0, failed: 0 };
    const results = [];

    try {
        for (let i = 0; i < toolsToFix.length; i++) {
            const tool = toolsToFix[i];
            const name = (tool.name || 'Unknown').substring(0, 40);

            console.log(`\n[${i + 1}/${toolsToFix.length}] 🔧 ${name}...`);

            try {
                const logo = await scrapeMyAIHubLogo(tool.directory_url, page);

                if (logo) {
                    tool.logo = logo;
                    tool.icon = logo;
                    tool.logo_source = 'aihub_v2';
                    tool.logo_updated = new Date().toISOString().split('T')[0];

                    console.log(`   ✅ Fixed: ${logo.substring(0, 50)}...`);
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

            // Progress
            if ((i + 1) % 20 === 0) {
                console.log(`\n📈 Progress: ${i + 1}/${toolsToFix.length} | Fixed: ${stats.fixed} | Failed: ${stats.failed}`);
                // Save intermediate results
                fs.writeFileSync(OUT_PATH, JSON.stringify(tools, null, 2));
            }
        }
    } finally {
        await page.close();
        await context.close();
        await browser.close();
    }

    // Save final
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
        failed_tools: results.filter(r => r.status === 'failed').slice(0, 50)
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
