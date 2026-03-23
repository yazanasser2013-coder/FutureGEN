$path = "d:\Yazan Nasser\FutureGEN\js\main.js"
$text = [IO.File]::ReadAllText($path)

$oldLogin = @"
function getUserRating(toolIndex) {
  var key = 'ratings_' + _getUserKey();
  try {
    var data = JSON.parse(localStorage.getItem(key));
    if (data && typeof data === 'object') return data[toolIndex] || 0;
  } catch (e) { }
  return 0;
}

// Save a user's rating for a specific tool index   
function saveUserRating(toolIndex, rating) {        
  var key = 'ratings_' + _getUserKey();
  var data = {};
  try { data = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { }
  data[toolIndex] = rating;
  localStorage.setItem(key, JSON.stringify(data));  
}
"@

$newLogin = @"
window.globalRatings = {};

function getUserRating(toolIndex) {
  if (window.globalRatings && window.globalRatings[toolIndex]) {
    var toolData = window.globalRatings[toolIndex];
    if (toolData.count > 0) {
      return Math.round(toolData.sum / toolData.count);
    }
  }
  var key = 'ratings_' + _getUserKey();
  try {
    var data = JSON.parse(localStorage.getItem(key));
    if (data && typeof data === 'object') return data[toolIndex] || 0;
  } catch (e) { }
  return 0;
}

if(window.firebaseDB) {
  window.firebaseDB.ref('ratings').on('value', function(snap) {
    window.globalRatings = snap.val() || {};
    // Re-render UI
    document.querySelectorAll('.interactive-stars').forEach(function(container) {
      var toolIdx = container.dataset.toolIdx;
      var stars = container.querySelectorAll('.star-click');
      var r = getUserRating(toolIdx);
      stars.forEach(function(s) {
        var sv = parseInt(s.dataset.star);
        if (sv <= r) {
           s.classList.remove('far'); s.classList.add('fas'); s.style.color = '#f4cf55';
        } else {
           s.classList.remove('fas'); s.classList.add('far'); s.style.color = '#ccc';
        }
      });
    });
  });
}

function saveUserRating(toolIndex, rating) {        
  var key = 'ratings_' + _getUserKey();
  var data = {};
  try { data = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { }
  var oldRating = data[toolIndex] || 0;
  data[toolIndex] = rating;
  localStorage.setItem(key, JSON.stringify(data));

  var diff = rating - oldRating;
  var countDiff = oldRating === 0 ? 1 : 0;
  
  if (window.firebaseDB && (diff !== 0 || countDiff !== 0)) {
    var ref = window.firebaseDB.ref('ratings/' + toolIndex);
    ref.transaction(function(current) {
       if (!current) { return { sum: diff, count: countDiff }; }
       return { sum: (current.sum || 0) + diff, count: (current.count || 0) + countDiff };
    });
  }
}
"@

$text = $text.Replace($oldLogin, $newLogin)

[IO.File]::WriteAllText($path, $text)
Write-Host "Patched Ratings in main.js"

$indexPath = "d:\Yazan Nasser\FutureGEN\index.html"
$indexText = [IO.File]::ReadAllText($indexPath)
$oldIndex = '<script src="./js/main.js?v=7"></script>'
$newIndex = '<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-database-compat.js"></script>
  <script src="./firebase.js"></script>
  <script src="./js/main.js?v=7"></script>'
$indexText = $indexText.Replace($oldIndex, $newIndex)

[IO.File]::WriteAllText($indexPath, $indexText)
Write-Host "Patched index.html"
