// =============================================================================
// Aba CAT A - PC 2: monta a cópia independente do app PC2 (módulo "catapc2")
// num compartimento isolado (Shadow DOM próprio), igual ao que a base faz com
// cada app: estilos e campos não se misturam com CLEAR AREA / HELIDECK OFFSHORE.
// Montado na primeira vez que a aba é aberta.
// =============================================================================
(function () {
  var host = document.getElementById('cataPc2Host');
  if (!host) return;
  var mounted = false;
  function mount() {
    if (mounted) return;
    var app = (typeof APPS !== 'undefined') ? APPS.catapc2 : null;
    if (!app) return;
    mounted = true;
    var realDocument = window.document;
    var root = host.shadowRoot || host.attachShadow({ mode: 'open' });
    root.innerHTML = '';
    var st = realDocument.createElement('style'); st.textContent = app.style; root.appendChild(st);
    var wrap = realDocument.createElement('div'); wrap.innerHTML = app.body; root.appendChild(wrap);
    // "document" dos scripts do PC2 aponta para este compartimento (getElementById, querySelector...)
    var shim = new Proxy(root, {
      get: function (target, prop) {
        if (prop in target) { var v = target[prop]; return typeof v === 'function' ? v.bind(target) : v; }
        var d = realDocument[prop]; return typeof d === 'function' ? d.bind(realDocument) : d;
      }
    });
    app.scripts.forEach(function (code) {
      try { new Function('document', 'window', code)(shim, window); }
      catch (err) {
        var box = realDocument.createElement('div');
        box.style.cssText = 'background:#b23a34;color:#fff;padding:12px;font-family:monospace;font-size:12px;white-space:pre-wrap;';
        box.textContent = 'Erro ao executar script do CAT A - PC 2: ' + (err && err.message ? err.message : err);
        root.appendChild(box);
      }
    });
    // inglês: mesma tradução dos demais apps, aplicada também a este compartimento
    if (window.AW && window.AW.lang === 'en' && typeof awTranslateTree === 'function') {
      awTranslateTree(root);
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          if (m.type === 'childList') m.addedNodes.forEach(awTranslateTree);
          else if (m.type === 'characterData') awTranslateTree(m.target);
          else if (m.type === 'attributes' && typeof awTranslateAttrs === 'function') awTranslateAttrs(m.target);
        });
      }).observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label', 'alt'] });
    }
  }
  host.addEventListener('cata-pc2-show', function () { mount(); });
})();
