import requests
from bs4 import BeautifulSoup
import csv
import time

def scrape_suumo_kansai():
    # URL for SUUMO Kansai (Osaka: ta=27, Kyoto: ta=26, Hyogo: ta=28)
    # We will scrape the first page for Osaka as a prototype.
    url = "https://suumo.jp/jj/bukken/ichiran/JJ010FJ001/?ar=060&bs=010&ta=27"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    print(f"Fetching: {url}")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error fetching data: {response.status_code}")
        return
        
    soup = BeautifulSoup(response.content, "html.parser")
    properties = []
    
    # SUUMO list items usually have a class like 'property_unit' or we can just iterate by h2 containing the title
    # Let's iterate by the basic list items
    items = soup.find_all("div", class_="property_unit")
    if not items:
        # Sometimes SUUMO uses different wrapper classes
        items = [title.find_parent("div", class_="cassette_item") or title.find_parent("div", class_="property_unit") or title.find_parent("div") for title in soup.find_all("a", class_="js-cassette_title")]
    
    for item in items:
        if not item: continue
        try:
            # 物件名
            title_tag = item.find("a", class_="js-cassette_title")
            name = title_tag.text.strip() if title_tag else "Unknown"
            
            # 価格
            price_tag = item.find("span", class_="cassette_price-accent")
            price = price_tag.text.strip() if price_tag else "未定"
            
            # 所在地、交通などは cassette_basic-title と対になっている cassette_basic-value に入る
            location = ""
            access = ""
            basic_items = item.find_all("li", class_="cassette_basic-list_item")
            for basic in basic_items:
                title = basic.find("p", class_="cassette_basic-title")
                val = basic.find("p", class_="cassette_basic-value")
                if title and val:
                    t_text = title.text.strip()
                    v_text = val.text.strip()
                    if "所在地" in t_text:
                        location = v_text
                    elif "交通" in t_text:
                        access = v_text
            
            if name != "Unknown":
                properties.append({
                    "物件名": name,
                    "販売価格": price,
                    "所在地": location,
                    "交通アクセス": access
                })
        except Exception as e:
            continue
            
    print(f"Extracted {len(properties)} properties from prototype.")
    
    # CSVに保存
    csv_file = "kansai_mansion_prototype.csv"
    keys = ["物件名", "販売価格", "所在地", "交通アクセス"]
    
    with open(csv_file, mode="w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(properties)
        
    print(f"Saved data to {csv_file}")
    
if __name__ == "__main__":
    scrape_suumo_kansai()
