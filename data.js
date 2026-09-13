/**
 * 大學特殊選才 112～114 學年度 指標校系資料庫
 * 涵蓋：跨領域不分系、資訊資安、數理科學、工程電資、人文外語、科技藝術與傳播設計、生醫農學等
 */

const ADMISSION_DATABASE = [
  // ==========================================
  // 一、 頂大跨領域與全校不分系
  // ==========================================
  {
    id: "nthu-shisui",
    school: "國立清華大學",
    dept: "清華學院學士班（拾穗計畫）",
    system: "全校跨領域不分系",
    category: "cross_discipline",
    categoryName: "跨領域與不分系",
    tier: "top",
    tierName: "頂尖頂大",
    region: "north",
    regionName: "北部",
    quota: { "112": 63, "113": 65, "114": 67 },
    features: [
      "大一不分系，大二依志向自由修讀全校雙專長或自組專長",
      "全台最早推動且名額最多之旗艦特選計畫",
      "配置專屬學院導師，學分彈性極高，支援客製化學習計畫"
    ],
    requirements: {
      minCondition: "具備強烈自主學習動機、特殊專長、實驗教育或不同教育資歷者",
      types: ["experimental", "autodidact", "special_talent", "disadvantaged", "overseas"],
      apcsPractice: 0,
      competitions: ["olympiad", "science_fair", "wang_hong", "literature", "debate_mun", "startup_patent", "art_design", "info_contest", "security_ctf"],
      languages: ["any_high"]
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "初試審查自傳、特殊事證與未來四年學習計畫書；複試採深度個人口試與批判思考評析。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.18 ~ 10.25", exam: "111.11.19", result: "111.12.08" },
        "113": { apply: "112.10.17 ~ 10.24", exam: "112.11.18", result: "112.12.07" },
        "114": { apply: "113.10.15 ~ 10.22", exam: "113.11.16", result: "113.12.06" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中下旬公告簡章",
        apply: "10 月中旬 (約 10/14 ~ 10/22)",
        exam: "11 月中旬進行複試口試",
        result: "12 月初放榜"
      }
    },
    admissionStandard: "錄取標準極度看重「在特定領域有超越常規的高中探索深度」，不限特定學科，無論自學、藝術、文史、生態、程式或社會倡議均有錄取案例。口試會嚴格檢驗自學計畫之可行性與真實性。",
    tags: ["拾穗計畫", "大一不分系", "自學首選", "雙專長", "自主學習"],
    officialUrl: "https://admission.nthu.edu.tw/"
  },
  {
    id: "nycu-baichuan",
    school: "國立陽明交通大學",
    dept: "百川學士學位學程",
    system: "全校跨領域不分系",
    category: "cross_discipline",
    categoryName: "跨領域與不分系",
    tier: "top",
    tierName: "頂尖頂大",
    region: "north",
    regionName: "北部",
    quota: { "112": 41, "113": 43, "114": 45 },
    features: [
      "結合陽明交大電資、生醫、人文、法政與管理跨域能量",
      "打破傳統系所必修限制，客製化微學程與專案導向學習",
      "鼓勵文理交融、科技創新、社會設計與跨界整合"
    ],
    requirements: {
      minCondition: "具特殊專長、跨領域潛力、自主學習、創新創業或自學實驗教育經歷",
      types: ["experimental", "autodidact", "special_talent", "disadvantaged"],
      apcsPractice: 0,
      competitions: ["science_fair", "wang_hong", "startup_patent", "art_design", "info_contest", "debate_mun"],
      languages: ["any_high"]
    },
    evaluation: {
      writtenPercent: 40,
      interviewPercent: 60,
      examPercent: 0,
      description: "書面審查個人卓越成果與學習計畫；複試包含個人口試與跨領域思維團體面談。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.14 ~ 10.21", exam: "111.11.12", result: "111.12.02" },
        "113": { apply: "112.10.13 ~ 10.20", exam: "112.11.11", result: "112.12.01" },
        "114": { apply: "113.10.11 ~ 10.18", exam: "113.11.09", result: "113.11.29" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中旬公告簡章",
        apply: "10 月上中旬 (約 10/11 ~ 10/18)",
        exam: "11 月上旬進行複試口試",
        result: "11 月底 / 12 月初放榜"
      }
    },
    admissionStandard: "尋找具備跳脫框架思維的開創型人才。備審需具體呈現作品集與專題產出；面試重解決未知問題的應變能力與跨領域自驅力。",
    tags: ["百川計畫", "跨領域微學程", "科技與人文", "創新創業", "設計整合"],
    officialUrl: "https://baichuan.nycu.edu.tw/"
  },
  {
    id: "ncku-interdisciplinary",
    school: "國立成功大學",
    dept: "全校不分系學士學位學程",
    system: "全校跨領域不分系",
    category: "cross_discipline",
    categoryName: "跨領域與不分系",
    tier: "top",
    tierName: "頂尖頂大",
    region: "south",
    regionName: "南部",
    quota: { "112": 15, "113": 18, "114": 20 },
    features: [
      "成大最具彈性之實驗學程，學生可自組主修與畢業論文專案",
      "能充分利用成大九大學院（工學、醫學、設計、社科等）完整研發資源",
      "強調「用專業解決真實世界問題」的實踐導向"
    ],
    requirements: {
      minCondition: "具備跨領域實踐經驗、專題探究成果、社會關懷行動或跨界專長者",
      types: ["general", "experimental", "autodidact", "special_talent"],
      apcsPractice: 0,
      competitions: ["science_fair", "startup_patent", "debate_mun", "info_contest"],
      languages: []
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "第一階段審查自學/專題實踐成果；第二階段為實作面談與專案構想口試。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.20 ~ 10.31", exam: "111.11.25", result: "111.12.09" },
        "113": { apply: "112.10.19 ~ 10.30", exam: "112.11.24", result: "112.12.08" },
        "114": { apply: "113.10.17 ~ 10.28", exam: "113.11.22", result: "113.12.06" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月下旬公告簡章",
        apply: "10 月中下旬 (約 10/16 ~ 10/27)",
        exam: "11 月下旬面試",
        result: "12 月初放榜"
      }
    },
    admissionStandard: "評審特別重視考生是否具備「明確的跨領域學習動機」，需具體論述為何傳統工學院或商學院無法涵蓋其目標，以及如何善用成大跨系資源。",
    tags: ["成大不分系", "社會實踐", "跨學院選修", "自訂主修"],
    officialUrl: "https://college.ncku.edu.tw/"
  },
  {
    id: "nccu-communication-undecided",
    school: "國立政治大學",
    dept: "傳播學院大一大二不分系",
    system: "學院不分系",
    category: "cross_discipline",
    categoryName: "跨領域與不分系",
    tier: "top",
    tierName: "頂尖頂大",
    region: "north",
    regionName: "北部",
    quota: { "112": 5, "113": 5, "114": 6 },
    features: [
      "台灣傳播傳媒學界龍頭，大三自由選擇新聞、廣告、廣電主修",
      "著重新媒體數位敘事、影像創作、公關行銷與跨媒體數據分析",
      "結合政大人文社會底蘊與頂尖媒體實習網絡"
    ],
    requirements: {
      minCondition: "在影音創作、新聞報導、數位媒體、文學創作或社群傳播有卓越作品者",
      types: ["general", "special_talent", "autodidact"],
      apcsPractice: 0,
      competitions: ["literature", "art_design", "debate_mun"],
      languages: ["toeic_gold", "ielts_65"]
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "書面審查原創作品集、自傳與傳播觀察報告；複試為深度創作理念面談。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.11 ~ 10.24", exam: "111.11.18", result: "111.12.06" },
        "113": { apply: "112.10.12 ~ 10.23", exam: "112.11.17", result: "112.12.05" },
        "114": { apply: "113.10.08 ~ 10.21", exam: "113.11.15", result: "113.12.03" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中旬公布簡章",
        apply: "10 月上旬 ~ 中旬 (約 10/08 ~ 10/20)",
        exam: "11 月中旬口試",
        result: "12 月初放榜"
      }
    },
    admissionStandard: "作品集為勝負關鍵（如獨立製作紀錄片、社群十萬粉經營實例、文學大獎、得獎影音專題）。口試極度看重對當代公共議題與媒體現象的批判洞察力。",
    tags: ["傳播首選", "影像創作", "自媒體", "數位敘事", "新聞廣告"],
    officialUrl: "https://comm.nccu.edu.tw/"
  },

  // ==========================================
  // 二、 科技藝術與數位傳播專班 (精選推薦學系)
  // ==========================================
  {
    id: "nthu-arts-tech",
    school: "國立清華大學",
    dept: "藝術學院學士班（科技藝術組 / 音樂科技）",
    system: "科技藝術跨領域專班",
    category: "art_design",
    categoryName: "藝術設計與建築",
    tier: "top",
    tierName: "頂尖頂大",
    region: "north",
    regionName: "北部",
    quota: { "112": 3, "113": 4, "114": 4 },
    features: [
      "全台首屈一指 Tech-Art 科技藝術研發重鎮，專攻程式設計 ✕ 音樂聲音 ✕ 視覺互動",
      "探索 AI 生成音樂、聲音裝置、TouchDesigner 互動運算與 XR 沉浸式體驗",
      "大二自由跨選修清大資工、電資學院核心高階課程，資源充沛"
    ],
    requirements: {
      minCondition: "具備音樂/鋼琴素養、數位藝術、科展研究、程式設計或科技藝術跨領域探究實績",
      types: ["general", "special_talent", "autodidact", "experimental"],
      apcsPractice: 0,
      competitions: ["science_fair", "art_design", "info_contest", "wang_hong"],
      languages: []
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "初審作品集與探究報告（佔50%）；複試採現場作品解說、科技美學理念與專業口試（佔50%）。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.18 ~ 10.25", exam: "111.11.19", result: "111.12.08" },
        "113": { apply: "112.10.17 ~ 10.24", exam: "112.11.18", result: "112.12.07" },
        "114": { apply: "113.10.15 ~ 10.22", exam: "113.11.16", result: "113.12.06" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中旬公布最新招生簡章",
        apply: "10 月中旬 (約 10/14 ~ 10/22 線上報名繳件)",
        exam: "11 月中旬 (約 11/15~11/17 複試口試)",
        result: "12 月初公告正備取名單"
      }
    },
    admissionStandard: "極度偏好「懂音樂又懂程式」的跨界考生。若有高中科展佳作作為科學實證背書，搭配鋼琴檢定與自學程式作品，契合度極高！口試重視對聲音與視覺互動的思考深度。",
    tags: ["清大科技藝術", "音樂科技", "跨領域首選", "互動程式", "TouchDesigner", "AI藝術"],
    officialUrl: "https://ipta.site.nthu.edu.tw/"
  },
  {
    id: "ccu-ic",
    school: "國立中正大學",
    dept: "資訊傳播學系",
    system: "數位媒體與傳播特選",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "mid_four",
    tierName: "中字輩國立",
    region: "central",
    regionName: "中部",
    quota: { "112": 2, "113": 2, "114": 2 },
    features: [
      "軟體工程、全端開發、數位音訊視訊工程、人機互動（HCI/UI/UX）三合一",
      "中字輩國立名牌，重視將程式技術落地於新媒體傳播與產品設計",
      "備取遞補名額多，錄取機會優渥"
    ],
    requirements: {
      minCondition: "具備高中科展成果、網頁/APP程式開發、影音多媒體創作或資訊傳播專案成果者",
      types: ["general", "special_talent", "autodidact"],
      apcsPractice: 0,
      competitions: ["science_fair", "info_contest", "art_design", "literature"],
      languages: []
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "書面資料詳細審核專題研究歷程（科展報告極佳）；口試考察邏輯思維與傳播科技應用。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.25 ~ 11.07", exam: "111.11.26", result: "111.12.16" },
        "113": { apply: "112.10.24 ~ 11.06", exam: "112.11.25", result: "112.12.15" },
        "114": { apply: "113.10.22 ~ 11.04", exam: "113.11.23", result: "113.12.13" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月下旬公布簡章",
        apply: "10 月下旬至 11 月初 (約 10/21 ~ 11/04)",
        exam: "11 月下旬 (約 11/22 前後面試)",
        result: "12 月中旬放榜"
      }
    },
    admissionStandard: "不硬性要求頂尖 APCS，非常重視學生在高中階段是否有完整的「科學探究與專案成果」。台中市高中科展佳作是書審的強大加分項，口試時條理清晰說明實驗過程即可獲高分。",
    tags: ["中正資傳", "國立中字輩", "科展加分", "多媒體工程", "UIUX", "備取機會大"],
    officialUrl: "https://ccuic.ccu.edu.tw/"
  },
  {
    id: "yzu-ic",
    school: "元智大學",
    dept: "資訊傳播學系（科技組 / 設計組）",
    system: "多媒體科技特選",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "private_top",
    tierName: "優質私立",
    region: "north",
    regionName: "北部",
    quota: { "112": 4, "113": 5, "114": 5 },
    features: [
      "台灣數位多媒體、遊戲設計（Unity/Unreal Engine）、VR/AR 互動先驅校系",
      "業界口碑極佳，校友遍布遊戲大廠、新媒體互動科技公司",
      "名額充裕，提供專案與科展得獎新生高額入學獎學金"
    ],
    requirements: {
      minCondition: "高中具備科展作品、遊戲製作、程式設計、互動多媒體或數位藝術專長",
      types: ["general", "special_talent", "autodidact"],
      apcsPractice: 0,
      competitions: ["science_fair", "info_contest", "art_design", "startup_patent"],
      languages: []
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "書面審查個人探究歷程與作品集；口試了解創作熱忱、除錯經驗與未來修課目標。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.17 ~ 11.14", exam: "111.11.26", result: "111.12.02" },
        "113": { apply: "112.10.16 ~ 11.13", exam: "112.11.25", result: "112.12.01" },
        "114": { apply: "113.10.14 ~ 11.11", exam: "113.11.23", result: "113.11.29" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中旬正式公布簡章",
        apply: "10 月中旬至 11 月上旬 (約 10/14 ~ 11/11，報名期約一個月)",
        exam: "11 月下旬 (約 11/22 前後面試)",
        result: "11 月底 / 12 月初搶先放榜"
      }
    },
    admissionStandard: "高中組科展佳作在此系所幾乎具備壓倒性的錄取優勢（錄取勝率 90% 以上）。名額多且放榜早，非常適合作為提早上岸的第一道堅實防線。",
    tags: ["元智資傳", "遊戲開發首選", "高額獎學金", "超穩保底", "UnityUnreal", "名額多"],
    officialUrl: "https://www.infocom.yzu.edu.tw/"
  },

  // ==========================================
  // 三、 資訊工程、資安與人工智慧（名額擴大）
  // ==========================================
  {
    id: "ntu-csie",
    school: "國立臺灣大學",
    dept: "資訊工程學系",
    system: "單系偏才特選",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "top",
    tierName: "頂尖頂大",
    region: "north",
    regionName: "北部",
    quota: { "112": 2, "113": 2, "114": 2 },
    features: [
      "台灣頂尖資訊科系，頂尖研究實驗室與全球頂級軟體企業校友網絡",
      "演算法、人工智慧、系統架構與理論計算領域全球知名",
      "特選僅招收少數絕對頂尖的程式/演算法偏才"
    ],
    requirements: {
      minCondition: "國際資訊奧林匹亞研習營/國手、全國資訊學科能力競賽一等獎以上",
      types: ["special_talent"],
      apcsPractice: 5,
      competitions: ["olympiad", "info_contest"],
      languages: []
    },
    evaluation: {
      writtenPercent: 40,
      interviewPercent: 60,
      examPercent: 0,
      description: "審查競賽實績與專題代碼；口試包含白板演算法現場解題與高難度邏輯推導。"
    },
    schedule: {
      history: {
        "112": { apply: "111.11.08 ~ 11.15", exam: "111.12.03", result: "111.12.23" },
        "113": { apply: "112.11.07 ~ 11.14", exam: "112.12.02", result: "112.12.22" },
        "114": { apply: "113.11.05 ~ 11.12", exam: "113.11.30", result: "113.12.20" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "10 月上旬公告",
        apply: "11 月上旬 (約 11/04 ~ 11/12)",
        exam: "11 月底 / 12 月初現場白板口試",
        result: "12 月下旬放榜"
      }
    },
    admissionStandard: "全台特選最高門檻。錄取者幾乎皆為 IOI 國手、TOI 選訓營前段選手或已在 GitHub 有百萬級全球開源貢獻之奇才。",
    tags: ["台大資工", "頂級偏才", "IOI國手", "TOI選訓", "演算法"],
    officialUrl: "https://www.csie.ntu.edu.tw/"
  },
  {
    id: "nycu-csie-apcs",
    school: "國立陽明交通大學",
    dept: "資訊工程學系（APCS組 / 特選組）",
    system: "資訊特選與APCS",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "top",
    tierName: "頂尖頂大",
    region: "north",
    regionName: "北部",
    quota: { "112": 6, "113": 8, "114": 9 },
    features: [
      "全台最大電資與資工聚落，產學合作與矽谷/竹科接軌最緊密",
      "設有專屬「資安專班」外加名額與軟體開發創新實驗室",
      "近三年因應國家資安與AI政策，名額穩定上調"
    ],
    requirements: {
      minCondition: "APCS 觀念4級+實作4級以上，或具備大型軟體開發、資安CTF競賽得獎",
      types: ["general", "special_talent", "autodidact"],
      apcsPractice: 4,
      competitions: ["info_contest", "security_ctf", "olympiad", "startup_patent"],
      languages: []
    },
    evaluation: {
      writtenPercent: 40,
      interviewPercent: 30,
      examPercent: 30,
      description: "含現場上機程式解題測驗（實作演算法），加教授群程式碼複查口試。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.14 ~ 10.21", exam: "111.11.12", result: "111.12.02" },
        "113": { apply: "112.10.13 ~ 10.20", exam: "112.11.11", result: "112.12.01" },
        "114": { apply: "113.10.11 ~ 10.18", exam: "113.11.09", result: "113.11.29" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中旬公告",
        apply: "10 月上中旬 (約 10/11 ~ 10/18)",
        exam: "11 月上旬現場上機測驗",
        result: "11 月底放榜"
      }
    },
    admissionStandard: "APCS 實作成績 4~5 級分是基本門檻。現場 Coding Test 題目難度約 LeetCode Medium 到 Hard，口試會深入追問專案架構。",
    tags: ["交大資工", "APCS組", "現場上機考", "資安外加", "演算法競賽"],
    officialUrl: "https://www.cs.nycu.edu.tw/"
  },
  {
    id: "nthu-csie-special",
    school: "國立清華大學",
    dept: "資訊工程學系（特選組）",
    system: "單系特選",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "top",
    tierName: "頂尖頂大",
    region: "north",
    regionName: "北部",
    quota: { "112": 5, "113": 6, "114": 7 },
    features: [
      "理論與實作並重，AI、量子計算與嵌入式系統強項",
      "鼓勵自學專案、參與國際開源社群及軟體創作",
      "大一可抵免基礎程式設計，直接進修高等演算法或研究專題"
    ],
    requirements: {
      minCondition: "APCS 實作4級分以上，或資訊學科競賽、資安競賽、開源專題成果卓越者",
      types: ["general", "special_talent", "autodidact"],
      apcsPractice: 4,
      competitions: ["info_contest", "security_ctf", "olympiad"],
      languages: []
    },
    evaluation: {
      writtenPercent: 40,
      interviewPercent: 60,
      examPercent: 0,
      description: "審查競賽歷程、GitHub程式碼庫；口試現場出題考思維邏輯與實作架構。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.18 ~ 10.25", exam: "111.11.19", result: "111.12.08" },
        "113": { apply: "112.10.17 ~ 10.24", exam: "112.11.18", result: "112.12.07" },
        "114": { apply: "113.10.15 ~ 10.22", exam: "113.11.16", result: "113.12.06" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中旬公布簡章",
        apply: "10 月中旬 (約 10/14 ~ 10/22)",
        exam: "11 月中旬口試",
        result: "12 月初放榜"
      }
    },
    admissionStandard: "重視學生的「程式自驅力」。若曾自學開發過完整 App、Web 系統、遊戲引擎或資安工具並實際部署上線，在面試中極具競爭力。",
    tags: ["清大資工", "開源專案", "APCS4級以上", "軟體實作", "演算法"],
    officialUrl: "https://www.cs.nthu.edu.tw/"
  },
  {
    id: "ncku-csie",
    school: "國立成功大學",
    dept: "資訊工程學系",
    system: "單系特選",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "top",
    tierName: "頂尖頂大",
    region: "south",
    regionName: "南部",
    quota: { "112": 3, "113": 4, "114": 5 },
    features: [
      "軟硬體整合與系統軟體（OS、編譯器、AI晶片加速）強校",
      "產學鏈結深厚，南台灣資工第一志願",
      "114年增設資安外加名額"
    ],
    requirements: {
      minCondition: "APCS 觀念4+實作3級分以上，或全國資訊競賽、資安實務得獎者",
      types: ["general", "special_talent"],
      apcsPractice: 3,
      competitions: ["info_contest", "security_ctf", "science_fair"],
      languages: []
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "第一階段審查歷程與作品；第二階段進行口試（含程式設計邏輯問答）。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.20 ~ 10.31", exam: "111.11.25", result: "111.12.09" },
        "113": { apply: "112.10.19 ~ 10.30", exam: "112.11.24", result: "112.12.08" },
        "114": { apply: "113.10.17 ~ 10.28", exam: "113.11.22", result: "113.12.06" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月下旬公布簡章",
        apply: "10 月中下旬 (約 10/16 ~ 10/27)",
        exam: "11 月下旬口試",
        result: "12 月初放榜"
      }
    },
    admissionStandard: "重視系統開發經驗與數學基礎。除了 APCS 級分外，若有資安漏洞通報（Bug Bounty）或軟硬體整合專案特別加分。",
    tags: ["成大資工", "系統架構", "APCS", "軟硬整合"],
    officialUrl: "https://www.csie.ncku.edu.tw/"
  },
  {
    id: "ncu-csie",
    school: "國立中央大學",
    dept: "資訊工程學系（含資安專班）",
    system: "資訊特選與資安",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "mid_four",
    tierName: "中字輩國立",
    region: "north",
    regionName: "北部",
    quota: { "112": 4, "113": 5, "114": 6 },
    features: [
      "中字輩資工龍頭，鄰近大台北與桃園科技聚落",
      "設有現場專業上機測驗，評選最客觀真實",
      "軟體工程、網路安全、雲端計算重點培育"
    ],
    requirements: {
      minCondition: "APCS 實作達3~4級分，或資安CTF、程式競賽獲獎",
      types: ["general", "special_talent", "autodidact"],
      apcsPractice: 3,
      competitions: ["info_contest", "security_ctf", "science_fair"],
      languages: []
    },
    evaluation: {
      writtenPercent: 30,
      interviewPercent: 30,
      examPercent: 40,
      description: "關鍵在上機實作考（以 C/C++、Python 現場解演算法題目），測驗扎實度。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.25 ~ 11.03", exam: "111.11.26", result: "111.12.08" },
        "113": { apply: "112.10.24 ~ 11.02", exam: "112.11.25", result: "112.12.07" },
        "114": { apply: "113.10.22 ~ 10.31", exam: "113.11.23", result: "113.12.05" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月下旬公布簡章",
        apply: "10 月下旬 (約 10/21 ~ 10/30)",
        exam: "11 月下旬現場上機考試",
        result: "12 月初放榜"
      }
    },
    admissionStandard: "上機考（Coding Test）佔分達 40%，直接考驗現場寫 Code 能力，能寫出高效能時間複雜度演算法者勝出。",
    tags: ["中央資工", "現場上機考", "資安專班", "中字輩首選", "實作比重大"],
    officialUrl: "https://www.csie.ncu.edu.tw/"
  },
  {
    id: "ccu-csie-security",
    school: "國立中正大學",
    dept: "資訊工程學系（資安組 / 智慧運算組）",
    system: "資安人才專案",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "mid_four",
    tierName: "中字輩國立",
    region: "central",
    regionName: "中部",
    quota: { "112": 6, "113": 8, "114": 10 },
    features: [
      "台灣頂尖資安研究重鎮，教育部資安前瞻基地",
      "近三年名額擴大最多之資訊科系之一，資安組名額豐富",
      "擁有專業資安攻防靶場與高規格實習場域"
    ],
    requirements: {
      minCondition: "APCS 實作3級分以上，或具備資安實務（CTF、逆向工程、Web安全）經驗",
      types: ["general", "special_talent", "disadvantaged"],
      apcsPractice: 3,
      competitions: ["security_ctf", "info_contest"],
      languages: []
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "書面資料詳細審核安全技術分析報告；面試重點探討資安倫理與技術深度。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.25 ~ 11.07", exam: "111.11.26", result: "111.12.16" },
        "113": { apply: "112.10.24 ~ 11.06", exam: "112.11.25", result: "112.12.15" },
        "114": { apply: "113.10.22 ~ 11.04", exam: "113.11.23", result: "113.12.13" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月下旬公布簡章",
        apply: "10 月下旬至 11 月初 (約 10/21 ~ 11/04)",
        exam: "11 月下旬面試",
        result: "12 月中旬放榜"
      }
    },
    admissionStandard: "對於熱愛資安、滲透測試、逆向工程、白帽技術的高中生極具吸引力。若有參加 AIS3、MyFirstCTF 經驗者錄取機率大幅提升。",
    tags: ["中正資工", "資安專班", "CTF搶旗賽", "名額大增", "中字輩"],
    officialUrl: "https://www.cs.ccu.edu.tw/"
  },
  {
    id: "ntnu-csie",
    school: "國立臺灣師範大學",
    dept: "資訊工程學系",
    system: "單系特選",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "normal_univ",
    tierName: "師範與指標國立",
    region: "north",
    regionName: "北部",
    quota: { "112": 4, "113": 4, "114": 5 },
    features: [
      "北市蛋黃區，與台大、台科大共享「台灣大學系統」跨校選課與社團資源",
      "人工智慧、自然語言處理（NLP）、電腦視覺強項",
      "雙向培育：頂尖科技研發工程師或高中小學資訊頂尖師資"
    ],
    requirements: {
      minCondition: "APCS 觀念4+實作3級分，或國際/全國資訊科技相關競賽獲獎",
      types: ["general", "special_talent"],
      apcsPractice: 3,
      competitions: ["info_contest", "olympiad", "science_fair"],
      languages: []
    },
    evaluation: {
      writtenPercent: 40,
      interviewPercent: 60,
      examPercent: 0,
      description: "審查專題作品；口試採個人面試，包含程式專業提問與專題演示。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.21 ~ 11.02", exam: "111.11.26", result: "111.12.09" },
        "113": { apply: "112.10.20 ~ 11.01", exam: "112.11.25", result: "112.12.08" },
        "114": { apply: "113.10.18 ~ 10.30", exam: "113.11.23", result: "113.12.06" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月下旬公布簡章",
        apply: "10 月中下旬 (約 10/17 ~ 10/29)",
        exam: "11 月下旬口試",
        result: "12 月初放榜"
      }
    },
    admissionStandard: "重視學生的表達清晰度與專案完成度。能條理分明地講解自己寫過的演算法與系統架構，給分極高。",
    tags: ["台師大資工", "台北市中心", "台大系統跨校", "NLP與AI"],
    officialUrl: "https://www.csie.ntnu.edu.tw/"
  },
  {
    id: "yzu-csie",
    school: "元智大學",
    dept: "資訊工程學系",
    system: "私校頂尖資工",
    category: "cs_ai_security",
    categoryName: "資訊/資安/電資",
    tier: "private_top",
    tierName: "優質私立",
    region: "north",
    regionName: "北部",
    quota: { "112": 6, "113": 8, "114": 10 },
    features: [
      "遠東集團支持，全英語授課學程完善，產學合作緊密",
      "私校中資訊工程極具口碑，軟體實務訓練紮實，特選名額充裕",
      "提供程式特優新生高額獎學金（最高學雜費全免）"
    ],
    requirements: {
      minCondition: "APCS 實作2~3級分，或高中職程式設計得獎、資訊專題成果",
      types: ["general", "special_talent", "autodidact"],
      apcsPractice: 2,
      competitions: ["info_contest", "science_fair", "startup_patent"],
      languages: []
    },
    evaluation: {
      writtenPercent: 50,
      interviewPercent: 50,
      examPercent: 0,
      description: "書審評估作品集實作水準；口試了解學習熱忱與實務問題解決能力。"
    },
    schedule: {
      history: {
        "112": { apply: "111.10.17 ~ 11.14", exam: "111.11.26", result: "111.12.02" },
        "113": { apply: "112.10.16 ~ 11.13", exam: "112.11.25", result: "112.12.01" },
        "114": { apply: "113.10.14 ~ 11.11", exam: "113.11.23", result: "113.11.29" }
      },
      currentStatus: "各校簡章陸續公告中",
      estimated: {
        brochure: "9 月中旬公布簡章",
        apply: "10 月中旬至 11 月上旬 (約 10/14 ~ 11/11)",
        exam: "11 月下旬口試",
        result: "11 月底放榜"
      }
    },
    admissionStandard: "門檻較國立頂大親民，非常適合 APCS 2~3 級分或高中曾做過完整專案、科展但學科成績不拔尖的實作型同學作為保底。",
    tags: ["元智資工", "優質私校", "高額獎學金", "實作型保底", "英語學程"],
    officialUrl: "https://www.cs.yzu.edu.tw/"
  }
];

// 全國特殊選才重要日程表與推估數據
const NATIONAL_SCHEDULE = {
  currentStatus: "各校簡章陸續公告中",
  phases: [
    {
      name: "1. 各大學簡章公告期",
      period: "每年 9 月中下旬 ～ 10 月初",
      history112: "111.09.20 前後公布",
      history113: "112.09.18 前後公布",
      history114: "113.09.16 前後全面公布 (確切公告)",
      estimatedThisYear: "9 月中旬 ～ 9 月底全面上線",
      actionGuidance: "密切鎖定大學甄選委員會特選專區及目標大學首頁，下載各系組分則 PDF，確認報考資格與備審格式要求。"
    },
    {
      name: "2. 網路報名與備審上傳",
      period: "每年 10 月中旬 ～ 11 月上旬 (各校約開放 1~2 週)",
      history112: "111.10.17 ～ 11.04",
      history113: "112.10.16 ～ 11.03",
      history114: "113.10.14 ～ 11.01",
      estimatedThisYear: "10 月中旬開放線上繳件 (預估 10/14 ～ 11/04)",
      actionGuidance: "於各校獨立報名系統填寫志願、繳納報名費，並將 PDF 格式的自傳、讀書計畫、作品集與競賽證明上傳。"
    },
    {
      name: "3. 第一階段公布與複試甄試",
      period: "每年 11 月中旬 ～ 12 月上旬",
      history112: "111.11.18 ～ 12.04",
      history113: "112.11.17 ～ 12.03",
      history114: "113.11.15 ～ 12.01",
      estimatedThisYear: "11 月中下旬 (預估 11/15 ～ 11/30 舉行)",
      actionGuidance: "通過書審初試者到校參加面試、白板解題、上機實作或作品理念口試（注意防範各校面試撞期）。"
    },
    {
      name: "4. 正備取名單放榜",
      period: "每年 12 月上旬 ～ 12 月中旬",
      history112: "111.12.02 ～ 12.16 陸續放榜",
      history113: "112.12.01 ～ 12.15 陸續放榜",
      history114: "113.11.29 ～ 12.13 陸續放榜",
      estimatedThisYear: "12 月初 ～ 12 月中旬全面放榜",
      actionGuidance: "查詢錄取結果。若獲正取，依學校規定時間完成通訊或現場報到手續；備取生留意遞補通知。"
    },
    {
      name: "5. 錄取生報到與放棄截止",
      period: "每年 12 月底 ～ 隔年 1 月中旬 (學測前夕)",
      history112: "111.12.28 報到 / 112.01.16 放棄截止",
      history113: "112.12.26 報到 / 113.01.15 放棄截止",
      history114: "113.12.24 報到 / 114.01.14 放棄截止",
      estimatedThisYear: "12 月底報到完畢 / 隔年 1 月中旬前放棄截止",
      actionGuidance: "【重要法規】若已報到特選校系，未在規定期限內簽署放棄切結書者，不得參加繁星推薦與個人申請！"
    }
  ]
};

// 條件選項與對應元數據
const FILTER_OPTIONS = {
  categories: [
    { id: "all", name: "全部學群" },
    { id: "cross_discipline", name: "跨領域與不分系" },
    { id: "cs_ai_security", name: "資訊/資安/電資" },
    { id: "pure_science", name: "數理基礎科學" },
    { id: "humanities_social", name: "人文社會與外語" },
    { id: "art_design", name: "藝術設計與建築" },
    { id: "bio_medical", name: "生醫農學" }
  ],
  tiers: [
    { id: "all", name: "全部學校層級" },
    { id: "top", name: "頂尖頂大（台清交成政）" },
    { id: "mid_four", name: "中字輩國立（中央/中正/中興/中山）" },
    { id: "normal_univ", name: "師範與指標國立" },
    { id: "art_special", name: "藝術獨立專門校" },
    { id: "private_top", name: "優質私立大學" }
  ],
  regions: [
    { id: "all", name: "全部區域" },
    { id: "north", name: "北部地區" },
    { id: "central", name: "中部地區" },
    { id: "south", name: "南部地區" }
  ],
  backgrounds: [
    { id: "general", name: "一般高中生" },
    { id: "experimental", name: "非學校型態實驗教育" },
    { id: "autodidact", name: "個人自學生" },
    { id: "disadvantaged", name: "經濟弱勢 / 願景扶助" },
    { id: "new_resident", name: "新住民子女" },
    { id: "overseas", name: "境外台生 / 國際僑生" }
  ],
  competitions: [
    { id: "olympiad", name: "國際/全國學科奧林匹亞選訓營或國手" },
    { id: "science_fair", name: "全國科展 / 台灣國際科展 (TISF) 前三名 / 市級科展佳作以上" },
    { id: "wang_hong", name: "旺宏科學獎 / 青年科學獎" },
    { id: "info_contest", name: "全國高中資訊學科能力競賽決賽 / 校內資訊獎狀" },
    { id: "security_ctf", name: "資安技能競賽 (CTF/AIS3/MyFirstCTF)" },
    { id: "literature", name: "全國文學獎 / 地方文學獎 / 出版專書" },
    { id: "debate_mun", name: "全國高中辯論比賽得獎 / 模聯優秀代表" },
    { id: "art_design", name: "鋼琴音樂檢定 / 數位藝術 / 原創作品集" },
    { id: "startup_patent", name: "專利發明 / 創新創業 / 開源專案 (GitHub Star)" }
  ],
  languages: [
    { id: "toeic_gold", name: "多益金色證書 (860+)" },
    { id: "ielts_65", name: "雅思 6.5+ / 托福 85+" },
    { id: "jlpt_n2_n1", name: "日語檢定 JLPT N2 / N1" },
    { id: "rare_languages", name: "稀有語種能力（越語、泰語、阿語、德法西等）" }
  ]
};
