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

def maskable(im, size=512, scale=0.8):
    """Android recorta em círculo/forma própria: desenho reduzido dentro da zona segura."""
    base = opaque(im)
    bg = Image.new("RGB", (size, size), base.getpixel((5, base.height // 2)))
    inner = int(size * scale)
    bg.paste(opaque(im).resize((inner, inner), Image.LANCZOS), ((size - inner) // 2,) * 2)
    return bg

def uri(im, size):
    buf = io.BytesIO()
    im.resize((size, size), Image.LANCZOS).save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()

def write_files(src):
    """Arquivos PNG usados pelo manifest (versão hospedada / PWA)."""
    out = ROOT / "icons"
    out.mkdir(exist_ok=True)
    jobs = [("icon-192.png", rounded(src), 192), ("icon-512.png", rounded(src), 512),
            ("maskable-512.png", maskable(src), 512), ("apple-touch-icon.png", opaque(src), 180)]
    for name, im, size in jobs:
        im.resize((size, size), Image.LANCZOS).save(out / name, "PNG", optimize=True)

def main():
    src = Image.open(SRC_IMG)
    write_files(src)
    tags = "\n".join([
        "<!--ICONS-->",
        f'<link rel="icon" type="image/png" sizes="64x64" href="{uri(rounded(src), 64)}">',
        f'<link rel="icon" type="image/png" sizes="192x192" href="{uri(rounded(src), 192)}">',
        f'<link rel="apple-touch-icon" sizes="180x180" href="{uri(opaque(src), 180)}">',
        '<meta name="apple-mobile-web-app-title" content="AW 139">',
        '<meta name="apple-mobile-web-app-capable" content="yes">',
        '<meta name="mobile-web-app-capable" content="yes">',
        '<meta name="theme-color" content="#123a63">',
        '<script>if(/^https?:$/.test(location.protocol)){document.write(\'<link rel="manifest" href="manifest.webmanifest">\')}</script>',
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
