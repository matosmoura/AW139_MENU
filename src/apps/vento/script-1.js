(function () {
  'use strict';

  // ---------- idioma (PT/EN, segue a bandeira do menu) ----------
  var EN = !!(window.AW && window.AW.lang === 'en');
  var T = function (pt, en) { return EN ? en : pt; };
  if (EN) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-en]'), function (el) { el.textContent = el.getAttribute('data-en'); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-en-aria]'), function (el) { el.setAttribute('aria-label', el.getAttribute('data-en-aria')); });
  }
  var $ = function (s) { return document.querySelector(s); };
  var mod = function (n) { return ((n % 360) + 360) % 360; };
  var pad3 = function (n) { return String(n).padStart(3, '0'); };
  var nf = new Intl.NumberFormat(EN ? 'en-US' : 'pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var fmt = function (n) { return nf.format(Math.abs(n) < 0.05 ? 0 : Math.abs(n)); };

  /*LOGIC*/
  var THRESHOLD = 15;
  function analyse(hdg, wdir, kt) {
    var rel = mod(wdir - hdg);
    var rad = rel * Math.PI / 180;
    var head = kt * Math.cos(rad);
    var cross = kt * Math.sin(rad);
    var sector = (rel > 90 && rel < 270) ? 'tail' : ((rel >= 270 || rel < 20) ? 'full' : 'mid');
    var benefit = 0;
    if (sector === 'full') benefit = Math.max(0, head);
    if (sector === 'mid' && kt > THRESHOLD) benefit = Math.max(0, head);
    var status;
    if (kt === 0) status = 'calm';
    else if (sector === 'tail') status = 'prohibited';
    else if (benefit >= 0.05) status = 'benefit';
    else status = 'none';
    return { rel: rel, head: head, cross: cross, sector: sector, benefit: benefit, status: status };
  }
  /*END*/

  var state = { hdg: 0, wdir: 0, kt: 0 };
  var NAMES = ['Norte', 'Nordeste', 'Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste'];
  var ABBR = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  var octant = function (d) { return Math.round(mod(d) / 45) % 8; };

  /* ---------- desenho estático ---------- */
  var R = 138;
  function P(r, d) { var a = d * Math.PI / 180; return [(r * Math.sin(a)).toFixed(2), (-r * Math.cos(a)).toFixed(2)]; }
  function wedge(a1, a2) {
    var p1 = P(R, a1), p2 = P(R, a2), span = ((a2 - a1) + 360) % 360;
    return 'M0 0L' + p1[0] + ' ' + p1[1] + 'A' + R + ' ' + R + ' 0 ' + (span > 180 ? 1 : 0) + ' 1 ' + p2[0] + ' ' + p2[1] + 'Z';
  }
  $('#wFull').setAttribute('d', wedge(270, 20));
  $('#wMid').setAttribute('d', wedge(20, 90));
  $('#wTail').setAttribute('d', wedge(90, 270));
  $('#wHatch').setAttribute('d', wedge(90, 270));
  var e20 = P(R, 20);
  $('#edge20').setAttribute('x2', e20[0]);
  $('#edge20').setAttribute('y2', e20[1]);

  var ticks = '';
  for (var d = 0; d < 360; d += 10) {
    var len = d % 90 === 0 ? 12 : (d % 30 === 0 ? 9 : 5);
    var a = P(170, d), b = P(170 - len, d);
    ticks += '<line class="tick' + (d % 30 === 0 ? ' major' : '') + '" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>';
  }
  $('#ticks').innerHTML = ticks;

  var cards = '';
  for (var i = 0; i < 8; i++) {
    var c = P(150, i * 45);
    cards += '<text class="cardinal' + (i === 0 ? ' n' : '') + '" x="' + c[0] + '" y="' + c[1] + '">' + ABBR[i] + '</text>';
  }
  $('#cards').innerHTML = cards;

  var relDefs = [[0, '0°'], [20, '20°'], [90, '90°'], [270, '270°']];
  var relHtml = '';
  relDefs.forEach(function (r) {
    var p = P(118, r[0]);
    relHtml += '<g transform="translate(' + p[0] + ' ' + p[1] + ')"><text class="rel">' + r[1] + '</text></g>';
  });
  $('#rels').innerHTML = relHtml;
  var relTexts = Array.prototype.slice.call(document.querySelectorAll('#rels text'));

  var sel = $('#kt');
  for (var k = 0; k <= 70; k++) {
    var o = document.createElement('option');
    o.value = String(k); o.textContent = k + ' kt';
    sel.appendChild(o);
  }

  /* ---------- textos ---------- */
  function sideText(rel) {
    if (rel === 0) return T('de proa', 'head-on');
    if (rel === 180) return T('de popa', 'from astern');
    return rel < 180 ? T('pela direita', 'from the right') : T('pela esquerda', 'from the left');
  }
  function crossText(c) {
    if (Math.abs(c) < 0.05) return T('sem componente', 'no component');
    return c > 0 ? T('da direita', 'from the right') : T('da esquerda', 'from the left');
  }

  /* ---------- render ---------- */
  var hdgOut = $('#hdgOut'), wdOut = $('#wdOut');
  function syncInput(el, v) { if (document.activeElement !== el || !el.dataset.dirty) el.value = v; }

  function render() {
    var A = analyse(state.hdg, state.wdir, state.kt);
    var on = state.kt > 0;

    syncInput(hdgOut, pad3(state.hdg));
    $('#hdgSuf').textContent = '° ' + ABBR[octant(state.hdg)];
    syncInput(wdOut, pad3(state.wdir));
    $('#wdSuf').textContent = '° ' + ABBR[octant(state.wdir)];
    sel.value = String(state.kt);

    $('#reset').setAttribute('data-state', (state.hdg || state.wdir || state.kt) ? 'filled' : 'empty');
    $('#rot').setAttribute('transform', 'rotate(' + state.hdg + ')');
    $('#heliRot').setAttribute('transform', 'rotate(' + state.hdg + ')');
    relTexts.forEach(function (t) { t.setAttribute('transform', 'rotate(' + (-state.hdg) + ')'); });
    $('#wind').setAttribute('transform', 'rotate(' + state.wdir + ')');

    $('#wFull').classList.toggle('active', on && A.sector === 'full');
    $('#wMid').classList.toggle('active', on && A.sector === 'mid');
    $('#wMid').classList.toggle('on', state.kt > THRESHOLD);
    $('#wTail').classList.toggle('active', on && A.sector === 'tail');

    var tone, word, why, bLabel = T('benefício utilizável', 'usable benefit'), bVal = fmt(A.benefit);
    if (A.status === 'calm') {
      tone = 'calm'; word = T('SEM VENTO', 'NO WIND');
      why = '';
    } else if (A.status === 'prohibited') {
      tone = 'bad'; word = T('PROIBIDO', 'PROHIBITED');
      why = T('O vento incide pelo setor de cauda, entre 90° e 270°.', 'The wind is in the tail sector, between 90° and 270°.');
      bLabel = T('componente de cauda', 'tailwind component'); bVal = fmt(-A.head);
    } else if (A.status === 'benefit') {
      tone = A.sector === 'full' ? 'good' : 'warn'; word = T('BENÉFICO', 'BENEFICIAL');
      why = A.sector === 'full'
        ? T('Vento pelo setor de benefício total, de 270° a 20°. Vale a componente de proa.', 'Wind in the full benefit sector, 270° to 20°. The headwind component applies.')
        : T('Vento acima de 15 kt no setor de 20° a 90°. Vale a componente de proa.', 'Wind above 15 kt in the 20° to 90° sector. The headwind component applies.');
    } else {
      tone = 'calm'; word = T('SEM BENEFÍCIO', 'NO BENEFIT');
      why = A.sector === 'mid'
        ? T('Vento de 15 kt ou menos no setor de 20° a 90°. Não há benefício.', 'Wind of 15 kt or less in the 20° to 90° sector. No benefit.')
        : T('A componente de proa é nula neste ângulo.', 'The headwind component is zero at this angle.');
    }
    $('#verdict').setAttribute('data-tone', tone);
    $('#status').textContent = word;
    $('#why').textContent = why;
    $('#why').hidden = !why;
    $('#bVal').textContent = bVal + ' kt';
    $('#bLabel').textContent = bLabel;
    $('#envChip').textContent = state.kt > THRESHOLD ? T('Vento acima de 15 kt', 'Wind above 15 kt') : T('Vento até 15 kt', 'Wind up to 15 kt');
    $('#envChip').setAttribute('data-on', state.kt > THRESHOLD ? 'true' : 'false');

    $('#tRel').textContent = pad3(A.rel) + '°';
    $('#tRelS').textContent = sideText(A.rel);
    var tail = A.head < -0.05;
    $('#tHeadL').textContent = tail ? T('Comp. de cauda', 'Tailwind comp.') : T('Comp. de proa', 'Headwind comp.');
    $('#tHead').textContent = fmt(A.head);
    $('#tHeadS').textContent = tail ? T('vento pela popa', 'wind from astern') : T('vento de frente', 'wind from ahead');
    $('#tileHead').classList.toggle('neg', tail);
    $('#tCross').textContent = fmt(A.cross);
    $('#tCrossS').textContent = crossText(A.cross);

    var items = document.querySelectorAll('#legend li');
    Array.prototype.forEach.call(items, function (li) {
      li.classList.toggle('active', on && li.getAttribute('data-sector') === A.sector);
    });
    var mid = document.querySelector('#legend li[data-sector="mid"]');
    mid.setAttribute('data-on', state.kt > THRESHOLD ? 'true' : 'false');
    $('#midText').textContent = state.kt > THRESHOLD ? T('Componente de proa (vento acima de 15 kt)', 'Headwind component (wind above 15 kt)') : T('Sem benefício (vento até 15 kt)', 'No benefit (wind up to 15 kt)');

    $('#dial').setAttribute('aria-label',
      T('Helicóptero com proa ' + pad3(state.hdg) + ' graus. Vento de ' + pad3(state.wdir) + ' graus a ' + state.kt +
      ' nós, ângulo relativo ' + pad3(A.rel) + ' graus. ', 'Helicopter heading ' + pad3(state.hdg) + ' degrees. Wind from ' + pad3(state.wdir) + ' degrees at ' + state.kt +
      ' knots, relative angle ' + pad3(A.rel) + ' degrees. ') + word + '.');
  }

  /* ---------- entradas ---------- */
  function bump(key, delta) { state[key] = mod(state[key] + delta); render(); }

  function bindStep(btn, key, delta) {
    var t = null, iv = null, ticks = 0;
    function stop() { clearTimeout(t); clearInterval(iv); t = iv = null; ticks = 0; }
    btn.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      bump(key, delta);
      t = setTimeout(function () { iv = setInterval(function () { ticks++; bump(key, ticks > 20 ? delta * 5 : delta); }, 70); }, 380);
      if (btn.setPointerCapture) { try { btn.setPointerCapture(e.pointerId); } catch (err) {} }
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) { btn.addEventListener(ev, stop); });
    btn.addEventListener('click', function (e) { if (e.detail === 0) bump(key, delta); });
    btn.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }

  function bindAngle(input, key) {
    input.addEventListener('focus', function () { input.select(); });
    input.addEventListener('input', function () {
      var s = input.value.replace(/\D/g, '').slice(0, 3);
      if (s !== input.value) input.value = s;
      input.dataset.dirty = '1';
      if (s === '') return;
      var n = parseInt(s, 10);
      if (n <= 360) { state[key] = n % 360; render(); }
    });
    input.addEventListener('blur', function () {
      if (input.dataset.dirty) {
        var n = parseInt(input.value, 10);
        if (!isNaN(n)) state[key] = mod(n);
        delete input.dataset.dirty;
      }
      input.value = pad3(state[key]);
      render();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { input.blur(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        delete input.dataset.dirty;
        bump(key, (e.shiftKey ? 10 : 1) * (e.key === 'ArrowUp' ? 1 : -1));
        input.value = pad3(state[key]);
        input.select();
      }
    });
  }
  bindAngle(hdgOut, 'hdg');
  bindAngle(wdOut, 'wdir');

  bindStep($('#hdgDec'), 'hdg', -1);
  bindStep($('#hdgInc'), 'hdg', 1);
  bindStep($('#wdDec'), 'wdir', -1);
  bindStep($('#wdInc'), 'wdir', 1);
  $('#hdgIn').addEventListener('click', function () { state.hdg = 0; render(); });
  $('#wdIn').addEventListener('click', function () { state.wdir = 0; render(); });
  sel.addEventListener('change', function () { state.kt = parseInt(sel.value, 10) || 0; render(); });
  $('#reset').addEventListener('click', function () { state.hdg = 0; state.wdir = 0; state.kt = 0; render(); });

  /* ---------- seta do vento: arrastar no anel ---------- */
  var svg = $('#dial'), ring = $('#ringHit'), dragging = false;
  function angleAt(e) {
    var r = svg.getBoundingClientRect();
    var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    return mod(Math.round(Math.atan2(dx, -dy) * 180 / Math.PI));
  }
  ring.addEventListener('pointerdown', function (e) {
    dragging = true;
    try { ring.setPointerCapture(e.pointerId); } catch (err) {}
    state.wdir = angleAt(e); render();
    e.preventDefault();
  });
  ring.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    state.wdir = angleAt(e); render();
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) {
    ring.addEventListener(ev, function () { dragging = false; });
  });
  ring.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });

  render();
})();
