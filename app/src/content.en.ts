/**
 * 全站英文文案，结构与 content.ts 一一对应（类型检查会提醒漏掉的字段）。
 * 改了中文版记得同步这里。
 */
import { siteContent, type MarkedSeg, type SiteContent } from './content'

export const siteContentEn: SiteContent = {
  meta: {
    title: 'Angelina Sun · Portfolio',
    description:
      'Portfolio of Angelina Sun (孙菲潞) — UCL MSc Management student with a BASc in Arts and Sciences. Working between data, AI and the stage: AI product growth, international growth from zero, AI agents, and musical theatre.',
    ogTitle: 'Angelina Sun · Portfolio | Data by day, Stage by night',
    ogDescription:
      'UCL MSc Management student with a BASc in Arts and Sciences. Working between data, AI and the stage: AI product growth, international growth from zero, AI agents, and musical theatre.',
    locale: 'en_GB',
  },

  identity: {
    name: 'Angelina Sun',
    nameEn: 'Angelina Sun',
    signature: 'Angelina Sun · 孙菲潞',
    email: 'feilusun0618@gmail.com',
    /** Gmail 网页「写邮件」直达链接，收件人已预填。经 Google 登录页中转：未登录的访客登录完仍会落到写信页 */
    emailHref:
      'https://accounts.google.com/ServiceLogin?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%3Fview%3Dcm%26fs%3D1%26to%3Dfeilusun0618%40gmail.com',
    // 英国号码加了 +44 就去掉开头的 0
    phone: '+44 7467 255001',
    phoneHref: 'tel:+447467255001',
    based: 'London · Shanghai · Suzhou',
    footerLine: '© 2026 · Written, staged & shipped by Angelina',
  },

  nav: [
    { key: 'home', label: 'Home', en: 'Home' },
    { key: 'about', label: 'About', en: 'About' },
    { key: 'education', label: 'Education', en: 'Education' },
    { key: 'experience', label: 'Experience', en: 'Experience' },
    { key: 'projects', label: 'Projects', en: 'Projects' },
    { key: 'skills', label: 'Skills', en: 'Skills' },
    { key: 'contact', label: 'Contact', en: 'Contact' },
  ],

  common: {
    pageLabel: 'Page',
    currentLabel: 'Now reading',
    sayHiLabel: 'Say hi',
    workAndCoop: 'Work & collaboration',
    emailLink: 'Drop me a line ↗',
    takeYourTime: 'plz Take Your Time ♨',
    skip: 'Skip ›',
    close: 'Close',
    prevPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    qrCaption: 'Scan with WeChat to try it',
    paperButton: 'Read the abstract',
    latestNote: 'Currently working on',
    offTheClock: 'Off the clock',
    casualShots: 'Solo Trip',
    tallPhotoHint: 'Long image · scroll to view',
    viewPhotoPrefix: 'View photo: ',
    viewNthPhoto: (title: string, n: number) => `View photo ${n} of ${title}`,
    qrAlt: (title: string) => `${title} mini-program QR code`,
    screenshotAlt: (n: number) => `Juriji screenshot ${n}`,
    photoAlt: (n: number) => `Performance photo ${n}`,
    nthDot: (n: number) => `Photo ${n}`,
    switchLang: '切换到中文',
    thanks: 'Thx',
    backHome: 'Back to home',
    play: 'Play',
    pause: 'Pause',
    openRecord: 'Open record player',
    closeRecord: 'Close record player',
    closePlayerPanel: 'Close record player',
  },

  home: {
    eyebrow: 'Home',
    signature: 'Angelina Sun · 孙菲潞',
    keywords: ['AI Product Growth', '0→1 International Growth', 'AI Agents', 'Musical Theatre'],
    titleLine1: 'Data by day,',
    titleHighlight: 'Stage by night',
    titleDot: '.',
    intro: [
      'I work on user growth at Cherry Studio, an open-source AI desktop client: I ran the v2.0 influencer launch that brought in 33K incremental users, started our international growth from zero, and built creator-discovery agents with MCP and Skills that work about 3.5× faster than doing it by hand.',
      'On the side, I designed, built and launched a WeChat Mini Program, Juriji, entirely on my own. Comfortable with SQL and Python for analysis, native in Mandarin, fluent in English, and used to working across borders.',
    ],
    primaryCta: 'Get to know me',
    emailCta: 'Drop me a line ↗',
    startHere: 'Start here',
    portraitAlt: 'Angelina Sun',
  },

  monologue: {
    lines: [
      [{ t: 'I like to take things apart:' }],
      [{ t: 'which step is losing users, which line makes a whole theatre fall silent —' }],
      [{ t: 'to me, it is ' }, { t: 'the same question', mark: 'gold' }, { t: '.' }],
      [{ t: 'By day I write prompts, clean data and watch conversions;' }],
      [{ t: 'by night I cue music, tune lights and wait for the audience to catch their breath.' }],
      [{ t: 'One has to be precise; the other has to be true.' }],
      [{ t: 'I want to ' }, { t: 'get both exactly right', mark: 'pop' }, { t: '.' }],
    ] as MarkedSeg[][],
  },

  about: {
    heading: {
      index: '02',
      en: 'About',
      titleLine1: 'Data and AI by day,',
      titleLine2Before: 'and by night, the ',
      titleHighlight: 'stage',
      titleLine2After: '.',
      lede: 'UCL BASc Arts and Sciences graduate, now studying for an MSc in Management.\nI work best in AI product and growth; after hours I do stage management and sound in the theatre.',
    },
    cards: [
      {
        num: '01',
        title: 'AI Product & Growth',
        desc: 'I have done it all hands-on — influencer campaigns, paid search, SEO and a content matrix: one launch with 31 creators brought in 33K incremental users, and our X account went from zero to about 1K followers in a month. I also build: I shipped a Mini Program with 200+ users using Claude Code, and built several agents with MCP and Skills that are actually in use.',
      },
      {
        num: '02',
        title: 'Data Analysis',
        desc: 'Fluent in Python, SQL and R, plus GA4 and Search Console. After each campaign I write the review myself — incremental attribution by baseline extrapolation, CPM / CPE by creator tier — and once caught about 400K suspected fake views. At Deloitte I identified about 30% redundant data and improved data accuracy by about 25%.',
      },
      {
        num: '03',
        title: 'Cross-cultural Communication',
        desc: 'Native Mandarin, fluent English, basic German, with experience in cross-border teams. In London I founded UCL’s first Chinese musical theatre society, bringing original Chinese-language work to an overseas stage.',
      },
    ],
    outroNote: 'The details are in Experience & Projects ⌯>ᴗo⌯ಣ ',
  },

  education: {
    heading: {
      index: '03',
      en: 'Education',
      titleLine1: 'At UCL, from arts and sciences',
      titleLine2Before: 'to ',
      titleHighlight: 'management',
      titleLine2After: '.',
      lede: 'A combination that puts social science, data methods and business training on the same timetable.',
    },
    items: [
      {
        period: '2026.09 — 2027.09',
        credential: 'Taught Master’s',
        degree: 'MSc Management',
        school: 'University College London',
        note: 'In progress',
        detail: 'AI for Business, Business Statistics, Decision & Risk Analysis, Operations & Technology Management, Marketing',
      },
      {
        period: '2023.09 — 2026.06',
        credential: 'Bachelor of Arts and Sciences',
        degree: 'BASc Arts and Sciences: Societies',
        school: 'University College London',
        note: null,
        detail:
          'Upper Second-Class Honours (2:1), 69.3; dissertation on authorship in AI-generated art awarded a Distinction\nData Science & Visualisation, Quantitative Methods, Introduction to Programming, Econometrics, Advanced Mathematics, Knowledge Economy — Business Consulting',
      },
    ],
    photoAlt: 'Angelina Sun in front of the Wilkins Building, UCL',
    photoKicker: 'Wilkins Building · Gower Street',
    photoNote: 'UCL 200',
  },

  experience: {
    heading: {
      index: '04',
      en: 'Experience',
      titleLine1: 'Four internships,',
      titleLine2Before: 'one ',
      titleHighlight: 'growth playbook',
      titleLine2After: '.',
      ledeLine1: 'Most recent first.',
      ledeLine2: 'Each one was a different job — and each left me a method I can reuse.',
    },
    jobs: [
      {
        period: '2026.06 — Present',
        company: 'Cherry Studio (Shanghai Qianhui Technology Co., Ltd.)',
        role: 'User Growth & Product Operations · open-source AI desktop client',
        tags: ['Influencer Marketing', 'Incremental Attribution', 'International Growth', 'SEO / SEM', 'AI Agents', 'Content Matrix'],
        points: [
          'Influencer marketing: ran the v2.0 launch, picking 31 creators (3 macro, 13 mid-tier, 15 micro) from a 200+ AI creator database I built, across Bilibili, Xiaohongshu, Douyin and WeChat Channels on a RMB 315K (~£33K) budget, and handled screening, negotiation and closing myself; daily new users rose 52% (5,760 → 8,754), adding 33K incremental users at ~RMB 9.6 CAC, with day-1 retention steady at 46% and first-time payers up 29%',
          'Campaign analytics: wrote the post-campaign review solo, using baseline extrapolation for incremental attribution and tiered CPM / CPE analysis; flagged ~400K suspected fake views, corrected the metrics and produced the rebook and cut lists for the next round',
          'International growth: launched the official X account from zero (~1K followers in a month, top post 4.5K views); as owner of the website SEO key result, diagnosed missing download tracking and soft-404 issues, shipped tracking, sitemap and IndexNow fixes in a pull request built with Claude Code, and rewrote 65 English doc titles by search volume',
          'Paid search: set up Baidu, 360 and Bing accounts with keyword grouping and creative optimisation (110K+ clicks); raised Baidu brand-keyword CTR from 31% to 60% and cut CPC from RMB 0.72 to 0.31 (−57%)',
          'AI agents: built creator-discovery agents for Bilibili, Douyin, WeChat Official Accounts and Channels, plus an article-layout agent, with MCP and Skills; screened 300+ qualified creators in 4 days (~75/day vs ~20/day by hand, 3.5×) — there is a clickable walkthrough below',
          'Content matrix: ran 5 platforms including WeChat, Xiaohongshu and Bilibili (48K followers combined) and planned topics and the v2.0 launch video; 85K+ reads and views across platforms in September, and 1.3K new Xiaohongshu followers in one month',
          'B2B conversion: collected leads before company livestreams and converted them afterwards, reaching a 6% paid conversion rate',
        ],
      },
      {
        period: '2025.06 — 2025.07',
        company: 'Deloitte Consulting (Shanghai) · Technology & Transformation',
        role: 'Consulting',
        tags: ['SQL', 'Python', 'MDM', 'Consulting'],
        points: [
          'Worked on a Master Data Management (MDM) project for a global pharmaceutical client, using SQL and Python to clean and analyse operational data and identifying about 30% redundant records',
          'Mapped the gaps between business and IT requirements and produced visual SOP flowcharts, improving data accuracy by about 25% and reducing errors by about 15%',
          'Turned complex system logic into documentation non-technical teams could follow, driving cross-department rollout',
        ],
      },
      {
        period: '2024.09 — 2024.12',
        company: 'SiliconFlow',
        role: 'Global User Growth',
        tags: ['Global Growth', 'SEO', 'Community'],
        points: [
          'Analysed audience search intent and wrote AI technical articles on models such as Flux and DeepSeek that were both SEO-friendly and technically sound; built an English content toolchain with Freepik AI for SEO cover images and Grammarly for editing',
          'Ran overseas communities on Discord and X, using Google Keyword Planner for search intent analysis to shape content; X posts averaged 3–4K views, steadily growing the brand’s international reach',
          'Tracked developments in LLMs, multimodal models and AI agents, and built a framework for judging model capabilities and commercial use cases',
        ],
      },
      {
        period: '2024.07 — 2024.08',
        company: 'PwC Zhong Tian LLP',
        role: 'Assurance Intern',
        tags: ['IPO Audit', 'Financial Verification'],
        points: [
          'Worked on the IPO audit of an e-commerce company, using VLOOKUP and other functions for financial data checks and sample testing to flag potential anomalies',
          'Mapped the company’s financial structure and business processes, deepening my understanding of operations and risk management',
        ],
      },
    ],

    agentDemo: {
      attachTo: 'Cherry Studio (Shanghai Qianhui Technology Co., Ltd.)',
      trigger: 'AI agent walkthrough',
      triggerHint: 'Click to run it',
      eyebrow: 'Agent Demo',
      title: 'Bilibili Creator Research Agent',
      subtitle: 'One call, from a keyword to a ready-to-pitch creator list',
      intro:
        'A simplified walkthrough of the Bilibili creator research agent I built on my own at Cherry Studio. I later reused the same logic for Douyin, WeChat Official Accounts and Channels, screening 300+ qualified creators in 4 days.',
      replay: 'Run it again',
      running: 'Running',
      stepsLabel: 'Steps',
      disclaimer: 'The flow and filtering logic come from the real project; all names and numbers on this page are anonymised demo data.',
      steps: [
        { num: '01', name: 'Input' },
        { num: '02', name: 'Load Skill' },
        { num: '03', name: 'Scrape' },
        { num: '04', name: 'Filter' },
        { num: '05', name: 'Dedupe' },
        { num: '06', name: 'Output' },
      ],
      input: {
        caption: 'The agent takes a keyword from the topic list and runs a search on Bilibili, just like a person would.',
        site: 'bilibili',
        tab: 'Creators',
        placeholder: 'Search creators / videos',
        keyword: 'AI Agent',
        button: 'Search',
        notes: ['Keywords come from a topic list and can be queued in bulk', 'Each round also runs close variants like “AI tools / local LLMs / prompts”'],
      },
      skill: {
        caption:
          'The screening criteria aren’t rewritten every time — they live in a reusable Skill. One sentence calls it up, and this SKILL.md drives the next four steps.',
        matched: 'Matched instruction · “Find me Bilibili creators who make AI agent content”',
        file: 'bilibili-kol-filter/SKILL.md',
        lines: [
          { k: '', t: '---', dim: true },
          { k: 'name: ', t: 'bilibili-kol-filter' },
          { k: 'description: ', t: 'Bilibili creator research: filter by followers, views and account type' },
          { k: '', t: '---', dim: true },
          { k: '## Tools  ', t: 'puppeteer-mcp drives a real Chrome, reusing the logged-in session' },
          { k: '## Rules  ', t: 'followers > 5000 / avg views of last 5 > 2000 / not a brand / active in 60 days' },
          { k: '## Dedupe  ', t: 'match against the creator database by mid, keep only new ones' },
          { k: '## Output  ', t: 'write to Feishu Base: name / mid / followers / avg views / niche' },
        ],
        status: 'Skill loaded — the next four steps follow it',
      },
      crawl: {
        caption: 'Puppeteer drives a real Chrome to Bilibili’s search page, scrolls through the results and parses each creator card.',
        url: 'search.bilibili.com/upuser?keyword=AI%20Agent',
        badge: 'Puppeteer · real Chrome session',
        notes: [
          'Reuses the local logged-in session to get past login walls and anti-bot pop-ups',
          'Pages through 3 result pages per keyword, scrolling to trigger lazy loading',
          'Parses name / mid / followers / bio / latest upload',
        ],
        result: '86 candidates collected this round',
      },
      filter: {
        caption: 'Four hard rules filter in turn. The thresholds live in SKILL.md, so changing one line swaps the whole standard.',
        hint: 'Open any rule to see the logic',
        cards: [
          {
            name: 'Followers > 5000',
            from: 86,
            to: 47,
            code: `// normalise "1.2万" on the card into a number
const fans = toNumber(card.fans)   // "1.2万" → 12000
if (fans < 5_000) return drop(up, 'too few followers')`,
          },
          {
            name: 'Avg views of last 5 videos > 2000',
            from: 47,
            to: 29,
            code: `const recent = (await fetchVideos(up.mid)).slice(0, 5)
const avg = mean(recent.map(v => toNumber(v.play)))
if (avg < 2_000) return drop(up, 'low recent views')`,
          },
          {
            name: 'Exclude brands / MCNs',
            from: 29,
            to: 24,
            code: `// official verification + bio keywords, checked together
const ORG = /官方|旗舰店|有限公司|MCN|工作室/
if (up.officialVerify?.type === 1 || ORG.test(up.sign))
  return drop(up, 'brand / organisation')`,
          },
          {
            name: 'Exclude inactive accounts',
            from: 24,
            to: 18,
            code: `const idle = (Date.now() - recent[0].pubdate * 1000) / 864e5
if (idle > 60) return drop(up, 'inactive for 60+ days')`,
          },
        ],
        summary: '86 candidates → 18 matches',
      },
      dedupe: {
        caption: 'Matches are compared by mid against the existing creator database in Feishu Base. Duplicates are struck out, leaving only this round’s genuinely new creators.',
        libraryLabel: 'Feishu creator DB',
        libraryBefore: '120',
        libraryAfter: '132',
        hitLabel: 'In DB',
        newLabel: 'New',
        summary: '6 of the 18 matches were already contacted — 12 net new this round',
        items: [
          { name: 'AI 工具*评测', dup: false },
          { name: '硅*实验室', dup: false },
          { name: '模型*观察', dup: true },
          { name: '折腾*日常', dup: false },
          { name: '算法*笔记', dup: false },
          { name: 'Prompt *日记', dup: false },
          { name: '数字*工坊', dup: true },
          { name: '代码*手记', dup: false },
          { name: '智能*前线', dup: false },
          { name: '极客*研究所', dup: true },
          { name: '开源*观察', dup: false },
          { name: '机器*笔谈', dup: false },
          { name: '未来*工具箱', dup: true },
          { name: '深度*学习室', dup: false },
          { name: 'AI *生产力', dup: false },
          { name: '效率*星球', dup: true },
          { name: '算力*杂货铺', dup: true },
          { name: '装机*日报', dup: false },
        ],
      },
      output: {
        caption: 'New creators are written back to Feishu Base with the fields the campaign schedule needs, ready for pricing and outreach.',
        tableName: 'Creator DB · Feishu Base',
        columns: ['Creator', 'Followers', 'Avg views (last 5)', 'Niche'],
        rows: [
          ['AI 工具*评测', '86K', '32K', 'AI app reviews'],
          ['硅*实验室', '42K', '18K', 'Local model deployment'],
          ['开源*观察', '19K', '7,400', 'Industry analysis'],
          ['折腾*日常', '11K', '5,200', 'Productivity tools'],
          ['Prompt *日记', '7,800', '2,600', 'Prompting tips'],
        ],
        more: '… plus 7 more written to the same table',
        footer: 'Synced to Feishu Base → on to pricing and campaign scheduling',
      },
      stats: [
        { value: '300+', label: 'qualified creators in 4 days' },
        { value: '3.5×', label: 'faster than by hand' },
        { value: '4', label: 'platforms on the same logic' },
      ],
    },
  },

  projects: {
    heading: {
      index: '05',
      en: 'Projects & Campus',
      titleLine1: 'Things I made myself:',
      titleHighlight: 'products, papers and shows',
      titleLine2After: '.',
      lede: 'From a mini-program I wrote and shipped alone to an original musical that takes dozens of people — each one started with “I want this to exist”, so I made it.',
    },
    items: [
      {
        id: 'juriji',
        num: '01',
        period: '2026.06 — Present',
        title: 'Juriji · My Theatre Diary',
        subtitle: 'Vibe coding project · a WeChat Mini Program I designed, built and launched solo',
        desc: 'The insight: theatre-goers around me logged shows in their phone notes — no sense of occasion, and while every app has a year-end recap, theatre fans had none. So I positioned it as “show diary + annual report”\nThe MVP: designed, built and launched it alone with Claude Code, Cursor and Figma; ticket stubs are read automatically via Baidu OCR in cloud functions, alongside a show calendar, a WeChat reminder the day before curtain-up and a shareable annual report\nIteration: reached 200+ users through a Xiaohongshu cold start, added venue autocomplete, search empty states and a feedback entry from user feedback, and cut a cast-schedule recognition feature that missed its accuracy bar to protect the core experience',
        tags: ['Solo build', 'Vibe coding', '200+ users', 'Shipped'],
        note: 'Scan to become my user ๑⁃̀⩊⁃́๑',
        paper: false,
      },
      {
        id: 'thesis',
        num: '02',
        period: '2025.09 — 2026.05',
        title: 'Undergraduate Dissertation',
        subtitle: 'Authorship and Distributed Agency in AI-Generated Art',
        desc: 'Examines who owns creation in AI-generated art and how agency is distributed, drawing on Latour, Barthes and others to analyse the creative nature of AI systems\nAwarded a Distinction',
        tags: ['Research', 'AI & Art', 'Distinction'],
        note: null,
        paper: true,
      },
      {
        id: 'mumu',
        num: '03',
        period: '2024.10 — 2026.04',
        title: 'UCL CSSA & MuMusical',
        subtitle: 'Head of UCL CSSA Art Troupe · Founder of MuMusical, a Chinese musical theatre society',
        desc: 'Oversaw 6 arts societies — event planning, budgets and team coordination — and organised large stage productions (200+ audience)\nFounded MuMusical, UCL’s first Chinese musical theatre society, and am now leading production of the original Chinese musical Bangjin Meiduo, bringing Chinese musical theatre to London',
        tags: ['Founding team', 'Original production', '200+ audience'],
        note: null,
        paper: false,
      },
      {
        id: 'crew',
        num: '04',
        period: '2023.10 — 2026.04',
        title: 'Stage Crew Society',
        subtitle: 'Sound Designer & Lighting Assistant',
        desc: 'Provided technical support for multiple musical productions, running sound and lighting and using QLab for live sound cues\nPlenty of experience handling the unexpected mid-show',
        tags: ['Sound design', 'QLab', 'Stage tech'],
        note: null,
        paper: false,
      },
    ],
  },

  skills: {
    heading: {
      index: '06',
      en: 'Skills & Interests',
      titleLine1: 'The tools I use,',
      titleLine2Before: 'and ',
      titleHighlight: 'after hours',
      titleLine2After: '.',
      lede: '(~˘▾˘)~ main quest skills & side quest hobbies ~(˘▾˘~)',
    },
    groups: [
      {
        title: 'Skills',
        en: 'Skills',
        items: ['Python', 'R', 'SQL', 'Data Analysis', 'Incremental Attribution', 'SEO / SEM', 'Agent Building'],
      },
      {
        title: 'Tools',
        en: 'Tools',
        items: ['Claude Code', 'Cursor', 'Codex', 'MCP / Skills', 'Cherry Studio', 'Figma', 'GA4', 'Search Console', 'Bing Webmaster', 'QLab'],
      },
      {
        title: 'Languages',
        en: 'Languages',
        items: ['Mandarin (native)', 'English (fluent)', 'German (basic)'],
      },
      {
        title: 'Interests',
        en: 'Interests',
        items: ['Piano (ABRSM Grade 8)', 'Freediving (AIDA 2 Star)', 'Swimming', 'Musical Theatre', 'Badminton'],
      },
    ],
  },

  contact: {
    heading: {
      index: '07',
      en: 'Contact',
      titleLine1: 'Growth, data, AI products —',
      titleLine2Before: 'or the ',
      titleHighlight: 'stage',
      titleLine2After: '.',
      lede: '',
    },
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    basedLabel: 'Based in',
  },

  recordPlayer: {
    kicker: 'My cover',
    songTitle: '舒芙蕾 Soufflé',
    subtitle: 'A song I covered',
    hint: 'Give it a listen',
    discText: 'cover',
    songId: '1926181540',
    openInNetease: 'Open in NetEase Cloud Music',
  },

  photoBox: {
    alts: [
      'Lights under an arcade roof',
      'A Ferris wheel by the sea',
      'People fishing off a pier',
      'A red bus under a tree',
      'A staircase full of decorations',
      'Campfire and marshmallows',
      'A windy coastline',
      'A brunch table',
      'Mascots in a square',
      'A boat at sea',
      'Two people watching the sea',
    ],
  },

  pileCollage: {
    photos: [
      { id: 'bubble', alt: 'Bubble the Ragdoll cat', caption: 'Bubble' },
      { id: 'stage', alt: 'Singing on stage', caption: 'on stage' },
      { id: 'rehearsal', alt: 'Musical rehearsal room', caption: null },
      { id: 'majorca', alt: 'Seaside in Majorca, Spain', caption: 'Majorca' },
      { id: 'mixer', alt: 'Mixing desk and flight cases', caption: 'sound check' },
      { id: 'speech', alt: 'Hosting an event', caption: null },
      { id: 'paddle', alt: 'Paddleboarding at sunset', caption: 'golden hour' },
    ],

    boardingPass: {
      label: 'Boarding Pass',
      from: 'LGW',
      to: 'PMI',
      fromCity: 'London',
      toCity: 'Palma',
      passenger: 'SUN / ANGELINA',
      seat: 'SEAT 12A',
      date: '2025.11',
    },
    ticket: {
      label: 'Admit One',
      title: 'Bangjin Meiduo',
      subtitle: 'Original Musical',
      seat: 'ROW C · 14',
      no: 'NO. 014',
    },
  },

  paper: {
    ariaLabel: 'Undergraduate dissertation abstract',
    kicker: 'BASc Arts and Sciences · UCL · 2026',
    title: 'Abstract',
    question: 'Where does creation reside in AI-generated art?',
    footerLeft: 'DISSERTATION · DISTINCTION',
    footerRight: 'Angelina Sun',
    // 摘要原文就是英文，直接复用中文版那份，免得维护两遍
    paragraphs: siteContent.paper.paragraphs,
  },
}

