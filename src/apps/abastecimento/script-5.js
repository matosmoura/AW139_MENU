(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  var T = en ? {
    gen: 'GENERATE REQUEST', title: 'FUEL REQUEST', wa: 'WHATSAPP', close: 'CLOSE', copied: 'Report image copied. Open WhatsApp and paste it.', nocopy: 'Could not share automatically. Press and hold the image below to save it.',
    mat: 'REGISTRATION', pil: 'PILOT', base: 'BASE', spot: 'POSITION/SPOT', dt: 'DATE/TIME',
    add: 'FINAL TOTAL', rem: 'REMAINING', tkg: 'TOTAL (kg)', tlb: 'TOTAL (lb)', tl: 'REFUEL (liters)', aut: 'ENDURANCE'
  } : {
    gen: 'GERAR SOLICITAÇÃO', title: 'SOLICITAÇÃO DE ABASTECIMENTO', wa: 'WHATSAPP', close: 'FECHAR', copied: 'Imagem do relatório copiada. Abra o WhatsApp e cole.', nocopy: 'Não foi possível compartilhar automaticamente. Pressione e segure a imagem abaixo para salvar.',
    mat: 'MATRÍCULA', pil: 'PILOTO', base: 'BASE', spot: 'POSIÇÃO/SPOT', dt: 'DATA/HORA',
    add: 'TOTAL FINAL', rem: 'REMANESCENTE', tkg: 'TOTAL (kg)', tlb: 'TOTAL (lb)', tl: 'ABASTECER (litros)', aut: 'AUTONOMIA'
  };
  function isLb(){ return window.__awAbastUnit === 'lb'; }
  var gen = document.getElementById('absGen'), rep = document.getElementById('absReport');
  gen.textContent = T.gen;
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function val(id){ var v = document.getElementById(id).value.trim(); if (id === 'absMat'){ var cm = v.toUpperCase().replace(/[^A-Z0-9]/g, ''); v = cm.length > 2 ? cm.slice(0, 2) + '-' + cm.slice(2) : cm; } return v === '' ? '—' : v; }
  function valU(id){ var v = val(id); return v === '—' ? v : v + ' ' + (isLb() ? 'lb' : 'kg'); }
  function out(id){ return document.getElementById(id).textContent.trim(); }
  function dados(){
    var g1 = [[T.mat, val('absMat')], [T.pil, val('absPil')], [T.base, val('absBase')], [T.spot, val('absSpot')], [T.dt, val('absDt')]];
    var tk = [T.tkg, out('absTkg')], tb = [T.tlb, out('absTlb')];
    var g2 = [[T.rem, valU('absRem')], [T.tl, out('absTl')], [T.add, valU('absAdd')]];
    var g3 = (isLb() ? [tb, tk] : [tk, tb]).concat([[T.aut, out('absAut')]]);
    return window.__awAbastHide === false ? [g1, g2, g3] : [g1, g2];
  }
  function render(){
    var g = dados(), h = '<div class="abs-rep-head"><div class="abs-rep-title">' + esc(T.title) + '</div><button type="button" class="abs-rep-x" id="absClose" aria-label="' + T.close + '"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>';
    g.forEach(function(grp, n){
      h += '<table class="abs-rep-table' + (n === 1 ? ' abs-3d' : '') + '"><tbody>';
      grp.forEach(function(r){ var st = n === 1 ? ' style="color:#c62828"' : ''; h += '<tr><td class="abs-rl"' + st + '>' + esc(r[0]) + '</td><td class="abs-rv"' + st + '>' + esc(r[1]) + '</td></tr>'; });
      h += '</tbody></table>';
    });
    h += '<button type="button" class="abs-btn abs-btn-green" id="absWa">' + T.wa + '</button><div class="abs-msg" id="absWaMsg" style="color:#123a63"></div><div id="absWaImg"></div>';
    rep.innerHTML = h;
    document.getElementById('absClose').addEventListener('click', fecha);
    document.getElementById('absWa').addEventListener('click', function(){
      enviaWhats();
    });
  }
  // imagem do relatório (mesma aparência da grade gerada) para enviar pelo WhatsApp
  function rr(c, x, y, w, h, r){ c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function ajusta(c, t, maxW, size, weight){
    var f = size;
    c.font = weight + ' ' + f + 'px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    while (c.measureText(t).width > maxW && f > 8){ f -= 0.5; c.font = weight + ' ' + f + 'px -apple-system, "Segoe UI", Roboto, Arial, sans-serif'; }
  }
  function geraImagem(cb){
    var g = dados(), S = 3, W = 360, PAD = 14, RH = 34, TH = 34, GAP = 10;
    var rows = 0; g.forEach(function(x){ rows += x.length; });
    var H = PAD + TH + GAP + rows * RH + (g.length - 1) * GAP + 8 + GAP + PAD;
    var cv = document.createElement('canvas'); cv.width = W * S; cv.height = H * S;
    var c = cv.getContext('2d'); c.scale(S, S);
    // fundo (painel)
    var bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#ffffff'); bg.addColorStop(1, '#ece8dc');
    rr(c, 0.5, 0.5, W - 1, H - 1, 14); c.fillStyle = bg; c.fill(); c.strokeStyle = '#c9c3b0'; c.lineWidth = 1; c.stroke();
    // faixa de título
    var bx = PAD, by = PAD, bw = W - 2 * PAD;
    var tg = c.createLinearGradient(0, by, 0, by + TH);
    tg.addColorStop(0, '#3b78b0'); tg.addColorStop(0.45, '#1f4d7c'); tg.addColorStop(0.55, '#123a63'); tg.addColorStop(1, '#0a2743');
    rr(c, bx, by, bw, TH, 8); c.fillStyle = tg; c.fill();
    c.fillStyle = '#ffffff'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '800 13px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    if (c.letterSpacing !== undefined) c.letterSpacing = '1px';
    c.fillText(T.title, W / 2, by + TH / 2 + 1);
    if (c.letterSpacing !== undefined) c.letterSpacing = '0px';
    // grades
    var y = by + TH + GAP, lw = Math.round(bw * 0.46);
    g.forEach(function(grp, n){
      var y0 = y, d3 = n === 1;
      if (d3){
        c.save(); c.shadowColor = 'rgba(0,0,0,0.35)'; c.shadowBlur = 8; c.shadowOffsetY = 6; c.fillStyle = '#7b8490';
        rr(c, bx, y + 4, bw, grp.length * RH, 6); c.fill(); c.restore();
        c.save(); rr(c, bx, y, bw, grp.length * RH, 6); c.clip();
      }
      grp.forEach(function(r, k){
        // célula do rótulo
        if (d3){
          var gl = c.createLinearGradient(0, y, 0, y + RH); gl.addColorStop(0, '#f1f5f9'); gl.addColorStop(1, '#cfd9e4');
          var gv = c.createLinearGradient(0, y, 0, y + RH); gv.addColorStop(0, '#ffffff'); gv.addColorStop(1, '#e4e9ef');
          c.fillStyle = gl; c.fillRect(bx, y, lw, RH); c.fillStyle = gv; c.fillRect(bx + lw, y, bw - lw, RH);
          c.fillStyle = 'rgba(255,255,255,0.9)'; c.fillRect(bx, y + 1, bw, 1);
        } else { c.fillStyle = '#dfe6ee'; c.fillRect(bx, y, lw, RH); }
        c.fillStyle = 'rgba(0,0,0,0)';
        c.strokeStyle = '#8f98a3'; c.lineWidth = 1; c.strokeRect(bx + 0.5, y + 0.5, lw, RH); c.strokeRect(bx + lw + 0.5, y + 0.5, bw - lw - 1, RH);
        c.textAlign = 'left'; c.fillStyle = n === 1 ? '#c62828' : '#123a63'; ajusta(c, r[0], lw - 16, 13, 800); c.fillText(r[0], bx + 8, y + RH / 2 + 0.5);
        c.fillStyle = n === 1 ? '#c62828' : '#0d1b2a'; ajusta(c, r[1], bw - lw - 16, 13, 700); c.fillText(r[1], bx + lw + 8, y + RH / 2 + 0.5);
        y += RH;
      });
      if (d3){ c.restore(); y += 8; }
      if (n < g.length - 1) y += GAP;
    });
    cv.toBlob(function(b){ cb(b, cv); }, 'image/png');
  }
  function setMsg(t){ var m = document.getElementById('absWaMsg'); if (m) m.textContent = t; }
  function mostra(cv){
    var box = document.getElementById('absWaImg'); if (!box) return;
    box.innerHTML = '';
    var im = document.createElement('img'); im.src = cv.toDataURL('image/png'); im.style.cssText = 'width:100%;margin-top:10px;border-radius:10px;';
    box.appendChild(im);
  }
  function enviaWhats(){
    setMsg(''); var box = document.getElementById('absWaImg'); if (box) box.innerHTML = '';
    geraImagem(function(blob, cv){
      if (!blob) { setMsg(T.nocopy); return; }
      var file = null;
      try { file = new File([blob], 'abastecimento.png', { type: 'image/png' }); } catch (e) {}
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
  var aberto = false;
  (window.__awAbastRepCbs = window.__awAbastRepCbs || []).push(function(){ if (aberto) render(); });
  (window.__awAbastCbs = window.__awAbastCbs || []).push(function(){ if (aberto) render(); });
  function fecha(){ rep.style.display = 'none'; aberto = false; }
  gen.addEventListener('click', function(){
    render(); rep.style.display = 'block'; aberto = true;
    try { rep.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
  });
  // com o relatório aberto, mantém os dados atualizados
  ['absMat','absPil','absBase','absSpot','absDt','absAdd','absRem','absClear'].forEach(function(id){
    var el = document.getElementById(id);
    if (!el) return;
    ['input','click'].forEach(function(ev){ el.addEventListener(ev, function(){ if (aberto) setTimeout(render, 0); }); });
  });
})();
