// انتظر وقت معين
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const TARGET_TOOLS = 3000;
const URL = 'https://theresanaiforthat.com/';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    console.log('🌐 فتح الموقع الرئيسي');

    let tools = [];
    let previousHeight = 0;

    while(tools.length < TARGET_TOOLS){
        await page.waitForSelector('div.tool-card', { timeout: 5000 }).catch(()=>{});

        const newTools = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('div.tool-card')).map(el => ({
                title_en: el.querySelector('.title')?.innerText || '',
                desc_en: el.querySelector('.description')?.innerText || '',
                logo: el.querySelector('img')?.src || '',
                link: el.querySelector('a')?.href || '',
                desc_ar: ''
            }));
        });

        newTools.forEach(t => {
            if(!tools.find(x => x.link === t.link)) tools.push(t);
        });

        console.log(`✅ تم جمع ${tools.length} أداة`);

        const newHeight = await page.evaluate('document.body.scrollHeight');
        if(newHeight === previousHeight) break;
        previousHeight = newHeight;

        await wait(2000); // انتظر 2 ثانية لتحميل الأدوات الجديدة
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    }

    console.log(`💾 حفظ ${tools.length} أداة في tools_full.json`);
    await fs.writeJSON('tools_full.json', tools, { spaces: 2 });

    await browser.close();
})();
