// Abas principais do app CAT A: CLEAR AREA | HELIDECK OFFSHORE - PC2
(function () {
  var btns = document.querySelectorAll('.main-tab-btn');
  function show(key) {
    btns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-main') === key); });
    document.getElementById('mainPanelClear').classList.toggle('active', key === 'clear');
    document.getElementById('mainPanelHeli').classList.toggle('active', key === 'heli');
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-main')); }); });
})();
