// W.A.T — fonte das categorias ajustada ao maior tamanho que cabe na tela,
// sem quebra de linha nem corte de nenhum nome (a coluna Categoria fica com o
// espaço que sobra das colunas 6400/6800/7000 kg e P.M.D).
(function () {
  var table = document.getElementById('watGridTable');
  var body = document.getElementById('watGridBody');
  if (!table || !body) return;
  var MAX = 16, MIN = 10, STEP = 0.25, busy = false;
  function fits() {
    var wrap = table.parentNode;
    if (table.getBoundingClientRect().width > wrap.clientWidth || wrap.scrollWidth > wrap.clientWidth) return false;
    var ths = table.querySelectorAll('thead th');
    for (var k = 0; k < ths.length; k++) if (ths[k].scrollWidth > ths[k].clientWidth + 1) return false;
    var btns = table.querySelectorAll('.wat-cat-btn');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      if (b.scrollWidth > b.clientWidth + 1 || b.getBoundingClientRect().height > b.__h1 * 1.6) return false;
    }
    return true;
  }
  function fit() {
    if (busy || !table.isConnected || !table.offsetWidth) return;
    var btns = table.querySelectorAll('.wat-cat-btn');
    if (!btns.length) return;
    busy = true;
    // altura de referência de uma linha (com a fonte mínima)
    table.style.setProperty('--wat-cat-fs', MIN + 'px');
    for (var i = 0; i < btns.length; i++) btns[i].__h1 = btns[i].getBoundingClientRect().height || 30;
    var fs = MAX;
    table.style.setProperty('--wat-cat-fs', fs + 'px');
    while (fs > MIN && !fits()) { fs -= STEP; table.style.setProperty('--wat-cat-fs', fs + 'px'); }
    busy = false;
  }
  new MutationObserver(function () { requestAnimationFrame(fit); }).observe(body, { childList: true, subtree: true, characterData: true });
  window.addEventListener('resize', fit);
  requestAnimationFrame(fit);
})();
