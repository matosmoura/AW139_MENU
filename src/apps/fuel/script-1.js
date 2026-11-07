
(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  var K = 2.20462262;
  var L = en ? {
    in: 'Input data', clear: 'Clear', w: 'Weight (lb)', alt: 'Altitude (ft)', oat: 'Temp. (°C)', spd: 'Speed (KIAS)',
    out: 'Fuel consumption', cond: 'Condition', val: 'Total',
    fc: 'Fuel flow', 
    fill: 'Fill in weight, altitude, temperature and speed.',
    heavy: 'Weight above 6800 kg (14991 lb): no fuel consumption table available.',
    light: 'Weight below 14110 lb: values of the 14110 lb table are used.',
    low: 'Altitude below 2000 ft: values at 2000 ft are used.',
    spdr: 'Speed outside 90–150 KIAS: not covered by the tables.',
    na: '— : outside the envelope of the tables (altitude, temperature, speed or weight).',
    isa: 'Corrected temp.: ', dev: 'deviation: ',
    method: 'Linear interpolation between the 6400 and 6800 kg tables (weights in lb), by altitude, speed and temperature (columns with ISA = 15 °C, ISA+15 = 30 °C, ISA+25 = 40 °C, ISA+35 = 50 °C; the temperature entered is corrected for altitude, −1.98 °C per 1000 ft, before being placed on the columns). Source: QRH Lims-Norm-Perf pages 90 and 92.'
  } : {
    in: 'Dados de entrada', clear: 'Limpar', w: 'Peso (kg)', alt: 'Altitude (ft)', oat: 'Temp. (°C)', spd: 'Velocidade (KIAS)',
    out: 'Consumo de combustível', cond: 'Condição', val: 'Total',
    fc: 'Consumo',
    fill: 'Preencha peso, altitude, temperatura e velocidade.',
    heavy: 'Peso acima de 6800 kg: não há tabela de consumo.',
    light: 'Peso abaixo de 6400 kg: usados os valores da tabela de 6400 kg.',
    low: 'Altitude abaixo de 2000 ft: usados os valores de 2000 ft.',
    spdr: 'Velocidade fora de 90–150 KIAS: não coberta pelas tabelas.',
    na: '— : fora do envelope das tabelas (altitude, temperatura, velocidade ou peso).',
    isa: 'Temp. corrigida: ', dev: 'desvio: ',
    method: 'Interpolação linear entre as tabelas de 6400 e 6800 kg, por altitude, velocidade e temperatura (colunas com ISA = 15 °C, ISA+15 = 30 °C, ISA+25 = 40 °C, ISA+35 = 50 °C; a temperatura digitada é corrigida pela altitude, −1,98 °C por 1000 ft, antes de ser posicionada nas colunas). Fonte: QRH Lims-Norm-Perf páginas 90 e 92.'
  };
  var N = null;
  // colunas: [c0, c1, ISA, ISA+15, ISA+25, ISA+35]; linhas por velocidade 90/120/150
  var SP = [90, 120, 150];
  var T6400 = { c0: -40, c1: -20, alts: [2000, 4000, 8000, 12000], d: [
    [[320,327,336,339,342,345],[348,355,368,377,383,390],[413,427,457,474,485,N]],
    [[310,315,322,326,331,336],[338,344,361,371,379,388],[408,424,458,477,N,N]],
    [[289,293,303,311,318,324],[321,335,352,367,383,401],[417,446,480,N,N,N]],
    [[274,286,294,306,317,337],[323,351,374,407,N,N],[468,N,N,N,N,N]] ] };
  var T6800 = { c0: -20, c1: 0, alts: [2000, 4000, 8000], d: [
    [[336,336,340,348,353,358],[360,366,373,386,395,400],[428,456,467,480,492,N]],
    [[320,330,333,338,344,349],[350,362,368,380,392,402],[436,462,472,490,N,N]],
    [[303,315,315,N,N,N],[346,370,370,N,N,N],[468,480,480,N,N,N]] ] };

  function isa(h){ return 15; }   // colunas ISA do consumo: ISA = 15 °C (ISA+15 = 30 °C, ISA+25 = 40 °C, ISA+35 = 50 °C)
  function rowAt(tb, h, row, T){
    var I = isa(h);
    var ax = [tb.c0, tb.c1, I, I + 15, I + 25, I + 35], X = [], Y = [];
    for (var i = 0; i < 6; i++){
      if (i === 1 && tb.c1 >= I) continue;      // coluna 0 °C coincide com ISA em altitude alta
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
  function lin(a, b, t){
    if (t <= 0) return a;
    if (t >= 1) return b;
    if (a === N || b === N) return N;
    return a + (b - a) * t;
  }
  function tableAt(tb, alt, spd, oat){
    var D = oat - isa(alt), alts = tb.alts;
    var a = Math.max(alt, alts[0]);
    if (a > alts[alts.length - 1]) return N;
    var si = spd <= 120 ? 0 : 1;
    var ts = (spd - SP[si]) / (SP[si + 1] - SP[si]);
    var ai = 0;
    while (ai < alts.length - 2 && a > alts[ai + 1]) ai++;
    var ta = (a - alts[ai]) / (alts[ai + 1] - alts[ai]);
    function v(ia, is){ return rowAt(tb, alts[ia], tb.d[ia][is], isa(alts[ia]) + D); }
    function atAlt(ia){ return lin(v(ia, si), v(ia, si + 1), ts); }
    return lin(atAlt(ai), atAlt(ai + 1), ta);
  }
  // temperatura corrigida pela altitude (gradiente 1,98 °C/1000 ft) para as colunas com ISA = 15 °C
  function corr(oat, alt){ return oat - 1.98 * alt / 1000; }
  function fuel(W, alt, spd, oat){
    oat = corr(oat, alt);
    if (W <= 6400) return tableAt(T6400, alt, spd, oat);
    return lin(tableAt(T6400, alt, spd, oat), tableAt(T6800, alt, spd, oat), (W - 6400) / 400);
  }
  window.__fuelCalc = fuel;

  var root = document.getElementById('fuelRoot');
  root.innerHTML =
    '<div class="fuel-head"><div class="fuel-label">' + L.in + '</div><button type="button" class="fuel-clear" id="fuelClear">' + L.clear + '</button></div>' +
    '<div class="fuel-panel"><div class="fuel-fields">' +
      '<div class="fuel-field"><label for="fuelW">' + L.w + '</label><div class="fuel-inwrap"><input type="text" inputmode="numeric" id="fuelW" autocomplete="off"></div></div>' +
      '<div class="fuel-field"><label for="fuelSpd">' + L.spd + '</label><div class="fuel-inwrap"><input type="text" inputmode="numeric" id="fuelSpd" autocomplete="off"></div></div>' +
      '<div class="fuel-field"><label for="fuelAlt">' + L.alt + '</label><div class="fuel-inwrap"><button type="button" class="fuel-pm" data-t="fuelAlt" aria-label="Alternar sinal">±</button><input type="text" inputmode="numeric" id="fuelAlt" autocomplete="off"></div></div>' +
      '<div class="fuel-field"><label for="fuelOat">' + L.oat + '</label><div class="fuel-inwrap"><button type="button" class="fuel-pm" data-t="fuelOat" aria-label="Alternar sinal">±</button><input type="text" inputmode="decimal" id="fuelOat" autocomplete="off"></div></div>' +
    '</div><div class="fuel-isa" id="fuelIsa"></div></div>' +
    '<div class="fuel-label" style="margin:0 4px 6px;">' + L.out + '</div>' +
    '<div class="fuel-panel"><table class="fuel-table"><thead><tr><th>kg/h</th><th>lb/h</th></tr></thead><tbody>' +
      '<tr><td class="fuel-v" id="fuelKg">—</td><td class="fuel-v" id="fuelLb">—</td></tr>' +
    '</tbody></table></div>' +
    '<div class="fuel-msg" id="fuelMsg"></div>' +
    '<div class="fuel-note">' + L.method + '</div>';

  var elW = document.getElementById('fuelW'), elAlt = document.getElementById('fuelAlt'), elOat = document.getElementById('fuelOat'), elSpd = document.getElementById('fuelSpd');
  var elMsg = document.getElementById('fuelMsg'), elKg = document.getElementById('fuelKg'), elLb = document.getElementById('fuelLb'), elIsa = document.getElementById('fuelIsa');
  function num(el){ var v = parseFloat(String(el.value).replace(',', '.')); return isNaN(v) ? null : v; }
  function fnum(v){ return (Math.round(v * 10) / 10).toFixed(1).replace('.', en ? '.' : ','); }
  function clr(){ elKg.textContent = '—'; elLb.textContent = '—'; }
  function update(){
    var w = num(elW), alt = num(elAlt), oat = num(elOat), spd = num(elSpd);
    if (alt === null || oat === null) elIsa.textContent = '';
    else {
      var tc = corr(oat, alt), d = tc - 15;
      elIsa.textContent = L.isa + fnum(tc) + ' °C · ' + L.dev + (d >= 0 ? 'ISA+' : 'ISA−') + fnum(Math.abs(d));
    }
    elMsg.className = 'fuel-msg'; elMsg.textContent = '';
    if (w === null || alt === null || oat === null || spd === null){ clr(); elMsg.textContent = L.fill; return; }
    var wKg = en ? w / K : w;
    if (wKg > 6800.5){ clr(); elMsg.className = 'fuel-msg fuel-err'; elMsg.textContent = L.heavy; return; }
    if (spd < 90 || spd > 150){ clr(); elMsg.className = 'fuel-msg fuel-err'; elMsg.textContent = L.spdr; return; }
    var v = fuel(wKg, alt, spd, oat), msgs = [];
    if (v === null){ clr(); msgs.push(L.na); }
    else { elKg.textContent = String(Math.round(v)); elLb.textContent = String(Math.round(v * K)); }
    if (wKg < 6400) msgs.push(L.light);
    if (alt < 2000) msgs.push(L.low);
    elMsg.textContent = msgs.join(' ');
  }
  [elW, elAlt, elOat, elSpd].forEach(function(el){ el.addEventListener('input', update); });
  document.querySelectorAll('.fuel-pm').forEach(function(b){
    b.addEventListener('click', function(){
      var el = document.getElementById(b.getAttribute('data-t'));
      var v = el.value.trim();
      el.value = (v.charAt(0) === '-') ? v.slice(1) : '-' + v;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.focus();
    });
  });
  document.getElementById('fuelClear').addEventListener('click', function(){
    elW.value = ''; elAlt.value = ''; elOat.value = ''; elSpd.value = '';
    update();
  });
  update();
  var clrBtn = document.getElementById('fuelClear'), clrIns = [elW,elAlt,elOat,elSpd];
  function syncClr(){ var any = clrIns.some(function(el){ return el.value.trim() !== ''; }); clrBtn.classList.toggle('fuel-clean', !any); }
  clrIns.forEach(function(el){ el.addEventListener('input', syncClr); });
  clrBtn.addEventListener('click', syncClr);
  syncClr();
})();
