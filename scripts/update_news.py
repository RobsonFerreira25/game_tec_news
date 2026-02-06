import json
import os
import sys
from datetime import datetime
import re

# Configurações
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(BASE_DIR, 'data', 'news.json')
LINKS_FILE = os.path.join(BASE_DIR, 'pending_links.txt')

DEALS_PATH = os.path.join(BASE_DIR, 'data', 'deals.json')

def load_deals():
    if os.path.exists(DEALS_PATH):
        with open(DEALS_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_deals(data):
    with open(DEALS_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def add_deal_manually(title, store, price, original_price, discount, badge, link, category):
    deals = load_deals()
    
    new_deal = {
        "id": len(deals) + 1,
        "title": title,
        "store": store,
        "price": price,
        "originalPrice": original_price,
        "discount": discount,
        "badge": badge,
        "link": link,
        "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        "category": category
    }
    
    deals.insert(0, new_deal)
    save_deals(deals)
    print(f"✅ Oferta adicionada com sucesso: {title}")

def add_news_manually(title, label, description, content, source_name, source_url, section='latest'):
    data = load_news()
    
    # Gerar imagem aleatória se não fornecida (em um sistema real, aqui iria o scraping da imagem)
    img_id = str(hash(title) % 1000)
    img_url = f"https://picsum.photos/id/{img_id}/600/400"
    
    new_item = {
        "title": title,
        "label": label,
        "description": description,
        "content": content,
        "sourceName": source_name,
        "sourceUrl": source_url,
        "img": img_url,
        "author": "Redação",
        "comments": 0,
        "time": "Agora",
        "slug": re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    }
    
    if section == 'latest':
        data['latest'].insert(0, new_item)
        data['latest'] = data['latest'][:10]
    elif section == 'mini':
        data['mini'].insert(0, {
            "title": title,
            "img": f"https://picsum.photos/id/{img_id}/200/120",
            "excerpt": description[:100] + "...",
            "sourceName": source_name,
            "sourceUrl": source_url
        })
        data['mini'] = data['mini'][:5]
    elif section == 'featured':
        new_item["image"] = f"https://picsum.photos/id/{img_id}/1200/600"
        data['featured'] = new_item
        
    save_news(data)
    print(f"✅ Notícia adicionada com sucesso na seção: {section}")

if __name__ == "__main__":
    print("--- GameTech News & Deals Updater ---")
    print("1. Adicionar Notícia")
    print("2. Adicionar Oferta (Deal)")
    
    choice = input("Escolha uma opção: ")
    
    if choice == '1':
        title = input("Título: ")
        label = input("Etiqueta (ex: Game Pass, Review): ")
        desc = input("Descrição curta: ")
        content = input("Conteúdo da matéria (HTML/Texto): ")
        source_name = input("Nome da Fonte (créditos): ")
        source_url = input("Link da Fonte original: ")
        
        print("Seção: 1. Latest, 2. Mini, 3. Featured")
        sec_choice = input("Opção: ")
        
        section = 'latest'
        if sec_choice == '2': section = 'mini'
        if sec_choice == '3': section = 'featured'
        
        add_news_manually(title, label, desc, content, source_name, source_url, section)
    elif choice == '2':
        title = input("Título do Produto: ")
        store = input("Loja (ex: Amazon, ML): ")
        price = input("Preço Atual (ex: 299,90): ")
        orig_price = input("Preço Original: ")
        disc = input("Desconto (ex: 15% OFF): ")
        badge = input("Selo (ex: Menor Preço): ")
        link = input("Link de Afiliado: ")
        cat = input("Categoria (Games, Hardware): ")
        
        add_deal_manually(title, store, price, orig_price, disc, badge, link, cat)
    else:
        print("Opção inválida.")
