// Abas principais do app CAT A: CLEAR AREA | HELIDECK OFFSHORE | CAT A - PC 2
(function () {
  var btns = document.querySelectorAll('.main-tab-btn');
  var PANELS = { clear: 'mainPanelClear', heli: 'mainPanelHeli', catpc2: 'mainPanelCatPc2' };
  function show(key) {
    btns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-main') === key); });
    Object.keys(PANELS).forEach(function (k) { var p = document.getElementById(PANELS[k]); if (p) p.classList.toggle('active', k === key); });
    if (key === 'catpc2') { var h = document.getElementById('cataPc2Host'); if (h) h.dispatchEvent(new CustomEvent('cata-pc2-show')); }
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-main')); }); });

  // letra das abas: o maior tamanho (até 12 px) em que todos os nomes cabem sem corte
  var bar = document.querySelector('.main-tabbar');
  function fit() {
    if (!bar || !bar.offsetWidth) return;
    var fs = 12;
    bar.style.setProperty('--main-tab-fs', fs + 'px');
    function over() { for (var i = 0; i < btns.length; i++) if (btns[i].scrollWidth > btns[i].clientWidth + 1) return true; return false; }
    while (fs > 7 && over()) { fs -= 0.25; bar.style.setProperty('--main-tab-fs', fs + 'px'); }
  }
  window.addEventListener('resize', fit);
  requestAnimationFrame(fit);
})();
