(function(){
'use strict';
var E = window.CATA_PC2_ENGINE;
var cat = null, mode = null, RAW = {};
function el(id){ return document.getElementById(id); }
function place(v){
  var d = el('pc2DetPanel'), host = el(v);
  if (d && host && d.parentNode !== host) host.appendChild(d);
}
function show(v){
  if (v === 'pc2Menu' || v === 'pc2Det') place(v);
  ['pc2Main','pc2Menu','pc2Det'].forEach(function(id){ var e = el(id); if (e) e.style.display = (id===v ? '' : 'none'); });
  try { window.scrollTo(0,0); } catch(e){}
}
function en(){ return window.AW && window.AW.lang === 'en'; }
function fmt(kg){ return en() ? Math.round(kg * 2.20462262) + ' lb' : kg + ' kg'; }
function nome(){ return (E && E.WAT_GRID && E.WAT_GRID[cat]) ? E.WAT_GRID[cat].nome : cat; }
window.__cataPc2Open = function(c){
  cat = c; mode = null;
  el('pc2MenuCat').textContent = nome();
  var enh = (c === 'CAT_A_ENHANCED_OFFSHORE');
  document.querySelectorAll('.pc2-opt').forEach(function(b){
    var m = b.getAttribute('data-mode');
    b.style.display = (enh ? m === 'enh' : m !== 'enh') ? '' : 'none';
  });
  if (window.__cataPc2HideDetail) window.__cataPc2HideDetail();
  show('pc2Menu');
};
function fillEnh(){
  var t = parseFloat(String(el('watTemp').value).replace(',', '.'));
  [['pc2P1',200],['pc2P2',1000]].forEach(function(p){
    var out = el(p[0]);
    if (isNaN(t) || !window.__cataPc2MaxW){ out.value = ''; RAW[p[0]] = null; return; }
    var r = window.__cataPc2MaxW(p[1], t, 150);
    RAW[p[0]] = r;
    out.value = (r.kg != null) ? fmt(r.kg) : (r.txt === 'abaixo' ? '< ' + fmt(4400) : (en() ? 'Out of envelope' : 'Fora do envelope'));
  });
}
function fillHoge(){
  var out = el('pc2Hoge'), warn = el('pc2HogeWarn');
  var cfg = (window.__cataPc2GetCfg && window.__cataPc2GetCfg()) || 'padrao';
  var lbl = (E && E.CFG_LABELS && E.CFG_LABELS[cfg]) || cfg;
  el('pc2Cfg').value = String(lbl).toUpperCase();
  var h = parseFloat(String(el('watAlt').value).replace(',', '.'));
  var t = parseFloat(String(el('watTemp').value).replace(',', '.'));
  var wmax = window.__cataPc2HogeMax || 6800;
  warn.textContent = ''; warn.style.display = 'none';
  RAW.hoge = null;
  if (isNaN(h) || isNaN(t) || !window.__cataPc2Hoge){ out.value = ''; return; }
  var r = window.__cataPc2Hoge(h, t, cfg);
  if (r.kg != null) RAW.hoge = { kg: r.kg, lt: !!r.below };
  if (r.kg != null && !r.below) out.value = (r.atLeast ? '≥ ' : '') + fmt(r.kg);
  else if (r.below) out.value = '< ' + fmt(r.kg);
  else if (r.txt === 'alt8000') out.value = en() ? 'No data above 8000 ft' : 'Sem dado acima de 8000 ft';
  else out.value = en() ? 'Out of envelope' : 'Fora do envelope';
  // aviso só quando o valor depende de peso sem gráfico (acima de 6800 kg)
  if (r.atLeast){
    warn.textContent = en()
      ? 'Warning: there is no AEO TOP HOGE chart for weights above ' + fmt(wmax) + ' (7000 kg). The value shown is the limit of the charts.'
      : 'Atenção: não existe gráfico HOGE AEO TOP para peso acima de ' + wmax + ' kg (7000 kg). O valor indicado é o limite dos gráficos.';
    warn.style.display = '';
  }
}
function num(s){ var v = parseFloat(String(s).replace(',', '.')); return isNaN(v) ? null : v; }
function fillDd(){ RAW.dd = null; fillDd0(); fillPmdMin(); }
function fillDd0(){
  var out = el('pc2Dd'), warn = el('pc2DdWarn');
  warn.textContent = ''; warn.style.display = 'none'; out.value = ''; out.style.fontSize = '';
  var h = num(el('watAlt').value), t = num(el('watTemp').value), v = num(el('watVento').value);
  if (v == null) v = 0;
  if (h == null || t == null || !window.__cataPc2Dd || RAW.pmd == null) return;
  var c = [RAW.pmd], bad = false;
  if (RAW.pmc != null) c.push(RAW.pmc);
  ['pc2P1', 'pc2P2'].forEach(function(id){
    var r = RAW[id];
    if (r && r.kg != null) c.push(r.kg);
    else if (r && r.txt === 'abaixo') c.push(4400);
    else bad = true;
  });
  function msg(sh, lg){
    out.value = sh; out.style.fontSize = '13px';
    if (lg){ warn.textContent = lg; warn.style.display = ''; }
  }
  if (bad){ msg(en() ? 'Out of envelope' : 'Fora do envelope'); return; }
  var mw = Math.min.apply(null, c);
  var r = window.__cataPc2Dd({ w: mw, alt: h, oat: t, wind: v, deck: num(el('pc2Deck').value) });
  if (r.err === 'alt') msg(en() ? 'No data' : 'Sem dado', en() ? 'Altitude above 300 ft: outside the drop down tables (0 to 300 ft).' : 'Altitude acima de 300 ft: fora das tabelas de drop down (0 a 300 ft).');
  else if (r.err === 'temp') msg(en() ? 'No data' : 'Sem dado', en() ? 'Temperature above 50 °C: outside the drop down tables (10 to 50 °C).' : 'Temperatura acima de 50 °C: fora das tabelas de drop down (10 a 50 °C).');
  else if (r.err === 'wind') msg(en() ? 'No data' : 'Sem dado', en() ? 'Wind above 45 kt: outside the wind conversion chart (up to 45 kt).' : 'Vento acima de 45 kt: fora do gráfico de conversão de vento (até 45 kt).');
  else if (r.err === 'none') msg(en() ? 'No weight' : 'Sem peso', en() ? 'No weight from 6000 kg meets the helideck height entered (or it is beyond the table limit).' : 'Nenhum peso a partir de 6000 kg atende à altura do deque informada (ou está além do limite da tabela).');
  else {
    RAW.dd = r.kg;
    out.value = fmt(r.kg) + ' / ' + Math.round(r.dd) + ' ft';
    out.style.fontSize = (out.value.length > 15 ? '13px' : '14px');
  }
}
function fillPmdMin(){
  var out = el('pc2PmdMin'); out.value = '';
  if (RAW.pmd == null) return;
  var c = [];
  function add(kg, lt){ if (kg == null || isNaN(kg)) return; c.push([kg, !!lt]); }
  function path(id){ var r = RAW[id]; if (!r) return; if (r.kg != null) add(r.kg, false); else if (r.txt === 'abaixo') add(4400, true); }
  add(RAW.pmc); add(RAW.pmd);
  if (mode === 'enh') path('pc2P1');
  path('pc2P2');
  if (mode === 'com' && RAW.hoge) add(RAW.hoge.kg, RAW.hoge.lt);
  if (mode === 'enh' && RAW.dd != null) add(RAW.dd, false);
  var best = c[0];
  c.forEach(function(x){ if (x[0] < best[0]) best = x; });
  out.value = (best[1] ? '< ' : '') + fmt(best[0]);
}
function openMode(m){
  mode = m;
  var h = el('pc2DetHead'); h.textContent = nome();
  var sub = document.createElement('span'); sub.className = 'pc2-sub';
  sub.textContent = (m === 'sem' ? 'PC 2 - SEM EXPOSIÇÃO' : m === 'enh' ? 'PC 2e - ENHANCED' : 'PC 2 - COM EXPOSIÇÃO');
  h.appendChild(sub);
  if (m !== 'enh'){
    var note = document.createElement('span'); note.className = 'pc2-note';
    note.textContent = (m === 'sem') ? 'Capacidade de pouso forçado seguro - Obrigatório' : 'Sem capacidade de pouso forçado seguro.';
    h.appendChild(note);
  }
  var kg = window.__cataPc2Pmd && window.__cataPc2Pmd[cat];
  RAW.pmd = kg == null ? null : kg;
  el('pc2Pmd').value = (kg == null) ? '' : fmt(kg);
  var mx = null, g = E && E.WAT_GRID && E.WAT_GRID[cat];
  if (g) ['6400','6800','7000'].forEach(function(f){ if (g[f]) mx = +f; });
  RAW.pmc = mx;
  el('pc2Pmc').value = (mx == null) ? '' : fmt(mx);
  [['pc2RoAlt','watAlt'],['pc2RoTemp','watTemp'],['pc2RoVento','watVento']].forEach(function(p){
    var src = el(p[1]); el(p[0]).value = src ? src.value : '';
  });
  document.querySelectorAll('.pc2-enh').forEach(function(x){ x.style.display = (m === 'enh') ? '' : 'none'; });
  fillEnh();
  el('pc2SemReq').style.display = (m === 'sem') ? '' : 'none';
  el('pc2EnhReq').style.display = (m === 'enh') ? '' : 'none';
  el('pc2ComReq').style.display = (m === 'com') ? '' : 'none';
  if (m === 'enh') fillDd(); else { el('pc2DdWarn').style.display = 'none'; }
  document.querySelectorAll('.pc2-hoge').forEach(function(x){ x.style.display = (m === 'com') ? '' : 'none'; });
  if (m === 'com') fillHoge();
  fillPmdMin();
  show('pc2Det');
  if (window.__cataPc2ShowDetail) window.__cataPc2ShowDetail(cat);
}
el('pc2Deck').addEventListener('input', fillDd);
el('pc2BackMenu').addEventListener('click', function(){ if (window.__cataPc2HideDetail) window.__cataPc2HideDetail(); show('pc2Main'); });
el('pc2BackDet').addEventListener('click', function(){ if (window.__cataPc2HideDetail) window.__cataPc2HideDetail(); show('pc2Menu'); });
document.querySelectorAll('.pc2-opt').forEach(function(b){
  b.addEventListener('click', function(){ openMode(b.getAttribute('data-mode')); });
});
})();
