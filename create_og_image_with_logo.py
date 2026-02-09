from PIL import Image

# Abrir a imagem do logo que o usuário forneceu
# Assumindo que a imagem está em algum lugar acessível
logo_path = "c:/Users/ROBSON FERREIRA/OneDrive/Documents/KNprojetos/gametech-noticias-news-reviwes/game_tec_news/public/favicon.svg"

# Criar uma nova imagem 1200x630 (formato Open Graph)
width, height = 1200, 630
og_image = Image.new('RGB', (width, height), color='#1a1a2e')

# Gradiente de fundo escuro
from PIL import ImageDraw
draw = ImageDraw.Draw(og_image)

# Criar gradiente vertical
for y in range(height):
    r = int(26 + (y / height) * 10)  # 26-36
    g = int(26 + (y / height) * 10)  # 26-36
    b = int(46 + (y / height) * 20)  # 46-66
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Adicionar efeitos de linhas neon
# Top border - cyan
draw.rectangle([0, 0, width, 10], fill=(0, 242, 255))
# Bottom border - purple
draw.rectangle([0, height-10, width, height], fill=(112, 0, 255))

# Criar o logo central (letra G estilizada)
def draw_g_logo(draw, cx, cy, size):
    """Desenha o logo G com cores gradient"""
    # Escala
    block = size // 8
    
    cyan = (0, 242, 255)
    purple = (112, 0, 255)
    
    # Posição inicial (canto superior esquerdo do G)
    x = cx - size // 2
    y = cy - size // 2
    
    # Top horizontal - cyan
    draw.rectangle([x, y, x + size, y + block], fill=cyan)
    
    # Left vertical - cyan to purple gradient
    for i in range(size):
        t = i / size
        r = int(cyan[0] * (1-t) + purple[0] * t)
        g = int(cyan[1] * (1-t) + purple[1] * t)
        b = int(cyan[2] * (1-t) + purple[2] * t)
        draw.line([(x, y + i), (x + block, y + i)], fill=(r, g, b))
    
    # Middle horizontal - purple
    mid_y = y + size // 2
    draw.rectangle([x, mid_y - block//2, x + size//2 + block*2, mid_y + block//2], fill=purple)
    
    # Bottom horizontal - purple
    draw.rectangle([x, y + size - block, x + size, y + size], fill=purple)
    
    # Right partial vertical - purple
    draw.rectangle([x + size - block, mid_y, x + size, y + size], fill=purple)
    
    # Accent small bar
    draw.rectangle([x + size + 20, mid_y - block//2, x + size + 40, mid_y + block//2], fill=cyan)

# Desenhar logo no centro
logo_size = 280
draw_g_logo(draw, width // 2, height // 2, logo_size)

# Adicionar texto GAMETECH
try:
    from PIL import ImageFont
    font_large = ImageFont.truetype("arial.ttf", 60)
    font_small = ImageFont.truetype("arial.ttf", 28)
except:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Texto abaixo do logo
text_y = (height // 2) + logo_size // 2 + 40
text1 = "GAMETECH"
text2 = "News & Hardware Reviews"

# Calcular posição centralizada
try:
    bbox1 = draw.textbbox((0, 0), text1, font=font_large)
    w1 = bbox1[2] - bbox1[0]
    bbox2 = draw.textbbox((0, 0), text2, font=font_small)
    w2 = bbox2[2] - bbox2[0]
except:
    w1 = len(text1) * 30
    w2 = len(text2) * 15

x1 = (width - w1) // 2
x2 = (width - w2) // 2

# Desenhar texto com sombra
draw.text((x1 + 3, text_y + 3), text1, fill=(0, 0, 0), font=font_large)
draw.text((x1, text_y), text1, fill=(0, 242, 255), font=font_large)

draw.text((x2 + 2, text_y + 80 + 2), text2, fill=(0, 0, 0), font=font_small)
draw.text((x2, text_y + 80), text2, fill=(200, 200, 220), font=font_small)

# Salvar
output_path = "c:/Users/ROBSON FERREIRA/OneDrive/Documents/KNprojetos/gametech-noticias-news-reviwes/game_tec_news/public/og-image.jpg"
og_image.save(output_path, 'JPEG', quality=95, optimize=True)

print(f"✅ Open Graph image created: {output_path}")
print(f"📐 Size: 1200x630px")
print(f"🎨 Design: GAMETECH logo com gradiente cyan/purple")
print(f"\n🚀 Próximo passo: Fazer deploy e testar no WhatsApp!")
