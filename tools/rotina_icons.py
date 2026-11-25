#!/usr/bin/env python3
"""Gera os ícones do app Rotina Bristow em rotina/icons/ (checklist sobre fundo azul).

Uso: python3 tools/rotina_icons.py
"""
import pathlib
from PIL import Image, ImageDraw

OUT = pathlib.Path(__file__).resolve().parent.parent / "rotina" / "icons"
AZUL, VERDE, BRANCO, LINHA = (10, 61, 98), (31, 157, 85), (255, 255, 255), (197, 207, 217)
S = 1024  # desenha grande e reduz (antisserrilhado)


def desenha(fundo_cheio, escala):
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if fundo_cheio:
        d.rectangle([0, 0, S, S], fill=AZUL)
    else:
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * .22), fill=AZUL)
    c, k = S / 2, escala * S / 1024  # conteúdo centralizado, escalável (zona segura do maskable)
    p = lambda x, y: (c + (x - 512) * k, c + (y - 512) * k)
    # prancheta
    d.rounded_rectangle([*p(250, 190), *p(774, 860)], radius=int(60 * k), fill=BRANCO)
    d.rounded_rectangle([*p(400, 140), *p(624, 250)], radius=int(30 * k), fill=LINHA)
    for i, y in enumerate((360, 520, 680)):
        d.rounded_rectangle([*p(320, y - 50), *p(420, y + 50)], radius=int(18 * k),
                            fill=VERDE if i < 2 else BRANCO, outline=None if i < 2 else LINHA,
                            width=int(12 * k))
        if i < 2:
            d.line([p(342, y), p(364, y + 26), p(402, y - 26)], fill=BRANCO, width=int(18 * k), joint="curve")
        d.rounded_rectangle([*p(460, y - 16), *p(704, y + 16)], radius=int(16 * k), fill=LINHA)
    return im


OUT.mkdir(parents=True, exist_ok=True)
normal, mask = desenha(False, 1.0), desenha(True, 0.78)
for nome, im, px in (("icon-192.png", normal, 192), ("icon-512.png", normal, 512),
                     ("maskable-512.png", mask, 512), ("apple-touch-icon.png", mask, 180),
                     ("favicon-64.png", normal, 64)):
    im.resize((px, px), Image.LANCZOS).save(OUT / nome, optimize=True)
    print(OUT / nome)
