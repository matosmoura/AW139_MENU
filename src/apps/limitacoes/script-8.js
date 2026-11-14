// LIMITAÇÕES: zoom com dois dedos (pinça) nas figuras (TCAS II, EGPWS e janelas
// TAIL TOO LOW / BANK ANGLE). Mesmo comportamento das figuras do NDL: pinça amplia
// até 5x; com a figura ampliada, um dedo arrasta; toque duplo amplia 2,5x / volta.
(function () {
  function makeZoomable(box, img){
    var MAX = 5, s = 1, x = 0, y = 0;
    var pinch = null, pan = null, lastTap = 0, lastTouch = 0;

    function size(){ var r = box.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, t: r.top }; }
    function clamp(){
      var b = size();
      s = Math.min(MAX, Math.max(1, s));
      x = Math.min(0, Math.max(b.w - b.w * s, x));
      y = Math.min(0, Math.max(b.h - b.h * s, y));
    }
    function apply(){
      clamp();
      if (s <= 1.001){ s = 1; x = 0; y = 0; }
      img.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
      box.classList.toggle('zoomed', s > 1);
    }
    function pt(t){ var b = size(); return { x: t.clientX - b.l, y: t.clientY - b.t }; }
    function dist(a, b){ return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); }
    function mid(a, b){ var b0 = size(); return { x: (a.clientX + b.clientX) / 2 - b0.l, y: (a.clientY + b.clientY) / 2 - b0.t }; }
    // amplia/reduz mantendo fixo o ponto p (coordenadas da janela)
    function zoomAt(p, ns){ var cx = (p.x - x) / s, cy = (p.y - y) / s; s = Math.min(MAX, Math.max(1, ns)); x = p.x - cx * s; y = p.y - cy * s; apply(); }

    // gesto atual: "tap" fica válido só se for 1 dedo, rápido e sem movimento
    var g = null;

    box.addEventListener('touchstart', function(e){
      lastTouch = Date.now();
      if (e.touches.length === 1){
        var p = pt(e.touches[0]);
        g = { t: Date.now(), p: p, tap: true };
        pan = s > 1 ? { p: p, x: x, y: y } : null;
      } else {
        if (g) g.tap = false;
        if (e.touches.length === 2){
          var m = mid(e.touches[0], e.touches[1]);
          pinch = { d: dist(e.touches[0], e.touches[1]), s: s, cx: (m.x - x) / s, cy: (m.y - y) / s };
          pan = null; e.preventDefault();
        }
      }
    }, { passive: false });

    box.addEventListener('touchmove', function(e){
      if (g && g.tap && e.touches.length === 1){
        var q = pt(e.touches[0]);
        if (Math.hypot(q.x - g.p.x, q.y - g.p.y) > 10) g.tap = false;
      }
      if (pinch && e.touches.length === 2){
        var m = mid(e.touches[0], e.touches[1]);
        s = Math.min(MAX, Math.max(1, pinch.s * dist(e.touches[0], e.touches[1]) / pinch.d));
        x = m.x - pinch.cx * s; y = m.y - pinch.cy * s;
        apply(); e.preventDefault();
      } else if (pan && e.touches.length === 1 && s > 1){
        var p = pt(e.touches[0]);
        x = pan.x + (p.x - pan.p.x); y = pan.y + (p.y - pan.p.y);
        apply(); e.preventDefault();
      }
    }, { passive: false });

    box.addEventListener('touchend', function(e){
      lastTouch = Date.now();
      if (e.touches.length < 2) pinch = null;
      if (e.touches.length === 1 && s > 1){ var p = pt(e.touches[0]); pan = { p: p, x: x, y: y }; }
      if (e.touches.length === 0){
        pan = null;
        if (g && g.tap && Date.now() - g.t < 300){
          if (lastTap && g.t - lastTap.t < 350 && Math.hypot(g.p.x - lastTap.p.x, g.p.y - lastTap.p.y) < 40){
            zoomAt(g.p, s > 1 ? 1 : 2.5); lastTap = 0; e.preventDefault();
          } else lastTap = { t: Date.now(), p: g.p };
        } else lastTap = 0;
        g = null;
      }
    }, { passive: false });

    // computador: Ctrl + roda do mouse (ou pinça no trackpad) e duplo clique
    box.addEventListener('wheel', function(e){
      if (!e.ctrlKey) return;
      e.preventDefault();
      zoomAt({ x: e.clientX - size().l, y: e.clientY - size().t }, s * Math.exp(-e.deltaY / 200));
    }, { passive: false });
    box.addEventListener('dblclick', function(e){
      if (Date.now() - lastTouch < 1000) return; // toque já tratado acima
      zoomAt({ x: e.clientX - size().l, y: e.clientY - size().t }, s > 1 ? 1 : 2.5);
    });
  }

  document.querySelectorAll('.lim-fig3d img, .lim-modal-box img').forEach(function (img) {
    var box = document.createElement('div');
    box.className = 'zoom-box';
    img.parentNode.insertBefore(box, img);
    box.appendChild(img);
    makeZoomable(box, img);
  });
})();
