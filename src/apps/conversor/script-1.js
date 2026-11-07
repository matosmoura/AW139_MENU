(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  var DENS = 0.83;   // kg/L (QAV)
  var L = en ? {
    in: 'Input data', clear: 'Clear', cat: 'Category', val: 'Value', unit: 'Unit', res: 'Results',
    fill: 'Enter a value to convert.', dens: 'Conversions between kg and L use QAV density 0.83 kg/L.'
  } : {
    in: 'Dados de entrada', clear: 'Limpar', cat: 'Categoria', val: 'Valor', unit: 'Unidade', res: 'Resultados',
    fill: 'Digite um valor para converter.', dens: 'Conversões entre kg e L usam a densidade do QAV de 0,83 kg/L.'
  };
  // f = fator para a unidade base (base = f * valor); temperatura usa funções
  var CATS = [
    { id: 'peso', n: ['Peso', 'Weight'], u: [['kg', 1], ['lb', 0.45359237], ['g', 0.001], ['oz', 0.028349523125]] },
    { id: 'dist', n: ['Distância', 'Distance'], u: [['m', 1], ['km', 1000], ['ft', 0.3048], ['NM', 1852], ['SM', 1609.344], ['in', 0.0254]] },
    { id: 'vel', n: ['Velocidade', 'Speed'], u: [['kt', 1852 / 3600], ['km/h', 1 / 3.6], ['m/s', 1], ['mph', 0.44704], ['ft/min', 0.00508]] },
    { id: 'temp', n: ['Temperatura', 'Temperature'], t: true, u: [['°C'], ['°F'], ['K']] },
    { id: 'pres', n: ['Pressão', 'Pressure'], u: [['hPa', 100], ['inHg', 3386.389], ['mmHg', 133.322387415], ['kPa', 1000], ['psi', 6894.757293168], ['bar', 100000]] },
    { id: 'vol', n: ['Volume', 'Volume'], u: [['L', 1], ['mL', 0.001], ['US gal', 3.785411784], ['Imp gal', 4.54609]] },
    { id: 'comb', n: ['Combustível (QAV)', 'Fuel (Jet A-1)'], u: [['kg', 1], ['lb', 0.45359237], ['L', DENS], ['US gal', 3.785411784 * DENS]] },
    { id: 'vazao', n: ['Vazão de combustível', 'Fuel flow'], u: [['kg/h', 1], ['lb/h', 0.45359237], ['L/h', DENS], ['US gal/h', 3.785411784 * DENS], ['kg/min', 60], ['L/min', 60 * DENS]] },
    { id: 'ang', n: ['Ângulo', 'Angle'], u: [['°', 1], ['rad', 180 / Math.PI], ['grad', 0.9], ['′ (min)', 1 / 60], ['″ (seg)', 1 / 3600]] },
    { id: 'tempo', n: ['Tempo', 'Time'], u: [['s', 1], ['min', 60], ['h', 3600], ['dia', 86400]] },
    { id: 'coord', n: ['Coord. Geográfica', 'Geog. coord.'], coord: true, u: [] }
  ];
  function uname(u){ return en ? u.replace('dia', 'day').replace('(seg)', '(sec)') : u; }
  function toBase(c, k, v){
    if (c.t){ return k === 0 ? v : (k === 1 ? (v - 32) * 5 / 9 : v - 273.15); }   // base °C
    return v * c.u[k][1];
  }
  function fromBase(c, k, b){
    if (c.t){ return k === 0 ? b : (k === 1 ? b * 9 / 5 + 32 : b + 273.15); }
    return b / c.u[k][1];
  }
  function fmt(v){
    if (!isFinite(v)) return '—';
    var a = Math.abs(v), r;
    if (a !== 0 && (a < 0.0001 || a >= 1e9)) r = v.toExponential(4);
    else r = String(parseFloat(v.toFixed(a >= 1000 ? 2 : (a >= 1 ? 4 : 6))));
    return en ? r : r.replace('.', ',');
  }
  var root = document.getElementById('cvRoot');
  var opts = CATS.map(function(c){ return '<option value="' + c.id + '">' + c.n[en ? 1 : 0] + '</option>'; }).join('');
  root.innerHTML =
    '<div class="cv-head"><div class="cv-label">' + L.in + '</div><button type="button" class="cv-clear cv-clean" id="cvClear">' + L.clear + '</button></div>' +
    '<div class="cv-panel">' +
      '<div class="cv-field"><label for="cvCat">' + L.cat + '</label><select class="cv-select" id="cvCat">' + opts + '</select></div>' +
      '<div class="cv-row" id="cvRow">' +
        '<div class="cv-field"><label for="cvVal">' + L.val + '</label><div class="cv-inwrap"><button type="button" class="cv-pm" aria-label="±">±</button><input type="text" inputmode="decimal" id="cvVal" autocomplete="off"></div></div>' +
        '<div class="cv-field"><label for="cvUnit">' + L.unit + '</label><select class="cv-select" id="cvUnit"></select></div>' +
      '</div>' +
    '</div>' +
    '<div id="cvCoord" style="display:none"></div>' +
    '<div class="cv-label" id="cvResLbl" style="margin:0 4px 6px;">' + L.res + '</div>' +
    '<div class="cv-panel" id="cvResPanel"><table class="cv-table"><tbody id="cvOut"></tbody></table></div>' +
    '<div class="cv-msg" id="cvMsg"></div><div class="cv-note" id="cvNote"></div>';
  var eCat = document.getElementById('cvCat'), eUnit = document.getElementById('cvUnit'), eVal = document.getElementById('cvVal');
  var eOut = document.getElementById('cvOut'), eMsg = document.getElementById('cvMsg'), eNote = document.getElementById('cvNote'), btn = document.getElementById('cvClear');
  function cat(){ return CATS.filter(function(c){ return c.id === eCat.value; })[0]; }
  function fillUnits(){
    var c = cat();
    if (c.coord){ eUnit.innerHTML = ''; eNote.textContent = ''; return; }
    eUnit.innerHTML = c.u.map(function(u, k){ return '<option value="' + k + '">' + uname(u[0]) + '</option>'; }).join('');
    // em inglês, pesos e combustível começam em lb
    if (en && (c.id === 'peso' || c.id === 'comb')) eUnit.value = '1';
    eNote.textContent = (c.id === 'comb' || c.id === 'vazao') ? L.dens : '';
  }
  function num(){ var v = parseFloat(String(eVal.value).replace(',', '.')); return isNaN(v) ? null : v; }
  function update(){
    var c = cat();
    var coord = !!c.coord;
    document.getElementById('cvRow').style.display = coord ? 'none' : '';
    document.getElementById('cvResLbl').style.display = coord ? 'none' : '';
    document.getElementById('cvResPanel').style.display = coord ? 'none' : '';
    document.getElementById('cvCoord').style.display = coord ? '' : 'none';
    if (coord){ eOut.innerHTML = ''; eMsg.textContent = ''; coordClearState(); return; }
    var v = num(), k = parseInt(eUnit.value, 10);
    eOut.innerHTML = '';
    eMsg.textContent = '';
    btn.classList.toggle('cv-clean', eVal.value.trim() === '');
    if (v === null){ eMsg.textContent = L.fill; return; }
    var b = toBase(c, k, v);
    c.u.forEach(function(u, j){
      if (j === k) return;
      var tr = document.createElement('tr');
      tr.innerHTML = '<td class="cv-u">' + uname(u[0]) + '</td><td class="cv-r">' + fmt(fromBase(c, j, b)) + '</td>';
      eOut.appendChild(tr);
    });
  }
  eCat.addEventListener('change', function(){ fillUnits(); update(); });
  eUnit.addEventListener('change', update);
  eVal.addEventListener('input', update);
  root.querySelector('.cv-pm').addEventListener('click', function(){
    var t = eVal.value.trim();
    eVal.value = t.charAt(0) === '-' ? t.slice(1) : '-' + t;
    update(); eVal.focus();
  });
  btn.addEventListener('click', function(){ if (cat().coord) coordClear(); else { eVal.value = ''; update(); } });

  // ---------- COORDENADA GEOGRÁFICA ----------
  var CL = en ? {
    lat: 'Latitude (North / South)', lon: 'Longitude (East / West)', gms: 'DMS — Degrees, minutes and seconds', gm: 'DM — Degrees and decimal minutes', gd: 'DD — Decimal degrees',
    deg: 'Degrees', min: 'Min', sec: 'Sec', range: 'Value out of range.', hN: ['N', 'S'], hE: ['E', 'W'], dist: 'Distance', need: 'Add at least two coordinates using the + button.', both: 'Fill in both latitude and longitude before adding.', nm: 'Nautical miles', km: 'Kilometers', mt: 'Meters', full: 'Maximum of 10 points.', rm: 'Remove', vm: 'Magnetic variation (°)', tb: 'True course', mb: 'Magnetic heading', vmh: 'Enter the magnetic variation to get the magnetic heading.'
  } : {
    lat: 'Latitude (Norte / Sul)', lon: 'Longitude (Leste / Oeste)', gms: 'GMS — Graus, minutos e segundos', gm: 'GM — Graus e minutos decimais', gd: 'GD — Graus decimais',
    deg: 'Graus', min: 'Min', sec: 'Seg', range: 'Valor fora da faixa.', hN: ['N', 'S'], hE: ['L', 'O'], dist: 'Distância', need: 'Adicione ao menos duas coordenadas usando o botão +.', both: 'Preencha latitude e longitude antes de adicionar.', nm: 'Milhas náuticas', km: 'Quilômetros', mt: 'Metros', full: 'Máximo de 10 pontos.', rm: 'Remover', vm: 'Variação magnética (°)', tb: 'Proa verdadeira', mb: 'Proa magnética', vmh: 'Informe a variação magnética para obter a proa magnética.'
  };
  var AX = [ { id: 'lat', t: CL.lat, max: 90, h: CL.hN, dg: 2 }, { id: 'lon', t: CL.lon, max: 180, h: CL.hE, dg: 3 } ];
  function pad(n, w){ var t = String(n); while (t.length < w) t = '0' + t; return t; }
  function padDec(t, w){ var q = String(t).split(/[.,]/); return pad(q[0], w) + (q.length > 1 ? (en ? '.' : ',') + q[1] : ''); }
  function cf(label, id, extra){
    return '<div class="cv-field"><label for="' + id + '">' + label + '</label><div class="cv-inwrap"><input type="text" inputmode="decimal" id="' + id + '" autocomplete="off"' + (extra || '') + '></div></div>';
  }
  function hb(id, h, t){ return '<div class="cv-field"><label>&nbsp;</label><button type="button" class="cv-hem" id="' + id + '" data-neg="0" aria-label="' + t + '">' + h[0] + '</button></div>'; }
  var cHtml = '<div class="cv-panel">';
  var FMT = [ ['Gms', CL.gms, 'cv-c4', [['D', CL.deg], ['M', CL.min], ['S', CL.sec]]], ['Gm', CL.gm, 'cv-c3', [['D', CL.deg], ['M', CL.min]]], ['Gd', CL.gd, 'cv-c2', [['', CL.deg]]] ];
  FMT.forEach(function(F, fi){
    cHtml += (fi ? '<div class="cv-sep" style="height:2px;margin:14px 2px 10px;border-radius:2px;background:rgba(14,59,107,.28);"></div>' : '') + '<div class="cv-ft" style="display:flex;justify-content:space-between;align-items:center;"><span>' + F[1] + '</span><button type="button" class="cv-hem cv-add" data-f="' + F[0].toLowerCase() + '" aria-label="+" style="width:30px;height:24px;font-size:16px;line-height:1;border-radius:6px;flex:none;margin-left:8px;">+</button></div>';
    AX.forEach(function(x, xi){
      cHtml += '<div class="cv-crow ' + F[2] + '">' + hb(x.id + F[0] + 'H', x.h, x.t);
      F[3].forEach(function(c){
        var ex = '';
        if (c[0] === 'D' && F[0] !== 'Gd') ex = ' maxlength="' + x.dg + '"';
        else if (F[0] === 'Gms' && c[0] === 'M') ex = ' maxlength="2"';
        cHtml += cf(xi === 0 ? c[1] : '&nbsp;', x.id + F[0] + c[0], ex);
      });
      cHtml += '</div>';
    });
  });
  AX.forEach(function(x){ cHtml += '<div class="cv-cerr" id="' + x.id + 'Err"></div>'; });
  cHtml += '</div>';
  cHtml += '<div style="display:flex;justify-content:space-between;align-items:center;margin:0 4px 6px;"><div class="cv-label">' + CL.dist + '</div><button type="button" class="cv-clear cv-clean" id="cvDClr">' + L.clear + '</button></div>' +
    '<div class="cv-panel"><div class="cv-crow cv-c2" style="margin-bottom:10px;">' + hb('vmH', CL.hE, CL.vm) + cf(CL.vm, 'vmD', ' maxlength="6"') + '</div><div id="cvDPts"></div><div class="cv-cerr" id="cvDMsg"></div><table class="cv-table" id="cvDTbl" style="display:none"><tbody id="cvDOut"></tbody></table></div>';
  document.getElementById('cvCoord').innerHTML = cHtml;
  function g(id){ return document.getElementById(id); }
  function pn(id){ var t = String(g(id).value).replace(',', '.').trim(); if (t === '') return null; var v = parseFloat(t); return isNaN(v) ? NaN : v; }
  function ff(v, dec){ var r = String(parseFloat(v.toFixed(dec))); return en ? r : r.replace('.', ','); }
  function setHem(id, neg, h){ var b = g(id); b.dataset.neg = neg ? '1' : '0'; b.textContent = neg ? h[1] : h[0]; }
  function readRow(x, f){
    var neg, abs;
    if (f === 'gd'){
      var t = String(g(x.id + 'Gd').value).trim(); if (t === '' || t === '-') return { empty: true };
      var v = pn(x.id + 'Gd'); if (isNaN(v)) return { err: true };
      neg = t.charAt(0) === '-'; abs = Math.abs(v);
    } else {
      var P = f === 'gms' ? 'Gms' : 'Gm';
      var dd = pn(x.id + P + 'D'), mm = pn(x.id + P + 'M'), ss = f === 'gms' ? pn(x.id + 'GmsS') : null;
      if (dd === null && mm === null && ss === null) return { empty: true };
      if ([dd, mm, ss].some(function(q){ return q !== null && isNaN(q); })) return { err: true };
      dd = dd || 0; mm = mm || 0; ss = ss || 0;
      if (dd < 0 || mm < 0 || ss < 0 || mm >= 60 || ss >= 60) return { err: true };
      neg = g(x.id + P + 'H').dataset.neg === '1'; abs = dd + mm / 60 + ss / 3600;
    }
    if (abs > x.max + 1e-12) return { err: true };
    return { neg: neg, abs: abs };
  }
  function writeRow(x, f, r){
    var abs = r.abs;
    if (f === 'gd'){ setHem(x.id + 'GdH', r.neg, x.h); g(x.id + 'Gd').value = (r.neg && abs !== 0 ? '-' : '') + ff(abs, 6); return; }
    if (f === 'gm'){
      var tm = Math.round(abs * 60 * 10000) / 10000, dg = Math.floor(tm / 60);
      setHem(x.id + 'GmH', r.neg, x.h); g(x.id + 'GmD').value = pad(dg, x.dg); g(x.id + 'GmM').value = padDec(ff(tm - dg * 60, 4), 2); return;
    }
    var ts = Math.round(abs * 3600 * 100) / 100, d2 = Math.floor(ts / 3600), rem = ts - d2 * 3600, m2 = Math.floor(rem / 60), s2 = rem - m2 * 60;
    setHem(x.id + 'GmsH', r.neg, x.h); g(x.id + 'GmsD').value = pad(d2, x.dg); g(x.id + 'GmsM').value = pad(m2, 2); g(x.id + 'GmsS').value = padDec(ff(s2, 2), 2);
  }
  function clearRow(x, f){
    if (f === 'gd') { g(x.id + 'Gd').value = ''; setHem(x.id + 'GdH', false, x.h); return; }
    var P = f === 'gms' ? 'Gms' : 'Gm';
    g(x.id + P + 'D').value = ''; g(x.id + P + 'M').value = ''; if (f === 'gms') g(x.id + 'GmsS').value = '';
    setHem(x.id + P + 'H', false, x.h);
  }
  var FM = ['gms', 'gm', 'gd'];
  function coordClearState(){ btn.classList.toggle('cv-clean', !coordAny()); }
  function coordAny(){
    return AX.some(function(x){
      return ['GmsD', 'GmsM', 'GmsS', 'GmD', 'GmM', 'Gd'].some(function(k){ return g(x.id + k).value.trim() !== ''; });
    });
  }
  function onCoord(x, f){
    var r = readRow(x, f), err = g(x.id + 'Err');
    err.textContent = '';
    if (r.empty){ FM.forEach(function(o){ if (o !== f) clearRow(x, o); }); }
    else if (r.err){ err.textContent = CL.range; }
    else { FM.forEach(function(o){ if (o !== f) writeRow(x, o, r); }); }
    coordClearState();
  }
  AX.forEach(function(x){
    [['GmsD','gms'], ['GmsM','gms'], ['GmsS','gms'], ['GmD','gm'], ['GmM','gm'], ['Gd','gd']].forEach(function(q){
      var el0 = g(x.id + q[0]);
      el0.addEventListener('input', function(){
        var lead = q[0] === 'Gd' && el0.value.charAt(0) === '-';
        if (q[0] === 'Gd') setHem(x.id + 'GdH', lead, x.h);
        var v = (lead ? '-' : '') + el0.value.replace(/[^0-9.,]/g, '');
        if (q[0] === 'GmsD' || q[0] === 'GmD' || q[0] === 'GmsM') v = v.replace(/[^0-9]/g, '');
        if (v !== el0.value) el0.value = v;
        onCoord(x, q[1]);
      });
    });
    [['GmsH','gms'], ['GmH','gm'], ['GdH','gd']].forEach(function(q){
      g(x.id + q[0]).addEventListener('click', function(){ var b = g(x.id + q[0]);
        if (q[0] === 'GdH'){ var ge = g(x.id + 'Gd'), neg = ge.value.charAt(0) !== '-'; ge.value = neg ? '-' + ge.value : ge.value.slice(1); setHem(x.id + 'GdH', neg, x.h); onCoord(x, 'gd'); return; } setHem(x.id + q[0], b.dataset.neg !== '1', x.h); onCoord(x, q[1]); });
    });
  });

  // ---------- DISTÂNCIA ----------
  var PTS = [];
  function sgn(r){ return (r.neg ? -1 : 1) * r.abs; }
  function ptText(r, x, f){
    var h = r.neg ? x.h[1] : x.h[0], abs = r.abs;
    if (f === 'gd') return (r.neg && abs !== 0 ? '-' : '') + ff(abs, 6) + '°';
    if (f === 'gm'){ var tm = Math.round(abs * 60 * 10000) / 10000, dg = Math.floor(tm / 60); return pad(dg, x.dg) + '° ' + padDec(ff(tm - dg * 60, 4), 2) + "' " + h; }
    var ts = Math.round(abs * 3600 * 100) / 100, d2 = Math.floor(ts / 3600), rem = ts - d2 * 3600, m2 = Math.floor(rem / 60), s2 = rem - m2 * 60;
    return pad(d2, x.dg) + '° ' + pad(m2, 2) + "' " + padDec(ff(s2, 2), 2) + '" ' + h;
  }
  function hav(a, b){
    var R = 6371008.8, rad = Math.PI / 180, p1 = a.lat * rad, p2 = b.lat * rad, dp = (b.lat - a.lat) * rad, dl = (b.lon - a.lon) * rad;
    var h = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);
    return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }
  function brg(a, b){
    var rad = Math.PI / 180, p1 = a.lat * rad, p2 = b.lat * rad, dl = (b.lon - a.lon) * rad;
    var y = Math.sin(dl) * Math.cos(p2), x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
    return (Math.atan2(y, x) / rad + 360) % 360;
  }
  function vmVal(){
    var t = String(g('vmD').value).replace(',', '.').trim(); if (t === '') return null;
    var v = parseFloat(t); if (isNaN(v)) return null;
    return g('vmH').dataset.neg === '1' ? -Math.abs(v) : Math.abs(v);
  }
  function hdg(b){ var r = Math.round(b) % 360; if (r < 0) r += 360; if (r === 0) r = 360; return pad(r, 3) + '°'; }
  function magOf(b, v){ return v === null ? '—' : hdg(b - v); }
  function fmtN(v, dec){ var t = v.toFixed(dec).split('.'); t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, en ? ',' : '.'); return t.join(en ? '.' : ','); }
  function distRender(){
    var box = g('cvDPts'), msg = g('cvDMsg'), tbl = g('cvDTbl'), out = g('cvDOut'), tot = 0, h = '', legs = [], vm = vmVal();
    PTS.forEach(function(p, k){
      var leg = '';
      if (k > 0){ var dm = hav(PTS[k - 1], p), bt = brg(PTS[k - 1], p); tot += dm; if (PTS.length > 2) legs.push(bt);
        leg = '<div style="font-size:10.5px;color:#4a5a6a;font-weight:700;text-align:right;white-space:nowrap;"><div>' + fmtN(dm / 1852, 2) + ' NM</div><div>' + (en ? 'TC ' : 'PV ') + hdg(bt) + ' · ' + (en ? 'MH ' : 'PM ') + magOf(bt, vm) + '</div></div>'; }
      h += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(14,59,107,.15);">' +
        '<div style="font-weight:800;color:#123a63;width:26px;">P' + (k + 1) + '</div>' +
        '<div style="flex:1;min-width:0;font-size:12.5px;font-weight:700;color:#10202f;"><div>' + p.tlat + '</div><div>' + p.tlon + '</div></div>' + leg +
        '<button type="button" class="cv-hem cv-del" data-k="' + k + '" aria-label="' + CL.rm + '" style="width:28px;height:28px;font-size:15px;flex:none;">×</button></div>';
    });
    box.innerHTML = h;
    box.querySelectorAll('.cv-del').forEach(function(b){ b.addEventListener('click', function(){ PTS.splice(parseInt(b.dataset.k, 10), 1); msg.style.color = ''; distRender(); }); });
    g('cvDClr').classList.toggle('cv-clean', PTS.length === 0);
    if (PTS.length < 2){ tbl.style.display = 'none'; out.innerHTML = ''; if (!msg.dataset.keep) msg.textContent = PTS.length ? CL.need : ''; return; }
    msg.textContent = '';
    tbl.style.display = '';
    out.innerHTML = [[CL.nm, fmtN(tot / 1852, 2), 'NM'], [CL.km, fmtN(tot / 1000, 3), 'km'], [CL.mt, fmtN(tot, 0), 'm']].concat(PTS.length === 2 ? (function(){ var bt = brg(PTS[0], PTS[1]); return [[CL.tb, hdg(bt), ''], [CL.mb, magOf(bt, vm), '']]; })() : []).map(function(r){
      return '<tr><td class="cv-u">' + r[0] + '</td><td class="cv-r">' + r[1] + (r[2] ? ' ' + r[2] : '') + '</td></tr>';
    }).join('');
    if (vm === null){ msg.textContent = CL.vmh; msg.style.color = '#123a63'; } else { msg.style.color = ''; }
  }
  document.querySelectorAll('.cv-add').forEach(function(b){
    b.addEventListener('click', function(){
      var f = b.dataset.f, msg = g('cvDMsg'), rs = AX.map(function(x){ return readRow(x, f); });
      msg.dataset.keep = '';
      if (rs.some(function(r){ return r.empty || r.err; })){ msg.textContent = CL.both; msg.dataset.keep = '1'; return; }
      if (PTS.length >= 10){ msg.textContent = CL.full; msg.dataset.keep = '1'; return; }
      PTS.push({ lat: sgn(rs[0]), lon: sgn(rs[1]), tlat: ptText(rs[0], AX[0], f), tlon: ptText(rs[1], AX[1], f) });
      distRender(); msg.dataset.keep = '';
    });
  });
  setHem('vmH', true, CL.hE);
  g('vmH').addEventListener('click', function(){ setHem('vmH', g('vmH').dataset.neg !== '1', CL.hE); distRender(); });
  g('vmD').addEventListener('input', function(){ var el = g('vmD'), v = el.value.replace(/[^0-9.,]/g, ''); if (v !== el.value) el.value = v; distRender(); });
  g('cvDClr').addEventListener('click', function(){ PTS = []; g('cvDMsg').dataset.keep = ''; distRender(); });
  distRender();
  function coordClear(){
    AX.forEach(function(x){ FM.forEach(function(f){ clearRow(x, f); }); g(x.id + 'Err').textContent = ''; });
    coordClearState();
  }
  fillUnits(); update();
})();
