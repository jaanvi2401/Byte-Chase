from PIL import Image, PngImagePlugin
import os

images = {
    'nature.png': 'AURORA',
    'movies.png': 'DEADPOOL',
    'cartoon.png': 'SAMURAI',
    'politics.png': 'UNKNOWN',
    'speakeasy.png': 'COFFIN'
}

base_path = '/Users/janvitiwari/.gemini/antigravity/scratch/cyber-hunt/public/images'

for img_name, token in images.items():
    img_path = os.path.join(base_path, img_name)
    if os.path.exists(img_path):
        print(f"Injecting metadata into {img_name}...")
        img = Image.open(img_path)
        
        # Prepare PNG metadata chunks
        meta = PngImagePlugin.PngInfo()
        meta.add_text("Comment", f"FLAG: {token}")
        meta.add_text("Description", f"The secret keyword you are looking for is {token}")
        meta.add_text("Author", token)
        
        # Save image with metadata, overwriting the old one
        img.save(img_path, "PNG", pnginfo=meta)
        print(f"Successfully injected token: {token}")
    else:
        print(f"Image not found: {img_path}")

print("All metadata injection complete.")
