/*
  SMART FIXES (Search + Details)
  Drop-in patch: include this script AFTER your main app scripts on every page.

  What it fixes:
  1) Prefix search: typing "E" shows tools whose names start with "E".
  2) Details button: uses event delegation so it keeps working after any re-render.

  Compatibility notes:
  - Works best when your app exposes:
      window.aiTools (Array) and window.createToolCard(tool) (Function)
      window.openToolModal(idOrTool) (Function)
  - If those globals don't exist, it falls back to DOM-only filtering and a basic details fallback.
*/

