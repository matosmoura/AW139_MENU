(function(){
  function make(sel){
    var wrap = document.createElement('div'); wrap.className = 'cs-wrap';
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'cs-btn';
    var list = document.createElement('div'); list.className = 'cs-list';
    sel.parentNode.insertBefore(wrap, sel); wrap.appendChild(sel); wrap.appendChild(btn); wrap.appendChild(list);
    var opts = Array.prototype.slice.call(sel.options), items = [], last = -2, lastCls = '', fs = 12;
    opts.forEach(function(o, k){
      var it = document.createElement('div'); it.className = 'cs-item'; it.textContent = o.textContent;
      it.addEventListener('click', function(ev){
        ev.stopPropagation();
        sel.value = o.value; sel.dispatchEvent(new Event('change', { bubbles: true }));
        list.classList.remove('open'); sync(true);
      });
      list.appendChild(it); items.push(it);
    });
    // reduz a fonte de toda a lista até o maior item caber em uma linha (nunca quebra)
    function fit(){
      var w = btn.clientWidth; if (!w) return;
      var avail = w - 8 - 26, c = document.createElement('canvas').getContext('2d'), f = 12, widest = 0;
      while (f > 7){
        c.font = '600 ' + f + 'px Inter, sans-serif'; widest = 0;
        opts.forEach(function(o){ if (o.value !== '') widest = Math.max(widest, c.measureText(o.textContent).width); });
        if (widest <= avail) break; f -= 0.5;
      }
      fs = f; btn.style.fontSize = f + 'px'; list.style.fontSize = f + 'px';
    }
    function sync(force){
      var idx = sel.selectedIndex, cls = sel.className;
      if (!force && idx === last && cls === lastCls && btn.dataset.fit) return;
      last = idx; lastCls = cls; btn.className = 'cs-btn ' + cls;
      btn.textContent = idx >= 0 ? opts[idx].textContent : '';
      if (btn.clientWidth && !btn.dataset.fit){ fit(); btn.dataset.fit = '1'; }
      items.forEach(function(it, k){ it.classList.toggle('sel', k === idx); });
    }
    btn.addEventListener('click', function(ev){
      ev.stopPropagation();
      var open = !list.classList.contains('open');
      Array.prototype.forEach.call(document.querySelectorAll('.cs-list.open'), function(l){ l.classList.remove('open'); });
      if (open){ fit(); list.classList.add('open'); var s = list.querySelector('.sel'); if (s) list.scrollTop = Math.max(0, s.offsetTop - 80); }
    });
    document.addEventListener('click', function(){ list.classList.remove('open'); });
    sync(true);
    var iv = setInterval(function(){ if (!btn.isConnected){ clearInterval(iv); return; } if (btn.clientWidth && !btn.dataset.fit){ fit(); btn.dataset.fit = '1'; } sync(false); }, 200);
  }
  ['pista', 'ldgPista'].forEach(function(id){ var s = document.getElementById(id); if (s) make(s); });
})();
