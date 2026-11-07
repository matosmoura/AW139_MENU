
  // ================= CAMPO 07: Gráfico de Componentes de Vento (QRH AW139) =================
  (function(){
    var WCC_CHART_LEFT   = 115;
    var WCC_CHART_RIGHT  = 1347;
    var WCC_CHART_BOTTOM = 1317;
    var WCC_CHART_TOP    = 102;
    var WCC_MAXKT         = 60; // alcance real do chart impresso
    var WCC_SCALE_X       = (WCC_CHART_RIGHT - WCC_CHART_LEFT) / WCC_MAXKT;
    var WCC_SCALE_Y       = (WCC_CHART_BOTTOM - WCC_CHART_TOP)  / WCC_MAXKT;

    var wccSpdSel = document.getElementById('wccInpSpd');
    if (wccSpdSel) {
      for (var i = 0; i <= WCC_MAXKT; i++) {
        var opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = i + ' kt';
        wccSpdSel.appendChild(opt);
      }
    }

    // ---- botões < 0 > de incremento/decremento (Proa de Aproximação e Direção do Vento) ----
    function wccWrapDeg(v){ return ((v % 360) + 360) % 360; }
    function wccPad3(n){ return String(Math.round(n)).padStart(3, '0') + '°'; }

    function wccMakeStepper(inputId, minusId, plusId, zeroId){
      var input = document.getElementById(inputId);
      var minusBtn = document.getElementById(minusId);
      var plusBtn = document.getElementById(plusId);
      var zeroBtn = document.getElementById(zeroId);
      if (!input || !minusBtn || !plusBtn || !zeroBtn) return;

      function currentVal(){
        var v = parseFloat(input.value);
        return isNaN(v) ? 0 : v;
      }
      function setVal(v){
        input.value = wccPad3(wccWrapDeg(v));
      }
      function step(delta){
        setVal(currentVal() + delta);
      }
      function startRepeat(delta){
        step(delta);
        var timeoutId, intervalId;
        timeoutId = setTimeout(function(){
          intervalId = setInterval(function(){ step(delta); }, 60);
        }, 400);
        function stop(){
          clearTimeout(timeoutId);
          clearInterval(intervalId);
          window.removeEventListener('mouseup', stop);
          window.removeEventListener('touchend', stop);
          window.removeEventListener('touchcancel', stop);
        }
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchend', stop);
        window.addEventListener('touchcancel', stop);
      }
      minusBtn.addEventListener('mousedown', function(e){ e.preventDefault(); startRepeat(-1); });
      minusBtn.addEventListener('touchstart', function(e){ e.preventDefault(); startRepeat(-1); }, {passive:false});
      plusBtn.addEventListener('mousedown', function(e){ e.preventDefault(); startRepeat(1); });
      plusBtn.addEventListener('touchstart', function(e){ e.preventDefault(); startRepeat(1); }, {passive:false});
      zeroBtn.addEventListener('click', function(){ setVal(0); wccUpdateBtnState(); });
      input.addEventListener('input', wccUpdateBtnState);
      input.addEventListener('blur', function(){
        if (input.value !== '') setVal(currentVal());
        wccUpdateBtnState();
      });
    }

    function wccUpdateBtnState(){
      var hdgEl = document.getElementById('wccInpHdg');
      var dirEl = document.getElementById('wccInpDir');
      var spdEl = document.getElementById('wccInpSpd');
      var anyFilled = !!(hdgEl && hdgEl.value) || !!(dirEl && dirEl.value) || !!(spdEl && spdEl.value && spdEl.value !== '0');
      var calcBtn = document.getElementById('wccCalcBtn');
      var clearBtn = document.getElementById('wccClearBtn');
      if (calcBtn) calcBtn.classList.toggle('flog-clean', !anyFilled);
      if (clearBtn) clearBtn.classList.toggle('flog-clean', !anyFilled);
      if (window.NDL_updateNovoVooState) window.NDL_updateNovoVooState();
    }

    wccMakeStepper('wccInpHdg', 'wccHdgMiniMinus', 'wccHdgMiniPlus', 'wccHdgMiniZero');
    wccMakeStepper('wccInpDir', 'wccDirMiniMinus', 'wccDirMiniPlus', 'wccDirMiniZero');
    var wccSpdSelForState = document.getElementById('wccInpSpd');
    if (wccSpdSelForState) wccSpdSelForState.addEventListener('change', wccUpdateBtnState);
    wccUpdateBtnState();

    function wccToPx(cw, hw) {
      return [ WCC_CHART_LEFT + cw * WCC_SCALE_X, WCC_CHART_BOTTOM - hw * WCC_SCALE_Y ];
    }

    function wccClearOutputs() {
      var svg = document.getElementById('wccSvgOverlay');
      if (svg) svg.innerHTML = '';
      var res = document.getElementById('wccPanelResult');
      if (res) res.classList.remove('active');
      var content = document.getElementById('wccResultContent');
      if (content) content.innerHTML = '<div class="wcc-placeholder">Preencha os campos acima e toque em CALCULAR</div>';
      var warn = document.getElementById('wccWarningBox');
      if (warn) warn.style.display = 'none';
      wccUpdateLimitBanner(null);
    }

    function wccShowError(msg) {
      wccClearOutputs();
      var b = document.getElementById('wccErrorBox');
      b.textContent = '⚠ ' + msg;
      b.style.display = 'block';
    }

    function wccShowWarning(msg) {
      var b = document.getElementById('wccWarningBox');
      b.textContent = '⚠ ' + msg;
      b.style.display = 'block';
    }

    function wccCalculate() {
      var errorBox = document.getElementById('wccErrorBox');
      errorBox.style.display = 'none';
      document.getElementById('wccWarningBox').style.display = 'none';

      var hdg = parseFloat(document.getElementById('wccInpHdg').value);
      var dir = parseFloat(document.getElementById('wccInpDir').value);
      var spd = parseFloat(document.getElementById('wccInpSpd').value);

      if (isNaN(hdg) || hdg < 0 || hdg > 359) { wccShowError('Proa deve ser 0° – 359°.'); return; }
      if (isNaN(dir) || dir < 0 || dir > 360)  { wccShowError('Direção deve ser 0° – 360°.'); return; }
      if (isNaN(spd)) { wccShowError('Selecione a intensidade do vento.'); return; }

      hdg = Math.round(hdg);
      dir = Math.round(dir);

      var rel = dir - hdg;
      while (rel >  180) rel -= 360;
      while (rel < -180) rel += 360;

      var absRel = Math.abs(rel);
      var side   = rel >= 0 ? 'direita' : 'esquerda';
      var cw = spd * Math.sin((absRel * Math.PI) / 180);
      var hw = spd * Math.cos((absRel * Math.PI) / 180);

      var offChartTail = hw < 0;              // vento de cauda: fora do quadrante impresso
      var offChartSpeed = spd > WCC_MAXKT;    // acima da escala do chart

      if (offChartTail) {
        wccClearOutputs();
        wccShowWarning('Vento de cauda (' + (Math.round(Math.abs(hw)*10)/10) + ' kt) — fora do quadrante do chart, que cobre apenas vento de proa. Componente de través pelo cálculo trigonométrico: ' + (Math.round(cw*10)/10) + ' kt pela ' + side + '.');
        wccShowResult(Math.round(cw*10)/10, Math.round(hw*10)/10, side, absRel, true);
        return;
      }

      if (offChartSpeed) {
        wccShowWarning('Intensidade (' + spd + ' kt) acima do limite impresso do chart (' + WCC_MAXKT + ' kt). Números calculados corretamente; desenho não representa esta condição.');
      }

      wccDrawOverlay(cw, hw, spd);
      wccShowResult(Math.round(cw*10)/10, Math.round(hw*10)/10, side, absRel, false);
    }

    function wccDrawOverlay(cw, hw, spd) {
      var svg = document.getElementById('wccSvgOverlay');
      svg.innerHTML = '';
      if (spd === 0) return;

      var cwC = Math.max(0, Math.min(cw, WCC_MAXKT));
      var hwC = Math.max(0, Math.min(hw, WCC_MAXKT));
      var spdC = Math.min(spd, WCC_MAXKT);

      var sol = wccToPx(cwC, hwC);
      var solX = sol[0], solY = sol[1];
      var arcRx = spdC * WCC_SCALE_X;
      var arcRy = spdC * WCC_SCALE_Y;
      var arcStartX = WCC_CHART_LEFT;
      var arcStartY = WCC_CHART_BOTTOM - spdC * WCC_SCALE_Y;

      function el(tag, attrs) {
        var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        svg.appendChild(e);
      }

      el('path', { d:'M ' + arcStartX + ' ' + arcStartY + ' A ' + arcRx + ' ' + arcRy + ' 0 0 1 ' + solX + ' ' + solY,
        fill:'none', stroke:'rgba(0,100,255,0.35)', 'stroke-width':'24' });
      el('path', { d:'M ' + arcStartX + ' ' + arcStartY + ' A ' + arcRx + ' ' + arcRy + ' 0 0 1 ' + solX + ' ' + solY,
        fill:'none', stroke:'#0066ff', 'stroke-width':'6', 'stroke-dasharray':'16 8' });

      el('line', { x1:WCC_CHART_LEFT, y1:WCC_CHART_BOTTOM, x2:solX, y2:solY,
        stroke:'rgba(0,100,255,0.35)', 'stroke-width':'24' });
      el('line', { x1:WCC_CHART_LEFT, y1:WCC_CHART_BOTTOM, x2:solX, y2:solY,
        stroke:'#0066ff', 'stroke-width':'6', 'stroke-dasharray':'16 8' });

      el('line', { x1:solX, y1:solY, x2:solX, y2:WCC_CHART_TOP,
        stroke:'rgba(255,0,0,0.35)', 'stroke-width':'24' });
      el('line', { x1:solX, y1:solY, x2:solX, y2:WCC_CHART_TOP,
        stroke:'#ff0000', 'stroke-width':'6', 'stroke-dasharray':'14 7' });

      el('line', { x1:solX, y1:solY, x2:WCC_CHART_RIGHT, y2:solY,
        stroke:'rgba(0,200,50,0.35)', 'stroke-width':'24' });
      el('line', { x1:solX, y1:solY, x2:WCC_CHART_RIGHT, y2:solY,
        stroke:'#00dd33', 'stroke-width':'6', 'stroke-dasharray':'14 7' });

      el('circle', { cx:solX,            cy:solY,            r:'20', fill:'rgba(0,100,255,0.25)' });
      el('circle', { cx:solX,            cy:solY,            r:'12', fill:'#0066ff',  stroke:'white', 'stroke-width':'3.5' });
      el('circle', { cx:solX,            cy:WCC_CHART_TOP,   r:'11', fill:'#ff0000',  stroke:'white', 'stroke-width':'3' });
      el('circle', { cx:WCC_CHART_RIGHT, cy:solY,            r:'11', fill:'#00dd33',  stroke:'white', 'stroke-width':'3' });
    }

    function wccShowResult(cw, hw, side, absRel, offChart) {
      document.getElementById('wccPanelResult').classList.add('active');
      var hwColor = hw >= 0 ? '#2ecc71' : '#e03a3a';
      var hwLabel = hw >= 0 ? 'VENTO DE PROA' : 'VENTO DE CAUDA';
      var sideTxt = (Math.abs(cw) < 0.05) ? '' : (' — pela ' + side);
      document.getElementById('wccResultContent').innerHTML =
        '<div class="wcc-result-inner">' +
          '<div class="wcc-result-col">' +
            '<div class="wcc-field-label">VENTO DE TRAVÉS</div>' +
            '<div class="wcc-big-num" id="wccOutCross" style="color:#e03a3a">' + cw + '</div>' +
            '<div class="wcc-hint" id="wccOutCrossHint">kt' + sideTxt + '</div>' +
          '</div>' +
          '<div class="wcc-result-col">' +
            '<div class="wcc-field-label" id="wccOutHeadLabel">' + hwLabel + '</div>' +
            '<div class="wcc-mid-num" id="wccOutHead" style="color:' + hwColor + '">' + Math.abs(hw) + ' kt</div>' +
          '</div>' +
          '<div class="wcc-result-col">' +
            '<div class="wcc-field-label">ÂNGULO RELATIVO</div>' +
            '<div class="wcc-mid-num" id="wccOutAngle" style="color:#0099ff">' + Math.round(absRel) + '°</div>' +
          '</div>' +
        '</div>';
      wccUpdateLimitBanner({ cw: cw, hw: hw });
    }

    // ---- tarja de limite de vento de través, alinhada de borda a borda do painel ----
    function wccUpdateLimitBanner(data) {
      var banner = document.getElementById('wccLimitBanner');
      if (!banner) return;

      if (!data) {
        banner.style.display = 'none';
        banner.textContent = '';
        return;
      }

      var absCw = Math.abs(data.cw);
      var hw = data.hw;
      var msg = null;

      var flightType = (window.state && window.state.flightType) ? window.state.flightType : 'medevac';
      var limit = (typeof window.crosswindLimitFor === 'function') ? window.crosswindLimitFor(flightType) : 20;

      if (flightType === 'treinamento') {
        if (absCw > limit) {
          msg = 'POUSO NÃO PERMITIDO!!! LIMITE DE VENTO TRAVÉS É DE ' + limit + ' kt.';
        }
      } else {
        if (absCw > 20) {
          msg = 'POUSO NÃO PERMITIDO!!! LIMITE DE VENTO TRAVÉS É DE 20 kt.';
        } else if (absCw > 10 && hw < 5) {
          msg = 'POUSO NÃO PERMITIDO!!! PARA VENTO DE TRAVÉS ACIMA DE 10 kt, É NECESSÁRIO UMA COMPONENTE DE PROA DE NO MÍNIMO 5 kt.';
        }
      }

      if (!msg) {
        banner.style.display = 'none';
        banner.textContent = '';
        return;
      }

      banner.textContent = msg;
      banner.style.display = 'block';

      var panel = document.getElementById('panel-07');
      if (panel) {
        var cs = window.getComputedStyle(panel);
        var padLeft = parseFloat(cs.paddingLeft) || 0;
        var padRight = parseFloat(cs.paddingRight) || 0;
        banner.style.marginLeft = '-' + padLeft + 'px';
        banner.style.marginRight = '-' + padRight + 'px';
        banner.style.width = 'auto';
      }
    }

    function wccClearAll() {
      var hdgInput = document.getElementById('wccInpHdg');
      if (hdgInput) hdgInput.value = '';
      var dirInput = document.getElementById('wccInpDir');
      if (dirInput) dirInput.value = '';
      var spdSel = document.getElementById('wccInpSpd');
      if (spdSel) spdSel.value = '0';
      var errorBox = document.getElementById('wccErrorBox');
      if (errorBox) errorBox.style.display = 'none';
      wccClearOutputs();
      wccUpdateBtnState();
    }
    window.wccClearAll = wccClearAll;

    var wccBtn = document.getElementById('wccCalcBtn');
    if (wccBtn) wccBtn.addEventListener('click', wccCalculate);
    var wccClearBtnEl = document.getElementById('wccClearBtn');
    if (wccClearBtnEl) wccClearBtnEl.addEventListener('click', wccClearAll);
  })();
