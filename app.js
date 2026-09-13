/**
 * 大學特殊選才「落點探索與數據導航」核心邏輯
 */

// 全局狀態管理
const state = {
  db: [...ADMISSION_DATABASE],
  filters: {
    keyword: "",
    category: "all",
    tier: "all",
    region: "all",
    background: "general",
    apcsConcept: 0,
    apcsPractice: 0,
    competitions: [],
    languages: [],
    sortBy: "fit"
  },
  bookmarks: JSON.parse(localStorage.getItem("special_admission_bookmarks") || "[]"),
  compareList: []
};

// 初始化頁面
document.addEventListener("DOMContentLoaded", () => {
  renderFilterOptions();
  bindEvents();
  applyFiltersAndRender();
  updateBookmarkBadge();
  updateCompareBadge();
});

// 動態渲染側邊欄篩選項目
function renderFilterOptions() {
  // 學群選單
  const catSelect = document.getElementById("filter-category");
  if (catSelect) {
    catSelect.innerHTML = FILTER_OPTIONS.categories.map(c => 
      `<option value="${c.id}">${c.name}</option>`
    ).join("");
  }

  // 學校層級選單
  const tierSelect = document.getElementById("filter-tier");
  if (tierSelect) {
    tierSelect.innerHTML = FILTER_OPTIONS.tiers.map(t => 
      `<option value="${t.id}">${t.name}</option>`
    ).join("");
  }

  // 地區選單
  const regionSelect = document.getElementById("filter-region");
  if (regionSelect) {
    regionSelect.innerHTML = FILTER_OPTIONS.regions.map(r => 
      `<option value="${r.id}">${r.name}</option>`
    ).join("");
  }

  // 身分背景選單
  const bgSelect = document.getElementById("filter-background");
  if (bgSelect) {
    bgSelect.innerHTML = FILTER_OPTIONS.backgrounds.map(b => 
      `<option value="${b.id}">${b.name}</option>`
    ).join("");
  }

  // 競賽與獲獎多選框
  const compContainer = document.getElementById("competitions-checkboxes");
  if (compContainer) {
    compContainer.innerHTML = FILTER_OPTIONS.competitions.map(c => `
      <label class="checkbox-item">
        <input type="checkbox" value="${c.id}" class="comp-cb">
        <span>${c.name}</span>
      </label>
    `).join("");
  }

  // 語文能力多選框
  const langContainer = document.getElementById("languages-checkboxes");
  if (langContainer) {
    langContainer.innerHTML = FILTER_OPTIONS.languages.map(l => `
      <label class="checkbox-item">
        <input type="checkbox" value="${l.id}" class="lang-cb">
        <span>${l.name}</span>
      </label>
    `).join("");
  }
}

// 事件綁定
function bindEvents() {
  // 關鍵字搜尋
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.filters.keyword = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }

  // 下拉選單過濾
  document.getElementById("filter-category").addEventListener("change", (e) => {
    state.filters.category = e.target.value;
    applyFiltersAndRender();
  });

  document.getElementById("filter-tier").addEventListener("change", (e) => {
    state.filters.tier = e.target.value;
    applyFiltersAndRender();
  });

  document.getElementById("filter-region").addEventListener("change", (e) => {
    state.filters.region = e.target.value;
    applyFiltersAndRender();
  });

  document.getElementById("filter-background").addEventListener("change", (e) => {
    state.filters.background = e.target.value;
    applyFiltersAndRender();
  });

  // 排序下拉
  document.getElementById("sort-select").addEventListener("change", (e) => {
    state.filters.sortBy = e.target.value;
    applyFiltersAndRender();
  });

  // APCS 變動
  document.getElementById("apcs-concept").addEventListener("change", (e) => {
    state.filters.apcsConcept = parseInt(e.target.value, 10);
    applyFiltersAndRender();
  });
  document.getElementById("apcs-practice").addEventListener("change", (e) => {
    state.filters.apcsPractice = parseInt(e.target.value, 10);
    applyFiltersAndRender();
  });

  // 競賽多選
  document.querySelectorAll(".comp-cb").forEach(cb => {
    cb.addEventListener("change", () => {
      state.filters.competitions = Array.from(document.querySelectorAll(".comp-cb:checked")).map(c => c.value);
      applyFiltersAndRender();
    });
  });

  // 語文多選
  document.querySelectorAll(".lang-cb").forEach(cb => {
    cb.addEventListener("change", () => {
      state.filters.languages = Array.from(document.querySelectorAll(".lang-cb:checked")).map(c => c.value);
      applyFiltersAndRender();
    });
  });

  // 重置條件按鈕
  document.getElementById("btn-reset-filters").addEventListener("click", resetAllFilters);

  // 手機版篩選面板展開/收合開關
  const mobileToggleBtn = document.getElementById("btn-toggle-filters");
  const matcherPanel = document.getElementById("matcher-panel");
  const arrowEl = document.getElementById("toggle-filter-arrow");
  if (mobileToggleBtn && matcherPanel) {
    mobileToggleBtn.addEventListener("click", () => {
      const isOpen = matcherPanel.classList.toggle("is-open");
      if (arrowEl) arrowEl.innerText = isOpen ? "▲" : "▼";
    });
  }

  // 重要日程開關
  const scheduleBtn = document.getElementById("btn-view-schedule");
  if (scheduleBtn) {
    scheduleBtn.addEventListener("click", openScheduleModal);
  }

  // 收藏清單抽屜開關
  document.getElementById("btn-view-bookmarks").addEventListener("click", openBookmarksModal);
  // 對比清單開關
  document.getElementById("btn-view-compare").addEventListener("click", openCompareModal);

  // 匯出 / 匯入資料按鈕
  document.getElementById("btn-export-data").addEventListener("click", exportUserData);
  document.getElementById("btn-import-trigger").addEventListener("click", () => {
    document.getElementById("file-import").click();
  });
  document.getElementById("file-import").addEventListener("change", handleImportUserData);
}

// 重置所有條件
function resetAllFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("filter-category").value = "all";
  document.getElementById("filter-tier").value = "all";
  document.getElementById("filter-region").value = "all";
  document.getElementById("filter-background").value = "general";
  document.getElementById("apcs-concept").value = "0";
  document.getElementById("apcs-practice").value = "0";
  document.querySelectorAll(".comp-cb").forEach(c => c.checked = false);
  document.querySelectorAll(".lang-cb").forEach(c => c.checked = false);

  state.filters = {
    keyword: "",
    category: "all",
    tier: "all",
    region: "all",
    background: "general",
    apcsConcept: 0,
    apcsPractice: 0,
    competitions: [],
    languages: [],
    sortBy: "fit"
  };

  applyFiltersAndRender();
}

/**
 * 智慧適配度評分引擎 (Fit Score Engine)
 */
function calculateFitScore(dept, user) {
  let score = 50; // 基礎基準分

  // 1. 領域契合加權
  if (user.category !== "all") {
    if (dept.category === user.category) {
      score += 20;
    } else {
      score -= 15;
    }
  }

  // 2. 身分背景契合度 (實驗教育、自學生、弱勢等)
  if (dept.requirements.types.includes(user.background)) {
    score += 15;
  }

  // 3. APCS 實作能力契合度
  if (dept.requirements.apcsPractice > 0) {
    if (user.apcsPractice >= dept.requirements.apcsPractice) {
      const bonus = (user.apcsPractice - dept.requirements.apcsPractice) * 5;
      score += (20 + bonus);
    } else if (user.apcsPractice > 0) {
      score -= (dept.requirements.apcsPractice - user.apcsPractice) * 10;
    } else {
      score -= 25;
    }
  }

  // 4. 競賽獲獎契合度 (科展、鋼琴、資訊獎等)
  let matchedCompetitions = 0;
  if (user.competitions && user.competitions.length > 0) {
    user.competitions.forEach(c => {
      if (dept.requirements.competitions && dept.requirements.competitions.includes(c)) {
        matchedCompetitions++;
      }
    });
    if (matchedCompetitions > 0) {
      score += Math.min(25, matchedCompetitions * 12);
    }
  }

  // 5. 外語能力加分
  if (user.languages && user.languages.length > 0) {
    let matchedLang = false;
    user.languages.forEach(l => {
      if (dept.requirements.languages && (dept.requirements.languages.includes(l) || dept.requirements.languages.includes("any_high"))) {
        matchedLang = true;
      }
    });
    if (matchedLang) {
      score += 10;
    }
  }

  // 6. 學校層級偏好調整
  if (user.tier !== "all" && dept.tier === user.tier) {
    score += 8;
  }

  score = Math.max(30, Math.min(98, Math.round(score)));
  return score;
}

// 執行過濾與排序，並渲染卡片網格
function applyFiltersAndRender() {
  const { keyword, category, tier, region, sortBy } = state.filters;

  // 1. 基礎篩選
  let results = state.db.filter(item => {
    // 關鍵字檢索 (校名、系名、標籤、特色)
    if (keyword) {
      const searchTarget = `${item.school} ${item.dept} ${item.features.join(" ")} ${item.tags.join(" ")} ${item.admissionStandard}`.toLowerCase();
      if (!searchTarget.includes(keyword)) return false;
    }

    // 學群篩選
    if (category !== "all" && item.category !== category) return false;

    // 學校層級
    if (tier !== "all" && item.tier !== tier) return false;

    // 區域
    if (region !== "all" && item.region !== region) return false;

    return true;
  });

  // 2. 計算適配度分數
  results = results.map(item => ({
    ...item,
    fitScore: calculateFitScore(item, state.filters)
  }));

  // 3. 排序
  if (sortBy === "fit") {
    results.sort((a, b) => b.fitScore - a.fitScore);
  } else if (sortBy === "quota114") {
    results.sort((a, b) => b.quota["114"] - a.quota["114"]);
  } else if (sortBy === "growth") {
    results.sort((a, b) => {
      const growthA = a.quota["114"] - a.quota["112"];
      const growthB = b.quota["114"] - b.quota["112"];
      return growthB - growthA;
    });
  }

  // 4. 更新結果數量與活躍標籤
  updateResultHeader(results.length);

  // 5. 渲染卡片
  renderCards(results);
}

// 更新活躍標籤與統計數
function updateResultHeader(count) {
  const countEl = document.getElementById("results-count");
  if (countEl) countEl.innerText = count;

  const chipsContainer = document.getElementById("active-filter-chips");
  if (!chipsContainer) return;

  const chips = [];
  if (state.filters.keyword) chips.push(`關鍵字: ${state.filters.keyword}`);
  if (state.filters.category !== "all") {
    const cObj = FILTER_OPTIONS.categories.find(c => c.id === state.filters.category);
    if (cObj) chips.push(cObj.name);
  }
  if (state.filters.tier !== "all") {
    const tObj = FILTER_OPTIONS.tiers.find(t => t.id === state.filters.tier);
    if (tObj) chips.push(tObj.name);
  }
  if (state.filters.region !== "all") {
    const rObj = FILTER_OPTIONS.regions.find(r => r.id === state.filters.region);
    if (rObj) chips.push(rObj.name);
  }
  if (state.filters.apcsPractice > 0) chips.push(`APCS實作: ${state.filters.apcsPractice}級`);
  if (state.filters.competitions.length > 0) chips.push(`已選競賽/成果 (${state.filters.competitions.length})`);
  if (state.filters.languages.length > 0) chips.push(`已選外語 (${state.filters.languages.length})`);

  chipsContainer.innerHTML = chips.map(text => `
    <span class="filter-chip">${text}</span>
  `).join("");

  // 更新手機版篩選徽章
  const mobileBadge = document.getElementById("mobile-filter-badge");
  if (mobileBadge) {
    const totalActive = chips.length;
    mobileBadge.innerText = totalActive > 0 ? `已套用 ${totalActive} 項條件` : "展開篩選";
    mobileBadge.style.background = totalActive > 0 ? "#2563eb" : "#e2e8f0";
    mobileBadge.style.color = totalActive > 0 ? "#ffffff" : "#334155";
  }
}

// 渲染科系卡片列表
function renderCards(departments) {
  const container = document.getElementById("cards-container");
  if (!container) return;

  if (departments.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3 style="font-size: 1.1rem; color: #475569; margin-bottom: 8px;">查無符合條件之校系</h3>
        <p style="color: #94a3b8; font-size: 0.875rem;">建議放寬學校層級、區域或條件門檻，或點擊「重置條件」。</p>
      </div>
    `;
    return;
  }

  container.innerHTML = departments.map(d => {
    // 契合度標籤樣式
    let fitClass = "fit-challenge";
    let fitText = "可挑戰衝刺";
    if (d.fitScore >= 80) {
      fitClass = "fit-high";
      fitText = "高度契合 / 主力推薦";
    } else if (d.fitScore >= 65) {
      fitClass = "fit-medium";
      fitText = "具競爭力";
    }

    // 名額趨勢計算
    const quotaDiff = d.quota["114"] - d.quota["112"];
    let trendBadge = `<span class="quota-trend trend-same">持平</span>`;
    if (quotaDiff > 0) {
      trendBadge = `<span class="quota-trend trend-up">⬆ 增加 ${quotaDiff} 席</span>`;
    } else if (quotaDiff < 0) {
      trendBadge = `<span class="quota-trend" style="background:#fee2e2;color:#991b1b">⬇ 減少 ${Math.abs(quotaDiff)} 席</span>`;
    }

    const isBookmarked = state.bookmarks.includes(d.id);
    const isCompared = state.compareList.includes(d.id);

    // 時程標記
    const applyTimeline = (d.schedule && d.schedule.estimated) ? d.schedule.estimated.apply : "預估 10 月中旬報名";
    const statusTag = (d.schedule && d.schedule.currentStatus) ? d.schedule.currentStatus : "即將公告";

    return `
      <div class="card" data-id="${d.id}">
        <div>
          <div class="card-top">
            <div class="school-dept">
              <div class="school-name">
                <span>${d.school}</span>
                <span class="badge" style="background:#e2e8f0;color:#475569">${d.tierName}</span>
                <span class="badge" style="background:#f1f5f9;color:#64748b">${d.regionName}</span>
              </div>
              <h3 class="dept-name">${d.dept}</h3>
            </div>
            <div class="fit-badge ${fitClass}">
              <span>${d.fitScore}%</span>
              <span style="font-size: 0.7rem; font-weight: normal;">${fitText}</span>
            </div>
          </div>

          <!-- 近三年名額橫幅 -->
          <div class="quota-banner">
            <div class="quota-item">
              <div class="quota-label">112 年</div>
              <div class="quota-value" style="font-size:0.95rem; color:#64748b">${d.quota["112"]} 名</div>
            </div>
            <div style="color:#cbd5e1;font-size:0.8rem;">➔</div>
            <div class="quota-item">
              <div class="quota-label">113 年</div>
              <div class="quota-value" style="font-size:0.95rem; color:#64748b">${d.quota["113"]} 名</div>
            </div>
            <div style="color:#cbd5e1;font-size:0.8rem;">➔</div>
            <div class="quota-item">
              <div class="quota-label">114 最新</div>
              <div class="quota-value" style="color:#2563eb">${d.quota["114"]} 名</div>
            </div>
            <div>${trendBadge}</div>
          </div>

          <!-- 特色摘要 -->
          <ul class="features-list">
            ${d.features.slice(0, 2).map(f => `<li>${f}</li>`).join("")}
          </ul>

          <!-- 日程快訊標籤 -->
          <div style="font-size: 0.75rem; color: #0369a1; background: #e0f2fe; padding: 6px 10px; border-radius: 6px; margin: 8px 0; display: flex; align-items: center; justify-content: space-between;">
            <span>📅 <strong>重要時程</strong>：${applyTimeline}</span>
            <span class="badge" style="background: white; color: #0284c7; border: 1px solid #bae6fd;">${statusTag}</span>
          </div>

          <!-- 評分比重進度條 -->
          <div class="weight-bar-container">
            <div class="weight-labels">
              <span>評分比重：書審 ${d.evaluation.writtenPercent}% ｜ 面試 ${d.evaluation.interviewPercent}% ${d.evaluation.examPercent > 0 ? `｜ 筆試/實作 ${d.evaluation.examPercent}%` : ''}</span>
            </div>
            <div class="weight-bar">
              <div class="weight-written" style="width: ${d.evaluation.writtenPercent}%" title="書審 ${d.evaluation.writtenPercent}%"></div>
              <div class="weight-interview" style="width: ${d.evaluation.interviewPercent}%" title="面試 ${d.evaluation.interviewPercent}%"></div>
              <div class="weight-exam" style="width: ${d.evaluation.examPercent}%" title="筆試/實作 ${d.evaluation.examPercent}%"></div>
            </div>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary" style="flex:1" onclick="openDetailModal('${d.id}')">
            簡章與錄取分析
          </button>
          <button class="btn btn-outline" style="padding: 8px;" onclick="toggleBookmark('${d.id}')" title="加入志願收藏">
            ${isBookmarked ? '★ 已收藏' : '☆ 收藏'}
          </button>
          <button class="btn btn-outline" style="padding: 8px;" onclick="toggleCompare('${d.id}')" title="加入橫向對比">
            ${isCompared ? '✓ 對比中' : '＋ 對比'}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// 開啟系所詳情 Modal
function openDetailModal(id) {
  const d = state.db.find(item => item.id === id);
  if (!d) return;

  const modal = document.getElementById("detail-modal");
  const modalContent = document.getElementById("modal-detail-content");
  if (!modal || !modalContent) return;

  // 組織歷史時程資料
  const hist = (d.schedule && d.schedule.history) ? d.schedule.history : {
    "112": { apply: "111 年 10 月中旬", exam: "111 年 11 月下旬", result: "111 年 12 月上旬" },
    "113": { apply: "112 年 10 月中旬", exam: "112 年 11 月下旬", result: "112 年 12 月上旬" },
    "114": { apply: "113 年 10 月中旬", exam: "113 年 11 月下旬", result: "113 年 12 月上旬" }
  };

  const est = (d.schedule && d.schedule.estimated) ? d.schedule.estimated : {
    brochure: "每年 9 月中下旬公告簡章",
    apply: "每年 10 月中旬線上報名繳件",
    exam: "每年 11 月中下旬口試實作",
    result: "每年 12 月初公告放榜"
  };

  modalContent.innerHTML = `
    <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 16px; margin-bottom: 20px;">
      <div style="display:flex; gap:8px; align-items:center; margin-bottom: 6px;">
        <span class="badge" style="background:#dbeafe; color:#1e40af; font-size:0.8rem;">${d.categoryName}</span>
        <span class="badge" style="background:#e2e8f0; color:#334155; font-size:0.8rem;">${d.tierName}</span>
        <span class="badge" style="background:#f1f5f9; color:#64748b; font-size:0.8rem;">${d.regionName}</span>
      </div>
      <h2 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">${d.school} - ${d.dept}</h2>
      <div style="color: #64748b; font-size: 0.875rem; margin-top: 4px;">招考軌道：${d.system}</div>
    </div>

    <!-- 📅 歷年重要時程演變與今年日期推估 -->
    <div class="info-block" style="background: #f0fdf4; border-color: #bbf7d0;">
      <div class="info-block-title" style="color: #166534;">
        <span>📅</span> 歷年重要日期與最新時程推估
      </div>
      <div style="overflow-x:auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; margin-top: 8px; background: white; border-radius: 6px;">
          <thead>
            <tr style="background:#dcfce7; text-align:left; color:#14532d;">
              <th style="padding:6px 10px;">學年度</th>
              <th style="padding:6px 10px;">網路報名與繳件</th>
              <th style="padding:6px 10px;">複試口試 / 測驗</th>
              <th style="padding:6px 10px;">錄取名單放榜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0; font-weight:600;">112 學年度</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["112"].apply}</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["112"].exam}</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["112"].result}</td>
            </tr>
            <tr>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0; font-weight:600;">113 學年度</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["113"].apply}</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["113"].exam}</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["113"].result}</td>
            </tr>
            <tr>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0; font-weight:600;">114 學年度 (確切已公告)</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["114"].apply}</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["114"].exam}</td>
              <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${hist["114"].result}</td>
            </tr>
            <tr style="font-weight: bold; background: #ecfdf5; color:#15803d;">
              <td style="padding:8px 10px;">今年度推估日程</td>
              <td style="padding:8px 10px;">${est.apply}</td>
              <td style="padding:8px 10px;">${est.exam}</td>
              <td style="padding:8px 10px;">${est.result}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="font-size:0.75rem; color:#15803d; margin-top:8px;">
        💡 <strong>貼心提醒</strong>：簡章公布通常在 9 月下旬，各校報名約於 10 月中旬啟動，請把握 9~10 月初備妥高中科展報告、鋼琴證書與自傳成果！
      </div>
    </div>

    <!-- 近三年名額歷史比較表 -->
    <div class="info-block">
      <div class="info-block-title">📊 近三年招收名額演變</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem; margin-top: 8px;">
        <thead>
          <tr style="background:#e2e8f0; text-align:left;">
            <th style="padding:6px 10px;">學年度</th>
            <th style="padding:6px 10px;">招收名額</th>
            <th style="padding:6px 10px;">名額趨勢</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">112 學年度</td>
            <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${d.quota["112"]} 名</td>
            <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">基準年</td>
          </tr>
          <tr>
            <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">113 學年度</td>
            <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${d.quota["113"]} 名</td>
            <td style="padding:6px 10px; border-bottom:1px solid #e2e8f0;">${d.quota["113"] >= d.quota["112"] ? `+${d.quota["113"] - d.quota["112"]}` : `${d.quota["113"] - d.quota["112"]}`} 名</td>
          </tr>
          <tr style="font-weight: bold; background: #eff6ff;">
            <td style="padding:6px 10px;">114 學年度 (最新)</td>
            <td style="padding:6px 10px; color:#2563eb;">${d.quota["114"]} 名</td>
            <td style="padding:6px 10px; color:#2563eb;">三年淨增長 ${d.quota["114"] - d.quota["112"] >= 0 ? `+${d.quota["114"] - d.quota["112"]}` : `${d.quota["114"] - d.quota["112"]}`} 名</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 審查比重與指定項目 -->
    <div class="info-block">
      <div class="info-block-title">⚖️ 甄選評分項目與佔比</div>
      <div style="display:flex; gap:16px; margin: 10px 0;">
        <div style="flex:1; background:white; padding:10px; border-radius:8px; border:1px solid #cbd5e1; text-align:center;">
          <div style="font-size:0.75rem; color:#64748b">書面審查</div>
          <div style="font-size:1.3rem; font-weight:800; color:#3b82f6;">${d.evaluation.writtenPercent}%</div>
        </div>
        <div style="flex:1; background:white; padding:10px; border-radius:8px; border:1px solid #cbd5e1; text-align:center;">
          <div style="font-size:0.75rem; color:#64748b">口試 / 面談</div>
          <div style="font-size:1.3rem; font-weight:800; color:#10b981;">${d.evaluation.interviewPercent}%</div>
        </div>
        ${d.evaluation.examPercent > 0 ? `
          <div style="flex:1; background:white; padding:10px; border-radius:8px; border:1px solid #cbd5e1; text-align:center;">
            <div style="font-size:0.75rem; color:#64748b">現場實作 / 筆試</div>
            <div style="font-size:1.3rem; font-weight:800; color:#f59e0b;">${d.evaluation.examPercent}%</div>
          </div>
        ` : ''}
      </div>
      <div style="font-size:0.875rem; color:#334155; line-height:1.6;">${d.evaluation.description}</div>
    </div>

    <!-- 報考資格與硬性條件 -->
    <div class="info-block">
      <div class="info-block-title">🎯 資格門檻與必備條件</div>
      <p style="font-size: 0.875rem; color: #1e293b; font-weight: 600;">${d.requirements.minCondition}</p>
      ${d.requirements.apcsPractice > 0 ? `
        <div style="margin-top:8px; font-size:0.8125rem; color:#b45309; background:#fef3c7; padding:6px 10px; border-radius:6px; display:inline-block;">
          ⚠️ 建議 APCS 實作題需達 <strong>${d.requirements.apcsPractice} 級分以上</strong>
        </div>
      ` : ''}
    </div>

    <!-- 歷屆錄取標準與面試拆解 -->
    <div class="info-block" style="background: #faf5ff; border-color: #e9d5ff;">
      <div class="info-block-title" style="color: #6b21a8;">💡 評審視角：歷年錄取核心與面試攻略</div>
      <p style="font-size: 0.875rem; color: #4c1d95; line-height: 1.7;">
        ${d.admissionStandard}
      </p>
    </div>

    <!-- 標籤群 -->
    <div style="display:flex; flex-wrap:wrap; gap:6px;">
      ${d.tags.map(t => `<span style="background:#f1f5f9; color:#475569; font-size:0.75rem; padding:3px 8px; border-radius:4px;">#${t}</span>`).join("")}
    </div>

    <!-- 底部操作按鈕 -->
    <div style="display: flex; justify-content: space-between; align-items:center; margin-top: 10px; padding-top: 14px; border-top: 1px solid var(--border-color);">
      <a href="${d.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.8125rem;">
        🔗 前往該校系特選官方專頁 ↗
      </a>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline" onclick="toggleBookmark('${d.id}')">
          ${state.bookmarks.includes(d.id) ? '★ 取消收藏' : '☆ 收藏至願望清單'}
        </button>
        <button class="btn btn-primary" onclick="closeModal('detail-modal')">
          關閉
        </button>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

// 開啟全國統一歷年日程 Modal
function openScheduleModal() {
  const modal = document.getElementById("schedule-modal");
  const body = document.getElementById("modal-schedule-body");
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
      <div style="font-weight: 700; color: #1e40af; font-size: 0.95rem;">📢 升大學特殊選才 全國關鍵五大時程推移總表</div>
      <div style="font-size: 0.8125rem; color: #1e3a8a; margin-top: 4px;">
        特殊選才每年時程非常穩定（9月中下旬簡章 ➔ 10月中報名 ➔ 11月下旬面試 ➔ 12月放榜 ➔ 隔年1月中放棄截止）。
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px;">
      ${NATIONAL_SCHEDULE.phases.map(p => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
            <div style="font-weight: 700; font-size: 1rem; color: #0f172a;">${p.name}</div>
            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-size:0.75rem;">${p.period}</span>
          </div>

          <table style="width:100%; border-collapse:collapse; font-size:0.8125rem; margin-bottom:8px; background:white; border-radius:6px;">
            <tbody>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:6px 10px; width:120px; color:#64748b;">112 學年度日期：</td>
                <td style="padding:6px 10px; color:#334155;">${p.history112}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:6px 10px; color:#64748b;">113 學年度日期：</td>
                <td style="padding:6px 10px; color:#334155;">${p.history113}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:6px 10px; color:#64748b;">114 學年度 (公告)：</td>
                <td style="padding:6px 10px; font-weight:600; color:#2563eb;">${p.history114}</td>
              </tr>
              <tr style="background:#ecfdf5;">
                <td style="padding:6px 10px; color:#166534; font-weight:700;">今年推估時程：</td>
                <td style="padding:6px 10px; color:#15803d; font-weight:700;">${p.estimatedThisYear}</td>
              </tr>
            </tbody>
          </table>

          <div style="font-size:0.8rem; color:#475569; line-height:1.5;">
            🎯 <strong>考生行動指引</strong>：${p.actionGuidance}
          </div>
        </div>
      `).join("")}
    </div>

    <div style="display:flex; justify-content:flex-end; margin-top:16px;">
      <button class="btn btn-primary" onclick="closeModal('schedule-modal')">關閉視窗</button>
    </div>
  `;

  modal.style.display = "flex";
}

// 關閉指定 Modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
}

// 收藏管理
function toggleBookmark(id) {
  const idx = state.bookmarks.indexOf(id);
  if (idx > -1) {
    state.bookmarks.splice(idx, 1);
  } else {
    state.bookmarks.push(id);
  }
  localStorage.setItem("special_admission_bookmarks", JSON.stringify(state.bookmarks));
  updateBookmarkBadge();
  applyFiltersAndRender();
}

function updateBookmarkBadge() {
  const badge = document.getElementById("bookmark-count");
  if (badge) badge.innerText = state.bookmarks.length;
}

// 開啟收藏清單 Modal
function openBookmarksModal() {
  const modal = document.getElementById("bookmarks-modal");
  const body = document.getElementById("modal-bookmarks-body");
  if (!modal || !body) return;

  const bookmarkedDepts = state.db.filter(d => state.bookmarks.includes(d.id));

  if (bookmarkedDepts.length === 0) {
    body.innerHTML = `
      <div class="empty-state">
        <p style="color:#64748b;">尚未加入任何收藏校系！</p>
        <p style="color:#94a3b8; font-size:0.8rem; margin-top:4px;">在探索卡片中點擊「☆ 收藏」即可將心儀志願整理至此。</p>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div style="font-weight:600; font-size:0.875rem;">已收藏 ${bookmarkedDepts.length} 個志願校系</div>
        <button class="btn btn-outline" style="font-size:0.75rem; padding:4px 8px;" onclick="copyBookmarksToClipboard()">
          📋 複製文字清單
        </button>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${bookmarkedDepts.map(d => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border:1px solid #e2e8f0; padding:12px 16px; border-radius:8px;">
            <div>
              <div style="font-size:0.8rem; color:#64748b;">${d.school} (${d.tierName})</div>
              <div style="font-weight:700; color:#0f172a;">${d.dept}</div>
              <div style="font-size:0.75rem; color:#2563eb; margin-top:2px;">114年名額：${d.quota["114"]} 名 ｜ ${d.schedule ? d.schedule.estimated.apply : '10月中旬報名'}</div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-outline" style="font-size:0.75rem; padding:4px 8px;" onclick="openDetailModal('${d.id}')">檢視</button>
              <button class="btn btn-outline" style="font-size:0.75rem; padding:4px 8px; color:#ef4444;" onclick="toggleBookmark('${d.id}'); openBookmarksModal();">移除</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  modal.style.display = "flex";
}

// 複製收藏清單為純文字
function copyBookmarksToClipboard() {
  const bookmarkedDepts = state.db.filter(d => state.bookmarks.includes(d.id));
  const text = bookmarkedDepts.map((d, i) => 
    `${i + 1}. [${d.school}] ${d.dept} (114學年度名額: ${d.quota["114"]}名) - 報名預估: ${d.schedule ? d.schedule.estimated.apply : '10月中旬'}`
  ).join("\n");

  navigator.clipboard.writeText(`我的大學特殊選才目標志願清單：\n${text}`).then(() => {
    alert("已成功將志願清單複製至剪貼簿！");
  });
}

// 橫向對比管理
function toggleCompare(id) {
  const idx = state.compareList.indexOf(id);
  if (idx > -1) {
    state.compareList.splice(idx, 1);
  } else {
    if (state.compareList.length >= 4) {
      alert("最多同時對比 4 所校系！");
      return;
    }
    state.compareList.push(id);
  }
  updateCompareBadge();
  applyFiltersAndRender();
}

function updateCompareBadge() {
  const badge = document.getElementById("compare-count");
  if (badge) badge.innerText = state.compareList.length;
}

// 開啟對比 Modal
function openCompareModal() {
  const modal = document.getElementById("compare-modal");
  const body = document.getElementById("modal-compare-body");
  if (!modal || !body) return;

  const compareDepts = state.db.filter(d => state.compareList.includes(d.id));

  if (compareDepts.length < 2) {
    body.innerHTML = `
      <div class="empty-state">
        <p style="color:#64748b;">請在卡片中至少勾選 2 個校系加入對比（最多 4 個）！</p>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div style="overflow-x:auto;">
        <table class="compare-table">
          <thead>
            <tr>
              <th>項目</th>
              ${compareDepts.map(d => `
                <th style="min-width:200px; color:#2563eb;">
                  ${d.school}<br>
                  <span style="color:#0f172a; font-weight:700;">${d.dept}</span>
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>學群與層級</th>
              ${compareDepts.map(d => `<td>${d.categoryName} / ${d.tierName} (${d.regionName})</td>`).join("")}
            </tr>
            <tr>
              <th>114 最新名額</th>
              ${compareDepts.map(d => `<td style="font-weight:bold; font-size:1.1rem; color:#2563eb;">${d.quota["114"]} 名 <span style="font-size:0.75rem; color:#64748b;">(112年: ${d.quota["112"]})</span></td>`).join("")}
            </tr>
            <tr>
              <th>重要時程推估</th>
              ${compareDepts.map(d => `<td style="font-size:0.8rem; background:#f0fdf4; color:#15803d; font-weight:600;">報名：${d.schedule ? d.schedule.estimated.apply : '10月中旬'}<br>面試：${d.schedule ? d.schedule.estimated.exam : '11月下旬'}</td>`).join("")}
            </tr>
            <tr>
              <th>甄選比重</th>
              ${compareDepts.map(d => `<td>書審 ${d.evaluation.writtenPercent}%<br>面試 ${d.evaluation.interviewPercent}%${d.evaluation.examPercent > 0 ? `<br>筆試/實作 ${d.evaluation.examPercent}%` : ''}</td>`).join("")}
            </tr>
            <tr>
              <th>必備與門檻條件</th>
              ${compareDepts.map(d => `<td style="font-size:0.8rem;">${d.requirements.minCondition}</td>`).join("")}
            </tr>
            <tr>
              <th>核心特色</th>
              ${compareDepts.map(d => `
                <td style="font-size:0.8rem;">
                  <ul style="padding-left:14px;">
                    ${d.features.map(f => `<li>${f}</li>`).join("")}
                  </ul>
                </td>
              `).join("")}
            </tr>
            <tr>
              <th>錄取關鍵策略</th>
              ${compareDepts.map(d => `<td style="font-size:0.8rem; background:#f8fafc; line-height:1.6;">${d.admissionStandard}</td>`).join("")}
            </tr>
            <tr>
              <th>操作</th>
              ${compareDepts.map(d => `
                <td>
                  <button class="btn btn-outline" style="font-size:0.75rem; padding:4px 8px; color:#ef4444;" onclick="toggleCompare('${d.id}'); openCompareModal();">移除對比</button>
                </td>
              `).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  modal.style.display = "flex";
}

// 資料匯出至 JSON
function exportUserData() {
  const exportPayload = {
    exportDate: new Date().toISOString(),
    profile: state.filters,
    bookmarks: state.bookmarks,
    databaseSnapshotVersion: "114-Academic-Year"
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `special_admission_profile_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// 匯入自訂 JSON 檔案
function handleImportUserData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.profile) {
        state.filters = { ...state.filters, ...imported.profile };
      }
      if (Array.isArray(imported.bookmarks)) {
        state.bookmarks = imported.bookmarks;
        localStorage.setItem("special_admission_bookmarks", JSON.stringify(state.bookmarks));
      }
      alert("成功載入自訂設定與收藏志願！");
      applyFiltersAndRender();
      updateBookmarkBadge();
    } catch (err) {
      alert("匯入失敗：JSON 格式不符！");
    }
  };
  reader.readAsText(file);
}
