
(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  var K = 2.20462262;
  var L = en ? {
    in: 'Input data', clear: 'Clear', w: 'Weight (lb)', oat: 'Temp. (°C)',
    out: 'Hover ceiling (ft Hp)', cond: 'Condition', val: 'Ceiling (ft)',
    ige: 'IGE hover ceiling', oge: 'OGE hover ceiling',
    top: 'TOP AEO', mcp: 'MCP AEO', oei25: '2.5 min OEI', oeimcp: 'MCP OEI',
    fill: 'Fill in weight and temperature.',
    heavy: 'Weight above 7000 kg (15432 lb): outside the tables.',
    light: 'Weight below 5000 kg (11023 lb): values of the 5000 kg table are used.',
    na: '— : outside the envelope of the tables (no hover capability or not published for this weight/temperature).',
    ge: '> : at least this value (the table gives a limit, e.g. >18000).',
    method: 'The temperature entered is the real outside air temperature (OAT). The ceiling is the pressure altitude where it is found consistently with ISA at that altitude (ISA deviation). Linear interpolation by weight between the QRH tables (5000, 5500, 6000, 6400, 6800, 7000 kg). Source: QRH Lims-Norm-Perf pages 87, 88, 91 and 93.'
  } : {
    in: 'Dados de entrada', clear: 'Limpar', w: 'Peso (kg)', oat: 'Temp. (°C)',
    out: 'Teto de pairada (ft Hp)', cond: 'Condição', val: 'Teto (ft)',
    ige: 'Teto de pairada IGE', oge: 'Teto de pairada OGE',
    top: 'TOP AEO', mcp: 'MCP AEO', oei25: '2,5 min OEI', oeimcp: 'MCP OEI',
    fill: 'Preencha peso e temperatura.',
    heavy: 'Peso acima de 7000 kg: fora das tabelas.',
    light: 'Peso abaixo de 5000 kg: usados os valores da tabela de 5000 kg.',
    na: '— : fora do envelope das tabelas (sem capacidade de pairada ou não publicado para este peso/temperatura).',
    ge: '> : no mínimo este valor (a tabela informa um limite, ex.: >18000).',
    method: 'A temperatura digitada é a temperatura externa real (OAT). O teto é a altitude-pressão em que ela é encontrada de forma consistente com a ISA nessa altitude (desvio ISA). Interpolação linear por peso entre as tabelas do QRH (5000, 5500, 6000, 6400, 6800, 7000 kg). Fonte: QRH Lims-Norm-Perf páginas 87, 88, 91 e 93.'
  };
  var N = null;
  // colunas: [c0, -20, ISA, ISA+15, ISA+25, ISA+35]; 18000 = ">18000"
  var A = 18000;
  var W5 = { c0: -40, cap: A, d: {
    ige_top: [A,A,A,A,A,14200], ige_mcp: [A,A,A,A,15200,14200], ige_oei25: [13300,11500,10000,8000,6500,4700], ige_oeimcp: [12000,11000,7700,5000,1450,N],
    oge_top: [A,A,A,16300,14800,12800], oge_mcp: [A,17700,17000,14500,12300,7500], oge_oei25: [9800,7700,5250,3000,1350,N], oge_oeimcp: [4000,2000,N,N,N,N] } };
  var W55 = { c0: -40, cap: A, d: {
    ige_top: [A,A,A,16300,15200,14000], ige_mcp: [A,A,A,16000,14000,10500], ige_oei25: [11000,9000,7000,5000,3000,1000], ige_oeimcp: [9000,8000,4400,1000,N,N],
    oge_top: [A,16000,16000,13500,11800,9500], oge_mcp: [17000,15000,14000,11500,8500,1000], oge_oei25: [5000,2500,N,N,N,N], oge_oeimcp: [N,N,N,N,N,N] } };
  var W60 = { c0: -40, cap: A, d: {
    ige_top: [A,17500,17000,15000,13500,11000], ige_mcp: [A,16400,16000,13000,11000,6000], ige_oei25: [9000,7000,4200,2000,100,N], ige_oeimcp: [N,N,N,N,N,N],
    oge_top: [16000,14000,13000,10800,9000,6000], oge_mcp: [12000,10000,8000,6000,4500,N], oge_oei25: [N,N,N,N,N,N], oge_oeimcp: [N,N,N,N,N,N] } };
  var W64 = { c0: -40, cap: A, d: {
    ige_top: [17800,15700,15300,13000,11500,9000], ige_mcp: [16900,14800,14000,11300,8300,1000], ige_oei25: [4000,1500,N,N,N,N], ige_oeimcp: [N,N,N,N,N,N],
    oge_top: [12000,10000,8000,6100,5100,3000], oge_mcp: [6000,3700,100,N,N,N], oge_oei25: [N,N,N,N,N,N], oge_oeimcp: [N,N,N,N,N,N] } };
  var NN = [N,N,N,N,N,N];
  var W68 = { c0: -30, cap: 8000, d: {
    ige_top: [8000,8000,8000,N,N,N], ige_mcp: [8000,8000,8000,N,N,N], ige_oei25: NN, ige_oeimcp: NN,
    oge_top: [5600,4500,1500,N,N,N], oge_mcp: NN, oge_oei25: NN, oge_oeimcp: NN } };
  var W70 = { c0: -30, cap: 6000, d: {
    ige_top: [6000,6000,6000,N,N,N], ige_mcp: [6000,6000,6000,N,N,N], ige_oei25: NN, ige_oeimcp: NN,
    oge_top: NN, oge_mcp: NN, oge_oei25: NN, oge_oeimcp: NN } };
  var TB = [[5000, W5], [5500, W55], [6000, W60], [6400, W64], [6800, W68], [7000, W70]];

  function isa(h){ return 15 - 1.98 * h / 1000; }
  // valor da linha na temperatura T, com ISA calculada na altitude H
  function rowAt(c0, h, row, T){
    var I = isa(h), ax = [c0, -20, I, I + 15, I + 25, I + 35], X = [], Y = [];
    for (var i = 0; i < 6; i++){
      if (i === 1 && -20 >= I) continue;
      X.push(ax[i]); Y.push(row[i]);
    }
    if (T <= X[0]) return Y[0];
    for (var j = 0; j < X.length - 1; j++){
      if (T <= X[j + 1]){
        var a = Y[j], b = Y[j + 1];
        if (a === N || b === N) return N;
        return a + (b - a) * (T - X[j]) / (X[j + 1] - X[j]);
      }
    }
    return N;
  }
  // maior altitude H com g(H) >= H (teto consistente com a ISA em H)
  function tableCeil(tb, kind, oat){
    var row = tb.d[kind];
    function g(H){ var v = rowAt(tb.c0, H, row, oat); return v === N ? -Infinity : v; }
    var lo = -2000, hi = 20000;
    if (g(lo) < lo) return { v: N, cap: false };
    for (var i = 0; i < 40; i++){
      var m = (lo + hi) / 2;
      if (g(m) >= m) lo = m; else hi = m;
    }
    var capped = lo >= tb.cap - 0.5;
    return { v: capped ? tb.cap : lo, cap: capped };
  }
  function ceil(kind, W, oat){
    if (W <= TB[0][0]) { var r0 = tableCeil(TB[0][1], kind, oat); return r0; }
    var i = 0;
    while (i < TB.length - 2 && W > TB[i + 1][0]) i++;
    var wl = TB[i][0], wh = TB[i + 1][0];
    var t = (W - wl) / (wh - wl);
    var a = tableCeil(TB[i][1], kind, oat), b = tableCeil(TB[i + 1][1], kind, oat);
    if (t <= 0) return a;
    if (t >= 1) return b;
    if (a.v === N || b.v === N) return { v: N, cap: false };
    if (a.cap || b.cap) return { v: b.v, cap: true };   // limite inferior: valor da tabela mais pesada
    return { v: a.v + (b.v - a.v) * t, cap: false };
  }
  window.__hcCalc = ceil;

  var rows = [['ige_top','top'],['ige_mcp','mcp'],['ige_oei25','oei25'],['ige_oeimcp','oeimcp'],['oge_top','top'],['oge_mcp','mcp'],['oge_oei25','oei25'],['oge_oeimcp','oeimcp']];
  var root = document.getElementById('hcRoot');
  var tbody = '<tr class="hc-sec"><td colspan="2">' + L.ige + '</td></tr>';
  rows.forEach(function(r, i){
    if (i === 4) tbody += '<tr class="hc-sec"><td colspan="2">' + L.oge + '</td></tr>';
    tbody += '<tr class="' + (r[1] === 'top' || r[1] === 'mcp' ? 'hc-aeo' : 'hc-oei') + '"><td class="hc-n">' + L[r[1]] + '</td><td class="hc-v" id="hc_' + r[0] + '">—</td></tr>';
  });
  root.innerHTML =
    '<div class="hc-head"><div class="hc-label">' + L.in + '</div><button type="button" class="hc-clear" id="hcClear">' + L.clear + '</button></div>' +
    '<div class="hc-panel"><div class="hc-fields">' +
      '<div class="hc-field"><label for="hcW">' + L.w + '</label><div class="hc-inwrap"><input type="text" inputmode="numeric" id="hcW" autocomplete="off"></div></div>' +
      '<div class="hc-field"><label for="hcOat">' + L.oat + '</label><div class="hc-inwrap"><button type="button" class="hc-pm" data-t="hcOat" aria-label="Alternar sinal">±</button><input type="text" inputmode="decimal" id="hcOat" autocomplete="off"></div></div>' +
    '</div></div>' +
    '<div class="hc-label" style="margin:0 4px 6px;">' + L.out + '</div>' +
    '<div class="hc-panel"><table class="hc-table"><thead><tr><th>' + L.cond + '</th><th>' + L.val + '</th></tr></thead><tbody>' + tbody + '</tbody></table></div>' +
    '<div class="hc-msg" id="hcMsg"></div>' +
    '<div class="hc-note">' + L.method + '</div>';

  var elW = document.getElementById('hcW'), elOat = document.getElementById('hcOat'), elMsg = document.getElementById('hcMsg');
  function num(el){ var v = parseFloat(String(el.value).replace(',', '.')); return isNaN(v) ? null : v; }
  function clr(){ rows.forEach(function(r){ document.getElementById('hc_' + r[0]).textContent = '—'; }); }
  function update(){
    var w = num(elW), oat = num(elOat);
    elMsg.className = 'hc-msg'; elMsg.textContent = '';
    if (w === null || oat === null){ clr(); elMsg.textContent = L.fill; return; }
    var wKg = en ? w / K : w;
    if (wKg > 7000.5){ clr(); elMsg.className = 'hc-msg hc-err'; elMsg.textContent = L.heavy; return; }
    var anyNull = false, anyCap = false;
    rows.forEach(function(r){
      var c = ceil(r[0], wKg, oat), el = document.getElementById('hc_' + r[0]);
      if (c.v === null){ el.textContent = '—'; anyNull = true; }
      else {
        var v = Math.round(c.v / 100) * 100;
        el.textContent = (c.cap ? '>' : '') + v;
        if (c.cap) anyCap = true;
      }
    });
    var msgs = [];
    if (wKg < 5000) msgs.push(L.light);
    if (anyCap) msgs.push(L.ge);
    if (anyNull) msgs.push(L.na);
    elMsg.textContent = msgs.join(' ');
  }
  [elW, elOat].forEach(function(el){ el.addEventListener('input', update); });
  document.querySelectorAll('.hc-pm').forEach(function(b){
    b.addEventListener('click', function(){
      var el = document.getElementById(b.getAttribute('data-t'));
      var v = el.value.trim();
      el.value = (v.charAt(0) === '-') ? v.slice(1) : '-' + v;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.focus();
    });
  });
  document.getElementById('hcClear').addEventListener('click', function(){ elW.value = ''; elOat.value = ''; update(); });
  update();
  var clrBtn = document.getElementById('hcClear'), clrIns = [elW,elOat];
  function syncClr(){ var any = clrIns.some(function(el){ return el.value.trim() !== ''; }); clrBtn.classList.toggle('hc-clean', !any); }
  clrIns.forEach(function(el){ el.addEventListener('input', syncClr); });
  clrBtn.addEventListener('click', syncClr);
  syncClr();
})();
