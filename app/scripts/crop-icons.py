"""把三张图标截图裁剪成透明圆角图标 PNG（256px），按饱和度/深色定位图标主体。"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

G = Path("/Applications/  /个人站/app/src/assets/gallery")
SRC = {
    "icon-claude.png": "/var/folders/l3/b4rh_4nx61jb6p1mqfn8z9xr0000gn/T/TemporaryItems/NSIRD_screencaptureui_RBHUS6/Screenshot 2026-08-06 at 18.48.37.png",
    "icon-figma.png": "/var/folders/l3/b4rh_4nx61jb6p1mqfn8z9xr0000gn/T/TemporaryItems/NSIRD_screencaptureui_tHD6pk/Screenshot 2026-08-06 at 18.47.55.png",
    "icon-sql.png": "/var/folders/l3/b4rh_4nx61jb6p1mqfn8z9xr0000gn/T/TemporaryItems/NSIRD_screencaptureui_Sa7HVy/Screenshot 2026-08-06 at 18.46.59.png",
}

for out_name, src in SRC.items():
    im = Image.open(src).convert("RGB")
    w, h = im.size
    px = im.load()

    # 图标主体 = 有饱和度（彩色）或明显深色的像素；浅灰背景两者都不是
    mask = Image.new("L", (w, h), 0)
    mp = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if (max(r, g, b) - min(r, g, b) > 35) or (max(r, g, b) < 140):
                mp[x, y] = 255
    # 去噪点并稍微向外合并
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(5))
    bbox = mask.getbbox()
    if not bbox:
        raise SystemExit(f"no content bbox: {src}")

    # 外扩 2% 让图标边缘完整
    x0, y0, x1, y1 = bbox
    pad_x = int((x1 - x0) * 0.02)
    pad_y = int((y1 - y0) * 0.02)
    x0, y0 = max(0, x0 - pad_x), max(0, y0 - pad_y)
    x1, y1 = min(w, x1 + pad_x), min(h, y1 + pad_y)
    icon = im.crop((x0, y0, x1, y1))

    # 贴到正方形并缩放到 256
    side = max(icon.width, icon.height)
    sq = Image.new("RGB", (side, side), (255, 255, 255))
    sq.paste(icon, ((side - icon.width) // 2, (side - icon.height) // 2))
    sq = sq.resize((256, 256), Image.LANCZOS).convert("RGBA")

    # 4x 超采样圆角遮罩，去掉图标外的白底
    S = 4
    m = Image.new("L", (256 * S, 256 * S), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, 256 * S - 1, 256 * S - 1], radius=int(256 * S * 0.225), fill=255)
    m = m.resize((256, 256), Image.LANCZOS)
    sq.putalpha(m)

    out = G / out_name
    sq.save(out)
    print("saved", out_name, "from bbox", (x0, y0, x1, y1))
