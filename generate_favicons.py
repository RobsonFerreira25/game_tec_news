from PIL import Image, ImageDraw, ImageFont
import io

def create_favicon_png(size, output_path):
    """Create a PNG favicon with GAMETECH logo"""
    # Create image with dark background
    img = Image.new('RGB', (size, size), color='#0a0a0c')
    draw = ImageDraw.Draw(img)
    
    # Calculate proportions
    margin = size // 8
    
    # Draw gradient-like effect using rectangles
    # G shape simplified for small sizes
    if size >= 32:
        # Main shape color (cyan to purple approximation)
        color1 = (0, 242, 255)  # cyan
        color2 = (112, 0, 255)  # purple
        
        # Draw simplified G shape
        block_width = size // 2
        block_height = size // 8
        
        # Top horizontal
        draw.rectangle([margin, margin, size-margin, margin+block_height], fill=color1)
        
        # Left vertical
        draw.rectangle([margin, margin, margin+block_height, size-margin], fill=color1)
        
        # Middle horizontal (shorter)
        mid_y = size // 2
        draw.rectangle([margin, mid_y-block_height//2, size//2+margin, mid_y+block_height//2], fill=color2)
        
        # Bottom horizontal
        draw.rectangle([margin, size-margin-block_height, size-margin, size-margin], fill=color2)
        
        # Right partial vertical
        draw.rectangle([size-margin-block_height, mid_y, size-margin, size-margin], fill=color2)
    else:
        # For very small sizes (16x16), draw simple square with gradient colors
        quarter = size // 4
        draw.rectangle([quarter, quarter, size-quarter, size-quarter], fill=(0, 242, 255))
        draw.rectangle([quarter*2, quarter*2, size-quarter, size-quarter], fill=(112, 0, 255))
    
    # Save
    img.save(output_path, 'PNG')
    print(f"Created {output_path}")

def create_ico(png_16_path, png_32_path, output_path):
    """Create ICO file from PNG images"""
    img_16 = Image.open(png_16_path)
    img_32 = Image.open(png_32_path)
    
    # Save as ICO with multiple sizes
    img_32.save(output_path, format='ICO', sizes=[(16, 16), (32, 32)])
    print(f"Created {output_path}")

# Create all favicon sizes
public_dir = "c:/Users/ROBSON FERREIRA/OneDrive/Documents/KNprojetos/gametech-noticias-news-reviwes/game_tec_news/public"

print("Generating favicons...")
create_favicon_png(16, f"{public_dir}/favicon-16x16.png")
create_favicon_png(32, f"{public_dir}/favicon-32x32.png")
create_favicon_png(180, f"{public_dir}/apple-touch-icon.png")

# Create ICO file
create_ico(
    f"{public_dir}/favicon-16x16.png",
    f"{public_dir}/favicon-32x32.png",
    f"{public_dir}/favicon.ico"
)

print("\n✅ All favicons created successfully!")
print("\nFiles created:")
print("- favicon.ico (16x16 and 32x32)")
print("- favicon-16x16.png")
print("- favicon-32x32.png")
print("- apple-touch-icon.png (180x180)")
print("\nNote: For og-image.jpg (WhatsApp preview), you'll need to create a 1200x630 image manually.")
