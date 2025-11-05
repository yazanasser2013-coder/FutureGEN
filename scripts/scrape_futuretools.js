// scrape_futuretools.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'futuretools_data_full.json');

// إعدادات محسنة
const SITE_URL = 'https://www.futuretools.io/';
const HEADLESS = true; // تغيير إلى true للعمل التلقائي
const TOOLS_PER_CATEGORY = 50;
const TIMEOUT = 60000;
const SCHEDULE_INTERVAL = 60 * 60 * 1000; // كل ساعة (بالمللي ثانية)

// أيقونات الفئات
const CATEGORY_ICONS = {
    'AI Writing': 'fa-file-text',
    'Image Generation': 'fa-image', 
    'Video Creation': 'fa-video',
    'Audio & Music': 'fa-music',
    'AI Coding': 'fa-code',
    'Productivity': 'fa-chart-line',
    'Marketing': 'fa-megaphone',
    'Design': 'fa-paint-brush',
    'Business': 'fa-briefcase',
    'Education': 'fa-graduation-cap',
    'Research': 'fa-search',
    'Translation': 'fa-language',
    'Chat': 'fa-comments',
    'Social Media': 'fa-share',
    'Finance': 'fa-wallet',
    'Gaming': 'fa-gamepad'
};

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// استراتيجية جديدة - زيارة الصفحة الرئيسية بدلاً من التصفية
function getCategoryUrls() {
    const baseUrl = SITE_URL;
    return {
        'AI Writing': `${baseUrl}?tags=writing`,
        'Image Generation': `${baseUrl}?tags=image-generation`,
        'Video Creation': `${baseUrl}?tags=video`,
        'Audio & Music': `${baseUrl}?tags=audio`,
        'AI Coding': `${baseUrl}?tags=code`,
        'Productivity': `${baseUrl}?tags=productivity`,
        'Marketing': `${baseUrl}?tags=marketing`,
        'Design': `${baseUrl}?tags=design`,
        'Business': `${baseUrl}?tags=business`,
        'Education': `${baseUrl}?tags=education`,
        'Research': `${baseUrl}?tags=research`,
        'Translation': `${baseUrl}?tags=translation`,
        'Chat': `${baseUrl}?tags=chat`,
        'Social Media': `${baseUrl}?tags=social-media`,
        'Finance': `${baseUrl}?tags=finance`,
        'Gaming': `${baseUrl}?tags=gaming`
    };
}

// إنشاء معرف فريد للأداة
function createToolId(tool) {
    // استخدام مزيج من الاسم والرابط لإنشاء معرف فريد
    const nameSlug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const urlSlug = tool.url.split('/').filter(Boolean).pop();
    return `${nameSlug}-${urlSlug}`;
}

// استخراج أدوات من قسم معين
async function scrapeCategoryTools(category, categoryUrl) {
    console.log(`\n📁 جاري جمع أدوات ${category}...`);
    console.log(`   🔗 ${categoryUrl}`);
    
    const browser = await chromium.launch({ 
        headless: HEADLESS,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
        ]
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    const page = await context.newPage();
    let tools = [];

    try {
        console.log(`   🌐 جاري تحميل صفحة القسم...`);
        
        // إعداد استماع للأخطاء
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log(`   🚨 خطأ في الصفحة: ${msg.text()}`);
            }
        });

        // محاولة تحميل الصفحة
        try {
            await page.goto(categoryUrl, {
                waitUntil: 'domcontentloaded',
                timeout: TIMEOUT
            });
        } catch {
            console.log(`   ⚠️  domcontentloaded فشل، جاري networkidle...`);
            await page.goto(categoryUrl, {
                waitUntil: 'networkidle',
                timeout: TIMEOUT
            });
        }

        console.log(`   ✅ تم تحميل الصفحة بنجاح`);
        await sleep(3000);

        // الانتظار لتحميل المحتوى الديناميكي
        console.log(`   ⏳ جاري الانتظار لتحميل المحتوى...`);
        
        try {
            await page.waitForSelector('a[href*="/tools/"], .tool-card, .card, [class*="tool"]', {
                timeout: 15000
            });
            console.log(`   ✅ تم تحميل عناصر الأدوات`);
        } catch {
            console.log(`   ⚠️  لم يتم العثور على عناصر الأدوات، المتابعة...`);
        }

        // التمرير لتحميل المزيد من المحتوى
        console.log(`   🔄 جاري التمرير لتحميل المزيد من المحتوى...`);
        let lastToolCount = 0;
        for (let i = 0; i < 6; i++) {
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            await sleep(2500);
            
            const toolCount = await page.evaluate(() => {
                return document.querySelectorAll('a[href*="/tools/"]').length;
            });
            
            console.log(`   📊 بعد التمرير ${i + 1}: ${toolCount} أداة`);
            
            // إذا لم يزد العدد، نتوقف
            if (toolCount === lastToolCount && toolCount > 20) {
                console.log(`   ⏹️  توقف التمرير - لم يزد عدد الأدوات`);
                break;
            }
            lastToolCount = toolCount;
            
            if (toolCount >= TOOLS_PER_CATEGORY) {
                console.log(`   ✅ وصلنا إلى الحد المطلوب من الأدوات`);
                break;
            }
        }

        // استخراج الأدوات مع تحسينات
        console.log(`   🔍 جاري استخراج بيانات الأدوات...`);
        tools = await page.evaluate((categoryName) => {
            const toolsData = [];
            const toolLinks = document.querySelectorAll('a[href*="/tools/"]');
            
            console.log(`   🔍 تم العثور على ${toolLinks.length} رابط أداة`);
            
            // استخدام Set لتجنب التكرارات في نفس الصفحة
            const seenInPage = new Set();
            
            toolLinks.forEach((link, index) => {
                if (index >= 60) return; // زيادة الحد قليلاً
                
                try {
                    let href = link.getAttribute('href');
                    
                    // معالجة الروابط النسبية والمطلقة
                    if (href.startsWith('/')) {
                        href = `https://www.futuretools.io${href}`;
                    } else if (!href.startsWith('http')) {
                        href = `https://www.futuretools.io/${href}`;
                    }
                    
                    // تنظيف الرابط
                    const cleanUrl = href.split('?')[0].split('#')[0];
                    
                    // تخطي التكرارات في نفس الصفحة
                    if (seenInPage.has(cleanUrl)) {
                        return;
                    }
                    seenInPage.add(cleanUrl);
                    
                    // البحث في العناصر المحيطة للمعلومات
                    let toolCard = link;
                    let parent = link.parentElement;
                    
                    // البحث في 5 مستويات للأعلى للعثور على بطاقة الأداة
                    for (let i = 0; i < 5; i++) {
                        if (parent) {
                            const classList = parent.getAttribute('class') || '';
                            if (classList.includes('tool-card') || 
                                classList.includes('card') || 
                                classList.includes('group') ||
                                classList.includes('tool') ||
                                classList.includes('item')) {
                                toolCard = parent;
                                break;
                            }
                            parent = parent.parentElement;
                        }
                    }
                    
                    // استخراج الاسم
                    let name = '';
                    const nameSelectors = ['h3', 'h2', 'h4', 'h1', 'h5', 
                                         '[class*="title"]', '[class*="name"]',
                                         '.text-xl', '.text-lg', 'strong', 'b'];
                    
                    for (const selector of nameSelectors) {
                        const nameElement = toolCard.querySelector(selector);
                        if (nameElement) {
                            name = nameElement.textContent?.trim();
                            if (name && name.length > 0 && name.length < 100) break;
                        }
                    }
                    
                    if (!name) {
                        // استخراج الاسم من الرابط
                        name = cleanUrl.split('/').pop()?.replace(/-/g, ' ') || `Tool ${index + 1}`;
                        name = name.split('?')[0];
                        name = name.charAt(0).toUpperCase() + name.slice(1);
                    }
                    
                    // تنظيف الاسم
                    name = name.replace(/\s+/g, ' ').trim();
                    
                    // استخراج الصورة
                    let logo = '';
                    const imgSelectors = ['img', '.logo', '[class*="image"]', '[class*="icon"]'];
                    
                    for (const selector of imgSelectors) {
                        const imgElements = toolCard.querySelectorAll(selector);
                        for (const imgElement of imgElements) {
                            if (imgElement.src) {
                                logo = imgElement.src;
                                if (logo.startsWith('//')) logo = 'https:' + logo;
                                else if (logo.startsWith('/')) logo = 'https://www.futuretools.io' + logo;
                                if (logo && !logo.includes('data:') && logo.includes('.')) {
                                    break;
                                }
                            }
                        }
                        if (logo) break;
                    }
                    
                    // استخراج الوصف
                    let description = '';
                    const descSelectors = ['p', '[class*="description"]', '[class*="desc"]', 
                                         '[class*="text"]', '.text-gray-500', '.text-gray-600',
                                         '.text-sm', '.text-base'];
                    
                    outerLoop: for (const selector of descSelectors) {
                        const descElements = toolCard.querySelectorAll(selector);
                        for (const elem of descElements) {
                            const text = elem.textContent?.trim();
                            if (text && text.length > 25 && text.length < 250 && text !== name) {
                                // التأكد من أن النص ليس جزءاً من واجهة أخرى
                                if (!text.includes('★') && !text.includes('$') && !text.includes('http')) {
                                    description = text;
                                    break outerLoop;
                                }
                            }
                        }
                    }
                    
                    if (!description) {
                        description = `${categoryName} AI tool for automating and enhancing workflows`;
                    }
                    
                    // تحديد التسعير
                    let pricing = 'Freemium';
                    const textContent = (toolCard.textContent || '').toLowerCase();
                    if (textContent.includes('free') && !textContent.includes('trial') && !textContent.includes('freemium')) {
                        pricing = 'Free';
                    } else if (textContent.includes('paid') || textContent.includes('$') || textContent.includes('pricing')) {
                        pricing = 'Paid';
                    } else if (textContent.includes('freemium')) {
                        pricing = 'Freemium';
                    }
                    
                    // إنشاء وصف عربي
                    const arabicCategory = {
                        'AI Writing': 'الكتابة',
                        'Image Generation': 'توليد الصور',
                        'Video Creation': 'إنشاء الفيديو',
                        'Audio & Music': 'الصوت والموسيقى',
                        'AI Coding': 'البرمجة',
                        'Productivity': 'الإنتاجية',
                        'Marketing': 'التسويق',
                        'Design': 'التصميم',
                        'Business': 'الأعمال',
                        'Education': 'التعليم',
                        'Research': 'البحث',
                        'Translation': 'الترجمة',
                        'Chat': 'المحادثة',
                        'Social Media': 'التواصل الاجتماعي',
                        'Finance': 'المالية',
                        'Gaming': 'الألعاب'
                    }[categoryName] || categoryName;
                    
                    const description_ar = `أداة ${arabicCategory} بالذكاء الاصطناعي لأتمتة وتحسين سير العمل`;
                    
                    toolsData.push({
                        name: name,
                        url: cleanUrl,
                        category: categoryName,
                        description: description,
                        description_ar: description_ar,
                        pricing: pricing,
                        logo: logo || './Images/placeholder.png',
                        featured: Math.random() < 0.1,
                        tags: [categoryName.toLowerCase().replace(/\s+/g, '-')],
                        timestamp: new Date().toISOString()
                    });
                    
                } catch (error) {
                    console.log(`   ❌ خطأ في استخراج أداة ${index}:`, error);
                }
            });
            
            return toolsData;
        }, category);

        console.log(`   ✅ تم استخراج ${tools.length} أداة من ${category}`);

    } catch (error) {
        console.log(`   ❌ خطأ في استخراج أدوات ${category}:`, error.message);
    } finally {
        await browser.close();
    }

    return tools;
}

// الدالة الرئيسية للجمع
async function runScraping() {
    console.log('🚀 بدء جمع البيانات من FutureTools.io...\n');
    
    const categories = getCategoryUrls();
    const categoryNames = Object.keys(categories);
    
    console.log(`📋 الأقسام التي سيتم جمعها (${categoryNames.length} قسم):`);
    categoryNames.forEach((cat, idx) => console.log(`   ${idx + 1}. ${cat}`));
    
    let allTools = [];
    const seenUrls = new Set();
    const seenToolIds = new Set();

    // تجربة استراتيجية جديدة - الصفحة الرئيسية أولاً
    console.log(`\n🧪 البدء بجمع الأدوات من الصفحة الرئيسية أولاً...`);
    
    try {
        const mainPageTools = await scrapeCategoryTools('All Tools', SITE_URL);
        
        let addedCount = 0;
        let duplicateCount = 0;
        
        for (const tool of mainPageTools) {
            const toolId = createToolId(tool);
            
            if (!seenUrls.has(tool.url) && !seenToolIds.has(toolId)) {
                tool.icon = CATEGORY_ICONS[tool.category] || 'fa-robot';
                allTools.push(tool);
                seenUrls.add(tool.url);
                seenToolIds.add(toolId);
                addedCount++;
            } else {
                duplicateCount++;
            }
        }
        
        console.log(`\n✅ تمت إضافة ${addedCount} أداة جديدة من الصفحة الرئيسية`);
        console.log(`   🔄 تم تخطي ${duplicateCount} أداة مكررة`);
        
        // إذا حصلنا على أدوات من الصفحة الرئيسية، نكمل مع الأقسام
        if (addedCount > 0) {
            console.log(`\n🔄 المتابعة مع الأقسام المتخصصة...`);
            
            for (let i = 0; i < categoryNames.length; i++) {
                const category = categoryNames[i];
                
                // تخطي إذا كان لدينا بالفعل عدد كافٍ من الأدوات
                if (allTools.length >= 200) {
                    console.log(`\n⏹️  توقف - وصلنا إلى ${allTools.length} أداة`);
                    break;
                }
                
                try {
                    console.log(`\n📁 جاري جمع أدوات ${category} (${i + 1}/${categoryNames.length})...`);
                    
                    const categoryTools = await scrapeCategoryTools(category, categories[category]);
                    
                    let newAdded = 0;
                    let newDuplicates = 0;
                    
                    for (const tool of categoryTools) {
                        const toolId = createToolId(tool);
                        
                        if (!seenUrls.has(tool.url) && !seenToolIds.has(toolId) && newAdded < 20) {
                            tool.icon = CATEGORY_ICONS[tool.category] || 'fa-robot';
                            allTools.push(tool);
                            seenUrls.add(tool.url);
                            seenToolIds.add(toolId);
                            newAdded++;
                        } else {
                            newDuplicates++;
                        }
                    }
                    
                    console.log(`✅ تمت إضافة ${newAdded} أداة جديدة من ${category}`);
                    console.log(`   🔄 تم تخطي ${newDuplicates} أداة مكررة`);
                    console.log(`📊 الإجمالي الحالي: ${allTools.length} أداة`);
                    
                    // انتظار بين الأقسام
                    await sleep(4000);
                    
                } catch (error) {
                    console.log(`❌ خطأ في قسم ${category}:`, error.message);
                    continue;
                }
            }
        }
        
    } catch (error) {
        console.log(`❌ فشل جمع الأدوات من الصفحة الرئيسية:`, error.message);
    }
    
    // حفظ النتائج النهائية
    if (allTools.length > 0) {
        const result = {
            metadata: {
                totalTools: allTools.length,
                scrapedAt: new Date().toISOString(),
                source: 'FutureTools.io',
                categories: [...new Set(allTools.map(t => t.category))],
                siteUrl: SITE_URL,
                uniqueCategories: categoryNames.length
            },
            tools: allTools
        };
        
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
        
        console.log('\n🎉 اكتمل الجمع بنجاح!');
        console.log(`💾 تم حفظ ${allTools.length} أداة في: ${OUTPUT_FILE}`);
        
        // إحصائيات مفصلة
        const stats = {};
        const pricingStats = { Free: 0, Freemium: 0, Paid: 0 };
        
        allTools.forEach(tool => {
            stats[tool.category] = (stats[tool.category] || 0) + 1;
            pricingStats[tool.pricing] = (pricingStats[tool.pricing] || 0) + 1;
        });
        
        console.log('\n📊 الإحصائيات التفصيلية:');
        console.log(`   📈 إجمالي الأدوات: ${allTools.length}`);
        console.log(`   📂 عدد الأقسام: ${Object.keys(stats).length}`);
        
        Object.entries(stats).forEach(([category, count]) => {
            console.log(`   📁 ${category}: ${count} أداة`);
        });
        
        console.log(`\n💰 إحصائيات التسعير:`);
        Object.entries(pricingStats).forEach(([type, count]) => {
            console.log(`   💵 ${type}: ${count} أداة`);
        });
        
        return true;
        
    } else {
        console.log('\n❌ لم يتم جمع أي أدوات.');
        return false;
    }
}

// نظام الجدولة التلقائية
function startScheduler() {
    console.log('⏰ بدء نظام الجدولة التلقائية...');
    console.log(`🔄 السكريبت سيعمل كل ساعة تلقائياً`);
    
    // تشغيل أول عملية فوراً
    runScraping().then(success => {
        if (success) {
            console.log(`\n⏰ تم جدولة التشغيل التالي بعد ${SCHEDULE_INTERVAL / 1000 / 60} دقيقة`);
        }
    });
    
    // جدولة التشغيل التلقائي كل ساعة
    setInterval(() => {
        console.log('\n\n🔄 🔄 🔄 التشغيل التلقائي حسب الجدولة 🔄 🔄 🔄');
        console.log(`⏰ الوقت: ${new Date().toLocaleString()}`);
        runScraping().then(success => {
            if (success) {
                console.log(`\n⏰ تم جدولة التشغيل التالي بعد ${SCHEDULE_INTERVAL / 1000 / 60} دقيقة`);
            }
        });
    }, SCHEDULE_INTERVAL);
}

// إضافة سجل التشغيل
function logToFile(message) {
    const logFile = path.join(OUTPUT_DIR, 'scraping_log.txt');
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    fs.appendFileSync(logFile, logMessage, 'utf8');
}

// الدالة الرئيسية
async function main() {
    console.log('🤖 بدء تشغيل سكريبت جمع أدوات الذكاء الاصطناعي');
    console.log('============================================');
    
    // إضافة معالج للأخطاء لضمان استمرارية التشغيل
    process.on('unhandledRejection', (error) => {
        console.error('❌ خطأ غير معالج:', error);
        logToFile(`خطأ غير معالج: ${error.message}`);
    });
    
    process.on('uncaughtException', (error) => {
        console.error('❌ استثناء غير معالج:', error);
        logToFile(`استثناء غير معالج: ${error.message}`);
        // لا نخرج من العملية بل نستمر
    });
    
    // بدء الجدولة
    startScheduler();
}

// إذا كنت تريد تشغيله مرة واحدة فقط (بدون جدولة) قم بتعليق السطر التالي
// واستخدم runScraping() بدلاً من main()

main().catch(error => {
    console.error('❌ خطأ في التشغيل الرئيسي:', error);
    logToFile(`خطأ في التشغيل الرئيسي: ${error.message}`);
});