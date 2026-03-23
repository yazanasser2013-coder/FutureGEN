const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'js', 'main.js');
let content = fs.readFileSync(targetFile, 'utf8');

content = content.replace(
  /(\/\/ محاكاة تسجيل الدخول\s*const user = {\s*isLoggedIn: true,\s*loginTime: new Date\(\)\.toISOString\(\)\s*};)/,
  `// محاكاة تسجيل الدخول\n    const user = {\n      isLoggedIn: true,\n      email: email,\n      loginTime: new Date().toISOString()\n    };`
);

content = content.replace(
  /(\/\/ محاكاة إنشاء حساب ناجح\s*const user = {\s*isLoggedIn: true,\s*loginTime: new Date\(\)\.toISOString\(\)\s*};)/,
  `// محاكاة إنشاء حساب ناجح\n  const user = {\n    isLoggedIn: true,\n    email: email,\n    loginTime: new Date().toISOString()\n  };`
);

fs.writeFileSync(targetFile, content);
console.log('Patched main.js successfully');
