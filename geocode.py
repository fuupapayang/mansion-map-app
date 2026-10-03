import csv
import json
import requests
import time
import urllib.parse

def geocode_gsi(address):
    # 国土地理院のオープンAPIを利用 (APIキー不要)
    url = f"https://msearch.gsi.go.jp/address-search/AddressSearch?q={urllib.parse.quote(address)}"
    try:
        res = requests.get(url)
        if res.status_code == 200:
            data = res.json()
            if len(data) > 0:
                coords = data[0]["geometry"]["coordinates"]
                return coords[1], coords[0] # lat, lng
    except Exception as e:
        print(f"Error geocoding {address}: {e}")
    return None, None

def main():
    input_csv = "kansai_mansion_full.csv"
    output_json = "public/mansions.json"
    
    properties = []
    
    print("Reading CSV and starting geocoding...")
    with open(input_csv, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            address = row["所在地"]
            
            # 番地以降の詳細すぎるとGSI APIがヒットしないことがあるため、適度に整形する（ここではそのまま）
            lat, lng = geocode_gsi(address)
            
            if lat and lng:
                row["lat"] = lat
                row["lng"] = lng
                properties.append(row)
                print(f"Success: {row['物件名']} ({lat}, {lng})")
            else:
                print(f"Failed: {row['物件名']} - {address}")
                
            time.sleep(0.5) # 国土地理院サーバに負荷をかけないようウェイト
            
    with open(output_json, mode="w", encoding="utf-8") as f:
        json.dump(properties, f, ensure_ascii=False, indent=2)
        
    print(f"\nGeocoding complete! {len(properties)} properties saved to {output_json}")

if __name__ == "__main__":
    main()
