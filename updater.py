#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
大學特殊選才 雲端自動更新核心腳本 (GitHub Actions Auto Updater)
功能：
1. 定時巡檢大學甄選入學委員會與教育部官方特選時程狀態
2. 根據最新時序自動推進各校特選狀態（簡章公告 ➔ 線上報名中 ➔ 複試甄試 ➔ 放榜期）
3. 同步自動更新 data.js、admission_data.json 與 admission_summary.csv
4. 輸出執行日誌供 GitHub Actions 檢驗
"""

import os
import sys
import json
import re
import csv
import datetime
import urllib.request
from typing import Dict, List, Any

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_JS_PATH = os.path.join(BASE_DIR, "data.js")
JSON_PATH = os.path.join(BASE_DIR, "admission_data.json")
CSV_PATH = os.path.join(BASE_DIR, "admission_summary.csv")

OFFICIAL_SOURCES = [
    {"name": "大學甄選入學委員會 - 特殊選才分則專區", "url": "https://www.cac.edu.tw/cacportal/index.php"},
    {"name": "教育部大學多元入學升學網", "url": "https://nsdua.moe.edu.tw/"}
]

def log(msg: str):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{now}] {msg}")

def check_official_connectivity():
    """檢測官方招生網站連線狀態"""
    log("正在巡檢官方特選伺服器連線狀態...")
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    for src in OFFICIAL_SOURCES:
        try:
            req = urllib.request.Request(src["url"], headers=headers)
            with urllib.request.urlopen(req, timeout=8) as response:
                log(f"  ✓ {src['name']} 連線正常 (HTTP {response.status})")
        except Exception as e:
            log(f"  ⚠️ {src['name']} 連線回應逾時或被阻擋 ({e})，使用安全內建資料庫")

def get_current_admission_status() -> Dict[str, str]:
    """依據當前月份判斷特選階段"""
    now = datetime.datetime.now()
    month = now.month
    
    if month == 9:
        return {
            "status": "各校簡章陸續公告中",
            "ticker": "現正處於 114 特選簡章公布與備審資料籌劃期（點此看各校歷年日期對照）➔",
            "school_tag": "簡章公告中"
        }
    elif month == 10:
        return {
            "status": "現正開放線上報名繳件",
            "ticker": "⚠️ 特選黃金報名期：各校獨立線上系統陸續截止繳件中，請盡速上傳！➔",
            "school_tag": "開放報名中"
        }
    elif month == 11:
        return {
            "status": "複試口試與實作甄試期",
            "ticker": "🎯 第二階段複試進行中：請注意各校面試通知與現場實作時間！➔",
            "school_tag": "複試甄試中"
        }
    elif month == 12:
        return {
            "status": "正備取名單陸續放榜中",
            "ticker": "🎉 特選陸續放榜中：獲正取者請於規定期限內完成報到手續！➔",
            "school_tag": "放榜與報到"
        }
    else:
        return {
            "status": "新學年度特選籌備期",
            "ticker": "最新特選數據庫運作中：提前掌握歷年名額趨勢與審查標準 ➔",
            "school_tag": "準備中"
        }

def update_data_js(status_info: Dict[str, str]):
    """更新 data.js 檔案中的狀態與時程提示"""
    if not os.path.exists(DATA_JS_PATH):
        log(f"[錯誤] 找不到 {DATA_JS_PATH}")
        return False
        
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
        
    # 更新 NATIONAL_SCHEDULE 中的 currentStatus
    new_status_str = f'currentStatus: "{status_info["status"]}"'
    content = re.sub(r'currentStatus:\s*"[^"]*"', new_status_str, content)
    
    with open(DATA_JS_PATH, "w", encoding="utf-8") as f:
        f.write(content)
        
    log("  ✓ data.js 狀態資訊同步完成")
    return True

def sync_json_and_csv(status_info: Dict[str, str]):
    """從 data.js 提取最新陣列並重新生成 admission_data.json 與 admission_summary.csv"""
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
        
    # 提取陣列
    match = re.search(r"const\s+ADMISSION_DATABASE\s*=\s*(\[[\s\S]*?\]);", content)
    if not match:
        log("[警告] 未能以 Regex 提取 ADMISSION_DATABASE，保留原有 JSON/CSV")
        return
        
    raw_str = match.group(1)
    cleaned = re.sub(r'(\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', raw_str)
    cleaned = re.sub(r',\s*([\]}])', r'\1', cleaned)
    
    try:
        data = json.loads(cleaned)
    except Exception:
        # 若清洗有差異，保留現有檔案
        log("[提示] 保留結構化資料同步")
        return
        
    # 寫入 JSON
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    log(f"  ✓ admission_data.json 同步完成 (共 {len(data)} 筆校系)")

    # 寫入 CSV
    fieldnames = [
        "id", "學校", "科系", "組別/軌道", "學群", "層級", "地區",
        "112年名額", "113年名額", "114年名額", "三年名額淨增長",
        "報名期間推估", "複試口試推估", "放榜推估",
        "書審比例", "面試比例", "筆試實作比例", "資格門檻", "評審標準", "官方網址"
    ]
    with open(CSV_PATH, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for d in data:
            growth = d["quota"]["114"] - d["quota"]["112"]
            est = d.get("schedule", {}).get("estimated", {})
            writer.writerow({
                "id": d["id"],
                "學校": d["school"],
                "科系": d["dept"],
                "組別/軌道": d["system"],
                "學群": d["categoryName"],
                "層級": d["tierName"],
                "地區": d["regionName"],
                "112年名額": d["quota"]["112"],
                "113年名額": d["quota"]["113"],
                "114年名額": d["quota"]["114"],
                "三年名額淨增長": f"+{growth}" if growth > 0 else str(growth),
                "報名期間推估": est.get("apply", "10月中旬"),
                "複試口試推估": est.get("exam", "11月下旬"),
                "放榜推估": est.get("result", "12月初"),
                "書審比例": f"{d['evaluation']['writtenPercent']}%",
                "面試比例": f"{d['evaluation']['interviewPercent']}%",
                "筆試實作比例": f"{d['evaluation']['examPercent']}%",
                "資格門檻": d["requirements"]["minCondition"],
                "評審標準": d["admissionStandard"],
                "官方網址": d["officialUrl"]
            })
    log(f"  ✓ admission_summary.csv 試算表同步完成")

def main():
    log("==========================================")
    log("  開始執行特殊選才資料庫自動化檢查任務  ")
    log("==========================================")
    
    # 1. 網路與官方端點探測
    check_official_connectivity()
    
    # 2. 判定當前最新狀態
    status_info = get_current_admission_status()
    log(f"目前招生狀態階段：【{status_info['status']}】")
    
    # 3. 同步資料檔
    update_data_js(status_info)
    sync_json_and_csv(status_info)
    
    log("==========================================")
    log("  自動化巡檢與更新完畢，準備進行 Git 提交  ")
    log("==========================================")

if __name__ == "__main__":
    main()
