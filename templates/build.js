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

// Group tools by category for same-category feature
const toolsByCategory = {};
aiTools.forEach(tool => {
  const cat = tool.category || "Other";
  if (!toolsByCategory[cat]) toolsByCategory[cat] = [];
  toolsByCategory[cat].push(tool);
});

// Helper function to generate slug
function generateSlug(name) {
  return (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper function to generate same-category tools HTML
function generateSameCategoryHTML(currentTool, allTools) {
  const category = currentTool.category || "Other";
  const sameCategory = (toolsByCategory[category] || [])
    .filter(t => t.name !== currentTool.name)
    .slice(0, 6); // Max 6 tools
  
  if (sameCategory.length === 0) return "";
  
  return sameCategory.map(tool => {
    const slug = generateSlug(tool.name);
    const logo = tool.logo || tool.icon || "";
    return `
          <div class="col-md-6 col-xl-4">
            <div class="card same-category-card h-100">
              <div class="same-category-card-img">
                <img src="${logo}" alt="${tool.name}" class="same-category-card-image" onerror="this.src='https://futuregen.space/Images/placeholder-logo.png'">
              </div>
              <div class="same-category-card-body">
                <span class="badge same-category-card-badge">${tool.category || "AI Tool"}</span>
                <h5 class="same-category-card-title">${tool.name}</h5>
                <p class="same-category-card-text">${(tool.description || "").substring(0, 100)}...</p>
                <div class="same-category-card-footer d-flex justify-content-between align-items-center">
                  <a href="${slug}.html" class="btn btn-outline-primary same-category-details-btn">
                    <span data-en="Details" data-ar="التفاصيل">Details</span>
                  </a>
                  <span class="badge same-category-pricing-badge">${tool.pricing || "Unknown"}</span>
                </div>
              </div>
            </div>
          </div>`;
  }).join("\n");
}

aiTools.forEach(tool => {
  const slug = generateSlug(tool.name);

  if (!slug) return;

  const canonicalUrl = `https://futuregen.space/tools/${slug}.html`;
  
  // Generate same category tools HTML
  const sameCategoryHTML = generateSameCategoryHTML(tool, aiTools);

  const html = template
    .replace(/{{NAME}}/g, tool.name || "")
    .replace(/{{DESCRIPTION}}/g, tool.description || "")
    .replace(/{{CATEGORY}}/g, tool.category || "AI Tool")
    .replace(/{{PRICING}}/g, tool.pricing || "Unknown")
    .replace(/{{SOURCE}}/g, tool.source || "")
    .replace(/{{DOMAIN}}/g, tool.domain || "")
    .replace(/{{LOGO}}/g, tool.logo || tool.icon || "")
    .replace(/{{OFFICIAL_URL}}/g, tool.official_url || tool.url || "#")
    .replace(/{{OFFICIAL_DOMAIN}}/g, tool.official_domain || tool.domain || "")
    .replace(/{{DESC_AR}}/g, tool.desc_ar || "")
    .replace(/{{CANONICAL}}/g, canonicalUrl)
    .replace(/{{SLUG}}/g, slug)
    .replace(/{{SAME_CATEGORY_TOOLS}}/g, sameCategoryHTML);

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
    <loc>https://futuregen.space/about.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://futuregen.space/contact.html</loc>
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