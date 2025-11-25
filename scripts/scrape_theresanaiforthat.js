// scrape_theresanaiforthat.js
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Enhanced Configuration
const CONFIG = {
    BASE_URL: 'https://theresanaiforthat.com',
    OUTPUT_FILE: './scraped_data/theresanaiforthat_tools.json',
    CONCURRENCY: 2,
    VISIT_DELAY_MS: 5000,
    INTERVAL_HOURS: 1,
    TIMEOUT: 100000,
    MAX_PAGES: 50,
    RANDOM_SHUFFLE: true,
    MAX_TOOLS_VARIANCE: 100
};

// Ensure directory exists
fs.ensureDirSync('./data');

// Enhanced shuffle function for true randomness
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const randomBytes = crypto.randomBytes(4);
        const j = randomBytes.readUInt32BE(0) % (i + 1);
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Fixed: Create unique seed for each run without BigInt mixing
function createRandomSeed() {
    return Date.now() + Math.random() + Number(process.hrtime.bigint() % 1000000n);
}

// Generate unique ID for tools
function generateUniqueId() {
    return crypto.randomBytes(8).toString('hex');
}

async function openBrowser() {
    return puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        timeout: 60000
    });
}

async function fetchAllToolLinks(page) {
    console.log('🔍 Searching for tool pages...');

    const tools = new Set();
    let pageNum = 1;
    let hasNextPage = true;
    let retryCount = 0;
    const maxRetries = 3;

    // Random starting point for variety
    const randomStart = Math.floor(Math.random() * 3) + 1;
    pageNum = randomStart;
    console.log(`🎲 Starting from page ${randomStart} for variety`);

    while (hasNextPage && pageNum <= CONFIG.MAX_PAGES) {
        try {
            const url = pageNum === 1 ? CONFIG.BASE_URL : `${CONFIG.BASE_URL}/page/${pageNum}/`;
            console.log(`📄 Scanning page ${pageNum}: ${url}`);

            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: CONFIG.TIMEOUT
            });

            // Wait for content to load with different selectors for variety
            const selectors = [
                'a[href*="/ai/"]',
                '.tool-card a',
                '.product-card a',
                '[class*="tool"] a'
            ];

            let foundElements = false;
            for (const selector of selectors) {
                try {
                    await page.waitForSelector(selector, { timeout: 5000 });
                    foundElements = true;
                    break;
                } catch (e) {
                    continue;
                }
            }

            if (!foundElements) {
                console.log('⚠️ No tool links found on this page with common selectors');
            }

            const pageTools = await page.evaluate((baseUrl) => {
                const tools = new Set();

                // Try multiple selector strategies
                const selectors = [
                    'a[href*="/ai/"]',
                    '.tool-card a',
                    '.product-card a',
                    '.app-card a',
                    '[class*="tool"] a',
                    '[class*="product"] a'
                ];

                let allLinks = [];
                selectors.forEach(selector => {
                    const links = Array.from(document.querySelectorAll(selector));
                    allLinks = [...allLinks, ...links];
                });

                // Remove duplicates
                const uniqueLinks = Array.from(new Set(allLinks.map(link => link.href)))
                    .filter(href => href && href.includes('/ai/') && !href.includes('/ai-categories/'));

                console.log(`Found ${uniqueLinks.length} unique tool links`);

                uniqueLinks.forEach(href => {
                    // Clean the URL and ensure it's absolute
                    let cleanUrl = href.split('?')[0];
                    if (!cleanUrl.startsWith('http')) {
                        cleanUrl = baseUrl + cleanUrl;
                    }
                    tools.add(cleanUrl);
                });

                return Array.from(tools);
            }, CONFIG.BASE_URL);

            pageTools.forEach(tool => tools.add(tool));
            console.log(`✅ Page ${pageNum}: Found ${pageTools.length} tools`);

            // Check for next page with multiple strategies
            hasNextPage = await page.evaluate(() => {
                const nextSelectors = [
                    'a.next',
                    'a[rel="next"]',
                    '.pagination .next',
                    '.next-page',
                    '[aria-label*="next"]',
                    '.pagination a:last-child'
                ];

                for (const selector of nextSelectors) {
                    const nextBtn = document.querySelector(selector);
                    if (nextBtn && !nextBtn.disabled && nextBtn.href) {
                        return true;
                    }
                }
                return false;
            });

            if (!hasNextPage) {
                console.log('⏹️ No more pages found');
            }

            pageNum++;
            retryCount = 0;

            // Random delay between pages (1-3 seconds)
            const randomDelay = Math.floor(Math.random() * 2000) + 1000;
            await delay(randomDelay);

        } catch (err) {
            console.warn(`❌ Failed to scan page ${pageNum}:`, err.message);
            retryCount++;

            if (retryCount >= maxRetries) {
                console.log(`🛑 Max retries reached for page ${pageNum}, moving on...`);
                hasNextPage = false;
            } else {
                console.log(`🔄 Retrying page ${pageNum} (attempt ${retryCount + 1})...`);
                await delay(3000);
            }
        }
    }

    console.log(`🎯 Total unique tools found: ${tools.size}`);

    // Convert to array and shuffle for true randomness
    const toolsArray = Array.from(tools);
    const shuffledTools = CONFIG.RANDOM_SHUFFLE ? shuffleArray(toolsArray) : toolsArray;

    console.log(`🔀 Shuffled ${shuffledTools.length} tools randomly`);
    return shuffledTools;
}

async function extractToolDetails(page, url) {
    console.log(`🔍 Extracting details from: ${url}`);

    let retryCount = 0;
    const maxRetries = 2;

    while (retryCount < maxRetries) {
        try {
            // Random delay before visiting page
            await delay(Math.floor(Math.random() * 1000) + 500);

            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: CONFIG.TIMEOUT
            });

            // Wait for key elements with multiple strategies
            const contentSelectors = [
                'h1',
                '.tool-title',
                '.product-title',
                '[class*="tool"]',
                '[class*="product"]',
                'main',
                '.content'
            ];

            let contentFound = false;
            for (const selector of contentSelectors) {
                try {
                    await page.waitForSelector(selector, { timeout: 3000 });
                    contentFound = true;
                    break;
                } catch (e) {
                    continue;
                }
            }

            if (!contentFound) {
                console.log('⚠️ No main content found with standard selectors, trying fallback...');
            }

            const toolData = await page.evaluate((url) => {
                const getText = (selector) => {
                    const elements = Array.from(document.querySelectorAll(selector));
                    for (const el of elements) {
                        if (el.textContent && el.textContent.trim()) {
                            return el.textContent.trim().replace(/\s+/g, ' ');
                        }
                    }
                    return null;
                };

                const getAttr = (selector, attr) => {
                    const elements = Array.from(document.querySelectorAll(selector));
                    for (const el of elements) {
                        const value = el.getAttribute(attr);
                        if (value) return value;
                    }
                    return null;
                };

                // Enhanced name extraction with multiple strategies
                const nameSelectors = [
                    'h1',
                    '.tool-title',
                    '.product-title',
                    '.app-title',
                    '[class*="title"]',
                    'title'
                ];

                let name = null;
                for (const selector of nameSelectors) {
                    name = getText(selector);
                    if (name && name !== 'Unknown Tool' && !name.includes('There\'s An AI For That')) {
                        break;
                    }
                }

                if (!name) {
                    const title = getText('title');
                    if (title) {
                        name = title
                            .replace(' - There\'s An AI For That', '')
                            .replace(' | There\'s An AI For That', '')
                            .replace('There\'s An AI For That - ', '');
                    } else {
                        name = 'Unknown Tool';
                    }
                }

                // Enhanced description extraction
                const description = getAttr('meta[property="og:description"]', 'content') ||
                    getAttr('meta[name="description"]', 'content') ||
                    getText('.tool-description') ||
                    getText('.product-description') ||
                    getText('.app-description') ||
                    getText('.description') ||
                    getText('[class*="description"]');

                // Enhanced image extraction
                const image = getAttr('meta[property="og:image"]', 'content') ||
                    getAttr('.tool-logo img', 'src') ||
                    getAttr('.product-logo img', 'src') ||
                    getAttr('.app-logo img', 'src') ||
                    getAttr('[class*="logo"] img', 'src') ||
                    getAttr('img[alt*="logo"]', 'src');

                // Enhanced category extraction
                const categorySelectors = [
                    '.category',
                    '.tool-category',
                    '.product-category',
                    '.app-category',
                    '.breadcrumb a:nth-last-child(2)',
                    '[class*="category"]',
                    '.tags a'
                ];

                let category = 'Uncategorized';
                for (const selector of categorySelectors) {
                    const categoryText = getText(selector);
                    if (categoryText && categoryText.length < 50) {
                        category = categoryText;
                        break;
                    }
                }

                // Enhanced pricing detection
                let pricing = 'Unknown';
                const pricingSelectors = [
                    '.pricing',
                    '.price',
                    '.tool-pricing',
                    '.product-pricing',
                    '.app-pricing',
                    '[class*="pricing"]',
                    '[class*="price"]'
                ];

                for (const selector of pricingSelectors) {
                    const pricingText = getText(selector);
                    if (pricingText) {
                        const lowerText = pricingText.toLowerCase();
                        if (lowerText.includes('free') && !lowerText.includes('freemium')) {
                            pricing = 'Free';
                            break;
                        } else if (lowerText.includes('freemium')) {
                            pricing = 'Freemium';
                            break;
                        } else if (lowerText.includes('paid') || lowerText.includes('$') ||
                            lowerText.includes('€') || lowerText.includes('£')) {
                            pricing = 'Paid';
                            break;
                        }
                    }
                }

                // Enhanced tag extraction
                const tagSelectors = [
                    '.tag',
                    '.tool-tag',
                    '.category-tag',
                    '.app-tag',
                    '[class*="tag"]',
                    '.keywords span'
                ];

                const tags = new Set();
                tagSelectors.forEach(selector => {
                    const elements = Array.from(document.querySelectorAll(selector));
                    elements.forEach(el => {
                        const text = el.textContent.trim();
                        if (text && text.length < 30) {
                            tags.add(text);
                        }
                    });
                });

                // Enhanced website detection
                let officialUrl = null;
                const websiteLinks = Array.from(document.querySelectorAll('a[href*="http"]'));

                const websiteKeywords = ['website', 'visit', 'official', 'get started', 'try now', 'launch'];
                const socialDomains = ['twitter.com', 'facebook.com', 'linkedin.com', 'instagram.com', 'youtube.com'];

                for (const link of websiteLinks) {
                    const href = link.href;
                    const text = link.textContent.toLowerCase();

                    if (websiteKeywords.some(keyword => text.includes(keyword)) &&
                        !socialDomains.some(domain => href.includes(domain)) &&
                        !href.includes('theresanaiforthat.com')) {
                        officialUrl = href;
                        break;
                    }
                }

                // Fallback: first non-social external link
                if (!officialUrl) {
                    for (const link of websiteLinks) {
                        const href = link.href;
                        if (!href.includes('theresanaiforoughat.com') &&
                            !socialDomains.some(domain => href.includes(domain)) &&
                            (href.startsWith('https://') || href.startsWith('http://'))) {
                            officialUrl = href;
                            break;
                        }
                    }
                }

                return {
                    name: name || 'Unknown Tool',
                    description: description || 'No description available',
                    url: officialUrl || url,
                    category: category,
                    pricing: pricing,
                    logo: image,
                    tags: Array.from(tags).slice(0, 10),
                    source_url: url,
                    scraped_at: new Date().toISOString()
                };

            }, url);

            if (toolData && toolData.name !== 'Unknown Tool') {
                // Add unique ID
                toolData.unique_id = generateUniqueId();

                // Translate description
                try {
                    const { translate } = await import('@vitalets/google-translate-api');
                    if (toolData.description) {
                        const { text } = await translate(toolData.description, { to: 'ar' });
                        toolData.description_ar = text;
                    }
                } catch (e) {
                    console.warn(`Translation failed for ${toolData.name}:`, e.message);
                }

                console.log(`✅ Extracted: ${toolData.name}`);
                return toolData;
            } else {
                throw new Error('Failed to extract meaningful tool data');
            }

        } catch (err) {
            console.warn(`❌ Attempt ${retryCount + 1} failed for ${url}:`, err.message);
            retryCount++;
            if (retryCount < maxRetries) {
                const retryDelay = Math.floor(Math.random() * 2000) + 1000;
                await delay(retryDelay);
            }
        }
    }

    console.warn(`💥 Failed to extract from ${url} after ${maxRetries} attempts`);
    return null;
}

async function scrapeAllTools() {
    console.log(`🎲 Starting scraping with random seed: ${createRandomSeed()}`);

    let browser;
    try {
        browser = await openBrowser();
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.setViewport({ width: 1366, height: 768 });

        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const resourceType = req.resourceType();
            if (resourceType === 'image' || resourceType === 'font' || resourceType === 'media') {
                req.abort();
            } else {
                req.continue();
            }
        });

        console.log('🚀 Starting enhanced tool discovery...');
        const toolLinks = await fetchAllToolLinks(page);

        if (toolLinks.length === 0) {
            console.log('❌ No tools found.');
            const emptyData = [];
            await fs.writeJson(CONFIG.OUTPUT_FILE, emptyData, { spaces: 2 });
            await fs.writeJson('./scraped_data/tools_simplified.json', emptyData, { spaces: 2 });
            return emptyData;
        }

        console.log(`🔄 Starting extraction of ${toolLinks.length} tools with randomization...`);
        const results = [];

        // Shuffle links again before processing for extra randomness
        const shuffledLinks = shuffleArray([...toolLinks]);

        // Different number of tools each time for variety
        const maxTools = Math.min(
            shuffledLinks.length,
            Math.floor(Math.random() * CONFIG.MAX_TOOLS_VARIANCE) + 30
        );
        const linksToProcess = shuffledLinks.slice(0, maxTools);

        console.log(`🎯 Processing ${linksToProcess.length} random tools out of ${shuffledLinks.length} total`);

        let processed = 0;
        for (const link of linksToProcess) {
            try {
                const workerPage = await browser.newPage();
                await workerPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

                const toolData = await extractToolDetails(workerPage, link);

                if (toolData) {
                    results.push(toolData);
                    console.log(`✅ [${++processed}/${linksToProcess.length}] Processed: ${toolData.name}`);
                }

                await workerPage.close();

                // Random delay between tool processing
                const randomDelay = Math.floor(Math.random() * 1500) + 1000;
                await delay(randomDelay);

            } catch (err) {
                console.warn(`❌ Failed to process ${link}:`, err.message);
            }
        }

        // Final shuffle of results
        const finalResults = CONFIG.RANDOM_SHUFFLE ? shuffleArray(results) : results;

        console.log(`💾 Saving ${finalResults.length} tools to ${CONFIG.OUTPUT_FILE}`);
        await fs.writeJson(CONFIG.OUTPUT_FILE, finalResults, { spaces: 2 });

        const simplifiedTools = finalResults.map(tool => ({
            name: tool.name,
            url: tool.url,
            category: tool.category,
            description: tool.description,
            pricing: tool.pricing,
            logo: tool.logo,
            tags: tool.tags,
            unique_id: tool.unique_id
        }));

        await fs.writeJson('./scraped_data/tools_simplified.json', simplifiedTools, { spaces: 2 });

        console.log(`🎉 Successfully scraped ${finalResults.length} AI tools with true randomization!`);
        return finalResults;

    } catch (err) {
        console.error('💥 Scraping failed:', err);
        const emptyData = [];
        await fs.writeJson(CONFIG.OUTPUT_FILE, emptyData, { spaces: 2 }).catch(() => { });
        await fs.writeJson('./scraped_data/tools_simplified.json', emptyData, { spaces: 2 }).catch(() => { });
        return emptyData;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function integrateWithWebsite() {
    console.log('🔗 Integrating with website data...');

    try {
        // Check if scraped data exists
        if (!await fs.pathExists('./scraped_data/tools_simplified.json')) {
            console.log('❌ No scraped data found. Creating empty dataset.');
            await createEmptyDataset();
            return;
        }

        const scrapedTools = await fs.readJson('./scraped_data/tools_simplified.json');

        if (scrapedTools.length === 0) {
            console.log('⚠️ No tools found in scraped data. Using empty dataset.');
            await createEmptyDataset();
            return;
        }

        const CATEGORY_MAPPING = {
            'Copywriting': { ar: 'كتابة النصوص', icon: 'bi bi-file-earmark-text' },
            'Generative Art': { ar: 'الفن التوليدي', icon: 'bi bi-palette' },
            'Generative Video': { ar: 'توليد الفيديو', icon: 'bi bi-camera-video' },
            'Music': { ar: 'الموسيقى', icon: 'bi bi-music-note' },
            'Generative Code': { ar: 'توليد الكود', icon: 'bi bi-code-slash' },
            'Productivity': { ar: 'الإنتاجية', icon: 'bi bi-graph-up' },
            'Marketing': { ar: 'التسويق', icon: 'bi bi-megaphone' },
            'Text-To-Speech': { ar: 'تحويل النص إلى كلام', icon: 'bi bi-volume-up' },
            'Voice Modulation': { ar: 'تعديل الصوت', icon: 'bi bi-mic' },
            'Chat': { ar: 'المحادثة', icon: 'bi bi-chat-dots' },
            'Video Editing': { ar: 'تعديل الفيديو', icon: 'bi bi-scissors' },
            'AI Detection': { ar: 'كشف الذكاء الاصطناعي', icon: 'bi bi-search' },
            'Uncategorized': { ar: 'غير مصنف', icon: 'bi bi-star' }
        };

        let websiteData;

        try {
            websiteData = await fs.readJson('./ai_tools_data.json');
        } catch (err) {
            console.log('📝 Creating new website data file...');
            websiteData = { tools: [], categories: [] };
        }

        const existingToolNames = new Set(websiteData.tools.map(tool => tool.name));
        let newToolsCount = 0;
        let updatedToolsCount = 0;

        const mergedTools = [...websiteData.tools];

        for (const scrapedTool of scrapedTools) {
            const existingIndex = mergedTools.findIndex(tool => tool.name === scrapedTool.name);

            if (existingIndex >= 0) {
                // Update existing tool but preserve Arabic description and featured status
                mergedTools[existingIndex] = {
                    ...mergedTools[existingIndex],
                    ...scrapedTool,
                    description_ar: mergedTools[existingIndex].description_ar,
                    featured: mergedTools[existingIndex].featured,
                    unique_id: mergedTools[existingIndex].unique_id || scrapedTool.unique_id
                };
                updatedToolsCount++;
            } else {
                // Add new tool with unique ID
                const newTool = {
                    ...scrapedTool,
                    description_ar: null,
                    featured: false,
                    icon: CATEGORY_MAPPING[scrapedTool.category] ? CATEGORY_MAPPING[scrapedTool.category].icon : 'bi bi-star',
                    unique_id: scrapedTool.unique_id || generateUniqueId()
                };
                mergedTools.push(newTool);
                newToolsCount++;
            }
        }

        // Shuffle merged tools for variety in display
        const shuffledMergedTools = shuffleArray(mergedTools);

        const categoryCount = {};
        shuffledMergedTools.forEach(tool => {
            categoryCount[tool.category] = (categoryCount[tool.category] || 0) + 1;
        });

        const categories = Object.entries(categoryCount).map(([categoryEn, count]) => {
            const categoryInfo = CATEGORY_MAPPING[categoryEn] || CATEGORY_MAPPING['Uncategorized'];
            return {
                name: categoryEn,
                name_ar: categoryInfo.ar,
                icon: categoryInfo.icon,
                tool_count: count
            };
        }).sort((a, b) => b.tool_count - a.tool_count);

        const finalData = {
            tools: shuffledMergedTools,
            categories: categories,
            last_updated: new Date().toISOString(),
            stats: {
                total_tools: shuffledMergedTools.length,
                total_categories: categories.length,
                new_tools: newToolsCount,
                updated_tools: updatedToolsCount,
                random_seed: createRandomSeed()
            }
        };

        await fs.writeJson('./ai_tools_data.json', finalData, { spaces: 2 });

        console.log('✅ Integration completed!');
        console.log(`📈 Total tools: ${shuffledMergedTools.length}`);
        console.log(`🆕 New tools: ${newToolsCount}`);
        console.log(`🔄 Updated tools: ${updatedToolsCount}`);
        console.log(`🎲 Tools shuffled for display variety`);

        return finalData;

    } catch (err) {
        console.error('❌ Integration failed:', err);
        await createEmptyDataset();
        throw err;
    }
}

async function createEmptyDataset() {
    const emptyData = {
        tools: [],
        categories: [],
        last_updated: new Date().toISOString(),
        stats: {
            total_tools: 0,
            total_categories: 0,
            new_tools: 0,
            updated_tools: 0,
            random_seed: createRandomSeed()
        }
    };

    await fs.writeJson('./ai_tools_data.json', emptyData, { spaces: 2 });
    console.log('📁 Created empty dataset as fallback');
    return emptyData;
}

async function compareWithPrevious() {
    try {
        const previousData = await fs.readJson(CONFIG.OUTPUT_FILE).catch(() => []);
        const newData = await scrapeAllTools();

        const previousCount = previousData.length;
        const newCount = newData.length;

        console.log(`📊 Comparison: ${previousCount} → ${newCount} tools`);

        if (newCount > previousCount) {
            console.log(`🆕 Found ${newCount - previousCount} new tools!`);
        } else if (newCount < previousCount) {
            console.log(`🗑️  ${previousCount - newCount} tools were removed`);
        } else {
            console.log('📈 Tool count unchanged');
        }

        return newData;
    } catch (err) {
        console.error('Comparison failed:', err);
        return await scrapeAllTools();
    }
}

async function runScrapingCycle() {
    const timestamp = new Date().toISOString();
    console.log(`\n🔄 Starting scraping cycle at ${timestamp}`);

    try {
        const results = await scrapeAllTools(); // Run scraping directly
        await integrateWithWebsite();
        console.log(`✅ Scraping cycle completed at ${new Date().toISOString()}`);
        console.log(`📈 Total tools in database: ${results.length}`);
        return results;
    } catch (err) {
        console.error(`❌ Scraping cycle failed:`, err);
        return [];
    }
}

async function runScheduledScraping() {
    console.log(`⏰ Starting scheduled scraping - running every ${CONFIG.INTERVAL_HOURS} hour(s)`);

    await runScrapingCycle();

    setInterval(async () => {
        await runScrapingCycle();
    }, CONFIG.INTERVAL_HOURS * 60 * 60 * 1000);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Run when executed directly
if (require.main === module) {
    (async () => {
        try {
            if (process.argv.includes('--once')) {
                console.log('🚀 Running single scraping session...');
                await scrapeAllTools();
                await integrateWithWebsite();
                console.log('✅ Single scraping session completed!');
            } else if (process.argv.includes('--integrate')) {
                console.log('🔗 Running integration only...');
                await integrateWithWebsite();
                console.log('✅ Integration completed!');
            } else if (process.argv.includes('--scrape-only')) {
                console.log('🎯 Running scraping only...');
                await scrapeAllTools();
                console.log('✅ Scraping completed!');
            } else if (process.argv.includes('--shuffle-only')) {
                console.log('🔀 Shuffling existing data...');
                await integrateWithWebsite();
                console.log('✅ Shuffling completed!');
            } else if (process.argv.includes('--enrich-only')) {
                console.log('✨ Enriching existing tools...');
                await enrichExistingTools();
                console.log('✅ Enrichment completed!');
            } else {
                console.log('🚀 Starting scraping session...');
                await scrapeAllTools();
                await integrateWithWebsite();
                console.log('✅ Scraping session completed!');
            }
        } catch (err) {
            console.error('💥 Script failed:', err);
            process.exit(1);
        }
    })();
}

async function enrichExistingTools() {
    const { translate } = await import('@vitalets/google-translate-api');
    const fetch = (await import('node-fetch')).default;
    const cheerio = require('cheerio');

    console.log('Reading existing tools...');
    const tools = await fs.readJson(CONFIG.OUTPUT_FILE);
    const enrichedTools = [];

    // Process in batches
    const BATCH_SIZE = 5;
    for (let i = 0; i < tools.length; i += BATCH_SIZE) {
        const batch = tools.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(tools.length / BATCH_SIZE)}`);

        const results = await Promise.all(batch.map(async (tool) => {
            try {
                let changed = false;

                // Enrich URL and other details if missing or generic
                if (tool.source_url && (!tool.url || tool.url.includes('theresanaiforthat.com'))) {
                    try {
                        const response = await fetch(tool.source_url, {
                            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
                        });
                        const html = await response.text();
                        const $ = cheerio.load(html);

                        const realUrl = $('a.tool_link_a').attr('href') ||
                            $('a:contains("Use tool")').attr('href') ||
                            $('a[href^="http"]:not([href*="theresanaiforthat.com"])').first().attr('href');

                        if (realUrl) {
                            tool.url = realUrl;
                            changed = true;
                        }

                        // Category
                        const category = $('.breadcrumb a').last().text() ||
                            $('.tool_cats a').first().text();
                        if (category && (!tool.category || tool.category === 'Uncategorized')) {
                            tool.category = category.trim();
                            changed = true;
                        }

                        // Pricing
                        const pricingText = $('body').text();
                        if (!tool.pricing || tool.pricing === 'Unknown') {
                            if (pricingText.includes('Free')) tool.pricing = 'Free';
                            else if (pricingText.includes('Freemium')) tool.pricing = 'Freemium';
                            else if (pricingText.includes('Paid')) tool.pricing = 'Paid';
                            changed = true;
                        }

                        // Tags
                        const tags = [];
                        $('.tool_tags a, .related_topics a').each((i, el) => {
                            tags.push($(el).text().trim());
                        });
                        if (tags.length > 0 && (!tool.tags || tool.tags.length === 0)) {
                            tool.tags = [...new Set(tags)];
                            changed = true;
                        }

                    } catch (e) {
                        console.warn(`Failed to scrape source for ${tool.name}: ${e.message}`);
                    }
                }

                // Translate Description
                if (tool.description && !tool.description_ar) {
                    try {
                        const { text } = await translate(tool.description, { to: 'ar' });
                        tool.description_ar = text;
                        changed = true;
                    } catch (e) {
                        console.warn(`Translation failed for ${tool.name}: ${e.message}`);
                    }
                }

                if (changed) console.log(`✅ Enriched: ${tool.name}`);
                return tool;

            } catch (err) {
                console.error(`Error enriching ${tool.name}:`, err);
                return tool;
            }
        }));

        enrichedTools.push(...results);

        // Save progress
        await fs.writeJson(CONFIG.OUTPUT_FILE, enrichedTools.concat(tools.slice(i + BATCH_SIZE)), { spaces: 2 });

        await delay(1000);
    }

    console.log('Enrichment complete.');
    return enrichedTools;
}

module.exports = {
    scrapeAllTools,
    runScheduledScraping,
    compareWithPrevious,
    integrateWithWebsite,
    shuffleArray,
    createRandomSeed,
    enrichExistingTools
};