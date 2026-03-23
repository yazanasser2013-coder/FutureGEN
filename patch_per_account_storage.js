/**
 * PATCH: Per-Account Storage System
 * 
 * Fixes:
 * 1. Adds _getUserKey() function so each account gets isolated favorites
 * 2. Fixes handleSignup to register accounts and initialize empty storage
 * 3. Fixes handleLogin to verify against registered accounts  
 * 4. Removes rogue auto-login code that overwrites user session
 * 5. Fixes handleLogout to preserve per-user data
 */

const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, 'js', 'main.js');
let content = fs.readFileSync(mainPath, 'utf8');
let changeCount = 0;

// =====================================================================
// 1. Replace handleLogin to verify against registered accounts
// =====================================================================
const oldHandleLogin = `function handleLogin(e) {
  e.preventDefault();
  const emailEl = document.getElementById('loginEmail');
  const passEl = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');

  if (!emailEl || !passEl) {
    showToast('Internal error: login elements not found', 'error');
    return;
  }

  const email = emailEl.value.trim();
  const password = passEl.value;

  if (!email || !password) {
    showAlert(currentLang === 'en' ? 'Please fill in all fields' : '\u064a\u0631\u062c\u0649 \u0645\u0644\u0621 \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0644', 'error', 'loginError');
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert(currentLang === 'en' ? 'Please enter a valid email' : '\u064a\u0631\u062c\u0649 \u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u0627\u0644\u062d', 'error', 'loginError');
    return;
  }

  // Simulate authentication (replace with real API call as needed)
  // Temporarily disable submit to prevent double submissions
  const submitBtn = e.target.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  const user = {
    name: email.split('@')[0],
    email: email,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };

  // Save persistent preference if rememberMe is checked
  const remember = document.getElementById('rememberMe') && document.getElementById('rememberMe').checked;
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (!remember) {
      // store session-only by also storing fallback (no strong session API here)
      sessionStorage.setItem('currentUser_session', JSON.stringify(user));
    }
  } catch (err) {
    console.warn('Local storage write failed', err);
  }

  showAlert(currentLang === 'en' ? 'Login successful!' : '\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0646\u062c\u0627\u062d!', 'success', 'loginError');

  setTimeout(() => {
    if (authModalInstance) authModalInstance.hide();
    updateUserInterface();
  }, 700);
}`;

const newHandleLogin = `function handleLogin(e) {
  e.preventDefault();
  const emailEl = document.getElementById('loginEmail');
  const passEl = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');

  if (!emailEl || !passEl) {
    showToast('Internal error: login elements not found', 'error');
    return;
  }

  const email = emailEl.value.trim().toLowerCase();
  const password = passEl.value;

  if (!email || !password) {
    showAlert(currentLang === 'en' ? 'Please fill in all fields' : '\\u064a\\u0631\\u062c\\u0649 \\u0645\\u0644\\u0621 \\u062c\\u0645\\u064a\\u0639 \\u0627\\u0644\\u062d\\u0642\\u0648\\u0644', 'error', 'loginError');
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert(currentLang === 'en' ? 'Please enter a valid email' : '\\u064a\\u0631\\u062c\\u0649 \\u0625\\u062f\\u062e\\u0627\\u0644 \\u0628\\u0631\\u064a\\u062f \\u0625\\u0644\\u0643\\u062a\\u0631\\u0648\\u0646\\u064a \\u0635\\u0627\\u0644\\u062d', 'error', 'loginError');
    return;
  }

  // Temporarily disable submit to prevent double submissions
  const submitBtn = e.target.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  // Check against registered accounts
  var registeredAccounts = {};
  try { registeredAccounts = JSON.parse(localStorage.getItem('registeredAccounts') || '{}'); } catch(ex) { registeredAccounts = {}; }

  var accountData = registeredAccounts[email];
  if (!accountData) {
    showAlert(currentLang === 'en' ? 'Account not found. Please sign up first.' : '\\u0627\\u0644\\u062d\\u0633\\u0627\\u0628 \\u063a\\u064a\\u0631 \\u0645\\u0648\\u062c\\u0648\\u062f. \\u064a\\u0631\\u062c\\u0649 \\u0627\\u0644\\u062a\\u0633\\u062c\\u064a\\u0644 \\u0623\\u0648\\u0644\\u0627\\u064b.', 'error', 'loginError');
    if (submitBtn) submitBtn.disabled = false;
    return;
  }

  if (accountData.password !== password) {
    showAlert(currentLang === 'en' ? 'Incorrect password' : '\\u0643\\u0644\\u0645\\u0629 \\u0627\\u0644\\u0645\\u0631\\u0648\\u0631 \\u063a\\u064a\\u0631 \\u0635\\u062d\\u064a\\u062d\\u0629', 'error', 'loginError');
    if (submitBtn) submitBtn.disabled = false;
    return;
  }

  const user = {
    name: accountData.name || email.split('@')[0],
    email: email,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };

  // Save persistent preference if rememberMe is checked
  const remember = document.getElementById('rememberMe') && document.getElementById('rememberMe').checked;
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (!remember) {
      sessionStorage.setItem('currentUser_session', JSON.stringify(user));
    }
  } catch (err) {
    console.warn('Local storage write failed', err);
  }

  showAlert(currentLang === 'en' ? 'Login successful!' : '\\u062a\\u0645 \\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062f\\u062e\\u0648\\u0644 \\u0628\\u0646\\u062c\\u0627\\u062d!', 'success', 'loginError');

  // Refresh all favorite buttons with this user's data
  updateAllFavoriteButtons();

  setTimeout(() => {
    if (authModalInstance) authModalInstance.hide();
    updateUserInterface();
  }, 700);
}`;

if (content.includes(oldHandleLogin)) {
  content = content.replace(oldHandleLogin, newHandleLogin);
  changeCount++;
  console.log('✅ 1. Patched handleLogin to verify against registered accounts');
} else {
  console.log('⚠️ 1. Could not find handleLogin to patch');
}

// =====================================================================
// 2. Replace handleSignup to register accounts + init empty storage
// =====================================================================
const oldHandleSignup = `function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName') && document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail') && document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword') && document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword') && document.getElementById('confirmPassword').value;

  if (!name || !email || !password || !confirmPassword) {
    showAlert(currentLang === 'en' ? 'Please fill in all fields' : '\u064a\u0631\u062c\u0649 \u0645\u0644\u0621 \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0644', 'error', 'signupError');
    return;
  }

  if (password !== confirmPassword) {
    showAlert(currentLang === 'en' ? 'Passwords do not match' : '\u0643\u0644\u0645\u0627\u062a \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0645\u062a\u0637\u0627\u0628\u0642\u0629', 'error', 'signupError');
    return;
  }

  // Basic email check
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert(currentLang === 'en' ? 'Please enter a valid email' : '\u064a\u0631\u062c\u0649 \u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u0627\u0644\u062d', 'error', 'signupError');
    return;
  }

  // simulate account creation
  const user = {
    name: name,
    email: email,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };

  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (err) {
    console.warn('Local storage write failed', err);
  }

  showAlert(currentLang === 'en' ? 'Account created successfully!' : '\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628 \u0628\u0646\u062c\u0627\u062d!', 'success', 'signupSuccess');

  setTimeout(() => {
    if (authModalInstance) authModalInstance.hide();
    updateUserInterface();
  }, 700);
}`;

const newHandleSignup = `function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName') && document.getElementById('signupName').value.trim();
  const emailRaw = document.getElementById('signupEmail') && document.getElementById('signupEmail').value.trim();
  const email = emailRaw ? emailRaw.toLowerCase() : '';
  const password = document.getElementById('signupPassword') && document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword') && document.getElementById('confirmPassword').value;

  if (!name || !email || !password || !confirmPassword) {
    showAlert(currentLang === 'en' ? 'Please fill in all fields' : '\\u064a\\u0631\\u062c\\u0649 \\u0645\\u0644\\u0621 \\u062c\\u0645\\u064a\\u0639 \\u0627\\u0644\\u062d\\u0642\\u0648\\u0644', 'error', 'signupError');
    return;
  }

  if (password !== confirmPassword) {
    showAlert(currentLang === 'en' ? 'Passwords do not match' : '\\u0643\\u0644\\u0645\\u0627\\u062a \\u0627\\u0644\\u0645\\u0631\\u0648\\u0631 \\u063a\\u064a\\u0631 \\u0645\\u062a\\u0637\\u0627\\u0628\\u0642\\u0629', 'error', 'signupError');
    return;
  }

  // Basic email check
  const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert(currentLang === 'en' ? 'Please enter a valid email' : '\\u064a\\u0631\\u062c\\u0649 \\u0625\\u062f\\u062e\\u0627\\u0644 \\u0628\\u0631\\u064a\\u062f \\u0625\\u0644\\u0643\\u062a\\u0631\\u0648\\u0646\\u064a \\u0635\\u0627\\u0644\\u062d', 'error', 'signupError');
    return;
  }

  // Check if account already exists
  var registeredAccounts = {};
  try { registeredAccounts = JSON.parse(localStorage.getItem('registeredAccounts') || '{}'); } catch(ex) { registeredAccounts = {}; }

  if (registeredAccounts[email]) {
    showAlert(currentLang === 'en' ? 'An account with this email already exists. Please login.' : '\\u064a\\u0648\\u062c\\u062f \\u062d\\u0633\\u0627\\u0628 \\u0628\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0628\\u0631\\u064a\\u062f \\u0627\\u0644\\u0625\\u0644\\u0643\\u062a\\u0631\\u0648\\u0646\\u064a \\u0628\\u0627\\u0644\\u0641\\u0639\\u0644. \\u064a\\u0631\\u062c\\u0649 \\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062f\\u062e\\u0648\\u0644.', 'error', 'signupError');
    return;
  }

  // Register the new account
  registeredAccounts[email] = {
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem('registeredAccounts', JSON.stringify(registeredAccounts));

  // Initialize EMPTY favorites for this new user
  localStorage.setItem('favorites_' + email, JSON.stringify([]));

  // Log the new user in
  const user = {
    name: name,
    email: email,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };

  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (err) {
    console.warn('Local storage write failed', err);
  }

  showAlert(currentLang === 'en' ? 'Account created successfully!' : '\\u062a\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0627\\u0644\\u062d\\u0633\\u0627\\u0628 \\u0628\\u0646\\u062c\\u0627\\u062d!', 'success', 'signupSuccess');

  // Refresh all favorite buttons with empty data for new user
  updateAllFavoriteButtons();

  setTimeout(() => {
    if (authModalInstance) authModalInstance.hide();
    updateUserInterface();
  }, 700);
}`;

if (content.includes(oldHandleSignup)) {
  content = content.replace(oldHandleSignup, newHandleSignup);
  changeCount++;
  console.log('✅ 2. Patched handleSignup to register accounts + init empty favorites');
} else {
  console.log('⚠️ 2. Could not find handleSignup to patch');
}

// =====================================================================
// 3. Fix first handleLogout (line ~139823)
// =====================================================================
const oldLogout1 = `function handleLogout() {
  // Clear stored user data (both local and session)
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser_session');
  updateUserInterface();
  showToast(currentLang === 'en' ? 'Logged out successfully' : '\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c \u0628\u0646\u062c\u0627\u062d', 'success');
}`;

const newLogout = `function handleLogout() {
  // Clear current session WITHOUT deleting per-user favorites
  // The user's favorites remain in localStorage under 'favorites_<email>'
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser_session');
  updateUserInterface();
  updateAllFavoriteButtons();
  showToast(currentLang === 'en' ? 'Logged out successfully' : '\\u062a\\u0645 \\u062a\\u0633\\u062c\\u064a\\u0644 \\u0627\\u0644\\u062e\\u0631\\u0648\\u062c \\u0628\\u0646\\u062c\\u0627\\u062d', 'success');
}`;

if (content.includes(oldLogout1)) {
  content = content.replace(oldLogout1, newLogout);
  changeCount++;
  console.log('✅ 3. Patched first handleLogout');
} else {
  console.log('⚠️ 3. Could not find first handleLogout to patch');
}

// =====================================================================
// 4. Remove rogue auto-login code
// =====================================================================
const rogueCode = `// \u0645\u062d\u0627\u0643\u0627\u0629 \u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628 \u0646\u0627\u062c\u062d
const user = {
  isLoggedIn: true,
  loginTime: new Date().toISOString()
};

localStorage.setItem('currentUser', JSON.stringify(user));

showAlert(currentLang === 'en' ? 'Account created successfully!' : '\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628 \u0628\u0646\u062c\u0627\u062d!', 'success', 'signupSuccess');

setTimeout(() => {
  const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
  if (authModal) authModal.hide();
  updateUserInterface();
  document.getElementById('signupForm').reset();
}, 1500);`;

if (content.includes(rogueCode)) {
  content = content.replace(rogueCode, '// (Rogue auto-login code removed — accounts are now properly managed)');
  changeCount++;
  console.log('✅ 4. Removed rogue auto-login code');
} else {
  console.log('⚠️ 4. Could not find rogue auto-login code');
}

// =====================================================================
// 5. Remove duplicate handleLogout (line ~139895)
// =====================================================================
const oldLogout2 = `function handleLogout() {
  localStorage.removeItem('currentUser');
  updateUserInterface();

  showToast(
    currentLang === 'en' ? 'Logged out successfully' : '\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c \u0628\u0646\u062c\u0627\u062d',
    'success'
  );
}`;

if (content.includes(oldLogout2)) {
  content = content.replace(oldLogout2, '// (Duplicate handleLogout removed — using the one above)');
  changeCount++;
  console.log('✅ 5. Removed duplicate handleLogout');
} else {
  console.log('⚠️ 5. Could not find duplicate handleLogout');
}

// =====================================================================
// 6. Add _getUserKey() function before getFavoritesArray
// =====================================================================
const oldFavSection = `// =================================================================================
// FAVORITES - Per-Account Unified Storage
// =================================================================================

function getFavoritesArray() {`;

const newFavSection = `// =================================================================================
// FAVORITES - Per-Account Unified Storage
// =================================================================================

// Returns the current user's email as storage key, or 'guest' if not logged in
function _getUserKey() {
  try {
    var userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData && userData.isLoggedIn && userData.email) {
      return userData.email.toLowerCase();
    }
  } catch (e) {}
  return 'guest';
}

function getFavoritesArray() {`;

if (content.includes(oldFavSection)) {
  content = content.replace(oldFavSection, newFavSection);
  changeCount++;
  console.log('✅ 6. Added _getUserKey() function');
} else {
  console.log('⚠️ 6. Could not find favorites section to add _getUserKey');
}

// =====================================================================
// Write patched file
// =====================================================================
if (changeCount > 0) {
  fs.writeFileSync(mainPath, content, 'utf8');
  console.log(`\n🎉 Successfully applied ${changeCount}/6 patches to main.js`);
  console.log('\nChanges summary:');
  console.log('  - handleLogin now verifies against registered accounts');
  console.log('  - handleSignup registers accounts and initializes EMPTY favorites');
  console.log('  - _getUserKey() added to isolate favorites per user email');
  console.log('  - Rogue auto-login code removed');
  console.log('  - Duplicate handleLogout removed');
  console.log('  - Logout preserves per-user favorites in storage');
} else {
  console.log('❌ No patches applied. The file may have already been patched or the code has changed.');
}
