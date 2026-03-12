const fs = require('fs');
const file = 'd:\\Yazan Nasser\\FutureGEN\\js\\main.js';
let content = fs.readFileSync(file, 'utf8');

let fixed1 = false;
let fixed2 = false;

// Fix 1: Duplicate showToolDetailsSmart(id); }, true);
let text1 = content.substring(content.indexOf("showToolDetailsSmart"), content.indexOf("showToolDetailsSmart") + 200);

let dup1ToFind = `showToolDetailsSmart(id);
  }, true);
showToolDetailsSmart(id);
  }, true);`;
let dup1ToFindCRLF = "showToolDetailsSmart(id);\r\n  }, true);\r\nshowToolDetailsSmart(id);\r\n  }, true);";

if (content.indexOf(dup1ToFind) !== -1) {
    content = content.replace(dup1ToFind, `showToolDetailsSmart(id);\n  }, true);`);
    fixed1 = true;
} else if (content.indexOf(dup1ToFindCRLF) !== -1) {
    content = content.replace(dup1ToFindCRLF, "showToolDetailsSmart(id);\r\n  }, true);");
    fixed1 = true;
} else {
    // try a more manual approach
    let idx1 = content.indexOf("showToolDetailsSmart(id);\n  }, true);\nshowToolDetailsSmart(id);");
    if (idx1 !== -1) {
        content = content.replace("showToolDetailsSmart(id);\n  }, true);\nshowToolDetailsSmart(id);\n  }, true);", "showToolDetailsSmart(id);\n  }, true);");
        fixed1 = true;
    }
}

// Fix 2: Duplicate }, true); \n }, true); // TRUE = CAPTURE
let dup2ToFind = `}, true);
}, true); // TRUE = CAPTURE PHASE`;
let dup2ToFindCRLF = "}, true);\r\n}, true); // TRUE = CAPTURE PHASE";
let dup2Alt = "  }, true);\n}, true); // TRUE = CAPTURE PHASE";
let dup2AltCRLF = "  }, true);\r\n}, true); // TRUE = CAPTURE PHASE";

if (content.indexOf(dup2ToFind) !== -1) {
    content = content.replace(dup2ToFind, `}, true); // TRUE = CAPTURE PHASE`);
    fixed2 = true;
} else if (content.indexOf(dup2ToFindCRLF) !== -1) {
    content = content.replace(dup2ToFindCRLF, "}, true); // TRUE = CAPTURE PHASE");
    fixed2 = true;
} else if (content.indexOf(dup2Alt) !== -1) {
    content = content.replace(dup2Alt, "  }, true); // TRUE = CAPTURE PHASE");
    fixed2 = true;
} else if (content.indexOf(dup2AltCRLF) !== -1) {
    content = content.replace(dup2AltCRLF, "  }, true); // TRUE = CAPTURE PHASE");
    fixed2 = true;
}

fs.writeFileSync(file, content, 'utf8');
console.log('Patch5 complete. Fixed1:', fixed1, 'Fixed2:', fixed2);
