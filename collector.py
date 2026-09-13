#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
大學特殊選才 數據收集與資料處理工具 (Special Admissions Data Collector)
功能：
1. 提取與同步 data.js 資料至 JSON / CSV
2. 驗證校系簡章資料結構完整性（名額、評分比例、篩選條件）
3. 統計歷年趨勢（112~114學年度名額增減率、學群分布）
4. 提供教育部多元入學網與甄選入學委員會簡章下載擴充模板
"""

import sys
import os
import json
import re
import csv
import argparse
from typing import Dict, List, Any

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_JS_PATH = os.path.join(BASE_DIR, "data.js")
OUTPUT_JSON_PATH = os.path.join(BASE_DIR, "admission_data.json")
OUTPUT_CSV_PATH = os.path.join(BASE_DIR, "admission_summary.csv")

def load_database_from_js() -> List[Dict[str, Any]]:
    """從 data.js 讀取並解析 ADMISSION_DATABASE JavaScript 物件"""
    if not os.path.exists(DATA_JS_PATH):
        print(f"[錯誤] 找不到資料庫檔案: {DATA_JS_PATH}")
        sys.exit(1)
        
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
        
    # 利用正則表達式擷取 ADMISSION_DATABASE 的陣列區塊
    match = re.search(r"const\s+ADMISSION_DATABASE\s*=\s*(\[[\s\S]*?\]);", content)
    if not match:
        print("[錯誤] 無法解析 data.js 中的 ADMISSION_DATABASE 陣列")
        sys.exit(1)
        
    raw_json_str = match.group(1)
    
    # 簡易清理 JS 物件語法轉換成合法的 JSON
    # 替換屬性名稱如 id: 為 "id":
    cleaned = re.sub(r'(\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', raw_json_str)
    # 移除末尾逗號
    cleaned = re.sub(r',\s*([\]}])', r'\1', cleaned)
    
    try:
        data = json.loads(cleaned)
        return data
    except Exception as e:
        # 若 regex 清理失敗，使用備用語法評估
        import ast
        try:
            # 將 JS boolean/null 等轉為 Python
            py_str = raw_json_str.replace("true", "True").replace("false", "False").replace("null", "None")
            # 處理鍵名
            py_str = re.sub(r'(\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', py_str)
            return json.loads(re.sub(r',\s*([\]}])', r'\1', py_str))
        except Exception as e2:
            print(f"[錯誤] 資料解析失敗: {e2}")
            sys.exit(1)

def export_to_json(data: List[Dict[str, Any]], target_path: str):
    """匯出成乾淨的 JSON 檔案"""
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[成功] 資料已匯出至 JSON: {target_path} (共 {len(data)} 筆校系)")

def export_to_csv(data: List[Dict[str, Any]], target_path: str):
    """匯出關鍵指標至 CSV 試算表"""
    fieldnames = [
        "id", "學校", "科系", "組別/軌道", "學群", "層級", "地區",
        "112年名額", "113年名額", "114年名額", "三年名額淨增長",
        "書審比例", "面試比例", "筆試實作比例", "資格門檻", "評審標準", "官方網址"
    ]
    
    with open(target_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for d in data:
            growth = d["quota"]["114"] - d["quota"]["112"]
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
                "書審比例": f"{d['evaluation']['writtenPercent']}%",
                "面試比例": f"{d['evaluation']['interviewPercent']}%",
                "筆試實作比例": f"{d['evaluation']['examPercent']}%",
                "資格門檻": d["requirements"]["minCondition"],
                "評審標準": d["admissionStandard"],
                "官方網址": d["officialUrl"]
            })
            
    print(f"[成功] 概要已匯出至 CSV: {target_path}")

def validate_data(data: List[Dict[str, Any]]):
    """檢查資料完整性與合理性"""
    print("=== 開始資料完整性檢查 ===")
    errors = 0
    warnings = 0
    
    for i, d in enumerate(data):
        dept_name = f"{d.get('school', '未知')} {d.get('dept', '未知')}"
        
        # 1. 檢查必填屬性
        for field in ["id", "school", "dept", "category", "quota", "evaluation", "requirements"]:
            if field not in d:
                print(f"[錯誤] 第 {i+1} 筆 ({dept_name}) 缺少欄位: {field}")
                errors += 1
                
        # 2. 檢查名額有效性
        quota = d.get("quota", {})
        for year in ["112", "113", "114"]:
            if year not in quota or not isinstance(quota[year], (int, float)) or quota[year] <= 0:
                print(f"[警告] ({dept_name}) {year}年名額異常: {quota.get(year)}")
                warnings += 1
                
        # 3. 檢查評分比重總和是否為 100%
        eval_data = d.get("evaluation", {})
        w = eval_data.get("writtenPercent", 0)
        m = eval_data.get("interviewPercent", 0)
        e = eval_data.get("examPercent", 0)
        if (w + m + e) != 100:
            print(f"[警告] ({dept_name}) 評分比重總和非 100%: 書審{w}% + 面試{m}% + 筆試{e}% = {w+m+e}%")
            warnings += 1
            
    print(f"檢查完成！共 {len(data)} 筆校系。錯誤: {errors} 項，警告: {warnings} 項。")

def print_statistics(data: List[Dict[str, Any]]):
    """輸出統計分析摘要"""
    total_schools = len(set(d["school"] for d in data))
    total_depts = len(data)
    
    total_112 = sum(d["quota"]["112"] for d in data)
    total_113 = sum(d["quota"]["113"] for d in data)
    total_114 = sum(d["quota"]["114"] for d in data)
    
    print("\n==========================================")
    print("  大學特殊選才 (112-114學年度) 資料庫統計分析  ")
    print("==========================================")
    print(f"• 收錄代表學校總數: {total_schools} 所")
    print(f"• 收錄代表校系專班: {total_depts} 個")
    print(f"• 112 學年度收錄名額: {total_112} 名")
    print(f"• 113 學年度收錄名額: {total_113} 名")
    print(f"• 114 學年度收錄名額: {total_114} 名 (較112年增長 +{total_114 - total_112} 名)")
    
    # 學群分布
    categories: Dict[str, int] = {}
    for d in data:
        cat = d.get("categoryName", "其他")
        categories[cat] = categories.get(cat, 0) + 1
        
    print("\n【收錄學群分布】")
    for cat, count in categories.items():
        print(f"  - {cat:16}: {count:2} 個系組")
    print("==========================================\n")

def main():
    parser = argparse.ArgumentParser(description="大學特殊選才數據工具")
    parser.add_argument("--export-json", action="store_true", help="將資料庫轉換為 JSON 格式")
    parser.add_argument("--export-csv", action="store_true", help="將資料庫概要轉換為 CSV 格式 (Excel可用)")
    parser.add_argument("--validate", action="store_true", help="檢查資料完整性與評分比例合法性")
    parser.add_argument("--stats", action="store_true", help="顯示近三年名額與學群統計數據")
    
    args = parser.parse_args()
    
    # 預設行為
    if not any([args.export_json, args.export_csv, args.validate, args.stats]):
        args.stats = True
        args.validate = True
        args.export_json = True
        
    data = load_database_from_js()
    
    if args.validate:
        validate_data(data)
    if args.stats:
        print_statistics(data)
    if args.export_json:
        export_to_json(data, OUTPUT_JSON_PATH)
    if args.export_csv:
        export_to_csv(data, OUTPUT_CSV_PATH)

if __name__ == "__main__":
    main()
