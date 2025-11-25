const aiTools = [
    {
        "name": "HeyGen",
        "url": "https://www.heygen.com",
        "category": "Avatar",
        "description": "AI avatar video creation for presentations",
        "description_ar": "إنشاء فيديو بأفتار بالذكاء الاصطناعي للعروض التقديمية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/heygen.com",
        "icon": "bi bi-person",
        "featured": false,
        "tags": ["avatars", "presentations", "business"]
    },
    {
        "name": "D-ID",
        "url": "https://www.d-id.com",
        "category": "Avatar",
        "description": "Create realistic AI avatars from photos",
        "description_ar": "إنشاء أفتار واقعي بالذكاء الاصطناعي من الصور",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/d-id.com",
        "icon": "bi bi-person",
        "featured": false,
        "tags": ["avatar", "animation", "photos"]
    },
    {
        "name": "SadTalker",
        "url": "https://github.com/OpenTalker/SadTalker",
        "category": "Avatar",
        "description": "Open-source talking head generation",
        "description_ar": "توليد رؤوس ناطقة مفتوح المصدر",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/github.com",
        "icon": "bi bi-person",
        "featured": false,
        "tags": ["avatar", "open-source", "research"]
    },
    {
        "name": "Hedra",
        "url": "https://www.hedra.com",
        "category": "Avatar",
        "description": "Expressive AI character creation",
        "description_ar": "إنشاء شخصيات ذكاء اصطناعي معبرة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/hedra.com",
        "icon": "bi bi-person",
        "featured": false,
        "tags": ["avatar", "character", "expressive"]
    },
    {
        "name": "SpiritMe",
        "url": "https://spiritme.tech",
        "category": "Avatar",
        "description": "Instant digital avatar creation",
        "description_ar": "إنشاء أفتار رقمي فوري",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/spiritme.tech",
        "icon": "bi bi-person",
        "featured": false,
        "tags": ["avatar", "digital", "instant"]
    },
    {
        "name": "Synthesia",
        "url": "https://www.synthesia.io",
        "category": "Avatar",
        "description": "AI video generation with virtual avatars",
        "description_ar": "توليد الفيديو بالذكاء الاصطناعي مع أفتار افتراضية",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/synthesia.io",
        "icon": "bi bi-person",
        "featured": true,
        "tags": ["avatars", "generation", "virtual"]
    },
    {
        "name": "Copy.ai",
        "url": "https://www.copy.ai",
        "category": "Copywriting",
        "description": "AI-powered copywriting tool for various content needs",
        "description_ar": "أداة كتابة إعلانية بالذكاء الاصطناعي لاحتياجات المحتوى المختلفة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/copy.ai",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["copywriting", "marketing", "content"]
    },
    {
        "name": "Writesonic",
        "url": "https://writesonic.com",
        "category": "Copywriting",
        "description": "AI writing tool for blogs, ads, and marketing content",
        "description_ar": "أداة كتابة بالذكاء الاصطناعي للمدونات والإعلانات والمحتوى التسويقي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/writesonic.com",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["blogging", "content", "marketing"]
    },
    {
        "name": "Anyword",
        "url": "https://anyword.com",
        "category": "Copywriting",
        "description": "AI copywriting with performance prediction",
        "description_ar": "كتابة إعلانية بالذكاء الاصطناعي مع توقع الأداء",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/anyword.com",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["copywriting", "prediction", "marketing"]
    },
    {
        "name": "Grammarly",
        "url": "https://www.grammarly.com",
        "category": "Copywriting",
        "description": "AI writing assistant for grammar and style improvement",
        "description_ar": "مساعد الكتابة بالذكاء الاصطناعي لتحسين القواعد والأسلوب",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/grammarly.com",
        "icon": "bi bi-file-earmark-text",
        "featured": true,
        "tags": ["grammar", "editing", "proofreading"]
    },
    {
        "name": "Wordtune",
        "url": "https://www.wordtune.com",
        "category": "Copywriting",
        "description": "AI writing assistant for rewriting and improving sentences",
        "description_ar": "مساعد الكتابة بالذكاء الاصطناعي لإعادة الصياغة وتحسين الجمل",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/wordtune.com",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["rewriting", "sentences", "improvement"]
    },
    {
        "name": "QuillBot",
        "url": "https://quillbot.com",
        "category": "Copywriting",
        "description": "AI paraphrasing and grammar checking tool",
        "description_ar": "أداة إعادة الصياغة والتحقق من القواعد بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/quillbot.com",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["paraphrasing", "grammar", "rewriting"]
    },
    {
        "name": "Rytr",
        "url": "https://rytr.me",
        "category": "Copywriting",
        "description": "AI writing assistant for various content types",
        "description_ar": "مساعد الكتابة بالذكاء الاصطناعي لأنواع المحتوى المختلفة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/rytr.me",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["writing", "content", "assistant"]
    },
    {
        "name": "AI-Writer",
        "url": "https://ai-writer.com",
        "category": "Copywriting",
        "description": "AI content generator that creates original content from headlines",
        "description_ar": "مولد محتوى بالذكاء الاصطناعي ينشئ محتوى أصلي من العناوين",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/ai-writer.com",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["content", "generation", "writing"]
    },
    {
        "name": "Humanize",
        "url": "https://humanize.sh",
        "category": "Copywriting",
        "description": "Transform AI text into undetectable human writing",
        "description_ar": "تحويل نص الذكاء الاصطناعي إلى كتابة بشرية لا يمكن اكتشافها",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/humanize.sh",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["humanize", "writing", "content"]
    },
    {
        "name": "UndetectedGPT",
        "url": "https://undetectedgpt.com",
        "category": "Copywriting",
        "description": "Make AI content undetectable to any detector",
        "description_ar": "جعل محتوى الذكاء الاصطناعي غير قابل للكشف بأي أداة كشف",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/undetectedgpt.com",
        "icon": "bi bi-file-earmark-text",
        "featured": false,
        "tags": ["undetectable", "content", "writing"]
    },
    {
        "name": "CommunityOne",
        "url": "https://communityone.com",
        "category": "For Fun",
        "description": "AI-powered Discord community management that boosts engagement 4X",
        "description_ar": "إدارة مجتمع ديسكورد المدعومة بالذكاء الاصطناعي التي تعزز المشاركة 4 مرات",
        "pricing": "Unknown",
        "logo": "https://logo.clearbit.com/communityone.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["discord", "community", "engagement"]
    },
    {
        "name": "Colorjoy",
        "url": "https://colorjoy.com",
        "category": "For Fun",
        "description": "Online tool designed to generate custom coloring pages",
        "description_ar": "أداة عبر الإنترنت مصممة لتوليد صفحات تلوين مخصصة",
        "pricing": "Free",
        "logo": "https://media.theresanaiforthat.com/colorjoy.png?height=768",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "pages", "fun"]
    },
    {
        "name": "ColoringBook AI",
        "url": "https://coloringbook.ai",
        "category": "For Fun",
        "description": "Online tool that uses advanced AI technology to convert text and images into creative coloring pages",
        "description_ar": "أداة عبر الإنترنت تستخدم تقنية الذكاء الاصطناعي المتقدمة لتحويل النصوص والصور إلى صفحات تلوين إبداعية",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=coloringbook.ai&sz=128",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "pages", "creative"]
    },
    {
        "name": "Best Coloring Pages",
        "url": "https://bestcoloringpages.com",
        "category": "For Fun",
        "description": "AI-powered tool that generates printable coloring pages",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي تولد صفحات تلوين قابلة للطباعة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/bestcoloringpages.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "printable", "pages"]
    },
    {
        "name": "KidsColoringPage",
        "url": "https://kidscoloringpage.com",
        "category": "For Fun",
        "description": "AI tool that provides solution for generating customized coloring pages for kids",
        "description_ar": "أداة الذكاء الاصطناعي التي توفر حلاً لتوليد صفحات تلوين مخصصة للأطفال",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/kidscoloringpage.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["kids", "coloring", "pages"]
    },
    {
        "name": "Colorings",
        "url": "https://colorings.io",
        "category": "For Fun",
        "description": "AI-powered online tool that generates customizable coloring pages",
        "description_ar": "أداة عبر الإنترنت مدعومة بالذكاء الاصطناعي تولد صفحات تلوين قابلة للتخصيص",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=colorings.io&sz=128",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "customizable", "pages"]
    },
    {
        "name": "AI ColoringPage Online",
        "url": "https://aicoloringpage.com",
        "category": "For Fun",
        "description": "AI tool designed to generate unique and printable coloring pages",
        "description_ar": "أداة الذكاء الاصطناعي المصممة لتوليد صفحات تلوين فريدة وقابلة للطباعة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/aicoloringpage.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "pages", "printable"]
    },
    {
        "name": "AI Coloring Page Generator Online by Mimi Panda",
        "url": "https://mimipanda.com",
        "category": "For Fun",
        "description": "Artistic tool designed to stimulate imagination and creativity by generating unique coloring pages",
        "description_ar": "أداة فنية مصممة لتحفيز الخيال والإبداع من خلال توليد صفحات تلوين فريدة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/mimipanda.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "creativity", "art"]
    },
    {
        "name": "GG-KA",
        "url": "https://gg-ka.com",
        "category": "For Fun",
        "description": "Transform any image into captivating coloring pages",
        "description_ar": "تحويل أي صورة إلى صفحات تلوين جذابة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/gg-ka.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "images", "transform"]
    },
    {
        "name": "Create Coloring Pictures",
        "url": "https://createcoloringpictures.com",
        "category": "For Fun",
        "description": "Transform ideas into captivating coloring pages with AI-powered tool",
        "description_ar": "تحويل الأفكار إلى صفحات تلوين جذابة باستخدام أداة مدعومة بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/createcoloringpictures.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "ideas", "pages"]
    },
    {
        "name": "ColoringMagician",
        "url": "https://coloringmagician.com",
        "category": "For Fun",
        "description": "AI-Powered coloring pages generator that lets users create unlimited customized coloring pages",
        "description_ar": "مولد صفحات تلوين مدعوم بالذكاء الاصطناعي يسمح للمستخدمين بإنشاء صفحات تلوين مخصصة غير محدودة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/coloringmagician.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "magic", "pages"]
    },
    {
        "name": "iColoring AI",
        "url": "https://icoloring.ai",
        "category": "For Fun",
        "description": "AI application designed to convert text or images into printable coloring pages",
        "description_ar": "تطبيق ذكاء اصطناعي مصمم لتحويل النص أو الصور إلى صفحات تلوين قابلة للطباعة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/icoloring.ai",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "text-to-image", "pages"]
    },
    {
        "name": "Colorendo",
        "url": "https://colorendo.com",
        "category": "For Fun",
        "description": "AI-powered tool designed to generate custom coloring pages",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي مصممة لتوليد صفحات تلوين مخصصة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/colorendo.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "custom", "pages"]
    },
    {
        "name": "AI Coloring Book Generator",
        "url": "https://aicoloringbook.com",
        "category": "For Fun",
        "description": "Create stunning, printable coloring pages with AI Coloring Book Generator",
        "description_ar": "إنشاء صفحات تلوين مذهلة وقابلة للطباعة مع مولد كتاب التلوين بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/aicoloringbook.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "book", "generator"]
    },
    {
        "name": "Coloring-Pages.app",
        "url": "https://coloring-pages.app",
        "category": "For Fun",
        "description": "AI powered tool that generates printable coloring pages",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي تولد صفحات تلوين قابلة للطباعة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/coloring-pages.app",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "pages", "printable"]
    },
    {
        "name": "ColorPenguin",
        "url": "https://colorpenguin.com",
        "category": "For Fun",
        "description": "AI-powered tool designed to create unique, printable coloring pages",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي مصممة لإنشاء صفحات تلوين فريدة وقابلة للطباعة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/colorpenguin.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "penguin", "pages"]
    },
    {
        "name": "ColorinAI",
        "url": "https://colorinai.com",
        "category": "For Fun",
        "description": "Design tool crafted to generate coloring pages and books leveraging AI capabilities",
        "description_ar": "أداة تصميم مصممة لتوليد صفحات وكتب تلوين باستخدام إمكانيات الذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/colorinai.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "design", "books"]
    },
    {
        "name": "ColorifyAI",
        "url": "https://colorifyai.com",
        "category": "For Fun",
        "description": "AI-powered tool that generates coloring pages from text or photos",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي تولد صفحات تلوين من النصوص أو الصور",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/colorifyai.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "text-to-image", "photos"]
    },
    {
        "name": "PalettePlay",
        "url": "https://paletteplay.com",
        "category": "For Fun",
        "description": "Digital platform designed to nurture creativity through customizable coloring pages",
        "description_ar": "منصة رقمية مصممة لتنمية الإبداع من خلال صفحات تلوين قابلة للتخصيص",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/paletteplay.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "creativity", "platform"]
    },
    {
        "name": "Cool Coloring Pages",
        "url": "https://coolcoloringpages.com",
        "category": "For Fun",
        "description": "AI-powered tool that generates unique coloring pages for kids and adults",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي تولد صفحات تلوين فريدة للأطفال والكبار",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/coolcoloringpages.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "cool", "pages"]
    },
    {
        "name": "ColorArt AI",
        "url": "https://colorart.ai",
        "category": "For Fun",
        "description": "Intelligent tool that connects AI with creativity to democratize creation of printable coloring pages",
        "description_ar": "أداة ذكية تربط الذكاء الاصطناعي بالإبداع لإضفاء الطابع الديمقراطي على إنشاء صفحات تلوين قابلة للطباعة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/colorart.ai",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "art", "democratize"]
    },
    {
        "name": "ColorMon",
        "url": "https://colormon.com",
        "category": "For Fun",
        "description": "AI-powered tool that allows users to generate coloring pages online instantaneously",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي تسمح للمستخدمين بتوليد صفحات تلوين عبر الإنترنت على الفور",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/colormon.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "instant", "online"]
    },
    {
        "name": "ColorMe.ai",
        "url": "https://colorme.ai",
        "category": "For Fun",
        "description": "AI-powered tool designed to transform photos or text into printable coloring pages",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي مصممة لتحويل الصور أو النص إلى صفحات تلوين قابلة للطباعة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/colorme.ai",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "photos", "text"]
    },
    {
        "name": "Dad Can't Draw",
        "url": "https://dadcantdraw.com",
        "category": "For Fun",
        "description": "AI-powered tool that lets you generate custom coloring pages designed for children",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي تتيح لك إنشاء صفحات تلوين مخصصة مصممة للأطفال",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/dadcantdraw.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "kids", "dad"]
    },
    {
        "name": "ColorHippo",
        "url": "https://colorhippo.com",
        "category": "For Fun",
        "description": "AI tool designed to generate customizable coloring pages from text prompts or photos",
        "description_ar": "أداة ذكاء اصطناعي مصممة لتوليد صفحات تلوين قابلة للتخصيص من نصوص أو صور",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/colorhippo.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "hippo", "customizable"]
    },
    {
        "name": "My professional coloring book",
        "url": "https://mycoloringbook.com",
        "category": "For Fun",
        "description": "Transform illustrations into vibrant color and black-and-white versions for coloring pages",
        "description_ar": "تحويل الرسوم التوضيحية إلى إصدارات ملونة وأبيض وأسود نابضة بالحياة لصفحات التلوين",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/mycoloringbook.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "book", "professional"]
    },
    {
        "name": "AI Coloring Pages",
        "url": "https://aicoloringpages.com",
        "category": "For Fun",
        "description": "AI Coloring Pages Generator leverages Stable Diffusion XL technology to create unique coloring pages",
        "description_ar": "يستفيد مولد صفحات التلوين بالذكاء الاصطناعي من تقنية Stable Diffusion XL لإنشاء صفحات تلوين فريدة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/aicoloringpages.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "stable-diffusion", "pages"]
    },
    {
        "name": "Generator Coloring Page",
        "url": "https://generatorcoloringpage.com",
        "category": "For Fun",
        "description": "Transform ideas into captivating coloring pages with AI generator",
        "description_ar": "تحويل الأفكار إلى صفحات تلوين جذابة باستخدام مولد الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/generatorcoloringpage.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "generator", "pages"]
    },
    {
        "name": "Dreamy Illustration Adult Coloring",
        "url": "https://dreamycoloring.com",
        "category": "For Fun",
        "description": "Unleash creativity with dreamy illustration adult coloring pages",
        "description_ar": "أطلق العنان لإبداعك مع صفحات تلوين للكبار برسوم توضيحية حالمة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/dreamycoloring.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "adult", "dreamy"]
    },
    {
        "name": "Coloring book generator",
        "url": "https://coloringbookgenerator.com",
        "category": "For Fun",
        "description": "Transform ideas into captivating coloring book pages with AI-generated line art",
        "description_ar": "تحويل الأفكار إلى صفحات كتاب تلوين جذابة بفن الخطوط المولد بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/coloringbookgenerator.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "book", "generator"]
    },
    {
        "name": "Bulk create Coloring Pages",
        "url": "https://bulkcoloringpages.com",
        "category": "For Fun",
        "description": "Unleash creativity with AI-powered coloring page generator for diverse designs",
        "description_ar": "أطلق العنان للإبداع مع مولد صفحات التلوين المدعوم بالذكاء الاصطناعي للتصميمات المتنوعة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/bulkcoloringpages.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "bulk", "pages"]
    },
    {
        "name": "eBookColoring",
        "url": "https://ebookcoloring.com",
        "category": "For Fun",
        "description": "AI-powered platform that helps users transform ideas into coloring pages and full ebooks",
        "description_ar": "منصة مدعومة بالذكاء الاصطناعي تساعد المستخدمين على تحويل الأفكار إلى صفحات تلوين وكتب إلكترونية كاملة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/ebookcoloring.com",
        "icon": "bi bi-emoji-smile",
        "featured": false,
        "tags": ["coloring", "ebook", "platform"]
    },
    {
        "name": "Midjourney",
        "url": "https://www.midjourney.com",
        "category": "Generative Art",
        "description": "AI image generation through Discord",
        "description_ar": "توليد الصور بالذكاء الاصطناعي عبر ديسكورد",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/midjourney.com",
        "icon": "bi bi-palette",
        "featured": true,
        "tags": ["art", "generation", "discord"]
    },
    {
        "name": "DALL-E 3",
        "url": "https://openai.com/dall-e-3",
        "category": "Generative Art",
        "description": "Advanced AI image generation from text prompts",
        "description_ar": "توليد الصور المتقدم بالذكاء الاصطناعي من النصوص",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/openai.com",
        "icon": "bi bi-palette",
        "featured": true,
        "tags": ["generation", "openai", "art"]
    },
    {
        "name": "Stable Diffusion",
        "url": "https://stability.ai",
        "category": "Generative Art",
        "description": "Open-source AI image generation model",
        "description_ar": "نموذج مفتوح المصدر لتوليد الصور بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://www.google.com/s2/favicons?domain=stability.ai&sz=128",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["open-source", "generation", "art"]
    },
    {
        "name": "Leonardo AI",
        "url": "https://leonardo.ai",
        "category": "Generative Art",
        "description": "AI art generation platform with various styles",
        "description_ar": "منصة توليد الفن بالذكاء الاصطناعي بأنماط متنوعة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/leonardo.ai",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["art", "styles", "platform"]
    },
    {
        "name": "Runway ML",
        "url": "https://runwayml.com",
        "category": "Generative Art",
        "description": "Creative suite for AI-powered image and video generation",
        "description_ar": "مجموعة أدوات إبداعية لتوليد الصور والفيديو بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/runwayml.com",
        "icon": "bi bi-palette",
        "featured": true,
        "tags": ["creative", "video", "generation"]
    },
    {
        "name": "Canva AI",
        "url": "https://www.canva.com/ai",
        "category": "Generative Art",
        "description": "AI design tools integrated in Canva platform",
        "description_ar": "أدوات التصميم بالذكاء الاصطناعي المدمجة في منصة Canva",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/canva.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["design", "platform", "tools"]
    },
    {
        "name": "Adobe Firefly",
        "url": "https://www.adobe.com/firefly",
        "category": "Generative Art",
        "description": "AI image generation from Adobe Creative Cloud",
        "description_ar": "توليد الصور بالذكاء الاصطناعي من أدوبي كرييتيف كلاود",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
        "icon": "bi bi-palette",
        "featured": true,
        "tags": ["adobe", "creative", "generation"]
    },
    {
        "name": "Clipdrop",
        "url": "https://clipdrop.co",
        "category": "Generative Art",
        "description": "AI image editing and generation tool",
        "description_ar": "أداة تحرير وتوليد الصور بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/clipdrop.co",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["editing", "generation", "tools"]
    },
    {
        "name": "DreamStudio",
        "url": "https://dreamstudio.ai",
        "category": "Generative Art",
        "description": "Stable Diffusion web interface for image generation",
        "description_ar": "واجهة ويب Stable Diffusion لتوليد الصور",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/dreamstudio.ai",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["stable-diffusion", "generation", "web"]
    },
    {
        "name": "NightCafe",
        "url": "https://nightcafe.studio",
        "category": "Generative Art",
        "description": "AI art generator with multiple models",
        "description_ar": "مولد الفن بالذكاء الاصطناعي بنماذج متعددة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/nightcafe.studio",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["art", "generation", "multiple-models"]
    },
    {
        "name": "Deepdreamgenerator",
        "url": "https://deepdreamgenerator.com",
        "category": "Generative Art",
        "description": "Generate unique images from text prompts using AI",
        "description_ar": "توليد صور فريدة من النصوص باستخدام الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/deepdreamgenerator.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["art", "generation", "images"]
    },
    {
        "name": "Stockimg AI",
        "url": "https://stockimg.ai",
        "category": "Generative Art",
        "description": "Generate AI logos, book covers, posters and more",
        "description_ar": "توليد شعارات واغلفة كتب وملصقات بالذكاء الاصطناعي والمزيد",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/stockimg.ai",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["logos", "design", "images"]
    },
    {
        "name": "Kolors AI",
        "url": "https://kolors.ai",
        "category": "Generative Art",
        "description": "AI Design Agent for your creation needs",
        "description_ar": "وكيل تصميم بالذكاء الاصطناعي لاحتياجات إبداعك",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/kolors.ai",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["design", "creation", "art"]
    },
    {
        "name": "img2img AI",
        "url": "https://img2img.ai",
        "category": "Generative Art",
        "description": "Transform images with AI-powered editing controls",
        "description_ar": "تحويل الصور باستخدام أدوات تحرير مدعومة بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/img2img.ai",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["editing", "transformation", "images"]
    },
    {
        "name": "Vizbull",
        "url": "https://vizbull.com",
        "category": "Generative Art",
        "description": "Turn any photo into stunning cartoon or artwork with AI",
        "description_ar": "تحويل أي صورة إلى رسم كاريكاتوري أو عمل فني مذهل بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/vizbull.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["cartoon", "artwork", "photos"]
    },
    {
        "name": "Tattoored",
        "url": "https://tattoored.com",
        "category": "Generative Art",
        "description": "AI tattoo generator with chat assistant for tattoo ideas",
        "description_ar": "مولد وشم بالذكاء الاصطناعي مع مساعد دردشة لأفكار الوشم",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/tattoored.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["tattoo", "design", "art"]
    },
    {
        "name": "TarotAI.art",
        "url": "https://tarotai.art",
        "category": "Generative Art",
        "description": "Design unique tarot cards instantly with AI",
        "description_ar": "تصميم بطاقات تاروت فريدة على الفور بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/tarotai.art",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["tarot", "cards", "design"]
    },
    {
        "name": "Monkey AI Image Generator",
        "url": "https://monkeyai.com",
        "category": "Generative Art",
        "description": "Turn imagination into art within seconds",
        "description_ar": "تحويل الخيال إلى فن في ثوانٍ",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/monkeyai.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["art", "generation", "imagination"]
    },
    {
        "name": "iPage AI",
        "url": "https://ipage.ai",
        "category": "Generative Art",
        "description": "Transform text and images into printable coloring pages",
        "description_ar": "تحويل النصوص والصور إلى صفحات تلوين قابلة للطباعة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/ipage.ai",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["coloring", "pages", "printable"]
    },
    {
        "name": "BrandCrowd | AI Logo Generator",
        "url": "https://brandcrowd.com",
        "category": "Generative Art",
        "description": "AI generates perfect logos in seconds",
        "description_ar": "الذكاء الاصطناعي يولد شعارات مثالية في ثوانٍ",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/brandcrowd.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["logos", "branding", "design"]
    },
    {
        "name": "daisy | Posterfy",
        "url": "https://posterfy.com",
        "category": "Generative Art",
        "description": "Transform cast photos into cinematic movie posters",
        "description_ar": "تحويل صور الممثلين إلى ملصقات أفلام سينمائية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/posterfy.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["posters", "movies", "design"]
    },
    {
        "name": "PortraitArt",
        "url": "https://portraitart.com",
        "category": "Generative Art",
        "description": "AI-powered tool that transforms user photos into various forms of art",
        "description_ar": "أداة مدعومة بالذكاء الاصطناعي تحول صور المستخدم إلى أشكال فنية متنوعة",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/portraitart.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["portrait", "art", "photos"]
    },
    {
        "name": "Creative Arena by Contra",
        "url": "https://contra.com/arena",
        "category": "Generative Art",
        "description": "Platform for testing AI models in real-world creative scenarios",
        "description_ar": "منصة لاختبار نماذج الذكاء الاصطناعي في سيناريوهات إبداعية واقعية",
        "pricing": "Unknown",
        "logo": "https://logo.clearbit.com/contra.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["creative", "testing", "platform"]
    },
    {
        "name": "pulling himself from the page",
        "url": "https://pullingfrompage.com",
        "category": "Generative Art",
        "description": "Transform ideas into stunning, fantastical art with AI",
        "description_ar": "تحويل الأفكار إلى فن خيالي مذهل بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/pullingfrompage.com",
        "icon": "bi bi-palette",
        "featured": false,
        "tags": ["fantasy", "art", "transformation"]
    },
    {
        "name": "Runway",
        "url": "https://runwayml.com",
        "category": "Generative Video",
        "description": "AI video editing and generation platform",
        "description_ar": "منصة تحرير وتوليد الفيديو بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/runwayml.com",
        "icon": "bi bi-camera-video",
        "featured": true,
        "tags": ["editing", "generation", "platform"]
    },
    {
        "name": "Pika Labs",
        "url": "https://www.pika.art",
        "category": "Generative Video",
        "description": "AI video generation from text and images",
        "description_ar": "توليد الفيديو بالذكاء الاصطناعي من النصوص والصور",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=pika.art&sz=128",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["generation", "text-to-video", "art"]
    },
    {
        "name": "InVideo",
        "url": "https://invideo.io",
        "category": "Generative Video",
        "description": "AI-powered video creation platform",
        "description_ar": "منصة إنشاء الفيديو بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/invideo.io",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["creation", "platform", "editing"]
    },
    {
        "name": "Luma Dream Machine",
        "url": "https://lumalabs.ai",
        "category": "Generative Video",
        "description": "AI video generation from text prompts",
        "description_ar": "توليد الفيديو بالذكاء الاصطناعي من النصوص",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/lumalabs.ai",
        "icon": "bi bi-camera-video",
        "featured": true,
        "tags": ["generation", "text-to-video", "dream"]
    },
    {
        "name": "Fliki",
        "url": "https://fliki.ai",
        "category": "Generative Video",
        "description": "AI video creation from text content",
        "description_ar": "إنشاء الفيديو بالذكاء الاصطناعي من المحتوى النصي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/fliki.ai",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["creation", "text-to-video", "content"]
    },
    {
        "name": "Steve AI",
        "url": "https://www.steve.ai",
        "category": "Generative Video",
        "description": "AI video maker for content creation",
        "description_ar": "صانع الفيديو بالذكاء الاصطناعي لإنشاء المحتوى",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/steve.ai",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["maker", "content", "creation"]
    },
    {
        "name": "AIAI Generator",
        "url": "https://aiai-generator.com",
        "category": "Generative Video",
        "description": "Create stunning videos and images with AI-powered generation",
        "description_ar": "إنشاء فيديوهات وصور مذهلة بتوليد مدعوم بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/aiai-generator.com",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["videos", "images", "generation"]
    },
    {
        "name": "JXP | AI Video Generator",
        "url": "https://jxp.com",
        "category": "Generative Video",
        "description": "Turn ideas into videos in seconds",
        "description_ar": "تحويل الأفكار إلى فيديوهات في ثوانٍ",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/jxp.com",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["videos", "ideas", "generation"]
    },
    {
        "name": "V03 AI Video Generator",
        "url": "https://v03.ai",
        "category": "Generative Video",
        "description": "Instantly create AI videos with audio using Google Veo 3",
        "description_ar": "إنشاء فيديوهات بالذكاء الاصطناعي مع صوت فورًا باستخدام جوجل فيو 3",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/v03.ai",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["videos", "audio", "google-veo"]
    },
    {
        "name": "VisImagine - AI Video Creation Platform",
        "url": "https://visimagine.com",
        "category": "Generative Video",
        "description": "Bring Your Stories To Life in Minutes",
        "description_ar": "إحياء قصصك في دقائق",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/visimagine.com",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["stories", "videos", "creation"]
    },
    {
        "name": "Videoinu",
        "url": "https://videoinu.com",
        "category": "Generative Video",
        "description": "Create viral YouTube videos with multilingual content",
        "description_ar": "إنشاء فيديوهات يوتيوب viral بمحتوى متعدد اللغات",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/videoinu.com",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["youtube", "viral", "multilingual"]
    },
    {
        "name": "Korpi AI",
        "url": "https://korpi.ai",
        "category": "Generative Video",
        "description": "Generate viral clips in seconds",
        "description_ar": "توليد مقاطع viral في ثوانٍ",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/korpi.ai",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["clips", "viral", "generation"]
    },
    {
        "name": "Infinite Talk AI",
        "url": "https://infinitetalk.ai",
        "category": "Generative Video",
        "description": "Turn images into talking avatars with precise lip sync",
        "description_ar": "تحويل الصور إلى أفتار ناطقة بمزامنة شفاه دقيقة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/infinitetalk.ai",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["avatars", "talking", "lip-sync"]
    },
    {
        "name": "Rusheslab",
        "url": "https://rusheslab.com",
        "category": "Generative Video",
        "description": "Turn ideas into shot-accurate previsualization in minutes",
        "description_ar": "تحويل الأفكار إلى تصور مسبق دقيق للقطات في دقائق",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/rusheslab.com",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["previsualization", "shots", "filmmaking"]
    },
    {
        "name": "Lyric Video Studio",
        "url": "https://lyricvideostudio.com",
        "category": "Generative Video",
        "description": "Sync your sound, elevate your lyrics with AI-powered video creation",
        "description_ar": "مزامنة صوتك، ورفع كلماتك بإنشاء فيديو مدعوم بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/lyricvideostudio.com",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["lyrics", "music", "videos"]
    },
    {
        "name": "RemoveSoraWatermark",
        "url": "https://removesorawatermark.com",
        "category": "Generative Video",
        "description": "Remove Sora watermarks in 3 seconds with no quality loss",
        "description_ar": "إزالة علامات الماء من سورا في 3 ثوانٍ بدون فقدان الجودة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/removesorawatermark.com",
        "icon": "bi bi-camera-video",
        "featured": false,
        "tags": ["watermark", "removal", "sora"]
    },
    {
        "name": "Murf AI",
        "url": "https://murf.ai",
        "category": "Music",
        "description": "AI voice generator with realistic voices",
        "description_ar": "مولد الأصوات بالذكاء الاصطناعي بأصوات واقعية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/murf.ai",
        "icon": "bi bi-music-note",
        "featured": true,
        "tags": ["voice", "generation", "realistic"]
    },
    {
        "name": "Suno AI",
        "url": "https://suno.ai",
        "category": "Music",
        "description": "AI music generation from text prompts",
        "description_ar": "توليد الموسيقى بالذكاء الاصطناعي من النصوص",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/suno.ai",
        "icon": "bi bi-music-note",
        "featured": true,
        "tags": ["music", "generation", "text-to-music"]
    },
    {
        "name": "ElevenLabs",
        "url": "https://elevenlabs.io",
        "category": "Music",
        "description": "AI voice generation and text-to-speech",
        "description_ar": "توليد الأصوات وتحويل النص إلى كلام بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/elevenlabs.io",
        "icon": "bi bi-music-note",
        "featured": true,
        "tags": ["voice", "text-to-speech", "generation"]
    },
    {
        "name": "AIVA",
        "url": "https://www.aiva.ai",
        "category": "Music",
        "description": "AI music composition assistant",
        "description_ar": "مساعد تأليف الموسيقى بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/aiva.ai",
        "icon": "bi bi-music-note",
        "featured": false,
        "tags": ["music", "composition", "assistant"]
    },
    {
        "name": "Boomy",
        "url": "https://boomy.com",
        "category": "Music",
        "description": "AI music creation for beginners",
        "description_ar": "إنشاء الموسيقى بالذكاء الاصطناعي للمبتدئين",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/boomy.com",
        "icon": "bi bi-music-note",
        "featured": false,
        "tags": ["music", "creation", "beginners"]
    },
    {
        "name": "Soundraw",
        "url": "https://soundraw.io",
        "category": "Music",
        "description": "AI music generator for creators",
        "description_ar": "مولد الموسيقى بالذكاء الاصطناعي للمبدعين",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/soundraw.io",
        "icon": "bi bi-music-note",
        "featured": false,
        "tags": ["music", "generator", "creators"]
    },
    {
        "name": "Udio",
        "url": "https://www.udio.com",
        "category": "Music",
        "description": "Create music from text prompts",
        "description_ar": "إنشاء موسيقى من نصوص",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/udio.com",
        "icon": "bi bi-music-note",
        "featured": true,
        "tags": ["music", "generation", "udio"]
    },
    {
        "name": "Sora",
        "url": "https://openai.com/sora",
        "category": "Text-To-Video",
        "description": "Create realistic video from text instructions",
        "description_ar": "إنشاء فيديو واقعي من تعليمات نصية",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/openai.com",
        "icon": "bi bi-film",
        "featured": true,
        "tags": ["video", "openai", "realistic"]
    },
    {
        "name": "Pictory",
        "url": "https://pictory.ai",
        "category": "Text-To-Video",
        "description": "AI video creation from text and scripts",
        "description_ar": "إنشاء الفيديو بالذكاء الاصطناعي من النصوص والنصوص البرمجية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/pictory.ai",
        "icon": "bi bi-film",
        "featured": false,
        "tags": ["creation", "text-to-video", "scripts"]
    },
    {
        "name": "Kling AI",
        "url": "https://kling.kuaishou.com",
        "category": "Text-To-Video",
        "description": "High-quality AI video generation model",
        "description_ar": "نموذج توليد فيديو عالي الجودة بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/kuaishou.com",
        "icon": "bi bi-film",
        "featured": false,
        "tags": ["video", "generation", "model"]
    },
    {
        "name": "Hailuo AI",
        "url": "https://hailuo.ai",
        "category": "Text-To-Video",
        "description": "Creative video generation platform",
        "description_ar": "منصة توليد فيديو إبداعية",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/hailuo.ai",
        "icon": "bi bi-film",
        "featured": false,
        "tags": ["video", "creative", "platform"]
    },
    {
        "name": "Minimax",
        "url": "https://minimax.ai",
        "category": "Text-To-Video",
        "description": "Advanced video synthesis technology",
        "description_ar": "تقنية تركيب فيديو متقدمة",
        "pricing": "Paid",
        "logo": "https://www.google.com/s2/favicons?domain=minimax.ai&sz=128",
        "icon": "bi bi-film",
        "featured": false,
        "tags": ["video", "synthesis", "advanced"]
    },
    {
        "name": "Gen-3 Alpha",
        "url": "https://runwayml.com",
        "category": "Text-To-Video",
        "description": "Runway's latest video generation model",
        "description_ar": "أحدث نموذج لتوليد الفيديو من Runway",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/runwayml.com",
        "icon": "bi bi-film",
        "featured": true,
        "tags": ["video", "runway", "gen-3"]
    },
    {
        "name": "Haiper",
        "url": "https://haiper.ai",
        "category": "Text-To-Video",
        "description": "Perceptual video foundation model",
        "description_ar": "نموذج أساس الفيديو الإدراكي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/haiper.ai",
        "icon": "bi bi-film",
        "featured": false,
        "tags": ["video", "foundation", "model"]
    },
    {
        "name": "GPTZero",
        "url": "https://gptzero.me",
        "category": "AI Detection",
        "description": "Detect AI-generated text with high accuracy",
        "description_ar": "كشف النص المولد بالذكاء الاصطناعي بدقة عالية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/gptzero.me",
        "icon": "bi bi-search",
        "featured": true,
        "tags": ["detection", "text", "accuracy"]
    },
    {
        "name": "Originality.ai",
        "url": "https://originality.ai",
        "category": "AI Detection",
        "description": "AI content detector and plagiarism checker",
        "description_ar": "كاشف محتوى الذكاء الاصطناعي ومدقق الانتحال",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/originality.ai",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["detection", "plagiarism", "content"]
    },
    {
        "name": "Turnitin",
        "url": "https://www.turnitin.com",
        "category": "AI Detection",
        "description": "Academic integrity and AI writing detection",
        "description_ar": "النزاهة الأكاديمية وكشف الكتابة بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/turnitin.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["academic", "detection", "writing"]
    },
    {
        "name": "Winston AI",
        "url": "https://gowinston.ai",
        "category": "AI Detection",
        "description": "AI detector for educators and creators",
        "description_ar": "كاشف الذكاء الاصطناعي للمعلمين والمبدعين",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/gowinston.ai",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["detection", "education", "creators"]
    },
    {
        "name": "Copyleaks",
        "url": "https://copyleaks.com",
        "category": "AI Detection",
        "description": "Enterprise AI detection solution",
        "description_ar": "حل كشف الذكاء الاصطناعي للمؤسسات",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/copyleaks.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["enterprise", "detection", "solution"]
    },
    {
        "name": "ZeroGPT",
        "url": "https://www.zerogpt.com",
        "category": "AI Detection",
        "description": "Simple and free AI text detector",
        "description_ar": "كاشف نصوص ذكاء اصطناعي بسيط ومجاني",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/zerogpt.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["detection", "free", "simple"]
    },
    {
        "name": "Crossplag",
        "url": "https://crossplag.com",
        "category": "AI Detection",
        "description": "AI content detection for cross-language plagiarism",
        "description_ar": "كشف محتوى الذكاء الاصطناعي للانتحال عبر اللغات",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/crossplag.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["detection", "plagiarism", "cross-language"]
    },
    {
        "name": "Google Lens",
        "url": "https://lens.google.com",
        "category": "Image Scanning",
        "description": "Search what you see with Google",
        "description_ar": "ابحث عما تراه مع جوجل",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/google.com",
        "icon": "bi bi-image",
        "featured": true,
        "tags": ["scanning", "search", "google"]
    },
    {
        "name": "CamScanner",
        "url": "https://www.camscanner.com",
        "category": "Image Scanning",
        "description": "Scan documents to PDF with OCR",
        "description_ar": "مسح المستندات إلى PDF مع التعرف الضوئي على الحروف",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/camscanner.com",
        "icon": "bi bi-image",
        "featured": false,
        "tags": ["scanning", "documents", "ocr"]
    },
    {
        "name": "Adobe Scan",
        "url": "https://acrobat.adobe.com/us/en/mobile/scanner-app.html",
        "category": "Image Scanning",
        "description": "PDF scanner with text recognition",
        "description_ar": "ماسح PDF مع التعرف على النص",
        "pricing": "Free",
        "logo": "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
        "icon": "bi bi-image",
        "featured": false,
        "tags": ["scanning", "pdf", "adobe"]
    },
    {
        "name": "Microsoft Lens",
        "url": "https://www.microsoft.com/en-us/microsoft-365/microsoft-lens",
        "category": "Image Scanning",
        "description": "Trim, enhance, and make pictures of whiteboards readable",
        "description_ar": "قص وتحسين وجعل صور السبورات البيضاء قابلة للقراءة",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/microsoft.com",
        "icon": "bi bi-image",
        "featured": false,
        "tags": ["scanning", "whiteboard", "microsoft"]
    },
    {
        "name": "PhotoScan",
        "url": "https://www.google.com/photos/scan/",
        "category": "Image Scanning",
        "description": "Scanner app from Google Photos",
        "description_ar": "تطبيق الماسح الضوئي من صور جوجل",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/google.com",
        "icon": "bi bi-image",
        "featured": false,
        "tags": ["scanning", "photos", "google"]
    },
    {
        "name": "TextScanner",
        "url": "https://textscanner.com",
        "category": "Image Scanning",
        "description": "Extract text from images with high accuracy",
        "description_ar": "استخراج النص من الصور بدقة عالية",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=textscanner.com&sz=128",
        "icon": "bi bi-image",
        "featured": false,
        "tags": ["scanning", "text", "extract"]
    },
    {
        "name": "ScanHero",
        "url": "https://scanhero.com",
        "category": "Image Scanning",
        "description": "Document scanner app for iPhone and iPad",
        "description_ar": "تطبيق ماسح المستندات للآيفون والآيباد",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/scanhero.com",
        "icon": "bi bi-image",
        "featured": false,
        "tags": ["scanning", "ios", "documents"]
    },
    {
        "name": "Jasper",
        "url": "https://www.jasper.ai",
        "category": "Marketing",
        "description": "AI marketing copilot for enterprise teams",
        "description_ar": "مساعد التسويق بالذكاء الاصطناعي لفرق المؤسسات",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/jasper.ai",
        "icon": "bi bi-megaphone",
        "featured": true,
        "tags": ["marketing", "copywriting", "enterprise"]
    },
    {
        "name": "AdCreative.ai",
        "url": "https://www.adcreative.ai",
        "category": "Marketing",
        "description": "Generate conversion-focused ad creatives",
        "description_ar": "توليد إعلانات مبتكرة تركز على التحويل",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/adcreative.ai",
        "icon": "bi bi-megaphone",
        "featured": false,
        "tags": ["ads", "creative", "conversion"]
    },
    {
        "name": "Predis.ai",
        "url": "https://predis.ai",
        "category": "Marketing",
        "description": "AI social media post generator",
        "description_ar": "مولد منشورات وسائل التواصل الاجتماعي بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/predis.ai",
        "icon": "bi bi-megaphone",
        "featured": false,
        "tags": ["social-media", "posts", "generator"]
    },
    {
        "name": "Ocoya",
        "url": "https://www.ocoya.com",
        "category": "Marketing",
        "description": "Create, auto-generate and schedule content quicker",
        "description_ar": "إنشاء وتوليد تلقائي وجدولة المحتوى بشكل أسرع",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/ocoya.com",
        "icon": "bi bi-megaphone",
        "featured": false,
        "tags": ["content", "scheduling", "automation"]
    },
    {
        "name": "Flick",
        "url": "https://www.flick.social",
        "category": "Marketing",
        "description": "AI social marketing platform",
        "description_ar": "منصة التسويق الاجتماعي بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://www.google.com/s2/favicons?domain=flick.social&sz=128",
        "icon": "bi bi-megaphone",
        "featured": false,
        "tags": ["social", "marketing", "platform"]
    },
    {
        "name": "Albert",
        "url": "https://albert.ai",
        "category": "Marketing",
        "description": "Autonomous digital marketer",
        "description_ar": "المسوق الرقمي المستقل",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/albert.ai",
        "icon": "bi bi-megaphone",
        "featured": false,
        "tags": ["autonomous", "digital", "marketer"]
    },
    {
        "name": "Phrasee",
        "url": "https://phrasee.co",
        "category": "Marketing",
        "description": "AI-powered content optimization",
        "description_ar": "تحسين المحتوى المدعوم بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/phrasee.co",
        "icon": "bi bi-megaphone",
        "featured": false,
        "tags": ["optimization", "content", "ai"]
    },
    {
        "name": "Notion AI",
        "url": "https://www.notion.so",
        "category": "Productivity",
        "description": "Connected workspace with AI powers",
        "description_ar": "مساحة عمل متصلة بقدرات الذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/notion.so",
        "icon": "bi bi-graph-up",
        "featured": true,
        "tags": ["workspace", "notes", "ai"]
    },
    {
        "name": "Otter.ai",
        "url": "https://otter.ai",
        "category": "Productivity",
        "description": "AI meeting notes and transcription",
        "description_ar": "ملاحظات الاجتماعات والنسخ بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/otter.ai",
        "icon": "bi bi-graph-up",
        "featured": false,
        "tags": ["meetings", "notes", "transcription"]
    },
    {
        "name": "Fireflies.ai",
        "url": "https://fireflies.ai",
        "category": "Productivity",
        "description": "Automate meeting notes",
        "description_ar": "أتمتة ملاحظات الاجتماعات",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/fireflies.ai",
        "icon": "bi bi-graph-up",
        "featured": false,
        "tags": ["meetings", "automation", "notes"]
    },
    {
        "name": "Mem",
        "url": "https://mem.ai",
        "category": "Productivity",
        "description": "The self-organizing workspace",
        "description_ar": "مساحة العمل ذاتية التنظيم",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/mem.ai",
        "icon": "bi bi-graph-up",
        "featured": false,
        "tags": ["workspace", "organization", "ai"]
    },
    {
        "name": "Rewind",
        "url": "https://www.rewind.ai",
        "category": "Productivity",
        "description": "Searchable memory of your life",
        "description_ar": "ذاكرة قابلة للبحث لحياتك",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/rewind.ai",
        "icon": "bi bi-graph-up",
        "featured": true,
        "tags": ["memory", "search", "personal"]
    },
    {
        "name": "Taskade",
        "url": "https://www.taskade.com",
        "category": "Productivity",
        "description": "AI-powered productivity platform",
        "description_ar": "منصة إنتاجية مدعومة بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/taskade.com",
        "icon": "bi bi-graph-up",
        "featured": false,
        "tags": ["productivity", "tasks", "platform"]
    },
    {
        "name": "ClickUp AI",
        "url": "https://clickup.com/ai",
        "category": "Productivity",
        "description": "AI assistant for project management",
        "description_ar": "مساعد الذكاء الاصطناعي لإدارة المشاريع",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/clickup.com",
        "icon": "bi bi-graph-up",
        "featured": false,
        "tags": ["project-management", "assistant", "ai"]
    },
    {
        "name": "Perplexity",
        "url": "https://www.perplexity.ai",
        "category": "Research",
        "description": "AI-powered search engine",
        "description_ar": "محرك بحث مدعوم بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/perplexity.ai",
        "icon": "bi bi-lightbulb",
        "featured": true,
        "tags": ["search", "research", "ai"]
    },
    {
        "name": "Consensus",
        "url": "https://consensus.app",
        "category": "Research",
        "description": "Search engine for research papers",
        "description_ar": "محرك بحث للأوراق البحثية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/consensus.app",
        "icon": "bi bi-lightbulb",
        "featured": false,
        "tags": ["research", "science", "papers"]
    },
    {
        "name": "Elicit",
        "url": "https://elicit.com",
        "category": "Research",
        "description": "AI research assistant",
        "description_ar": "مساعد بحث بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/elicit.com",
        "icon": "bi bi-lightbulb",
        "featured": false,
        "tags": ["research", "analysis", "papers"]
    },
    {
        "name": "Scite",
        "url": "https://scite.ai",
        "category": "Research",
        "description": "Smart citations for better research",
        "description_ar": "اقتباسات ذكية لبحث أفضل",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/scite.ai",
        "icon": "bi bi-lightbulb",
        "featured": false,
        "tags": ["citations", "research", "academic"]
    },
    {
        "name": "ResearchRabbit",
        "url": "https://www.researchrabbit.ai",
        "category": "Research",
        "description": "Visual research tool",
        "description_ar": "أداة بحث مرئية",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/researchrabbit.ai",
        "icon": "bi bi-lightbulb",
        "featured": false,
        "tags": ["visualization", "research", "mapping"]
    },
    {
        "name": "Scholarcy",
        "url": "https://www.scholarcy.com",
        "category": "Research",
        "description": "AI article summarizer",
        "description_ar": "ملخص المقالات بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/scholarcy.com",
        "icon": "bi bi-lightbulb",
        "featured": false,
        "tags": ["summarization", "research", "articles"]
    },
    {
        "name": "ChatPDF",
        "url": "https://www.chatpdf.com",
        "category": "Research",
        "description": "Chat with any PDF",
        "description_ar": "الدردشة مع أي ملف PDF",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/chatpdf.com",
        "icon": "bi bi-lightbulb",
        "featured": false,
        "tags": ["pdf", "chat", "research"]
    },
    {
        "name": "Buffer",
        "url": "https://buffer.com",
        "category": "Social Media",
        "description": "Social media toolkit for small businesses",
        "description_ar": "مجموعة أدوات وسائل التواصل الاجتماعي للشركات الصغيرة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/buffer.com",
        "icon": "bi bi-share",
        "featured": false,
        "tags": ["social-media", "scheduling", "marketing"]
    },
    {
        "name": "Hootsuite",
        "url": "https://www.hootsuite.com",
        "category": "Social Media",
        "description": "Social media management platform",
        "description_ar": "منصة إدارة وسائل التواصل الاجتماعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/hootsuite.com",
        "icon": "bi bi-share",
        "featured": false,
        "tags": ["social-media", "management", "enterprise"]
    },
    {
        "name": "Lately",
        "url": "https://www.lately.ai",
        "category": "Social Media",
        "description": "AI social content generator",
        "description_ar": "مولد محتوى اجتماعي بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/lately.ai",
        "icon": "bi bi-share",
        "featured": false,
        "tags": ["content", "generation", "social"]
    },
    {
        "name": "Taplio",
        "url": "https://taplio.com",
        "category": "Social Media",
        "description": "All-in-one LinkedIn tool",
        "description_ar": "أداة لينكد إن الشاملة",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/taplio.com",
        "icon": "bi bi-share",
        "featured": false,
        "tags": ["linkedin", "growth", "social"]
    },
    {
        "name": "TweetHunter",
        "url": "https://tweethunter.io",
        "category": "Social Media",
        "description": "Twitter growth tool",
        "description_ar": "أداة نمو تويتر",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/tweethunter.io",
        "icon": "bi bi-share",
        "featured": false,
        "tags": ["twitter", "growth", "social"]
    },
    {
        "name": "FeedHive",
        "url": "https://feedhive.com",
        "category": "Social Media",
        "description": "AI social media management",
        "description_ar": "إدارة وسائل التواصل الاجتماعي بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/feedhive.com",
        "icon": "bi bi-share",
        "featured": false,
        "tags": ["management", "social", "ai"]
    },
    {
        "name": "Postwise",
        "url": "https://postwise.ai",
        "category": "Social Media",
        "description": "Write viral tweets with AI",
        "description_ar": "كتابة تغريدات فيروسية بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/postwise.ai",
        "icon": "bi bi-share",
        "featured": false,
        "tags": ["twitter", "writing", "ai"]
    },
    {
        "name": "Speechify",
        "url": "https://speechify.com",
        "category": "Text-To-Speech",
        "description": "Text to speech reader",
        "description_ar": "قارئ تحويل النص إلى كلام",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/speechify.com",
        "icon": "bi bi-volume-up",
        "featured": true,
        "tags": ["tts", "reader", "audio"]
    },
    {
        "name": "Lovo",
        "url": "https://lovo.ai",
        "category": "Text-To-Speech",
        "description": "AI voice generator",
        "description_ar": "مولد صوت بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/lovo.ai",
        "icon": "bi bi-volume-up",
        "featured": false,
        "tags": ["voice", "generation", "tts"]
    },
    {
        "name": "Play.ht",
        "url": "https://play.ht",
        "category": "Text-To-Speech",
        "description": "Realistic AI voice generator",
        "description_ar": "مولد صوت واقعي بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/play.ht",
        "icon": "bi bi-volume-up",
        "featured": false,
        "tags": ["voice", "realistic", "tts"]
    },
    {
        "name": "Resemble AI",
        "url": "https://www.resemble.ai",
        "category": "Text-To-Speech",
        "description": "AI voice cloning",
        "description_ar": "استنساخ الصوت بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/resemble.ai",
        "icon": "bi bi-volume-up",
        "featured": false,
        "tags": ["cloning", "voice", "security"]
    },
    {
        "name": "WellSaid Labs",
        "url": "https://wellsaidlabs.com",
        "category": "Text-To-Speech",
        "description": "Text-to-speech for creators",
        "description_ar": "تحويل النص إلى كلام للمبدعين",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/wellsaidlabs.com",
        "icon": "bi bi-volume-up",
        "featured": false,
        "tags": ["creators", "tts", "voice"]
    },
    {
        "name": "Listnr",
        "url": "https://www.listnr.tech",
        "category": "Text-To-Speech",
        "description": "AI voice generator",
        "description_ar": "مولد صوت بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/listnr.tech",
        "icon": "bi bi-volume-up",
        "featured": false,
        "tags": ["voice", "generator", "tts"]
    },
    {
        "name": "DeepL",
        "url": "https://www.deepl.com",
        "category": "Translation",
        "description": "Accurate AI translator",
        "description_ar": "مترجم ذكاء اصطناعي دقيق",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/deepl.com",
        "icon": "bi bi-translate",
        "featured": true,
        "tags": ["translation", "accurate", "ai"]
    },
    {
        "name": "Google Translate",
        "url": "https://translate.google.com",
        "category": "Translation",
        "description": "Multilingual translation service",
        "description_ar": "خدمة ترجمة متعددة اللغات",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/google.com",
        "icon": "bi bi-translate",
        "featured": false,
        "tags": ["translation", "google", "free"]
    },
    {
        "name": "Microsoft Translator",
        "url": "https://translator.microsoft.com",
        "category": "Translation",
        "description": "Translation for personal and professional use",
        "description_ar": "ترجمة للاستخدام الشخصي والمهني",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/microsoft.com",
        "icon": "bi bi-translate",
        "featured": false,
        "tags": ["translation", "microsoft", "free"]
    },
    {
        "name": "Reverso",
        "url": "https://www.reverso.net",
        "category": "Translation",
        "description": "Contextual translation and grammar",
        "description_ar": "ترجمة سياقية وقواعد",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/reverso.net",
        "icon": "bi bi-translate",
        "featured": false,
        "tags": ["translation", "context", "learning"]
    },
    {
        "name": "QuillBot Translator",
        "url": "https://quillbot.com/translate",
        "category": "Translation",
        "description": "AI translator by QuillBot",
        "description_ar": "مترجم الذكاء الاصطناعي من QuillBot",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/quillbot.com",
        "icon": "bi bi-translate",
        "featured": false,
        "tags": ["translation", "writing", "tools"]
    },
    {
        "name": "Mate Translate",
        "url": "https://gikken.co/mate-translate/",
        "category": "Translation",
        "description": "Translator for Mac and browsers",
        "description_ar": "مترجم لنظام ماك والمتصفحات",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/gikken.co",
        "icon": "bi bi-translate",
        "featured": false,
        "tags": ["translation", "app", "browser"]
    },
    {
        "name": "Lingvanex",
        "url": "https://lingvanex.com",
        "category": "Translation",
        "description": "Translation apps and API",
        "description_ar": "تطبيقات ترجمة وواجهة برمجة تطبيقات",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/lingvanex.com",
        "icon": "bi bi-translate",
        "featured": false,
        "tags": ["translation", "api", "apps"]
    },
    {
        "name": "Voicemod",
        "url": "https://www.voicemod.net",
        "category": "Voice Modulation",
        "description": "Real-time voice changer",
        "description_ar": "مغير صوت في الوقت الحقيقي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/voicemod.net",
        "icon": "bi bi-mic",
        "featured": true,
        "tags": ["voice-changer", "gaming", "fun"]
    },
    {
        "name": "Altered",
        "url": "https://www.altered.ai",
        "category": "Voice Modulation",
        "description": "Professional voice changing software",
        "description_ar": "برنامج تغيير صوت احترافي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/altered.ai",
        "icon": "bi bi-mic",
        "featured": false,
        "tags": ["voice", "professional", "audio"]
    },
    {
        "name": "Respeecher",
        "url": "https://www.respeecher.com",
        "category": "Voice Modulation",
        "description": "Voice cloning for content creators",
        "description_ar": "استنساخ الصوت لمنشئي المحتوى",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/respeecher.com",
        "icon": "bi bi-mic",
        "featured": false,
        "tags": ["voice", "cloning", "creators"]
    },
    {
        "name": "Koe Recast",
        "url": "https://koe.ai",
        "category": "Voice Modulation",
        "description": "Transform your voice with AI",
        "description_ar": "حول صوتك باستخدام الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/koe.ai",
        "icon": "bi bi-mic",
        "featured": false,
        "tags": ["voice", "transformation", "ai"]
    },
    {
        "name": "Metavoice",
        "url": "https://themetavoice.xyz",
        "category": "Voice Modulation",
        "description": "Real-time AI voice changer for metaverse",
        "description_ar": "مغير صوت بالذكاء الاصطناعي في الوقت الحقيقي للميتافيرس",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=themetavoice.xyz&sz=128",
        "icon": "bi bi-mic",
        "featured": false,
        "tags": ["voice", "metaverse", "real-time"]
    },
    {
        "name": "Dubbing AI",
        "url": "https://dubbingai.io",
        "category": "Voice Modulation",
        "description": "AI voice changer for gamers",
        "description_ar": "مغير صوت بالذكاء الاصطناعي للاعبين",
        "pricing": "Free",
        "logo": "https://www.google.com/s2/favicons?domain=dubbingai.io&sz=128",
        "icon": "bi bi-mic",
        "featured": false,
        "tags": ["gaming", "voice", "free"]
    },
    {
        "name": "There's An AI For That",
        "url": "https://theresanaiforthat.com",
        "category": "Aggregators",
        "description": "Comprehensive AI tool database",
        "description_ar": "قاعدة بيانات شاملة لأدوات الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/theresanaiforthat.com",
        "icon": "bi bi-collection",
        "featured": true,
        "tags": ["directory", "search", "database"]
    },
    {
        "name": "Futurepedia",
        "url": "https://www.futurepedia.io",
        "category": "Aggregators",
        "description": "The largest AI tools directory",
        "description_ar": "أكبر دليل لأدوات الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/futurepedia.io",
        "icon": "bi bi-collection",
        "featured": false,
        "tags": ["directory", "tools", "ai"]
    },
    {
        "name": "TopAI.tools",
        "url": "https://topai.tools",
        "category": "Aggregators",
        "description": "Curated list of AI tools",
        "description_ar": "قائمة منسقة لأدوات الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/topai.tools",
        "icon": "bi bi-collection",
        "featured": false,
        "tags": ["curated", "tools", "list"]
    },
    {
        "name": "AI Valley",
        "url": "https://aivalley.ai",
        "category": "Aggregators",
        "description": "Discover new AI tools daily",
        "description_ar": "اكتشف أدوات ذكاء اصطناعي جديدة يوميًا",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/aivalley.ai",
        "icon": "bi bi-collection",
        "featured": false,
        "tags": ["discovery", "daily", "tools"]
    },
    {
        "name": "Easy With AI",
        "url": "https://easywithai.com",
        "category": "Aggregators",
        "description": "Easy to use AI tools directory",
        "description_ar": "دليل أدوات ذكاء اصطناعي سهل الاستخدام",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/easywithai.com",
        "icon": "bi bi-collection",
        "featured": false,
        "tags": ["easy", "directory", "beginners"]
    },
    {
        "name": "AI Tools Directory",
        "url": "https://aitoolsdirectory.com",
        "category": "Aggregators",
        "description": "Directory of AI tools and services",
        "description_ar": "دليل أدوات وخدمات الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://www.google.com/s2/favicons?domain=aitoolsdirectory.com&sz=128",
        "icon": "bi bi-collection",
        "featured": false,
        "tags": ["directory", "services", "tools"]
    },
    {
        "name": "Future Tools",
        "url": "https://www.futuretools.io",
        "category": "Aggregators",
        "description": "Collects the best AI tools",
        "description_ar": "يجمع أفضل أدوات الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/futuretools.io",
        "icon": "bi bi-collection",
        "featured": false,
        "tags": ["collection", "best", "tools"]
    },
    {
        "name": "ChatGPT",
        "url": "https://chat.openai.com",
        "category": "Chat",
        "description": "AI conversational agent by OpenAI",
        "description_ar": "وكيل محادثة بالذكاء الاصطناعي من OpenAI",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/openai.com",
        "icon": "bi bi-chat-dots",
        "featured": true,
        "tags": ["chat", "openai", "assistant"]
    },
    {
        "name": "Gemini",
        "url": "https://gemini.google.com",
        "category": "Chat",
        "description": "Google's most capable AI model",
        "description_ar": "نموذج الذكاء الاصطناعي الأكثر قدرة من جوجل",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/google.com",
        "icon": "bi bi-chat-dots",
        "featured": true,
        "tags": ["google", "chat", "model"]
    },
    {
        "name": "Microsoft Copilot",
        "url": "https://copilot.microsoft.com",
        "category": "Chat",
        "description": "Your everyday AI companion",
        "description_ar": "رفيقك اليومي بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/microsoft.com",
        "icon": "bi bi-chat-dots",
        "featured": true,
        "tags": ["microsoft", "chat", "companion"]
    },
    {
        "name": "Poe",
        "url": "https://poe.com",
        "category": "Chat",
        "description": "Fast AI chat with multiple models",
        "description_ar": "دردشة ذكاء اصطناعي سريعة مع نماذج متعددة",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/poe.com",
        "icon": "bi bi-chat-dots",
        "featured": false,
        "tags": ["aggregator", "chat", "models"]
    },
    {
        "name": "HuggingChat",
        "url": "https://huggingface.co/chat",
        "category": "Chat",
        "description": "Open source AI chat",
        "description_ar": "دردشة ذكاء اصطناعي مفتوحة المصدر",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/huggingface.co",
        "icon": "bi bi-chat-dots",
        "featured": false,
        "tags": ["open-source", "chat", "huggingface"]
    },
    {
        "name": "Cleo",
        "url": "https://web.meetcleo.com",
        "category": "Finance",
        "description": "AI financial assistant",
        "description_ar": "مساعد مالي بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/meetcleo.com",
        "icon": "bi bi-wallet2",
        "featured": false,
        "tags": ["finance", "assistant", "budgeting"]
    },
    {
        "name": "Monarch Money",
        "url": "https://www.monarchmoney.com",
        "category": "Finance",
        "description": "Modern money management",
        "description_ar": "إدارة أموال حديثة",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/monarchmoney.com",
        "icon": "bi bi-wallet2",
        "featured": false,
        "tags": ["finance", "management", "budgeting"]
    },
    {
        "name": "Rocket Money",
        "url": "https://www.rocketmoney.com",
        "category": "Finance",
        "description": "Find and cancel subscriptions",
        "description_ar": "إيجاد وإلغاء الاشتراكات",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/rocketmoney.com",
        "icon": "bi bi-wallet2",
        "featured": false,
        "tags": ["finance", "subscriptions", "savings"]
    },
    {
        "name": "Wallet.ai",
        "url": "https://wallet.ai",
        "category": "Finance",
        "description": "AI for your daily spending",
        "description_ar": "ذكاء اصطناعي لإنفاقك اليومي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/wallet.ai",
        "icon": "bi bi-wallet2",
        "featured": false,
        "tags": ["finance", "spending", "ai"]
    },
    {
        "name": "Finta",
        "url": "https://www.finta.io",
        "category": "Finance",
        "description": "Sync financial data to Notion/Airtable",
        "description_ar": "مزامنة البيانات المالية مع Notion/Airtable",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/finta.io",
        "icon": "bi bi-wallet2",
        "featured": false,
        "tags": ["finance", "sync", "data"]
    },
    {
        "name": "Tiller",
        "url": "https://www.tillerhq.com",
        "category": "Finance",
        "description": "Spreadsheet automation for money",
        "description_ar": "أتمتة جداول البيانات للأموال",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/tillerhq.com",
        "icon": "bi bi-wallet2",
        "featured": false,
        "tags": ["finance", "spreadsheets", "automation"]
    },
    {
        "name": "Trim",
        "url": "https://www.asktrim.com",
        "category": "Finance",
        "description": "Negotiate bills and save money",
        "description_ar": "التفاوض على الفواتير وتوفير المال",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/asktrim.com",
        "icon": "bi bi-wallet2",
        "featured": false,
        "tags": ["finance", "bills", "savings"]
    },
    {
        "name": "Scenario",
        "url": "https://www.scenario.com",
        "category": "Gaming",
        "description": "AI-generated game assets",
        "description_ar": "أصول ألعاب مولدة بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/scenario.com",
        "icon": "bi bi-controller",
        "featured": true,
        "tags": ["gaming", "assets", "generation"]
    },
    {
        "name": "Inworld AI",
        "url": "https://inworld.ai",
        "category": "Gaming",
        "description": "AI characters for games",
        "description_ar": "شخصيات ذكاء اصطناعي للألعاب",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/inworld.ai",
        "icon": "bi bi-controller",
        "featured": false,
        "tags": ["gaming", "characters", "npc"]
    },
    {
        "name": "Modl.ai",
        "url": "https://modl.ai",
        "category": "Gaming",
        "description": "AI game testing and content",
        "description_ar": "اختبار الألعاب والمحتوى بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/modl.ai",
        "icon": "bi bi-controller",
        "featured": false,
        "tags": ["gaming", "testing", "bots"]
    },
    {
        "name": "Ludo.ai",
        "url": "https://ludo.ai",
        "category": "Gaming",
        "description": "AI for game ideation",
        "description_ar": "ذكاء اصطناعي لابتكار الألعاب",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/ludo.ai",
        "icon": "bi bi-controller",
        "featured": false,
        "tags": ["gaming", "ideation", "concept"]
    },
    {
        "name": "Rosebud AI",
        "url": "https://www.rosebud.ai",
        "category": "Gaming",
        "description": "AI game creation platform",
        "description_ar": "منصة إنشاء ألعاب بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/rosebud.ai",
        "icon": "bi bi-controller",
        "featured": false,
        "tags": ["gaming", "creation", "platform"]
    },
    {
        "name": "Charisma.ai",
        "url": "https://charisma.ai",
        "category": "Gaming",
        "description": "Interactive stories and characters",
        "description_ar": "قصص وشخصيات تفاعلية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/charisma.ai",
        "icon": "bi bi-controller",
        "featured": false,
        "tags": ["gaming", "stories", "interactive"]
    },
    {
        "name": "Latitude",
        "url": "https://latitude.io",
        "category": "Gaming",
        "description": "Creators of AI Dungeon",
        "description_ar": "مبدعو AI Dungeon",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/latitude.io",
        "icon": "bi bi-controller",
        "featured": false,
        "tags": ["gaming", "dungeon", "text-adventure"]
    },
    {
        "name": "GitHub Copilot",
        "url": "https://github.com/features/copilot",
        "category": "Generative Code",
        "description": "Your AI pair programmer",
        "description_ar": "مبرمجك المساعد بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/github.com",
        "icon": "bi bi-code-slash",
        "featured": true,
        "tags": ["code", "assistant", "github"]
    },
    {
        "name": "Tabnine",
        "url": "https://www.tabnine.com",
        "category": "Generative Code",
        "description": "AI code completion for developers",
        "description_ar": "إكمال الكود بالذكاء الاصطناعي للمطورين",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/tabnine.com",
        "icon": "bi bi-code-slash",
        "featured": false,
        "tags": ["code", "completion", "developers"]
    },
    {
        "name": "Amazon CodeWhisperer",
        "url": "https://aws.amazon.com/codewhisperer/",
        "category": "Generative Code",
        "description": "AI coding companion by AWS",
        "description_ar": "رفيق البرمجة بالذكاء الاصطناعي من AWS",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/aws.amazon.com",
        "icon": "bi bi-code-slash",
        "featured": false,
        "tags": ["code", "aws", "assistant"]
    },
    {
        "name": "Replit Ghostwriter",
        "url": "https://replit.com/site/ghostwriter",
        "category": "Generative Code",
        "description": "AI pair programmer in your browser",
        "description_ar": "مبرمج مساعد بالذكاء الاصطناعي في متصفحك",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/replit.com",
        "icon": "bi bi-code-slash",
        "featured": false,
        "tags": ["code", "browser", "replit"]
    },
    {
        "name": "Codeium",
        "url": "https://codeium.com",
        "category": "Generative Code",
        "description": "Free AI code acceleration",
        "description_ar": "تسريع الكود بالذكاء الاصطناعي مجانًا",
        "pricing": "Free",
        "logo": "https://www.google.com/s2/favicons?domain=codeium.com&sz=128",
        "icon": "bi bi-code-slash",
        "featured": false,
        "tags": ["code", "free", "acceleration"]
    },
    {
        "name": "Sourcegraph Cody",
        "url": "https://about.sourcegraph.com/cody",
        "category": "Generative Code",
        "description": "AI coding assistant that knows your code",
        "description_ar": "مساعد برمجة بالذكاء الاصطناعي يعرف كودك",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/sourcegraph.com",
        "icon": "bi bi-code-slash",
        "featured": false,
        "tags": ["code", "context", "assistant"]
    },
    {
        "name": "Cursor",
        "url": "https://cursor.sh",
        "category": "Generative Code",
        "description": "The AI-first code editor",
        "description_ar": "محرر الكود الأول بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/cursor.sh",
        "icon": "bi bi-code-slash",
        "featured": true,
        "tags": ["code", "editor", "ai"]
    },
    {
        "name": "Remini",
        "url": "https://remini.ai",
        "category": "Image Improvement",
        "description": "Enhance and restore photos",
        "description_ar": "تحسين واستعادة الصور",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/remini.ai",
        "icon": "bi bi-brush",
        "featured": true,
        "tags": ["enhancement", "photos", "restoration"]
    },
    {
        "name": "Topaz Photo AI",
        "url": "https://www.topazlabs.com/topaz-photo-ai",
        "category": "Image Improvement",
        "description": "Sharpen, remove noise, and upscale",
        "description_ar": "توضيح وإزالة الضوضاء ورفع الدقة",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/topazlabs.com",
        "icon": "bi bi-brush",
        "featured": false,
        "tags": ["enhancement", "upscale", "noise"]
    },
    {
        "name": "Magnific AI",
        "url": "https://magnific.ai",
        "category": "Image Improvement",
        "description": "AI upscaler and enhancer",
        "description_ar": "رافع دقة ومحسن بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/magnific.ai",
        "icon": "bi bi-brush",
        "featured": true,
        "tags": ["upscale", "enhancement", "details"]
    },
    {
        "name": "Upscayl",
        "url": "https://upscayl.org",
        "category": "Image Improvement",
        "description": "Free and open source AI image upscaler",
        "description_ar": "رافع دقة صور بالذكاء الاصطناعي مجاني ومفتوح المصدر",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/upscayl.org",
        "icon": "bi bi-brush",
        "featured": false,
        "tags": ["upscale", "open-source", "free"]
    },
    {
        "name": "VanceAI",
        "url": "https://vanceai.com",
        "category": "Image Improvement",
        "description": "AI photo enhancement tools",
        "description_ar": "أدوات تحسين الصور بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/vanceai.com",
        "icon": "bi bi-brush",
        "featured": false,
        "tags": ["enhancement", "tools", "photo"]
    },
    {
        "name": "Let's Enhance",
        "url": "https://letsenhance.io",
        "category": "Image Improvement",
        "description": "Image upscaling and enhancement",
        "description_ar": "رفع دقة وتحسين الصور",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/letsenhance.io",
        "icon": "bi bi-brush",
        "featured": false,
        "tags": ["upscale", "enhancement", "quality"]
    },
    {
        "name": "HitPaw",
        "url": "https://www.hitpaw.com",
        "category": "Image Improvement",
        "description": "AI photo enhancer",
        "description_ar": "محسن صور بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/hitpaw.com",
        "icon": "bi bi-brush",
        "featured": false,
        "tags": ["enhancement", "photo", "ai"]
    },
    {
        "name": "Pinterest",
        "url": "https://www.pinterest.com",
        "category": "Inspiration",
        "description": "Visual discovery engine",
        "description_ar": "محرك اكتشاف مرئي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/pinterest.com",
        "icon": "bi bi-sun",
        "featured": true,
        "tags": ["inspiration", "visual", "search"]
    },
    {
        "name": "Designspiration",
        "url": "https://www.designspiration.com",
        "category": "Inspiration",
        "description": "Design inspiration search",
        "description_ar": "بحث عن إلهام التصميم",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/designspiration.com",
        "icon": "bi bi-sun",
        "featured": false,
        "tags": ["design", "inspiration", "search"]
    },
    {
        "name": "Behance",
        "url": "https://www.behance.net",
        "category": "Inspiration",
        "description": "Showcase and discover creative work",
        "description_ar": "عرض واكتشاف الأعمال الإبداعية",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/behance.net",
        "icon": "bi bi-sun",
        "featured": false,
        "tags": ["creative", "portfolio", "inspiration"]
    },
    {
        "name": "Dribbble",
        "url": "https://dribbble.com",
        "category": "Inspiration",
        "description": "Design inspiration and community",
        "description_ar": "إلهام التصميم والمجتمع",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/dribbble.com",
        "icon": "bi bi-sun",
        "featured": false,
        "tags": ["design", "community", "inspiration"]
    },
    {
        "name": "Muzli",
        "url": "https://muz.li",
        "category": "Inspiration",
        "description": "Design inspiration hub",
        "description_ar": "مركز إلهام التصميم",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/muz.li",
        "icon": "bi bi-sun",
        "featured": false,
        "tags": ["design", "hub", "inspiration"]
    },
    {
        "name": "Savee",
        "url": "https://savee.it",
        "category": "Inspiration",
        "description": "Save and share inspiration",
        "description_ar": "حفظ ومشاركة الإلهام",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/savee.it",
        "icon": "bi bi-sun",
        "featured": false,
        "tags": ["save", "share", "inspiration"]
    },
    {
        "name": "Cosmos",
        "url": "https://www.cosmos.so",
        "category": "Inspiration",
        "description": "Pinterest for creatives",
        "description_ar": "بينتيريست للمبدعين",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/cosmos.so",
        "icon": "bi bi-sun",
        "featured": false,
        "tags": ["curation", "creative", "inspiration"]
    },
    {
        "name": "Adobe Podcast",
        "url": "https://podcast.adobe.com",
        "category": "Podcasting",
        "description": "AI audio recording and editing",
        "description_ar": "تسجيل وتحرير الصوت بالذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
        "icon": "bi bi-headphones",
        "featured": true,
        "tags": ["audio", "recording", "adobe"]
    },
    {
        "name": "Podcastle",
        "url": "https://podcastle.ai",
        "category": "Podcasting",
        "description": "Studio-quality recording platform",
        "description_ar": "منصة تسجيل بجودة الاستوديو",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/podcastle.ai",
        "icon": "bi bi-headphones",
        "featured": false,
        "tags": ["recording", "studio", "editing"]
    },
    {
        "name": "Riverside.fm",
        "url": "https://riverside.fm",
        "category": "Podcasting",
        "description": "Record podcasts and videos",
        "description_ar": "تسجيل البودكاست والفيديوهات",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/riverside.fm",
        "icon": "bi bi-headphones",
        "featured": false,
        "tags": ["recording", "video", "podcast"]
    },
    {
        "name": "Swell AI",
        "url": "https://www.swellai.com",
        "category": "Podcasting",
        "description": "Automate podcast show notes",
        "description_ar": "أتمتة ملاحظات عرض البودكاست",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/swellai.com",
        "icon": "bi bi-headphones",
        "featured": false,
        "tags": ["automation", "notes", "podcast"]
    },
    {
        "name": "Castmagic",
        "url": "https://www.castmagic.io",
        "category": "Podcasting",
        "description": "Turn audio into content",
        "description_ar": "تحويل الصوت إلى محتوى",
        "pricing": "Paid",
        "logo": "https://www.google.com/s2/favicons?domain=castmagic.io&sz=128",
        "icon": "bi bi-headphones",
        "featured": false,
        "tags": ["content", "audio", "repurpose"]
    },
    {
        "name": "Podsqueeze",
        "url": "https://podsqueeze.com",
        "category": "Podcasting",
        "description": "AI podcast content generation",
        "description_ar": "توليد محتوى البودكاست بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=podsqueeze.com&sz=128",
        "icon": "bi bi-headphones",
        "featured": false,
        "tags": ["content", "generation", "podcast"]
    },
    {
        "name": "Descript",
        "url": "https://www.descript.com",
        "category": "Podcasting",
        "description": "All-in-one video and audio editor",
        "description_ar": "محرر فيديو وصوت شامل",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/descript.com",
        "icon": "bi bi-headphones",
        "featured": true,
        "tags": ["editing", "video", "audio"]
    },
    {
        "name": "PromptBase",
        "url": "https://promptbase.com",
        "category": "Prompt Guides",
        "description": "Marketplace for AI prompts",
        "description_ar": "سوق لأوامر الذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/promptbase.com",
        "icon": "bi bi-list-check",
        "featured": true,
        "tags": ["marketplace", "prompts", "buy"]
    },
    {
        "name": "FlowGPT",
        "url": "https://flowgpt.com",
        "category": "Prompt Guides",
        "description": "Visual prompt engineering",
        "description_ar": "هندسة الأوامر المرئية",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/flowgpt.com",
        "icon": "bi bi-list-check",
        "featured": false,
        "tags": ["visual", "engineering", "prompts"]
    },
    {
        "name": "Snack Prompt",
        "url": "https://snackprompt.com",
        "category": "Prompt Guides",
        "description": "Discover the best prompts",
        "description_ar": "اكتشف أفضل الأوامر",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/snackprompt.com",
        "icon": "bi bi-list-check",
        "featured": false,
        "tags": ["discovery", "prompts", "community"]
    },
    {
        "name": "PromptHero",
        "url": "https://prompthero.com",
        "category": "Prompt Guides",
        "description": "Search prompts for Stable Diffusion",
        "description_ar": "بحث عن أوامر لـ Stable Diffusion",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/prompthero.com",
        "icon": "bi bi-list-check",
        "featured": false,
        "tags": ["search", "stable-diffusion", "prompts"]
    },
    {
        "name": "Arthub.ai",
        "url": "https://arthub.ai",
        "category": "Prompt Guides",
        "description": "Crowdsourced AI art and prompts",
        "description_ar": "فن وأوامر ذكاء اصطناعي من الجمهور",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/arthub.ai",
        "icon": "bi bi-list-check",
        "featured": false,
        "tags": ["art", "crowdsourced", "prompts"]
    },
    {
        "name": "Lexica",
        "url": "https://lexica.art",
        "category": "Prompt Guides",
        "description": "Search engine for Stable Diffusion",
        "description_ar": "محرك بحث لـ Stable Diffusion",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/lexica.art",
        "icon": "bi bi-list-check",
        "featured": false,
        "tags": ["search", "art", "prompts"]
    },
    {
        "name": "PromptSearch",
        "url": "https://promptsearch.site",
        "category": "Prompt Guides",
        "description": "Search engine for AI prompts",
        "description_ar": "محرك بحث لأوامر الذكاء الاصطناعي",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/promptsearch.site",
        "icon": "bi bi-list-check",
        "featured": false,
        "tags": ["search", "engine", "prompts"]
    },
    {
        "name": "Rocky.ai",
        "url": "https://rocky.ai",
        "category": "Self-Improvement",
        "description": "AI personal coach",
        "description_ar": "مدرب شخصي بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/rocky.ai",
        "icon": "bi bi-person-check",
        "featured": false,
        "tags": ["coaching", "personal", "growth"]
    },
    {
        "name": "Poised",
        "url": "https://www.poised.com",
        "category": "Self-Improvement",
        "description": "AI communication coach",
        "description_ar": "مدرب تواصل بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/poised.com",
        "icon": "bi bi-person-check",
        "featured": true,
        "tags": ["communication", "coaching", "speech"]
    },
    {
        "name": "Yoodli",
        "url": "https://yoodli.ai",
        "category": "Self-Improvement",
        "description": "AI speech coach",
        "description_ar": "مدرب خطابة بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/yoodli.ai",
        "icon": "bi bi-person-check",
        "featured": false,
        "tags": ["speech", "public-speaking", "coaching"]
    },
    {
        "name": "Fingerprint for Success",
        "url": "https://www.fingerprintforsuccess.com",
        "category": "Self-Improvement",
        "description": "AI coaching for work",
        "description_ar": "تدريب بالذكاء الاصطناعي للعمل",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/fingerprintforsuccess.com",
        "icon": "bi bi-person-check",
        "featured": false,
        "tags": ["work", "coaching", "success"]
    },
    {
        "name": "Mentorcam",
        "url": "https://mentorcam.com",
        "category": "Self-Improvement",
        "description": "Access to expert mentors",
        "description_ar": "الوصول إلى مرشدين خبراء",
        "pricing": "Paid",
        "logo": "https://www.google.com/s2/favicons?domain=mentorcam.com&sz=128",
        "icon": "bi bi-person-check",
        "featured": false,
        "tags": ["mentorship", "experts", "advice"]
    },
    {
        "name": "Risely",
        "url": "https://www.risely.me",
        "category": "Self-Improvement",
        "description": "AI coach for managers",
        "description_ar": "مدرب ذكاء اصطناعي للمديرين",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/risely.me",
        "icon": "bi bi-person-check",
        "featured": false,
        "tags": ["management", "coaching", "leadership"]
    },
    {
        "name": "BetterUp",
        "url": "https://www.betterup.com",
        "category": "Self-Improvement",
        "description": "Coaching and mental fitness",
        "description_ar": "التدريب واللياقة الذهنية",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/betterup.com",
        "icon": "bi bi-person-check",
        "featured": false,
        "tags": ["mental-health", "coaching", "fitness"]
    },
    {
        "name": "Whisper",
        "url": "https://openai.com/research/whisper",
        "category": "Speech-To-Text",
        "description": "Robust speech recognition model",
        "description_ar": "نموذج قوي للتعرف على الكلام",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/openai.com",
        "icon": "bi bi-soundwave",
        "featured": true,
        "tags": ["recognition", "model", "openai"]
    },
    {
        "name": "Google Cloud STT",
        "url": "https://cloud.google.com/speech-to-text",
        "category": "Speech-To-Text",
        "description": "Speech to text API",
        "description_ar": "واجهة برمجة تطبيقات تحويل الكلام إلى نص",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/google.com",
        "icon": "bi bi-soundwave",
        "featured": false,
        "tags": ["api", "google", "cloud"]
    },
    {
        "name": "Amazon Transcribe",
        "url": "https://aws.amazon.com/transcribe/",
        "category": "Speech-To-Text",
        "description": "Automatic speech recognition",
        "description_ar": "التعرف التلقائي على الكلام",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/aws.amazon.com",
        "icon": "bi bi-soundwave",
        "featured": false,
        "tags": ["aws", "recognition", "cloud"]
    },
    {
        "name": "AssemblyAI",
        "url": "https://www.assemblyai.com",
        "category": "Speech-To-Text",
        "description": "Speech AI models",
        "description_ar": "نماذج الذكاء الاصطناعي للكلام",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/assemblyai.com",
        "icon": "bi bi-soundwave",
        "featured": false,
        "tags": ["models", "api", "developers"]
    },
    {
        "name": "Deepgram",
        "url": "https://deepgram.com",
        "category": "Speech-To-Text",
        "description": "Fastest speech-to-text API",
        "description_ar": "أسرع واجهة برمجة تطبيقات لتحويل الكلام إلى نص",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/deepgram.com",
        "icon": "bi bi-soundwave",
        "featured": false,
        "tags": ["fast", "api", "transcription"]
    },
    {
        "name": "Rev",
        "url": "https://www.rev.com",
        "category": "Speech-To-Text",
        "description": "Speech to text services",
        "description_ar": "خدمات تحويل الكلام إلى نص",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/rev.com",
        "icon": "bi bi-soundwave",
        "featured": false,
        "tags": ["services", "transcription", "human"]
    },
    {
        "name": "CapCut",
        "url": "https://www.capcut.com",
        "category": "Video Editing",
        "description": "All-in-one video editor",
        "description_ar": "محرر فيديو شامل",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/capcut.com",
        "icon": "bi bi-scissors",
        "featured": true,
        "tags": ["editor", "mobile", "easy"]
    },
    {
        "name": "Veed.io",
        "url": "https://www.veed.io",
        "category": "Video Editing",
        "description": "Online video editor",
        "description_ar": "محرر فيديو عبر الإنترنت",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/veed.io",
        "icon": "bi bi-scissors",
        "featured": false,
        "tags": ["online", "editor", "subtitles"]
    },
    {
        "name": "Wisecut",
        "url": "https://www.wisecut.video",
        "category": "Video Editing",
        "description": "Automatic video editing",
        "description_ar": "تحرير فيديو تلقائي",
        "pricing": "Freemium",
        "logo": "https://www.google.com/s2/favicons?domain=wisecut.video&sz=128",
        "icon": "bi bi-scissors",
        "featured": false,
        "tags": ["automatic", "editing", "cuts"]
    },
    {
        "name": "Premiere Pro",
        "url": "https://www.adobe.com/products/premiere.html",
        "category": "Video Editing",
        "description": "Professional video editing",
        "description_ar": "تحرير فيديو احترافي",
        "pricing": "Paid",
        "logo": "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
        "icon": "bi bi-scissors",
        "featured": false,
        "tags": ["professional", "adobe", "editing"]
    },
    {
        "name": "DaVinci Resolve",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve",
        "category": "Video Editing",
        "description": "Color correction and editing",
        "description_ar": "تصحيح الألوان والتحرير",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/blackmagicdesign.com",
        "icon": "bi bi-scissors",
        "featured": false,
        "tags": ["color", "professional", "editing"]
    },
    {
        "name": "Khanmigo",
        "url": "https://www.khanacademy.org/khanmigo",
        "category": "Education",
        "description": "AI tutor by Khan Academy",
        "description_ar": "معلم ذكاء اصطناعي من أكاديمية خان",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/khanacademy.org",
        "icon": "bi bi-mortarboard",
        "featured": true,
        "tags": ["tutor", "education", "khan"]
    },
    {
        "name": "Duolingo Max",
        "url": "https://www.duolingo.com",
        "category": "Education",
        "description": "Language learning with AI",
        "description_ar": "تعلم اللغات بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/duolingo.com",
        "icon": "bi bi-mortarboard",
        "featured": false,
        "tags": ["language", "learning", "app"]
    },
    {
        "name": "Quizlet",
        "url": "https://quizlet.com",
        "category": "Education",
        "description": "AI study tools",
        "description_ar": "أدوات دراسة بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/quizlet.com",
        "icon": "bi bi-mortarboard",
        "featured": false,
        "tags": ["study", "flashcards", "tools"]
    },
    {
        "name": "Socratic",
        "url": "https://socratic.org",
        "category": "Education",
        "description": "Homework help by Google",
        "description_ar": "مساعدة في الواجبات المنزلية من جوجل",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/socratic.org",
        "icon": "bi bi-mortarboard",
        "featured": false,
        "tags": ["homework", "help", "google"]
    },
    {
        "name": "Brainly",
        "url": "https://brainly.com",
        "category": "Education",
        "description": "Homework help community",
        "description_ar": "مجتمع المساعدة في الواجبات المنزلية",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/brainly.com",
        "icon": "bi bi-mortarboard",
        "featured": false,
        "tags": ["community", "homework", "help"]
    },
    {
        "name": "CheggMate",
        "url": "https://www.chegg.com",
        "category": "Education",
        "description": "Personalized learning assistant",
        "description_ar": "مساعد تعلم شخصي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/chegg.com",
        "icon": "bi bi-mortarboard",
        "featured": false,
        "tags": ["learning", "assistant", "chegg"]
    },
    {
        "name": "Course Hero",
        "url": "https://www.coursehero.com",
        "category": "Education",
        "description": "Study resources and help",
        "description_ar": "موارد دراسية ومساعدة",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/coursehero.com",
        "icon": "bi bi-mortarboard",
        "featured": false,
        "tags": ["resources", "study", "help"]
    },
    {
        "name": "Shopify Magic",
        "url": "https://www.shopify.com/magic",
        "category": "E-commerce",
        "description": "AI tools for commerce",
        "description_ar": "أدوات ذكاء اصطناعي للتجارة",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/shopify.com",
        "icon": "bi bi-cart",
        "featured": true,
        "tags": ["commerce", "tools", "shopify"]
    },
    {
        "name": "Octane AI",
        "url": "https://www.octaneai.com",
        "category": "E-commerce",
        "description": "Quiz and zero-party data platform",
        "description_ar": "منصة اختبارات وبيانات الطرف الصفري",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/octaneai.com",
        "icon": "bi bi-cart",
        "featured": false,
        "tags": ["quiz", "data", "marketing"]
    },
    {
        "name": "Gorgias",
        "url": "https://www.gorgias.com",
        "category": "E-commerce",
        "description": "Customer service for ecommerce",
        "description_ar": "خدمة عملاء للتجارة الإلكترونية",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/gorgias.com",
        "icon": "bi bi-cart",
        "featured": false,
        "tags": ["support", "customer-service", "ecommerce"]
    },
    {
        "name": "Tidio",
        "url": "https://www.tidio.com",
        "category": "E-commerce",
        "description": "Customer service chatbots",
        "description_ar": "روبوتات محادثة لخدمة العملاء",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/tidio.com",
        "icon": "bi bi-cart",
        "featured": false,
        "tags": ["chatbots", "support", "ecommerce"]
    },
    {
        "name": "Dialogue",
        "url": "https://nowdialogue.com",
        "category": "E-commerce",
        "description": "Personalization for ecommerce",
        "description_ar": "تخصيص للتجارة الإلكترونية",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/nowdialogue.com",
        "icon": "bi bi-cart",
        "featured": false,
        "tags": ["personalization", "ecommerce", "conversion"]
    },
    {
        "name": "Clerk.io",
        "url": "https://clerk.io",
        "category": "E-commerce",
        "description": "AI personalization platform",
        "description_ar": "منصة تخصيص بالذكاء الاصطناعي",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/clerk.io",
        "icon": "bi bi-cart",
        "featured": false,
        "tags": ["personalization", "search", "recommendations"]
    },
    {
        "name": "Nosto",
        "url": "https://www.nosto.com",
        "category": "E-commerce",
        "description": "Commerce experience platform",
        "description_ar": "منصة تجربة التجارة",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/nosto.com",
        "icon": "bi bi-cart",
        "featured": false,
        "tags": ["experience", "platform", "commerce"]
    },
    {
        "name": "Surfer SEO",
        "url": "https://surferseo.com",
        "category": "SEO",
        "description": "Optimize content for SEO",
        "description_ar": "تحسين المحتوى لمحركات البحث",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/surferseo.com",
        "icon": "bi bi-search",
        "featured": true,
        "tags": ["seo", "optimization", "content"]
    },
    {
        "name": "Frase",
        "url": "https://www.frase.io",
        "category": "SEO",
        "description": "SEO content optimization",
        "description_ar": "تحسين محتوى SEO",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/frase.io",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["seo", "content", "optimization"]
    },
    {
        "name": "MarketMuse",
        "url": "https://www.marketmuse.com",
        "category": "SEO",
        "description": "Content planning and optimization",
        "description_ar": "تخطيط وتحسين المحتوى",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/marketmuse.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["planning", "content", "seo"]
    },
    {
        "name": "SEMrush",
        "url": "https://www.semrush.com",
        "category": "SEO",
        "description": "Online visibility management",
        "description_ar": "إدارة الظهور عبر الإنترنت",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/semrush.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["seo", "marketing", "management"]
    },
    {
        "name": "Ahrefs",
        "url": "https://ahrefs.com",
        "category": "SEO",
        "description": "SEO tools and resources",
        "description_ar": "أدوات وموارد SEO",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/ahrefs.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["seo", "tools", "backlinks"]
    },
    {
        "name": "RankMath",
        "url": "https://rankmath.com",
        "category": "SEO",
        "description": "WordPress SEO plugin",
        "description_ar": "إضافة SEO لوردبريس",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/rankmath.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["wordpress", "plugin", "seo"]
    },
    {
        "name": "Alli AI",
        "url": "https://www.alliai.com",
        "category": "SEO",
        "description": "Automate SEO for any site",
        "description_ar": "أتمتة SEO لأي موقع",
        "pricing": "Paid",
        "logo": "https://logo.clearbit.com/alliai.com",
        "icon": "bi bi-search",
        "featured": false,
        "tags": ["automation", "seo", "site"]
    },
    {
        "name": "LinkedIn",
        "url": "https://www.linkedin.com",
        "category": "Career",
        "description": "Professional networking and jobs",
        "description_ar": "التواصل المهني والوظائف",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/linkedin.com",
        "icon": "bi bi-briefcase",
        "featured": true,
        "tags": ["networking", "jobs", "career"]
    },
    {
        "name": "Teal",
        "url": "https://www.tealhq.com",
        "category": "Career",
        "description": "Career growth platform",
        "description_ar": "منصة النمو المهني",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/tealhq.com",
        "icon": "bi bi-briefcase",
        "featured": false,
        "tags": ["growth", "career", "platform"]
    },
    {
        "name": "Resume Worded",
        "url": "https://resumeworded.com",
        "category": "Career",
        "description": "Improve your resume and profile",
        "description_ar": "تحسين سيرتك الذاتية وملفك الشخصي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/resumeworded.com",
        "icon": "bi bi-briefcase",
        "featured": false,
        "tags": ["resume", "profile", "improvement"]
    },
    {
        "name": "Jobscan",
        "url": "https://www.jobscan.co",
        "category": "Career",
        "description": "Optimize resume for job descriptions",
        "description_ar": "تحسين السيرة الذاتية لوصف الوظائف",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/jobscan.co",
        "icon": "bi bi-briefcase",
        "featured": false,
        "tags": ["optimization", "resume", "jobs"]
    },
    {
        "name": "Rezi",
        "url": "https://www.rezi.ai",
        "category": "Career",
        "description": "AI resume builder",
        "description_ar": "باني سيرة ذاتية بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/rezi.ai",
        "icon": "bi bi-briefcase",
        "featured": false,
        "tags": ["builder", "resume", "ai"]
    },
    {
        "name": "Kickresume",
        "url": "https://www.kickresume.com",
        "category": "Career",
        "description": "Create a resume with AI",
        "description_ar": "إنشاء سيرة ذاتية بالذكاء الاصطناعي",
        "pricing": "Freemium",
        "logo": "https://logo.clearbit.com/kickresume.com",
        "icon": "bi bi-briefcase",
        "featured": false,
        "tags": ["creation", "resume", "ai"]
    },
    {
        "name": "Interview Warmup",
        "url": "https://grow.google/certificates/interview-warmup/",
        "category": "Career",
        "description": "Practice key interview questions",
        "description_ar": "ممارسة أسئلة المقابلة الرئيسية",
        "pricing": "Free",
        "logo": "https://logo.clearbit.com/google.com",
        "icon": "bi bi-briefcase",
        "featured": false,
        "tags": ["interview", "practice", "google"]
    }
];

const categories = [
    {
        "name": "AI Detection",
        "name_ar": "كشف الذكاء الاصطناعي",
        "icon": "bi bi-search"
    },
    {
        "name": "Avatar",
        "name_ar": "الصور الرمزية",
        "icon": "bi bi-person"
    },
    {
        "name": "Copywriting",
        "name_ar": "كتابة النصوص",
        "icon": "bi bi-file-earmark-text"
    },
    {
        "name": "For Fun",
        "name_ar": "للمتعة",
        "icon": "bi bi-emoji-smile"
    },
    {
        "name": "Generative Art",
        "name_ar": "الفن التوليدي",
        "icon": "bi bi-palette"
    },
    {
        "name": "Generative Video",
        "name_ar": "توليد الفيديو",
        "icon": "bi bi-camera-video"
    },
    {
        "name": "Image Scanning",
        "name_ar": "مسح الصور",
        "icon": "bi bi-image"
    },
    {
        "name": "Marketing",
        "name_ar": "التسويق",
        "icon": "bi bi-megaphone"
    },
    {
        "name": "Music",
        "name_ar": "الموسيقى",
        "icon": "bi bi-music-note"
    },
    {
        "name": "Productivity",
        "name_ar": "الإنتاجية",
        "icon": "bi bi-graph-up"
    },
    {
        "name": "Research",
        "name_ar": "البحث",
        "icon": "bi bi-lightbulb"
    },
    {
        "name": "Social Media",
        "name_ar": "التواصل الاجتماعي",
        "icon": "bi bi-share"
    },
    {
        "name": "Text-To-Speech",
        "name_ar": "تحويل النص إلى كلام",
        "icon": "bi bi-volume-up"
    },
    {
        "name": "Translation",
        "name_ar": "الترجمة",
        "icon": "bi bi-translate"
    },
    {
        "name": "Voice Modulation",
        "name_ar": "تعديل الصوت",
        "icon": "bi bi-mic"
    },
    {
        "name": "Aggregators",
        "name_ar": "المجمعات",
        "icon": "bi bi-collection"
    },
    {
        "name": "Chat",
        "name_ar": "المحادثة",
        "icon": "bi bi-chat-dots"
    },
    {
        "name": "Finance",
        "name_ar": "المالية",
        "icon": "bi bi-wallet2"
    },
    {
        "name": "Gaming",
        "name_ar": "الألعاب",
        "icon": "bi bi-controller"
    },
    {
        "name": "Generative Code",
        "name_ar": "توليد الكود",
        "icon": "bi bi-code-slash"
    },
    {
        "name": "Image Improvement",
        "name_ar": "تحسين الصور",
        "icon": "bi bi-brush"
    },
    {
        "name": "Inspiration",
        "name_ar": "الإلهام",
        "icon": "bi bi-sun"
    },
    {
        "name": "Podcasting",
        "name_ar": "البودكاست",
        "icon": "bi bi-headphones"
    },
    {
        "name": "Prompt Guides",
        "name_ar": "أدلة الأوامر",
        "icon": "bi bi-list-check"
    },
    {
        "name": "Self-Improvement",
        "name_ar": "تطوير الذات",
        "icon": "bi bi-person-check"
    },
    {
        "name": "Speech-To-Text",
        "name_ar": "تحويل الكلام إلى نص",
        "icon": "bi bi-soundwave"
    },
    {
        "name": "Text-To-Video",
        "name_ar": "تحويل النص إلى فيديو",
        "icon": "bi bi-film"
    },
    {
        "name": "Video Editing",
        "name_ar": "تعديل الفيديو",
        "icon": "bi bi-scissors"
    },
    {
        "name": "Education",
        "name_ar": "التعليم",
        "icon": "bi bi-mortarboard"
    },
    {
        "name": "E-commerce",
        "name_ar": "التجارة الإلكترونية",
        "icon": "bi bi-cart"
    },
    {
        "name": "SEO",
        "name_ar": "تحسين محركات البحث",
        "icon": "bi bi-search"
    },
    {
        "name": "Career",
        "name_ar": "الوظائف",
        "icon": "bi bi-briefcase"
    }
];

const blogPosts = [
    {
        "title_en": "The Rise of AI Agents: Autonomous Workflows",
        "title_ar": "صعود وكلاء الذكاء الاصطناعي: مستقبل سير العمل المستقل",
        "summary_en": "AI agents are transforming how businesses operate by automating complex, multi-step tasks. Discover the key benefits and applications.",
        "summary_ar": "وكلاء الذكاء الاصطناعي يغيرون طريقة عمل الشركات من خلال أتمتة المهام المعقدة ومتعددة الخطوات. اكتشف الفوائد والتطبيقات الرئيسية.",
        "category_en": "Future Trends",
        "category_ar": "توجهات مستقبلية",
        "date": "2025-10-01",
        "author_en": "Amal Al-Fahad",
        "author_ar": "أمل الفهد",
        "image": "https://picsum.photos/seed/ai-agent-01/800/400",
        "body_en": "\n                <p>The concept of AI agents moving beyond simple tasks to execute entire workflows is quickly becoming a reality. These agents can plan, execute, and monitor long-term goals with minimal human intervention.</p>\n                <h3>What are Autonomous AI Agents?</h3>\n                <p>Unlike traditional AI tools that perform single actions, autonomous agents possess the ability to:</p>\n                <ul>\n                    <li>Set and refine goals based on high-level instructions.</li>\n                    <li>Break down complex goals into smaller, executable sub-tasks.</li>\n                    <li>Iterate and learn from previous attempts to improve results.</li>\n                </ul>\n                <h3>Impact on Business Productivity</h3>\n                <p>For businesses, this means a massive leap in efficiency. Imagine an agent that can not only write a marketing email but also research the target audience, analyze campaign performance, and adjust its strategy—all automatically.</p>\n                <p>The future of work involves humans supervising these powerful agents, rather than manually performing every task.</p>\n            ",
        "body_ar": "\n                <p>إن مفهوم وكلاء الذكاء الاصطناعي الذين يتجاوزون المهام البسيطة لتنفيذ سير عمل كاملة أصبح حقيقة واقعة بسرعة. يمكن لهؤلاء الوكلاء تخطيط الأهداف طويلة المدى وتنفيذها ومراقبتها بأقل قدر من التدخل البشري.</p>\n                <h3>ما هي وكلاء الذكاء الاصطناعي المستقلون؟</h3>\n                <p>على عكس أدوات الذكاء الاصطناعي التقليدية التي تؤدي إجراءات فردية، يتمتع الوكلاء المستقلون بالقدرة على:</p>\n                <ul>\n                    <li>تحديد الأهداف وصقلها بناءً على تعليمات عالية المستوى.</li>\n                    <li>تقسيم الأهداف المعقدة إلى مهام فرعية أصغر قابلة للتنفيذ.</li>\n                    <li>التكرار والتعلم من المحاولات السابقة لتحسين النتائج.</li>\n                </ul>\n                <h3>تأثيرهم على إنتاجية الأعمال</h3>\n                <p>بالنسبة للشركات، يعني هذا قفزة هائلة في الكفاءة. تخيل وكيلاً لا يمكنه كتابة بريد إلكتروني تسويقي فحسب، بل يمكنه أيضًا البحث عن الجمهور المستهدف وتحليل أداء الحملة وتعديل استراتيجيته - كل ذلك تلقائيًا.</p>\n                <p>مستقبل العمل يتضمن إشراف البشر على هؤلاء الوكلاء الأقوياء، بدلاً من أداء كل مهمة يدويًا.</p>\n            "
    },
    {
        "title_en": "Generative Art Beyond DALL-E: New Tools in 2025",
        "title_ar": "الفن التوليدي بعد DALL-E: أدوات جديدة لعام 2025",
        "summary_en": "The landscape of generative art is rapidly evolving, with new models offering higher fidelity, better control, and unique artistic styles.",
        "summary_ar": "يتطور مشهد الفن التوليدي بسرعة، حيث تقدم النماذج الجديدة دقة أعلى وتحكمًا أفضل وأنماطًا فنية فريدة.",
        "category_en": "Generative Art",
        "category_ar": "الفن التوليدي",
        "date": "2025-09-15",
        "author_en": "Khalid Al-Mansoori",
        "author_ar": "خالد المنصوري",
        "image": "https://picsum.photos/seed/ai-art-02/800/400",
        "body_en": "\n                <p>While DALL-E and Midjourney set the standard, the market is now flooded with specialized tools focusing on niches like 3D modeling, high-resolution upscaling, and detailed architectural visualization.</p>\n                <h3>Why Specialization Matters</h3>\n                <p>General-purpose models are great, but specialized tools offer several advantages:</p>\n                <ul>\n                    <li><strong>Depth of Control:</strong> Fine-tuning parameters for specific outputs (e.g., controlling light sources in a 3D scene).</li>\n                    <li><strong>Workflow Integration:</strong> Seamless export into professional design and video editing software.</li>\n                    <li><strong>Unique Aesthetics:</strong> Models trained on specific artistic movements or historical eras.</li>\n                </ul>\n                <p>Artists are now blending the output of multiple AI tools to achieve truly complex and innovative final pieces.</p>\n            ",
        "body_ar": "\n                <p>في حين أن DALL-E و Midjourney قد وضعا المعيار، إلا أن السوق يمتلئ الآن بالأدوات المتخصصة التي تركز على مجالات مثل النمذجة ثلاثية الأبعاد، وتحسين الدقة العالية، والتصور المعماري التفصيلي.</p>\n                <h3>لماذا التخصص مهم؟</h3>\n                <p>النماذج العامة رائعة، لكن الأدوات المتخصصة تقدم العديد من المزايا:</p>\n                <ul>\n                    <li><strong>عمق التحكم:</strong> ضبط دقيق للمعلمات للمخرجات المحددة (مثل التحكم في مصادر الإضاءة في مشهد ثلاثي الأبعاد).</li>\n                    <li><strong>التكامل مع سير العمل:</strong> تصدير سلس إلى برامج التصميم وتحرير الفيديو الاحترافية.</li>\n                    <li><strong>جماليات فريدة:</strong> نماذج مدربة على حركات فنية محددة أو عصور تاريخية.</li>\n                </ul>\n                <p>يقوم الفنانون الآن بمزج مخرجات أدوات الذكاء الاصطناعي المتعددة لتحقيق قطع فنية نهائية معقدة ومبتكرة حقًا.</p>\n            "
    },
    {
        "title_en": "The Future of Coding: AI Pair Programmers",
        "title_ar": "مستقبل البرمجة: المبرمجون المساعدون بالذكاء الاصطناعي",
        "summary_en": "AI pair programming tools like GitHub Copilot are no longer just for auto-completion. They are becoming essential partners that speed up development and catch errors early.",
        "summary_ar": "أدوات البرمجة المزدوجة بالذكاء الاصطناعي مثل GitHub Copilot لم تعد مجرد لإكمال الكود تلقائيًا. إنها تصبح شركاء أساسيين يسرعون التطوير ويكتشفون الأخطاء مبكرًا.",
        "category_en": "Generative Code",
        "category_ar": "الكود التوليدي",
        "date": "2025-09-01",
        "author_en": "Fahad Al-Rashid",
        "author_ar": "فهد الرشيد",
        "image": "https://picsum.photos/seed/ai-code-03/800/400",
        "body_en": "\n                <p>The latest generation of AI coding assistants can handle far more complex requests than their predecessors. They can refactor entire codebases, write unit tests based on context, and even translate code between different programming languages.</p>\n                <h3>Key Benefits for Developers</h3>\n                <p>Integrating these tools into the daily workflow provides immediate advantages:</p>\n                <ul>\n                    <li><strong>Time Saving:</strong> Automating boilerplate code and repetitive tasks.</li>\n                    <li><strong>Learning Curve:</strong> Helping junior developers understand complex code patterns.</li>\n                    <li><strong>Quality Improvement:</strong> Suggesting performance optimizations and security best practices.</li>\n                </ul>\n                <p>While the fear of AI replacing developers persists, the reality is that these tools augment human capabilities, allowing developers to focus on high-level architectural design and complex problem-solving.</p>\n            ",
        "body_ar": "\n                <p>يمكن لأحدث جيل من مساعدي البرمجة بالذكاء الاصطناعي التعامل مع طلبات أكثر تعقيدًا بكثير من سابقاتها. يمكنهم إعادة هيكلة قواعد الكود بالكامل، وكتابة اختبارات الوحدة بناءً على السياق، وحتى ترجمة الكود بين لغات برمجة مختلفة.</p>\n                <h3>الفوائد الرئيسية للمطورين</h3>\n                <p>يوفر دمج هذه الأدوات في سير العمل اليومي مزايا فورية:</p>\n                <ul>\n                    <li><strong>توفير الوقت:</strong> أتمتة الكود النمطي والمهام المتكررة.</li>\n                    <li><strong>منحنى التعلم:</strong> مساعدة المطورين المبتدئين على فهم أنماط الكود المعقدة.</li>\n                    <li><strong>تحسين الجودة:</strong> اقتراح تحسينات الأداء وأفضل ممارسات الأمان.</li>\n                </ul>\n                <p>على الرغم من استمرار المخاوف من أن يحل الذكاء الاصطناعي محل المطورين، إلا أن الواقع هو أن هذه الأدوات تعزز القدرات البشرية، مما يسمح للمطورين بالتركيز على التصميم المعماري عالي المستوى وحل المشكلات المعقدة.</p>\n            "
    }, {
        "title_en": "ZAYA1: AI model using AMD GPUs for training hits milestone",
        "title_ar": "ZAYA1: نموذج الذكاء الاصطناعي باستخدام معالجات AMD يحقق معلمًا جديدًا",
        "summary_en": "Zyphra, AMD, and IBM spent a year testing whether AMD's GPUs and platform can support large-scale AI model training, and the result is ZAYA1. In partnership, the three companies trained ZAYA1 – described as the first major Mixture-of-Experts foundation model built entirely on AMD GPUs and networking – which they see as proof that the market doesn't have to depend on NVIDIA to scale AI.",
        "summary_ar": "قضت شركات Zyphra وAMD وIBM عامًا في اختبار قدرة معالجات AMD ومنصتها على دعم تدريب نماذج الذكاء الاصطناعي واسعة النطاق، والنتيجة هي ZAYA1. وهو أول نموذج أساسي من نوع Mixture-of-Experts مبني بالكامل على معالجات AMD وشبكاتها، مما يثبت أن السوق لا يجب أن تعتمد على NVIDIA لتوسيع نطاق الذكاء الاصطناعي.",
        "category_en": "AI Hardware & Chips",
        "category_ar": "عتاد الذكاء الاصطناعي والشرائح",
        "date": "2025-11-24",
        "author_en": "Ryan Daws",
        "author_ar": "فريق الأخبار التقنية",
        "image": "https://www.artificialintelligence-news.com/wp-content/uploads/2025/11/amd-zaya1-ai-model-training-moe-mixture-of-experts-artificial-intelligence-ibm-1536x1151.jpg",
        "link": "https://www.artificialintelligence-news.com/news/zaya1-ai-model-using-amd-gpus-for-training-hits-milestone/",
        "body_en": "Zyphra, AMD, and IBM spent a year testing whether AMD's GPUs and platform can support large-scale AI model training, and the result is ZAYA1. In partnership, the three companies trained ZAYA1 – described as the first major Mixture-of-Experts foundation model built entirely on AMD GPUs and networking – which they see as proof that the market doesn't have to depend on NVIDIA to scale AI. The model was trained on AMD's Instinct MI300X chips, Pensando networking, and ROCm software, all running across IBM Cloud's infrastructure. What's notable is how conventional the setup looks. Instead of experimental hardware or obscure configurations, Zyphra built the system much like any enterprise cluster—just without NVIDIA's components. Zyphra says ZAYA1 performs on par with, and in some areas ahead of, well-established open models in reasoning, maths, and code. For businesses frustrated by supply constraints or spiralling GPU pricing, it amounts to something rare: a second option that doesn't require compromising on capability.",
        "body_ar": "أمضت شركات Zyphra وAMD وIBM عامًا كاملاً في اختبار ما إذا كانت معالجات AMD ومنصتها قادرة على دعم تدريب نماذج الذكاء الاصطناعي واسعة النطاق، وكانت النتيجة نموذج ZAYA1. بالشراكة، دربت الشركات الثلاث ZAYA1 - الذي يوصف بأنه أول نموذج أساسي رئيسي من نوع Mixture-of-Experts مبني بالكامل على معالجات AMD وشبكاتها - والذي يرونه كدليل على أن السوق لا يجب أن تعتمد على NVIDIA لتوسيع نطاق الذكاء الاصطناعي. تم تدريب النموذج على شرائح AMD's Instinct MI300X، وشبكات Pensando، وبرنامج ROCm، وكلها تعمل عبر بنية IBM Cloud الأساسية. ما يلفت الانتباه هو مدى تقليدية الإعداد. بدلاً من الأجهزة التجريبية أو التكوينات الغامضة، قامت Zyphra ببناء النظام يشبه إلى حد كبير أي مجموعة مؤسسات - فقط بدون مكونات NVIDIA. تقول Zyphra أن ZAYA1 يعادل في الأداء، وفي بعض المجالات يتفوق على، النماذج المفتوحة الراسخة في التفكير والرياضيات والبرمجة. بالنسبة للشركات المحبطة بسبب قيود العرض أو ارتفاع أسعار معالجات GPU، فإن هذا يمثل خيارًا نادرًا: بديل ثان لا يتطلب التنازل عن القدرة."
    },
    {
        "title_en": "Google commits to 1000x more AI infrastructure in next 4-5 years",
        "title_ar": "غوغل تلتزم بزيادة بنية الذكاء الاصطناعي 1000 ضعف في السنوات 4-5 القادمة",
        "summary_en": "In order to meet the massive demand for AI, Google wants to double the overall size of its servers every six months, a growth rate that would create a 1000x greater capacity in the next four or five years.",
        "summary_ar": "لتلبية الطلب الهائل على الذكاء الاصطناعي، تخطط غوغل لمضاعفة الحجم الإجمالي لخوادمها كل ستة أشهر، وهو معدل نمو من شأنه أن يخلق سعة أكبر بـ 1000 ضعف في السنوات الأربع أو الخمس القادمة.",
        "category_en": "AI Business Strategy",
        "category_ar": "استراتيجية أعمال الذكاء الاصطناعي",
        "date": "2025-11-24",
        "author_en": "Joe Green",
        "author_ar": "فريق الأخبار التقنية",
        "image": "https://www.artificialintelligence-news.com/wp-content/uploads/2025/11/ai-infrastructure-commitment-hero-1536x1025.jpg",
        "link": "https://www.artificialintelligence-news.com/news/google-commits-to-1000x-more-ai-infrastructure-in-next-4-5-years/",
        "body_en": "In order to meet the massive demand for AI, Google wants to double the overall size of its servers every six months, a growth rate that would create a 1000x greater capacity in the next four or five years. The statement came from the head of Google's AI infrastructure, Amin Vahdat, during an all-hands meeting on November 6, according to CNBC. Alphabet, Google's parent company is certainly performing well, so such a requirement may be within its financial capabilities. It reported good Q3 figures at the end of October, and has raised its capital expenditure forecast to $93 billion, up from $91 billion. Vahdat addressed one employee's question about the company's future amid talk of an 'AI bubble' by re-stating the risks of not investing aggressively enough. In its cloud operations, such investment in infrastructure has paid off. 'The risk of under-investing is pretty high […] the cloud numbers would have been much better if we had more compute.' Google's cloud business continues to grow at around a 33% per year, creating an income stream that enables the company to be 'better positioned to withstand misses than other companies.'",
        "body_ar": "لتلبية الطلب الهائل على الذكاء الاصطناعي، تريد غوغل مضاعفة الحجم الإجمالي لخوادمها كل ستة أشهر، وهو معدل نمو من شأنه أن يخلق سعة أكبر بـ 1000 ضعف في السنوات الأربع أو الخمس القادمة. صدر هذا البيان من رئيس بنية غوغل الأساسية للذكاء الاصطناعي، أمين وحدات، خلال اجتماع عام في 6 نوفمبر، وفقًا لـ CNBC. تؤدي شركة ألفابت، الشركة الأم لغوغل، أداءً جيدًا بالتأكيد، لذا قد يكون مثل هذا المطلب ضمن قدراتها المالية. أعلنت عن أرقام جيدة للربع الثالث في نهاية أكتوبر، ورفعت توقعاتها للنفقات الرأسمالية إلى 93 مليار دولار، مرتفعة من 91 مليار دولار. تناول وحدات سؤال أحد الموظفين حول مستقبل الشركة وسط حديث عن 'فقاعة الذكاء الاصطناعي' من خلال إعادة التأكيد على مخاطر عدم الاستثمار بقوة كافية. في عملياتها السحابية، أثمر هذا الاستثمار في البنية الأساسية. 'إن خطر الاستثمار غير الكافي مرتفع جدًا […] كانت الأرقام السحابية ستكون أفضل بكثير إذا كان لدينا المزيد من القدرات الحاسوبية.' يواصل عمل غوغل السحابي النمو بنحو 33٪ سنويًا، مما يخلق تدفقًا للدخل يمكن الشركة من أن تكون 'في وضع أفضل لتحمل الأخطاء من الشركات الأخرى.'"
    },
    {
        "title_en": "How Europe's talent can secure a trillion-euro AI economic injection",
        "title_ar": "كيف يمكن للمواهب الأوروبية تأمين حصة تريليون يورو من اقتصاد الذكاء الاصطناعي",
        "summary_en": "A €1.2 trillion AI prize sits on the table for Europe's economy, and the region has the talent and raw ingredients to claim it.",
        "summary_ar": "جائزة ذكاء اصطناعي بقيمة 1.2 تريليون يورو تنتظر الاقتصاد الأوروبي، والمنطقة تمتلك المواهب والمقومات الأساسية للمطالبة بها.",
        "category_en": "AI and Us",
        "category_ar": "الذكاء الاصطناعي ونحن",
        "date": "2025-11-24",
        "author_en": "Ryan Daws",
        "author_ar": "فريق الأخبار التقنية",
        "image": "https://www.artificialintelligence-news.com/wp-content/uploads/2025/11/europe-ai-adoption-eu-economy-gdp-economic-uk-innovation-artificial-intelligence-google-1536x1152.jpg",
        "link": "https://www.artificialintelligence-news.com/news/how-europe-talent-can-secure-trillion-euro-ai-economic-injection/",
        "body_en": "A €1.2 trillion AI prize sits on the table for Europe's economy, and the region has the talent and raw ingredients to claim it. While the global narrative often focuses on competition with the US and China, the view from the ground in Europe is a region of untapped potential, world-class talent, and deep infrastructure investment. Debbie Weinstein, President of Google EMEA, sees a 'new generation of visionary founders' ready to drive the region's future. The opportunity is built on a foundation of scientific excellence and a workforce that is 'as bright as anywhere else in the world.' The task now is to leverage Europe's strengths to close the AI adoption gap and accelerate growth. A foundation of innovation Europe is already a powerhouse of scientific breakthrough. The Google DeepMind team – which includes Nobel prize winners – drives discovery from London, while nearly one million researchers across EMEA use AlphaFold to solve biological problems. Europe isn't starting from scratch; it is a hub of high-level R&D. That intellectual capital is being matched by hard investment. Just last week, Google announced a €5.5 billion investment in Germany to support digital infrastructure and AI innovation.",
        "body_ar": "توجد جائزة ذكاء اصطناعي بقيمة 1.2 تريليون يورو على الطاولة للاقتصاد الأوروبي، والمنطقة تمتلك المواهب والمقومات الأساسية للمطالبة بها. بينما يركز السرد العالمي غالبًا على المنافسة مع الولايات المتحدة والصين، فإن النظرة من الميدان في أوروبا تُظهر منطقة ذات إمكانات غير مستغلة ومواهب عالمية المستوى واستثمارات عميقة في البنية الأساسية. ترى ديبي وينشتاين، رئيسة غوغل في أوروبا والشرق الأوسط وأفريقيا، 'جيلًا جديدًا من المؤسسين ذوي الرؤية' مستعدين لقيادة مستقبل المنطقة. تُبنى الفرصة على أساس من التميز العلمي وقوة عاملة 'مشرقة مثل أي مكان آخر في العالم'. تتمثل المهمة الآن في الاستفادة من نقاط قوة أوروبا لسد فجوة اعتماد الذكاء الاصطناعي وتسريع النمو. أوروبا هي بالفعل قوة عظمى في مجال الاختراع العلمي. يقود فريق غوغل DeepMind - الذي يضم الحائزين على جائزة نوبل - الاكتشاف من لندن، بينما يستخدم ما يقرب من مليون باحث في جميع أنحاء أوروبا والشرق الأوسط وأفريقيا AlphaFold لحل المشكلات البيولوجية. لا تبدأ أوروبا من الصفر؛ فهي مركز للبحث والتطوير عالي المستوى. هذا رأس المال الفكري يقابله استثمار مادي قوي. فقط الأسبوع الماضي، أعلنت غوغل عن استثمار بقيمة 5.5 مليار يورو في ألمانيا لدعم البنية التحتية الرقمية والابتكار في الذكاء الاصطناعي."
    },
    {
        "title_en": "APAC enterprises move AI infrastructure to edge as inference costs rise",
        "title_ar": "شركات آسيا والمحيط الهادئ تنقل بنية الذكاء الاصطناعي إلى الحافة مع ارتفاع تكاليف الاستدلال",
        "summary_en": "AI spending in Asia Pacific continues to rise, yet many companies still struggle to get value from their AI projects due to infrastructure limitations.",
        "summary_ar": "يستمر الإنفاق على الذكاء الاصطناعي في آسيا والمحيط الهادئ في الارتفاع، لكن العديد من الشركات لا تزال تواجه صعوبة في تحقيق القيمة من مشاريعها بسبب قيود البنية التحتية.",
        "category_en": "AI Business Strategy",
        "category_ar": "استراتيجية أعمال الذكاء الاصطناعي",
        "date": "2025-11-24",
        "author_en": "Muhammad Zulhusni",
        "author_ar": "فريق الأخبار التقنية",
        "image": "https://www.artificialintelligence-news.com/wp-content/uploads/2025/11/Enterprises-are-rethinking-AI-infrastructure-as-inference-costs-rise-scaled-e1763955342732.jpg",
        "link": "https://www.artificialintelligence-news.com/news/enterprises-are-rethinking-ai-infrastructure-as-inference-costs-rise/",
        "body_en": "AI spending in Asia Pacific continues to rise, yet many companies still struggle to get value from their AI projects. Much of this comes down to the infrastructure that supports AI, as most systems are not built to run inference at the speed or scale real applications need. Industry studies show many projects miss their ROI goals even after heavy investment in GenAI tools because of the issue. The gap shows how much AI infrastructure influences performance, cost, and the ability to scale real-world deployments in the region. Akamai is trying to address this challenge with Inference Cloud, built with NVIDIA and powered by the latest Blackwell GPUs. The idea is simple: if most AI applications need to make decisions in real time, then those decisions should be made close to users rather than in distant data centres. That shift, Akamai claims, can help companies manage cost, reduce delays, and support AI services that depend on split-second responses. Jay Jenkins, CTO of Cloud Computing at Akamai, explained to AI News why this moment is forcing enterprises to rethink how they deploy AI and why inference, not training, has become the real bottleneck.",
        "body_ar": "يستمر الإنفاق على الذكاء الاصطناعي في آسيا والمحيط الهادئ في الارتفاع، لكن العديد من الشركات لا تزال تواجه صعوبة في تحقيق القيمة من مشاريع الذكاء الاصطناعي. يعود الكثير من هذا إلى البنية الأساسية التي تدعم الذكاء الاصطناعي، حيث أن معظم الأنظمة ليست مبنية لتشغيل الاستدلال بالسرعة أو النطاق الذي تحتاجه التطبيقات الحقيقية. تظهر الدراسات الصناعية أن العديد من المشاريع تفوت أهداف عائد الاستثمار حتى بعد الاستثمار الثقيل في أدوات الذكاء الاصطناعي التوليدي بسبب هذه المشكلة. تظهر الفجوة مدى تأثير بنية الذكاء الاصطناعي الأساسية على الأداء والتكلفة والقدرة على توسيع نطاق النشر في العالم الحقيقي في المنطقة. تحاول Akamai معالجة هذا التحدي مع Inference Cloud، المبنية مع NVIDIA والمزودة بأحدث معالجات Blackwell. الفكرة بسيطة: إذا كانت معظم تطبيقات الذكاء الاصطناعي تحتاج إلى اتخاذ قرارات في الوقت الفعلي، فيجب اتخاذ تلك القرارات بالقرب من المستخدمين بدلاً من مراكز البيانات البعيدة. تدعي Akamai أن هذا التحول يمكن أن يساعد الشركات في إدارة التكاليف وتقليل التأخيرات ودعم خدمات الذكاء الاصطناعي التي تعتمد على الاستجابات فائقة السرعة. شرح جاي جنكينز، الرئيس التنفيذي للتكنولوجيا للحوسبة السحابية في Akamai، لـ AI News لماذا تجبر هذه اللحظة الشركات على إعادة التفكير في كيفية نشرها للذكاء الاصطناعي ولماذا أصبح الاستدلال، وليس التدريب، هو عنق الزجاجة الحقيقي."
    },
    {
        "title_en": "4 best essay writing websites students choose over AI",
        "title_ar": "أفضل 4 مواقع لكتابة المقالات يختارها الطلاب بدلاً من الذكاء الاصطناعي",
        "summary_en": "Despite the rise of AI writing tools, many students still prefer professional essay writing services for their academic assignments.",
        "summary_ar": "على الرغم من صعود أدوات الكتابة بالذكاء الاصطناعي، لا يزال العديد من الطلاب يفضلون خدمات كتابة المقالات الاحترافية لواجباتهم الأكاديمية.",
        "category_en": "Artificial Intelligence",
        "category_ar": "الذكاء الاصطناعي",
        "date": "2025-11-24",
        "author_en": "Lydia Havens",
        "author_ar": "فريق الأخبار التقنية",
        "image": "https://www.artificialintelligence-news.com/wp-content/uploads/2025/11/glenn-carstens-peters-npxXWgQ33ZQ-unsplash-7-1536x1022.jpg",
        "link": "https://www.artificialintelligence-news.com/news/4-best-essay-writing-websites-students-choose-over-ai/",
        "body_en": "We've all seen the headlines: a third of US college students say they use ChatGPT for writing tasks at least once a month. The share of US teens turning to the same tool for schoolwork doubled between 2023 and 2024. Generative AI tools overall are a fixture of life for seven out of ten teens. The advent of ChatGPT and its competitors was supposed to put even the best essay writing services out of business. After all, generative AI can create an essay in seconds. So, why pay a professional to take care of it? Yet, three years after the launch of ChatGPT, academic help services are still going strong. Here's why US students continue to choose expert help over AI-generated content, and the four services they trust with their assignments. How students actually use AI tools When it first made the news, ChatGPT was called 'the death of the English essay.' Now, that kind of language seems like a promise of an apocalypse that (predictably, in hindsight) never came. Today, students don't use generative AI tools to generate whole essays. Across multiple surveys, brainstorming, outlining, research, and test prep emerge as the main use cases for AI.",
        "body_ar": "لقد رأينا جميعًا العناوين: يقول ثلث طلاب الجامعات الأمريكية أنهم يستخدمون ChatGPT للمهام الكتابية مرة واحدة على الأقل شهريًا. تضاعفت حصة المراهقين الأمريكيين الذين يلجأون إلى نفس الأداة للعمل المدرسي بين عامي 2023 و2024. أصبحت أدوات الذكاء الاصطناعي التوليدي بشكل عام عنصرًا أساسيًا في الحياة لسبعة من كل عشرة مراهقين. كان من المفترض أن يؤدي ظهور ChatGPT ومنافسيه إلى إخراج حتى أفضل خدمات كتابة المقالات من العمل. بعد كل شيء، يمكن للذكاء الاصطناعي التوليدي إنشاء مقال في ثوانٍ. إذن، لماذا ندفع لمحترف للاعتناء به؟ ومع ذلك، بعد ثلاث سنوات من إطلاق ChatGPT، لا تزال خدمات المساعدة الأكاديمية قوية. إليكم السبب الذي يجعل الطلاب الأمريكيين يواصلون اختيار المساعدة الخبيرة بدلاً من المحتوى الذي يولده الذكاء الاصطناعي، والخدمات الأربع التي يثقون بها في واجباتهم. كيف يستخدم الطلاب أدوات الذكاء الاصطناعي فعليًا عندما ظهر ChatGPT في الأخبار لأول مرة، سُمي 'موت المقال الإنجليزي'. الآن، يبدو هذا النوع من اللغة كوعد بنهاية العالم (يمكن التنبؤ بها، retrospectively) لم تأت أبدًا. اليوم، لا يستخدم الطلاب أدوات الذكاء الاصطناعي التوليدي لتوليد مقالات كاملة. عبر استطلاعات متعددة، تظهر العصف الذهني، والتخطيط، والبحث، والتحضير للاختبارات كحالات الاستخدام الرئيسية للذكاء الاصطناعي."
    },
    {
        "title_en": "Qwen AI hits 10m+ downloads as Alibaba disrupts the AI market",
        "title_ar": "تطبيق Qwen AI يحقق أكثر من 10 ملايين تنزيل بينما تقتحم علي بابا سوق الذكاء الاصطناعي",
        "summary_en": "Alibaba's recently launched Qwen AI app has demonstrated remarkable market traction, accumulating 10 million downloads in the seven days since its public beta release.",
        "summary_ar": "أظهر تطبيق Qwen AI الذي أطلقته علي بابا مؤخرًا جاذبية سوقية ملحوظة، حيث جمع 10 ملايين عملية تنزيل خلال الأيام السبعة منذ إصداره التجريبي العام.",
        "category_en": "AI Business Strategy",
        "category_ar": "استراتيجية أعمال الذكاء الاصطناعي",
        "date": "2025-11-24",
        "author_en": "Dashveenjit Kaur",
        "author_ar": "فريق الأخبار التقنية",
        "image": "https://www.artificialintelligence-news.com/wp-content/uploads/2025/11/G6HfTiDW8AAgvtz-1536x799.jpeg",
        "link": "https://www.artificialintelligence-news.com/news/alibaba-qwen-ai-app-10-million-downloads/",
        "body_en": "Alibaba's recently launched Qwen AI app has demonstrated remarkable market traction, accumulating 10 million downloads in the seven days since its public beta release – a velocity that exceeds the early adoption rates of ChatGPT, Sora, and DeepSeek. The application's rapid uptake reflects a shift in how technology giants are approaching AI commercialisation. While international competitors like OpenAI and Anthropic have built their businesses around subscription models, Alibaba's free-access approach challenges this framework by integrating AI capabilities directly into existing consumer and enterprise ecosystems. According to the South China Morning Post, the Qwen app serves as 'a comprehensive AI tool designed to meet user needs in both professional and personal contexts,' rather than being portrayed as a chatbot. Available on Apple's App Store and Google Play since mid-November, the application integrates with Alibaba's e-commerce platforms, mapping services, and local business tools – demonstrating what industry analysts term 'agentic AI' capabilities that can execute cross-scenario tasks in addition to generating content.",
        "body_ar": "أظهر تطبيق Qwen AI الذي أطلقته شركة علي بابا مؤخرًا جاذبية سوقية ملحوظة، حيث جمع 10 ملايين عملية تنزيل خلال الأيام السبعة منذ إصداره التجريبي العام - وهي سرعة تتجاوز معدلات التبني المبكر لـ ChatGPT وSora وDeepSeek. يعكس الإقبال السريع على التطبيق تحولًا في كيفية تعامل عمالقة التكنولوجيا مع تسويق الذكاء الاصطناعي. في حين أن المنافسين الدوليين مثل OpenAI وAnthropic قد بنوا أعمالهم حول نماذج الاشتراك، فإن نهج الوصول المجاني لشركة علي بابا يتحدى هذا الإطار من خلال دمج قدرات الذكاء الاصطناعي مباشرة في النظم البيئية الحالية للمستهلكين والمؤسسات. وفقًا لصحيفة South China Morning Post، يعمل تطبيق Qwen كـ 'أداة ذكاء اصطناعي شاملة مصممة لتلبية احتياجات المستخدم في السياقات المهنية والشخصية'، بدلاً من تصويره على أنه روبوت محادثة. يتوفر التطبيق على متجر تطبيقات Apple وGoogle Play منذ منتصف نوفمبر، ويتكامل مع منصات التجارة الإلكترونية وخدمات الخرائط وأدوات الأعمال المحلية الخاصة بشركة علي بابا - مما يوضح ما يطلق عليه محللو الصناعة قدرات 'الذكاء الاصطناعي الوكيل' التي يمكنها تنفيذ مهام عبر السيناريوهات بالإضافة إلى إنشاء المحتوى."
    }
];

aboutContent = {
    "en": "\n    <h2>About FutureGEN</h2>\n    <p>FutureGEN is a comprehensive platform dedicated to showcasing the latest advancements in Artificial Intelligence tools and technologies. Our mission is to bridge the gap between cutting-edge AI innovations and users worldwide, providing a curated collection of the most powerful and practical AI solutions available today.</p>\n\n    <h3>Our Vision</h3>\n    <p>We envision a world where AI empowers everyone to achieve more, create faster, and innovate without boundaries. FutureGEN serves as your gateway to this future, offering:</p>\n    <ul>\n      <li><strong>Comprehensive Tool Directory:</strong> Thousands of AI tools across all categories</li>\n      <li><strong>Multilingual Support:</strong> Full Arabic and English interface</li>\n      <li><strong>User-Friendly Experience:</strong> Intuitive navigation and powerful search</li>\n      <li><strong>Regular Updates:</strong> Constantly updated with the latest AI developments</li>\n    </ul>\n\n    <h3>Why Choose FutureGEN?</h3>\n    <ul>\n      <li><strong>Quality Curation:</strong> Every tool is carefully reviewed and verified</li>\n      <li><strong>Community Driven:</strong> User favorites and ratings to guide your choices</li>\n      <li><strong>Educational Content:</strong> Blog posts and insights about AI trends</li>\n      <li><strong>Open Access:</strong> Free to use with premium features for power users</li>\n    </ul>\n\n    <p>Join thousands of users who trust FutureGEN to discover their next favorite AI tool. Whether you're a developer, designer, marketer, or just curious about AI, FutureGEN has something for everyone.</p>\n  ",
    "ar": "\n    <h2>حول FutureGEN</h2>\n    <p>FutureGEN هو منصة شاملة مخصصة لعرض أحدث التطورات في أدوات وتقنيات الذكاء الاصطناعي. مهمتنا هي سد الفجوة بين الابتكارات المتطورة في الذكاء الاصطناعي والمستخدمين في جميع أنحاء العالم، وتوفير مجموعة مختارة من أقوى وحلول الذكاء الاصطناعي العملية المتاحة اليوم.</p>\n\n    <h3>رؤيتنا</h3>\n    <p>نحن نتخيل عالمًا يمكّن فيه الذكاء الاصطناعي الجميع من تحقيق المزيد، والإبداع بشكل أسرع، والابتكار دون حدود. يعمل FutureGEN كبوابتك لهذا المستقبل، ويقدم:</p>\n    <ul>\n      <li><strong>دليل أدوات شامل:</strong> آلاف الأدوات الذكية عبر جميع الفئات</li>\n      <li><strong>دعم متعدد اللغات:</strong> واجهة كاملة بالعربية والإنجليزية</li>\n      <li><strong>تجربة سهلة الاستخدام:</strong> تصفح بديهي وبحث قوي</li>\n      <li><strong>تحديثات منتظمة:</strong> تحديث مستمر بأحدث التطورات في الذكاء الاصطناعي</li>\n    </ul>\n\n    <h3>لماذا تختار FutureGEN؟</h3>\n    <ul>\n      <li><strong>اختيار الجودة:</strong> كل أداة تمت مراجعتها بعناية والتحقق منها</li>\n      <li><strong>مدفوع بالمجتمع:</strong> المفضلة للمستخدمين والتقييمات لتوجيه اختياراتك</li>\n      <li><strong>محتوى تعليمي:</strong> مقالات المدونة ورؤى حول اتجاهات الذكاء الاصطناعي</li>\n      <li><strong>وصول مفتوح:</strong> مجاني للاستخدام مع ميزات مميزة للمستخدمين المتقدمين</li>\n    </ul>\n\n    <p>انضم إلى آلاف المستخدمين الذين يثقون بـ FutureGEN لاكتشاف أداة الذكاء الاصطناعي المفضلة التالية لديهم. سواء كنت مطورًا أو مصممًا أو مسوقًا أو مجرد فضولي حول الذكاء الاصطناعي، فإن FutureGEN لديه شيء للجميع.</p>\n  "
};

contactContent = {
    "en": "\n    <h2>Contact Us</h2>\n    <p>We'd love to hear from you! Whether you have questions about our platform, suggestions for new features, or partnership opportunities, our team is here to help.</p>\n\n    <div class=\"contact-info\">\n      <h3>Get In Touch</h3>\n      <p><strong>Email:</strong> contact@futuregen.ai</p>\n      <p><strong>Support:</strong> support@futuregen.ai</p>\n      <p><strong>Business Inquiries:</strong> business@futuregen.ai</p>\n\n      <h3>Follow Us</h3>\n      <p>Stay updated with the latest AI tools and trends:</p>\n      <ul>\n        <li><a href=\"#\" target=\"_blank\">Twitter/X</a></li>\n        <li><a href=\"#\" target=\"_blank\">LinkedIn</a></li>\n        <li><a href=\"#\" target=\"_blank\">Discord Community</a></li>\n      </ul>\n    </div>\n\n    <h3>Feedback & Support</h3>\n    <p>Your feedback helps us improve FutureGEN. If you encounter any issues or have suggestions, please don't hesitate to reach out. We typically respond within 24 hours.</p>\n\n    <h3>Partnerships</h3>\n    <p>Are you an AI tool developer or company? We'd love to partner with you to showcase your innovations on FutureGEN. Contact our business team to discuss collaboration opportunities.</p>\n  ",
    "ar": "\n    <h2>اتصل بنا</h2>\n    <p>نود أن نسمع منك! سواء كان لديك أسئلة حول منصتنا، أو اقتراحات لميزات جديدة، أو فرص شراكة، فريقنا هنا للمساعدة.</p>\n\n    <div class=\"contact-info\">\n      <h3>تواصل معنا</h3>\n      <p><strong>البريد الإلكتروني:</strong> contact@futuregen.ai</p>\n      <p><strong>الدعم:</strong> support@futuregen.ai</p>\n      <p><strong>الاستفسارات التجارية:</strong> business@futuregen.ai</p>\n\n      <h3>تابعنا</h3>\n      <p>ابق على اطلاع بأحدث أدوات الذكاء الاصطناعي والاتجاهات:</p>\n      <ul>\n        <li><a href=\"#\" target=\"_blank\">تويتر/X</a></li>\n        <li><a href=\"#\" target=\"_blank\">لينكد إن</a></li>\n        <li><a href=\"#\" target=\"_blank\">مجتمع ديسكورد</a></li>\n      </ul>\n    </div>\n\n    <h3>الملاحظات والدعم</h3>\n    <p>ملاحظاتك تساعدنا في تحسين FutureGEN. إذا واجهت أي مشاكل أو لديك اقتراحات، فلا تتردد في التواصل. نحن عادةً نرد خلال 24 ساعة.</p>\n\n    <h3>الشراكات</h3>\n    <p>هل أنت مطور أدوات ذكاء اصطناعي أو شركة؟ نود الشراكة معك لعرض ابتكاراتك على FutureGEN. اتصل بفريقنا التجاري لمناقشة فرص التعاون.</p>\n  "
};
// =================================================================================
// GLOBAL VARIABLES
// =================================================================================

let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
let currentLang = 'en';
let currentPage = 'home';

// =================================================================================
// PAGE MANAGEMENT SYSTEM
// =================================================================================

function showPage(pageId) {
    console.log('🔄 Showing page:', pageId);

    // إخفاء جميع الصفحات أولاً
    const pages = ['home-page', 'tool-details-page', 'blog-post-page', 'about-page', 'contact-page', 'news-page'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (element) {
            element.style.display = 'none';
        }
    });

    // إظهار الصفحة المطلوبة فقط
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        currentPage = pageId;
    }

    // التمرير للأعلى
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    switch (currentPage) {
        case 'tool-details-page':
        case 'blog-post-page':
        case 'about-page':
        case 'contact-page':
            showPage('home-page');
            break;
        default:
            showPage('home-page');
    }
}

// =================================================================================
// ENHANCED SEARCH SYSTEM
// =================================================================================

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        showToast(
            currentLang === 'en' ? 'Please enter a search term' : 'يرجى إدخال مصطلح البحث',
            'warning'
        );
        return;
    }

    // البحث في جميع الأدوات
    const filteredTools = aiTools.filter(tool => {
        const searchFields = [
            tool.name.toLowerCase(),
            tool.description.toLowerCase(),
            tool.category.toLowerCase(),
            ...(tool.tags ? tool.tags.map(tag => tag.toLowerCase()) : [])
        ];

        if (tool.description_ar) {
            searchFields.push(tool.description_ar.toLowerCase());
        }

        return searchFields.some(field => field.includes(searchTerm));
    });

    // عرض النتائج
    displaySearchResults(filteredTools, searchTerm);
}

function displaySearchResults(tools, searchTerm) {
    if (tools.length === 0) {
        showToast(
            currentLang === 'en' ? 'No tools found matching your search' : 'لم يتم العثور على أدوات تطابق بحثك',
            'info'
        );
        return;
    }

    // الانتقال للصفحة الرئيسية أولاً
    showPage('home-page');

    const toolsContainer = document.getElementById('featured-tools-container');
    const isArabic = currentLang === 'ar';

    toolsContainer.innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h3 class="mb-0">
                            ${isArabic ? 'نتائج البحث' : 'Search Results'} 
                            - "${searchTerm}" 
                            (${tools.length} ${isArabic ? 'نتيجة' : 'results'})
                        </h3>
                        <button id="clearSearchBtn" class="btn btn-outline-secondary">
                            <i class="fas fa-times me-2"></i>
                            ${isArabic ? 'مسح البحث' : 'Clear Search'}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row g-4">
                ${tools.map((tool, index) => {
        const toolIndex = aiTools.findIndex(t => t.name === tool.name);
        const description = isArabic ? (tool.description_ar || tool.description) : tool.description;
        const visitText = isArabic ? 'زيارة الموقع' : 'Visit Site';
        const detailsText = isArabic ? 'التفاصيل' : 'Details';

        return `
                        <div class="col-xl-3 col-lg-4 col-md-6">
                            <div class="card tool-card h-100">
                                <div class="card-img-top position-relative" style="height: 160px; overflow: hidden; background: linear-gradient(135deg, #401F71, #BE7B72);">
                                    <img src="${tool.logo}" alt="${tool.name}" 
                                         class="w-100 h-100 object-fit-contain p-3" 
                                         style="object-fit: contain; background: white;"
                                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvZ28gTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='">
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
                                                ${visitText}
                                            </a>
                                            <button class="btn btn-outline-primary btn-sm view-details-btn" data-tool-id="${toolIndex}">
                                                ${detailsText}
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
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function () {
            searchInput.value = '';
            showPage('home-page');
            renderTools();
        });
    }

    // إضافة event listeners للأزرار التفاعلية
    setTimeout(() => {
        // أزرار التفاصيل
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const toolId = parseInt(this.dataset.toolId);
                showToolDetails(toolId);
            });
        });

        // أزرار المفضلة
        document.querySelectorAll('.favorite-toggle').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const toolId = parseInt(this.dataset.toolId);
                toggleFavorite(toolId, this);
            });
            // تحديث حالة الزر
            const toolId = parseInt(btn.dataset.toolId);
            updateFavoriteButtonState(btn, toolId);
        });
    }, 100);
}

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

        // إضافة event listener للتصنيفات
        categoryCard.addEventListener('click', function () {
            const categoryName = this.getAttribute('data-category');
            filterToolsByCategory(categoryName);
        });

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
// FILTER AND CATEGORY FUNCTIONS
// =================================================================================

function filterToolsByCategory(categoryName) {
    console.log('🔍 Filtering tools by category:', categoryName);

    const filteredTools = aiTools.filter(tool =>
        tool.category === categoryName
    );

    console.log(`📊 Found ${filteredTools.length} tools in category: ${categoryName}`);

    if (filteredTools.length === 0) {
        showToast(
            currentLang === 'en'
                ? `No tools found in category: ${categoryName}`
                : `لم يتم العثور على أدوات في الفئة: ${categoryName}`,
            'info'
        );
        return;
    }

    // الانتقال للصفحة الرئيسية أولاً
    showPage('home-page');

    const toolsContainer = document.getElementById('featured-tools-container');
    const isArabic = currentLang === 'ar';

    toolsContainer.innerHTML = `
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-4">${isArabic ? 'الفئة:' : 'Category:'} ${categoryName} (${filteredTools.length} ${isArabic ? 'أداة' : 'tools'})</h3>
                    <button id="backToAllToolsBtn" class="btn btn-outline-secondary mb-3">
                        <i class="fas fa-arrow-left me-2"></i>${isArabic ? 'العودة لجميع الأدوات' : 'Back to All Tools'}
                    </button>
                </div>
            </div>
            <div class="row g-4">
                ${filteredTools.map((tool, index) => {
        const toolIndex = aiTools.findIndex(t => t.name === tool.name);
        const description = isArabic ? (tool.description_ar || tool.description) : tool.description;
        const visitText = isArabic ? 'زيارة الموقع' : 'Visit Site';
        const detailsText = isArabic ? 'التفاصيل' : 'Details';

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
                                                ${visitText}
                                            </a>
                                            <button class="btn btn-outline-primary btn-sm view-details-btn" data-tool-id="${toolIndex}">
                                                ${detailsText}
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
    const backToAllToolsBtn = document.getElementById('backToAllToolsBtn');
    if (backToAllToolsBtn) {
        backToAllToolsBtn.addEventListener('click', function () {
            showPage('home-page');
            renderTools();
        });
    }

    // إضافة event listeners للأزرار التفاعلية
    setTimeout(() => {
        // أزرار التفاصيل
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const toolId = parseInt(this.dataset.toolId);
                showToolDetails(toolId);
            });
        });

        // أزرار المفضلة
        document.querySelectorAll('.favorite-toggle').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const toolId = parseInt(this.dataset.toolId);
                toggleFavorite(toolId, this);
            });
            // تحديث حالة الزر
            const toolId = parseInt(btn.dataset.toolId);
            updateFavoriteButtonState(btn, toolId);
        });
    }, 100);
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

// =================================================================================
// DETAIL PAGES FUNCTIONS
// =================================================================================

function showToolDetails(toolId) {
    const tool = aiTools[toolId];
    if (!tool) return;

    console.log('🔍 Showing details for:', tool.name);

    showPage('tool-details-page');

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

    showPage('blog-post-page');
}

// إضافة event listener للزر الرجوع من صفحة المقال
document.addEventListener('DOMContentLoaded', function () {
    // استخدم event delegation للزر الرجوع
    document.body.addEventListener('click', function (e) {
        if (e.target && (e.target.id === 'back-to-home-from-blog' ||
            e.target.closest('#back-to-home-from-blog'))) {
            showPage('news-page');
        }
    });

    // أو أضف listener مباشرة إذا كان العنصر موجوداً
    const backButton = document.getElementById('back-to-home-from-blog');
    if (backButton) {
        backButton.addEventListener('click', function () {
            showPage('news-page');
        });
    }
});

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

    const favoritesModal = new bootstrap.Modal(document.getElementById('favoritesModal'));
    favoritesModal.show();

    document.getElementById('favoritesModal').addEventListener('shown.bs.modal', function () {
        document.querySelectorAll('#favoritesListContainer .view-details-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const toolId = parseInt(this.dataset.toolId);
                favoritesModal.hide();
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
// USER MANAGEMENT FUNCTIONS - إصلاح
// =================================================================================


// ================ Improved AUTH (login/signup) handling ===================
// Ensures single event listeners, prevents modal stacking, resets forms and alerts,
// and makes authButton robust (acts as Login or Logout depending on state).

let authModalEl = document.getElementById('authModal');
let authModalInstance = null;

function initAuth() {
    // Create a single Bootstrap modal instance (or reuse existing)
    try {
        authModalInstance = bootstrap.Modal.getOrCreateInstance(authModalEl, { backdrop: 'static', keyboard: false });
    } catch (err) {
        console.warn('Bootstrap modal init failed:', err);
    }

    // Safe element references
    const authButton = document.getElementById('authButton');
    const favoritesBtn = document.getElementById('favoritesBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginError = document.getElementById('loginError');
    const signupError = document.getElementById('signupError');
    const signupSuccess = document.getElementById('signupSuccess');

    // Helper to clear alerts inside modal
    function clearAuthAlerts() {
        if (loginError) { loginError.style.display = 'none'; loginError.textContent = ''; }
        if (signupError) { signupError.style.display = 'none'; signupError.textContent = ''; }
        if (signupSuccess) { signupSuccess.style.display = 'none'; signupSuccess.textContent = ''; }
    }

    // Ensure single listeners by using dataset flags
    if (authButton && !authButton.dataset.inited) {
        authButton.dataset.inited = '1';
        authButton.addEventListener('click', function () {
            const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (userData && userData.isLoggedIn) {
                // act as logout
                handleLogout();
            } else {
                // show login/signup modal
                clearAuthAlerts();
                if (authModalInstance) authModalInstance.show();
                // make login tab primary
                const loginTab = document.getElementById('login-tab');
                const signupTab = document.getElementById('signup-tab');
                if (loginTab) loginTab.click();
            }
        });
    }

    if (favoritesBtn && !favoritesBtn.dataset.inited) {
        favoritesBtn.dataset.inited = '1';
        favoritesBtn.addEventListener('click', showFavorites);
    }

    // Attach submit handlers once
    if (loginForm && !loginForm.dataset.inited) {
        loginForm.dataset.inited = '1';
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm && !signupForm.dataset.inited) {
        signupForm.dataset.inited = '1';
        signupForm.addEventListener('submit', handleSignup);
    }

    // when modal hides, reset forms and alerts
    if (authModalEl) {
        authModalEl.addEventListener('hidden.bs.modal', function () {
            if (loginForm) loginForm.reset();
            if (signupForm) signupForm.reset();
            clearAuthAlerts();
            // re-enable buttons if disabled
            const submitButtons = authModalEl.querySelectorAll('button[type="submit"]');
            submitButtons.forEach(b => b.disabled = false);
        });
    }

    // initialize interface based on stored user
    updateUserInterface();
}

function handleLogin(e) {
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
        showAlert(currentLang === 'en' ? 'Please fill in all fields' : 'يرجى ملء جميع الحقول', 'error', 'loginError');
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert(currentLang === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صالح', 'error', 'loginError');
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

    showAlert(currentLang === 'en' ? 'Login successful!' : 'تم تسجيل الدخول بنجاح!', 'success', 'loginError');

    setTimeout(() => {
        if (authModalInstance) authModalInstance.hide();
        updateUserInterface();
    }, 700);
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName') && document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail') && document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword') && document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword') && document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        showAlert(currentLang === 'en' ? 'Please fill in all fields' : 'يرجى ملء جميع الحقول', 'error', 'signupError');
        return;
    }

    if (password !== confirmPassword) {
        showAlert(currentLang === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة', 'error', 'signupError');
        return;
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert(currentLang === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صالح', 'error', 'signupError');
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

    showAlert(currentLang === 'en' ? 'Account created successfully!' : 'تم إنشاء الحساب بنجاح!', 'success', 'signupSuccess');

    setTimeout(() => {
        if (authModalInstance) authModalInstance.hide();
        updateUserInterface();
    }, 700);
}

function handleLogout() {
    // Clear stored user data (both local and session)
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser_session');
    updateUserInterface();
    showToast(currentLang === 'en' ? 'Logged out successfully' : 'تم تسجيل الخروج بنجاح', 'success');
}

// Initialize auth on DOM ready (call from global init)
document.addEventListener('DOMContentLoaded', function () {
    try {
        initAuth();
    } catch (err) {
        console.error('initAuth error', err);
    }
});


// محاكاة إنشاء حساب ناجح
const user = {
    isLoggedIn: true,
    loginTime: new Date().toISOString()
};

localStorage.setItem('currentUser', JSON.stringify(user));

showAlert(currentLang === 'en' ? 'Account created successfully!' : 'تم إنشاء الحساب بنجاح!', 'success', 'signupSuccess');

setTimeout(() => {
    const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
    if (authModal) authModal.hide();
    updateUserInterface();
    document.getElementById('signupForm').reset();
}, 1500);

function updateUserInterface() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const authButton = document.getElementById('authButton');
    const favoritesBtn = document.getElementById('favoritesBtn');

    if (userData && userData.isLoggedIn) {
        // تحديث زر تسجيل الدخول/الخروج
        if (authButton) {
            authButton.innerHTML = '<i class="fas fa-sign-out-alt me-2"></i>' + (currentLang === 'en' ? 'Logout' : 'تسجيل الخروج');
            authButton.onclick = handleLogout;
        }

        // إظهار زر المفضلة
        if (favoritesBtn) {
            favoritesBtn.style.display = 'inline-block';
            favoritesBtn.innerHTML = '<i class="fas fa-heart me-2"></i>' + (currentLang === 'en' ? 'Favorites' : 'المفضلة');
            favoritesBtn.onclick = showFavorites;
        }

        updateAllFavoriteButtons();
    } else {
        // تحديث زر تسجيل الدخول
        if (authButton) {
            authButton.innerHTML = '<i class="fas fa-user me-2"></i>' + (currentLang === 'en' ? 'Login' : 'تسجيل الدخول');
            authButton.onclick = function () {
                const authModal = new bootstrap.Modal(document.getElementById('authModal'));
                authModal.show();
            };
        }

        // إخفاء زر المفضلة
        if (favoritesBtn) {
            favoritesBtn.style.display = 'none';
        }
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
// STATIC PAGES FUNCTIONS
// =================================================================================

function showAboutPage() {
    console.log('🔄 Showing About Page');
    showPage('about-page');
}

function showContactPage() {
    console.log('🔄 Showing Contact Page');
    showPage('contact-page');
    setupContactForm();
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
// EVENT LISTENERS SETUP - إصلاح
// =================================================================================

function setupEventListeners() {
    console.log('Setting up event listeners...');

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log('Theme toggle button found');
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        console.log('Language toggle button found');
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Search functionality
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

    // Back buttons
    const backButtons = [
        'back-to-home',
        'back-to-home-from-blog',
        'back-to-home-from-about',
        'back-to-home-from-contact'
    ];

    backButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.onclick = goBack;
        }
    });

    // Navigation links
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

    const newsLink = document.getElementById('news-link');
    if (newsLink) {
        newsLink.addEventListener('click', function (e) {
            e.preventDefault();
            showNewsPage();
        });
    }

    // Auth forms - إصلاح
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Hero buttons
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

    // Donation buttons
    document.querySelectorAll(".donate-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const amount = this.dataset.amount;
            window.open(`https://www.paypal.me/NasserOgaili/${amount}`, "_blank");
        });
    });

    document.getElementById("customAmount")?.addEventListener("change", function () {
        const amount = this.value;
        if (amount && amount > 0) {
            window.open(`https://www.paypal.me/NasserOgaili/${amount}`, "_blank");
        }
    });

    updateUserInterface();
}

const backToHomeBtn = document.getElementById('back-to-home-from-news');
if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', function () {
        // أخفي صفحة الأخبار
        const newsPage = document.getElementById('news-page');
        if (newsPage) newsPage.style.display = 'none';

        // أظهر الصفحة الرئيسية
        const homePage = document.getElementById('home-page');
        if (homePage) homePage.style.display = 'block';
    });
}

function showNewsPage() {
    // أخفي الصفحة الرئيسية
    const homePage = document.getElementById('home-page');
    if (homePage) {
        homePage.style.display = 'none';
    }

    // أظهر صفحة الأخبار
    const newsPage = document.getElementById('news-page');
    if (newsPage) {
        newsPage.style.display = 'block';
    }
}



// نضع listener على الحاوية كلها
document.getElementById('blog-posts-container').addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('read-more')) {
        // نأخذ أقرب card-body
        const cardBody = e.target.closest('.card-body');
        const title = cardBody.querySelector('.card-title').textContent;
        const summary = cardBody.querySelector('.card-text').textContent;
        const img = cardBody.closest('.card').querySelector('img').src;

        // تعرض المقال - مثال بسيط
        showFullArticle(title, summary, img);
    }
});

function showFullArticle(title, summary, img) {
    alert(title + "\n\n" + summary + "\n\n" + img);
}


// إضافة event listeners للأزرار التفاعلية
function setupToolEventListeners() {
    // أزرار التفاصيل في البطاقات
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('view-details-btn') ||
            e.target.closest('.view-details-btn')) {
            const button = e.target.classList.contains('view-details-btn') ?
                e.target : e.target.closest('.view-details-btn');

            if (button && button.dataset.toolId) {
                const toolId = parseInt(button.dataset.toolId);
                console.log('🔍 View details button clicked for tool ID:', toolId);
                showToolDetails(toolId);
            }
        }
    });

    // أزرار المفضلة
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('favorite-toggle') ||
            e.target.closest('.favorite-toggle')) {
            const button = e.target.classList.contains('favorite-toggle') ?
                e.target : e.target.closest('.favorite-toggle');

            if (button && button.dataset.toolId) {
                e.preventDefault();
                e.stopPropagation();
                const toolId = parseInt(button.dataset.toolId);
                console.log('❤️ Favorite button clicked for tool ID:', toolId);
                toggleFavorite(toolId, button);
            }
        }
    });
}



// دالة مساعدة للصور المفقودة
function handleImageError(img) {
    img.onerror = null;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvZ28gTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
}

// =================================================================================
// INITIALIZATION - إصلاح
// =================================================================================

async function initializeApp() {
    console.log('🚀 Initializing app...');

    // تهيئة البيانات
    favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLang = localStorage.getItem("lang") || "en";

    console.log('🎨 Saved theme:', savedTheme);
    console.log('🌐 Saved language:', savedLang);

    // تطبيق الإعدادات
    applyTheme(savedTheme);
    applyLanguage(savedLang);

    // تحميل المحتوى
    renderTools();
    renderCategories();
    renderBlogPosts();

    // إعداد event listeners
    setupEventListeners();
    setupToolEventListeners();

    // تشغيل الرسوم المتحركة
    startAnimations();

    // التحقق من حالة تسجيل الدخول
    checkLoginStatus();

    console.log('✅ App initialized successfully');
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('📄 DOM Content Loaded - Starting initialization');
    initializeApp();
});

// Improved navbar link behavior
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    let activeLink = null;
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            activeLink = this;
        });
        link.addEventListener('mouseenter', function () {
            if (activeLink && activeLink !== this) {
                activeLink.classList.remove('active');
            }
        });
        link.addEventListener('mouseleave', function () {
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