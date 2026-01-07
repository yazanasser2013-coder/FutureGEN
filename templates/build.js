const fs = require("fs");
const path = require("path");

// Load tools from the existing tools.json file
const toolsPath = path.join(__dirname, "../site/data/tools.json");
const toolsData = fs.readFileSync(toolsPath, "utf8");
const aiTools = JSON.parse(toolsData);
const template = fs.readFileSync(path.join(__dirname, "tool.html"), "utf8");

const outDir = path.join(__dirname, "../dist/tools");
fs.mkdirSync(outDir, { recursive: true });

// Generate sitemap entries
const sitemapEntries = [];

aiTools.forEach(tool => {
  const slug = (tool.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) return;

  const canonicalUrl = `https://futuregen.space/tools/${slug}`;

  const html = template
    .replace(/{{NAME}}/g, tool.name || "")
    .replace(/{{DESCRIPTION}}/g, tool.description || "")
    .replace(/{{CATEGORY}}/g, tool.category || "AI Tool")
    .replace(/{{PRICING}}/g, tool.pricing || "Unknown")
    .replace(/{{SOURCE}}/g, tool.source || "")
    .replace(/{{DOMAIN}}/g, tool.domain || "")
    .replace(/{{LOGO}}/g, tool.logo || tool.icon || "")
    .replace(/{{OFFICIAL_URL}}/g, tool.official_url || tool.url || "")
    .replace(/{{OFFICIAL_DOMAIN}}/g, tool.official_domain || tool.domain || "")
    .replace(/{{DESC_AR}}/g, tool.desc_ar || "")
    .replace(/{{CANONICAL}}/g, canonicalUrl)
    .replace(/{{SLUG}}/g, slug);

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html, "utf8");

  sitemapEntries.push(`  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
});

// Generate sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://futuregen.space/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://futuregen.space/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://futuregen.space/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${sitemapEntries.join('\n')}
</urlset>`;

const distDir = path.join(__dirname, "../dist");
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");

console.log(`✔ Generated ${sitemapEntries.length} tool pages`);
console.log(`✔ Generated sitemap.xml with ${sitemapEntries.length + 3} URLs`);