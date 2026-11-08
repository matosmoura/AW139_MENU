#!/usr/bin/env python3
"""Gera os ícones do app a partir de assets/icon-source.png e os embute
(data URI) no <head> de src/shell.html, entre os marcadores ICONS.

Uso: python3 tools/icons.py && python3 tools/build.py
"""
import base64, io, pathlib, re
from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC_IMG = ROOT / "assets" / "icon-source.png"
SHELL = ROOT / "src" / "shell.html"
RADIUS = 0.235  # raio do canto do quadrado azul, em fração do lado

def rounded(im):
    """Cantos transparentes (remove o branco fora do quadrado arredondado)."""
    big = im.convert("RGBA")
    mask = Image.new("L", big.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, big.width - 1, big.height - 1], radius=int(big.width * RADIUS), fill=255)
    big.putalpha(mask)
    return big

def opaque(im):
    """Fundo azul nos cantos (iOS aplica a própria máscara e não aceita transparência)."""
    r = rounded(im)
    bg = Image.new("RGBA", r.size, im.convert("RGB").getpixel((5, im.height // 2)) + (255,))
    bg.alpha_composite(r)
    return bg.convert("RGB")

def uri(im, size):
    buf = io.BytesIO()
    im.resize((size, size), Image.LANCZOS).save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()

def main():
    src = Image.open(SRC_IMG)
    tags = "\n".join([
        "<!--ICONS-->",
        f'<link rel="icon" type="image/png" sizes="64x64" href="{uri(rounded(src), 64)}">',
        f'<link rel="icon" type="image/png" sizes="192x192" href="{uri(rounded(src), 192)}">',
        f'<link rel="apple-touch-icon" sizes="180x180" href="{uri(opaque(src), 180)}">',
        '<meta name="apple-mobile-web-app-title" content="AW 139">',
        "<!--/ICONS-->",
    ])
    html = SHELL.read_bytes().decode("utf-8")
    if "<!--ICONS-->" in html:
        html = re.sub(r"<!--ICONS-->.*?<!--/ICONS-->", lambda m: tags, html, flags=re.S)
    else:
        html = html.replace("<title>", tags + "\n<title>", 1)
    SHELL.write_bytes(html.encode("utf-8"))
    print("ícones embutidos em", SHELL)

if __name__ == "__main__":
    main()
