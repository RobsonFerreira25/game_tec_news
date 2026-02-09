import json
import time
import os
from playwright.sync_api import sync_playwright

# Configuração de Caminhos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'pc_build.json')
ERROR_SCREENSHOT_DIR = os.path.join(BASE_DIR, 'debug_screenshots')

if not os.path.exists(ERROR_SCREENSHOT_DIR):
    os.makedirs(ERROR_SCREENSHOT_DIR)

def wait_for_login(page):
    """Aguarda ativamente o usuário fazer login verificando a barra SiteStripe"""
    print("\n🔐 AÇÃO NECESSÁRIA: Faça login na sua conta Amazon no navegador aberto.")
    print("👀 O script aguarda a barra 'SiteStripe' aparecer no topo...")
    
    max_attempts = 300 # 5 minutos
    attempts = 0
    
    while attempts < max_attempts:
        try:
            # Verifica se elementos do SiteStripe estão visíveis
            # #amzn-ss-text-link-icon é o ícone de Texto
            if page.locator("#amzn-ss-text-link-icon").is_visible() or page.locator("a[title='Texto']").is_visible():
                print("\n✅ Login detectado! Barra SiteStripe encontrada.")
                return True
        except:
            pass
            
        time.sleep(1)
        attempts += 1
        if attempts % 10 == 0:
            print(f"⏳ Aguardando login... ({attempts}s)")
            
    print("❌ Tempo limite de login esgotado.")
    return False

def get_sitestripe_link(page, query):
    print(f"🔎 Buscando: {query}...")
    try:
        # Busca o produto
        search_box = page.locator("#twotabsearchtextbox")
        try:
            if not search_box.is_visible():
                page.goto("https://www.amazon.com.br")
                page.wait_for_selector("#twotabsearchtextbox", timeout=10000)
            
            search_box.fill(query)
            search_box.press("Enter")
            
            # Espera resultados
            page.wait_for_selector("div.s-search-results", timeout=15000)
        except Exception as e:
            print(f"⚠️ Erro na busca: {e}")
            page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"error_search_{query}.png"))
            return ""
        
        # Tenta diferentes seletores para o primeiro resultado
        selectors = [
             "div.s-main-slot div[data-component-type='s-search-result'] h2 a",
             "div.s-result-item h2 a",
             ".s-search-results h2 a"
        ]
        
        first_result = None
        for sel in selectors:
            res = page.locator(sel).first
            if res.count() > 0:
                first_result = res
                break
        
        if not first_result:
             print(f"❌ Nenhum resultado para {query}")
             page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"no_results_{query}.png"))
             return ""
        
        # Clica e espera carregar
        try:
            with page.expect_navigation(timeout=15000):
                first_result.click()
        except:
            print("⚠️ Navegação demorou, mas continuando...")
        
        page.wait_for_load_state("domcontentloaded")
        
        # Interação com SiteStripe
        print("🔗 Obtendo link...")
        
        try:
            sitestripe_btn = page.locator("#amzn-ss-text-link-icon")
            # Fallback seletor
            if not sitestripe_btn.count():
                 sitestripe_btn = page.locator("a[title='Texto']")
            
            sitestripe_btn.wait_for(state="visible", timeout=10000)
            sitestripe_btn.click()
            
            # Espera o painel
            link_area = page.locator("#amzn-ss-text-shortlink-textarea")
            link_area.wait_for(state="visible", timeout=10000)
            
            # Pega o valor
            short_link = link_area.input_value()
            
            if short_link:
                print(f"✅ Link gerado: {short_link}")
                return short_link
            else:
                print("❌ Link vazio.")
                page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"empty_link_{query}.png"))
                return ""
                
        except Exception as e:
            print(f"⚠️ Falha no SiteStripe: {e}")
            page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"error_sitestripe_{query}.png"))
            return ""

    except Exception as e:
        print(f"❌ Erro geral em {query}: {e}")
        page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"error_general_{query}.png"))
        return ""

def main():
    if not os.path.exists(DATA_FILE):
        print(f"Erro: Arquivo não encontrado em {DATA_FILE}")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("\n🚀 Iniciando Amazon Linker Bot (Modo SiteStripe V2)...")
    print("ℹ️  O script aguardará você logar para começar.")
    print("-----------------------------------")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--start-maximized"])
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            locale="pt-BR"
        )
        page = context.new_page()
        
        page.goto("https://www.amazon.com.br")
        
        # Modificado: Aguarda detecção visual em vez de ENTER
        if not wait_for_login(page):
            browser.close()
            return
        
        changed_count = 0
        sections = ['buildComponents', 'additionalComponents']
        
        for section in sections:
            items = data.get(section, [])
            for item in items:
                current_link = item.get('affiliateLink', '')
                
                if not current_link:
                    # Pequena pausa antes de começar
                    time.sleep(1)
                    new_link = get_sitestripe_link(page, item['searchQuery'])
                    if new_link:
                        item['affiliateLink'] = new_link
                        changed_count += 1
                        time.sleep(2)
                else:
                     print(f"ℹ️  {item['name']} já conferido.")

        browser.close()

    if changed_count > 0:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"\n✨ Sucesso! {changed_count} links novos salvos.")
    else:
        print("\n✅ Nenhum link novo gerado.")

if __name__ == "__main__":
    main()
