/**
 * 全站文案集中管理。
 *
 * 日常改字只改这个文件；英文版在 content.en.ts，结构与这里一一对应（改了中文记得同步英文）。
 * 改完重新打包单文件 HTML：
 *   npx tsc -b && npx vite build --config vite.config.singlefile.ts
 *   cp dist/index.html "/Applications/  /个人站/孙菲潞-个人主页.html"
 *
 * 说明：带 mark 的片段表示正文里的彩色马克笔强调；换行仍由组件按版式插入。
 */

export type MarkedSeg = { t: string; mark?: 'gold' | 'pop' }

export const siteContent = {
  meta: {
    title: '孙菲潞 · 个人主页',
    description:
      '孙菲潞 Angelina Sun 的个人主页 — UCL 管理学硕士在读，文理双学位本科。游走在数据、AI 与舞台之间：AI 产品增长、0→1 海外增长、AI Agent 与音乐剧创作。',
    ogTitle: '孙菲潞 · 个人主页 | Data by day, Stage by night',
    ogDescription:
      'UCL 管理学硕士在读，文理双学位本科。游走在数据、AI 与舞台之间：AI 产品增长、0→1 海外增长、AI Agent 与音乐剧创作。',
    locale: 'zh_CN',
  },

  identity: {
    name: '孙菲潞',
    nameEn: 'Angelina Sun',
    signature: '孙菲潞 · Angelina Sun',
    email: 'angelina_sun0618@163.com',
    /** 163 网页邮箱「写信」直达链接，收件人已预填（未登录时会先引导登录） */
    emailHref:
      'https://mail.163.com/js6/main.jsp?df=email163#module=compose.composeModule%7C%7B%22to%22%3A%22angelina_sun0618%40163.com%22%7D',
    phone: '+86 188 0626 0618',
    phoneHref: 'tel:+8618806260618',
    based: '伦敦 London · 上海 Shanghai · 苏州 Suzhou',
    footerLine: '© 2026 · Written, staged & shipped by Angelina',
  },

  nav: [
    { key: 'home', label: '首页', en: 'Home' },
    { key: 'about', label: '关于', en: 'About' },
    { key: 'education', label: '教育', en: 'Education' },
    { key: 'experience', label: '经历', en: 'Experience' },
    { key: 'projects', label: '项目', en: 'Projects' },
    { key: 'skills', label: '技能', en: 'Skills' },
    { key: 'contact', label: '联系', en: 'Contact' },
  ],

  common: {
    pageLabel: 'Page',
    currentLabel: '当前',
    sayHiLabel: 'Say hi',
    workAndCoop: '工作与合作',
    emailLink: '写封邮件 ↗',
    takeYourTime: 'plz Take Your Time ♨',
    skip: '跳过 ›',
    close: '关闭',
    prevPhoto: '上一张',
    nextPhoto: '下一张',
    qrCaption: '微信扫码体验',
    paperButton: '阅读论文摘要',
    latestNote: '最近在做的',
    offTheClock: 'Off the clock',
    casualShots: 'Solo Trip',
    tallPhotoHint: '长图 · 上下滚动查看',
    viewPhotoPrefix: '查看照片：',
    viewNthPhoto: (title: string, n: number) => `查看${title}的第 ${n} 张照片`,
    qrAlt: (title: string) => `${title}小程序码`,
    screenshotAlt: (n: number) => `剧日记截图 ${n}`,
    photoAlt: (n: number) => `演出现场照片 ${n}`,
    nthDot: (n: number) => `第 ${n} 张`,
    switchLang: 'Switch to English',
    thanks: 'Thx',
    backHome: '回到首页',
    play: '播放',
    pause: '暂停',
    openRecord: '打开唱片播放器',
    closeRecord: '收起唱片播放器',
    closePlayerPanel: '关闭唱片播放器',
  },

  home: {
    eyebrow: 'Home',
    signature: '孙菲潞 · Angelina Sun',
    keywords: ['AI 产品增长', '0→1 海外增长', 'AI Agent', '音乐剧创作'],
    titleLine1: 'Data by day,',
    titleHighlight: 'Stage by night',
    titleDot: '.',
    intro: [
      '在开源 AI 客户端 Cherry Studio 做用户增长：主导 V2.0 发布期的 KOL 投放，带来 3.3 万增量用户；从 0 启动海外增长，并用 MCP 与 Skills 搭建达人挖掘 Agent，效率约为人工的 3.5 倍。',
      '业余独立开发并上线了微信小程序「剧日记」，从需求洞察到冷启动一个人完成。熟练使用 SQL、Python 做数据分析，中英双语，习惯在跨国团队里协作。',
    ],
    primaryCta: '认识一下',
    emailCta: '写封邮件 ↗',
    startHere: '从这里开始',
    portraitAlt: '孙菲潞 Angelina Sun',
  },

  monologue: {
    lines: [
      [{ t: '我习惯把事情拆开看：' }],
      [{ t: '哪一步在漏人，哪一句台词让全场安静下来——' }],
      [{ t: '我认为是' }, { t: '同一个问题', mark: 'gold' }, { t: '。' }],
      [{ t: '白天写 prompt、洗数据、盯转化；' }],
      [{ t: '晚上卡音乐、调灯光、等观众那一口气。' }],
      [{ t: '一个要算得准，一个要说得真。' }],
      [{ t: '这两个' }, { t: '我都要做的完美', mark: 'pop' }, { t: '。' }],
    ] as MarkedSeg[][],
  },

  about: {
    heading: {
      index: '02',
      en: 'About',
      titleLine1: '白天与数据和 AI 打交道，',
      titleLine2Before: '夜晚属于',
      titleHighlight: '舞台',
      titleLine2After: '。',
      // 这三句是手动断行的（SectionHeading 的导语走 whitespace-pre-line）
      lede: 'UCL 文理双学位本科毕业，现在读管理学硕士。\n擅长于 AI 产品与增长方向的工作，业余在剧场做舞台管理和音响。',
    },
    cards: [
      {
        num: '01',
        title: 'AI 产品与增长',
        desc: '从投放、SEM、SEO 到内容矩阵都亲手做过：一次 31 位达人的发布期投放带来 3.3 万增量用户，海外 X 账号从 0 起步一个月涨粉约 1K。也会自己动手做产品——用 Claude Code 独立上线了一个 200+ 用户的小程序，用 MCP 与 Skills 搭过好几个能真正落地的 Agent。',
      },
      {
        num: '02',
        title: '数据分析',
        desc: '熟练使用 Python、SQL、R，以及 GA4、Search Console 等分析工具。投放结束后独立做复盘：用基准期外推做增量归因、按量级分层算 CPM / CPE，还揪出了约 40 万疑似刷量播放；在德勤的项目里定位约 30% 冗余数据，让数据准确率提升约 25%。',
      },
      {
        num: '03',
        title: '跨文化沟通',
        desc: '中文母语、英语熟练、德语基础，具备跨国团队协作经验。在伦敦创立首个中文音乐剧社，推动中文原创内容在海外落地。',
      },
    ],
    outroNote: '细节都在「经历」和「项目」里 ⌯>ᴗo⌯ಣ ',
  },

  education: {
    heading: {
      index: '03',
      en: 'Education',
      titleLine1: '在 UCL 从人文与科学，',
      titleLine2Before: '走向',
      titleHighlight: '管理学',
      titleLine2After: '。',
      lede: '一个把社会科学、数据方法与商业训练放在同一张课表上的组合。',
    },
    items: [
      {
        period: '2026.09 — 2027.09',
        credential: '授课型硕士',
        degree: '管理学 MSc Management',
        school: '伦敦大学学院 University College London',
        note: '在读',
        detail: '人工智能商业应用、商业统计、决策与风险分析、运营与技术管理、市场营销',
      },
      {
        period: '2023.09 — 2026.06',
        credential: '文理双学位学士',
        degree: '人文与科学（社会方向）BASc Arts and Sciences: Societies',
        school: '伦敦大学学院 University College London',
        note: null,
        detail:
          '二等一荣誉学位（2:1），均分 69.3；毕业论文研究 AI 生成艺术的作者权，获 Distinction\n数据科学与可视化、量化方法、编程导论、计量经济学、高等数学、知识经济—企业咨询',
      },
    ],
    photoAlt: '孙菲潞在 UCL 主楼 Wilkins Building 前',
    photoKicker: 'Wilkins Building · Gower Street',
    photoNote: 'UCL 200',
  },

  experience: {
    heading: {
      index: '04',
      en: 'Experience',
      titleLine1: '四段实习，',
      titleLine2Before: '沉淀出一套',
      titleHighlight: '增长方法',
      titleLine2After: '。',
      ledeLine1: '按时间倒序排列。',
      ledeLine2: '不只是不同的经历，每一段都留下了可以复用的方法。',
    },
    jobs: [
      {
        period: '2026.06 — 至今',
        company: '上海千彗科技 · Cherry Studio',
        role: '用户增长 & 产品运营 · 开源 AI 桌面客户端',
        tags: ['KOL 投放', '增量归因', '海外增长', 'SEO / SEM', 'AI Agent', '内容矩阵'],
        points: [
          'KOL 投放：负责 v2.0 发布期投放，从自建的 200+ AI 类达人库中筛出 31 位（头部 3、腰部 13、尾部 15），管理 31.55 万元预算，覆盖 B 站、小红书、抖音、视频号，独立完成筛选、谈价到合作落地；推广期日均新增从 5,760 提升到 8,754（+52%），增量获客 3.3 万人，单用户获客成本约 9.58 元，次日留存稳定在 46%，首充付费用户 +29%',
          '投放复盘：独立完成整场复盘，用基准期外推做增量归因，按达人量级分层计算 CPM 和 CPE；识别出约 40 万疑似刷量播放并修正统计口径，最终输出下一轮的复投与淘汰名单',
          '海外增长：从 0 启动官方 X 账号，一个月涨粉约 1K，单帖最高阅读 4.5K；担任官网 SEO 的 KR 负责人，诊断出下载转化未埋点、软 404 等问题，借助 Claude Code 完成转化埋点、sitemap 和 IndexNow 的开发并提交 PR，再按搜索量重写 65 个英文文档页标题',
          'SEM 投放：搭建百度、360、必应三平台账户，完成关键词分组与创意优化，累计点击 11 万+；百度品牌词 CTR 从 31% 提升到 60%，CPC 从 0.72 元降到 0.31 元（-57%）',
          'AI Agent：基于 MCP 和 Skills 搭建 B 站、抖音、公众号和视频号的达人挖掘 Agent，以及公众号排版 Agent；4 天筛选出 300+ 位有效达人，日均约 75 位，约为人工（约 20 位/天）的 3.5 倍（下面有一段可以点开的流程演示）',
          '内容矩阵：运营公众号、小红书、B 站等 5 个平台（合计 4.8 万粉），统筹选题与 v2.0 宣传片；9 月全平台阅读和播放 8.5 万+，小红书一个月涨粉 1.3K',
          'B 端转化：负责企业直播前的客资收集与播后付费转化，付费转化率达 6%',
        ],
      },
      {
        period: '2025.06 — 2025.07',
        company: '德勤咨询（上海）· 技术与转型部 T&T',
        role: '咨询',
        tags: ['SQL', 'Python', 'MDM', '咨询'],
        points: [
          '参与一家跨国药企的主数据管理（MDM）项目，使用 SQL 与 Python 清洗分析运营数据，定位约 30% 冗余记录',
          '梳理业务与 IT 需求差异，输出可视化 SOP 流程图，数据准确率提升约 25%，错误率降低约 15%',
          '将复杂系统逻辑转化为非技术团队可理解的方案文档，推动跨部门落地执行',
        ],
      },
      {
        period: '2024.09 — 2024.12',
        company: 'SiliconFlow 硅基流动',
        role: '海外用户增长运营',
        tags: ['海外增长', 'SEO', '社区运营'],
        points: [
          '通过分析目标受众搜索意图，结合 Flux、DeepSeek 等主流模型的技术特点，产出兼顾 SEO 友好性与内容专业度的 AI 技术文章；使用 Freepik AI 生成 SEO 封面图、Grammarly 辅助英文润色，建立完整的英文内容生产工具链',
          '运营 Discord、X 等海外社区，基于 Google Keyword Planner 进行搜索意图分析，优化内容结构；X 平台单帖平均阅读量 3-4K，持续提升品牌海外曝光与用户触达效率',
          '持续跟踪大模型、多模态、AI Agent 等前沿方向技术演进，形成对模型能力边界与商业落地场景的判断框架',
        ],
      },
      {
        period: '2024.07 — 2024.08',
        company: '普华永道中天会计师事务所（上海）',
        role: '审计',
        tags: ['IPO 审计', '财务核查'],
        points: [
          '参与电商企业 IPO 审计项目，使用 VLOOKUP 等函数执行财务数据核查与抽样测试，识别潜在数据异常',
          '系统梳理企业财务结构与业务流程，提升对企业运营与风险管理的理解',
        ],
      },
    ],

    /**
     * B 站达人调研 Agent 的流程演示。挂在 company 与 attachTo 相同的那一段经历下面。
     * 演示里出现的数字与 UP 主名称都是脱敏后的示意数据，只用来说明流程与筛选逻辑。
     */
    agentDemo: {
      attachTo: '上海千彗科技 · Cherry Studio',
      trigger: 'AI Agent 流程演示',
      triggerHint: '点开跑一遍',
      eyebrow: 'Agent Demo',
      title: 'B 站达人调研 Agent',
      subtitle: '一次调用，从关键词到可投放的达人名单',
      intro:
        '这是我在 Cherry Studio 独立搭建的 B 站达人调研 Agent 的简化流程演示。同一套逻辑后来复用到了抖音、公众号和视频号，4 天筛出 300+ 位有效达人。',
      replay: '重新跑一遍',
      running: '演示中',
      stepsLabel: '流程',
      disclaimer: '流程与筛选逻辑取自真实项目，页面内所有名称与数字均为脱敏演示数据。',
      steps: [
        { num: '01', name: '输入' },
        { num: '02', name: '调用 Skill' },
        { num: '03', name: '抓取' },
        { num: '04', name: '筛选' },
        { num: '05', name: '去重' },
        { num: '06', name: '输出' },
      ],
      input: {
        caption: 'Agent 从选题词库里取出关键词，模拟人工在 B 站搜索框发起一次搜索。',
        site: 'bilibili',
        tab: 'UP 主',
        placeholder: '搜索 UP 主 / 视频',
        keyword: 'AI Agent',
        button: '搜索',
        notes: ['关键词来自选题词库，可批量排队', '同一轮会跑「AI 工具 / 本地大模型 / Prompt」等近义词'],
      },
      skill: {
        caption:
          '筛选标准不是每次现写，而是固化成一份可复用的 Skill。一句话就能唤起，后面四步全部由这份 SKILL.md 驱动。',
        matched: '匹配到指令 · 「帮我找一批做 AI Agent 内容的 B 站 UP 主」',
        file: 'bilibili-kol-filter/SKILL.md',
        lines: [
          { k: '', t: '---', dim: true },
          { k: 'name: ', t: 'bilibili-kol-filter' },
          { k: 'description: ', t: 'B 站达人调研，按粉丝量、播放、账号类型筛出可投放 UP 主' },
          { k: '', t: '---', dim: true },
          { k: '## 工具  ', t: 'puppeteer-mcp 控制真实 Chrome，复用已登录会话' },
          { k: '## 阈值  ', t: '粉丝 > 5000 / 近 5 条均播 > 2000 / 非企业号 / 60 天内有更新' },
          { k: '## 去重  ', t: '与达人库按 mid 比对，只保留新增' },
          { k: '## 输出  ', t: '写回飞书多维表格：昵称 / mid / 粉丝 / 均播 / 内容方向' },
        ],
        status: 'Skill 已加载，后面四步都按它执行',
      },
      crawl: {
        caption: 'Puppeteer 控制真实 Chrome 访问 B 站搜索页，滚动翻页并解析 UP 主卡片。',
        url: 'search.bilibili.com/upuser?keyword=AI%20Agent',
        badge: 'Puppeteer · 真实 Chrome 会话',
        notes: [
          '复用本机已登录会话，绕过登录墙与风控弹窗',
          '按关键词翻 3 页，滚动到底触发懒加载',
          '解析昵称 / mid / 粉丝数 / 简介 / 最新投稿',
        ],
        result: '本轮采集 86 条候选',
      },
      filter: {
        caption: '四条硬性规则依次过滤，阈值写在 SKILL.md 里，改一行就能换一套标准。',
        hint: '点开任意一条看筛选逻辑',
        cards: [
          {
            name: '粉丝数 > 5000',
            from: 86,
            to: 47,
            code: `// 卡片上的「1.2万」先归一成数字
const fans = toNumber(card.fans)   // "1.2万" → 12000
if (fans < 5_000) return drop(up, '粉丝量不足')`,
          },
          {
            name: '近 5 条视频均播 > 2000',
            from: 47,
            to: 29,
            code: `const recent = (await fetchVideos(up.mid)).slice(0, 5)
const avg = mean(recent.map(v => toNumber(v.play)))
if (avg < 2_000) return drop(up, '近期播放偏低')`,
          },
          {
            name: '排除企业号 / MCN',
            from: 29,
            to: 24,
            code: `// 官方认证 + 简介关键词，双重判断
const ORG = /官方|旗舰店|有限公司|MCN|工作室/
if (up.officialVerify?.type === 1 || ORG.test(up.sign))
  return drop(up, '企业 / 机构号')`,
          },
          {
            name: '排除断更账号',
            from: 24,
            to: 18,
            code: `const idle = (Date.now() - recent[0].pubdate * 1000) / 864e5
if (idle > 60) return drop(up, '断更超过 60 天')`,
          },
        ],
        summary: '86 条候选 → 18 条命中',
      },
      dedupe: {
        caption: '命中结果与飞书多维表格里的已有达人库比对 mid，重复的直接划掉，只留下这一轮真正的新增。',
        libraryLabel: '飞书达人库',
        libraryBefore: '120 条',
        libraryAfter: '132 条',
        hitLabel: '已在库',
        newLabel: '新增',
        summary: '18 条命中里 6 条已谈过，本轮净新增 12 条',
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
        caption: '新增结果按投放排期需要的字段写回飞书多维表格，直接进入后续的报价与沟通流程。',
        tableName: '达人库 · 飞书多维表格',
        columns: ['UP 主', '粉丝数', '近 5 条均播', '内容方向'],
        rows: [
          ['AI 工具*评测', '8.6 万', '3.2 万', 'AI 应用测评'],
          ['硅*实验室', '4.2 万', '1.8 万', '本地模型部署'],
          ['开源*观察', '1.9 万', '7,400', '行业解读'],
          ['折腾*日常', '1.1 万', '5,200', '效率工具'],
          ['Prompt *日记', '7,800', '2,600', '提示词技巧'],
        ],
        more: '…… 另有 7 条已写入同一张表',
        footer: '同步进飞书多维表格 → 进入报价谈判与合作排期',
      },
      stats: [
        { value: '300+', label: '4 天筛出的有效达人' },
        { value: '3.5×', label: '人工筛选效率' },
        { value: '4', label: '平台复用同套逻辑' },
      ],
    },
  },

  projects: {
    heading: {
      index: '05',
      en: 'Projects & Campus',
      titleLine1: '自己动手做出来的',
      titleHighlight: '产品、论文与演出',
      titleLine2After: '。',
      lede: '从一个人写完上线的小程序，到一台需要几十个人的原创音乐剧——都是「想做，于是把它做出来」的一件事。',
    },
    items: [
      {
        id: 'juriji',
        num: '01',
        period: '2026.06 — 至今',
        title: '剧日记 · 我的观演足迹',
        subtitle: 'vibe coding 项目 · 独立设计、开发并上线的微信小程序',
        desc: '需求洞察：身边的剧迷都在用备忘录记观剧，没有一点仪式感；各个平台年底都有年度报告，剧迷却没有。于是把它定位成「观剧记录 + 年度报告」\nMVP：用 Claude Code、Cursor、Figma 一个人完成交互设计、前后端开发与上线；云函数接入百度 OCR 自动识别票根，再配上观演日历、开演前一天的微信订阅提醒和可分享的年度报告长图\n迭代与取舍：通过小红书冷启动获得 200+ 位用户，按反馈补上场馆联想输入、搜索空状态和反馈入口；「卡司排期识别」识别率不达标，果断下线，先保证核心体验',
        tags: ['独立开发', 'vibe coding', '200+ 用户', '部署上线'],
        note: '扫码成为我的用户 ๑⁃̀⩊⁃́๑',
        paper: false,
      },
      {
        id: 'thesis',
        num: '02',
        period: '2025.09 — 2026.05',
        title: '本科毕业论文',
        subtitle: 'AI 生成艺术中的创作权与分布式能动性',
        desc: '以 AI 生成艺术为研究对象，探讨创作权归属与分布式能动性问题，结合 Latour、Barthes 等理论框架分析 AI 系统的创作本质\n获 Distinction',
        tags: ['学术研究', 'AI 与艺术', 'Distinction'],
        note: null,
        paper: true,
      },
      {
        id: 'mumu',
        num: '03',
        period: '2024.10 — 2026.04',
        title: 'UCL CSSA & 慕幕',
        subtitle: 'UCL CSSA 艺术团团长 · 中文音乐剧社团「慕幕 MuMusical」创始人',
        desc: '统筹管理 6 个艺术类社团，负责活动策划、预算管理及团队协调，并组织大型舞台演出活动（200+ 观众）\n创立 UCL 首个中文音乐剧社团「慕幕 MuMusical」，现主导原创中文音乐剧《邦锦美朵》的制作筹备，推动中文音乐剧在伦敦落地',
        tags: ['创始团队', '原创制作', '200+ 观众'],
        note: null,
        paper: false,
      },
      {
        id: 'crew',
        num: '04',
        period: '2023.10 — 2026.04',
        title: 'Stage Crew Society',
        subtitle: 'Sound Designer & Lighting Assistant',
        desc: '参与多场音乐剧演出的技术支持，负责音响与灯光操作，使用 QLab 进行现场音效控制\n突发情况处理经验丰富',
        tags: ['声音设计', 'QLab', '舞台技术'],
        note: null,
        paper: false,
      },
    ],
  },

  skills: {
    heading: {
      index: '06',
      en: 'Skills & Interests',
      titleLine1: '会用的工具，',
      titleLine2Before: '和',
      titleHighlight: '下班以后',
      titleLine2After: '的时间。',
      lede: '(~˘▾˘)~ 主线技能&支线爱好 ~(˘▾˘~)',
    },
    groups: [
      {
        title: '技能',
        en: 'Skills',
        items: ['Python', 'R', 'SQL', '数据分析', '增量归因', 'SEO / SEM', 'Agent 搭建'],
      },
      {
        title: '工具',
        en: 'Tools',
        items: ['Claude Code', 'Cursor', 'Codex', 'MCP / Skills', 'Cherry Studio', 'Figma', 'GA4', 'Search Console', 'Bing Webmaster', 'QLab'],
      },
      {
        title: '语言',
        en: 'Languages',
        items: ['中文（母语）', '英语（熟练）', '德语（基础）'],
      },
      {
        title: '兴趣',
        en: 'Interests',
        items: ['钢琴（英皇八级）', '自由潜（AIDA 2 星）', '游泳', '音乐剧', '羽毛球'],
      },
    ],
  },

  contact: {
    heading: {
      index: '07',
      en: 'Contact',
      titleLine1: '无论是增长、数据、AI 产品，',
      titleLine2Before: '还是',
      titleHighlight: '舞台',
      titleLine2After: '。',
      lede: '',
    },
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    basedLabel: 'Based in',
  },

  recordPlayer: {
    kicker: 'My cover',
    songTitle: '舒芙蕾',
    subtitle: '我的翻唱歌曲',
    hint: '点开听听看',
    discText: 'cover',
    /** 网易云歌曲 ID（外链播放器与跳转链接共用） */
    songId: '1926181540',
    openInNetease: '在网易云音乐打开',
  },

  photoBox: {
    alts: [
      '廊顶的灯',
      '海边的摩天轮',
      '栈桥上钓鱼的人',
      '树下的红色巴士',
      '挂满装饰的楼梯',
      '篝火与棉花糖',
      '起风的海岸',
      '一桌早午餐',
      '广场上的玩偶',
      '海上的船',
      '看海的两个人',
    ],
  },

  pileCollage: {
    photos: [
      { id: 'bubble', alt: '布偶猫 Bubble', caption: 'Bubble' },
      { id: 'stage', alt: '舞台演唱', caption: 'on stage' },
      { id: 'rehearsal', alt: '音乐剧排练厅', caption: null },
      { id: 'majorca', alt: '西班牙马略卡岛海边', caption: 'Majorca' },
      { id: 'mixer', alt: '调音台与设备箱', caption: 'sound check' },
      { id: 'speech', alt: '活动主持演讲', caption: null },
      { id: 'paddle', alt: '桨板日落', caption: 'golden hour' },
    ],

    /* 两张压在照片堆里的纸片：登机牌存根 + 音乐剧票根。
       航班号、座位、日期都是能随手改的字段，换成真的那趟就行。 */
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
      title: '邦锦美朵',
      subtitle: '原创音乐剧',
      seat: 'ROW C · 14',
      no: 'NO. 014',
    },
  },

  paper: {
    ariaLabel: '本科毕业论文摘要',
    kicker: 'BASc Arts and Sciences · UCL · 2026',
    title: 'Abstract',
    question: 'Where does creation reside in AI-generated art?',
    footerLeft: 'DISSERTATION · DISTINCTION',
    footerRight: 'Angelina Sun',
    paragraphs: [
      'This dissertation examines the question of where creation resides in AI-generated art — whether in the human prompt, the generative algorithm, or the produced image. Rather than resolving this question through a definitive attribution of creation or authorship, the dissertation argues that the question itself is conceptually inadequate. Creation in AI-generated art is not a property locatable within any single element of the production process, but a relational effect that emerges through the interaction of multiple heterogeneous components.',
      'The argument distinguishes four concepts that are often collapsed in debates about AI art: creativity, creation, agency, and authorship. Creativity is treated as the inward capacity traditionally associated with intention, originality, and expression; creation as the outward production of artefacts and meanings; agency as the capacity to affect that process; and authorship as the cultural, legal, and institutional attribution of responsibility and recognition.',
      "The methodology is desk-based and interdisciplinary, drawing on aesthetic theory and art history, post-structuralist literary and cultural theory, science and technology studies, and philosophy of language. A theoretical framework drawing on Roland Barthes, Walter Benjamin, and Bruno Latour reconceptualises authorship, originality, and agency as distributed across networks of human and non-human actors. These frameworks are applied to a case study of Refik Anadol's Unsupervised (2022), which demonstrates how AI art functions as a socio-technical configuration rather than the expression of a singular creative subject.",
      'The dissertation argues that AI-generated art does not simply relocate creativity from human to machine. Rather, it separates creativity from creation: creativity remains uncertain where intention and expression are mediated by opaque systems, while creation becomes distributed across prompts, models, datasets, interfaces, institutions, and viewers. Authorship persists as a useful fiction, stabilising recognition and responsibility even when it no longer accurately describes the production process.',
    ],
  },
}

export type SiteContent = typeof siteContent
