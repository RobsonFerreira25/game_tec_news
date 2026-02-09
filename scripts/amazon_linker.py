import json
import time
import os
import sys
from playwright.sync_api import sync_playwright

# Configuração de Caminhos
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'pc_build.json')
ERROR_SCREENSHOT_DIR = os.path.join(BASE_DIR, 'debug_screenshots')

if not os.path.exists(ERROR_SCREENSHOT_DIR):
    os.makedirs(ERROR_SCREENSHOT_DIR)

def wait_for_login(page):
    """Aguarda o usuário fazer login via detecção ou confirmação manual"""
    print("\n🔐 AÇÃO NECESSÁRIA: Faça login na sua conta Amazon no navegador aberto.")
    print("👀 O script tentará detectar a barra 'SiteStripe' automaticamente.")
    print("👉 Se você JÁ logou e a barra apareceu, pressione ENTER aqui no terminal para forçar o início.")
    
    print("\n⏳ Aguardando login ou ENTER...")
    
    # Loop de verificação não bloqueante (usando poller simples com input timeout seria complexo em python puro cross-platform sem libs extras)
    # Vamos simplificar: Usar um loop que verifica a página, mas se o usuário der Ctrl+C ou algo assim, ele para.
    # Como input() bloqueia, não podemos fazer os dois ao mesmo tempo facilmente sem threads.
    # Vamos usar uma abordagem híbrida: input() bloqueante é o padrão para "Force Continue".
    # A verificação automática seria ideal, mas se falha, o input é a salvação.
    
    # MUDANÇA: Vamos priorizar o input do usuário para não travar, mas checar a página antes de cada instrução.
    # Na verdade, para ser robusto, vamos pedir ENTER. É infalível.
    
    input("⌨️  Pressione ENTER assim que visualizar a barra SiteStripe no topo da página...")
    
    # Verificação pós-enter apenas para validar (opcional)
    try:
        if page.locator("#amzn-ss-text-link-icon").is_visible() or page.locator("a[title='Texto']").is_visible() or page.locator("[id*='sitestripe']").is_visible():
            print("✅ SiteStripe detectado visualmente!")
        else:
            print("⚠️ SiteStripe não detectado automaticamente, mas seguindo por confirmação manual...")
    except:
        pass
        
    return True


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
            page.wait_for_selector("div.s-main-slot", timeout=15000)
            
            # SCROLL: Ajuda a carregar imagens/itens em conexões lentas ou lazy load
            page.evaluate("window.scrollBy(0, 300)")
            time.sleep(1) 
            
        except Exception as e:
            print(f"⚠️ Erro na busca: {e}")
            page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"error_search_{query}.png"))
            return ""
        
        # Tenta diferentes seletores para o primeiro resultado
        # Prioriza links de título, depois links de imagem
        selectors = [
             "div.s-main-slot div[data-component-type='s-search-result'] h2 a", # Título padrão
             "div.s-main-slot div[data-component-type='s-search-result'] .s-image", # Clique na imagem (muito robusto)
             "div.s-result-item h2 a", # Fallback genérico
             ".s-search-results h2 a"
        ]
        
        first_result = None
        for sel in selectors:
            res = page.locator(sel).first
            if res.count() > 0 and res.is_visible():
                first_result = res
                break
        
        if not first_result:
             print(f"❌ Nenhum resultado visível para {query}")
             page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"no_results_{query}.png"))
             return ""
        
        # Clica e espera carregar
        try:
            # Se for imagem, precisamos pegar o pai 'a' ou clicar nela que geralmente leva ao produto
            with page.expect_navigation(timeout=15000):
                first_result.click()
        except:
             pass # Às vezes navega sem disparar o evento clássico
        
        page.wait_for_load_state("domcontentloaded")
        
        # Validação extra: Estamos na página do produto?
        if not page.locator("div#dp").is_visible() and not page.locator("#productTitle").is_visible():
             print("⚠️ Talvez não tenha entrado na página do produto. Tentando continuar...")
        
        # Interação com SiteStripe
        print("🔗 Obtendo link...")
        
        try:
            # Seletores possíveis para o botão de texto/Obter link
            # Prioridade para o botão ID explícito que vimos no log de erro
            # O seletor por texto estava dando "strict mode violation" pois existem botões duplicados
            sitestripe_btn = page.locator("#amzn-ss-get-link-button")
            
            # Tenta locator antigo se não tiver ID (fallback)
            if not sitestripe_btn.count():
                 sitestripe_btn = page.locator("a:has-text('Obter link')").or_(page.locator("button:has-text('Obter link')")).first
            
            if not sitestripe_btn.count() or not sitestripe_btn.is_visible():
                 # Fallbacks antigos
                 sitestripe_btn = page.locator("#amzn-ss-text-link-icon")
            
            if not sitestripe_btn.count():
                 sitestripe_btn = page.locator("a[title='Texto']")

            if sitestripe_btn.count():
                sitestripe_btn.first.wait_for(state="visible", timeout=10000)
                sitestripe_btn.first.click()
                
                # Espera o painel
                # A área do link pode variar. Geralmente é #amzn-ss-text-shortlink-textarea
                # Mas as vezes pode ser um outro container se o layout mudou.
                link_area = page.locator("#amzn-ss-text-shortlink-textarea")
                try:
                    link_area.wait_for(state="visible", timeout=5000)
                except:
                    # Tenta clicar em "Texto" dentro do menu se "Obter link" abriu um menu geral
                    print("⚠️ Painel direto não abriu, tentando submenu Texto...")
                    submenu_text = page.locator("#amzn-ss-text-link span").first
                    if submenu_text.is_visible():
                        submenu_text.click()
                        link_area.wait_for(state="visible", timeout=5000)

                # Pega o valor
                short_link = link_area.input_value()
                
                if short_link:
                    print(f"✅ Link gerado: {short_link}")
                    return short_link
                else:
                    print("❌ Link vazio.")
                    page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"empty_link_{query}.png"))
                    return ""
            else:
                 print("⚠️ Botão SiteStripe não encontrado nesta página.")
                 page.screenshot(path=os.path.join(ERROR_SCREENSHOT_DIR, f"no_sitestripe_btn_{query}.png"))
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

    print("\n🚀 Iniciando Amazon Linker Bot (Modo SiteStripe V3)...")
    print("-----------------------------------")

    with sync_playwright() as p:
        # Viewport None para usar tamanho real da janela maximizada
        browser = p.chromium.launch(headless=False, args=["--start-maximized"])
        context = browser.new_context(
            viewport=None, 
            locale="pt-BR"
        )
        page = context.new_page()
        
        page.goto("https://www.amazon.com.br")
        
        # Bloqueia até usuário dar ENTER
        wait_for_login(page)
        
        changed_count = 0
        sections = ['buildComponents', 'additionalComponents']
        
        for section in sections:
            items = data.get(section, [])
            for item in items:
                current_link = item.get('affiliateLink', '')
                
                if not current_link:
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
