import json
import time
import os
from playwright.sync_api import sync_playwright

# Configuração de Caminhos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'pc_build.json')

def wait_for_login(page):
    """Aguarda o usuário fazer login e verifica a barra SiteStripe"""
    print("\n🔐 AÇÃO NECESSÁRIA: Faça login na sua conta Amazon no navegador aberto.")
    print("👀 Verifique se a barra 'SiteStripe' aparece no topo da página.")
    input("⌨️  Pressione ENTER aqui no terminal quando estiver logado e pronto para continuar...")

def get_sitestripe_link(page, query):
    print(f"🔎 Buscando: {query}...")
    try:
        # Busca o produto
        search_box = page.locator("#twotabsearchtextbox")
        if not search_box.is_visible():
            page.goto("https://www.amazon.com.br")
            page.wait_for_selector("#twotabsearchtextbox")
        
        page.fill("#twotabsearchtextbox", query)
        page.press("#twotabsearchtextbox", "Enter")
        
        # Espera resultados
        page.wait_for_selector("div.s-search-results", timeout=15000)
        
        # Clica no primeiro resultado
        first_result = page.locator("div.s-main-slot div[data-component-type='s-search-result'] h2 a").first
        if not first_result.count():
             print(f"❌ Nenhum resultado para {query}")
             return ""
        
        first_result.click()
        page.wait_for_load_state("domcontentloaded")
        
        # Interação com SiteStripe
        # O seletor do botão "Texto" no SiteStripe geralmente é #amzn-ss-text-link-icon ou similar
        # Vamos tentar ser específicos mas flexíveis
        print("🔗 Tentando obter link via SiteStripe...")
        
        # Espera a barra carregar (pode demorar um pouco)
        try:
            # Tenta clicar no botão "Texto" (Get Link: Text)
            # Seletor ID comum: a#amzn-ss-text-link-icon
            # Ou pelo texto "Texto" dentro da div do sitestripe
            sitestripe_btn = page.locator("a[title='Texto']").or_(page.locator("#amzn-ss-text-link-icon"))
            sitestripe_btn.wait_for(state="visible", timeout=10000)
            sitestripe_btn.click()
            
            # Espera o painel do link abrir e o link curto aparecer
            link_area = page.locator("#amzn-ss-text-shortlink-textarea")
            link_area.wait_for(state="visible", timeout=10000)
            
            # Pega o valor
            short_link = link_area.input_value()
            
            if short_link:
                print(f"✅ Link gerado: {short_link}")
                return short_link
            else:
                print("❌ Falha ao extrair texto do link.")
                return ""
                
        except Exception as e:
            print(f"⚠️ Erro ao interagir com SiteStripe (Você está logado?): {e}")
            return ""

    except Exception as e:
        print(f"❌ Erro ao processar {query}: {e}")
        return ""

def main():
    if not os.path.exists(DATA_FILE):
        print(f"Erro: Arquivo não encontrado em {DATA_FILE}")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("\n🚀 Iniciando Amazon Linker Bot (Modo SiteStripe)...")
    print("ℹ️  Este script usará sua conta Amazon logada para gerar links oficiais.")
    print("-----------------------------------")

    with sync_playwright() as p:
        # Launch com persistência temporária de sessão seria ideal, 
        # mas como rodamos sob demanda, vamos pedir login a cada vez ou usar um dir de user data se o usuário quiser (mais complexo).
        # Vamos manter simples: abre, loga, processa.
        
        browser = p.chromium.launch(headless=False, args=["--start-maximized"])
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            locale="pt-BR"
        )
        page = context.new_page()
        
        # Vai para home para login
        page.goto("https://www.amazon.com.br")
        
        # Espera Login do Usuário
        wait_for_login(page)
        
        changed_count = 0
        sections = ['buildComponents', 'additionalComponents']
        
        for section in sections:
            items = data.get(section, [])
            for item in items:
                current_link = item.get('affiliateLink', '')
                
                # Só busca se não tiver link
                if not current_link:
                    new_link = get_sitestripe_link(page, item['searchQuery'])
                    if new_link:
                        item['affiliateLink'] = new_link
                        changed_count += 1
                        time.sleep(2) # Pausa leve
                else:
                     print(f"ℹ️  {item['name']} já possui link.")

        browser.close()

    # Salva
    if changed_count > 0:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"\n✨ Sucesso! {changed_count} links novos salvos.")
    else:
        print("\n✅ Nenhum link novo gerado.")

if __name__ == "__main__":
    main()
