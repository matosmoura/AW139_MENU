(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  var T = en ? {
    gen: 'GENERATE REQUEST', title: 'PAX REQUEST', wa: 'WHATSAPP', close: 'CLOSE', copied: 'Report image copied. Open WhatsApp and paste it.', nocopy: 'Could not share automatically. Press and hold the image below to save it.',
    mat: 'REGISTRATION', pil: 'PILOT', base: 'BASE', spot: 'POSITION/SPOT', dt: 'DATE/TIME', voo: 'CONTRACTOR', dest: 'DESTINATION', err: 'Fill in Contractor and Destination.', fuel: 'FUELING'
  } : {
    gen: 'GERAR SOLICITAÇÃO', title: 'SOLICITAÇÃO DE PAX', wa: 'WHATSAPP', close: 'FECHAR', copied: 'Imagem do relatório copiada. Abra o WhatsApp e cole.', nocopy: 'Não foi possível compartilhar automaticamente. Pressione e segure a imagem abaixo para salvar.',
    mat: 'MATRÍCULA', pil: 'PILOTO', base: 'BASE', spot: 'POSIÇÃO/SPOT', dt: 'DATA/HORA', voo: 'CONTRATANTE', dest: 'DESTINO', err: 'Preencha Contratante e Destino.', fuel: 'ABASTECIMENTO'
  };
  var $ = function(id){ return document.getElementById(id); };
  var vFuel = $('absViewFuel'), vPax = $('absViewPax'), tabs = $('absTabs').querySelectorAll('.abs-tab');
  $('paxVooL').innerHTML = esc(T.voo) + ' <span style="color:#d32f2f">*</span>'; $('paxDestL').innerHTML = esc(T.dest) + ' <span style="color:#d32f2f">*</span>'; $('paxGen').textContent = T.gen;
  tabs[0].textContent = T.fuel;
  function aba(t){
    var pax = t === 'pax';
    vFuel.style.display = pax ? 'none' : ''; vPax.style.display = pax ? '' : 'none';
    Array.prototype.forEach.call(tabs, function(b){ b.classList.toggle('abs-tab-on', b.getAttribute('data-t') === t); });
    var h = window.document.getElementById('appTopRight'); if (h) h.style.display = pax ? 'none' : 'flex'; var ti = window.document.getElementById('appTitle'); if (ti) ti.textContent = pax ? 'PAX' : T.fuel;
  }
  Array.prototype.forEach.call(tabs, function(b){ b.addEventListener('click', function(){ aba(b.getAttribute('data-t')); }); });
  aba('fuel'); [0, 50, 250].forEach(function(ms){ setTimeout(function(){ if (vPax.style.display === 'none') aba('fuel'); }, ms); });

  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function val(id){ var v = $(id).value.trim(); if (id === 'absMat'){ var cm = v.toUpperCase().replace(/[^A-Z0-9]/g, ''); v = cm.length > 2 ? cm.slice(0, 2) + '-' + cm.slice(2) : cm; } return v === '' ? '—' : v; }
  function up(id){ return $(id).value.trim().toUpperCase().replace(/\s+/g, ' '); }
  function texto(){
    var n = up('paxVoo'), d = up('paxDest');
    return (n && d) ? '*SOLICITO EMBARQUE DE PASSAGEIROS DO VOO ' + n + ' COM DESTINO À ' + d + '*' : '';
  }
  function segs(){
    var n = up('paxVoo'), dd = up('paxDest'); if (!(n && dd)) return [];
    return [['*SOLICITO EMBARQUE DE PASSAGEIROS DO VOO ', 0], [n, 1], [' COM DESTINO À ', 0], [dd, 1], ['*', 0]];
  }
  function html(){ return segs().map(function(x){ var e = esc(x[0]); return x[1] ? '<u>' + e + '</u>' : e; }).join(''); }
  function chars(){ var o = []; segs().forEach(function(x){ for (var k = 0; k < x[0].length; k++) o.push([x[0].charAt(k), x[1]]); }); return o; }
  function words(){ var w = [], cur = []; chars().forEach(function(ch){ if (ch[0] === ' '){ if (cur.length) w.push(cur); cur = []; } else cur.push(ch); }); if (cur.length) w.push(cur); return w; }
  function groups(wd){ var g = []; wd.forEach(function(ch){ var l = g[g.length - 1]; if (l && l[1] === ch[1]) l[0] += ch[0]; else g.push([ch[0], ch[1]]); }); return g; }
  function wW(c, wd){ var t = 0; groups(wd).forEach(function(g){ t += c.measureText(g[0]).width; }); return t; }
  function layout(c, maxW){
    var sp = c.measureText(' ').width, lines = [], cur = [], cw = 0;
    words().forEach(function(wd){ var w = wW(c, wd); if (cur.length && cw + sp + w > maxW){ lines.push(cur); cur = []; cw = 0; } cw += (cur.length ? sp : 0) + w; cur.push(wd); });
    if (cur.length) lines.push(cur);
    return lines;
  }
  var box = $('paxTxt'), rep = $('paxReport'), aberto = false;
  function atualiza(){
    var t = texto();
    box.style.display = t ? '' : 'none'; box.innerHTML = html();
    if (t) $('paxErr').textContent = '';
    if (aberto) { if (t) render(); else fecha(); }
  }
  ['paxVoo','paxDest'].forEach(function(id){ ['input','change'].forEach(function(ev){ $(id).addEventListener(ev, atualiza); }); });
  $('paxVoo').options[0].textContent = en ? 'Select' : 'Selecione';
  ['absMat','absPil','absBase','absSpot','absDt','absClear'].forEach(function(id){
    var el = $(id); if (!el) return;
    ['input','click'].forEach(function(ev){ el.addEventListener(ev, function(){ if (aberto) setTimeout(render, 0); }); });
  });
  atualiza();

  function dados(){
    return { g1: [[T.mat, val('absMat')], [T.pil, val('absPil')], [T.base, val('absBase')], [T.spot, val('absSpot')], [T.dt, val('absDt')]], txt: texto() };
  }
  function render(){
    var d = dados(), h = '<div class="abs-rep-head"><div class="abs-rep-title">' + esc(T.title) + '</div><button type="button" class="abs-rep-x" id="paxClose" aria-label="' + T.close + '"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>';
    h += '<table class="abs-rep-table"><tbody>';
    d.g1.forEach(function(r){ h += '<tr><td class="abs-rl">' + esc(r[0]) + '</td><td class="abs-rv">' + esc(r[1]) + '</td></tr>'; });
    h += '</tbody></table><table class="abs-rep-table abs-3d"><tbody><tr><td class="abs-rtxt" style="color:#c62828;font-weight:900;font-size:15px">' + html() + '</td></tr></tbody></table>';
    h += '<button type="button" class="abs-btn abs-btn-green" id="paxWa">' + T.wa + '</button><div class="abs-msg" id="paxWaMsg" style="color:#123a63"></div><div id="paxWaImg"></div>';
    rep.innerHTML = h;
    $('paxClose').addEventListener('click', fecha);
    $('paxWa').addEventListener('click', enviaWhats);
  }
  function rr(c, x, y, w, h, r){ c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  var FF = '-apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  function ajusta(c, t, maxW, size, weight){
    var f = size; c.font = weight + ' ' + f + 'px ' + FF;
    while (c.measureText(t).width > maxW && f > 8){ f -= 0.5; c.font = weight + ' ' + f + 'px ' + FF; }
  }
  function quebra(c, t, maxW){
    var words = t.split(' '), lines = [], cur = '';
    words.forEach(function(w){
      var tt = cur ? cur + ' ' + w : w;
      if (c.measureText(tt).width > maxW && cur){ lines.push(cur); cur = w; } else cur = tt;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function geraImagem(cb){
    var d = dados(), S = 3, W = 360, PAD = 14, RH = 34, TH = 34, GAP = 10, LH = 22;
    var bx = PAD, by = PAD, bw = W - 2 * PAD, lw = Math.round(bw * 0.46);
    var m = document.createElement('canvas').getContext('2d'); m.font = '900 15px ' + FF;
    var lines = layout(m, bw - 20), TBH = lines.length * LH + 18;
    var H = PAD + TH + GAP + d.g1.length * RH + GAP + TBH + 8 + PAD;
    var cv = document.createElement('canvas'); cv.width = W * S; cv.height = H * S;
    var c = cv.getContext('2d'); c.scale(S, S);
    var bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#ffffff'); bg.addColorStop(1, '#ece8dc');
    rr(c, 0.5, 0.5, W - 1, H - 1, 14); c.fillStyle = bg; c.fill(); c.strokeStyle = '#c9c3b0'; c.lineWidth = 1; c.stroke();
    var tg = c.createLinearGradient(0, by, 0, by + TH);
    tg.addColorStop(0, '#3b78b0'); tg.addColorStop(0.45, '#1f4d7c'); tg.addColorStop(0.55, '#123a63'); tg.addColorStop(1, '#0a2743');
    rr(c, bx, by, bw, TH, 8); c.fillStyle = tg; c.fill();
    c.fillStyle = '#ffffff'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '800 13px ' + FF;
    if (c.letterSpacing !== undefined) c.letterSpacing = '1px';
    c.fillText(T.title, W / 2, by + TH / 2 + 1);
    if (c.letterSpacing !== undefined) c.letterSpacing = '0px';
    var y = by + TH + GAP;
    d.g1.forEach(function(r){
      c.fillStyle = '#dfe6ee'; c.fillRect(bx, y, lw, RH);
      c.strokeStyle = '#8f98a3'; c.lineWidth = 1; c.strokeRect(bx + 0.5, y + 0.5, lw, RH); c.strokeRect(bx + lw + 0.5, y + 0.5, bw - lw - 1, RH);
      c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillStyle = '#123a63'; ajusta(c, r[0], lw - 16, 13, 800); c.fillText(r[0], bx + 8, y + RH / 2 + 0.5);
      c.fillStyle = '#0d1b2a'; ajusta(c, r[1], bw - lw - 16, 13, 700); c.fillText(r[1], bx + lw + 8, y + RH / 2 + 0.5);
      y += RH;
    });
    y += GAP;
    c.save(); c.shadowColor = 'rgba(0,0,0,0.35)'; c.shadowBlur = 8; c.shadowOffsetY = 6; c.fillStyle = '#7b8490';
    rr(c, bx, y + 4, bw, TBH, 6); c.fill(); c.restore();
    c.save(); rr(c, bx, y, bw, TBH, 6); c.clip();
    var gv = c.createLinearGradient(0, y, 0, y + TBH); gv.addColorStop(0, '#ffffff'); gv.addColorStop(1, '#e4e9ef');
    c.fillStyle = gv; c.fillRect(bx, y, bw, TBH);
    c.fillStyle = 'rgba(255,255,255,0.9)'; c.fillRect(bx, y + 1, bw, 1);
    c.restore();
    c.strokeStyle = '#8f98a3'; c.lineWidth = 1; rr(c, bx + 0.5, y + 0.5, bw - 1, TBH - 1, 6); c.stroke();
    c.font = '900 15px ' + FF; c.fillStyle = '#c62828'; c.textAlign = 'left'; c.textBaseline = 'middle';
    var spw = c.measureText(' ').width;
    lines.forEach(function(l, k){
      var x = bx + 10, cy = y + 9 + LH * k + LH / 2;
      l.forEach(function(wd, n){
        if (n > 0){ var pw = l[n - 1]; if (pw[pw.length - 1][1] && wd[0][1]) c.fillRect(x, cy + 8, spw, 1); x += spw; }
        groups(wd).forEach(function(g){ var gw = c.measureText(g[0]).width; c.fillText(g[0], x, cy); if (g[1]) c.fillRect(x, cy + 8, gw, 1); x += gw; });
      });
    });
    cv.toBlob(function(b){ cb(b, cv); }, 'image/png');
  }
  function setMsg(t){ var m = $('paxWaMsg'); if (m) m.textContent = t; }
  function mostra(cv){
    var b = $('paxWaImg'); if (!b) return; b.innerHTML = '';
    var im = document.createElement('img'); im.src = cv.toDataURL('image/png'); im.style.cssText = 'width:100%;margin-top:10px;border-radius:10px;'; b.appendChild(im);
  }
  function enviaWhats(){
    setMsg(''); var b = $('paxWaImg'); if (b) b.innerHTML = '';
    geraImagem(function(blob, cv){
      if (!blob) { setMsg(T.nocopy); return; }
      var file = null;
      try { file = new File([blob], 'pax.png', { type: 'image/png' }); } catch (e) {}
      function plano(){
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(function(){ setMsg(T.copied); }, function(){ setMsg(T.nocopy); mostra(cv); });
            return;
          }
        } catch (e) {}
        setMsg(T.nocopy); mostra(cv);
      }
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file] }).catch(function(err){ if (!err || err.name !== 'AbortError') plano(); });
      } else { plano(); }
    });
  }
  function fecha(){ rep.style.display = 'none'; aberto = false; }
  $('paxGen').addEventListener('click', function(){
    if (!texto()){ $('paxErr').textContent = T.err; return; }
    $('paxErr').textContent = '';
    render(); rep.style.display = 'block'; aberto = true;
    try { rep.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
  });
})();
