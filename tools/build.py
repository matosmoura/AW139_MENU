#!/usr/bin/env python3
"""Monta index.html (arquivo único, autocontido) a partir de src/.

Uso: python3 tools/build.py [saida.html]   (padrão: index.html)
"""
import hashlib, json, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

def main(out):
    appsdir = SRC / "apps"
    order = json.loads((appsdir / "order.json").read_bytes().decode("utf-8"))
    apps = {}
    for key in order:
        d = appsdir / key
        scripts = sorted(d.glob("script-*.js"), key=lambda p: int(p.stem.split("-")[1]))
        apps[key] = {
            "style": (d / "style.css").read_bytes().decode("utf-8"),
            "body": (d / "body.html").read_bytes().decode("utf-8"),
            "scripts": [p.read_bytes().decode("utf-8") for p in scripts],
        }
    shell = (SRC / "shell.html").read_bytes().decode("utf-8")
    html = shell.replace("/*@@APPS@@*/", json.dumps(apps, ensure_ascii=False), 1)
    # versão = hash do conteúdo (aparece no rodapé do menu; muda só quando algo muda)
    ver = "v" + hashlib.sha1(html.encode("utf-8")).hexdigest()[:7]
    html = html.replace('<span class="app-ver"></span>', '<span class="app-ver"> · ' + ver + '</span>', 1)
    pathlib.Path(out).write_bytes((html).encode("utf-8"))
    print(f"gerado {out} ({len(html.encode('utf-8'))} bytes, {ver})")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "index.html"))
