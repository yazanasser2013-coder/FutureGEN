/**
 * MYAIHUB LOGO FIXER
 * 
 * Fixes logos for tools from the 'aihub' source that have fallback logos.
 * These tools have directory URLs like: https://www.myaihub.ai/tools/xxx
 * 
 * The myaihub.ai pages contain the real logo URL in embedded JSON data:
 * "logo":"https://ph-files.imgix.net/xxx.gif?auto=format"
 * 
 * Run: node scrapers/myaihub_logo_fixer.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { chromium } = require('playwright');

// ================= CONFIGURATION =================
const IN_PATH = path.join(__dirname, 'tools.json');
const OUT_PATH = path.join(__dirname, 'tools.json');
const BACKUP_PATH = path.join(__dirname, `tools_BACKUP_${Date.now()}.json`);
const REPORT_PATH = path.join(__dirname, 'myaihub_fix_report.json');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MIN_FILE_SIZE = 200;

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
            maxRedirects: 5,
            validateStatus: (status) => status === 200
        });
        return response.data.length >= MIN_FILE_SIZE;
    } catch (e) {
        return false;
    }
}

// ================= MYAIHUB SCRAPER =================

async function scrapeMyAIHubPage(directoryUrl, page, toolName) {
    try {
        await page.goto(directoryUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        await page.waitForTimeout(2000);

        // Get all the script content at once
        const allScripts = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script');
            let combined = '';
            for (const script of scripts) {
                combined += (script.textContent || '') + '\n';
            }
            return combined;
        });

        // Strategy 1: ProductHunt hosted logos (most reliable for real tool logos)
        const phMatch = allScripts.match(/"logo"\s*:\s*"(https:\/\/ph-files\.imgix\.net\/[^"]+)"/);
        if (phMatch && phMatch[1]) {
            const url = phMatch[1].replace(/\\u0026/g, '&');
            if (await validateLogoUrl(url)) {
                return { url, source: 'producthunt' };
            }
        }

        // Strategy 2: Other image hosting logos in JSON (imgur, cloudinary, etc)
        const imgPatterns = [
            /"logo"\s*:\s*"(https:\/\/(?:i\.)?imgur\.com\/[^"]+\.(png|jpg|jpeg|gif|webp))"/i,
            /"logo"\s*:\s*"(https:\/\/res\.cloudinary\.com\/[^"]+)"/i,
            /"logo"\s*:\s*"(https:\/\/cdn[^"]*\/[^"]+\.(png|jpg|jpeg|gif|webp|svg))"/i,
            /"logo"\s*:\s*"(https:\/\/[^"]*storage[^"]*\/[^"]+\.(png|jpg|jpeg|gif|webp|svg))"/i,
            /"logo"\s*:\s*"(https:\/\/[^"]+\.(png|jpg|jpeg|gif|webp))"/i
        ];

        for (const pattern of imgPatterns) {
            const match = allScripts.match(pattern);
            if (match && match[1]) {
                const url = match[1].replace(/\\u0026/g, '&');
                // Skip myaihub URLs
                if (!url.includes('myaihub')) {
                    if (await validateLogoUrl(url)) {
                        return { url, source: 'json_logo' };
                    }
                }
            }
        }

        // Strategy 3: Look for image URL in JSON (not specifically labeled logo)
        const imgMatch = allScripts.match(/"image"\s*:\s*"(https:\/\/(?!.*myaihub)[^"]+\.(png|jpg|jpeg|gif|webp))"/i);
        if (imgMatch && imgMatch[1]) {
            const url = imgMatch[1].replace(/\\u0026/g, '&');
            if (await validateLogoUrl(url)) {
                return { url, source: 'json_image' };
            }
        }

        // Strategy 4: Look for tool-specific images on page (NOT myaihub logos)
        const logoFromPage = await page.evaluate(() => {
            // Look specifically for images in the tool detail area
            const selectors = [
                '.tool-detail img',
                '.product-logo img',
                '[data-tool] img',
                '.card-header img'
            ];

            for (const selector of selectors) {
                const imgs = document.querySelectorAll(selector);
                for (const img of imgs) {
                    const src = img.src || img.getAttribute('data-src');
                    if (src &&
                        src.startsWith('http') &&
                        !src.includes('myaihub.ai') &&  // Skip ALL myaihub URLs
                        !src.includes('avatar') &&
                        !src.includes('placeholder')) {
                        if (img.naturalWidth >= 32 && img.naturalWidth <= 512) {
                            return src;
                        }
                    }
                }
            }
            return null;
        });

        if (logoFromPage && await validateLogoUrl(logoFromPage)) {
            return { url: logoFromPage, source: 'page_image' };
        }

        return null;
    } catch (e) {
        return null;
    }
}

// ================= MAIN =================

async function main() {
    console.log('='.repeat(70));
    console.log('🚀 MYAIHUB LOGO FIXER');
    console.log('='.repeat(70));

    // Load tools
    console.log('\n📂 Loading tools...');
    const tools = JSON.parse(fs.readFileSync(IN_PATH, 'utf-8'));
    console.log(`📊 Total tools: ${tools.length}`);

    // Filter to only aihub tools that need fixing
    const toolsToFix = tools.filter(t => needsFixing(t) && hasMyAIHubUrl(t));
    const toolsNoUrl = tools.filter(t => needsFixing(t) && !hasMyAIHubUrl(t));

    console.log(`\n🔧 Need fixing (with myaihub URL): ${toolsToFix.length}`);
    console.log(`⚠️  Need fixing (no valid URL - skipped): ${toolsNoUrl.length}`);

    if (toolsToFix.length === 0) {
        console.log('\n✅ No tools with myaihub URLs need fixing!');
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

            console.log(`\n[${i + 1}/${toolsToFix.length}] 🔧 ${name.substring(0, 45)}...`);

            try {
                const result = await scrapeMyAIHubPage(tool.directory_url, page, name);

                if (result && result.url) {
                    tool.logo = result.url;
                    tool.icon = result.url;
                    tool.logo_source = `myaihub_${result.source}`;
                    tool.logo_updated = new Date().toISOString().split('T')[0];

                    console.log(`   ✅ Fixed (${result.source}): ${result.url.substring(0, 50)}...`);
                    stats.fixed++;
                    results.push({ name, status: 'fixed', logo: result.url.substring(0, 80), source: result.source });
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

            // Progress update every 20 tools
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
