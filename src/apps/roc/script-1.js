
(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  var K = 2.20462262;
  var L = en ? {
    in: 'Input data', clear: 'Clear', w: 'Weight (lb)', alt: 'Altitude (ft)', oat: 'Temp. (°C)',
    out: 'Rate of climb (ft/min)', cond: 'Condition', roc: 'ROC (ft/min)',
    aeo: 'All engines operating (AEO)', oei: 'One engine inoperative (OEI)',
    top: 'ROC @ TOP', mcp: 'ROC @ MCP', oei25: 'ROC @ 2.5 min OEI', oeimcp: 'ROC @ MCP OEI',
    fill: 'Fill in weight, altitude and temperature.',
    heavy: 'Weight above the maximum of the tables (15432 lb).',
    light: 'Weight below 14110 lb: values of the 14110 lb table are used.',
    low: 'Altitude below 2000 ft: values at 2000 ft are used.',
    na: '— : outside the envelope of the tables (altitude, temperature or weight).',
    isa: 'ISA at this altitude: ', dev: 'deviation: ',
    method: 'Linear interpolation between the 6400, 6800 and 7000 kg tables (weights in lb), by altitude and temperature (ISA deviation).'
  } : {
    in: 'Dados de entrada', clear: 'Limpar', w: 'Peso (kg)', alt: 'Altitude (ft)', oat: 'Temp. (°C)',
    out: 'Razão de subida (ft/min)', cond: 'Condição', roc: 'ROC (ft/min)',
    aeo: 'Todos os motores operando (AEO)', oei: 'Um motor inoperante (OEI)',
    top: 'ROC @ TOP', mcp: 'ROC @ MCP', oei25: 'ROC @ 2,5 min OEI', oeimcp: 'ROC @ MCP OEI',
    fill: 'Preencha peso, altitude e temperatura.',
    heavy: 'Peso acima do máximo das tabelas (7000 kg).',
    light: 'Peso abaixo de 6400 kg: usados os valores da tabela de 6400 kg.',
    low: 'Altitude abaixo de 2000 ft: usados os valores de 2000 ft.',
    na: '— : fora do envelope das tabelas (altitude, temperatura ou peso).',
    isa: 'ISA nesta altitude: ', dev: 'desvio: ',
    method: 'Interpolação linear entre as tabelas de 6400, 6800 e 7000 kg, por altitude e temperatura (desvio ISA).'
  };
  var N = null;   // célula sem dado (—)
  var T6400 = { c0: -40, alts: [2000, 5000, 10000, 15000],
    top:   [[2100,2100,2100,2100,2100,2100],[2100,2100,2100,2100,2100,2000],[2100,2100,2000,2000,1700,1400],[2000,1600,1500,1100,800,400]],
    mcp:   [[1800,1800,1800,1800,1800,1200],[1800,1800,1800,1800,1700,1100],[1800,1700,1700,1600,1200,800],[1600,1400,1300,800,400,N]],
    oei25: [[1100,1100,1100,1000,900,700],[1100,1100,1000,800,600,400],[900,700,500,300,100,N],[200,N,N,N,N,N]],
    oeimcp:[[700,700,700,600,400,100],[700,700,700,400,200,N],[700,500,300,N,N,N],[N,N,N,N,N,N]] };
  var T6800 = { c0: -30, alts: [2000, 5000, 8000],
    top:   [[1920,1920,1920,1920,1920,1850],[1920,1920,1900,1880,1860,1650],[1920,1900,1850,N,N,N]],
    mcp:   [[1600,1600,1600,1600,1500,1060],[1600,1600,1780,1560,1460,950],[1600,1600,1520,N,N,N]],
    oei25: [[950,950,950,900,700,520],[950,950,800,620,450,300],[860,740,500,N,N,N]],
    oeimcp:[[620,620,600,520,300,10],[620,620,550,310,110,-120],[600,530,300,N,N,N]] };
  var T7000 = { c0: -30, alts: [2000, 6000],
    top:   [[1840,1840,1840,1840,1800,1740],[1840,1840,1760,1740,1720,1440]],
    mcp:   [[1520,1520,1510,1500,1400,960],[1510,1510,1470,1440,1240,780]],
    oei25: [[870,870,870,770,610,440],[870,870,620,420,270,120]],
    oeimcp:[[550,550,550,440,220,N],[550,550,400,150,N,N]] };

  function isa(h){ return 15 - 1.98 * h / 1000; }
  // interpola uma linha (6 colunas: c0, -20, ISA, ISA+15, ISA+25, ISA+35) na temperatura T
  function rowAt(c0, h, row, T){
    var ax = [c0, -20, isa(h), isa(h) + 15, isa(h) + 25, isa(h) + 35];
    if (T <= ax[0]) return row[0];
    for (var i = 0; i < 5; i++){
      if (T <= ax[i + 1]){
        var a = row[i], b = row[i + 1];
        if (a === N || b === N) return N;
        return a + (b - a) * (T - ax[i]) / (ax[i + 1] - ax[i]);
      }
    }
    return N;
  }
  // valor numa tabela (peso fixo) para altitude e OAT; mantém o desvio ISA em cada linha
  function tableAt(tb, kind, alt, oat){
    var D = oat - isa(alt), alts = tb.alts;
    var a = Math.max(alt, alts[0]);
    if (a > alts[alts.length - 1]) return N;
    var i = 0;
    while (i < alts.length - 2 && a > alts[i + 1]) i++;
    function val(idx){ return rowAt(tb.c0, alts[idx], tb[kind][idx], isa(alts[idx]) + D); }
    var t = (a - alts[i]) / (alts[i + 1] - alts[i]);
    if (t <= 0) return val(i);
    if (t >= 1) return val(i + 1);
    var v1 = val(i), v2 = val(i + 1);
    if (v1 === N || v2 === N) return N;
    return v1 + (v2 - v1) * t;
  }
  function between(vA, vB, t){
    if (t <= 0) return vA;
    if (t >= 1) return vB;
    if (vA === N || vB === N) return N;
    return vA + (vB - vA) * t;
  }
  function roc(kind, W, alt, oat){
    if (W <= 6400) return tableAt(T6400, kind, alt, oat);
    if (W <= 6800) return between(tableAt(T6400, kind, alt, oat), tableAt(T6800, kind, alt, oat), (W - 6400) / 400);
    return between(tableAt(T6800, kind, alt, oat), tableAt(T7000, kind, alt, oat), (W - 6800) / 200);
  }
  window.__rocCalc = roc;   // (uso interno / teste)

  var root = document.getElementById('rocRoot');
  root.innerHTML =
    '<div class="roc-head"><div class="roc-label">' + L.in + '</div><button type="button" class="roc-clear" id="rocClear">' + L.clear + '</button></div>' +
    '<div class="roc-panel"><div class="roc-fields">' +
      '<div class="roc-field"><label for="rocW">' + L.w + '</label><div class="roc-inwrap"><input type="text" inputmode="numeric" id="rocW" autocomplete="off"></div></div>' +
      '<div class="roc-field"><label for="rocAlt">' + L.alt + '</label><div class="roc-inwrap"><button type="button" class="roc-pm" data-t="rocAlt" aria-label="Alternar sinal">±</button><input type="text" inputmode="numeric" id="rocAlt" autocomplete="off"></div></div>' +
      '<div class="roc-field"><label for="rocOat">' + L.oat + '</label><div class="roc-inwrap"><button type="button" class="roc-pm" data-t="rocOat" aria-label="Alternar sinal">±</button><input type="text" inputmode="decimal" id="rocOat" autocomplete="off"></div></div>' +
    '</div><div class="roc-isa" id="rocIsa"></div></div>' +
    '<div class="roc-label" style="margin:0 4px 6px;">' + L.out + '</div>' +
    '<div class="roc-panel"><table class="roc-table"><thead><tr><th>' + L.cond + '</th><th>' + L.roc + '</th></tr></thead><tbody>' +
      '<tr class="roc-sec"><td colspan="2">' + L.aeo + '</td></tr>' +
      '<tr class="roc-aeo"><td class="roc-n">' + L.top + '</td><td class="roc-v" id="rocTop">—</td></tr>' +
      '<tr class="roc-aeo"><td class="roc-n">' + L.mcp + '</td><td class="roc-v" id="rocMcp">—</td></tr>' +
      '<tr class="roc-sec"><td colspan="2">' + L.oei + '</td></tr>' +
      '<tr class="roc-oei"><td class="roc-n">' + L.oei25 + '</td><td class="roc-v" id="rocOei25">—</td></tr>' +
      '<tr class="roc-oei"><td class="roc-n">' + L.oeimcp + '</td><td class="roc-v" id="rocOeiMcp">—</td></tr>' +
    '</tbody></table></div>' +
    '<div class="roc-msg" id="rocMsg"></div>' +
    '<div class="roc-note">' + L.method + '</div>';

  var elW = document.getElementById('rocW'), elAlt = document.getElementById('rocAlt'), elOat = document.getElementById('rocOat');
  var cells = { top: 'rocTop', mcp: 'rocMcp', oei25: 'rocOei25', oeimcp: 'rocOeiMcp' };
  var elMsg = document.getElementById('rocMsg');

  function num(el){
    var v = parseFloat(String(el.value).replace(',', '.'));
    return isNaN(v) ? null : v;
  }
  function fmt(v){
    if (v === null) return '—';
    var r = Math.round(v / 10) * 10;
    return String(r);
  }
  function limpaResultados(){ Object.keys(cells).forEach(function(k){ document.getElementById(cells[k]).textContent = '—'; }); }

  var elIsa = document.getElementById('rocIsa');
  function fnum(v){ return (Math.round(v * 10) / 10).toFixed(1).replace('.', en ? '.' : ','); }
  function update(){
    var w = num(elW), alt = num(elAlt), oat = num(elOat);
    // temperatura ISA da altitude informada (e o desvio da temperatura digitada)
    if (alt === null) elIsa.textContent = '';
    else {
      var t = L.isa + fnum(isa(alt)) + ' °C';
      if (oat !== null) { var d = oat - isa(alt); t += ' · ' + L.dev + (d >= 0 ? 'ISA+' : 'ISA−') + fnum(Math.abs(d)); }
      elIsa.textContent = t;
    }
    elMsg.className = 'roc-msg'; elMsg.textContent = '';
    if (w === null || alt === null || oat === null){
      limpaResultados();
      elMsg.textContent = L.fill;
      return;
    }
    var wKg = en ? w / K : w;
    if (wKg > 7000.5){
      limpaResultados();
      elMsg.className = 'roc-msg roc-err'; elMsg.textContent = L.heavy;
      return;
    }
    var msgs = [], anyNull = false;
    Object.keys(cells).forEach(function(k){
      var v = roc(k, wKg, alt, oat);
      if (v === null) anyNull = true;
      document.getElementById(cells[k]).textContent = fmt(v);
    });
    if (wKg < 6400) msgs.push(L.light);
    if (alt < 2000) msgs.push(L.low);
    if (anyNull) msgs.push(L.na);
    elMsg.textContent = msgs.join(' ');
  }

  [elW, elAlt, elOat].forEach(function(el){ el.addEventListener('input', update); });
  document.querySelectorAll('.roc-pm').forEach(function(b){
    b.addEventListener('click', function(){
      var el = document.getElementById(b.getAttribute('data-t'));
      var v = el.value.trim();
      el.value = (v.charAt(0) === '-') ? v.slice(1) : '-' + v;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.focus();
    });
  });
  document.getElementById('rocClear').addEventListener('click', function(){
    elW.value = ''; elAlt.value = ''; elOat.value = '';
    update();
  });
  update();
  var clrBtn = document.getElementById('rocClear'), clrIns = [elW,elAlt,elOat];
  function syncClr(){ var any = clrIns.some(function(el){ return el.value.trim() !== ''; }); clrBtn.classList.toggle('roc-clean', !any); }
  clrIns.forEach(function(el){ el.addEventListener('input', syncClr); });
  clrBtn.addEventListener('click', syncClr);
  syncClr();
})();
