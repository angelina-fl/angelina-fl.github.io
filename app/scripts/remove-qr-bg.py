"""小程序码去背景：从边缘泛洪填充白色背景并设为透明，保留内部白色文字。"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

src = Path("/Applications/  /个人站/app/src/assets/gallery/qrcode-src.jpg")
dst = Path("/Applications/  /个人站/app/src/assets/gallery/juriji-qrcode.png")

im = Image.open(src).convert("RGB")
w, h = im.size

work = im.copy()
MARK = (255, 0, 255)
# 沿四边均匀取种子点做泛洪填充（阈值覆盖 JPEG 白色的轻微杂色）
seeds = []
for t in range(0, 21):
    x = int(t * (w - 1) / 20)
    y = int(t * (h - 1) / 20)
    seeds += [(x, 0), (x, h - 1), (0, y), (w - 1, y)]
for s in seeds:
    px = work.getpixel(s)
    # 只对接近白色的种子点泛洪，避免误伤图案
    if min(px) > 200:
        ImageDraw.floodfill(work, s, MARK, thresh=40)

alpha = Image.new("L", (w, h), 255)
pa = alpha.load()
pw = work.load()
for yy in range(h):
    for xx in range(w):
        if pw[xx, yy] == MARK:
            pa[xx, yy] = 0

# 收缩 1px 再轻微羽化，去掉白边
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))

out = im.convert("RGBA")
out.putalpha(alpha)
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)
out.thumbnail((480, 480), Image.LANCZOS)
out.save(dst)
print("saved", dst, out.size, dst.stat().st_size, "bytes")
