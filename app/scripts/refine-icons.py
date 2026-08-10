"""图标二次处理：

1. icon-sql.png —— 原图外圈还留着一圈截图带出来的白边/浅灰过渡，
   按"有饱和度或够深"找到图标本体的 bbox，再往里收几像素把过渡带切掉，
   重新缩放到 256 并盖一层圆角 alpha，边缘就是那块蓝底本身。

2. icon-claude.png —— 只保留中间那朵白色的花：用蓝通道把白花从橙底里分离成 alpha
   （橙底 B≈77、白花 B≈255），再整片填成 Claude 橙，产出一朵透明底的橙色花。
"""
from pathlib import Path
from PIL import Image, ImageDraw

G = Path(__file__).resolve().parent.parent / "src/assets/gallery"

CLAUDE_ORANGE = (217, 119, 87)  # #D97757


def rounded_alpha(size: int, radius_ratio: float = 0.225, supersample: int = 4) -> Image.Image:
    """4x 超采样的圆角遮罩，避免圆角边缘出现锯齿。"""
    s = supersample
    m = Image.new("L", (size * s, size * s), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [0, 0, size * s - 1, size * s - 1], radius=int(size * s * radius_ratio), fill=255
    )
    return m.resize((size, size), Image.LANCZOS)


def trim_sql(name: str = "icon-sql.png", inset: int = 5) -> None:
    im = Image.open(G / name).convert("RGB")
    w, h = im.size
    px = im.load()

    mask = Image.new("L", (w, h), 0)
    mp = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            # 本体 = 明显有色相 或 明显偏暗；截图底色和白边两者都不满足
            if (max(r, g, b) - min(r, g, b) > 40) or (max(r, g, b) < 170):
                mp[x, y] = 255

    x0, y0, x1, y1 = mask.getbbox()
    # 往里收 inset 像素，连白边一起把半透明的过渡带切干净
    x0, y0 = x0 + inset, y0 + inset
    x1, y1 = x1 - inset, y1 - inset

    icon = im.crop((x0, y0, x1, y1)).resize((256, 256), Image.LANCZOS).convert("RGBA")
    icon.putalpha(rounded_alpha(256))
    icon.save(G / name)
    print(f"{name}: 裁到 {(x0, y0, x1, y1)}，白边已去")


def flower_only(name: str = "icon-claude.png", keep_radius: float = 0.43) -> None:
    im = Image.open(G / name).convert("RGBA")
    w, h = im.size
    px = im.load()
    cx, cy = (w - 1) / 2, (h - 1) / 2
    # 花瓣最远只到中心 96px，圆角边上那圈浅色过渡在 123px 以外——从中心画个圈就能分开
    limit = min(w, h) * keep_radius

    out = Image.new("RGBA", (w, h), (*CLAUDE_ORANGE, 0))
    op = out.load()
    lo, hi = 90.0, 250.0  # 橙底的蓝通道 ~77，白花 ~255，取中间一段做线性映射
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 250 or (x - cx) ** 2 + (y - cy) ** 2 > limit**2:
                continue
            alpha = (b - lo) / (hi - lo)
            alpha = 0.0 if alpha < 0 else 1.0 if alpha > 1 else alpha
            if alpha > 0:
                op[x, y] = (*CLAUDE_ORANGE, round(alpha * 255))

    bbox = out.getbbox()
    out = out.crop(bbox)
    # 贴回正方形画布并留一点余量，缩放时花瓣不会顶到边
    side = round(max(out.width, out.height) * 1.06)
    sq = Image.new("RGBA", (side, side), (*CLAUDE_ORANGE, 0))
    sq.paste(out, ((side - out.width) // 2, (side - out.height) // 2))
    sq.resize((256, 256), Image.LANCZOS).save(G / name)
    print(f"{name}: 只留白花并染成 #{'%02X%02X%02X' % CLAUDE_ORANGE}，原始花瓣 bbox {bbox}")


if __name__ == "__main__":
    trim_sql()
    flower_only()
