// scrape_futuretools.js
// نسخة كاملة ومفصلة لجمع أدوات FutureTools.io من جميع الأقسام
// ملاحظة: هذا ملف بصيغة ES Module - package.json يجب أن يحتوي "type": "module"

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

// ----------------------- إعدادات الملف والمسارات -----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'futuretools_data_full.json');

// ----------------------- إعدادات التشغيل العامة -----------------------
const BASE_URL = 'https://www.futuretools.io/';
const HEADLESS = true;                   // تغيير إلى true للإنتاج
const TOOLS_PER_CATEGORY = 50;           // عدد الأدوات من كل قسم
const MAX_SCROLL_ITERATIONS = 15;        // تقليل التمريرات
const SCROLL_DELAY_MS = 1500;            // زيادة التأخير لضمان التحميل
const CATEGORY_PAGE_TIMEOUT = 30000;     // زيادة المهلة
const BROWSER_CLOSE_DELAY = 500;         // زيادة تأخير الإغلاق
const DELAY_BETWEEN_CATEGORIES = 2000;   // تأخير بين الأقسام

// ----------------------- دوال مساعدة -----------------------
async function sleep(ms) { 
    console.log(`⏳ انتظار ${ms}ms...`);
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

// دالة للتأكد من صحة URL
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

// ----------------------- إعدادات المتصفح -----------------------
function createBrowserConfig() {
    return {
        headless: HEADLESS,
        slowMo: HEADLESS ? 0 : 100,      // زيادة slowMo للاستقرار
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-blink-features=AutomationControlled',
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            '--window-size=1280,800'
        ]
    };
}

function createContextConfig() {
    return {
        viewport: { width: 1280, height: 800 },
        ignoreHTTPSErrors: true,
        javaScriptEnabled: true,
        acceptDownloads: false,
        bypassCSP: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
}

// ----------------------- أيقونات الفئات -----------------------
const CATEGORY_ICONS = {
    'Writing': 'fa-file-text',
    'Translation': 'fa-language',
    'Image': 'fa-image',
    'Image Generation': 'fa-image',
    'Video': 'fa-video',
    'Audio': 'fa-music',
    'Music': 'fa-music',
    'Code': 'fa-code',
    'Productivity': 'fa-chart-line',
    'Marketing': 'fa-megaphone',
    'Design': 'fa-paint-brush',
    'Business': 'fa-briefcase',
    'Education': 'fa-graduation-cap',
    'Research': 'fa-search',
    'Chat': 'fa-comments',
    'AI Writing': 'fa-file-text',
    'AI Coding': 'fa-code',
    'Video Creation': 'fa-video',
    'Audio & Music': 'fa-music',
    'AI Detection': 'fa-search',
    'Avatar': 'fa-user',
    'Copywriting': 'fa-file-text',
    'For Fun': 'fa-smile',
    'Generative Art': 'fa-palette',
    'Generative Video': 'fa-video',
    'Image Scanning': 'fa-image',
    'Social Media': 'fa-share',
    'Text-To-Speech': 'fa-volume-up',
    'Voice Modulation': 'fa-microphone',
    'Aggregators': 'fa-layer-group',
    'Finance': 'fa-wallet',
    'Gaming': 'fa-gamepad',
    'Generative Code': 'fa-code',
    'Image Improvement': 'fa-brush',
    'Inspiration': 'fa-sun',
    'Podcasting': 'fa-headphones',
    'Prompt Guides': 'fa-list',
    'Self-Improvement': 'fa-user-check',
    'Speech-To-Text': 'fa-microphone-alt',
    'Text-To-Video': 'fa-film',
    'Video Editing': 'fa-scissors'
};

// ----------------------- استخراج الأقسام من الموقع -----------------------
async function getCategoriesFromWebsite() {
    console.log('🔍 جاري استخراج الأقسام من الموقع...');

    const browser = await chromium.launch(createBrowserConfig());
    const context = await browser.newContext(createContextConfig());
    const page = await context.newPage();

    // تحسين منع تحميل الموارد غير الضرورية
    await page.route('**/*', (route) => {
        const request = route.request();
        const resourceType = request.resourceType();
        const url = request.url();
        
        // منع أنواع محددة من الموارد
        if (['image', 'font', 'stylesheet', 'media'].includes(resourceType)) {
            route.abort();
        } else if (url.includes('google-analytics') || url.includes('facebook.com/tr') || url.includes('googletagmanager')) {
            route.abort();
        } else {
            route.continue();
        }
    });

    try {
        console.log('   🌐 جاري تحميل الصفحة الرئيسية...');
        await page.goto(BASE_URL, {
            waitUntil: 'networkidle',
            timeout: 20000
        });

        // انتظار إضافي للسماح للـ JavaScript بالتحميل
        await sleep(3000);

        // استخراج الفئات بطريقة أكثر دقة
        const categories = await page.evaluate(() => {
            const categoryMap = new Map();
            const seenUrls = new Set();

            // البحث في القائمة الجانبية للفئات
            const categorySelectors = [
                'nav a[href*="?tags="]',
                '.categories a',
                '.tags a',
                '.sidebar a',
                'a[href*="?tags="]',
                '[class*="category"] a',
                '[class*="tag"] a'
            ];

            categorySelectors.forEach(selector => {
                const links = document.querySelectorAll(selector);
                
                links.forEach(link => {
                    try {
                        const href = link.href || link.getAttribute('href');
                        const text = link.textContent?.trim().replace(/\s+/g, ' ');
                        
                        if (!href || !text || text.length < 2 || text.length > 50) return;

                        // أنماط URL التي تشير إلى فئات
                        const isCategoryUrl = 
                            href.includes('?tags=') || 
                            href.includes('/tags/') ||
                            href.includes('?category=') || 
                            href.includes('/category/') ||
                            href.includes('tools?tag=') ||
                            (href.includes(window.location.origin) && !href.includes('/tools/'));

                        if (isCategoryUrl && !seenUrls.has(href)) {
                            seenUrls.add(href);
                            const fullUrl = href.startsWith('http') ? href : new URL(href, window.location.origin).href;
                            
                            // تنظيف اسم الفئة
                            let cleanName = text;
                            if (cleanName.includes('(')) cleanName = cleanName.split('(')[0].trim();
                            if (cleanName.includes('#')) cleanName = cleanName.split('#')[0].trim();
                            if (cleanName.includes('-')) cleanName = cleanName.split('-')[0].trim();
                            
                            if (cleanName && !categoryMap.has(cleanName)) {
                                categoryMap.set(cleanName, fullUrl);
                            }
                        }
                    } catch {
                        // تجاهل الأخطاء في معالجة الروابط الفردية
                    }
                });
            });

            return Array.from(categoryMap.entries());
        });

        await browser.close();

        if (categories.length > 0) {
            console.log(`✅ تم العثور على ${categories.length} قسم:`);
            categories.forEach(([name, url]) => {
                console.log(`   📁 ${name} -> ${url}`);
            });
            return Object.fromEntries(categories);
        } else {
            console.log('⚠️  لم يتم العثور على أقسام ديناميكية، سيتم استخدام الأقسام الافتراضية.');
            return getDefaultCategories();
        }
    } catch (error) {
        console.log('❌ خطأ في استخراج الأقسام:', error.message);
        await browser.close();
        console.log('🔄 استخدام الأقسام الافتراضية كاحتياط.');
        return getDefaultCategories();
    }
}

// الأقسام الافتراضية كدالة منفصلة
function getDefaultCategories() {
    const baseUrl = 'https://www.futuretools.io/';
    return {
        'AI Writing': baseUrl + '?tags=writing',
        'Image Generation': baseUrl + '?tags=image-generation',
        'Video Creation': baseUrl + '?tags=video',
        'Audio & Music': baseUrl + '?tags=audio',
        'AI Coding': baseUrl + '?tags=code',
        'Productivity': baseUrl + '?tags=productivity',
        'Marketing': baseUrl + '?tags=marketing',
        'Design': baseUrl + '?tags=design',
        'Business': baseUrl + '?tags=business',
        'Education': baseUrl + '?tags=education',
        'Research': baseUrl + '?tags=research',
        'Translation': baseUrl + '?tags=translation',
        'Chat': baseUrl + '?tags=chat',
        'Social Media': baseUrl + '?tags=social-media',
        'Finance': baseUrl + '?tags=finance',
        'Gaming': baseUrl + '?tags=gaming'
    };
}

// ----------------------- استخراج أدوات قسم واحد -----------------------
async function scrapeCategoryTools(category, categoryUrl) {
    console.log(`\n📁 جاري جمع أدوات ${category}...`);
    console.log(`   🔗 ${categoryUrl}`);

    if (!isValidUrl(categoryUrl)) {
        console.log(`   ❌ رابط غير صالح للقسم ${category}`);
        return [];
    }

    const browser = await chromium.launch(createBrowserConfig());
    const context = await browser.newContext(createContextConfig());
    const page = await context.newPage();

    // تحسين منع تحميل الموارد
    await page.route('**/*', (route) => {
        const request = route.request();
        const resourceType = request.resourceType();
        const url = request.url();
        
        if (['image', 'font', 'stylesheet', 'media'].includes(resourceType)) {
            route.abort();
        } else if (url.includes('google-analytics') || url.includes('facebook.com/tr')) {
            route.abort();
        } else {
            route.continue();
        }
    });

    let categoryTools = [];

    try {
        console.log(`   🌐 جاري تحميل صفحة القسم...`);
        await page.goto(categoryUrl, {
            waitUntil: 'domcontentloaded',
            timeout: CATEGORY_PAGE_TIMEOUT
        });

        // انتظار التحميل الأولي
        await sleep(3000);

        // استراتيجية التمرير المحسنة
        let previousToolCount = 0;
        let scrollIterations = 0;
        let noChangeCount = 0;

        while (scrollIterations < MAX_SCROLL_ITERATIONS && noChangeCount < 3) {
            await page.evaluate(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            });
            
            await sleep(SCROLL_DELAY_MS);

            const { toolCount } = await page.evaluate(() => {
                const toolSelectors = [
                    'a[href*="/tools/"]',
                    '[class*="tool-card"]',
                    '[class*="product-card"]',
                    '.tool, .product'
                ];
                
                let count = 0;
                toolSelectors.forEach(selector => {
                    count += document.querySelectorAll(selector).length;
                });
                
                return { toolCount: count };
            });

            console.log(`   📊 بعد التمرير ${scrollIterations + 1}: ${toolCount} أداة`);

            if (toolCount === previousToolCount) {
                noChangeCount++;
            } else {
                noChangeCount = 0;
            }

            if (toolCount >= TOOLS_PER_CATEGORY) {
                console.log(`   🎯 وصل إلى الحد الأقصى ${toolCount} أداة`);
                break;
            }

            previousToolCount = toolCount;
            scrollIterations++;
        }

        // استخراج محسن للأدوات
        categoryTools = await page.evaluate((params) => {
            const { currentCategory, maxTools } = params;
            const tools = [];
            const seenUrls = new Set();

            // محاولة العثور على حاويات الأدوات
            const toolSelectors = [
                'a[href*="/tools/"]',
                '[class*="tool-card"]',
                '[class*="product-card"]',
                '.tool',
                '.product'
            ];

            toolSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                
                elements.forEach(element => {
                    if (tools.length >= maxTools) return;

                    try {
                        const href = element.href || element.getAttribute('href');
                        if (!href || seenUrls.has(href)) return;

                        seenUrls.add(href);

                        // استخراج العنوان
                        let title = '';
                        const titleSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '[class*="title"], [class*="name"]'];
                        
                        for (const selector of titleSelectors) {
                            const titleElem = element.querySelector(selector);
                            if (titleElem) {
                                title = titleElem.textContent?.trim();
                                if (title && title.length > 0) break;
                            }
                        }

                        if (!title) {
                            title = element.textContent?.trim() || 
                                   href.split('/').pop()?.replace(/[-_]/g, ' ') || 
                                   'Unknown Tool';
                        }

                        // استخراج الصورة
                        let image = '';
                        const imgElement = element.querySelector('img');
                        if (imgElement?.src) {
                            image = imgElement.src;
                            if (image.startsWith('//')) image = 'https:' + image;
                            else if (image.startsWith('/')) image = window.location.origin + image;
                        }

                        // استخراج الوصف
                        let description = '';
                        const descSelectors = ['p', '[class*="description"], [class*="desc"], [class*="text"]'];
                        
                        for (const selector of descSelectors) {
                            const descElements = element.querySelectorAll(selector);
                            for (const elem of descElements) {
                                const text = elem.textContent?.trim();
                                if (text && text.length > 20 && text.length < 300 && text !== title) {
                                    description = text;
                                    break;
                                }
                            }
                            if (description) break;
                        }

                        if (!description) {
                            description = `AI tool for ${currentCategory.toLowerCase()} - automate and enhance your workflow`;
                        }

                        // تحديد التسعير
                        let pricing = 'Freemium';
                        const textContent = (element.textContent || '').toLowerCase();
                        
                        if (textContent.includes('free') && !textContent.includes('trial') && !textContent.includes('plan')) {
                            pricing = 'Free';
                        } else if (textContent.includes('paid') || textContent.includes('$') || textContent.includes('subscription')) {
                            pricing = 'Paid';
                        }

                        // تحديد العلامات
                        const tags = [currentCategory.toLowerCase().replace(/\s+/g, '-')];
                        if (textContent.includes('ai') || textContent.includes('artificial intelligence')) {
                            tags.push('ai');
                        }
                        if (textContent.includes('chat') || textContent.includes('gpt')) {
                            tags.push('chat');
                        }

                        tools.push({
                            title: title.substring(0, 120),
                            description: description,
                            description_ar: description,
                            image: image,
                            source: href,
                            category: currentCategory,
                            pricing: pricing,
                            tags: tags
                        });

                    } catch {
                        // تجاهل الأخطاء في العناصر الفردية
                    }
                });
            });

            return tools;
        }, { currentCategory: category, maxTools: TOOLS_PER_CATEGORY });

        console.log(`   ✅ تم استخراج ${categoryTools.length} أداة من ${category}`);

    } catch (error) {
        console.log(`   ❌ خطأ في استخراج أدوات ${category}:`, error.message);
    } finally {
        // تنظيف آمن للموارد
        try {
            await page.close().catch(() => {});
            await context.close().catch(() => {});
            await browser.close().catch(() => {});
        } catch (error) {
            console.log('   ⚠️  خطأ أثناء تنظيف المتصفح:', error.message);
        }
        await sleep(BROWSER_CLOSE_DELAY);
    }

    return categoryTools;
}

// ----------------------- تدفق جمع الأدوات لكامل الموقع -----------------------
async function scrapeTools() {
    console.log('🚀 بدء جمع البيانات من FutureTools.io...');

    const CATEGORIES = await getCategoriesFromWebsite();

    console.log(`🎯 الهدف: جمع ${TOOLS_PER_CATEGORY} أداة من كل قسم (${Object.keys(CATEGORIES).length} قسم)`);

    let allTools = [];
    const seenUrls = new Set();

    // تحديد أولويات الفئات
    const priorityCategories = ['AI Writing', 'Image Generation', 'AI Coding', 'Video Creation', 'Productivity'];
    const sortedCategories = [
        ...priorityCategories.filter(cat => CATEGORIES[cat]),
        ...Object.keys(CATEGORIES).filter(cat => !priorityCategories.includes(cat))
    ];

    console.log(`\n📋 الأقسام التي سيتم جمعها:`);
    sortedCategories.forEach((cat, index) => {
        console.log(`   ${index + 1}. ${cat}`);
    });

    for (const category of sortedCategories) {
        const categoryUrl = CATEGORIES[category];
        
        try {
            console.log(`\n📂 معالجة القسم: ${category}`);
            const categoryTools = await scrapeCategoryTools(category, categoryUrl);

            let newToolsCount = 0;
            for (const tool of categoryTools) {
                if (!seenUrls.has(tool.source) && newToolsCount < TOOLS_PER_CATEGORY) {
                    const toolData = {
                        name: tool.title.toLowerCase().replace(/\s+/g, ' '),
                        url: tool.source,
                        category: tool.category,
                        description: tool.description,
                        description_ar: tool.description_ar,
                        pricing: tool.pricing,
                        logo: tool.image || './Images/placeholder.png',
                        icon: CATEGORY_ICONS[category] || CATEGORY_ICONS[tool.category] || 'fa-robot',
                        featured: Math.random() < 0.1, // 10% من الأدوات تكون مميزة
                        tags: tool.tags || [category.toLowerCase().replace(/\s+/g, '-')],
                        timestamp: new Date().toISOString()
                    };
                    
                    allTools.push(toolData);
                    seenUrls.add(tool.source);
                    newToolsCount++;
                }
            }

            console.log(`✅ تمت إضافة ${newToolsCount} أداة جديدة من ${category}`);
            console.log(`📊 الإجمالي الحالي: ${allTools.length} أداة`);

            // انتظار بين الأقسام لتجنب الحظر
            if (Object.keys(CATEGORIES).length > 1) {
                await sleep(DELAY_BETWEEN_CATEGORIES);
            }

        } catch (error) {
            console.log(`❌ خطأ في معالجة قسم ${category}:`, error.message);
            continue; // الاستمرار مع الأقسام التالية رغم الخطأ
        }
    }

    console.log(`\n🎉 اكتمل الجمع!`);
    console.log(`📊 تم جمع ${allTools.length} أداة فريدة من ${Object.keys(CATEGORIES).length} قسم`);

    return allTools;
}

// ----------------------- تنظيم وحفظ النتائج -----------------------
function organizeToolsByCategory(tools) {
    const organizedData = {
        metadata: {
            totalTools: tools.length,
            scrapedAt: new Date().toISOString(),
            categories: {},
            source: 'FutureTools.io'
        },
        toolsByCategory: {}
    };

    // تنظيم الأدوات حسب الفئة
    tools.forEach(tool => {
        if (!organizedData.toolsByCategory[tool.category]) {
            organizedData.toolsByCategory[tool.category] = [];
        }
        organizedData.toolsByCategory[tool.category].push(tool);
    });

    // إضافة إحصائيات للفئات
    for (const [category, categoryTools] of Object.entries(organizedData.toolsByCategory)) {
        organizedData.metadata.categories[category] = {
            count: categoryTools.length,
            free: categoryTools.filter(t => t.pricing === 'Free').length,
            paid: categoryTools.filter(t => t.pricing === 'Paid').length,
            freemium: categoryTools.filter(t => t.pricing === 'Freemium').length
        };
    }

    return organizedData;
}

function saveToJSON(tools) {
    try {
        const organizedData = organizeToolsByCategory(tools);
        
        // حفظ البيانات الكاملة
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(organizedData, null, 2));
        console.log(`💾 تم حفظ البيانات في: ${OUTPUT_FILE}`);

        // حفظ نسخة مختصرة للإحصائيات
        const statsFile = path.join(OUTPUT_DIR, 'scraping_stats.json');
        const stats = {
            lastScraped: organizedData.metadata.scrapedAt,
            totalTools: organizedData.metadata.totalTools,
            categories: organizedData.metadata.categories
        };
        fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));

        console.log('\n📊 إحصائيات البيانات:');
        for (const [category, info] of Object.entries(organizedData.metadata.categories)) {
            console.log(`   📁 ${category}: ${info.count} أداة (مجاني: ${info.free}, مدفوع: ${info.paid}, فريميوم: ${info.freemium})`);
        }
        console.log(`   ✅ الإجمالي: ${organizedData.metadata.totalTools} أداة`);

        return organizedData;
    } catch (error) {
        console.log('❌ خطأ في حفظ JSON:', error.message);
        throw error;
    }
}

// ----------------------- تشغيل رئيسي -----------------------
async function main() {
    let browser = null;
    try {
        console.log('🚀 بدء عملية جمع البيانات من FutureTools.io...\n');
        console.log('⏰ الوقت المتوقع: 2-5 دقائق حسب عدد الأقسام\n');

        const startTime = Date.now();
        const tools = await scrapeTools();
        const endTime = Date.now();
        
        const duration = Math.round((endTime - startTime) / 1000);
        console.log(`\n⏱️  مدة التنفيذ: ${duration} ثانية`);

        if (tools.length === 0) {
            console.log('❌ لم يتم جمع أي أدوات.');
            console.log('🔍 الأسباب المحتملة:');
            console.log('   - اتصال الإنترنت غير مستقر');
            console.log('   - تغيير في هيكل الموقع');
            console.log('   - حظر من الموقع');
            console.log('   - جرب تشغيل HEADLESS=false لمشاهدة المتصفح');
            
            // حفظ ملف فارغ منظم
            saveToJSON([]);
            return;
        }

        const result = saveToJSON(tools);
        
        console.log('\n✨ اكتمل كل شيء بنجاح!');
        console.log(`📁 الملف المحفوظ: ${OUTPUT_FILE}`);
        console.log(`🔢 العدد الإجمالي: ${result.metadata.totalTools} أداة`);
        console.log(`📅 وقت الجمع: ${new Date().toLocaleString()}`);

    } catch (error) {
        console.error('❌ خطأ رئيسي:', error);
        console.error('🔧 تفاصيل الخطأ:', error.stack);
    } finally {
        // تنظيف نهائي للموارد
        if (browser) {
            try {
                await browser.close();
            } catch (error) {
                console.log('⚠️  خطأ أثناء إغلاق المتصفح النهائي:', error.message);
            }
        }
    }
}

// تشغيل البرنامج
main().catch(console.error);