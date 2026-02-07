
import os
import sys
import json
import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup

# Configuração de Caminhos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEALS_FILE = os.path.join(BASE_DIR, 'data', 'deals.json')

async def scrape_ml_product(url):
    print(f"🚀 Iniciando extração de: {url}")
    
    async with async_playwright() as p:
        # Abre o navegador
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        try:
            # Navega até o produto
            await page.goto(url, wait_until="networkidle", timeout=60000)
            
            # Pega o conteúdo HTML
            content = await page.content()
            soup = BeautifulSoup(content, 'html.parser')
            
            # --- Extração de Dados ---
            
            # Título
            title_selectors = [
                'h1.ui-pdp-title',
                '.ui-pdp-title',
                'h1',
                '.item-title__primary'
            ]
            title = ""
            # Tenta primeiro via Meta Tag
            og_title = soup.find('meta', property='og:title')
            if og_title:
                title = og_title.get('content')
            
            if not title:
                for sel in title_selectors:
                    title_tag = soup.select_one(sel)
                    if title_tag:
                        title = title_tag.text.strip()
                        break
            
            if not title:
                title = "Título não encontrado"
            
            # Preço Atual
            price_selectors = [
                '.ui-pdp-price__content .andes-money-amount--current .andes-money-amount__fraction',
                '.ui-pdp-price__content .andes-money-amount__fraction',
                'span.andes-money-amount__fraction'
            ]
            price = "0,00"
            for sel in price_selectors:
                price_container = soup.select_one(sel)
                if price_container:
                    price = price_container.text.strip()
                    # Tenta pegar os centavos
                    cents_tag = soup.select_one('.ui-pdp-price__content .andes-money-amount__cents')
                    if cents_tag:
                        price = f"{price},{cents_tag.text.strip()}"
                    else:
                        price = f"{price},00"
                    break
            
            # Preço Original
            old_price_selectors = [
                '.ui-pdp-price__part--original .andes-money-amount__fraction',
                's.andes-money-amount--previous .andes-money-amount__fraction'
            ]
            original_price = None
            for sel in old_price_selectors:
                old_price_tag = soup.select_one(sel)
                if old_price_tag:
                    original_price = old_price_tag.text.strip()
                    break
            
            # Desconto
            discount_tag = soup.select_one('.ui-pdp-price__part--original .andes-money-amount__discount')
            discount = discount_tag.text.strip() if discount_tag else ""
            
            # Imagem
            image_selectors = [
                'img.ui-pdp-image.ui-pdp-gallery__figure__image',
                'img.ui-pdp-image',
                'img.ui-pdp-gallery__figure__image',
                '.ui-pdp-gallery__figure img',
                'img[data-zoom]'
            ]
            
            image_url = ""
            # Tenta primeiro via Meta Tag (mais estável)
            og_image = soup.find('meta', property='og:image')
            if og_image:
                image_url = og_image.get('content')
                
            # Se não achou na meta tag ou quer tentar seletores específicos
            if not image_url:
                for sel in image_selectors:
                    img_tag = soup.select_one(sel)
                    if img_tag:
                        image_url = img_tag.get('data-zoom') or img_tag.get('src') or img_tag.get('data-src')
                        if image_url:
                            break
            
            # Limpeza de URL de imagem (caso venha com zoom ou parâmetros)
            if image_url and image_url.startswith('//'):
                image_url = f"https:{image_url}"
            
            # --- Montagem do Objeto do Deal ---
            
            new_deal = {
                "id": int(asyncio.get_event_loop().time() * 1000), # ID Único baseado em timestamp
                "title": title,
                "store": "Mercado Livre",
                "price": price,
                "originalPrice": original_price if original_price != price else None,
                "discount": discount,
                "badge": "Oferta Automática",
                "link": url,
                "image": image_url,
                "imgCredit": "Mercado Livre / Divulgação",
                "category": "Games" # Categoria padrão, pode ser ajustada
            }
            
            print(f"✅ Produto extraído: {title}")
            return new_deal
            
        except Exception as e:
            print(f"❌ Erro ao extrair dados: {e}")
            return None
        finally:
            await browser.close()

def update_deals_json(new_deal):
    if not new_deal:
        return
        
    try:
        # Carrega dados existentes
        if os.path.exists(DEALS_FILE):
            with open(DEALS_FILE, 'r', encoding='utf-8') as f:
                deals = json.load(f)
        else:
            deals = []
            
        # Adiciona o novo deal no início da lista
        deals.insert(0, new_deal)
        
        # Salva de volta
        with open(DEALS_FILE, 'w', encoding='utf-8') as f:
            json.dump(deals, f, indent=4, ensure_ascii=False)
            
        print(f"🎉 Deals.json atualizado com sucesso!")
        
    except Exception as e:
        print(f"❌ Erro ao atualizar o arquivo JSON: {e}")

async def main():
    if len(sys.argv) < 2:
        print("Uso: python ml_scraper.py [URL_DO_MERCADO_LIVRE]")
        return
        
    url = sys.argv[1]
    deal = await scrape_ml_product(url)
    if deal:
        update_deals_json(deal)

if __name__ == "__main__":
    asyncio.run(main())
