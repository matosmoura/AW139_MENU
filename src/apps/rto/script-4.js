// =============================================================================
// HELIDECK OFFSHORE - PC2 (aba do app CAT A)
// Calculadora Offshore Classe 2 — helideck elevado / helipad offshore em solo
// com exposição · Tabelas de 21-Oct-23 · EAPS OFF.
// Lógica e tabelas idênticas ao app original "AW139 – Calculadora Offshore PC2";
// visual, tradução, LIMPAR e relatório no padrão dos demais apps.
// =============================================================================
(function () {
  var EN = !!(window.AW && window.AW.lang === 'en');
  var T = function (pt, en) { return EN ? en : pt; };
  var $ = function (id) { return document.getElementById(id); };

  // textos fixos em inglês
  if (EN) {
    document.querySelectorAll('#mainPanelHeli [data-en]').forEach(function (el) { el.textContent = el.getAttribute('data-en'); });
    document.querySelectorAll('#mainPanelHeli [data-en-ph]').forEach(function (el) { el.placeholder = el.getAttribute('data-en-ph'); });
    $('pc2Now').title = 'Update to now'; $('pc2Now').setAttribute('aria-label', 'Update to now');
    $('pc2Frame').title = 'Report preview';
  }

  // Tabela 1: combustível máx (lbs). Linhas = OAT 25..45; colunas = 1..15 pax
  var T1 = [
  [3300,3300,3300,3300,3300,3100,2900,2700,2500,2300,2100,1900,1700,1500,1300],
  [3300,3300,3300,3300,3300,3100,2900,2700,2500,2300,2100,1900,1700,1500,1300],
  [3300,3300,3300,3300,3300,3100,2900,2700,2500,2300,2100,1900,1700,1500,1300],
  [3300,3300,3300,3300,3300,3100,2900,2700,2500,2300,2100,1900,1700,1500,1300],
  [3300,3300,3300,3300,3300,3100,2900,2700,2500,2300,2100,1900,1700,1500,1300],
  [3300,3300,3300,3300,3267,3067,2867,2667,2467,2267,2067,1867,1667,1467,1267],
  [3300,3300,3300,3300,3200,3000,2800,2600,2400,2200,2000,1800,1600,1400,1200],
  [3300,3300,3300,3300,3134,2934,2734,2534,2334,2134,1934,1734,1534,1334,1134],
  [3300,3300,3300,3267,3067,2867,2667,2467,2267,2067,1867,1667,1467,1267,1067],
  [3300,3300,3300,3201,3001,2801,2601,2401,2201,2001,1801,1601,1401,1201,1001],
  [3300,3300,3300,3134,2934,2734,2534,2334,2134,1934,1734,1534,1334,1134,934],
  [3300,3300,3267,3067,2867,2667,2467,2267,2067,1867,1667,1467,1267,1067,867],
  [3300,3300,3201,3001,2801,2601,2401,2201,2001,1801,1601,1401,1201,1001,801],
  [3300,3300,3134,2934,2734,2534,2334,2134,1934,1734,1534,1334,1134,934,734],
  [3300,3268,3068,2868,2668,2468,2268,2068,1868,1668,1468,1268,1068,868,668],
  [3300,3201,3001,2801,2601,2401,2201,2001,1801,1601,1401,1201,1001,801,601],
  [3300,3111,2911,2711,2511,2311,2111,1911,1711,1511,1311,1111,911,711,511],
  [3221,3021,2821,2621,2421,2221,2021,1821,1621,1421,1221,1021,821,621,421],
  [3131,2931,2731,2531,2331,2131,1931,1731,1531,1331,1131,931,731,531,331],
  [3041,2841,2641,2441,2241,2041,1841,1641,1441,1241,1041,841,641,441,241],
  [2951,2751,2551,2351,2151,1951,1751,1551,1351,1151,951,751,551,351,151]
  ];
  // Tabela 2: peso máx decolagem (lbs). Linhas = alt 0,100..1000 ft; colunas = OAT 25..45
  var T2 = [
  [14994,14994,14994,14994,14994,14994,14994,14994,14994,14983,14921,14856,14787,14715,14640,14562,14478,14390,14299,14202,14101],
  [14994,14994,14994,14994,14994,14994,14994,14994,14994,14935,14873,14807,14738,14666,14590,14511,14427,14339,14246,14149,14047],
  [14994,14994,14994,14994,14994,14994,14994,14994,14947,14887,14825,14759,14690,14617,14541,14460,14376,14287,14194,14096,13993],
  [14994,14994,14994,14994,14994,14994,14994,14955,14898,14838,14775,14709,14640,14567,14490,14409,14324,14235,14141,14042,13938],
  [14994,14994,14994,14994,14994,14994,14960,14905,14848,14788,14725,14659,14589,14515,14438,14357,14271,14181,14086,13987,13882],
  [14994,14994,14994,14994,14994,14961,14909,14854,14797,14736,14673,14606,14535,14461,14383,14295,14213,14122,14026,13924,13818],
  [14994,14994,14994,14994,14956,14907,14855,14800,14743,14682,14619,14552,14481,14407,14329,14246,14159,14068,13972,13870,13764],
  [14994,14994,14991,14947,14900,14851,14799,14744,14687,14626,14563,14496,14425,14351,14273,14190,14103,14012,13916,13814,13708],
  [14994,14977,14935,14891,14844,14795,14743,14688,14631,14570,14507,14440,14369,14295,14217,14134,14047,13956,13860,13758,13652],
  [14961,14921,14879,14835,14788,14739,14687,14632,14575,14514,14451,14384,14313,14239,14161,14078,13991,13900,13804,13702,13596],
  [14905,14865,14823,14779,14732,14683,14631,14576,14519,14458,14395,14328,14257,14183,14105,14022,13935,13844,13748,13646,13540]
  ];
  var BOWREF = 10294, PAXW = 200, MINFUEL = 600, MAXFUEL = 3300, AC = -110, WIND = 400, LB_KG = 0.45359237;
  var DEFAULTS = { pc2Bow: '10294', pc2Oat: '32', pc2Alt: '0', pc2Pax: '8', pc2Pw: '1600', pc2Fuel: '1500', pc2Avg: '200' };
  var unit = 'lbs', mode = 1;

  for (var i = 0; i <= 15; i++) { var o = document.createElement('option'); o.value = i; o.textContent = i; $('pc2Pax').appendChild(o); }
  $('pc2Pax').value = 8;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function interp1(arr, x) { var i = Math.min(Math.floor(x), arr.length - 2); return lerp(arr[i], arr[i + 1], x - i); }

  // Limite de peso de decolagem (lbs) para OAT/altitude, com ajustes.
  // Tabela 1 equivale a um limite de peso total: BOW ref + pax padrão + combustível.
  // A coluna de 15 pax nunca é limitada pelo teto de combustível, então dela se obtém o limite.
  function weightLimit(oat, alt, ac, wind) {
    var err = [], notes = [];
    if (isNaN(oat) || oat > 45) err.push(T('OAT acima de 45 °C: sem dados nas tabelas.', 'OAT above 45 °C: no data in the tables.'));
    if (isNaN(alt) || alt > 1000) err.push(T('Altitude-pressão acima de 1000 ft: sem dados nas tabelas.', 'Pressure altitude above 1000 ft: no data in the tables.'));
    if (err.length) return { err: err };
    var o = oat; if (o < 25) { o = 25; notes.push(T('OAT < 25 °C: usada a linha de 25 °C.', 'OAT < 25 °C: 25 °C row used.')); }
    var a = Math.max(alt, 0); if (alt < 0) notes.push(T('Altitude < 0 ft: usado nível do mar.', 'Altitude < 0 ft: sea level used.'));
    var x = o - 25, y = a / 100;
    var L1 = interp1(T1.map(function (r) { return BOWREF + 15 * PAXW + r[14]; }), x);
    var i = Math.min(Math.floor(y), 9);
    var rtow = lerp(interp1(T2[i], x), interp1(T2[i + 1], x), y - i);
    var adj = (ac ? AC : 0) + (wind ? WIND : 0);
    return { L: Math.min(L1, rtow) + adj, adj: adj, notes: notes };
  }
  // Modo 1: combustível máximo com passageiros de peso pw
  function calc1(w, bow, crew, pw) {
    var avail = w.L - bow - crew - pw;
    var fuel = Math.min(MAXFUEL, avail);
    var tow = bow + crew + pw + Math.max(fuel, 0);
    return { fuel: fuel, tow: tow, margin: w.L - tow };
  }
  // Modo 2: passageiros máximos com combustível fuel
  function calc2(w, bow, crew, fuel, avg) {
    var payload = w.L - bow - crew - fuel;
    var maxW = Math.max(payload, 0);
    var n = Math.min(15, Math.floor(maxW / avg));
    return { payload: payload, maxW: maxW, n: n, tow: bow + crew + fuel + maxW };
  }

  var LOC = EN ? 'en-US' : 'pt-BR';
  function fmt(v) { var n = unit === 'kg' ? v * LB_KG : v; return Math.round(n).toLocaleString(LOC) + ' ' + unit; }
  var cur = [], lastOk = true;
  function rowH(l, v, big) { return '<div class="pc2-res' + (big ? ' big' : '') + '"><span>' + l + '</span><b>' + v + '</b></div>'; }
  function alH(c, t) { return '<div class="pc2-alert ' + c + '">' + t + '</div>'; }
  function row(l, v, big) { cur.push({ k: 'r', l: l, v: v, big: big }); return rowH(l, v, big); }
  function al(c, t) { cur.push({ k: 'a', c: c, t: t }); return alH(c, t); }
  function num(id) { return parseFloat(String($(id).value).replace(',', '.')); }

  function render() {
    cur = []; lastOk = true;
    var k = unit === 'kg' ? 1 / LB_KG : 1;
    var oat = num('pc2Oat'), alt = num('pc2Alt'), bow = num('pc2Bow') * k, crew = num('pc2Crew') * k;
    var err = [];
    if (!(bow > 0)) err.push(T('BOW: informe o peso básico operacional.', 'BOW: enter the basic operating weight.'));
    if (isNaN(crew) || crew < 0) err.push(T('Tripulação: informe um peso válido (0 ou mais).', 'Crew: enter a valid weight (0 or more).'));
    var pw, fuel, avg;
    if (mode === 1) { pw = num('pc2Pw') * k; if (isNaN(pw) || pw < 0) err.push(T('Peso dos passageiros: informe 0 ou mais.', 'Passenger weight: enter 0 or more.')); }
    else {
      fuel = num('pc2Fuel') * k; avg = num('pc2Avg') * k;
      if (isNaN(fuel) || fuel < 0) err.push(T('Combustível a bordo: informe 0 ou mais.', 'Fuel on board: enter 0 or more.'));
      if (!(avg > 0)) err.push(T('Peso/pax: informe um valor maior que 0.', 'Weight/pax: enter a value greater than 0.'));
    }
    var w = weightLimit(oat, alt, $('pc2Ac').checked, $('pc2Wind').checked);
    if (w.err) err.push.apply(err, w.err);
    var out = $('pc2Out');
    updateClear();
    if (err.length) { lastOk = false; out.innerHTML = err.map(function (e) { return al('bad', e); }).join(''); return; }
    var h = '', r;
    if (mode === 1) {
      r = calc1(w, bow, crew, pw);
      h += row(T('Combustível máx. a abastecer', 'Max. fuel to load'), fmt(Math.max(r.fuel, 0)), 1);
      h += row(T('Peso máx. decolagem', 'Max. takeoff weight'), fmt(w.L), 1);
      h += row(T('Peso passageiros', 'Passenger weight'), fmt(pw));
      h += row(T('BOW + tripulação', 'BOW + crew'), fmt(bow + crew));
      h += row(T('Peso de decolagem resultante', 'Resulting takeoff weight'), fmt(r.tow));
      h += row(T('Margem restante', 'Remaining margin'), fmt(Math.max(r.margin, 0)));
      if (w.adj !== 0) h += row(T('Ajustes aplicados', 'Adjustments applied'), (w.adj > 0 ? '+' : '') + fmt(w.adj));
      if (r.fuel < 0) h += al('bad', T('Sem capacidade: BOW, tripulação e passageiros já excedem o peso máximo em ', 'No capacity: BOW, crew and passengers already exceed the maximum weight by ') + fmt(-r.fuel) + '.');
      else if (r.fuel < MINFUEL) h += al('bad', T('⚠ Combustível máx. abaixo do mínimo de ', '⚠ Max. fuel below the minimum of ') + fmt(MINFUEL) + T('. Reduza passageiros.', '. Reduce passengers.'));
      else if (r.fuel >= MAXFUEL) h += al('ok', T('Limitado pelo teto de ', 'Limited by the ') + fmt(MAXFUEL) + T(' de combustível (sobra ', ' fuel ceiling (') + fmt(r.margin) + T(' de peso).', ' of weight left).'));
      else h += al('ok', T('Combustível máx. acima do mínimo de ', 'Max. fuel above the minimum of ') + fmt(MINFUEL) + '.');
    } else {
      r = calc2(w, bow, crew, fuel, avg);
      h += row(T('Máx. passageiros', 'Max. passengers'), r.n + ' pax', 1);
      h += row(T('Peso máx. passageiros', 'Max. passenger weight'), fmt(r.maxW), 1);
      h += row(T('Combustível a bordo', 'Fuel on board'), fmt(fuel));
      h += row(T('Peso máx. decolagem', 'Max. takeoff weight'), fmt(w.L));
      h += row(T('BOW + tripulação', 'BOW + crew'), fmt(bow + crew));
      h += row(T('Peso de decolagem resultante', 'Resulting takeoff weight'), fmt(r.tow));
      if (w.adj !== 0) h += row(T('Ajustes aplicados', 'Adjustments applied'), (w.adj > 0 ? '+' : '') + fmt(w.adj));
      if (r.payload < 0) h += al('bad', T('Sem capacidade: o combustível a bordo já excede o peso máximo em ', 'No capacity: the fuel on board already exceeds the maximum weight by ') + fmt(-r.payload) + T('. Considere desabastecer.', '. Consider defueling.'));
      else if (r.n === 0) h += al('bad', T('Nenhum passageiro cabe com este combustível (', 'No passenger fits with this fuel (') + fmt(r.maxW) + T(' disponíveis, menos que ', ' available, less than ') + fmt(avg) + ').');
      else if (r.n === 15) h += al('ok', T('Limitado a 15 passageiros (tabela). Peso disponível: ', 'Limited to 15 passengers (table). Available weight: ') + fmt(r.maxW) + '.');
      if (fuel < MINFUEL) h += al('warn', T('Combustível a bordo abaixo do mínimo de ', 'Fuel on board below the minimum of ') + fmt(MINFUEL) + '.');
      if (fuel > MAXFUEL) h += al('warn', T('Combustível a bordo acima do teto de ', 'Fuel on board above the ') + fmt(MAXFUEL) + T(' das tabelas.', ' table ceiling.'));
    }
    w.notes.forEach(function (n) { h += al('warn', n); });
    out.innerHTML = h;
  }

  // ----- data/hora -----
  function nowStr() { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()); }
  $('pc2Dt').addEventListener('click', function () { if (!$('pc2Dt').value.trim()) $('pc2Dt').value = nowStr(); updateClear(); });
  $('pc2Now').addEventListener('click', function () { $('pc2Dt').value = nowStr(); updateClear(); });

  ['pc2Oat', 'pc2Alt', 'pc2Pax', 'pc2Ac', 'pc2Wind', 'pc2Bow', 'pc2Crew', 'pc2Pw', 'pc2Fuel', 'pc2Avg'].forEach(function (id) {
    $(id).addEventListener('input', render); $(id).addEventListener('change', render);
  });
  // ao mudar o nº de passageiros, sugere o peso padrão (editável)
  $('pc2Pax').addEventListener('change', function () { var n = parseInt($('pc2Pax').value, 10); $('pc2Pw').value = Math.round(n * PAXW * (unit === 'kg' ? LB_KG : 1)); render(); });
  // ± para OAT e altitude (teclado numérico do iPhone não tem o sinal de menos)
  document.querySelectorAll('#mainPanelHeli [data-pm]').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = $(b.getAttribute('data-pm')), v = el.value.trim();
      el.value = v.charAt(0) === '-' ? v.slice(1) : '-' + v; render(); el.focus();
    });
  });

  // ----- unidade lbs/kg -----
  function setUnit(u) {
    if (u === unit) return; var f = u === 'kg' ? LB_KG : 1 / LB_KG;
    ['pc2Bow', 'pc2Crew', 'pc2Pw', 'pc2Fuel', 'pc2Avg'].forEach(function (id) { var x = num(id); if (!isNaN(x)) $(id).value = Math.round(x * f); });
    unit = u; document.querySelectorAll('#mainPanelHeli .pc2-u').forEach(function (e) { e.setAttribute('data-u', u); });
    $('pc2AcV').textContent = '−' + Math.round(110 * (u === 'kg' ? LB_KG : 1)) + ' ' + u;
    $('pc2WindV').textContent = '+' + Math.round(400 * (u === 'kg' ? LB_KG : 1)) + ' ' + u;
  }
  $('pc2Ukg').addEventListener('change', function () {
    var kg = $('pc2Ukg').checked; setUnit(kg ? 'kg' : 'lbs');
    $('pc2Sl').className = kg ? '' : 'on'; $('pc2Sk').className = kg ? 'on' : ''; render();
  });

  // ----- modo -----
  function setMode(m) {
    mode = m; $('pc2M1').classList.toggle('on', m === 1); $('pc2M2').classList.toggle('on', m === 2);
    $('pc2Box1').style.display = m === 1 ? '' : 'none'; $('pc2Box2').style.display = m === 2 ? '' : 'none'; render();
  }
  $('pc2M1').addEventListener('click', function () { setMode(1); });
  $('pc2M2').addEventListener('click', function () { setMode(2); });

  // Tripulação salva no aparelho (em lbs), mesmo após fechar o app
  try { var cs = localStorage.getItem('aw139_crew_lbs'); if (cs !== null && cs !== '' && !isNaN(parseFloat(cs))) $('pc2Crew').value = cs; } catch (e) {}
  $('pc2Crew').addEventListener('input', function () {
    var x = num('pc2Crew'); if (isNaN(x) || x < 0) return;
    try { localStorage.setItem('aw139_crew_lbs', String(Math.round(x * (unit === 'kg' ? 1 / LB_KG : 1) * 10) / 10)); } catch (e) {}
  });
  // Matrícula salva no aparelho, editável a qualquer momento
  try { var rg = localStorage.getItem('aw139_reg'); if (rg !== null) $('pc2Reg').value = rg; } catch (e) {}
  $('pc2Reg').addEventListener('input', function () { try { localStorage.setItem('aw139_reg', $('pc2Reg').value.toUpperCase()); } catch (e) {} });

  // ----- LIMPAR: volta aos valores iniciais (matrícula e tripulação ficam salvas no aparelho) -----
  function isDefault() {
    return unit === 'lbs' && mode === 1 && !$('pc2Ac').checked && !$('pc2Wind').checked && !$('pc2Dt').value.trim() &&
      Object.keys(DEFAULTS).every(function (id) { return String($(id).value) === DEFAULTS[id]; });
  }
  function updateClear() {
    var d = isDefault(); $('pc2Clear').classList.toggle('state-green', d); $('pc2Clear').classList.toggle('state-red', !d);
  }
  $('pc2Clear').addEventListener('click', function () {
    if ($('pc2Ukg').checked) { $('pc2Ukg').checked = false; setUnit('lbs'); $('pc2Sl').className = 'on'; $('pc2Sk').className = ''; }
    Object.keys(DEFAULTS).forEach(function (id) { $(id).value = DEFAULTS[id]; });
    $('pc2Ac').checked = false; $('pc2Wind').checked = false; $('pc2Dt').value = '';
    closeReport(); setMode(1);
  });

  // ===== Relatório (padrão POWER CHECK) e envio como imagem =====
  var report = null, reportPng = null;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function nf(id) { var x = num(id); return isNaN(x) ? '—' : x.toLocaleString(LOC); }
  function buildReport() {
    if (!$('pc2Dt').value.trim()) $('pc2Dt').value = nowStr();
    var u = unit;
    var items = [
      [T('Cálculo', 'Calculation'), mode === 1 ? T('Máximo de combustível', 'Maximum fuel') : T('Máximo de passageiros', 'Maximum passengers')],
      [T('Unidade', 'Unit'), u],
      ['BOW', nf('pc2Bow') + ' ' + u],
      [T('Tripulação', 'Crew'), nf('pc2Crew') + ' ' + u],
      ['OAT', nf('pc2Oat') + ' °C'],
      [T('Altitude-pressão', 'Pressure altitude'), nf('pc2Alt') + ' ft']
    ];
    if (mode === 1) items.push([T('Passageiros', 'Passengers'), $('pc2Pax').value], [T('Peso dos passageiros', 'Passenger weight'), nf('pc2Pw') + ' ' + u]);
    else items.push([T('Combustível a bordo', 'Fuel on board'), nf('pc2Fuel') + ' ' + u], [T('Peso/pax', 'Weight/pax'), nf('pc2Avg') + ' ' + u]);
    items.push([T('Ar-condicionado', 'Air conditioning'), $('pc2Ac').checked ? T('Ligado', 'On') : T('Desligado', 'Off')],
               [T('Vento de proa ≥ 10 kt', 'Headwind ≥ 10 kt'), $('pc2Wind').checked ? T('Sim', 'Yes') : T('Não', 'No')]);
    var rows = function (list) { return list.map(function (x) {
      if (x.k === 'a') return '<div class="al ' + x.c + '">' + esc(x.t) + '</div>';
      return '<div class="row' + (x.big ? ' big' : '') + '"><span>' + esc(x.l) + '</span><span>' + esc(x.v) + '</span></div>';
    }).join(''); };
    var html =
      '<!DOCTYPE html><html lang="' + T('pt-BR', 'en') + '"><head><meta charset="UTF-8" />' +
      '<style>' +
      '*{box-sizing:border-box;}' +
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:#f4f2ec;color:#0d1b2a;margin:0;padding:24px 18px 40px;}' +
      '.sheet{max-width:640px;margin:0 auto;background:#fff;border:1px solid #d8d3c4;border-radius:10px;overflow:hidden;}' +
      '.header{background:linear-gradient(160deg,#0d1b2a 0%,#14273b 100%);color:#fff;padding:20px 22px;border-bottom:6px solid #d9a441;}' +
      '.header h1{margin:0 0 10px;font-size:19px;font-weight:800;}' +
      '.header .meta{font-size:12.5px;color:#cfd9e2;line-height:1.6;}' +
      '.section{padding:18px 22px;border-bottom:1px solid #eee;}' +
      '.section:last-of-type{border-bottom:none;}' +
      '.section h2{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#3a5875;margin:0 0 10px;}' +
      '.row{display:flex;justify-content:space-between;gap:12px;font-size:13.5px;padding:4px 0;}' +
      '.row span:first-child{color:#5b6b7a;}.row span:last-child{font-weight:600;text-align:right;white-space:nowrap;}' +
      '.row.big{margin:4px 0 8px;padding:10px 12px;border:1px solid #e6dcc0;border-left:5px solid #d4a921;border-radius:4px;background:#fffaf0;}' +
      '.row.big span:first-child{color:#0d1b2a;font-weight:600;}.row.big span:last-child{color:#8a5a12;font-size:16px;font-weight:800;}' +
      '.al{margin-top:8px;padding:9px 11px;border-radius:4px;font-size:12.5px;line-height:1.45;}' +
      '.al.bad{background:#fbeae7;color:#a8382c;border:1px solid #e6bcb8;}.al.warn{background:#fbeedd;color:#7a5416;border:1px solid #e6cd9e;}.al.ok{background:#e7f2ec;color:#2f6b4f;border:1px solid #b9dcc6;}' +
      '.disclaimer{padding:14px 22px 20px;font-size:11px;color:#9aa4ac;line-height:1.5;}' +
      '</style></head><body><div class="sheet">' +
      '<div class="header"><h1>' + T('AW139 – Relatório Offshore PC2', 'AW139 – Offshore PC2 Report') + '</h1>' +
      '<div class="meta">' + T('Matrícula', 'Registration') + ': ' + esc($('pc2Reg').value.trim().toUpperCase() || '—') + '<br />' +
      T('Data/Hora', 'Date/Time') + ': ' + esc($('pc2Dt').value.trim()) + '</div></div>' +
      '<div class="section"><h2>' + T('Dados informados', 'Entered data') + '</h2>' + rows(items.map(function (p) { return { k: 'r', l: p[0], v: p[1] }; })) + '</div>' +
      '<div class="section"><h2>' + (lastOk ? T('Resultados', 'Results') : T('Dados inconsistentes', 'Inconsistent data')) + '</h2>' + rows(cur) + '</div>' +
      '<div class="disclaimer">' + T('Helideck elevado / helipad offshore em solo com exposição · Tabelas de 21-Oct-23 · EAPS OFF. Ferramenta de apoio — sempre confira com o manual oficial.', 'Elevated helideck / offshore surface-level helipad with exposure · Tables of 21-Oct-23 · EAPS OFF. Support tool — always check against the official manual.') + '</div>' +
      '</div></body></html>';
    report = html; reportPng = null;
    var frame = $('pc2Frame');
    frame.onload = function () { buildPng(frame, html); };
    frame.srcdoc = html;
    $('pc2RepBox').style.display = ''; $('pc2Note').textContent = '';
    updateClear();
  }
  function setBusy(b) {
    $('pc2Wa').disabled = b;
    $('pc2Note').textContent = b ? T('Preparando a imagem do relatório…', 'Preparing the report image…') : '';
  }
  function fileName() {
    var reg = ($('pc2Reg').value || 'AW139').replace(/[^A-Za-z0-9-]/g, '').toUpperCase() || 'AW139';
    var dt = ($('pc2Dt').value || '').replace(/[^0-9]/g, '');
    return 'OffshorePC2_' + reg + (dt ? '_' + dt : '') + '.png';
  }
  function buildPng(frame, html) {
    if (!window.html2canvas && window.AW_H2C_SRC) (0, eval)(window.AW_H2C_SRC);
    var doc = frame.contentDocument;
    if (!window.html2canvas || !doc || !doc.body) return;
    setBusy(true);
    var w = doc.documentElement.clientWidth, h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
    window.html2canvas(doc.body, { scale: Math.max(2, window.devicePixelRatio || 1), backgroundColor: '#f4f2ec', logging: false,
      width: w, height: h, windowWidth: w, windowHeight: h, scrollX: 0, scrollY: 0, x: 0, y: 0 })
      .then(function (canvas) {
        canvas.toBlob(function (blob) {
          if (report !== html) return;
          reportPng = blob ? new File([blob], fileName(), { type: 'image/png' }) : null;
          setBusy(false);
        }, 'image/png');
      }).catch(function () {
        if (report !== html) return;
        setBusy(false); $('pc2Note').textContent = T('Não foi possível gerar a imagem do relatório.', 'Unable to generate the report image.');
      });
  }
  function closeReport() {
    report = null; reportPng = null; $('pc2RepBox').style.display = 'none'; $('pc2Frame').srcdoc = ''; setBusy(false);
  }
  function send() {
    if (!reportPng) { $('pc2Note').textContent = T('Preparando a imagem do relatório… toque novamente em instantes.', 'Preparing the report image… tap again in a moment.'); return; }
    var file = reportPng;
    if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: T('AW139 – Relatório Offshore PC2', 'AW139 – Offshore PC2 Report') }).catch(function () {});
      return;
    }
    var url = URL.createObjectURL(file), a = document.createElement('a');
    a.href = url; a.download = file.name; a.style.display = 'none'; $('pc2Note').appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
    $('pc2Note').textContent = T('Imagem do relatório salva (', 'Report image saved (') + file.name + T('). Anexe-a na conversa do WhatsApp.', '). Attach it to the WhatsApp chat.');
  }
  $('pc2Gen').addEventListener('click', buildReport);
  $('pc2RepClose').addEventListener('click', closeReport);
  $('pc2Wa').addEventListener('click', send);

  render();
})();
