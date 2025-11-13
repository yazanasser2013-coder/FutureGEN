// =================================================================================
// DATA
// =================================================================================

const aiTools = [
  {
    "name": "Copy.ai",
    "url": "https://www.copy.ai",
    "category": "AI Writing",
    "description": "AI-powered copywriting tool for various content needs",
    "description_ar": "أداة كتابة إعلانية بالذكاء الاصطناعي لاحتياجات المحتوى المختلفة",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68edde76f2a474aa4014e148_docs-image.jpeg",
    "icon": "fa-file-text",
    "featured": false,
    "tags": [
      "copywriting",
      "marketing",
      "content"
    ]
  },
  {
    "name": "Writesonic",
    "url": "https://writesonic.com",
    "category": "AI Writing",
    "description": "AI writing tool for blogs, ads, and marketing content",
    "description_ar": "أداة كتابة بالذكاء الاصطناعي للمدونات والإعلانات والمحتوى التسويقي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e46abc24723bebdbe1e7ce_Image-MetaHub.png",
    "icon": "fa-file-text",
    "featured": false,
    "tags": [
      "blogging",
      "content",
      "marketing"
    ]
  },
  {
    "name": "Anyword",
    "url": "https://anyword.com",
    "category": "AI Writing",
    "description": "AI copywriting with performance prediction",
    "description_ar": "كتابة إعلانية بالذكاء الاصطناعي مع توقع الأداء",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dc104f7b6ef3f24429ee88_feature-image.png",
    "icon": "fa-file-text",
    "featured": false,
    "tags": [
      "copywriting",
      "prediction",
      "marketing"
    ]
  },
  {
    "name": "Grammarly",
    "url": "https://www.grammarly.com",
    "category": "AI Writing",
    "description": "AI writing assistant for grammar and style improvement",
    "description_ar": "مساعد الكتابة بالذكاء الاصطناعي لتحسين القواعد والأسلوب",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68de8e837616b61aa1705a04_form3d-io-logo.png",
    "icon": "fa-file-text",
    "featured": true,
    "tags": [
      "grammar",
      "editing",
      "proofreading"
    ]
  },
  {
    "name": "Claude",
    "url": "https://claude.ai",
    "category": "AI Writing",
    "description": "AI assistant for writing and content creation",
    "description_ar": "مساعد الذكاء الاصطناعي للكتابة وإنشاء المحتوى",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68df2f1723c929c9c738d2d6_sculptor-announce-og-image.png",
    "icon": "fa-file-text",
    "featured": true,
    "tags": [
      "writing",
      "assistant",
      "content"
    ]
  },
  {
    "name": "Wordtune",
    "url": "https://www.wordtune.com",
    "category": "AI Writing",
    "description": "AI writing assistant for rewriting and improving sentences",
    "description_ar": "مساعد الكتابة بالذكاء الاصطناعي لإعادة الصياغة وتحسين الجمل",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dc104ed0a4babbffe58f99_Blobu_Preview.jpeg",
    "icon": "fa-file-text",
    "featured": false,
    "tags": [
      "rewriting",
      "sentences",
      "improvement"
    ]
  },
  {
    "name": "QuillBot",
    "url": "https://quillbot.com",
    "category": "AI Writing",
    "description": "AI paraphrasing and grammar checking tool",
    "description_ar": "أداة إعادة الصياغة والتحقق من القواعد بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d424f4b19c15481aa21a4c_animant-co-logo.png",
    "icon": "fa-file-text",
    "featured": false,
    "tags": [
      "paraphrasing",
      "grammar",
      "rewriting"
    ]
  },
  {
    "name": "Rytr",
    "url": "https://rytr.me",
    "category": "AI Writing",
    "description": "AI writing assistant for various content types",
    "description_ar": "مساعد الكتابة بالذكاء الاصطناعي لأنواع المحتوى المختلفة",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dd8f770fd065a2e247ca67_1200x630wa.png",
    "icon": "fa-file-text",
    "featured": false,
    "tags": [
      "writing",
      "content",
      "assistant"
    ]
  },
  {
    "name": "Midjourney",
    "url": "https://www.midjourney.com",
    "category": "Image Generation",
    "description": "AI image generation through Discord",
    "description_ar": "توليد الصور بالذكاء الاصطناعي عبر ديسكورد",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e52afce3154ac3d308ea32_sonant-ai-logo.png",
    "icon": "fa-image",
    "featured": true,
    "tags": [
      "art",
      "generation",
      "discord"
    ]
  },
  {
    "name": "DALL-E 3",
    "url": "https://openai.com/dall-e-3",
    "category": "Image Generation",
    "description": "Advanced AI image generation from text prompts",
    "description_ar": "توليد الصور المتقدم بالذكاء الاصطناعي من النصوص",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d6f0262c634602cc1ff459_voicedrop_ringless_voicemail_sharing.png",
    "icon": "fa-image",
    "featured": true,
    "tags": [
      "generation",
      "openai",
      "art"
    ]
  },
  {
    "name": "Stable Diffusion",
    "url": "https://stability.ai",
    "category": "Image Generation",
    "description": "Open-source AI image generation model",
    "description_ar": "نموذج مفتوح المصدر لتوليد الصور بالذكاء الاصطناعي",
    "pricing": "Free",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d2b6a71d932c62d24f7351_usecrossfade-com-logo.png",
    "icon": "fa-image",
    "featured": false,
    "tags": [
      "open-source",
      "generation",
      "art"
    ]
  },
  {
    "name": "Leonardo AI",
    "url": "https://leonardo.ai",
    "category": "Image Generation",
    "description": "AI art generation platform with various styles",
    "description_ar": "منصة توليد الفن بالذكاء الاصطناعي بأنماط متنوعة",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/63ac7f7e7960f22b5bbc976f_Frame-481794-1.png",
    "icon": "fa-image",
    "featured": false,
    "tags": [
      "art",
      "styles",
      "platform"
    ]
  },
  {
    "name": "Runway ML",
    "url": "https://runwayml.com",
    "category": "Image Generation",
    "description": "Creative suite for AI-powered image and video generation",
    "description_ar": "مجموعة أدوات إبداعية لتوليد الصور والفيديو بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68edde76dad56b56103beae3_og_image_v3.png",
    "icon": "fa-image",
    "featured": true,
    "tags": [
      "creative",
      "video",
      "generation"
    ]
  },
  {
    "name": "Canva AI",
    "url": "https://www.canva.com/ai",
    "category": "Image Generation",
    "description": "AI design tools integrated in Canva platform",
    "description_ar": "أدوات التصميم بالذكاء الاصطناعي المدمجة في منصة Canva",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68df2f1ede305bda00eb1338_opengraph-image.png",
    "icon": "fa-image",
    "featured": false,
    "tags": [
      "design",
      "platform",
      "tools"
    ]
  },
  {
    "name": "Adobe Firefly",
    "url": "https://www.adobe.com/firefly",
    "category": "Image Generation",
    "description": "AI image generation from Adobe Creative Cloud",
    "description_ar": "توليد الصور بالذكاء الاصطناعي من أدوبي كرييتيف كلاود",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d5c9d0821d5f8b57a5153e_og.png",
    "icon": "fa-image",
    "featured": true,
    "tags": [
      "adobe",
      "creative",
      "generation"
    ]
  },
  {
    "name": "Clipdrop",
    "url": "https://clipdrop.co",
    "category": "Image Generation",
    "description": "AI image editing and generation tool",
    "description_ar": "أداة تحرير وتوليد الصور بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d5c9cfcda65ee84a57d81f_social-preview.png",
    "icon": "fa-image",
    "featured": false,
    "tags": [
      "editing",
      "generation",
      "tools"
    ]
  },
  {
    "name": "DreamStudio",
    "url": "https://dreamstudio.ai",
    "category": "Image Generation",
    "description": "Stable Diffusion web interface for image generation",
    "description_ar": "واجهة ويب Stable Diffusion لتوليد الصور",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68c8ccf98e506b77a127195e_KHTHwxPP510RKYCYArtpGBKf4k.png",
    "icon": "fa-image",
    "featured": false,
    "tags": [
      "stable-diffusion",
      "generation",
      "web"
    ]
  },
  {
    "name": "NightCafe",
    "url": "https://nightcafe.studio",
    "category": "Image Generation",
    "description": "AI art generator with multiple models",
    "description_ar": "مولد الفن بالذكاء الاصطناعي بنماذج متعددة",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68c1ce6224f29d8a802ed44b_og_image.png",
    "icon": "fa-image",
    "featured": false,
    "tags": [
      "art",
      "generation",
      "multiple-models"
    ]
  },
  {
    "name": "Synthesia",
    "url": "https://www.synthesia.io",
    "category": "Video Creation",
    "description": "AI video generation with virtual avatars",
    "description_ar": "توليد الفيديو بالذكاء الاصطناعي مع أفتار افتراضية",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68c46a0c23864f3697a114d5_og_image.png",
    "icon": "fa-video",
    "featured": true,
    "tags": [
      "avatars",
      "generation",
      "virtual"
    ]
  },
  {
    "name": "Runway",
    "url": "https://runwayml.com",
    "category": "Video Creation",
    "description": "AI video editing and generation platform",
    "description_ar": "منصة تحرير وتوليد الفيديو بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68ee56f9374d8b463ce80327_updaytr-com-logo.png",
    "icon": "fa-video",
    "featured": true,
    "tags": [
      "editing",
      "generation",
      "platform"
    ]
  },
  {
    "name": "Pika Labs",
    "url": "https://www.pika.art",
    "category": "Video Creation",
    "description": "AI video generation from text and images",
    "description_ar": "توليد الفيديو بالذكاء الاصطناعي من النصوص والصور",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68ea83db975cda28b5100db2_luboolabs-com-logo.png",
    "icon": "fa-video",
    "featured": false,
    "tags": [
      "generation",
      "text-to-video",
      "art"
    ]
  },
  {
    "name": "HeyGen",
    "url": "https://www.heygen.com",
    "category": "Video Creation",
    "description": "AI avatar video creation for presentations",
    "description_ar": "إنشاء فيديو بأفتار بالذكاء الاصطناعي للعروض التقديمية",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68ea833f13d7d93b0f2d1dd1_cloudagent-io-logo.png",
    "icon": "fa-video",
    "featured": false,
    "tags": [
      "avatars",
      "presentations",
      "business"
    ]
  },
  {
    "name": "InVideo",
    "url": "https://invideo.io",
    "category": "Video Creation",
    "description": "AI-powered video creation platform",
    "description_ar": "منصة إنشاء الفيديو بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e2a020286bc86fcc4aedcd_everyday-new-logo.png",
    "icon": "fa-video",
    "featured": false,
    "tags": [
      "creation",
      "platform",
      "editing"
    ]
  },
  {
    "name": "Luma Dream Machine",
    "url": "https://lumalabs.ai",
    "category": "Video Creation",
    "description": "AI video generation from text prompts",
    "description_ar": "توليد الفيديو بالذكاء الاصطناعي من النصوص",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68daafe75873dd68676a5f1c_sprinto-com-logo.png",
    "icon": "fa-video",
    "featured": true,
    "tags": [
      "generation",
      "text-to-video",
      "dream"
    ]
  },
  {
    "name": "Descript",
    "url": "https://www.descript.com",
    "category": "Video Creation",
    "description": "AI video and audio editing platform",
    "description_ar": "منصة تحرير الفيديو والصوت بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d2eb82274cc39f39b18d5c_workbeaver-social-card.jpeg",
    "icon": "fa-video",
    "featured": false,
    "tags": [
      "editing",
      "audio",
      "platform"
    ]
  },
  {
    "name": "Fliki",
    "url": "https://fliki.ai",
    "category": "Video Creation",
    "description": "AI video creation from text content",
    "description_ar": "إنشاء الفيديو بالذكاء الاصطناعي من المحتوى النصي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e90a474bf37390fc43722e_trackboxx-com-logo.png",
    "icon": "fa-video",
    "featured": false,
    "tags": [
      "creation",
      "text-to-video",
      "content"
    ]
  },
  {
    "name": "Pictory",
    "url": "https://pictory.ai",
    "category": "Video Creation",
    "description": "AI video creation from text and scripts",
    "description_ar": "إنشاء الفيديو بالذكاء الاصطناعي من النصوص والنصوص البرمجية",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e46abae1793a38fb533905_og-image.png",
    "icon": "fa-video",
    "featured": false,
    "tags": [
      "creation",
      "text-to-video",
      "scripts"
    ]
  },
  {
    "name": "Steve AI",
    "url": "https://www.steve.ai",
    "category": "Video Creation",
    "description": "AI video maker for content creation",
    "description_ar": "صانع الفيديو بالذكاء الاصطناعي لإنشاء المحتوى",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e46ab8e1793a38fb5337b6_DealerAI-website-social-preview-graphic.webp",
    "icon": "fa-video",
    "featured": false,
    "tags": [
      "maker",
      "content",
      "creation"
    ]
  },
  {
    "name": "Murf AI",
    "url": "https://murf.ai",
    "category": "Audio & Music",
    "description": "AI voice generator with realistic voices",
    "description_ar": "مولد الأصوات بالذكاء الاصطناعي بأصوات واقعية",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e46ab9e1793a38fb533875_social_logo_share.png",
    "icon": "fa-music",
    "featured": true,
    "tags": [
      "voice",
      "generation",
      "realistic"
    ]
  },
  {
    "name": "Suno AI",
    "url": "https://suno.ai",
    "category": "Audio & Music",
    "description": "AI music generation from text prompts",
    "description_ar": "توليد الموسيقى بالذكاء الاصطناعي من النصوص",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d2ae1d243ba43deea18b9c_signalshq-io-logo.png",
    "icon": "fa-music",
    "featured": true,
    "tags": [
      "music",
      "generation",
      "text-to-music"
    ]
  },
  {
    "name": "ElevenLabs",
    "url": "https://elevenlabs.io",
    "category": "Audio & Music",
    "description": "AI voice generation and text-to-speech",
    "description_ar": "توليد الأصوات وتحويل النص إلى كلام بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e67a6d37232662223e7b40_experimently-io-logo.png",
    "icon": "fa-music",
    "featured": true,
    "tags": [
      "voice",
      "text-to-speech",
      "generation"
    ]
  },
  {
    "name": "AIVA",
    "url": "https://www.aiva.ai",
    "category": "Audio & Music",
    "description": "AI music composition assistant",
    "description_ar": "مساعد تأليف الموسيقى بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d2eb81ac74897806f9367c_geekflare-ai-sm.png",
    "icon": "fa-music",
    "featured": false,
    "tags": [
      "music",
      "composition",
      "assistant"
    ]
  },
  {
    "name": "Boomy",
    "url": "https://boomy.com",
    "category": "Audio & Music",
    "description": "AI music creation for beginners",
    "description_ar": "إنشاء الموسيقى بالذكاء الاصطناعي للمبتدئين",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e5273b98950a6f9c1bf480_aerochat-ai-logo.png",
    "icon": "fa-music",
    "featured": false,
    "tags": [
      "music",
      "creation",
      "beginners"
    ]
  },
  {
    "name": "Voice.ai",
    "url": "https://voice.ai",
    "category": "Audio & Music",
    "description": "AI voice changer and generator",
    "description_ar": "مغير ومولد الأصوات بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68c6c784a87d946b1c9d21d0_neuraltalk-ai-logo.png",
    "icon": "fa-music",
    "featured": false,
    "tags": [
      "voice",
      "changer",
      "generator"
    ]
  },
  {
    "name": "LALAL.AI",
    "url": "https://lalal.ai",
    "category": "Audio & Music",
    "description": "AI vocal remover and audio separation",
    "description_ar": "إزالة الأصوات وفصل الصوت بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d2eb80c50bd51c79d5c45c_68c63f9bbc117a583ee6af09_8c08f6ba97d5083fcb58d07f5886737c_og-background.png",
    "icon": "fa-music",
    "featured": false,
    "tags": [
      "vocal",
      "separation",
      "audio"
    ]
  },
  {
    "name": "Soundraw",
    "url": "https://soundraw.io",
    "category": "Audio & Music",
    "description": "AI music generator for creators",
    "description_ar": "مولد الموسيقى بالذكاء الاصطناعي للمبدعين",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68c0aa5a0dae09e76f4850ba_9Ftxv6j.png",
    "icon": "fa-music",
    "featured": false,
    "tags": [
      "music",
      "generator",
      "creators"
    ]
  },
  {
    "name": "Amper Music",
    "url": "https://www.ampermusic.com",
    "category": "Audio & Music",
    "description": "AI music composition platform",
    "description_ar": "منصة تأليف الموسيقى بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e46ab739c9f0c24a184971_PotionsPreview.png",
    "icon": "fa-music",
    "featured": false,
    "tags": [
      "music",
      "composition",
      "platform"
    ]
  },
  {
    "name": "Landr",
    "url": "https://www.landr.com",
    "category": "Audio & Music",
    "description": "AI music mastering and distribution",
    "description_ar": "ماسترة وتوزيع الموسيقى بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dc108526c8dbe3986529ee_68c9a2ee750f3bbe2afb6ddf_share.jpeg",
    "icon": "fa-music",
    "featured": false,
    "tags": [
      "mastering",
      "distribution",
      "music"
    ]
  },
  {
    "name": "GitHub Copilot",
    "url": "https://github.com/features/copilot",
    "category": "AI Coding",
    "description": "AI pair programmer that suggests code",
    "description_ar": "مبرمج زوجي بالذكاء الاصطناعي يقترح الكود",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68ca852e7158379c78d2df78_genspark-browser-logo.png",
    "icon": "fa-code",
    "featured": true,
    "tags": [
      "coding",
      "assistant",
      "github"
    ]
  },
  {
    "name": "Replit AI",
    "url": "https://replit.com",
    "category": "AI Coding",
    "description": "AI coding assistant in browser-based IDE",
    "description_ar": "مساعد البرمجة بالذكاء الاصطناعي في بيئة التطوير المتصفحية",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68df2f1b070502e65f6251b1_wnitwkyk.png",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "coding",
      "ide",
      "browser"
    ]
  },
  {
    "name": "Tabnine",
    "url": "https://www.tabnine.com",
    "category": "AI Coding",
    "description": "AI code completion tool",
    "description_ar": "أداة إكمال الكود بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e46abbe1793a38fb5339d9_og_home.png",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "coding",
      "completion",
      "assistant"
    ]
  },
  {
    "name": "Cursor",
    "url": "https://cursor.sh",
    "category": "AI Coding",
    "description": "AI-first code editor",
    "description_ar": "محرر كود يركز على الذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/64e3ae5261bd56c910d07063_banner.png",
    "icon": "fa-code",
    "featured": true,
    "tags": [
      "coding",
      "editor",
      "ai-first"
    ]
  },
  {
    "name": "Codeium",
    "url": "https://codeium.com",
    "category": "AI Coding",
    "description": "Free AI code completion and chat",
    "description_ar": "إكمال الكود والدردشة بالذكاء الاصطناعي مجاناً",
    "pricing": "Free",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d0842947efae732ebe1bcf_open-graph-image.webp",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "coding",
      "free",
      "completion"
    ]
  },
  {
    "name": "SourceGraph Cody",
    "url": "https://sourcegraph.com/cody",
    "category": "AI Coding",
    "description": "AI coding assistant for large codebases",
    "description_ar": "مساعد البرمجة بالذكاء الاصطناعي لقواعد الكود الكبيرة",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68cbcacafd348a4747114a2e_cloudonix-com-logo.png",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "coding",
      "assistant",
      "large-codebases"
    ]
  },
  {
    "name": "Amazon CodeWhisperer",
    "url": "https://aws.amazon.com/codewhisperer",
    "category": "AI Coding",
    "description": "AI coding companion from Amazon",
    "description_ar": "رفيق البرمجة بالذكاء الاصطناعي من أمازون",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68c0aa5d22cc094e5adb1d46_og-image.png",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "coding",
      "amazon",
      "aws"
    ]
  },
  {
    "name": "Warp AI",
    "url": "https://www.warp.dev",
    "category": "AI Coding",
    "description": "AI-powered terminal with coding assistance",
    "description_ar": "طرفية مدعومة بالذكاء الاصطناعي مع مساعدة في البرمجة",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e52a57310dd3dfc43cdb99_maastr-io-logo.png",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "terminal",
      "coding",
      "assistance"
    ]
  },
  {
    "name": "Stepsize AI",
    "url": "https://stepsize.com/ai",
    "category": "AI Coding",
    "description": "AI assistant for code maintenance and refactoring",
    "description_ar": "مساعد الذكاء الاصطناعي لصيانة الكود وإعادة الهيكلة",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e145b7009ae49285d24e79_interactico-com-logo.png",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "maintenance",
      "refactoring",
      "code"
    ]
  },
  {
    "name": "Mintlify",
    "url": "https://mintlify.com",
    "category": "AI Coding",
    "description": "AI documentation generator for code",
    "description_ar": "مولد التوثيق بالذكاء الاصطناعي للكود",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68e14445e13a3fbe26db01e4_genpire-com-logo.png",
    "icon": "fa-code",
    "featured": false,
    "tags": [
      "documentation",
      "generator",
      "code"
    ]
  },
  {
    "name": "Notion AI",
    "url": "https://www.notion.so/product/ai",
    "category": "Productivity",
    "description": "AI-powered workspace and note-taking",
    "description_ar": "مساحة العمل والتدوين بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dc1054d75c3789ee0a8fd8_Cavya-Feature-Image.png",
    "icon": "fa-chart-line",
    "featured": true,
    "tags": [
      "workspace",
      "notes",
      "organization"
    ]
  },
  {
    "name": "Mem AI",
    "url": "https://mem.ai",
    "category": "Productivity",
    "description": "AI-powered note-taking and organization",
    "description_ar": "التدوين والتنظيم بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dc105226c8dbe39864ef24_Accesstive-OG.webp",
    "icon": "fa-chart-line",
    "featured": false,
    "tags": [
      "notes",
      "organization",
      "memory"
    ]
  },
  {
    "name": "Rewind AI",
    "url": "https://www.rewind.ai",
    "category": "Productivity",
    "description": "AI personal memory assistant",
    "description_ar": "مساعد الذاكرة الشخصية بالذكاء الاصطناعي",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dad1ee5b4c970c7729509c_opengraph-image.jpeg",
    "icon": "fa-chart-line",
    "featured": true,
    "tags": [
      "memory",
      "assistant",
      "personal"
    ]
  },
  {
    "name": "Superhuman",
    "url": "https://superhuman.com",
    "category": "Productivity",
    "description": "AI-powered email client",
    "description_ar": "عميل البريد الإلكتروني بالذكاء الاصطناعي",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dad1ed00c09b245ee3e370_example-B_UVVCNr.png",
    "icon": "fa-chart-line",
    "featured": false,
    "tags": [
      "email",
      "client",
      "productivity"
    ]
  },
  {
    "name": "Motion",
    "url": "https://www.motion.com",
    "category": "Productivity",
    "description": "AI calendar and project manager",
    "description_ar": "التقويم ومدير المشاريع بالذكاء الاصطناعي",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dad1ec25b2d181efa11521_opengraph-image.png",
    "icon": "fa-chart-line",
    "featured": false,
    "tags": [
      "calendar",
      "projects",
      "management"
    ]
  },
  {
    "name": "Otter AI",
    "url": "https://otter.ai",
    "category": "Productivity",
    "description": "AI meeting assistant and note-taker",
    "description_ar": "مساعد الاجتماعات والتدوين بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68dc020982293e7f19af9dc0_tapybl-com-logo.png",
    "icon": "fa-chart-line",
    "featured": false,
    "tags": [
      "meetings",
      "notes",
      "assistant"
    ]
  },
  {
    "name": "Fireflies AI",
    "url": "https://fireflies.ai",
    "category": "Productivity",
    "description": "AI notetaker for meetings and conversations",
    "description_ar": "مدون الملاحظات بالذكاء الاصطناعي للاجتماعات والمحادثات",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d5c9cd33f47c3310dfbd62_og-image.png",
    "icon": "fa-chart-line",
    "featured": false,
    "tags": [
      "meetings",
      "notes",
      "conversations"
    ]
  },
  {
    "name": "Krisp",
    "url": "https://krisp.ai",
    "category": "Productivity",
    "description": "AI noise cancellation for meetings",
    "description_ar": "إلغاء الضوضاء بالذكاء الاصطناعي للاجتماعات",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d427608d93fbf28b32fd1e_5a77999ecfed6c5959c8eafeedd6e33f.png",
    "icon": "fa-chart-line",
    "featured": false,
    "tags": [
      "noise-cancellation",
      "meetings",
      "audio"
    ]
  },
  {
    "name": "Xembly",
    "url": "https://xembly.com",
    "category": "Productivity",
    "description": "AI executive assistant for scheduling and tasks",
    "description_ar": "مساعد تنفيذي بالذكاء الاصطناعي للجدولة والمهام",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d4275e49a8a68561cee268_orange_sky_optimized.jpeg",
    "icon": "fa-chart-line",
    "featured": false,
    "tags": [
      "scheduling",
      "tasks",
      "assistant"
    ]
  },
  {
    "name": "Hoppy Copy",
    "url": "https://www.hoppycopy.co",
    "category": "Marketing",
    "description": "AI email marketing copy generator",
    "description_ar": "مولد النصوص التسويقية للبريد الإلكتروني بالذكاء الاصطناعي",
    "pricing": "Freemium",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d2eb7db036a57b030ed79e_metadata-image.png",
    "icon": "fa-megaphone",
    "featured": false,
    "tags": [
      "email",
      "marketing",
      "copywriting"
    ]
  },
  {
    "name": "AdCreative AI",
    "url": "https://adcreative.ai",
    "category": "Marketing",
    "description": "AI-generated ad creatives",
    "description_ar": "الإعلانات المبتكرة المولدة بالذكاء الاصطناعي",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d4200719fd4d5b22b6a324_dyad-sh-logo.png",
    "icon": "fa-megaphone",
    "featured": true,
    "tags": [
      "ads",
      "creatives",
      "generation"
    ]
  },
  {
    "name": "Phrasee",
    "url": "https://phrasee.co",
    "category": "Marketing",
    "description": "AI-powered marketing language optimization",
    "description_ar": "تحسين لغة التسويق بالذكاء الاصطناعي",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d0843160f56b2d87a7af89_688179ee5af2a82ac2d742be_OpenGraph.png",
    "icon": "fa-megaphone",
    "featured": false,
    "tags": [
      "language",
      "optimization",
      "marketing"
    ]
  },
  {
    "name": "Persado",
    "url": "https://persado.com",
    "category": "Marketing",
    "description": "AI marketing language generation",
    "description_ar": "توليد لغة التسويق بالذكاء الاصطناعي",
    "pricing": "Paid",
    "logo": "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68d2b4dadaab3d750ee50c52_nrev-ai-logo.png",
    "icon": "fa-megaphone",
    "featured": false,
    "tags": [
      "language",
      "generation",
      "marketing"
    ]
  }
];

const categories = [
  { name: "AI Detection", name_ar: "كشف الذكاء الاصطناعي", icon: "bi bi-search" },
  { name: "Avatar", name_ar: "الصور الرمزية", icon: "bi bi-person" },
  { name: "Copywriting", name_ar: "كتابة النصوص", icon: "bi bi-file-earmark-text" },
  { name: "For Fun", name_ar: "للمتعة", icon: "bi bi-emoji-smile" },
  { name: "Generative Art", name_ar: "الفن التوليدي", icon: "bi bi-palette" },
  { name: "Generative Video", name_ar: "توليد الفيديو", icon: "bi bi-camera-video" },
  { name: "Image Scanning", name_ar: "مسح الصور", icon: "bi bi-image" },
  { name: "Marketing", name_ar: "التسويق", icon: "bi bi-megaphone" },
  { name: "Music", name_ar: "الموسيقى", icon: "bi bi-music-note" },
  { name: "Productivity", name_ar: "الإنتاجية", icon: "bi bi-graph-up" },
  { name: "Research", name_ar: "البحث", icon: "bi bi-lightbulb" },
  { name: "Social Media", name_ar: "التواصل الاجتماعي", icon: "bi bi-share" },
  { name: "Text-To-Speech", name_ar: "تحويل النص إلى كلام", icon: "bi bi-volume-up" },
  { name: "Translation", name_ar: "الترجمة", icon: "bi bi-translate" },
  { name: "Voice Modulation", name_ar: "تعديل الصوت", icon: "bi bi-mic" },
  { name: "Aggregators", name_ar: "المجمعات", icon: "bi bi-collection" },
  { name: "Chat", name_ar: "المحادثة", icon: "bi bi-chat-dots" },
  { name: "Finance", name_ar: "المالية", icon: "bi bi-wallet2" },
  { name: "Gaming", name_ar: "الألعاب", icon: "bi bi-controller" },
  { name: "Generative Code", name_ar: "توليد الكود", icon: "bi bi-code-slash" },
  { name: "Image Improvement", name_ar: "تحسين الصور", icon: "bi bi-brush" },
  { name: "Inspiration", name_ar: "الإلهام", icon: "bi bi-sun" },
  { name: "Podcasting", name_ar: "البودكاست", icon: "bi bi-headphones" },
  { name: "Prompt Guides", name_ar: "أدلة الأوامر", icon: "bi bi-list-check" },
  { name: "Self-Improvement", name_ar: "تطوير الذات", icon: "bi bi-person-check" },
  { name: "Speech-To-Text", name_ar: "تحويل الكلام إلى نص", icon: "bi bi-soundwave" },
  { name: "Text-To-Video", name_ar: "تحويل النص إلى فيديو", icon: "bi bi-film" },
  { name: "Video Editing", name_ar: "تعديل الفيديو", icon: "bi bi-scissors" },
];

const blogPosts = [
  {
    title_en: "The Rise of AI Agents: Autonomous Workflows",
    title_ar: "صعود وكلاء الذكاء الاصطناعي: مستقبل سير العمل المستقل",
    summary_en: "AI agents are transforming how businesses operate by automating complex, multi-step tasks. Discover the key benefits and applications.",
    summary_ar: "وكلاء الذكاء الاصطناعي يغيرون طريقة عمل الشركات من خلال أتمتة المهام المعقدة ومتعددة الخطوات. اكتشف الفوائد والتطبيقات الرئيسية.",
    category_en: "Future Trends",
    category_ar: "توجهات مستقبلية",
    date: "2025-10-01",
    author_en: "Amal Al-Fahad",
    author_ar: "أمل الفهد",
    image: "https://picsum.photos/seed/ai-agent-01/800/400",
    body_en: `
                <p>The concept of AI agents moving beyond simple tasks to execute entire workflows is quickly becoming a reality. These agents can plan, execute, and monitor long-term goals with minimal human intervention.</p>
                <h3>What are Autonomous AI Agents?</h3>
                <p>Unlike traditional AI tools that perform single actions, autonomous agents possess the ability to:</p>
                <ul>
                    <li>Set and refine goals based on high-level instructions.</li>
                    <li>Break down complex goals into smaller, executable sub-tasks.</li>
                    <li>Iterate and learn from previous attempts to improve results.</li>
                </ul>
                <h3>Impact on Business Productivity</h3>
                <p>For businesses, this means a massive leap in efficiency. Imagine an agent that can not only write a marketing email but also research the target audience, analyze campaign performance, and adjust its strategy—all automatically.</p>
                <p>The future of work involves humans supervising these powerful agents, rather than manually performing every task.</p>
            `,
    body_ar: `
                <p>إن مفهوم وكلاء الذكاء الاصطناعي الذين يتجاوزون المهام البسيطة لتنفيذ سير عمل كاملة أصبح حقيقة واقعة بسرعة. يمكن لهؤلاء الوكلاء تخطيط الأهداف طويلة المدى وتنفيذها ومراقبتها بأقل قدر من التدخل البشري.</p>
                <h3>ما هي وكلاء الذكاء الاصطناعي المستقلون؟</h3>
                <p>على عكس أدوات الذكاء الاصطناعي التقليدية التي تؤدي إجراءات فردية، يتمتع الوكلاء المستقلون بالقدرة على:</p>
                <ul>
                    <li>تحديد الأهداف وصقلها بناءً على تعليمات عالية المستوى.</li>
                    <li>تقسيم الأهداف المعقدة إلى مهام فرعية أصغر قابلة للتنفيذ.</li>
                    <li>التكرار والتعلم من المحاولات السابقة لتحسين النتائج.</li>
                </ul>
                <h3>تأثيرهم على إنتاجية الأعمال</h3>
                <p>بالنسبة للشركات، يعني هذا قفزة هائلة في الكفاءة. تخيل وكيلاً لا يمكنه كتابة بريد إلكتروني تسويقي فحسب، بل يمكنه أيضًا البحث عن الجمهور المستهدف وتحليل أداء الحملة وتعديل استراتيجيته - كل ذلك تلقائيًا.</p>
                <p>مستقبل العمل يتضمن إشراف البشر على هؤلاء الوكلاء الأقوياء، بدلاً من أداء كل مهمة يدويًا.</p>
            `
  },
  {
    title_en: "Generative Art Beyond DALL-E: New Tools in 2025",
    title_ar: "الفن التوليدي بعد DALL-E: أدوات جديدة لعام 2025",
    summary_en: "The landscape of generative art is rapidly evolving, with new models offering higher fidelity, better control, and unique artistic styles.",
    summary_ar: "يتطور مشهد الفن التوليدي بسرعة، حيث تقدم النماذج الجديدة دقة أعلى وتحكمًا أفضل وأنماطًا فنية فريدة.",
    category_en: "Generative Art",
    category_ar: "الفن التوليدي",
    date: "2025-09-15",
    author_en: "Khalid Al-Mansoori",
    author_ar: "خالد المنصوري",
    image: "https://picsum.photos/seed/ai-art-02/800/400",
    body_en: `
                <p>While DALL-E and Midjourney set the standard, the market is now flooded with specialized tools focusing on niches like 3D modeling, high-resolution upscaling, and detailed architectural visualization.</p>
                <h3>Why Specialization Matters</h3>
                <p>General-purpose models are great, but specialized tools offer several advantages:</p>
                <ul>
                    <li><strong>Depth of Control:</strong> Fine-tuning parameters for specific outputs (e.g., controlling light sources in a 3D scene).</li>
                    <li><strong>Workflow Integration:</strong> Seamless export into professional design and video editing software.</li>
                    <li><strong>Unique Aesthetics:</strong> Models trained on specific artistic movements or historical eras.</li>
                </ul>
                <p>Artists are now blending the output of multiple AI tools to achieve truly complex and innovative final pieces.</p>
            `,
    body_ar: `
                <p>في حين أن DALL-E و Midjourney قد وضعا المعيار، إلا أن السوق يمتلئ الآن بالأدوات المتخصصة التي تركز على مجالات مثل النمذجة ثلاثية الأبعاد، وتحسين الدقة العالية، والتصور المعماري التفصيلي.</p>
                <h3>لماذا التخصص مهم؟</h3>
                <p>النماذج العامة رائعة، لكن الأدوات المتخصصة تقدم العديد من المزايا:</p>
                <ul>
                    <li><strong>عمق التحكم:</strong> ضبط دقيق للمعلمات للمخرجات المحددة (مثل التحكم في مصادر الإضاءة في مشهد ثلاثي الأبعاد).</li>
                    <li><strong>التكامل مع سير العمل:</strong> تصدير سلس إلى برامج التصميم وتحرير الفيديو الاحترافية.</li>
                    <li><strong>جماليات فريدة:</strong> نماذج مدربة على حركات فنية محددة أو عصور تاريخية.</li>
                </ul>
                <p>يقوم الفنانون الآن بمزج مخرجات أدوات الذكاء الاصطناعي المتعددة لتحقيق قطع فنية نهائية معقدة ومبتكرة حقًا.</p>
            `
  },
  {
    title_en: "The Future of Coding: AI Pair Programmers",
    title_ar: "مستقبل البرمجة: المبرمجون المساعدون بالذكاء الاصطناعي",
    summary_en: "AI pair programming tools like GitHub Copilot are no longer just for auto-completion. They are becoming essential partners that speed up development and catch errors early.",
    summary_ar: "أدوات البرمجة المزدوجة بالذكاء الاصطناعي مثل GitHub Copilot لم تعد مجرد لإكمال الكود تلقائيًا. إنها تصبح شركاء أساسيين يسرعون التطوير ويكتشفون الأخطاء مبكرًا.",
    category_en: "Generative Code",
    category_ar: "الكود التوليدي",
    date: "2025-09-01",
    author_en: "Fahad Al-Rashid",
    author_ar: "فهد الرشيد",
    image: "https://picsum.photos/seed/ai-code-03/800/400",
    body_en: `
                <p>The latest generation of AI coding assistants can handle far more complex requests than their predecessors. They can refactor entire codebases, write unit tests based on context, and even translate code between different programming languages.</p>
                <h3>Key Benefits for Developers</h3>
                <p>Integrating these tools into the daily workflow provides immediate advantages:</p>
                <ul>
                    <li><strong>Time Saving:</strong> Automating boilerplate code and repetitive tasks.</li>
                    <li><strong>Learning Curve:</strong> Helping junior developers understand complex code patterns.</li>
                    <li><strong>Quality Improvement:</strong> Suggesting performance optimizations and security best practices.</li>
                </ul>
                <p>While the fear of AI replacing developers persists, the reality is that these tools augment human capabilities, allowing developers to focus on high-level architectural design and complex problem-solving.</p>
            `,
    body_ar: `
                <p>يمكن لأحدث جيل من مساعدي البرمجة بالذكاء الاصطناعي التعامل مع طلبات أكثر تعقيدًا بكثير من سابقاتها. يمكنهم إعادة هيكلة قواعد الكود بالكامل، وكتابة اختبارات الوحدة بناءً على السياق، وحتى ترجمة الكود بين لغات برمجة مختلفة.</p>
                <h3>الفوائد الرئيسية للمطورين</h3>
                <p>يوفر دمج هذه الأدوات في سير العمل اليومي مزايا فورية:</p>
                <ul>
                    <li><strong>توفير الوقت:</strong> أتمتة الكود النمطي والمهام المتكررة.</li>
                    <li><strong>منحنى التعلم:</strong> مساعدة المطورين المبتدئين على فهم أنماط الكود المعقدة.</li>
                    <li><strong>تحسين الجودة:</strong> اقتراح تحسينات الأداء وأفضل ممارسات الأمان.</li>
                </ul>
                <p>على الرغم من استمرار المخاوف من أن يحل الذكاء الاصطناعي محل المطورين، إلا أن الواقع هو أن هذه الأدوات تعزز القدرات البشرية، مما يسمح للمطورين بالتركيز على التصميم المعماري عالي المستوى وحل المشكلات المعقدة.</p>
            `
  }
];

const aboutContent = {
  en: `
    <h2>About FutureGEN</h2>
    <p>FutureGEN is a comprehensive platform dedicated to showcasing the latest advancements in Artificial Intelligence tools and technologies. Our mission is to bridge the gap between cutting-edge AI innovations and users worldwide, providing a curated collection of the most powerful and practical AI solutions available today.</p>

    <h3>Our Vision</h3>
    <p>We envision a world where AI empowers everyone to achieve more, create faster, and innovate without boundaries. FutureGEN serves as your gateway to this future, offering:</p>
    <ul>
      <li><strong>Comprehensive Tool Directory:</strong> Thousands of AI tools across all categories</li>
      <li><strong>Multilingual Support:</strong> Full Arabic and English interface</li>
      <li><strong>User-Friendly Experience:</strong> Intuitive navigation and powerful search</li>
      <li><strong>Regular Updates:</strong> Constantly updated with the latest AI developments</li>
    </ul>

    <h3>Why Choose FutureGEN?</h3>
    <ul>
      <li><strong>Quality Curation:</strong> Every tool is carefully reviewed and verified</li>
      <li><strong>Community Driven:</strong> User favorites and ratings to guide your choices</li>
      <li><strong>Educational Content:</strong> Blog posts and insights about AI trends</li>
      <li><strong>Open Access:</strong> Free to use with premium features for power users</li>
    </ul>

    <p>Join thousands of users who trust FutureGEN to discover their next favorite AI tool. Whether you're a developer, designer, marketer, or just curious about AI, FutureGEN has something for everyone.</p>
  `,
  ar: `
    <h2>حول FutureGEN</h2>
    <p>FutureGEN هو منصة شاملة مخصصة لعرض أحدث التطورات في أدوات وتقنيات الذكاء الاصطناعي. مهمتنا هي سد الفجوة بين الابتكارات المتطورة في الذكاء الاصطناعي والمستخدمين في جميع أنحاء العالم، وتوفير مجموعة مختارة من أقوى وحلول الذكاء الاصطناعي العملية المتاحة اليوم.</p>

    <h3>رؤيتنا</h3>
    <p>نحن نتخيل عالمًا يمكّن فيه الذكاء الاصطناعي الجميع من تحقيق المزيد، والإبداع بشكل أسرع، والابتكار دون حدود. يعمل FutureGEN كبوابتك لهذا المستقبل، ويقدم:</p>
    <ul>
      <li><strong>دليل أدوات شامل:</strong> آلاف الأدوات الذكية عبر جميع الفئات</li>
      <li><strong>دعم متعدد اللغات:</strong> واجهة كاملة بالعربية والإنجليزية</li>
      <li><strong>تجربة سهلة الاستخدام:</strong> تصفح بديهي وبحث قوي</li>
      <li><strong>تحديثات منتظمة:</strong> تحديث مستمر بأحدث التطورات في الذكاء الاصطناعي</li>
    </ul>

    <h3>لماذا تختار FutureGEN؟</h3>
    <ul>
      <li><strong>اختيار الجودة:</strong> كل أداة تمت مراجعتها بعناية والتحقق منها</li>
      <li><strong>مدفوع بالمجتمع:</strong> المفضلة للمستخدمين والتقييمات لتوجيه اختياراتك</li>
      <li><strong>محتوى تعليمي:</strong> مقالات المدونة ورؤى حول اتجاهات الذكاء الاصطناعي</li>
      <li><strong>وصول مفتوح:</strong> مجاني للاستخدام مع ميزات مميزة للمستخدمين المتقدمين</li>
    </ul>

    <p>انضم إلى آلاف المستخدمين الذين يثقون بـ FutureGEN لاكتشاف أداة الذكاء الاصطناعي المفضلة التالية لديهم. سواء كنت مطورًا أو مصممًا أو مسوقًا أو مجرد فضولي حول الذكاء الاصطناعي، فإن FutureGEN لديه شيء للجميع.</p>
  `
};

const contactContent = {
  en: `
    <h2>Contact Us</h2>
    <p>We'd love to hear from you! Whether you have questions about our platform, suggestions for new features, or partnership opportunities, our team is here to help.</p>

    <div class="contact-info">
      <h3>Get In Touch</h3>
      <p><strong>Email:</strong> contact@futuregen.ai</p>
      <p><strong>Support:</strong> support@futuregen.ai</p>
      <p><strong>Business Inquiries:</strong> business@futuregen.ai</p>

      <h3>Follow Us</h3>
      <p>Stay updated with the latest AI tools and trends:</p>
      <ul>
        <li><a href="#" target="_blank">Twitter/X</a></li>
        <li><a href="#" target="_blank">LinkedIn</a></li>
        <li><a href="#" target="_blank">Discord Community</a></li>
      </ul>
    </div>

    <h3>Feedback & Support</h3>
    <p>Your feedback helps us improve FutureGEN. If you encounter any issues or have suggestions, please don't hesitate to reach out. We typically respond within 24 hours.</p>

    <h3>Partnerships</h3>
    <p>Are you an AI tool developer or company? We'd love to partner with you to showcase your innovations on FutureGEN. Contact our business team to discuss collaboration opportunities.</p>
  `,
  ar: `
    <h2>اتصل بنا</h2>
    <p>نود أن نسمع منك! سواء كان لديك أسئلة حول منصتنا، أو اقتراحات لميزات جديدة، أو فرص شراكة، فريقنا هنا للمساعدة.</p>

    <div class="contact-info">
      <h3>تواصل معنا</h3>
      <p><strong>البريد الإلكتروني:</strong> contact@futuregen.ai</p>
      <p><strong>الدعم:</strong> support@futuregen.ai</p>
      <p><strong>الاستفسارات التجارية:</strong> business@futuregen.ai</p>

      <h3>تابعنا</h3>
      <p>ابق على اطلاع بأحدث أدوات الذكاء الاصطناعي والاتجاهات:</p>
      <ul>
        <li><a href="#" target="_blank">تويتر/X</a></li>
        <li><a href="#" target="_blank">لينكد إن</a></li>
        <li><a href="#" target="_blank">مجتمع ديسكورد</a></li>
      </ul>
    </div>

    <h3>الملاحظات والدعم</h3>
    <p>ملاحظاتك تساعدنا في تحسين FutureGEN. إذا واجهت أي مشاكل أو لديك اقتراحات، فلا تتردد في التواصل. نحن عادةً نرد خلال 24 ساعة.</p>

    <h3>الشراكات</h3>
    <p>هل أنت مطور أدوات ذكاء اصطناعي أو شركة؟ نود الشراكة معك لعرض ابتكاراتك على FutureGEN. اتصل بفريقنا التجاري لمناقشة فرص التعاون.</p>
  `
};


// =================================================================================
// GLOBAL VARIABLES
// =================================================================================

let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
let currentLang = 'en';


// =================================================================================
// HELPER FUNCTIONS
// =================================================================================

// =================================================================================
// THEME FUNCTIONS
// =================================================================================

function applyTheme(theme) {
  console.log('Applying theme:', theme);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const themeIcon = document.querySelector("#themeToggle i");
  if (themeIcon) {
    if (theme === "dark") {
      themeIcon.className = "fa-solid fa-sun";
    } else {
      themeIcon.className = "fa-solid fa-moon";
    }
  }
  updateThemeImages(theme);
}

function updateThemeImages(theme) {
  const logo = document.querySelector('.navbar-brand img');
  if (logo) {
    if (theme === "dark") {
      logo.src = './Images/logo-dark-futuregen.png';
    } else {
      logo.src = './Images/Logo.png';
    }
  }
}

function toggleTheme() {
  console.log('Theme toggle clicked');
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  console.log('Changing theme from', currentTheme, 'to', newTheme);
  applyTheme(newTheme);
}

// =================================================================================
// LANGUAGE FUNCTIONS
// =================================================================================

function applyLanguage(lang) {
  console.log('Applying language:', lang);
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  document.body.setAttribute("lang", lang);

  const langButton = document.getElementById('langToggle');
  if (langButton) {
    langButton.textContent = lang === "en" ? "العربية" : "English";
  }
  updateAllTextContent();
  renderTools();
  renderCategories();
  renderBlogPosts();
  updateUserInterface();
}

function toggleLanguage() {
  console.log('Language toggle clicked');
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  console.log('Changing language from', currentLang, 'to', newLang);
  applyLanguage(newLang);
}

function updateAllTextContent() {
  console.log('Updating all text content for language:', currentLang);
  const elements = document.querySelectorAll('[data-en], [data-ar]');
  elements.forEach(element => {
    if (currentLang === "en") {
      if (element.hasAttribute("data-en")) {
        element.textContent = element.getAttribute("data-en");
      }
      if (element.hasAttribute("data-en-placeholder")) {
        element.placeholder = element.getAttribute("data-en-placeholder");
      }
    } else {
      if (element.hasAttribute("data-ar")) {
        element.textContent = element.getAttribute("data-ar");
      }
      if (element.hasAttribute("data-ar-placeholder")) {
        element.placeholder = element.getAttribute("data-ar-placeholder");
      }
    }
  });
  updateDynamicContent();
}

function updateDynamicContent() {
  const counterElement = document.querySelector('.counter');
  if (counterElement) {
    const count = counterElement.getAttribute('data-count') || "5000";
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      if (currentLang === "en") {
        heroSubtitle.innerHTML = `<span class="counter" data-count="${count}">0</span>+ AI tools, resources, and technologies to enhance your workflow.`;
      } else {
        heroSubtitle.innerHTML = `<span class="counter" data-count="${count}">0</span>+ أداة ذكاء اصطناعي وموارد وتقنيات لتعزيز سير عملك.`;
      }
      startAnimations();
    }
  }
}

// =================================================================================
// RENDER FUNCTIONS
// =================================================================================

function renderTools() {
  const container = document.getElementById('featured-tools-container');
  if (!container) return;

  container.innerHTML = '';

  const groupedTools = groupToolsByCategory();

  Object.entries(groupedTools).forEach(([category, toolsInCategory]) => {
    if (toolsInCategory.length === 0) return;

    const categorySection = document.createElement("div");
    categorySection.className = "category-section";

    const categoryHeader = document.createElement("div");
    categoryHeader.className = "category-header";

    const categoryTitle = document.createElement("h3");
    categoryTitle.className = "h4 fw-bold mb-0";
    categoryTitle.textContent = category;

    categoryHeader.appendChild(categoryTitle);
    categorySection.appendChild(categoryHeader);

    const toolsGrid = document.createElement("div");
    toolsGrid.className = "row g-4";

    const toolsToShow = toolsInCategory.slice(0, 6);

    toolsToShow.forEach((tool) => {
      const originalIndex = aiTools.findIndex(t => t.name === tool.name);
      const toolCard = createToolCard(tool, originalIndex);
      toolsGrid.appendChild(toolCard);
    });

    categorySection.appendChild(toolsGrid);

    const showAllBtn = document.createElement("button");
    showAllBtn.className = "btn btn-outline-primary show-more-btn";
    showAllBtn.setAttribute("data-category", category);

    if (currentLang === 'en') {
      showAllBtn.innerHTML = 'Show All Tools <i class="fas fa-chevron-down ms-2"></i>';
    } else {
      showAllBtn.innerHTML = 'عرض جميع الأدوات <i class="fas fa-chevron-down ms-2"></i>';
    }

    showAllBtn.onclick = function () {
      showAllToolsInCategory(category, this);
    };

    categorySection.appendChild(showAllBtn);
    container.appendChild(categorySection);
  });
}

function groupToolsByCategory() {
  const grouped = {};

  aiTools.forEach(tool => {
    if (!grouped[tool.category]) {
      grouped[tool.category] = [];
    }
    grouped[tool.category].push(tool);
  });

  return grouped;
}

function createToolCard(tool, index) {
  const toolCard = document.createElement("div");
  toolCard.className = "col-lg-4 col-md-6";

  const description = currentLang === 'en' ? tool.description : (tool.description_ar || tool.description);
  const viewText = currentLang === 'en' ? 'Details' : 'تفاصيل';
  const featuredText = currentLang === 'en' ? 'Featured' : 'مميز';

  toolCard.innerHTML = `
    <div class="card tool-card card-3d tilt enhanced-card h-100">
        <div class="card-img-top position-relative" style="height: 160px; overflow: hidden; background: linear-gradient(135deg, #401F71, #BE7B72);">
            <img src="${tool.logo}" alt="${tool.name}" class="w-100 h-100 object-fit-contain p-3" style="object-fit: contain; background: white;">
            ${tool.featured ? `<span class="position-absolute top-0 end-0 m-2 badge bg-primary">${featuredText}</span>` : ''}
            <button class="btn btn-sm btn-dark position-absolute top-0 start-0 m-2 favorite-toggle" data-tool-id="${index}">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-start gap-3 mb-3">
                <div class="flex-grow-1">
                    <h5 class="card-title fw-bold">${tool.name}</h5>
                    <span class="badge bg-light text-dark">${tool.category}</span>
                </div>
            </div>
            <p class="card-text flex-grow-1">${description}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
                <button class="btn btn-sm btn-outline-primary view-details-btn" data-tool-id="${index}">
                    ${viewText}
                </button>
                <span class="badge bg-secondary">${tool.pricing}</span>
            </div>
        </div>
    </div>
  `;

  const detailsBtn = toolCard.querySelector('.view-details-btn');
  detailsBtn.addEventListener('click', (event) => {
    const toolId = parseInt(event.currentTarget.dataset.toolId, 10);
    showToolDetails(toolId);
  });

  const favoriteBtn = toolCard.querySelector('.favorite-toggle');
  favoriteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFavorite(index, favoriteBtn);
  });

  updateFavoriteButtonState(favoriteBtn, index);

  return toolCard;
}
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = '';
  categories.forEach((category) => {
    const categoryCard = document.createElement("div");
    categoryCard.className = "category-card";
    // إضافة data-category attribute هنا
    categoryCard.setAttribute('data-category', category.name);

    const categoryName = currentLang === "en" ? category.name : category.name_ar;

    categoryCard.innerHTML = `
            <div class="card-body d-flex flex-column align-items-center justify-content-center p-4">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <h5 class="category-title">${categoryName}</h5>
            </div>
        `;

    container.appendChild(categoryCard);
  });
}
function renderBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  if (!container) return;

  container.innerHTML = '';
  blogPosts.forEach((post, index) => {
    const postCard = document.createElement('div');
    postCard.className = 'col-lg-4 col-md-6';

    const title = currentLang === 'en' ? post.title_en : post.title_ar;
    const summary = currentLang === 'en' ? post.summary_en : post.summary_ar;
    const category = currentLang === 'en' ? post.category_en : post.category_ar;
    const readMoreText = currentLang === 'en' ? 'Read More' : 'اقرأ المزيد';

    postCard.innerHTML = `
            <div class="card h-100 blog-card" data-blog-id="${index}">
                <img src="${post.image}" class="card-img-top" alt="${title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${category}</span>
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${summary}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <button class="btn btn-sm btn-outline-primary view-blog-details-btn" data-blog-id="${index}">
                            ${readMoreText}
                        </button>
                        <small class="text-muted">${post.date}</small>
                    </div>
                </div>
            </div>
        `;

    const detailsBtn = postCard.querySelector('.view-blog-details-btn');
    detailsBtn.addEventListener('click', (event) => {
      const blogId = event.currentTarget.dataset.blogId;
      viewBlogPostDetails(blogId);
    });

    container.appendChild(postCard);
  });
}

// =================================================================================
// SEARCH AND FILTER FUNCTIONS
// =================================================================================

function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

  if (!searchTerm) {
    showToast(currentLang === 'en' ? 'Please enter a search term' : 'يرجى إدخال مصطلح البحث', 'warning');
    return;
  }

  const filteredTools = aiTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.category.toLowerCase().includes(searchTerm) ||
    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );

  if (filteredTools.length === 0) {
    showToast(currentLang === 'en' ? 'No tools found matching your search' : 'لم يتم العثور على أدوات تطابق بحثك', 'info');
    return;
  }

  document.getElementById('home-page').style.display = 'none';
  document.getElementById('tool-details-page').style.display = 'none';
  document.getElementById('blog-post-page').style.display = 'none';
  document.getElementById('about-page').style.display = 'none';
  document.getElementById('contact-page').style.display = 'none';

  const toolsContainer = document.getElementById('featured-tools-container');
  const isArabic = document.documentElement.getAttribute('lang') === 'ar';

  toolsContainer.innerHTML = `
    <div class="row">
      <div class="col-12">
        <h3 class="mb-4">${isArabic ? 'نتائج البحث' : 'Search Results'} - "${searchInput.value}" (${filteredTools.length} ${isArabic ? 'نتيجة' : 'results'})</h3>
        <button id="clearSearchBtn" class="btn btn-outline-secondary mb-3">
          <i class="fas fa-times me-2"></i>${isArabic ? 'مسح البحث' : 'Clear Search'}
        </button>
      </div>
    </div>
    <div class="row g-4">
      ${filteredTools.map((tool) => `
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card tool-card h-100">
            <div class="card-img-top position-relative">
              <img src="${tool.logo}" class="card-img-top" alt="${tool.name}" style="height: 160px; object-fit: contain; padding: 15px;">
              <span class="badge ${tool.pricing === 'Free' ? 'bg-success' : tool.pricing === 'Freemium' ? 'bg-warning' : 'bg-primary'} position-absolute top-0 end-0 m-2">
                ${tool.pricing}
              </span>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${tool.name}</h5>
              <p class="card-text flex-grow-1">${isArabic ? tool.description_ar : tool.description}</p>
              <div class="mt-auto">
                <div class="d-flex justify-content-between align-items-center">
                  <a href="${tool.url}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
                    ${isArabic ? 'زيارة الموقع' : 'Visit Site'}
                  </a>
                  <button class="btn btn-outline-secondary btn-sm favorite-toggle" data-tool='${JSON.stringify(tool).replace(/'/g, "&#39;")}'>
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', function() {
      searchInput.value = '';
      document.getElementById('home-page').style.display = 'block';
      renderTools();
    });
  }

  document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

function filterToolsByCategory(categoryName) {
  const filteredTools = aiTools.filter(tool =>
    tool.category.toLowerCase().includes(categoryName.toLowerCase())
  );

  document.getElementById('home-page').style.display = 'none';

  const toolsContainer = document.getElementById('featured-tools-container');
  const isArabic = document.documentElement.getAttribute('lang') === 'ar';

  toolsContainer.innerHTML = `
    <div class="row">
      <div class="col-12">
        <h3 class="mb-4">${isArabic ? 'الفئة' : 'Category'}: ${categoryName} (${filteredTools.length} ${isArabic ? 'أداة' : 'tools'})</h3>
        <button id="backToCategoriesBtn" class="btn btn-outline-secondary mb-3">
          <i class="fas fa-arrow-left me-2"></i>${isArabic ? 'العودة للفئات' : 'Back to Categories'}
        </button>
      </div>
    </div>
    <div class="row g-4">
      ${filteredTools.map(tool => `
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="card tool-card h-100">
            <div class="card-img-top position-relative">
              <img src="${tool.logo}" class="card-img-top" alt="${tool.name}" style="height: 160px; object-fit: contain; padding: 15px;">
              <span class="badge ${tool.pricing === 'Free' ? 'bg-success' : tool.pricing === 'Freemium' ? 'bg-warning' : 'bg-primary'} position-absolute top-0 end-0 m-2">
                ${tool.pricing}
              </span>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${tool.name}</h5>
              <p class="card-text flex-grow-1">${isArabic ? tool.description_ar : tool.description}</p>
              <div class="mt-auto">
                <div class="d-flex justify-content-between align-items-center">
                  <a href="${tool.url}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
                    ${isArabic ? 'زيارة الموقع' : 'Visit Site'}
                  </a>
                  <button class="btn btn-outline-secondary btn-sm favorite-toggle" data-tool='${JSON.stringify(tool).replace(/'/g, "&#39;")}'>
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const backToCategoriesBtn = document.getElementById('backToCategoriesBtn');
  if (backToCategoriesBtn) {
    backToCategoriesBtn.addEventListener('click', function() {
      document.getElementById('home-page').style.display = 'block';
      renderTools();
    });
  }

  document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

function showAllToolsInCategory(category, button) {
  const toolsInCategory = aiTools.filter(tool => tool.category === category);

  const categorySection = button.closest('.category-section');
  const toolsGrid = categorySection.querySelector('.row.g-4');

  toolsGrid.innerHTML = toolsInCategory.map((tool) => {
    const originalIndex = aiTools.findIndex(t => t.name === tool.name);
    const toolCard = createToolCard(tool, originalIndex);
    return toolCard.outerHTML;
  }).join('');

  button.remove();
}

function viewBlogPostDetails(blogId) {
  const post = blogPosts[blogId];
  if (!post) return;

  const title = currentLang === 'en' ? post.title_en : post.title_ar;
  const category = currentLang === 'en' ? post.category_en : post.category_ar;
  const author = currentLang === 'en' ? post.author_en : post.author_ar;
  const body = currentLang === 'en' ? post.body_en : post.body_ar;
  const byText = currentLang === 'en' ? 'By' : 'بواسطة';

  document.getElementById('blog-post-title').textContent = title;
  document.getElementById('blog-post-category').textContent = category;
  document.getElementById('blog-post-date').textContent = post.date;
  document.getElementById('blog-post-author').textContent = author;
  document.getElementById('blog-post-image').src = post.image;

  const byElement = document.querySelector('.blog-details-content .text-muted span[data-en]');
  if (byElement) {
    byElement.textContent = byText;
  }

  document.getElementById('blog-post-body-container').innerHTML = body;

  document.getElementById('blog-post-page').style.display = 'block';
  document.getElementById('home-page').style.display = 'none';

  window.scrollTo(0, 0);
}

// =================================================================================
// FAVORITES SYSTEM
// =================================================================================

function toggleFavorite(toolId, button) {
  const userData = JSON.parse(localStorage.getItem('currentUser'));

  if (!userData || !userData.isLoggedIn) {
    showToast(
      currentLang === 'en' ? 'Please login to add tools to favorites' : 'يرجى تسجيل الدخول لإضافة الأدوات إلى المفضلة',
      'info'
    );
    return;
  }

  const userId = userData.email;
  if (!favorites[userId]) {
    favorites[userId] = [];
  }

  const userFavorites = favorites[userId];
  const icon = button.querySelector('i');

  if (userFavorites.includes(toolId)) {
    const index = userFavorites.indexOf(toolId);
    userFavorites.splice(index, 1);
    icon.classList.remove('fas', 'text-danger');
    icon.classList.add('far');
    button.classList.remove('active');
    showToast(
      currentLang === 'en' ? 'Removed from favorites' : 'تمت الإزالة من المفضلة',
      'success'
    );
  } else {
    userFavorites.push(toolId);
    icon.classList.remove('far');
    icon.classList.add('fas', 'text-danger');
    button.classList.add('active');
    showToast(
      currentLang === 'en' ? 'Added to favorites' : 'تمت الإضافة إلى المفضلة',
      'success'
    );
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateFavoriteButtonState(button, toolId) {
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  if (!userData || !userData.isLoggedIn) return;

  const userId = userData.email;
  const userFavorites = favorites[userId] || [];
  const icon = button.querySelector('i');

  if (userFavorites.includes(toolId)) {
    icon.classList.remove('far');
    icon.classList.add('fas', 'text-danger');
    button.classList.add('active');
  } else {
    icon.classList.remove('fas', 'text-danger');
    icon.classList.add('far');
    button.classList.remove('active');
  }
}

function updateAllFavoriteButtons() {
  document.querySelectorAll('.favorite-toggle').forEach(button => {
    const toolId = parseInt(button.dataset.toolId);
    updateFavoriteButtonState(button, toolId);
  });
}

function showFavorites() {
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  if (!userData || !userData.isLoggedIn) {
    showToast(
      currentLang === 'en' ? 'Please login to view favorites' : 'يرجى تسجيل الدخول لعرض المفضلة',
      'info'
    );
    return;
  }

  const userId = userData.email;
  const userFavorites = favorites[userId] || [];

  if (userFavorites.length === 0) {
    showToast(
      currentLang === 'en' ? 'No favorite tools yet' : 'لا توجد أدوات مفضلة بعد',
      'info'
    );
    return;
  }

  const favoritesModalHTML = `
    <div class="modal fade favorites-modal" id="favoritesModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${currentLang === 'en' ? 'Favorite Tools' : 'الأدوات المفضلة'}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3" id="favoritesListContainer">
                        ${userFavorites.map(toolId => {
    const tool = aiTools[toolId];
    if (!tool) return '';

    const description = currentLang === 'en' ? tool.description : (tool.description_ar || tool.description);
    const detailsText = currentLang === 'en' ? 'Details' : 'تفاصيل';
    const removeText = currentLang === 'en' ? 'Remove' : 'إزالة';

    return `
      <div class="col-md-6">
          <div class="card h-100">
              <div class="card-img-top position-relative" style="height: 120px; overflow: hidden; background: linear-gradient(135deg, #401F71, #BE7B72);">
                  <img src="${tool.logo}" alt="${tool.name}" class="w-100 h-100 object-fit-contain p-2" style="object-fit: contain; background: white;">
                  <button class="btn btn-sm btn-danger position-absolute top-0 start-0 m-2 remove-favorite-btn" data-tool-id="${toolId}" title="${removeText}">
                      <i class="fas fa-times"></i>
                  </button>
              </div>
              <div class="card-body">
                  <h6 class="card-title">${tool.name}</h6>
                  <p class="card-text small">${description}</p>
                  <div class="d-flex justify-content-between align-items-center">
                      <button class="btn btn-sm btn-outline-primary view-details-btn" data-tool-id="${toolId}">
                          ${detailsText}
                      </button>
                      <span class="badge bg-secondary">${tool.pricing}</span>
                  </div>
              </div>
          </div>
      </div>
  `;
  }).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        ${currentLang === 'en' ? 'Close' : 'إغلاق'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;

  const existingModal = document.getElementById('favoritesModal');
  if (existingModal) {
    existingModal.remove();
  }

  document.body.insertAdjacentHTML('beforeend', favoritesModalHTML);


  document.getElementById('favoritesModal').addEventListener('shown.bs.modal', function () {
    document.querySelectorAll('#favoritesListContainer .view-details-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const toolId = parseInt(this.dataset.toolId);
        setTimeout(() => {
          showToolDetails(toolId);
        }, 300);
      });
    });

    document.querySelectorAll('#favoritesListContainer .remove-favorite-btn').forEach(btn => {
      btn.addEventListener('click', function (event) {
        event.stopPropagation();
        const toolId = parseInt(this.dataset.toolId);

        const index = userFavorites.indexOf(toolId);
        if (index > -1) {
          userFavorites.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(favorites));

          this.closest('.col-md-6').remove();

          updateAllFavoriteButtons();

          showToast(
            currentLang === 'en' ? 'Removed from favorites' : 'تمت الإزالة من المفضلة',
            'success'
          );
        }

        if (document.querySelectorAll('#favoritesListContainer .col-md-6').length === 0) {
          document.getElementById('favoritesListContainer').innerHTML = `
            <div class="col-12">
                <div class="empty-favorites text-center py-5">
                    <i class="fas fa-heart fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">${currentLang === 'en' ? 'No favorite tools' : 'لا توجد أدوات مفضلة'}</h4>
                    <p class="text-muted">${currentLang === 'en' ? 'Start adding tools to your favorites!' : 'ابدأ بإضافة الأدوات إلى مفضلتك!'}</p>
                </div>
            </div>
        `;
        }
      });
    });
  });
}

// =================================================================================
// STATIC PAGES FUNCTIONS
// =================================================================================

function showAboutPage() {
  console.log('🔄 Showing About Page');

  document.getElementById('home-page').style.display = 'none';
  document.getElementById('tool-details-page').style.display = 'none';
  document.getElementById('blog-post-page').style.display = 'none';
  document.getElementById('contact-page').style.display = 'none';

  const aboutPage = document.getElementById('about-page');
  aboutPage.style.display = 'block';

  const aboutContentElement = document.getElementById('about-content');
  if (aboutContentElement) {
    aboutContentElement.innerHTML = currentLang === 'en' ? aboutContent.en : aboutContent.ar;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showContactPage() {
  console.log('🔄 Showing Contact Page');

  document.getElementById('home-page').style.display = 'none';
  document.getElementById('tool-details-page').style.display = 'none';
  document.getElementById('blog-post-page').style.display = 'none';
  document.getElementById('about-page').style.display = 'none';

  const contactPage = document.getElementById('contact-page');
  contactPage.style.display = 'block';

  const contactContentElement = document.getElementById('contact-content');
  if (contactContentElement) {
    contactContentElement.innerHTML = currentLang === 'en' ? contactContent.en : contactContent.ar;
  }

  setupContactForm();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.reset();

    contactForm.onsubmit = function (e) {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value;
      const email = document.getElementById('contactEmail')?.value;
      const subject = document.getElementById('contactSubject')?.value;
      const message = document.getElementById('contactMessage')?.value;

      if (!name || !email || !subject || !message) {
        showToast(
          currentLang === 'en'
            ? 'Please fill in all fields'
            : 'يرجى ملء جميع الحقول',
          'error'
        );
        return;
      }

      console.log('📧 Contact Form Submitted:', { name, email, subject, message });

      showToast(
        currentLang === 'en'
          ? 'Thank you for your message! We will get back to you soon.'
          : 'شكرًا على رسالتك! سنتواصل معك قريبًا.',
        'success'
      );

      contactForm.reset();
    };
  }
}

// =================================================================================
// TOOL DETAILS FUNCTIONS
// =================================================================================

function showToolDetails(toolId) {
  const tool = aiTools[toolId];
  if (!tool) return;

  console.log('🔍 Showing details for:', tool.name);

  document.getElementById('home-page').style.display = 'none';
  document.getElementById('tool-details-page').style.display = 'block';

  document.getElementById('detail-tool-name').textContent = tool.name;
  document.getElementById('detail-tool-full-description').textContent = currentLang === 'en' ? tool.description : (tool.description_ar || tool.description);
  document.getElementById('detail-tool-pricing').textContent = tool.pricing;
  document.getElementById('detail-tool-category').textContent = tool.category;
  document.getElementById('detail-tool-url').href = tool.url;

  const descriptionElement = document.getElementById('detail-tool-description');
  if (descriptionElement) {
    descriptionElement.textContent = currentLang === 'en' ? tool.description : (tool.description_ar || tool.description);
  }

  const featuresList = document.getElementById('detail-tool-features');
  if (featuresList && tool.tags) {
    featuresList.innerHTML = '';
    tool.tags.forEach(tag => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${tag}`;
      featuresList.appendChild(li);
    });
  }

  const specsGrid = document.getElementById('detail-tool-specs');
  if (specsGrid) {
    specsGrid.innerHTML = `
      <div class="spec-item">
          <div class="spec-label">${currentLang === 'en' ? 'Category' : 'الفئة'}</div>
          <div class="spec-value">${tool.category}</div>
      </div>
      <div class="spec-item">
          <div class="spec-label">${currentLang === 'en' ? 'Pricing' : 'التسعير'}</div>
          <div class="spec-value">${tool.pricing}</div>
      </div>
      <div class="spec-item">
          <div class="spec-label">${currentLang === 'en' ? 'Type' : 'النوع'}</div>
          <div class="spec-value">${tool.tags ? tool.tags[0] : 'AI Tool'}</div>
      </div>
    `;
  }

  loadSameCategoryTools(tool.category, tool.name);

  window.scrollTo(0, 0);
}

function loadSameCategoryTools(category, currentToolName) {
  const sameCategoryContainer = document.getElementById('same-category-container');
  const onlyToolMessage = document.getElementById('only-tool-message');
  const sameCategoryTitle = document.getElementById('same-category-title');

  if (!sameCategoryContainer) return;

  const sameCategoryTools = aiTools.filter(tool =>
    tool.category === category && tool.name !== currentToolName
  );

  if (sameCategoryTitle) {
    sameCategoryTitle.textContent = currentLang === 'ar' ?
      `أدوات من نفس الفئة (${sameCategoryTools.length})` :
      `Tools in the Same Category (${sameCategoryTools.length})`;
  }

  if (sameCategoryTools.length === 0) {
    sameCategoryContainer.innerHTML = '';
    if (onlyToolMessage) onlyToolMessage.style.display = 'block';
    return;
  }

  if (onlyToolMessage) onlyToolMessage.style.display = 'none';

  const toolsToShow = sameCategoryTools.slice(0, 6);
  sameCategoryContainer.innerHTML = toolsToShow.map(tool => {
    const description = currentLang === 'ar' && tool.description_ar ? tool.description_ar : tool.description;
    return `
      <div class="col-xl-4 col-lg-6 col-md-6">
        <div class="same-category-card">
            <div class="same-category-card-img">
                <img src="${tool.logo}" alt="${tool.name}" class="same-category-card-image"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvZ28gTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="same-category-card-body">
                <h5 class="same-category-card-title">${tool.name}</h5>
                <span class="badge bg-primary same-category-card-badge">${tool.category}</span>
                <p class="same-category-card-text">${description}</p>
                <div class="same-category-card-footer">
                    <button class="btn btn-outline-primary same-category-details-btn"
                            onclick="showToolDetails(${aiTools.findIndex(t => t.name === tool.name)})">
                        <span data-ar="التفاصيل" data-en="Details">Details</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    `;
  }).join('');
}

// =================================================================================
// USER MANAGEMENT FUNCTIONS
// =================================================================================

function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showAlert('Please fill in all fields', 'error', 'loginError');
    return;
  }

  showAlert('Login successful!', 'success', 'loginError');

  const user = {
    name: email.split('@')[0],
    email: email,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('currentUser', JSON.stringify(user));

  setTimeout(() => {}, 1500);
}

function handleSignup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!name || !email || !password || !confirmPassword) {
    showAlert('Please fill in all fields', 'error', 'signupError');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('Passwords do not match', 'error', 'signupError');
    return;
  }

  showAlert('Account created successfully!', 'success', 'signupSuccess');

  const user = {
    name: name,
    email: email,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('currentUser', JSON.stringify(user));

  setTimeout(() => {

    updateUserInterface();
    document.getElementById('signupForm').reset();
  }, 1500);
}

function updateUserInterface() {
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const authButton = document.getElementById('authButton');
  const favoritesBtn = document.getElementById('favoritesBtn');

  if (userData && userData.isLoggedIn) {
    authButton.innerHTML = '<i class="fas fa-sign-out-alt me-2"></i>' + (currentLang === 'en' ? 'Logout' : 'تسجيل الخروج');
    authButton.onclick = handleLogout;

    favoritesBtn.style.display = 'inline-block';
    favoritesBtn.innerHTML = '<i class="fas fa-heart me-2"></i>' + (currentLang === 'en' ? 'Favorites' : 'المفضلة');
    favoritesBtn.onclick = showFavorites;

    updateAllFavoriteButtons();
  } else {
    authButton.innerHTML = '<i class="fas fa-user me-2"></i>' + (currentLang === 'en' ? 'Login' : 'تسجيل الدخول');
    authButton.onclick = function () {
    };

    favoritesBtn.style.display = 'none';
  }
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  updateUserInterface();

  showToast(
    currentLang === 'en' ? 'Logged out successfully' : 'تم تسجيل الخروج بنجاح',
    'success'
  );
}

function checkLoginStatus() {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    const user = JSON.parse(userData);
    if (user.isLoggedIn) {
      updateUserInterface();
    }
  }
}

function showAlert(message, type, elementId) {
  const alertElement = document.getElementById(elementId);
  if (alertElement) {
    alertElement.textContent = message;
    alertElement.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    alertElement.style.display = 'block';

    setTimeout(() => {
      alertElement.style.display = 'none';
    }, 5000);
  }
}

// =================================================================================
// TOAST NOTIFICATION FUNCTION
// =================================================================================

function showToast(message, type = 'info') {
  const existingToasts = document.querySelectorAll('.custom-toast');
  existingToasts.forEach(toast => toast.remove());

  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  };

  toast.innerHTML = `
    <div class="toast-icon">
        <i class="${icons[type] || icons.info}"></i>
    </div>
    <div class="toast-message">${message}</div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// =================================================================================
// ANIMATIONS
// =================================================================================

function startAnimations() {
  const counter = document.querySelector('.counter');
  if (counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    let current = 0;
    const increment = target / 100;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 20);
  }
}

// =================================================================================
// EVENT LISTENERS SETUP
// =================================================================================

function setupEventListeners() {
  console.log('Setting up event listeners...');

  // استخدام event delegation للتعامل مع أزرار التصنيفات
  document.addEventListener('click', function(e) {
    // إذا تم النقر على category card أو أي عنصر داخلها
    if (e.target.closest('.category-card')) {
      const categoryCard = e.target.closest('.category-card');
      const categoryName = categoryCard.getAttribute('data-category');
      
      if (categoryName) {
        console.log('🎯 Clicked category:', categoryName);
        filterToolsByCategory(categoryName);
      } else {
        console.warn('❌ No data-category attribute found on category card');
      }
    }
  });

  // باقي event listeners...
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    console.log('Theme toggle button found');
    themeToggle.addEventListener('click', toggleTheme);
  } else {
    console.log('Theme toggle button NOT found');
  }

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    console.log('Language toggle button found');
    langToggle.addEventListener('click', toggleLanguage);
  } else {
    console.log('Language toggle button NOT found');
  }

  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  const backToHome = document.getElementById('back-to-home');
  if (backToHome) {
    backToHome.addEventListener('click', function () {
      document.getElementById('tool-details-page').style.display = 'none';
      document.getElementById('home-page').style.display = 'block';
    });
  }

  const backToHomeFromBlog = document.getElementById('back-to-home-from-blog');
  if (backToHomeFromBlog) {
    backToHomeFromBlog.addEventListener('click', function () {
      document.getElementById('blog-post-page').style.display = 'none';
      document.getElementById('home-page').style.display = 'block';
    });
  }

  const backToHomeFromAbout = document.getElementById('back-to-home-from-about');
  if (backToHomeFromAbout) {
    backToHomeFromAbout.addEventListener('click', function () {
      document.getElementById('about-page').style.display = 'none';
      document.getElementById('home-page').style.display = 'block';
    });
  }

  const backToHomeFromContact = document.getElementById('back-to-home-from-contact');
  if (backToHomeFromContact) {
    backToHomeFromContact.addEventListener('click', function () {
      document.getElementById('contact-page').style.display = 'none';
      document.getElementById('home-page').style.display = 'block';
    });
  }

  const aboutLink = document.getElementById('about-link');
  if (aboutLink) {
    aboutLink.addEventListener('click', function (e) {
      e.preventDefault();
      showAboutPage();
    });
  }

  const contactLink = document.getElementById('contact-link');
  if (contactLink) {
    contactLink.addEventListener('click', function (e) {
      e.preventDefault();
      showContactPage();
    });
  }

  updateUserInterface();

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleLogin();
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSignup();
    });
  }

  const exploreToolsBtn = document.getElementById('exploreToolsBtn');
  if (exploreToolsBtn) {
    exploreToolsBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const browseCategoriesBtn = document.getElementById('browseCategoriesBtn');
  if (browseCategoriesBtn) {
    browseCategoriesBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const favoritesBtn = document.getElementById('favoritesBtn');
  if (favoritesBtn) {
    favoritesBtn.addEventListener('click', showFavorites);
  }
}

// =================================================================================
// INITIALIZATION
// =================================================================================

async function initializeApp() {
  console.log('🚀 Initializing app...');

  favorites = JSON.parse(localStorage.getItem('favorites')) || {};

  const savedTheme = localStorage.getItem("theme") || "light";
  const savedLang = localStorage.getItem("lang") || "en";

  console.log('🎨 Saved theme:', savedTheme);
  console.log('🌐 Saved language:', savedLang);

  applyTheme(savedTheme);
  applyLanguage(savedLang);

  renderTools();
  renderCategories();
  renderBlogPosts();
  setupEventListeners();
  startAnimations();

  checkLoginStatus();

  console.log('✅ App initialized successfully');
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('📄 DOM Content Loaded - Starting initialization');
  initializeApp();
});

// Improved navbar link behavior
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  let activeLink = null;

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      activeLink = this;
    });

    link.addEventListener('mouseenter', function() {
      if (activeLink && activeLink !== this) {
        activeLink.classList.remove('active');
      }
    });

    link.addEventListener('mouseleave', function() {
      if (activeLink && activeLink !== this) {
        activeLink.classList.add('active');
      }
    });
  });

  // Set initial active state
  const currentPath = window.location.hash;
  if (currentPath) {
    const targetLink = document.querySelector(`.nav-link[href="${currentPath}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
      activeLink = targetLink;
    }
  } else {
    // Default to first link
    const firstLink = document.querySelector('.nav-link');
    if (firstLink) {
      firstLink.classList.add('active');
      activeLink = firstLink;
    }
  }
});

// أبسط حل لأزرار التصنيفات
document.addEventListener('click', function(e) {
    // إذا تم النقر على أي عنصر داخل category-card
    if (e.target.closest('.category-card')) {
        const categoryCard = e.target.closest('.category-card');
        const categoryTitle = categoryCard.querySelector('.category-title');
        
        if (categoryTitle) {
            const categoryName = categoryTitle.textContent.trim();
            console.log('🎯 Clicked category:', categoryName);
            filterToolsByCategory(categoryName);
        }
    }
});

console.log('✅ Category buttons fix applied');

// أضف هذه الدالة للتحقق من أن التصنيفات تم إنشاؤها بشكل صحيح
function debugCategories() {
  const categoryCards = document.querySelectorAll('.category-card');
  console.log(`🔍 Found ${categoryCards.length} category cards`);
  
  categoryCards.forEach((card, index) => {
    const categoryName = card.getAttribute('data-category');
    const title = card.querySelector('.category-title')?.textContent;
    console.log(`Category ${index + 1}:`, { 
      dataCategory: categoryName, 
      title: title,
      element: card 
    });
  });
}

// ثم استدعها في initializeApp بعد renderCategories
async function initializeApp() {
  console.log('🚀 Initializing app...');

  favorites = JSON.parse(localStorage.getItem('favorites')) || {};

  const savedTheme = localStorage.getItem("theme") || "light";
  const savedLang = localStorage.getItem("lang") || "en";

  console.log('🎨 Saved theme:', savedTheme);
  console.log('🌐 Saved language:', savedLang);

  applyTheme(savedTheme);
  applyLanguage(savedLang);

  renderTools();
  renderCategories();
  renderBlogPosts();
  setupEventListeners();
  
  // التحقق من التصنيفات
  setTimeout(debugCategories, 100);
  
  startAnimations();
  checkLoginStatus();

  console.log('✅ App initialized successfully');
}

// بديل أبسط - أضف هذا في نهاية الملف
document.addEventListener('DOMContentLoaded', function() {
  // حل مباشر لأزرار التصنيفات
  document.addEventListener('click', function(e) {
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
      const categoryTitle = categoryCard.querySelector('.category-title');
      if (categoryTitle) {
        const categoryName = categoryTitle.textContent.trim();
        console.log('🎯 Clicked category:', categoryName);
        filterToolsByCategory(categoryName);
      }
    }
  });
});

// حل شامل لمشكلة التصنيفات
function fixCategoriesIssue() {
    console.log('🔧 Fixing categories issue...');
    
    // إزالة جميع event listeners السابقة
    document.removeEventListener('click', handleCategoryClick);
    
    // إضافة event listener جديد
    document.addEventListener('click', handleCategoryClick);
    
    // تحديث data-category attributes
    updateCategoryAttributes();
}

function handleCategoryClick(e) {
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
        e.preventDefault();
        e.stopPropagation();
        
        const categoryTitle = categoryCard.querySelector('.category-title');
        if (categoryTitle) {
            const categoryName = categoryTitle.textContent.trim();
            console.log('🎯 Clicked category:', categoryName);
            
            // البحث عن اسم التصنيف المقابل في بيانات التصنيفات
            const matchedCategory = findMatchingCategory(categoryName);
            if (matchedCategory) {
                console.log('✅ Found matching category:', matchedCategory);
                filterToolsByCategory(matchedCategory);
            } else {
                console.log('❌ No matching category found for:', categoryName);
                // محاولة استخدام الاسم كما هو
                filterToolsByCategory(categoryName);
            }
        }
    }
}

function findMatchingCategory(displayName) {
    // البحث في التصنيفات الإنجليزية
    const englishMatch = categories.find(cat => 
        cat.name.toLowerCase() === displayName.toLowerCase()
    );
    if (englishMatch) return englishMatch.name;
    
    // البحث في التصنيفات العربية
    const arabicMatch = categories.find(cat => 
        cat.name_ar === displayName
    );
    if (arabicMatch) return arabicMatch.name;
    
    return null;
}

function updateCategoryAttributes() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const categoryTitle = card.querySelector('.category-title');
        if (categoryTitle) {
            const displayName = categoryTitle.textContent.trim();
            const matchedCategory = findMatchingCategory(displayName);
            if (matchedCategory) {
                card.setAttribute('data-category', matchedCategory);
            }
        }
    });
}

// تحسين دالة filterToolsByCategory
function filterToolsByCategory(categoryName) {
    console.log('🔍 Filtering tools by category:', categoryName);
    
    // تنظيف اسم التصنيف
    const cleanCategoryName = categoryName.trim();
    
    const filteredTools = aiTools.filter(tool => {
        const toolCategory = tool.category ? tool.category.trim() : '';
        return toolCategory.toLowerCase() === cleanCategoryName.toLowerCase();
    });

    console.log(`📊 Found ${filteredTools.length} tools in category: ${cleanCategoryName}`);
    
    if (filteredTools.length === 0) {
        showToast(
            currentLang === 'en' 
                ? `No tools found in category: ${cleanCategoryName}`
                : `لم يتم العثور على أدوات في الفئة: ${cleanCategoryName}`,
            'info'
        );
        return;
    }

    // إخفاء الصفحة الرئيسية وإظهار النتائج
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('tool-details-page').style.display = 'none';
    document.getElementById('blog-post-page').style.display = 'none';
    document.getElementById('about-page').style.display = 'none';
    document.getElementById('contact-page').style.display = 'none';

    const toolsContainer = document.getElementById('featured-tools-container');
    const isArabic = currentLang === 'ar';

    // العثور على اسم التصنيف المعروض
    const categoryDisplayName = getCategoryDisplayName(cleanCategoryName);
    
    toolsContainer.innerHTML = `
        <div class="row">
            <div class="col-12">
                <h3 class="mb-4">${isArabic ? 'الفئة:' : 'Category:'} ${categoryDisplayName} (${filteredTools.length} ${isArabic ? 'أداة' : 'tools'})</h3>
                <button id="backToAllToolsBtn" class="btn btn-outline-secondary mb-3">
                    <i class="fas fa-arrow-left me-2"></i>${isArabic ? 'العودة لجميع الأدوات' : 'Back to All Tools'}
                </button>
            </div>
        </div>
        <div class="row g-4">
            ${filteredTools.map((tool, index) => {
                const originalIndex = aiTools.findIndex(t => t.name === tool.name);
                const description = isArabic ? (tool.description_ar || tool.description) : tool.description;
                const visitText = isArabic ? 'زيارة الموقع' : 'Visit Site';
                
                return `
                    <div class="col-xl-3 col-lg-4 col-md-6">
                        <div class="card tool-card h-100">
                            <div class="card-img-top position-relative" style="height: 160px; overflow: hidden; background: linear-gradient(135deg, #401F71, #BE7B72);">
                                <img src="${tool.logo}" alt="${tool.name}" class="w-100 h-100 object-fit-contain p-3" style="object-fit: contain; background: white;">
                                <span class="badge ${tool.pricing === 'Free' ? 'bg-success' : tool.pricing === 'Freemium' ? 'bg-warning' : 'bg-primary'} position-absolute top-0 end-0 m-2">
                                    ${tool.pricing}
                                </span>
                                <button class="btn btn-sm btn-dark position-absolute top-0 start-0 m-2 favorite-toggle" data-tool-id="${originalIndex}">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold">${tool.name}</h5>
                                <p class="card-text flex-grow-1">${description}</p>
                                <div class="mt-auto">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <a href="${tool.url}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
                                            ${visitText}
                                        </a>
                                        <button class="btn btn-outline-primary btn-sm view-details-btn" data-tool-id="${originalIndex}">
                                            ${isArabic ? 'التفاصيل' : 'Details'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    // إضافة event listeners للأزرار الجديدة
    const backToAllToolsBtn = document.getElementById('backToAllToolsBtn');
    if (backToAllToolsBtn) {
        backToAllToolsBtn.addEventListener('click', function() {
            document.getElementById('home-page').style.display = 'block';
            renderTools();
        });
    }

    // إضافة event listeners لأزرار التفاصيل والمفضلة
    setTimeout(() => {
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const toolId = parseInt(this.dataset.toolId);
                showToolDetails(toolId);
            });
        });

        document.querySelectorAll('.favorite-toggle').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const toolId = parseInt(this.dataset.toolId);
                toggleFavorite(toolId, this);
            });
            // تحديث حالة زر المفضلة
            const toolId = parseInt(btn.dataset.toolId);
            updateFavoriteButtonState(btn, toolId);
        });
    }, 100);

    // التمرير إلى قسم الأدوات
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

function getCategoryDisplayName(categoryName) {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
        return currentLang === 'ar' ? category.name_ar : category.name;
    }
    return categoryName;
}

// تحديث دالة initializeApp
async function initializeApp() {
    console.log('🚀 Initializing app...');

    favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLang = localStorage.getItem("lang") || "en";

    console.log('🎨 Saved theme:', savedTheme);
    console.log('🌐 Saved language:', savedLang);

    applyTheme(savedTheme);
    applyLanguage(savedLang);

    renderTools();
    renderCategories();
    renderBlogPosts();
    setupEventListeners();
    
    // إصلاح التصنيفات
    setTimeout(fixCategoriesIssue, 200);
    
    startAnimations();
    checkLoginStatus();

    console.log('✅ App initialized successfully');
}

// استدعاء الإصلاح عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Content Loaded - Starting initialization');
    initializeApp();
});

// حل فوري لمشكلة التصنيفات
function immediateCategoriesFix() {
    console.log('🚀 Applying immediate categories fix...');
    
    // إزالة جميع ال event listeners السابقة
    document.removeEventListener('click', handleCategoryClick);
    
    // إضافة event listener جديد وبسيط
    document.addEventListener('click', function(e) {
        const categoryCard = e.target.closest('.category-card');
        if (categoryCard) {
            e.preventDefault();
            e.stopPropagation();
            
            const categoryTitle = categoryCard.querySelector('.category-title');
            if (categoryTitle) {
                const clickedCategory = categoryTitle.textContent.trim();
                console.log('🎯 User clicked category:', clickedCategory);
                
                // تحويل التصنيف المختار إلى التصنيف المناسب في البيانات
                const targetCategory = mapCategory(clickedCategory);
                console.log('🎯 Mapped to category:', targetCategory);
                
                // عرض الأدوات مباشرة
                showToolsByCategory(targetCategory, clickedCategory);
            }
        }
    });
}

// دالة لتحويل التصنيفات المعروضة إلى تصنيفات البيانات
function mapCategory(displayedCategory) {
    const categoryMap = {
        // التصنيفات المعروضة → تصنيفات البيانات
        'Generative Art': 'Image Generation',
        'Generative Video': 'Video Creation', 
        'Music': 'Audio & Music',
        'Generative Code': 'AI Coding',
        'Copywriting': 'AI Writing',
        'Text-To-Speech': 'Audio & Music',
        'Text-To-Video': 'Video Creation',
        'Voice Modulation': 'Audio & Music',
        'Image Improvement': 'Image Generation',
        'Video Editing': 'Video Creation',
        'Social Media': 'Marketing',
        'Podcasting': 'Audio & Music',
        'Translation': 'AI Writing',
        'Research': 'Productivity',
        'For Fun': 'Image Generation',
        'Gaming': 'Image Generation',
        'Finance': 'Productivity',
        'Self-Improvement': 'Productivity',
        'Inspiration': 'Productivity',
        'Avatar': 'Image Generation',
        'AI Detection': 'Productivity',
        'Image Scanning': 'Image Generation',
        'Prompt Guides': 'AI Writing',
        'Speech-To-Text': 'Audio & Music',
        'Chat': 'AI Writing',
        'Aggregators': 'Productivity'
    };
    
    return categoryMap[displayedCategory] || displayedCategory;
}

// دالة مبسطة لعرض الأدوات حسب التصنيف
function showToolsByCategory(targetCategory, displayedCategory) {
    console.log(`🔍 Searching for tools in: ${targetCategory}`);
    
    const filteredTools = aiTools.filter(tool => 
        tool.category === targetCategory
    );
    
    console.log(`📊 Found ${filteredTools.length} tools for ${targetCategory}`);
    
    if (filteredTools.length === 0) {
        showToast(
            currentLang === 'en' 
                ? `No tools found in ${displayedCategory} category`
                : `لم يتم العثور على أدوات في فئة ${displayedCategory}`,
            'info'
        );
        return;
    }
    
    // إخفاء جميع الصفحات
    document.querySelectorAll('[id$="-page"]').forEach(page => {
        page.style.display = 'none';
    });
    
    const toolsContainer = document.getElementById('featured-tools-container');
    const isArabic = currentLang === 'ar';
    
    toolsContainer.innerHTML = `
        <div class="row">
            <div class="col-12">
                <h3 class="mb-4">${isArabic ? 'الفئة:' : 'Category:'} ${displayedCategory} (${filteredTools.length} ${isArabic ? 'أداة' : 'tools'})</h3>
                <button id="backToAllBtn" class="btn btn-outline-secondary mb-4">
                    <i class="fas fa-arrow-left me-2"></i>${isArabic ? 'العودة لجميع الأدوات' : 'Back to All Tools'}
                </button>
            </div>
        </div>
        <div class="row g-4">
            ${filteredTools.map((tool, index) => {
                const toolIndex = aiTools.findIndex(t => t.name === tool.name);
                const description = isArabic ? (tool.description_ar || tool.description) : tool.description;
                
                return `
                    <div class="col-xl-3 col-lg-4 col-md-6">
                        <div class="card tool-card h-100">
                            <div class="card-img-top position-relative" style="height: 160px; overflow: hidden; background: linear-gradient(135deg, #401F71, #BE7B72);">
                                <img src="${tool.logo}" alt="${tool.name}" class="w-100 h-100 object-fit-contain p-3" style="object-fit: contain; background: white;">
                                <span class="badge ${tool.pricing === 'Free' ? 'bg-success' : tool.pricing === 'Freemium' ? 'bg-warning' : 'bg-primary'} position-absolute top-0 end-0 m-2">
                                    ${tool.pricing}
                                </span>
                                <button class="btn btn-sm btn-dark position-absolute top-0 start-0 m-2 favorite-toggle" data-tool-id="${toolIndex}">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold">${tool.name}</h5>
                                <p class="card-text flex-grow-1">${description}</p>
                                <div class="mt-auto">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <a href="${tool.url}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
                                            ${isArabic ? 'زيارة الموقع' : 'Visit Site'}
                                        </a>
                                        <button class="btn btn-outline-primary btn-sm view-details-btn" data-tool-id="${toolIndex}">
                                            ${isArabic ? 'التفاصيل' : 'Details'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    // إضافة event listener للزر الرجوع
    document.getElementById('backToAllBtn').addEventListener('click', function() {
        document.getElementById('home-page').style.display = 'block';
        renderTools();
    });
    
    // إضافة event listeners للأزرار التفاعلية
    setTimeout(() => {
        // أزرار التفاصيل
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const toolId = parseInt(this.dataset.toolId);
                showToolDetails(toolId);
            });
        });
        
        // أزرار المفضلة
        document.querySelectorAll('.favorite-toggle').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const toolId = parseInt(this.dataset.toolId);
                toggleFavorite(toolId, this);
            });
            // تحديث حالة الزر
            const toolId = parseInt(btn.dataset.toolId);
            updateFavoriteButtonState(btn, toolId);
        });
    }, 100);
    
    // إظهار القسم
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

// تحديث دالة initializeApp
async function initializeApp() {
    console.log('🚀 Initializing app...');

    favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLang = localStorage.getItem("lang") || "en";

    console.log('🎨 Saved theme:', savedTheme);
    console.log('🌐 Saved language:', savedLang);

    applyTheme(savedTheme);
    applyLanguage(savedLang);

    renderTools();
    renderCategories();
    renderBlogPosts();
    setupEventListeners();
    
    // تطبيق الإصلاح الفوري
    setTimeout(immediateCategoriesFix, 300);
    
    startAnimations();
    checkLoginStatus();

    console.log('✅ App initialized successfully');
}

// تشخيص سريع للتصنيفات
function quickDiagnose() {
    console.log('🔍 Quick Categories Diagnosis:');
    console.log('📊 Available categories in data:', [...new Set(aiTools.map(tool => tool.category))]);
    console.log('🎯 Displayed categories:', categories.map(cat => ({en: cat.name, ar: cat.name_ar})));
}

// تشغيل التشخيص بعد التحميل
setTimeout(quickDiagnose, 1000);