import json
import time
import os
from playwright.sync_api import sync_playwright

# Configuração de Caminhos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'pc_build.json')

def get_amazon_link(page, query, tag):
    print(f"🔎 Buscando: {query}...")
    try:
        # Acessa Amazon Brasil
        page.goto("https://www.amazon.com.br/", timeout=60000)
        
        # Tenta preencher a busca
        search_input = page.wait_for_selector("#twotabsearchtextbox", timeout=10000)
        search_input.fill(query)
        search_input.press("Enter")
        
        # Aguarda resultados
        page.wait_for_selector("div.s-search-results", timeout=10000)
        
        # Clica no primeiro resultado orgânico (ignora patrocinados se possível, mas pega o primeiro real)
        # Seletor genérico para o primeiro título de produto
        first_result = page.wait_for_selector("div.s-main-slot div[data-component-type='s-search-result'] h2 a", timeout=5000)
        
        if not first_result:
            print(f"❌ Nenhum resultado encontrado para {query}")
            return ""
            
        # Pega URL do link (às vezes clicar dispara anti-bot, pegar href é mais seguro)
        href = first_result.get_attribute("href")
        full_url = "https://www.amazon.com.br" + href
        
        # Extrai ASIN
        asin = None
        if "/dp/" in full_url:
            asin = full_url.split("/dp/")[1].split("/")[0]
        elif "/gp/product/" in full_url:
            asin = full_url.split("/gp/product/")[1].split("/")[0]

        if asin:
            # Constrói Link Limpo com Tag
            clean_link = f"https://www.amazon.com.br/dp/{asin}?tag={tag}&linkCode=ll1"
            print(f"✅ Link gerado: {clean_link}")
            return clean_link
        else:
            print(f"⚠️ Não foi possível extrair ASIN de: {full_url}")
            return ""

    except Exception as e:
        print(f"❌ Erro ao processar {query}: {str(e)}")
        return ""

def main():
    if not os.path.exists(DATA_FILE):
        print(f"Erro: Arquivo não encontrado em {DATA_FILE}")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Verifica Tag de Afiliado
    config = data.get('config', {})
    tag = config.get('amazonAssociateTag', '')
    
    if not tag:
        print("\n⚠️  ATENÇÃO: Tag de Afiliado não configurada!")
        tag = input("Digite sua Tag de Associado Amazon (ex: gametech-20): ").strip()
        if tag:
            if 'config' not in data: data['config'] = {}
            data['config']['amazonAssociateTag'] = tag
        else:
            print("Operação cancelada. É necessário uma tag para gerar links.")
            return

    print("\n🚀 Iniciando Amazon Linker Bot...")
    print("-----------------------------------")

    with sync_playwright() as p:
        # Launch com cabeçalho para parecer usuário real
        browser = p.chromium.launch(headless=False, args=["--start-maximized"]) 
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport={'width': 1920, 'height': 1080}
        )
        page = context.new_page()

        changed_count = 0
        
        # Percorre as seções
        sections = ['buildComponents', 'additionalComponents']
        for section in sections:
            items = data.get(section, [])
            for item in items:
                current_link = item.get('affiliateLink', '')
                
                # Só busca se não tiver link ou se o link estiver vazio
                if not current_link:
                    new_link = get_amazon_link(page, item['searchQuery'], tag)
                    if new_link:
                        item['affiliateLink'] = new_link
                        changed_count += 1
                        # Pequena pausa para evitar bloqueio
                        time.sleep(3)
                else:
                    print(f"ℹ️  {item['name']} já possui link: {current_link}")

        browser.close()

    # Salva alterações
    if changed_count > 0:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"\n✨ Sucesso! {changed_count} links novos foram salvos em data/pc_build.json")
    else:
        print("\n✅ Nenhum link novo precisou ser gerado.")

if __name__ == "__main__":
    main()
