from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_og_image():
    """Create Open Graph image for WhatsApp/social media sharing (1200x630)"""
    # Create image
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), color='#0a0a0c')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background effect (dark to slightly lighter)
    for y in range(height):
        color_value = int(10 + (y / height) * 12)  # 10-22 range
        draw.line([(0, y), (width, y)], fill=(color_value, color_value, color_value + 2))
    
    # Draw accent lines (neon bars)
    accent_color1 = (0, 242, 255)  # cyan
    accent_color2 = (112, 0, 255)  # purple
    
    # Top accent
    draw.rectangle([0, 0, width, 8], fill=accent_color1)
    
    # Bottom accent
    draw.rectangle([0, height-8, width, height], fill=accent_color2)
    
    # Left accent
    draw.rectangle([0, 0, 8, height], fill=accent_color1)
    
    # Diagonal accent lines
    for i in range(0, width, 100):
        x1, y1 = i, 0
        x2, y2 = i + 200, height
        draw.line([(x1, y1), (x2, y2)], fill=(0, 242, 255, 30), width=2)
    
    # Draw large GAMETECH text
    try:
        # Try to use a system font
        font_title = ImageFont.truetype("Arial.ttf", 120)
        font_subtitle = ImageFont.truetype("Arial.ttf", 48)
    except:
        # Fallback to default font
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
    
    # Main title
    title = "GAMETECH"
    
    # Calculate text position to center it
    try:
        bbox = draw.textbbox((0, 0), title, font=font_title)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    except:
        text_width = len(title) * 60
        text_height = 80
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - 80
    
    # Draw title with gradient effect (drawing multiple times with slight offset)
    for offset in range(3, 0, -1):
        alpha = 100 - (offset * 20)
        draw.text((x + offset, y + offset), title, fill=accent_color2, font=font_title)
    
    draw.text((x, y), title, fill=accent_color1, font=font_title)
    
    # Subtitle
    subtitle = "News & Hardware Reviews"
    try:
        bbox_sub = draw.textbbox((0, 0), subtitle, font=font_subtitle)
        subtitle_width = bbox_sub[2] - bbox_sub[0]
    except:
        subtitle_width = len(subtitle) * 20
    
    x_sub = (width - subtitle_width) // 2
    y_sub = y + 160
    
    draw.text((x_sub, y_sub), subtitle, fill=(180, 180, 200), font=font_subtitle)
    
    # Add decorative elements (circles/dots)
    circle_color = accent_color1
    for i in range(5):
        x_circle = 100 + i * 250
        y_circle = height - 100
        draw.ellipse([x_circle-5, y_circle-5, x_circle+5, y_circle+5], fill=circle_color)
    
    # Save
    output_path = "c:/Users/ROBSON FERREIRA/OneDrive/Documents/KNprojetos/gametech-noticias-news-reviwes/game_tec_news/public/og-image.jpg"
    img.save(output_path, 'JPEG', quality=90)
    print(f"✅ Created {output_path}")
    print(f"   Size: 1200x630px (optimized for WhatsApp/Facebook)")

# Generate the Open Graph image
print("Generating Open Graph image for social media...")
create_og_image()
print("\n🎉 All images created successfully!")
