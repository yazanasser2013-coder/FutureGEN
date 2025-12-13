/**
 * GOOGLE IMAGE LOGO FIXER
 * 
 * Uses SerpAPI Google Image Search to find logos for tools with fallback logos.
 * This is a fallback approach for tools that can't be scraped from directory pages.
 * 
 * Run: node scrapers/google_image_fixer.js [--sample N]
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// ================= CONFIGURATION =================
const IN_PATH = path.join(__dirname, 'tools.json');
const OUT_PATH = path.join(__dirname, 'tools.json');
const BACKUP_PATH = path.join(__dirname, `tools_BACKUP_${Date.now()}.json`);
const REPORT_PATH = path.join(__dirname, 'google_image_fix_report.json');

const SERP_API_KEY = "c5457eb8e7f4c100340edd82086dc64b975d333008db10cc4369ad06e1c90e3e";
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const MIN_FILE_SIZE = 200;

// ================= HELPERS =================

function needsFixing(tool) {
    return tool.logo_source === 'svg_fallback';
}

async function validateLogoUrl(url) {
    try {
        if (!url || !url.startsWith('http')) return false;
        if (url.includes('placeholder') || url.includes('1x1')) return false;

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

// ================= GOOGLE IMAGE SEARCH =================

async function searchGoogleImages(toolName) {
    try {
        if (!toolName || !SERP_API_KEY) return null;

        // Clean up tool name - remove hashtags and extra info
        const cleanName = toolName.replace(/#[^\s]+/g, '').replace(/[^\w\s-]/g, '').trim();

        const queries = [
            `"${cleanName}" logo official`,
            `"${cleanName}" logo icon`,
            `${cleanName} app logo`
        ];

        for (const query of queries) {
            try {
                const response = await axios.get('https://serpapi.com/search', {
                    params: {
                        engine: 'google_images',
                        q: query,
                        api_key: SERP_API_KEY,
                        num: 15,
                        safe: 'active'
                    },
                    timeout: 15000
                });

                const images = response.data.images_results || [];

                for (const img of images.slice(0, 8)) {
                    const imgUrl = img.original || img.thumbnail;
                    if (!imgUrl) continue;

                    // Score and validate
                    const urlLower = imgUrl.toLowerCase();

                    // Skip obvious non-logos
                    if (urlLower.includes('screenshot')) continue;
                    if (urlLower.includes('banner')) continue;
                    if (urlLower.includes('profile')) continue;

                    // Prefer logos/icons
                    let score = 0;
                    if (urlLower.includes('logo')) score += 30;
                    if (urlLower.includes('icon')) score += 20;
                    if (urlLower.endsWith('.png')) score += 10;
                    if (urlLower.endsWith('.svg')) score += 15;

                    if (score > 0 && await validateLogoUrl(imgUrl)) {
                        return imgUrl;
                    }
                }
            } catch (e) {
                await new Promise(r => setTimeout(r, 500)); // Rate limit
                continue;
            }
        }

        return null;
    } catch (e) {
        return null;
    }
}

// ================= MAIN =================

async function main() {
    const args = process.argv.slice(2);
    let sampleSize = null;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--sample' && args[i + 1]) {
            sampleSize = parseInt(args[i + 1]);
        }
    }

    console.log('='.repeat(70));
    console.log('🔍 GOOGLE IMAGE LOGO FIXER');
    console.log('='.repeat(70));

    // Load tools
    console.log('\n📂 Loading tools...');
    const tools = JSON.parse(fs.readFileSync(IN_PATH, 'utf-8'));
    console.log(`📊 Total tools: ${tools.length}`);

    // Filter to tools that need fixing
    let toolsToFix = tools.filter(needsFixing);

    if (sampleSize) {
        toolsToFix = toolsToFix.slice(0, sampleSize);
    }

    console.log(`\n🔧 Need fixing: ${toolsToFix.length}`);

    if (toolsToFix.length === 0) {
        console.log('\n✅ No tools need fixing!');
        return;
    }

    // Create backup
    console.log(`💾 Creating backup: ${path.basename(BACKUP_PATH)}`);
    fs.writeFileSync(BACKUP_PATH, JSON.stringify(tools, null, 2));

    const stats = { fixed: 0, failed: 0 };
    const results = [];

    for (let i = 0; i < toolsToFix.length; i++) {
        const tool = toolsToFix[i];
        const name = tool.name || 'Unknown';

        console.log(`\n[${i + 1}/${toolsToFix.length}] 🔍 ${name.substring(0, 40)}...`);

        try {
            const logo = await searchGoogleImages(name);

            if (logo) {
                tool.logo = logo;
                tool.icon = logo;
                tool.logo_source = 'google_image_search';
                tool.logo_updated = new Date().toISOString().split('T')[0];

                console.log(`   ✅ Fixed: ${logo.substring(0, 55)}...`);
                stats.fixed++;
                results.push({ name: name.substring(0, 50), status: 'fixed', logo: logo.substring(0, 80) });
            } else {
                console.log(`   ❌ No logo found`);
                stats.failed++;
                results.push({ name: name.substring(0, 50), status: 'failed' });
            }
        } catch (e) {
            console.log(`   ❌ Error: ${e.message}`);
            stats.failed++;
            results.push({ name: name.substring(0, 50), status: 'failed' });
        }

        // Rate limiting - 1 second between requests
        await new Promise(r => setTimeout(r, 1000));

        if ((i + 1) % 10 === 0) {
            console.log(`\n📈 Progress: ${i + 1}/${toolsToFix.length} | Fixed: ${stats.fixed} | Failed: ${stats.failed}`);
        }
    }

    // Save
    console.log('\n💾 Saving updated tools...');
    fs.writeFileSync(OUT_PATH, JSON.stringify(tools, null, 2));

    // Report
    const report = {
        timestamp: new Date().toISOString(),
        total_tools: tools.length,
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
