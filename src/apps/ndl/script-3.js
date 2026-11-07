
// ===================== Bússola de Setores (campo 05: proa da UM + vento) =====================
// Script independente (escopo global próprio) para evitar qualquer conflito de nomes com o
// script principal do app. A integração acontece só pelas pontes window.NDL_setShipHdg /
// window.NDL_setWindDirTrue / window.NDL_setWindSpd, chamadas sempre que o usuário interage.
(function(){
  const svgNS = "http://www.w3.org/2000/svg";
  const cx = 200, cy = 200;
  // marca que o usuário realmente interagiu (arrastou/tocou/clicou) com a
  // proa ou o vento — usado pelo app principal para só calcular Pouso/Assento
  // depois da 1ª seleção manual, nunca no estado inicial "de fábrica".
  function markUserTouched(){
    // (funcionalidade de "exigir toque antes de calcular" foi removida — Pouso/Assento
    // agora segue sempre a proa/vento atuais, inclusive na abertura do app)
  }
  const shipGroup = document.getElementById('sopShipGroup');
  const ticksG = document.getElementById('sopTicks');
  const cardinalsG = document.getElementById('sopCardinals');
  const proaValueEl = document.getElementById('sopProaValue');
  const proaCompassEl = document.getElementById('sopProaCompass');
  const windValueEl = document.getElementById('sopWindValue');
  const windSectorEl = document.getElementById('sopWindSector');
  const windIntensityEl = document.getElementById('sopWindIntensity');
  const windArrowGroup = document.getElementById('sopWindArrowGroup');
  const svgRoot = document.getElementById('sopSvgRoot');

  if (!shipGroup || !svgRoot) return; // painel não presente nesta página

  for(let i=0;i<=100;i++){
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i + ' kt';
    windIntensityEl.appendChild(opt);
  }
  windIntensityEl.value = 0;

  let windArrowAngle = 0; // 0 = alinhado com o vento verdadeiro padrão do app (000°)

  let rotation = 0;
  let selectedSector = null;

  function polarPt(angleDeg, radius, ox=cx, oy=cy){
    const rad = angleDeg * Math.PI/180;
    return { x: ox + radius*Math.sin(rad), y: oy - radius*Math.cos(rad) };
  }

  function compassLetter(deg){
    const dirs = ["N","NE","E","SE","S","SW","W","NW"];
    return dirs[Math.round(((deg%360)+360)%360/45)%8];
  }
  function pad3(n){ return String(Math.round(((n%360)+360)%360)).padStart(3,'0'); }

  // ---- fixed compass ring: ticks + cardinal letters ----
  for(let a=0;a<360;a+=15){
    const major = a % 90 === 0;
    const semi = a % 45 === 0;
    const r1 = 188;
    const r2 = major ? 168 : (semi ? 174 : 179);
    const p1 = polarPt(a, r1), p2 = polarPt(a, r2);
    const line = document.createElementNS(svgNS,'line');
    line.setAttribute('x1',p1.x); line.setAttribute('y1',p1.y);
    line.setAttribute('x2',p2.x); line.setAttribute('y2',p2.y);
    line.setAttribute('stroke', major ? '#c9a35c' : '#3a4a5c');
    line.setAttribute('stroke-width', major ? 2.4 : 1.3);
    ticksG.appendChild(line);
  }
  const cardinalNames = {0:'N',45:'NE',90:'E',135:'SE',180:'S',225:'SW',270:'W',315:'NW'};
  Object.entries(cardinalNames).forEach(([a,name])=>{
    const p = polarPt(Number(a), 152);
    const t = document.createElementNS(svgNS,'text');
    t.setAttribute('x',p.x); t.setAttribute('y',p.y+4);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('font-size', name.length>1 ? 11 : 14);
    t.setAttribute('font-weight','700');
    t.setAttribute('fill', name==='N' ? '#e0a83e' : '#9fb2c4');
    t.textContent = name;
    cardinalsG.appendChild(t);
  });

  // ---- ship hull (rotates) ----
  const hull = document.createElementNS(svgNS,'path');
  hull.setAttribute('d','M200,60 L234,138 L242,296 Q242,328 200,340 Q158,328 158,296 L166,138 Z');
  hull.setAttribute('fill','#b6864f');
  hull.setAttribute('stroke','#7a2a1f');
  hull.setAttribute('stroke-width','5');
  hull.setAttribute('class','ship-drag');
  shipGroup.appendChild(hull);

  const deckInner = document.createElementNS(svgNS,'path');
  deckInner.setAttribute('d','M200,72 L226,140 L233,292 Q233,318 200,328 Q167,318 167,292 L174,140 Z');
  deckInner.setAttribute('fill','#c9a06a');
  deckInner.setAttribute('stroke','none');
  deckInner.setAttribute('class','ship-drag');
  shipGroup.appendChild(deckInner);

  const greenHatch = document.createElementNS(svgNS,'rect');
  greenHatch.setAttribute('x',178); greenHatch.setAttribute('y',96);
  greenHatch.setAttribute('width',44); greenHatch.setAttribute('height',36);
  greenHatch.setAttribute('rx',3);
  greenHatch.setAttribute('fill','#4f7a3a');
  greenHatch.setAttribute('stroke','#33501f');
  greenHatch.setAttribute('stroke-width','1.5');
  greenHatch.setAttribute('class','ship-drag');
  shipGroup.appendChild(greenHatch);

  const whiteFwd = document.createElementNS(svgNS,'rect');
  whiteFwd.setAttribute('x',172); whiteFwd.setAttribute('y',150);
  whiteFwd.setAttribute('width',56); whiteFwd.setAttribute('height',30);
  whiteFwd.setAttribute('rx',5);
  whiteFwd.setAttribute('fill','#ece6d6');
  whiteFwd.setAttribute('stroke','#9a9382');
  whiteFwd.setAttribute('stroke-width','1.5');
  whiteFwd.setAttribute('class','ship-drag');
  shipGroup.appendChild(whiteFwd);

  const craneBase = document.createElementNS(svgNS,'circle');
  craneBase.setAttribute('cx',200); craneBase.setAttribute('cy',204);
  craneBase.setAttribute('r',9);
  craneBase.setAttribute('fill','#1c1c1c');
  craneBase.setAttribute('class','ship-drag');
  shipGroup.appendChild(craneBase);
  const craneBoom = document.createElementNS(svgNS,'line');
  craneBoom.setAttribute('x1',200); craneBoom.setAttribute('y1',204);
  craneBoom.setAttribute('x2',224); craneBoom.setAttribute('y2',186);
  craneBoom.setAttribute('stroke','#1c1c1c');
  craneBoom.setAttribute('stroke-width','5');
  craneBoom.setAttribute('stroke-linecap','round');
  craneBoom.setAttribute('class','ship-drag');
  shipGroup.appendChild(craneBoom);

  const cargoColors = ['#c0392b','#2f6fa8','#d9a72c'];
  cargoColors.forEach((color,i)=>{
    const box = document.createElementNS(svgNS,'rect');
    box.setAttribute('x', 176 + i*22);
    box.setAttribute('y', 224);
    box.setAttribute('width', 18);
    box.setAttribute('height', 30);
    box.setAttribute('rx', 2);
    box.setAttribute('fill', color);
    box.setAttribute('stroke', '#00000033');
    box.setAttribute('stroke-width', '1');
    box.setAttribute('class','ship-drag');
    shipGroup.appendChild(box);
  });

  const whiteAft = document.createElementNS(svgNS,'rect');
  whiteAft.setAttribute('x',174); whiteAft.setAttribute('y',266);
  whiteAft.setAttribute('width',52); whiteAft.setAttribute('height',44);
  whiteAft.setAttribute('rx',5);
  whiteAft.setAttribute('fill','#ece6d6');
  whiteAft.setAttribute('stroke','#9a9382');
  whiteAft.setAttribute('stroke-width','1.5');
  whiteAft.setAttribute('class','ship-drag');
  shipGroup.appendChild(whiteAft);

  // ---- sectors ----
  const sectors = [
    {name:'Proa', angle:0},
    {name:'Bochecha (Boreste)', angle:45},
    {name:'Través (Boreste)', angle:90},
    {name:'Alheta (Boreste)', angle:135},
    {name:'Popa', angle:180},
    {name:'Alheta (Bombordo)', angle:225},
    {name:'Través (Bombordo)', angle:270},
    {name:'Bochecha (Bombordo)', angle:315},
  ];

  const labelEls = [];
  sectors.forEach(sec=>{
    const end = polarPt(sec.angle, 168);
    const labelPos = polarPt(sec.angle, 192);

    const hit = document.createElementNS(svgNS,'line');
    hit.setAttribute('x1',cx); hit.setAttribute('y1',cy);
    hit.setAttribute('x2',end.x); hit.setAttribute('y2',end.y);
    hit.setAttribute('class','sector-hit');

    const line = document.createElementNS(svgNS,'line');
    line.setAttribute('x1',cx); line.setAttribute('y1',cy);
    line.setAttribute('x2',end.x); line.setAttribute('y2',end.y);
    line.setAttribute('class','sector-line');
    line.dataset.angle = sec.angle;
    line.dataset.name = sec.name;

    const dot = document.createElementNS(svgNS,'circle');
    dot.setAttribute('cx',end.x); dot.setAttribute('cy',end.y);
    dot.setAttribute('r',3.2);
    dot.setAttribute('class','sector-dot');

    const label = document.createElementNS(svgNS,'text');
    label.setAttribute('x',labelPos.x); label.setAttribute('y',labelPos.y);
    label.setAttribute('class','sector-label');
    const words = sec.name.split(' (');
    label.textContent = words[0];
    if(words[1]){
      const tspan = document.createElementNS(svgNS,'tspan');
      tspan.setAttribute('x',labelPos.x);
      tspan.setAttribute('dy','11');
      tspan.textContent = '('+words[1];
      label.appendChild(tspan);
    }
    labelEls.push({el:label, x:labelPos.x, y:labelPos.y});

    function activate(){
      markUserTouched();
      document.querySelectorAll('.sopdial .sector-line').forEach(l=>l.classList.remove('active'));
      line.classList.add('active');
      selectedSector = sec;
      updateWindLabel();
    }
    hit.addEventListener('click', activate);
    line.addEventListener('click', activate);

    shipGroup.appendChild(hit);
    shipGroup.appendChild(line);
    shipGroup.appendChild(dot);
    shipGroup.appendChild(label);
  });

  // ---- seta de vento ----
  const arrowTailR = 226, arrowHeadBaseR = 200, arrowTipR = 182;
  const aTail = polarPt(0, arrowTailR);
  const aBase = polarPt(0, arrowHeadBaseR);
  const aTip = polarPt(0, arrowTipR);
  const aLeft = { x: aBase.x - 13, y: aBase.y };
  const aRight = { x: aBase.x + 13, y: aBase.y };

  const arrowHit = document.createElementNS(svgNS,'line');
  arrowHit.setAttribute('x1',aTail.x); arrowHit.setAttribute('y1',aTail.y);
  arrowHit.setAttribute('x2',aTip.x); arrowHit.setAttribute('y2',aTip.y);
  arrowHit.setAttribute('class','wind-arrow-hit');
  windArrowGroup.appendChild(arrowHit);

  const arrowShaft = document.createElementNS(svgNS,'line');
  arrowShaft.setAttribute('x1',aTail.x); arrowShaft.setAttribute('y1',aTail.y);
  arrowShaft.setAttribute('x2',aBase.x); arrowShaft.setAttribute('y2',aBase.y);
  arrowShaft.setAttribute('class','wind-arrow-shaft');
  windArrowGroup.appendChild(arrowShaft);

  const arrowHead = document.createElementNS(svgNS,'polygon');
  arrowHead.setAttribute('points', `${aTip.x},${aTip.y} ${aLeft.x},${aLeft.y} ${aRight.x},${aRight.y}`);
  arrowHead.setAttribute('class','wind-arrow-head');
  windArrowGroup.appendChild(arrowHead);

  // label "VENTO" desenhada sobre a haste da seta, girando junto com ela
  const shaftMid = polarPt(0, (arrowTailR + arrowHeadBaseR) / 2);
  const arrowLabel = document.createElementNS(svgNS,'text');
  arrowLabel.setAttribute('x', shaftMid.x);
  arrowLabel.setAttribute('y', shaftMid.y);
  arrowLabel.setAttribute('text-anchor','middle');
  arrowLabel.setAttribute('dominant-baseline','middle');
  arrowLabel.setAttribute('transform', `rotate(90 ${shaftMid.x} ${shaftMid.y})`);
  arrowLabel.setAttribute('class','wind-arrow-label');
  arrowLabel.textContent = 'VENTO';
  windArrowGroup.appendChild(arrowLabel);

  function updateWindArrowTransform(){
    windArrowGroup.setAttribute('transform', `rotate(${windArrowAngle} ${cx} ${cy})`);
  }
  updateWindArrowTransform();

  function setWindFromArrow(){
    selectedSector = null;
    document.querySelectorAll('.sopdial .sector-line').forEach(l=>l.classList.remove('active'));
    const bearing = ((windArrowAngle % 360)+360)%360;
    windValueEl.value = pad3(bearing)+'° '+compassLetter(bearing);
    windSectorEl.textContent = 'definido pela seta';
    if (window.NDL_setWindDirTrue) window.NDL_setWindDirTrue(bearing);
  }

  const VBOX = 460, ARROW_CENTER = 230;
  function arrowAngleFromEvent(evt){
    const rect = svgRoot.getBoundingClientRect();
    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
    const x = ((clientX - rect.left)/rect.width)*VBOX;
    const y = ((clientY - rect.top)/rect.height)*VBOX;
    const dx = x - ARROW_CENTER, dy = y - ARROW_CENTER;
    return (Math.atan2(dx, -dy) * 180/Math.PI + 360) % 360;
  }

  let arrowDragging = false;
  function arrowStartDrag(evt){
    markUserTouched();
    arrowDragging = true;
    windArrowGroup.classList.add('dragging');
    arrowMoveDrag(evt);
    evt.preventDefault();
  }
  function arrowMoveDrag(evt){
    if(!arrowDragging) return;
    windArrowAngle = arrowAngleFromEvent(evt);
    updateWindArrowTransform();
    setWindFromArrow();
    evt.preventDefault();
  }
  function arrowEndDrag(){
    arrowDragging = false;
    windArrowGroup.classList.remove('dragging');
  }
  arrowHit.addEventListener('mousedown', arrowStartDrag);
  window.addEventListener('mousemove', arrowMoveDrag);
  window.addEventListener('mouseup', arrowEndDrag);
  arrowHit.addEventListener('touchstart', arrowStartDrag, {passive:false});
  window.addEventListener('touchmove', arrowMoveDrag, {passive:false});
  window.addEventListener('touchend', arrowEndDrag);

  function updateWindLabel(){
    if(!selectedSector) return;
    const bearing = ((selectedSector.angle + rotation) % 360 + 360) % 360;
    windValueEl.value = pad3(bearing)+'° '+compassLetter(bearing);
    windSectorEl.textContent = selectedSector.name;
    if (window.NDL_setWindDirTrue) window.NDL_setWindDirTrue(bearing);
  }

  // ---- girar a proa arrastando a UM ----
  let shipDragging = false;
  function shipStartDrag(evt){
    markUserTouched();
    shipDragging = true;
    shipMoveDrag(evt);
    evt.preventDefault();
    evt.stopPropagation();
  }
  function shipMoveDrag(evt){
    if(!shipDragging) return;
    rotation = arrowAngleFromEvent(evt);
    update();
    evt.preventDefault();
  }
  function shipEndDrag(){ shipDragging = false; }

  document.querySelectorAll('.sopdial .ship-drag').forEach(el=>{
    el.addEventListener('mousedown', shipStartDrag);
    el.addEventListener('touchstart', shipStartDrag, {passive:false});
  });
  window.addEventListener('mousemove', shipMoveDrag);
  window.addEventListener('mouseup', shipEndDrag);
  window.addEventListener('touchmove', shipMoveDrag, {passive:false});
  window.addEventListener('touchend', shipEndDrag);

  function update(){
    shipGroup.setAttribute('transform', `rotate(${rotation} ${cx} ${cy})`);
    labelEls.forEach(l=>{
      l.el.setAttribute('transform', `rotate(${-rotation} ${l.x} ${l.y})`);
    });
    const b = ((rotation % 360)+360)%360;
    const displayB = b === 0 ? 360 : b;
    proaValueEl.value = pad3(displayB)+'°';
    proaCompassEl.textContent = compassLetter(b) === 'N' ? 'Norte' : compassLetter(b);
    updateWindLabel();
    if (window.NDL_setShipHdg) window.NDL_setShipHdg(b);
  }
  update();
  setWindFromArrow(); // sincroniza o vento inicial (000°) com o app

  // ---- digitação direta nos campos Proa da UM e Direção do vento ----
  function parseDeg(txt){
    const m = String(txt).replace(',', '.').match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }
  function commitProa(){
    const v = parseDeg(proaValueEl.value);
    if (isNaN(v)) { update(); return; }
    markUserTouched();
    rotation = ((v % 360) + 360) % 360;
    update();
  }
  function commitWind(){
    const v = parseDeg(windValueEl.value);
    if (isNaN(v)) { setWindFromArrow(); return; }
    markUserTouched();
    windArrowAngle = ((v % 360) + 360) % 360;
    updateWindArrowTransform();
    setWindFromArrow();
  }
  [[proaValueEl, commitProa], [windValueEl, commitWind]].forEach(function(par){
    const el = par[0], commit = par[1];
    el.addEventListener('focus', function(){ setTimeout(function(){ try { el.select(); } catch(e){} }, 0); });
    el.addEventListener('change', commit);
    el.addEventListener('keydown', function(e){ if (e.key === 'Enter') { e.preventDefault(); el.blur(); } });
  });

  windIntensityEl.addEventListener('change', function(){
    const spd = parseInt(windIntensityEl.value, 10) || 0;
    if (window.NDL_setWindSpd) window.NDL_setWindSpd(spd);
  });

  // exposto para o botão "Novo Voo" (script principal) zerar a proa e o vento
  // visualmente aqui também, já que este widget mantém seu próprio estado.
  window.NDL_resetCompassWidget = function(){
    rotation = 0;
    windArrowAngle = 0;
    selectedSector = null;
    windIntensityEl.value = 0;
    document.querySelectorAll('.sopdial .sector-line').forEach(function(l){ l.classList.remove('active'); });
    updateWindArrowTransform();
    update();
    setWindFromArrow();
  };

  function startRepeat(step){
    markUserTouched();
    rotation += step; update();
    let delay = 400;
    let timeoutId, intervalId;
    timeoutId = setTimeout(()=>{
      intervalId = setInterval(()=>{ rotation += step; update(); }, 60);
    }, delay);
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

  // ---- mini-botões (canto superior direito da label "Proa da UM") ----
  const miniMinus = document.getElementById('sopMiniMinus');
  const miniPlus = document.getElementById('sopMiniPlus');
  const miniZero = document.getElementById('sopMiniZero');
  miniMinus.addEventListener('mousedown', (e)=>{ e.preventDefault(); startRepeat(-1); });
  miniMinus.addEventListener('touchstart', (e)=>{ e.preventDefault(); startRepeat(-1); }, {passive:false});
  miniPlus.addEventListener('mousedown', (e)=>{ e.preventDefault(); startRepeat(1); });
  miniPlus.addEventListener('touchstart', (e)=>{ e.preventDefault(); startRepeat(1); }, {passive:false});
  miniZero.addEventListener('click', ()=>{ markUserTouched(); rotation = 0; update(); });

  // ---- mini-botões (canto superior direito da label "Direção do vento") ----
  function setWindArrowAngleDeg(deg){
    windArrowAngle = ((deg % 360) + 360) % 360;
    updateWindArrowTransform();
    setWindFromArrow();
  }
  function startRepeatWind(step){
    markUserTouched();
    setWindArrowAngleDeg(windArrowAngle + step);
    let delay = 400;
    let timeoutId, intervalId;
    timeoutId = setTimeout(()=>{
      intervalId = setInterval(()=>{ setWindArrowAngleDeg(windArrowAngle + step); }, 60);
    }, delay);
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
  const windMiniMinus = document.getElementById('sopWindMiniMinus');
  const windMiniPlus = document.getElementById('sopWindMiniPlus');
  const windMiniZero = document.getElementById('sopWindMiniZero');
  windMiniMinus.addEventListener('mousedown', (e)=>{ e.preventDefault(); startRepeatWind(-1); });
  windMiniMinus.addEventListener('touchstart', (e)=>{ e.preventDefault(); startRepeatWind(-1); }, {passive:false});
  windMiniPlus.addEventListener('mousedown', (e)=>{ e.preventDefault(); startRepeatWind(1); });
  windMiniPlus.addEventListener('touchstart', (e)=>{ e.preventDefault(); startRepeatWind(1); }, {passive:false});
  windMiniZero.addEventListener('click', ()=>{ markUserTouched(); setWindArrowAngleDeg(0); });
})();
