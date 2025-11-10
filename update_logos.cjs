const fs = require('fs');
const path = require('path');

// Read the scraped data
const scrapedDataPath = path.join(__dirname, 'data', 'futuretools_data_full.json');
const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf8'));

// Read the HTML file
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Create a mapping of tool names to logo URLs from scraped data
const logoMapping = {};
scrapedData.tools.forEach(tool => {
  // Normalize tool names for better matching
  const normalizedName = tool.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  logoMapping[normalizedName] = tool.logo;
});

// Function to update logo URLs in the aiTools array
function updateLogosInArray(aiToolsString) {
  // Split the array into individual tool objects
  const tools = aiToolsString.split('},');

  let updatedCount = 0;

  const updatedTools = tools.map(tool => {
    // Find the logo line
    const logoMatch = tool.match(/"logo":\s*"([^"]+)"/);
    if (logoMatch) {
      const currentLogo = logoMatch[1];

      // Find the tool name
      const nameMatch = tool.match(/"name":\s*"([^"]+)"/);
      if (nameMatch) {
        const toolName = nameMatch[1];
        const normalizedName = toolName.toLowerCase().replace(/[^a-z0-9]/g, '');

        // Check if we have a real logo for this tool
        if (logoMapping[normalizedName] && logoMapping[normalizedName] !== currentLogo) {
          console.log(`Updating logo for ${toolName}:`);
          console.log(`  From: ${currentLogo}`);
          console.log(`  To: ${logoMapping[normalizedName]}`);
          console.log('');

          updatedCount++;
          return tool.replace(/"logo":\s*"[^"]+"/, `"logo": "${logoMapping[normalizedName]}"`);
        }
      }
    }
    return tool;
  });

  console.log(`Total tools updated: ${updatedCount}`);
  return updatedTools.join('},');
}

// Find and update the aiTools array in the HTML
const aiToolsRegex = /const aiTools = \[([\s\S]*?)\];/;
const match = htmlContent.match(aiToolsRegex);

if (match) {
  const aiToolsString = match[1];
  const updatedAiToolsString = updateLogosInArray(aiToolsString);

  // Replace the old array with the updated one
  const updatedHtmlContent = htmlContent.replace(aiToolsRegex, `const aiTools = [${updatedAiToolsString}];`);

  // Write the updated HTML back to file
  fs.writeFileSync(htmlPath, updatedHtmlContent, 'utf8');

  console.log('✅ Successfully updated logo URLs in index.html');
} else {
  console.log('❌ Could not find aiTools array in HTML file');
}
