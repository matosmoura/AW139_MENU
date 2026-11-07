(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  function isLb(){ return window.__awAbastUnit === 'lb'; }
  var K = 2.20462262, DENS = 0.83, FLOW = 400;   // kg/L (QAV) e consumo em kg/h
  var TXT = en ? {
    sup: 'Fuel quantity', add: 'REFUEL', rem: 'REMAINING',
    tot: 'TOTAL', tl: 'TOTAL (liters)', aut: 'ENDURANCE',
    neg: 'REMAINING is greater than REFUEL: nothing to add.',
    hide: 'HIDE TOTALS GRID IN REPORT'
  } : {
    sup: 'Quantidade de combustível', add: 'ABASTECER', rem: 'REMANESCENTE',
    tot: 'TOTAL', tl: 'TOTAL (litros)', aut: 'AUTONOMIA',
    neg: 'REMANESCENTE maior que ABASTECER: nada a abastecer.',
    hide: 'OCULTAR GRADE DE TOTAIS NO RELATÓRIO'
  };
  function note(){
    var lb = isLb();
    return en ? 'TOTAL = REFUEL − REMAINING. Liters use QAV density 0.83 kg/L. Endurance = REFUEL ÷ 400 kg/h (' + Math.round(FLOW * K) + ' lb/h).'
              : 'TOTAL = ABASTECER − REMANESCENTE. Litros com densidade do QAV 0,83 kg/L. Autonomia = ABASTECER ÷ 400 kg/h' + (lb ? ' (' + Math.round(FLOW * K) + ' lb/h)' : '') + '.';
  }
  var root = document.getElementById('absFuelPanel');
  var eAdd, eRem, oKg, oLb, oL, oAut, msg;
  function build(){
    var u = isLb() ? 'lb' : 'kg';
    var vA = eAdd ? eAdd.value : '', vR = eRem ? eRem.value : '';
    var KG = '<div class="abs-field"><label>TOTAL (kg)</label><div class="abs-out" id="absTkg">—</div></div>';
    var LB = '<div class="abs-field"><label>TOTAL (lb)</label><div class="abs-out" id="absTlb">—</div></div>';
    root.innerHTML =
      '<div class="abs-fields">' +
        '<div class="abs-field"><label for="absAdd">' + TXT.add + ' (' + u + ')</label><div class="abs-inwrap"><input type="text" inputmode="decimal" id="absAdd" autocomplete="off"></div></div>' +
        '<div class="abs-field"><label for="absRem">' + TXT.rem + ' (' + u + ')</label><div class="abs-inwrap"><input type="text" inputmode="decimal" id="absRem" autocomplete="off"></div></div>' +
      '</div>' +
      '<div class="abs-sep"></div><div class="abs-sec">' + TXT.tot + '</div>' +
      '<div class="abs-fields">' +
        (isLb() ? LB + KG : KG + LB) +
        '<div class="abs-field"><label>' + TXT.tl + '</label><div class="abs-out" id="absTl">—</div></div>' +
        '<div class="abs-field"><label>' + TXT.aut + '</label><div class="abs-out" id="absAut">—</div></div>' +
      '</div><div class="abs-msg" id="absMsg"></div><div class="abs-note" style="margin:4px 2px 0;font-size:11px;line-height:1.4;color:#4a5a68;">' + note() + '</div>' +
      '<div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:8px;"><span style="font-size:10.5px;font-weight:800;color:#123a63;letter-spacing:0.04em;">' + TXT.hide + '</span>' +
      '<button type="button" id="absRepSw" role="switch" style="position:relative;flex:none;width:52px;height:26px;border-radius:999px;border:1px solid #8f98a3;padding:0;cursor:pointer;font-family:inherit;"><span id="absRepTx" style="position:absolute;top:0;line-height:24px;font-size:10px;font-weight:800;"></span><span id="absRepKn" style="position:absolute;top:2px;width:20px;height:20px;border-radius:50%;background:#ffffff;box-shadow:0 1px 3px rgba(0,0,0,0.45);transition:left .15s;"></span></button></div>';
    eAdd = document.getElementById('absAdd'); eRem = document.getElementById('absRem');
    eAdd.value = vA; eRem.value = vR;
    oKg = document.getElementById('absTkg'); oLb = document.getElementById('absTlb'); oL = document.getElementById('absTl'); oAut = document.getElementById('absAut'); msg = document.getElementById('absMsg');
    eAdd.addEventListener('input', update); eRem.addEventListener('input', update);
    var sw = document.getElementById('absRepSw'), tx = document.getElementById('absRepTx'), kn = document.getElementById('absRepKn');
    function paintSw(){
      var on = window.__awAbastHide !== false;
      sw.setAttribute('aria-checked', on ? 'true' : 'false');
      sw.style.background = on ? 'linear-gradient(180deg,#3b78b0 0%,#1f4d7c 45%,#123a63 55%,#0a2743 100%)' : '#d3d9e0';
      kn.style.left = on ? '28px' : '3px';
      tx.textContent = on ? 'ON' : 'OFF';
      tx.style.left = on ? '7px' : 'auto'; tx.style.right = on ? 'auto' : '6px'; tx.style.color = on ? '#ffffff' : '#5a6672';
    }
    paintSw();
    sw.addEventListener('click', function(){
      window.__awAbastHide = window.__awAbastHide === false;
      paintSw();
      (window.__awAbastRepCbs || []).forEach(function(f){ try { f(); } catch (e) {} });
    });
    update();
  }
  function num(el){ var v = parseFloat(String(el.value).replace(',', '.')); return isNaN(v) ? null : v; }
  function fmt(v){ return String(Math.round(v)); }
  function update(){
    var a = num(eAdd), r = num(eRem);
    msg.textContent = '';
    oKg.textContent = oLb.textContent = oL.textContent = oAut.textContent = '—';
    if (a === null) return;
    var aKg = isLb() ? a / K : a;
    var rKg = r === null ? 0 : (isLb() ? r / K : r);
    // autonomia com o combustível após o abastecimento (valor de ABASTECER)
    var min = Math.round(aKg / FLOW * 60);
    oAut.textContent = Math.floor(min / 60) + ' h ' + (min % 60 < 10 ? '0' : '') + (min % 60) + ' min';
    var t = aKg - rKg;
    if (r !== null && t < 0){ msg.textContent = TXT.neg; t = 0; }
    if (r === null) return;
    oKg.textContent = fmt(t);
    oLb.textContent = fmt(t * K);
    oL.textContent = fmt(t / DENS);
  }
  (window.__awAbastCbs = window.__awAbastCbs || []).push(build);
  build();
})();
