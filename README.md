# AW 139 · Menu

App web (arquivo único, offline) com ferramentas de performance do AW139:
Abastecimento/PAX, CAT B, Clear Area (RTO), Consumo, Conversor, Drop Down,
Limitações, NDL, Power Check, ROC, Teto do Pairado e WAT. Interface em PT-BR/EN.

## Estrutura

```
index.html            # app final, autocontido — é o arquivo que se abre/distribui
src/shell.html        # menu, tela de app, roteador, traduções (AW_EN)
src/apps/order.json   # ordem dos apps no objeto APPS
src/apps/<app>/
  style.css           # CSS do app (isolado via Shadow DOM)
  body.html           # HTML do app
  script-N.js         # scripts do app, executados em ordem
tools/build.py        # src/ -> index.html
tools/split.py        # index.html (ou outro HTML único) -> src/
```

## Fluxo de trabalho

1. Edite os arquivos em `src/`.
2. Rode `python3 tools/build.py` para regenerar `index.html`.
3. Abra `index.html` no navegador.

Para importar uma nova versão gerada no chat: `python3 tools/split.py caminho/MENU-AW139.html`
seguido de `python3 tools/build.py`.

Mapa das chaves: `wat`, `rto` (Clear Area), `powercheck`, `dropdown`, `ndl`, `catb`,
`limitacoes`, `roc`, `fuel` (Consumo), `hover` (Teto do Pairado), `abastecimento`, `conversor`.
