from PIL import Image, ImageDraw

def create_user_suggested_og_image():
    """Create Open Graph image with the exact logo design suggested by the user"""
    width, height = 1200, 630
    # Background - very dark grey/black
    img = Image.new('RGB', (width, height), color='#121217')
    draw = ImageDraw.Draw(img)
    
    # Logo size and position (centered)
    logo_size = 400
    x_start = (width - logo_size) // 2
    y_start = (height - logo_size) // 2
    
    # Colors from the user's image
    cyan = (0, 242, 255)
    purple = (112, 0, 255)
    dark_bg = (10, 10, 12)
    
    # 1. Draw the background square of the logo
    draw.rectangle([x_start, y_start, x_start + logo_size, y_start + logo_size], fill=dark_bg)
    
    # 2. Draw the blocky G shape
    # The shape is composed of several rectangles
    unit = logo_size // 8
    
    # Padding within the square
    pad = unit
    lx = x_start + pad
    ly = y_start + pad
    ls = logo_size - pad * 2
    lu = ls // 6 # local unit for the 6-module grid
    
    # CYAN parts (Top and Left)
    # Top horizontal bar
    draw.rectangle([lx, ly, lx + ls, ly + lu], fill=cyan)
    # Left vertical bar
    draw.rectangle([lx, ly, lx + lu, ly + ls], fill=cyan)
    
    # PURPLE parts (Middle, Bottom, and Right tip)
    # Middle bar
    draw.rectangle([lx, ly + lu * 2, lx + lu * 4, ly + lu * 3], fill=purple)
    # Bottom bar
    draw.rectangle([lx, ly + lu * 5, lx + ls, ly + ls], fill=purple)
    # Right vertical tip (for the G shape)
    draw.rectangle([lx + ls - lu, ly + lu * 3, lx + ls, ly + ls], fill=purple)
    
    # Save
    output_path = "c:/Users/ROBSON FERREIRA/OneDrive/Documents/KNprojetos/gametech-noticias-news-reviwes/game_tec_news/public/og-image.jpg"
    img.save(output_path, 'JPEG', quality=95)
    print(f"✅ Successfully created user-suggested OG image: {output_path}")

if __name__ == "__main__":
    create_user_suggested_og_image()
