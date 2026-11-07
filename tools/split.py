#!/usr/bin/env python3
"""Separa um MENU-AW139.html (arquivo único) em src/ editável.

Uso: python3 tools/split.py caminho/para/MENU-AW139.html
"""
import json, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
MARK = "  const APPS = "

def main(path):
    lines = pathlib.Path(path).read_bytes().decode("utf-8").split("\n")
    idx = next(i for i, l in enumerate(lines) if l.startswith(MARK))
    apps = json.loads(lines[idx][len(MARK):].rstrip(";"))
    lines[idx] = MARK + "/*@@APPS@@*/;"
    SRC.mkdir(exist_ok=True)
    (SRC / "shell.html").write_bytes(("\n".join(lines)).encode("utf-8"))
    appsdir = SRC / "apps"
    order = []
    for key, app in apps.items():
        d = appsdir / key
        d.mkdir(parents=True, exist_ok=True)
        for old in d.glob("script-*.js"):
            old.unlink()
        (d / "style.css").write_bytes((app["style"]).encode("utf-8"))
        (d / "body.html").write_bytes((app["body"]).encode("utf-8"))
        for n, s in enumerate(app["scripts"], 1):
            (d / f"script-{n}.js").write_bytes((s).encode("utf-8"))
        order.append(key)
    (appsdir / "order.json").write_bytes((json.dumps(order, indent=2) + "\n").encode("utf-8"))
    print(f"{len(order)} apps extraídos para {appsdir}")

if __name__ == "__main__":
    main(sys.argv[1])
