(function(){
  var ids = ['absMat', 'absPil', 'absBase', 'absSpot', 'absDt'];
  var els = ids.map(function(id){ return document.getElementById(id); });
  var btn = document.getElementById('absClear');
  var KEY = 'aw139_abast_dados';
  function ler(){
    try { var r = localStorage.getItem(KEY); if (r) return JSON.parse(r) || {}; } catch (e) {}
    return window.__awAbastDados || {};
  }
  function salvar(){
    var o = {};
    ids.forEach(function(id, n){ o[id] = els[n].value; });
    window.__awAbastDados = o;
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }
  function estado(){
    var any = els.some(function(el){ return el.value.trim() !== ''; });
    btn.classList.toggle('abs-clean', !any);
  }
  // restaura os dados salvos (ficam até o botão LIMPAR ser usado)
  var mat = document.getElementById('absMat');
  // máscara AA-AAA: 2 caracteres alfanuméricos, traço sempre visível e mais 3 alfanuméricos
  function maiuscula(){
    var v = mat.value, caret = mat.selectionStart, antes = 0, c = '', k;
    if (caret === null || caret === undefined) caret = v.length;
    for (k = 0; k < v.length; k++){
      var ch = v.charAt(k).toUpperCase();
      if (/[A-Z0-9]/.test(ch) && c.length < 5){ c += ch; if (k < caret) antes++; }
    }
    if (c === ''){ if (mat.value !== '') mat.value = ''; return; }
    var a1 = c.slice(0, 2), a2 = c.slice(2);
    while (a1.length < 2) a1 += '_';
    while (a2.length < 3) a2 += '_';
    var nv = a1 + '-' + a2;
    if (mat.value !== nv){
      mat.value = nv;
      var pos = antes <= 2 ? antes : antes + 1;
      try { mat.setSelectionRange(pos, pos); } catch (e) {}
    }
  }
  mat.addEventListener('input', maiuscula);
  var salvo = ler();
  ids.forEach(function(id, n){ if (typeof salvo[id] === 'string') els[n].value = salvo[id]; });
  maiuscula();
  estado();
  function sync(){ setTimeout(function(){ salvar(); estado(); }, 0); }
  els.forEach(function(el){
    el.addEventListener('input', sync);
    el.addEventListener('click', sync);
    el.addEventListener('focus', sync);
  });
  btn.addEventListener('click', function(){
    els.forEach(function(el){ el.value = ''; });
    salvar(); estado();
  });
})();
