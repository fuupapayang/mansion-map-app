import requests
from bs4 import BeautifulSoup
import csv
import time

def scrape_suumo_kansai_all():
    base_url = "https://suumo.jp/jj/bukken/ichiran/JJ010FJ001/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    properties = []
    page = 1
    
    while True:
        # ar=060 (Kansai), bs=010 (New Condos)
        url = f"{base_url}?ar=060&bs=010&pn={page}"
        print(f"Fetching page {page}...")
        
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            break
            
        soup = BeautifulSoup(response.content, "html.parser")
        items = soup.find_all("div", class_="property_unit")
        if not items:
            items = [title.find_parent("div", class_="cassette_item") or title.find_parent("div", class_="property_unit") or title.find_parent("div") for title in soup.find_all("a", class_="js-cassette_title")]
        
        if not items:
            print("No more items found. Ending pagination.")
            break
            
        count_before = len(properties)
        
        for item in items:
            if not item: continue
            try:
                title_tag = item.find("a", class_="js-cassette_title")
                name = title_tag.text.strip() if title_tag else "Unknown"
                
                price_tag = item.find("span", class_="cassette_price-accent")
                price = price_tag.text.strip() if price_tag else "未定"
                
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
                
        # If no new properties were added (e.g. SUUMO loops back to page 1), break
        if len(properties) == count_before:
            break
            
        page += 1
        time.sleep(1) # Be nice to the server
        
        # Limit to 30 pages just in case
        if page > 30:
            break
            
    print(f"Total extracted: {len(properties)} properties from {page-1} pages.")
    
    csv_file = "kansai_mansion_full.csv"
    keys = ["物件名", "販売価格", "所在地", "交通アクセス"]
    
    with open(csv_file, mode="w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(properties)
        
    print(f"Saved full data to {csv_file}")
    
if __name__ == "__main__":
    scrape_suumo_kansai_all()
