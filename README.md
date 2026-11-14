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
tools/icons.py        # assets/icon-source.png -> ícones embutidos em src/shell.html
assets/icon-source.png# imagem original do ícone do app
```

## Fluxo de trabalho

1. Edite os arquivos em `src/`.
2. Rode `python3 tools/build.py` para regenerar `index.html`.
3. Abra `index.html` no navegador.

Para importar uma nova versão gerada no chat: `python3 tools/split.py caminho/MENU-AW139.html`
seguido de `python3 tools/build.py`.

Mapa das chaves: `wat`, `rto` (Clear Area), `powercheck`, `dropdown`, `ndl`, `catb`,
`limitacoes`, `roc`, `fuel` (Consumo), `hover` (Teto do Pairado), `abastecimento`, `conversor`,
`helideck` (Pouso - Limite de Peso · CAT A - Helideck Offshore), `vento` (Benefício de Vento).
O app `rto` (botão CAT A) tem as abas CLEAR AREA / PC 1, HELIDECK OFFSHORE / PC 2 (`script-4.js`)
e CAT A / PC 2. Esta última monta o módulo `catapc2` (sem botão no menu) num Shadow DOM próprio
(`rto/script-5.js`): cópia independente do app PC2, com motor W.A.T próprio (`window.CATA_PC2_ENGINE`)
e dados salvos em `cataPc2InputsV1`.
A biblioteca html2canvas (imagem dos relatórios) fica em `src/shell.html` e é compartilhada.

## Ícone do app

Para trocar o ícone, substitua `assets/icon-source.png` (quadrado) e rode
`python3 tools/icons.py && python3 tools/build.py`. São gerados favicon (64 e 192 px)
e apple-touch-icon (180 px, usado ao adicionar à tela inicial no iPhone/Android).

## Publicação (GitHub Pages)

Site: https://matosmoura.github.io/AW139_MENU/

Ativação (uma vez): Settings → Pages → Build and deployment → Source: **Deploy from a branch**,
Branch: **main** / **(root)** → Save. Cada push no `main` atualiza o site em ~1 minuto.

Quando aberto pelo site, o app é instalável (PWA): `manifest.webmanifest` + `icons/` dão o
ícone e o nome na tela inicial, e `sw.js` guarda o app em cache para uso offline (rede primeiro,
cache como reserva). Aberto direto como arquivo, o `index.html` continua funcionando sozinho.
