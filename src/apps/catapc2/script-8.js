// =============================================================================
// CAT A - PC 2 · PAYLOAD
// Cópia da calculadora HELIDECK OFFSHORE - PC2 (máximo de combustível / máximo
// de passageiros), independente: usa como peso máximo de decolagem o P.M.D da
// tela anterior (+ ajustes de ar-condicionado e vento). OAT e altitude vêm da
// tela anterior (só leitura).
// =============================================================================
(function () {
  var EN = !!(window.AW && window.AW.lang === 'en');
  var T = function (pt, en) { return EN ? en : pt; };
  var $ = function (id) { return document.getElementById(id); };

  // textos fixos em inglês
  if (EN) {
    document.querySelectorAll('#pc2Pay [data-en]').forEach(function (el) { el.textContent = el.getAttribute('data-en'); });
    document.querySelectorAll('#pc2Pay [data-en-ph]').forEach(function (el) { el.placeholder = el.getAttribute('data-en-ph'); });
    $('payNow').title = 'Update to now'; $('payNow').setAttribute('aria-label', 'Update to now');
    $('payFrame').title = 'Report preview';
  }

  var BOWREF = 10294, PAXW = 200, MINFUEL = 600, MAXFUEL = 3300, AC = -110, WIND = 400, LB_KG = 0.45359237;
  var FIELDS = ['payReg', 'payDt', 'payBow', 'payCrew', 'payPax', 'payPw', 'payFuel', 'payAvg'];
  var unit = 'lbs', mode = 1;

  (function () { var o = document.createElement('option'); o.value = ''; o.textContent = '—'; $('payPax').appendChild(o); })();   // vazio (após LIMPAR)
  for (var i = 0; i <= 15; i++) { var o = document.createElement('option'); o.value = i; o.textContent = i; $('payPax').appendChild(o); }
  $('payPax').value = 8;


  // P.M.D da tela anterior (campo pc2PmdMin), em lbs
  function pmdLbs() {
    var el = $('pc2PmdMin'); if (!el) return null;
    var s = String(el.value || ''), n = parseFloat(s.replace(/[^0-9.,]/g, '').replace(/[.,](?=\d{3}(\D|$))/g, '').replace(',', '.'));
    if (!(n > 0)) return null;
    return /lb/i.test(s) ? n : n / LB_KG;
  }
  // Peso máximo de decolagem (lbs) = P.M.D + ajustes (ar-condicionado / vento de proa)
  function weightLimit(oat, alt, ac, wind) {
    var pmd = pmdLbs();
    if (pmd === null) return { err: [T('P.M.D indisponível: volte e confira o cálculo do CAT A - PC 2.', 'M.T.O.W unavailable: go back and check the CAT A - PC 2 calculation.')] };
    var adj = (ac ? AC : 0) + (wind ? WIND : 0);
    return { L: pmd + adj, adj: adj, notes: [] };
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
  function rowH(l, v, big) { return '<div class="pay-res' + (big ? ' big' : '') + '"><span>' + l + '</span><b>' + v + '</b></div>'; }
  function alH(c, t) { return '<div class="pay-alert ' + c + '">' + t + '</div>'; }
  function row(l, v, big) { cur.push({ k: 'r', l: l, v: v, big: big }); return rowH(l, v, big); }
  function al(c, t) { cur.push({ k: 'a', c: c, t: t }); return alH(c, t); }
  function num(id) { return parseFloat(String($(id).value).replace(',', '.')); }

  function render() {
    cur = []; lastOk = true;
    var k = unit === 'kg' ? 1 / LB_KG : 1;
    var oat = num('payOat'), alt = num('payAlt'), bow = num('payBow') * k, crew = num('payCrew') * k;
    var out = $('payOut');
    updateClear();
    // campos em branco (ex.: após LIMPAR): aviso neutro em vez de erros
    var need = ['payBow', 'payCrew'].concat(mode === 1 ? ['payPw'] : ['payFuel', 'payAvg']);
    if (need.some(function (id) { return String($(id).value).trim() === ''; })) {
      lastOk = false; out.innerHTML = '<div class="pay-empty">' + T('Preencha os campos para calcular.', 'Fill in the fields to calculate.') + '</div>'; return;
    }
    var err = [];
    if (!(bow > 0)) err.push(T('BOW: informe o peso básico operacional.', 'BOW: enter the basic operating weight.'));
    if (isNaN(crew) || crew < 0) err.push(T('Tripulação: informe um peso válido (0 ou mais).', 'Crew: enter a valid weight (0 or more).'));
    var pw, fuel, avg;
    if (mode === 1) { pw = num('payPw') * k; if (isNaN(pw) || pw < 0) err.push(T('Peso dos passageiros: informe 0 ou mais.', 'Passenger weight: enter 0 or more.')); }
    else {
      fuel = num('payFuel') * k; avg = num('payAvg') * k;
      if (isNaN(fuel) || fuel < 0) err.push(T('Combustível a bordo: informe 0 ou mais.', 'Fuel on board: enter 0 or more.'));
      if (!(avg > 0)) err.push(T('Peso/pax: informe um valor maior que 0.', 'Weight/pax: enter a value greater than 0.'));
    }
    var w = weightLimit(oat, alt, $('payAc').checked, $('payWind').checked);
    if (w.err) err.push.apply(err, w.err);
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
  $('payDt').addEventListener('click', function () { if (!$('payDt').value.trim()) $('payDt').value = nowStr(); updateClear(); });
  $('payNow').addEventListener('click', function () { $('payDt').value = nowStr(); updateClear(); });

  ['payPax', 'payAc', 'payWind', 'payBow', 'payCrew', 'payPw', 'payFuel', 'payAvg'].forEach(function (id) {
    $(id).addEventListener('input', render); $(id).addEventListener('change', render);
  });
  // ao mudar o nº de passageiros, sugere o peso padrão (editável)
  $('payPax').addEventListener('change', function () { var n = parseInt($('payPax').value, 10); $('payPw').value = isNaN(n) ? '' : Math.round(n * PAXW * (unit === 'kg' ? LB_KG : 1)); render(); });
  // ± para OAT e altitude (teclado numérico do iPhone não tem o sinal de menos)
  document.querySelectorAll('#pc2Pay [data-pm]').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = $(b.getAttribute('data-pm')), v = el.value.trim();
      el.value = v.charAt(0) === '-' ? v.slice(1) : '-' + v; render(); el.focus();
    });
  });

  // ----- unidade lbs/kg -----
  function setUnit(u) {
    if (u === unit) return; var f = u === 'kg' ? LB_KG : 1 / LB_KG;
    ['payBow', 'payCrew', 'payPw', 'payFuel', 'payAvg'].forEach(function (id) { var x = num(id); if (!isNaN(x)) $(id).value = Math.round(x * f); });
    unit = u; document.querySelectorAll('#pc2Pay .pay-u').forEach(function (e) { e.setAttribute('data-u', u); });
    showPmd();
    $('payAcV').textContent = '−' + Math.round(110 * (u === 'kg' ? LB_KG : 1)) + ' ' + u;
    $('payWindV').textContent = '+' + Math.round(400 * (u === 'kg' ? LB_KG : 1)) + ' ' + u;
  }
  $('payUkg').addEventListener('change', function () {
    var kg = $('payUkg').checked; setUnit(kg ? 'kg' : 'lbs');
    $('paySl').className = kg ? '' : 'on'; $('paySk').className = kg ? 'on' : ''; render();
  });

  // ----- modo -----
  function setMode(m) {
    mode = m; $('payM1').classList.toggle('on', m === 1); $('payM2').classList.toggle('on', m === 2);
    $('payBox1').style.display = m === 1 ? '' : 'none'; $('payBox2').style.display = m === 2 ? '' : 'none'; render();
  }
  $('payM1').addEventListener('click', function () { setMode(1); });
  $('payM2').addEventListener('click', function () { setMode(2); });

  // Tripulação salva no aparelho (em lbs), mesmo após fechar o app
  try { var cs = localStorage.getItem('cataPayCrewLbs'); if (cs !== null && cs !== '' && !isNaN(parseFloat(cs))) $('payCrew').value = cs; } catch (e) {}
  $('payCrew').addEventListener('input', function () {
    var x = num('payCrew'); if (isNaN(x) || x < 0) return;
    try { localStorage.setItem('cataPayCrewLbs', String(Math.round(x * (unit === 'kg' ? 1 / LB_KG : 1) * 10) / 10)); } catch (e) {}
  });
  // Matrícula salva no aparelho, editável a qualquer momento
  try { var rg = localStorage.getItem('cataPayReg'); if (rg !== null) $('payReg').value = rg; } catch (e) {}
  $('payReg').addEventListener('input', function () { try { localStorage.setItem('cataPayReg', $('payReg').value.toUpperCase()); } catch (e) {} });

  // ----- LIMPAR: apaga todos os campos (inclusive matrícula e tripulação salvas no aparelho) -----
  function isEmpty() {
    return !$('payAc').checked && !$('payWind').checked &&
      FIELDS.every(function (id) { return String($(id).value).trim() === ''; });
  }
  function updateClear() {
    var e = isEmpty(); $('payClear').classList.toggle('state-green', e); $('payClear').classList.toggle('state-red', !e);
  }
  $('payReg').addEventListener('input', updateClear);
  $('payDt').addEventListener('input', updateClear);
  $('payClear').addEventListener('click', function () {
    FIELDS.forEach(function (id) { $(id).value = ''; });
    $('payAc').checked = false; $('payWind').checked = false;
    try { localStorage.removeItem('cataPayCrewLbs'); localStorage.removeItem('cataPayReg'); } catch (e) {}
    closeReport(); render();
  });

  // ===== Relatório (padrão POWER CHECK) e envio como imagem =====
  var report = null, reportPng = null;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function nf(id) { var x = num(id); return isNaN(x) ? '—' : x.toLocaleString(LOC); }
  function buildReport() {
    if (!$('payDt').value.trim()) $('payDt').value = nowStr();
    var u = unit;
    var items = [
      [T('Cálculo', 'Calculation'), mode === 1 ? T('Máximo de combustível', 'Maximum fuel') : T('Máximo de passageiros', 'Maximum passengers')],
      [T('Unidade', 'Unit'), u],
      ['BOW', nf('payBow') + ' ' + u],
      [T('Tripulação', 'Crew'), nf('payCrew') + ' ' + u],
      [T('Peso máx. decolagem (P.M.D)', 'Max. takeoff weight (M.T.O.W)'), $('payPmd').value || '—'],
      [T('Categoria / PC 2', 'Category / PC 2'), $('payTitleSub').textContent || '—'],
      ['OAT', nf('payOat') + ' °C'],
      [T('Altitude-pressão', 'Pressure altitude'), nf('payAlt') + ' ft']
    ];
    if (mode === 1) items.push([T('Passageiros', 'Passengers'), $('payPax').value], [T('Peso dos passageiros', 'Passenger weight'), nf('payPw') + ' ' + u]);
    else items.push([T('Combustível a bordo', 'Fuel on board'), nf('payFuel') + ' ' + u], [T('Peso/pax', 'Weight/pax'), nf('payAvg') + ' ' + u]);
    items.push([T('Ar-condicionado', 'Air conditioning'), $('payAc').checked ? T('Ligado', 'On') : T('Desligado', 'Off')],
               [T('Vento de proa ≥ 10 kt', 'Headwind ≥ 10 kt'), $('payWind').checked ? T('Sim', 'Yes') : T('Não', 'No')]);
    var rows = function (list) { return list.map(function (x) {
      if (x.k === 'a') return '<div class="al ' + x.c + '">' + esc(x.t) + '</div>';
      return '<div class="row' + (x.big ? ' big' : '') + '"><span>' + esc(x.l) + '</span><span>' + esc(x.v).replace(/(\d) (lbs|kg|lb|ft|°C|pax)/g, '$1\u00a0$2').replace(/PC (2e?)/g, 'PC\u00a0$1') + '</span></div>';
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
      '.row{display:flex;flex-wrap:wrap;justify-content:space-between;column-gap:12px;row-gap:2px;font-size:13.5px;padding:4px 0;}' +
      '.row span:first-child{color:#5b6b7a;flex:0 1 auto;}.row span:last-child{font-weight:600;text-align:right;flex:0 1 auto;margin-left:auto;white-space:normal;}' +
      '.row.big{margin:4px 0 8px;padding:10px 12px;border:1px solid #e6dcc0;border-left:5px solid #d4a921;border-radius:4px;background:#fffaf0;}' +
      '.row.big span:first-child{color:#0d1b2a;font-weight:600;}.row.big span:last-child{color:#8a5a12;font-size:16px;font-weight:800;}' +
      '.al{margin-top:8px;padding:9px 11px;border-radius:4px;font-size:12.5px;line-height:1.45;}' +
      '.al.bad{background:#fbeae7;color:#a8382c;border:1px solid #e6bcb8;}.al.warn{background:#fbeedd;color:#7a5416;border:1px solid #e6cd9e;}.al.ok{background:#e7f2ec;color:#2f6b4f;border:1px solid #b9dcc6;}' +
      '.disclaimer{padding:14px 22px 20px;font-size:11px;color:#9aa4ac;line-height:1.5;}' +
      '</style></head><body><div class="sheet">' +
      '<div class="header"><h1>' + T('AW139 – Relatório Payload CAT A - PC 2', 'AW139 – CAT A - PC 2 Payload Report') + '</h1>' +
      '<div class="meta">' + T('Matrícula', 'Registration') + ': ' + esc($('payReg').value.trim().toUpperCase() || '—') + '<br />' +
      T('Data/Hora', 'Date/Time') + ': ' + esc($('payDt').value.trim()) + '</div></div>' +
      '<div class="section"><h2>' + T('Dados informados', 'Entered data') + '</h2>' + rows(items.map(function (p) { return { k: 'r', l: p[0], v: p[1] }; })) + '</div>' +
      '<div class="section"><h2>' + (lastOk ? T('Resultados', 'Results') : T('Dados inconsistentes', 'Inconsistent data')) + '</h2>' + rows(cur) + '</div>' +
      '<div class="disclaimer">' + T('Peso máximo de decolagem = P.M.D do CAT A - PC 2 + ajustes. Ferramenta de apoio — sempre confira com o manual oficial.', 'Maximum takeoff weight = CAT A - PC 2 M.T.O.W + adjustments. Support tool — always check against the official manual.') + '</div>' +
      '</div></body></html>';
    report = html; reportPng = null;
    var frame = $('payFrame');
    frame.onload = function () { buildPng(frame, html); };
    frame.srcdoc = html;
    $('payRepBox').style.display = ''; $('payNote').textContent = '';
    updateClear();
  }
  function setBusy(b) {
    $('payWa').disabled = b;
    $('payNote').textContent = b ? T('Preparando a imagem do relatório…', 'Preparing the report image…') : '';
  }
  function fileName() {
    var reg = ($('payReg').value || 'AW139').replace(/[^A-Za-z0-9-]/g, '').toUpperCase() || 'AW139';
    var dt = ($('payDt').value || '').replace(/[^0-9]/g, '');
    return 'PayloadPC2_' + reg + (dt ? '_' + dt : '') + '.png';
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
        setBusy(false); $('payNote').textContent = T('Não foi possível gerar a imagem do relatório.', 'Unable to generate the report image.');
      });
  }
  function closeReport() {
    report = null; reportPng = null; $('payRepBox').style.display = 'none'; $('payFrame').srcdoc = ''; setBusy(false);
  }
  function send() {
    if (!reportPng) { $('payNote').textContent = T('Preparando a imagem do relatório… toque novamente em instantes.', 'Preparing the report image… tap again in a moment.'); return; }
    var file = reportPng;
    if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: T('AW139 – Relatório Payload CAT A - PC 2', 'AW139 – CAT A - PC 2 Payload Report') }).catch(function () {});
      return;
    }
    var url = URL.createObjectURL(file), a = document.createElement('a');
    a.href = url; a.download = file.name; a.style.display = 'none'; $('payNote').appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
    $('payNote').textContent = T('Imagem do relatório salva (', 'Report image saved (') + file.name + T('). Anexe-a na conversa do WhatsApp.', '). Attach it to the WhatsApp chat.');
  }
  $('payGen').addEventListener('click', buildReport);
  $('payRepClose').addEventListener('click', closeReport);
  $('payWa').addEventListener('click', send);

  function showPmd() {
    var p = pmdLbs();
    $('payPmd').value = p === null ? '—' : Math.round(unit === 'kg' ? p * LB_KG : p).toLocaleString(LOC) + ' ' + unit;
  }
  function openPayload() {
    $('payOat').value = $('pc2RoTemp') ? $('pc2RoTemp').value : '';
    $('payAlt').value = $('pc2RoAlt') ? $('pc2RoAlt').value : '';
    $('payTitleSub').textContent = (function () {
      var h = $('pc2DetHead'); if (!h) return '';
      var parts = []; h.childNodes.forEach(function (n) { var t = (n.textContent || '').trim(); if (t && parts.length < 2) parts.push(t); });
      return parts.join(' · ');
    })();
    showPmd(); closeReport(); render();
    $('pc2Det').style.display = 'none'; $('pc2Pay').style.display = '';
    try { $('pc2Pay').scrollIntoView(); } catch (e) {}
  }
  $('pc2PayBtn').addEventListener('click', openPayload);
  $('payBack').addEventListener('click', function () {
    $('pc2Pay').style.display = 'none'; $('pc2Det').style.display = '';
    try { $('pc2Det').scrollIntoView(); } catch (e) {}
  });

  render();
})();
