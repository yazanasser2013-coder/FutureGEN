const fs = require('fs');
const file = 'd:/Yazan Nasser/FutureGEN/js/main.js';
let content = fs.readFileSync(file, 'utf8');

// ===== PATCH 1: Fix the fallback card to include stars + favorites =====
// Replace the bare catch block that renders a stripped-down fallback card
const oldCatch = `      } catch (e) {
        // If original throws, fallback minimal card (keeps site alive)
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';
        col.innerHTML = \`
          <div class="card tool-card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">\${toolName(tool) || 'Tool'}</h5>
              <div class="mt-auto" style="direction: ltr !important; text-align: left !important;">
                <button class="btn btn-outline-primary btn-sm view-details-btn" data-tool-id="\${idx}">Details</button>
              </div>
            </div>
          </div>\`;
        card = col;
      }`;

const newCatch = `      } catch (e) {
        console.error('❌ createToolCard original threw:', e);
        // Render full card with stars + favorites as fallback
        var _isAr = (localStorage.getItem('lang') === 'ar');
        var _desc = _isAr ? (tool.desc_ar || tool.description || '') : (tool.description || '');
        var _visitText = _isAr ? 'زيارة الموقع' : 'Visit Website';
        var _detailsText = _isAr ? 'التفاصيل' : 'Details';
        var _favActive = false;
        try { _favActive = (typeof isFavoriteIndex === 'function') ? isFavoriteIndex(idx) : false; } catch(_) {}
        var _starHtml = '';
        try { _starHtml = (typeof generateStars === 'function') ? generateStars(idx) : ''; } catch(_) {}
        
        const col = document.createElement('div');
        col.className = 'col-xl-4 col-lg-6 mb-4';
        col.dataset.toolId = idx;
        col.innerHTML = '<div class="card tool-card h-100">' +
          '<div class="card-img-top position-relative">' +
          '<img src="' + (tool.logo || '') + '" class="card-img-top" alt="' + (tool.name || '') + '" ' +
          'style="height: 200px; object-fit: contain; padding: 20px;" ' +
          "onerror=\\"this.src='./Images/placeholder-logo.png'\\">" +
          '<button class="btn btn-sm favorite-toggle position-absolute top-0 end-0 m-2 ' + (_favActive ? 'active' : '') + '" ' +
          'data-tool-index="' + idx + '">' +
          '<i class="' + (_favActive ? 'fas' : 'far') + ' fa-heart" style="color: ' + (_favActive ? '#f4cf55' : '#ffffff') + '"></i>' +
          '</button>' +
          '</div>' +
          '<div class="card-body d-flex flex-column">' +
          '<div class="d-flex justify-content-between align-items-start mb-1">' +
          '<h5 class="card-title">' + (tool.name || '') + '</h5>' +
          '<span class="badge bg-primary">' + (tool.pricing || '') + '</span>' +
          '</div>' +
          '<div class="mb-2">' + _starHtml + '</div>' +
          '<p class="card-text flex-grow-1">' + (_desc || '') + '</p>' +
          '<div class="mt-auto" style="direction: ltr !important; text-align: left !important;">' +
          '<span class="badge bg-secondary mb-2">' + (tool.category || '') + '</span>' +
          '<div class="d-flex gap-2">' +
          '<a href="' + (tool.url || '#') + '" class="btn btn-primary btn-sm" target="_blank" rel="noopener">' +
          '<i class="fas fa-external-link-alt me-1"></i>' + _visitText + '</a>' +
          '<button class="btn btn-outline-primary btn-sm view-details-btn" data-tool-id="' + idx + '">' +
          '<i class="fas fa-info-circle me-1"></i>' + _detailsText + '</button>' +
          '</div></div></div></div>';
        card = col;
      }`;

if (content.includes(oldCatch)) {
  content = content.replace(oldCatch, newCatch);
  fs.writeFileSync(file, content);
  console.log('✅ Successfully patched fallback card to include stars + favorites.');
} else {
  console.log('❌ Could not find the old catch block. Trying alternate approach...');
  
  // Try a simpler match
  const simpleOld = `} catch (e) {
        // If original throws, fallback minimal card (keeps site alive)`;
  const idx = content.indexOf(simpleOld);
  if (idx !== -1) {
    console.log('Found catch block at index:', idx);
    // Find the end of the catch block
    let braceCount = 0;
    let start = idx;
    let i = idx;
    // Find the opening { of catch
    while (i < content.length && content[i] !== '{') i++;
    braceCount = 1;
    i++;
    while (i < content.length && braceCount > 0) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      i++;
    }
    const oldBlock = content.substring(idx, i);
    console.log('Old block length:', oldBlock.length);
    console.log('Old block preview:', oldBlock.substring(0, 100));

    content = content.substring(0, idx) + newCatch.substring(newCatch.indexOf('} catch')) + content.substring(i);
    fs.writeFileSync(file, content);
    console.log('✅ Successfully patched fallback card (alternate approach).');
  } else {
    console.log('❌ Could not find catch block at all.');
  }
}
