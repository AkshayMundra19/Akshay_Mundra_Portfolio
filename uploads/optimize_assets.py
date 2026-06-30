import os
# pyrefly: ignore [missing-import]
from PIL import Image, ImageDraw

def convert_and_optimize(src_png, dest_jpg):
    if not os.path.exists(src_png):
        print(f"Source image not found at {src_png}")
        return False
        
    try:
        os.makedirs(os.path.dirname(dest_jpg), exist_ok=True)
        img = Image.open(src_png)
        if img.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
            
        img.save(dest_jpg, 'JPEG', quality=85, optimize=True)
        file_size = os.path.getsize(dest_jpg) / 1024
        print(f"Optimized image saved to {dest_jpg} ({file_size:.2f} KB)")
        return True
    except Exception as e:
        print(f"Failed to optimize {src_png} -> {dest_jpg}: {e}")
        return False

def create_gradient_fallback(dest_jpg, title, color_start, color_end):
    try:
        os.makedirs(os.path.dirname(dest_jpg), exist_ok=True)
        # Create a beautiful 800x500 gradient image
        img = Image.new('RGB', (800, 500), color_start)
        draw = ImageDraw.Draw(img)
        
        # Simple vertical gradient simulation
        for y in range(500):
            r = int(color_start[0] + (color_end[0] - color_start[0]) * (y / 500))
            g = int(color_start[1] + (color_end[1] - color_start[1]) * (y / 500))
            b = int(color_start[2] + (color_end[2] - color_start[2]) * (y / 500))
            draw.line([(0, y), (800, y)], fill=(r, g, b))
            
        img.save(dest_jpg, 'JPEG', quality=85)
        print(f"Created fallback gradient for {title} at {dest_jpg}")
    except Exception as e:
        print(f"Failed to create fallback for {title}: {e}")

def run():
    # Profile photo
    convert_and_optimize(
        r"C:\Users\aksha\.gemini\antigravity-ide\brain\1f297450-3f80-4a3e-96eb-e8b772beba62\profile_photo_1782801940581.png",
        r"d:\NEW PORTFOLIO WEBSITE\uploads\profile-photo.jpg"
    )
    
    # EduBridge
    edu_src = r"C:\Users\aksha\.gemini\antigravity-ide\brain\1f297450-3f80-4a3e-96eb-e8b772beba62\edubridge_1782802012480.png"
    edu_dest = r"d:\NEW PORTFOLIO WEBSITE\uploads\projects\edubridge.jpg"
    
    if not convert_and_optimize(edu_src, edu_dest):
        create_gradient_fallback(edu_dest, "EduBridge", (109, 40, 217), (76, 29, 149)) # Purple gradient
        
    # BlockTrip
    block_src = r"C:\Users\aksha\.gemini\antigravity-ide\brain\1f297450-3f80-4a3e-96eb-e8b772beba62\blocktrip_1782802050000.png" # Placeholder name if retry works
    block_dest = r"d:\NEW PORTFOLIO WEBSITE\uploads\projects\blocktrip.jpg"
    if not convert_and_optimize(block_src, block_dest):
        create_gradient_fallback(block_dest, "BlockTrip", (5, 150, 105), (4, 120, 87)) # Green gradient
        
    # HomeValuate AI
    home_dest = r"d:\NEW PORTFOLIO WEBSITE\uploads\projects\homevaluate.jpg"
    create_gradient_fallback(home_dest, "HomeValuate AI", (8, 145, 178), (14, 116, 144)) # Cyan gradient

    # Verify Resume
    resume_path = r"d:\NEW PORTFOLIO WEBSITE\uploads\resume.pdf"
    if os.path.exists(resume_path):
        with open(resume_path, 'rb') as f:
            header = f.read(4)
        if header == b'%PDF':
            print("Resume PDF verified successfully (Starts with %PDF).")
        else:
            print("Warning: Resume file is not a valid PDF!")
    else:
        print("Resume PDF not found!")

if __name__ == '__main__':
    run()
