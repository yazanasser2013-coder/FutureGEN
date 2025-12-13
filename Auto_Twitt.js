const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs-extra');
const fetch = require('node-fetch');

// ملف لتخزين الأخبار المنشورة مسبقًا
const postedFile = './posted.json';
let posted = [];
if (fs.existsSync(postedFile)) {
    posted = fs.readJsonSync(postedFile);
}

const blogPosts = [{
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
    "link": "",
    "body_en": "Alibaba's recently launched Qwen AI app has demonstrated remarkable market traction, accumulating 10 million downloads in the seven days since its public beta release – a velocity that exceeds the early adoption rates of ChatGPT, Sora, and DeepSeek. The application's rapid uptake reflects a shift in how technology giants are approaching AI commercialisation. While international competitors like OpenAI and Anthropic have built their businesses around subscription models, Alibaba's free-access approach challenges this framework by integrating AI capabilities directly into existing consumer and enterprise ecosystems. According to the South China Morning Post, the Qwen app serves as 'a comprehensive AI tool designed to meet user needs in both professional and personal contexts,' rather than being portrayed as a chatbot. Available on Apple's App Store and Google Play since mid-November, the application integrates with Alibaba's e-commerce platforms, mapping services, and local business tools – demonstrating what industry analysts term 'agentic AI' capabilities that can execute cross-scenario tasks in addition to generating content.",
    "body_ar": "أظهر تطبيق Qwen AI الذي أطلقته شركة علي بابا مؤخرًا جاذبية سوقية ملحوظة، حيث جمع 10 ملايين عملية تنزيل خلال الأيام السبعة منذ إصداره التجريبي العام - وهي سرعة تتجاوز معدلات التبني المبكر لـ ChatGPT وSora وDeepSeek. يعكس الإقبال السريع على التطبيق تحولًا في كيفية تعامل عمالقة التكنولوجيا مع تسويق الذكاء الاصطناعي. في حين أن المنافسين الدوليين مثل OpenAI وAnthropic قد بنوا أعمالهم حول نماذج الاشتراك، فإن نهج الوصول المجاني لشركة علي بابا يتحدى هذا الإطار من خلال دمج قدرات الذكاء الاصطناعي مباشرة في النظم البيئية الحالية للمستهلكين والمؤسسات. وفقًا لصحيفة South China Morning Post، يعمل تطبيق Qwen كـ 'أداة ذكاء اصطناعي شاملة مصممة لتلبية احتياجات المستخدم في السياقات المهنية والشخصية'، بدلاً من تصويره على أنه روبوت محادثة. يتوفر التطبيق على متجر تطبيقات Apple وGoogle Play منذ منتصف نوفمبر، ويتكامل مع منصات التجارة الإلكترونية وخدمات الخرائط وأدوات الأعمال المحلية الخاصة بشركة علي بابا - مما يوضح ما يطلق عليه محللو الصناعة قدرات 'الذكاء الاصطناعي الوكيل' التي يمكنها تنفيذ مهام عبر السيناريوهات بالإضافة إلى إنشاء المحتوى."
}];

// إعداد تويتر API - استبدل بالمفاتيح الصحيحة
const client = new TwitterApi({
    appKey: 'gx1RtJP3IEhgX498CuptxRWj6',
    appSecret: 'IoqA9KBEO1krj4s1UtY7A7eD2juoIokRv82wvrMOnAgLmyEphM',
    accessToken: '1975948202672054272-zEe1AXcj4DFEsF7eOEVhPU2KJTPaER',
    accessSecret: 'z4LyHl9cH61c41GhLOfL0hWkm66o4z2w4P3mjCsMYRhQr',
});

// دالة للتحقق من صحة المفاتيح
async function verifyCredentials() {
    try {
        const user = await client.v2.me();
        console.log('✅ المصادقة ناجحة مع حساب:', user.data.username);
        return true;
    } catch (err) {
        console.error('❌ فشل المصادقة:', err.message);
        return false;
    }
}

// رفع الصور ونشر التغريدات
async function postTweet(post) {
    try {
        console.log(`🔄 محاولة نشر: ${post.title_en}`);
        
        // نص التغريدة الإنجليزية
        const tweetText = `${post.title_en}\n\n${post.summary_en}${post.link ? '\n\n' + post.link : ''}\n\n#AI #ArtificialIntelligence #TechNews`;
        
        // نص التغريدة العربية
        const tweetTextAr = `${post.title_ar}\n\n${post.summary_ar}${post.link ? '\n\n' + post.link : ''}\n\n#الذكاء_الاصطناعي #تقنية #أخبار_التقنية`;

        let mediaId = null;
        if (post.image) {
            try {
                console.log(`📸 تحميل الصورة: ${post.image}`);
                const imageResponse = await fetch(post.image);
                if (!imageResponse.ok) {
                    throw new Error(`فشل تحميل الصورة: ${imageResponse.status}`);
                }
                const imageBuffer = await imageResponse.arrayBuffer();
                mediaId = await client.v1.uploadMedia(Buffer.from(imageBuffer), { 
                    mimeType: 'image/jpeg' 
                });
                console.log(`✅ تم رفع الصورة: ${mediaId}`);
            } catch (imageError) {
                console.error('❌ خطأ في تحميل الصورة:', imageError.message);
            }
        }

        // نشر التغريدة الإنجليزية أولاً
        console.log('📤 نشر التغريدة الإنجليزية...');
        const tweetEn = await client.v2.tweet({
            text: tweetText,
            media: mediaId ? { media_ids: [mediaId] } : undefined,
        });
        console.log('✅ تم نشر التغريدة الإنجليزية:', tweetEn.data.id);

        // انتظر 3 ثوانٍ بين التغريدات
        await new Promise(resolve => setTimeout(resolve, 3000));

        // نشر التغريدة العربية
        console.log('📤 نشر التغريدة العربية...');
        const tweetAr = await client.v2.tweet({
            text: tweetTextAr,
            media: mediaId ? { media_ids: [mediaId] } : undefined,
        });
        console.log('✅ تم نشر التغريدة العربية:', tweetAr.data.id);

        // حفظ الأخبار المنشورة
        posted.push(post.title_en);
        fs.writeJsonSync(postedFile, posted);

        console.log('🎉 تم نشر الخبر بنجاح باللغتين');
        
        // انتظر 10 ثوانٍ قبل الخبر التالي
        await new Promise(resolve => setTimeout(resolve, 10000));

    } catch (err) {
        console.error('❌ خطأ أثناء التغريد:', err);
        
        if (err.code === 403) {
            console.error('🔒 الخطأ 403: مشكلة في صلاحيات الحساب');
            console.error('✅ يرجى التأكد من:');
            console.error('   1. تطبيق Twitter لديه صلاحيات "Read & Write"');
            console.error('   2. مفاتيح API صحيحة ومحدثة');
            console.error('   3. حساب المطور نشط');
        } else if (err.code === 401) {
            console.error('🔑 الخطأ 401: مصادقة فاشلة - تحقق من مفاتيح API');
        } else if (err.code === 429) {
            console.error('⏰ الخطأ 429: تجاوز حد النشر - انتظر قليلاً');
        }
    }
}

// فحص الأخبار الجديدة ونشرها
async function checkAndTweet() {
    console.log('🚀 بدء فحص الأخبار الجديدة...');
    
    // التحقق من صحة المفاتيح أولاً
    const isAuthenticated = await verifyCredentials();
    if (!isAuthenticated) {
        console.error('❌ لا يمكن المتابعة بسبب فشل المصادقة');
        return;
    }
    
    let newPostsCount = 0;
    
    for (const post of blogPosts) {
        if (!posted.includes(post.title_en)) {
            console.log(`📝 وجد خبر جديد: ${post.title_en}`);
            await postTweet(post);
            newPostsCount++;
        } else {
            console.log(`⏭️ تم نشر سابقاً: ${post.title_en}`);
        }
    }
    
    if (newPostsCount === 0) {
        console.log('✅ لا توجد أخبار جديدة للنشر');
    } else {
        console.log(`🎉 تم نشر ${newPostsCount} خبر جديد`);
    }
}

// تشغيل العملية
checkAndTweet().catch(console.error);