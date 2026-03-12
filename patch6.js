const fs = require('fs');
const file = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(file, 'utf8');

let oldBlock = `    } else {
        // FILTER APPLIED: Show ALL tools without truncation
        const toolsGrid = document.createElement('div');
        toolsGrid.className = 'row g-4 mb-5';

        // Render ALL tools natively - this might be large, but it's what they asked for
        sortedTools.forEach(function (tool) {
            const toolCard = createToolCard(tool);
            toolsGrid.appendChild(toolCard);
        });

        container.appendChild(toolsGrid);
    }`;

let newBlock = `    } else {
        // FILTER APPLIED: Show ALL tools without truncation
        const toolsGrid = document.createElement('div');
        toolsGrid.className = 'row g-4 mb-5';
        container.appendChild(toolsGrid);

        let currentIndex = 0;
        const chunkSize = 40; // Render 40 tools at a time
        
        function renderNextChunk() {
            const end = Math.min(currentIndex + chunkSize, sortedTools.length);
            for (let i = currentIndex; i < end; i++) {
                const toolCard = createToolCard(sortedTools[i]);
                toolsGrid.appendChild(toolCard);
            }
            currentIndex = end;
        }

        // Initial render
        renderNextChunk();

        // Infinite scroll
        if (currentIndex < sortedTools.length) {
            const sentinel = document.createElement('div');
            sentinel.style.height = '20px';
            sentinel.style.width = '100%';
            container.appendChild(sentinel);

            const observer = new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting) {
                    renderNextChunk();
                    if (currentIndex >= sortedTools.length) {
                        observer.disconnect();
                        sentinel.remove();
                    }
                }
            }, { rootMargin: '400px' }); 
            observer.observe(sentinel);
        }
    }`;

// normalize line endings just in case
let normalizedContent = content.replace(/\r\n/g, '\n');
let normalizedBlock = oldBlock.replace(/\r\n/g, '\n');

if (normalizedContent.indexOf(normalizedBlock) !== -1) {
    let replaced = normalizedContent.replace(normalizedBlock, newBlock);
    fs.writeFileSync(file, replaced, 'utf8');
    console.log("Chunked loading implemented successfully.");
} else {
    console.log("Could not find the exact oldBlock block to replace.");

    // Attempt fallback by matching the function body loosely
    let fallbackRegex = /} else {\s*\/\/ FILTER APPLIED: Show ALL tools without truncation\s*const toolsGrid = document\.createElement\('div'\);\s*toolsGrid\.className = 'row g-4 mb-5';[\s\S]*?container\.appendChild\(toolsGrid\);\s*}/;

    if (fallbackRegex.test(content)) {
        let replaced = content.replace(fallbackRegex, newBlock);
        fs.writeFileSync(file, replaced, 'utf8');
        console.log("Fallback matching logic succeeded.");
    } else {
        console.log("Fallback failed as well.");
    }
}
