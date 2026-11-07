(function(){
'use strict';

var E = window.WAT_ENGINE;
var STORAGE_KEY = 'watInputsV1';
var INPUT_IDS = ['watAlt','watTemp','watVento'];

var elAlt, elTemp, elVento, elClearBtn, elGridBody, elDetail, elDetailTitle, elDetailBody;

var openCategoryKey = null; // categoria atualmente aberta no acordeão
var globalCfg = 'padrao';   // configuração global (Padrão / EAPS ON / EAPS OFF / IBF) usada em todas as categorias

// ---------- persistência simples (mesma sessão / entre navegações) ----------
function saveInputs(){
  var data = {cfg: globalCfg};
  INPUT_IDS.forEach(function(id){
    var el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e){}
  updateClearBtnState();
}
function loadInputs(){
  var raw;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch(e){ raw = null; }
  if (!raw) return;
  var data;
  try { data = JSON.parse(raw); } catch(e){ return; }
  if (data && typeof data.cfg === 'string' && E.CFG_LABELS[data.cfg]) globalCfg = data.cfg;
  INPUT_IDS.forEach(function(id){
    var el = document.getElementById(id);
    if (el && typeof data[id] === 'string') el.value = data[id];
  });
}
function clearInputs(){
  INPUT_IDS.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  saveInputs();
  closeDetail();
  updateClearBtnState();
  renderGrid();
}
function updateClearBtnState(){
  if (!elClearBtn) return;
  var anyFilled = INPUT_IDS.some(function(id){
    var el = document.getElementById(id);
    return el && el.value !== '';
  });
  elClearBtn.classList.toggle('wat-clean', !anyFilled);
}

// ---------- leitura dos campos ----------
function readInputs(){
  var alt = parseFloat(elAlt.value);
  var temp = parseFloat(elTemp.value);
  var vento = parseFloat(elVento.value);
  return {
    alt: isNaN(alt) ? null : alt,
    temp: isNaN(temp) ? null : temp,
    vento: isNaN(vento) ? null : vento
  };
}
function temEntradasCompletas(v){
  return v.alt !== null && v.temp !== null;
}

// ---------- render da grade (Campo 2) ----------
function renderGrid(){
  var v = readInputs();
  var completo = temEntradasCompletas(v);
  var html = '';
  E.CAT_ORDER.forEach(function(cat){
    var meta = E.WAT_GRID[cat];
    var row = '<tr' + '>';
    // resultado por categoria: melhor entre as configs disponíveis? -> usamos "padrao" como referência
    // para a grade fixa (X/—); o cálculo de resultado usa a config selecionada no detalhe, ou "padrao" por padrão.
    var cellsHtml = '';
    ['6400','6800','7000'].forEach(function(faixaLabel){
      var permitido = meta[faixaLabel];
      cellsHtml += '<td>' + (permitido ? '<span class="wat-x">X</span>' : '<span class="wat-dash">&mdash;</span>') + '</td>';
    });

    var resultadoHtml = '<span class="wat-dash">&mdash;</span>';
    var linhaDesabilitada = false;
    var catBtnDisabled = false;

    if (completo){
      var cfgParaResultado = globalCfg;
      var r = E.calcularCategoria(cat, cfgParaResultado, null, v.alt, v.temp, v.vento);
      if (r.ok){
        resultadoHtml = '<span class="wat-result-cell wat-ok">' + ((window.AW && window.AW.lang === 'en') ? Math.round(r.pesoMaxKg * 2.20462262) + ' lb' : r.pesoMaxKg + ' kg') + '</span>';
      } else {
        resultadoHtml = '<span class="wat-dash">&mdash;</span>';
        linhaDesabilitada = true;
        catBtnDisabled = true;
      }
    }

    var catBtnClass = 'wat-cat-btn' + (openCategoryKey===cat ? ' wat-cat-open' : '');
    var catBtnHtml = '<button type="button" class="'+catBtnClass+'" data-cat="'+cat+'"' + (catBtnDisabled?' disabled':'') + '>' + meta.nome + '</button>';

    html += '<tr' + (linhaDesabilitada ? ' class="wat-row-disabled"' : '') + '>' +
            '<td>' + catBtnHtml + '</td>' +
            cellsHtml +
            '<td>' + resultadoHtml + '</td>' +
            '</tr>';
  });
  elGridBody.innerHTML = html;

  // religa os cliques nos botões de categoria recém-criados
  elGridBody.querySelectorAll('.wat-cat-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      if (btn.disabled) return;
      var cat = btn.getAttribute('data-cat');
      toggleCategoria(cat);
    });
  });
}

// ---------- Campo 3: detalhe / acordeão ----------
function closeDetail(){
  openCategoryKey = null;
  elDetail.classList.remove('wat-open');
  elDetail.style.display = 'none';
  document.getElementById('watDetailHeading').style.display = 'none';
  hideLanding();
}

function toggleCategoria(cat){
  if (openCategoryKey === cat){
    closeDetail();
    renderGrid();
    return;
  }
  openCategoryKey = cat;
  renderGrid();
  renderDetail();
}

function cfgsDisponiveis(cat){
  // configs presentes em qualquer faixa dessa categoria
  var set = {};
  E.FAIXAS.forEach(function(f){
    var faixaData = E.WAT_DATA[cat][f];
    if (!faixaData) return;
    Object.keys(faixaData).forEach(function(cfg){ set[cfg] = true; });
  });
  var order = ['padrao','eaps_off','eaps_on','ibf'];
  return order.filter(function(c){ return set[c]; });
}

// ---------- perfis de decolagem (dados da página "PERFIS DE DECOLAGENS") ----------
var TAKEOFF_PROFILES = {
  CAT_B: { titulo:'CAT B TAKE OFF', rows:[
    ['NR','100%'],['Attitude','- 7° ATTITUDE CHANGE'],['Power Index','Hover + 5%'],['AIRSPEED','Increasing'],
    ['Gate','50 KIAS & 50 ft'],['Attitude','Manter até Vy'],['Vy','80 KIAS (manter até 1000 ft)']], oei:[] },
  CAT_A_CLEAR_AREA: { titulo:'CAT A CLEAR AREA TAKE OFF', rows:[
    ['NR','102%'],['Attitude','- 5° (Below horizon)'],['Power Index','Hover + 18%'],['TDP','30 ft'],['Vtoss','50 KIAS'],
    ['Attitude','+ 5° (Above horizon)'],['Vy','80 KIAS (manter até 1000 ft)']],
    oei:[['OEI RTO','Derrubar NR p/ 90%, se necessário.'],['OEI CTO','Derrubar a NR para 90% até Vtoss.']] },
  CAT_A_VERTICAL_PROCEDURE: { titulo:'CAT A VERTICAL HELIPAD TAKE OFF', rows:[
    ['NR','102%'],['Power Index','Hover + 23% (2 seg)'],['TDP','35 a 70 ft'],['Attitude','- 10° (for 1 seg → 0°)'],['Vtoss','40 KIAS'],
    ['Attitude','+ 5° (Above horizon)'],['Vy','80 KIAS (manter até 1000 ft)']],
    oei:[['OEI RTO','NÃO derrubar a NR.'],['OEI CTO','Derrubar a NR para 90% até Vtoss.']] },
  CAT_A_SHORT_FIELD: { titulo:'CAT A SHORT FIELD TAKE OFF', rows:[
    ['NR','102%'],['Power Index','Hover + 23% (2 seg)'],['TDP','35 a 400 ft'],['Attitude','- 10° (for 1 seg → 0°)'],['Vtoss','40 KIAS'],
    ['Attitude','+ 5° (Above horizon)'],['Vy','80 KIAS (manter até 1000 ft)']],
    oei:[['OEI RTO','Derrubar NR e - 20° nariz down.'],['OEI CTO','Derrubar a NR para 90% até Vtoss.']] },
  CAT_A_BACKUP: { titulo:'CAT A BACK UP TAKE OFF', rows:[
    ['NR','102%'],['Power Index','Hover + 23% (2 seg)'],['Attitude','Climb rearward'],['TDP','85 a 400 ft'],['Attitude','- 10° (for 1 seg → 0°)'],
    ['Vtoss','40 KIAS'],['Attitude','+ 5° (Above horizon)']],
    oei:[['OEI RTO','NÃO derrubar a NR.'],['OEI CTO','Derrubar a NR para 90% até Vtoss.']] },
  CAT_A_CONFINED_AREA: { titulo:'CAT A CONFINED TAKE OFF', rows:[
    ['NR','102%'],['Power Index','Hover + 23% (2 seg)'],['Attitude','Climb, slightly rearward'],['TDP','100 a 400 ft'],
    ['Attitude','- 10° (for 1 seg → 0°)'],['Vtoss','40 KIAS'],['Attitude','+ 5° (Above horizon)']],
    nota:'Aplicação de PI em dois estágios.',
    oei:[['OEI RTO','Derrubar NR para 100% +/- 1%, se necessário.'],['OEI CTO','Derrubar a NR para 90% até Vtoss.']] },
  CAT_A_OFFSHORE_HELIDECK: { titulo:'CAT A OFFSHORE HELIDECK TAKE OFF', rows:[
    ['NR','102%'],['Power Index','Hover + 23% (2 seg)'],['TDP','35 a 70 ft'],['Attitude','- 10° (for 1 seg → 0°)'],['Vtoss','40 KIAS'],
    ['Attitude','+ 5° (Above horizon)'],['Vy','80 KIAS (manter até 1000 ft)']],
    oei:[['OEI RTO','Manter NR em 100%.'],['OEI CTO','Derrubar a NR para 90% até Vtoss.']] }
};

// ---------- perfis de pouso (dados da página "PERFIS DE POUSO") ----------
var LANDING_PROFILES = {
  CAT_B: { titulo:'CAT B LANDING', rows:[
    ['NR','100%'],['Parking brake','COMO NECESSÁRIO'],['Approach entry','200 ft & < 500fpm'],['Máx rec speed','80 KIAS'],
    ['Gate','30 KIAS & 50 ft'],['ROD','< 350 fpm'],['At 50 ft','Até + 20° de nose up'],['Máx nose up','15° ( no toque)']],
    oei:[['OEI','MESMO PERFIL'],['','DE PREFERÊNCIA, FAZER POUSO CORRIDO']] },
  CLEAR_AREA: { titulo:'CAT A CLEAR AREA LANDING', rows:[
    ['NR','102%'],['Parking brake','Released'],['Approach entry','200 ft & < 500fpm'],['Máx rec speed','80 KIAS'],
    ['LDP','50 ft e 50 KIAS'],['ROD','< 350 fpm'],['Máx nose up','15° ( no toque)']],
    oei:[['OEI BALKED LANDING','Derrubar NR p/ 90%, se necessário.'],['OEI LANDING','Derrubar a NR para 90%.']] },
  HELIPORT: { titulo:'CAT A HELIPORT/HELIDECK LANDING', rows:[
    ['NR','102%'],['Parking brake','ON'],['Approach entry','LDP + 150 ft & < 500fpm'],['Máx rec speed','40 KIAS'],
    ['LDP','50 - 400 ft e 20 KIAS'],['ROD','< 350 fpm'],['Máx nose up','15° ( no toque)']],
    oei:[['OEI BALKED LANDING','Derrubar NR p/ 90%, se necessário.']] },
  CONF_BELOW: { titulo:'CAT A CONFINED LANDING LDP abaixo 250 ft ALS', rows:[
    ['NR','102%'],['Parking brake','ON'],['Approach entry','350 ft ALS < 400 fpm - 30 kts GS'],['Transição','250 ft 15 a 20 kts GS'],
    ['LDP','100 - 250 ft e 15 kts GS'],['ROD','400 a 500 fpm'],['Máx nose up','15° (no toque)']], oei:[] },
  CONF_ABOVE: { titulo:'CAT A CONFINED LANDING LDP acima 250 ft ALS', rows:[
    ['NR','102%'],['Parking brake','ON'],['Approach entry','LDP + 100 ft & < 500fpm - 30 kts GS'],['Recomm speed','30 KIAS'],
    ['LDP','250 - 400 ft e 15-20 kts GS'],['ROD','400 a 500 fpm'],['Máx nose up','15° (no toque)']], oei:[] },
  OFFSHORE_STD: { titulo:'CAT A OFFSHORE HELIDECK LANDING STD', rows:[
    ['NR','102%'],['Parking brake','ON'],['Approach entry','400 ft & < 500fpm'],['Recomm speed','50 kts'],
    ['LDP','Alt. helid. + 40 ft & 15 kts GS'],['ROD (at LDP)','0 fpm'],['Máx nose up','15° (no toque)']], oei:[] },
  OFFSHORE_ALT: { titulo:'CAT A OFFSHORE HELIDECK LANDING ALT', rows:[
    ['NR','102%'],['Parking brake','ON'],['Approach entry','400 ft & < 500fpm'],['Recomm speed','50 kts'],
    ['LDP','Alt. helid. + 50 ft & 15 kts GS'],['ROD (at LDP)','< 200 fpm'],['Máx nose up','15° (no toque)']], oei:[] }
};
var LANDING_BY_CAT = {
  CAT_B: ['CAT_B'],
  CAT_A_CLEAR_AREA: ['CLEAR_AREA'],
  CAT_A_VERTICAL_PROCEDURE: ['HELIPORT'],
  CAT_A_SHORT_FIELD: ['HELIPORT'],
  CAT_A_BACKUP: ['HELIPORT'],
  CAT_A_CONFINED_AREA: ['CONF_BELOW','CONF_ABOVE'],
  CAT_A_OFFSHORE_HELIDECK: ['OFFSHORE_STD','OFFSHORE_ALT']
};
LANDING_BY_CAT.CAT_B = ['CAT_B'];

function renderProfileHtml(prof, comSubtitulo){
  var h = '<div class="wat-prof">';
  if (comSubtitulo){
    h = '<div class="wat-prof-sub">' + escHtml(prof.titulo) + '</div>' + h;
  }
  prof.rows.forEach(function(rw){
    h += '<div class="wat-prof-row"><span class="wat-prof-k">' + escHtml(rw[0]) + '</span><span class="wat-prof-v">' + escHtml(rw[1]) + '</span></div>';
  });
  prof.oei.forEach(function(rw){
    h += '<div class="wat-prof-oei">' + (rw[0] ? '<b>' + escHtml(rw[0]) + ':</b> ' : '') + escHtml(rw[1]) + '</div>';
  });
  h += '</div>';
  return h;
}

function renderLanding(cat){
  var heading = document.getElementById('watLandingHeading');
  var box = document.getElementById('watLanding');
  var body = document.getElementById('watLandingBody');
  var lista = LANDING_BY_CAT[cat];
  var html = '';
  if (!lista || !lista.length){
    html = '<div class="wat-placeholder">Perfil de pouso não disponível para esta categoria.</div>';
  } else {
    lista.forEach(function(k){
      html += renderProfileHtml(LANDING_PROFILES[k], true);
    });
  }
  body.innerHTML = html;
  heading.style.display = 'block';
  box.style.display = 'block';
  box.classList.add('wat-open');
}

function hideLanding(){
  var heading = document.getElementById('watLandingHeading');
  var box = document.getElementById('watLanding');
  if (heading) heading.style.display = 'none';
  if (box){ box.style.display = 'none'; box.classList.remove('wat-open'); }
}

function escHtml(t){
  return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderDetail(){
  if (!openCategoryKey) { closeDetail(); return; }
  var cat = openCategoryKey;
  var meta = E.WAT_GRID[cat];
  var prof = TAKEOFF_PROFILES[cat];

  var html = '';
  if (!prof){
    elDetailTitle.textContent = meta.nome;
    html += '<div class="wat-placeholder">Perfil de decolagem não disponível para esta categoria.</div>';
  } else {
    elDetailTitle.textContent = prof.titulo;
    html += '<div class="wat-prof">';
    prof.rows.forEach(function(rw){
      html += '<div class="wat-prof-row"><span class="wat-prof-k">' + escHtml(rw[0]) + '</span><span class="wat-prof-v">' + escHtml(rw[1]) + '</span></div>';
    });
    if (prof.nota){
      html += '<div class="wat-prof-nota">' + escHtml(prof.nota) + '</div>';
    }
    prof.oei.forEach(function(rw){
      html += '<div class="wat-prof-oei"><b>' + escHtml(rw[0]) + ':</b> ' + escHtml(rw[1]) + '</div>';
    });
    html += '</div>';
  }

  elDetailBody.innerHTML = html;
  elDetail.style.display = 'block';
  elDetail.classList.add('wat-open');
  document.getElementById('watDetailHeading').style.display = 'block';
  renderLanding(cat);
}

// ---------- botões de configuração globais ----------
function renderCfgRow(){
  var row = document.getElementById('watCfgRow');
  if (!row) return;
  var order = ['padrao','eaps_on','eaps_off','ibf'];
  var html = '';
  order.forEach(function(cfg){
    html += '<button type="button" class="wat-cfg-btn' + (cfg === globalCfg ? ' wat-cfg-active' : '') + '" data-cfg="' + cfg + '">' + E.CFG_LABELS[cfg] + '</button>';
  });
  row.innerHTML = html;
  row.querySelectorAll('.wat-cfg-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      globalCfg = btn.getAttribute('data-cfg');
      saveInputs();
      renderCfgRow();
      renderGrid();
      if (openCategoryKey) renderDetail();
    });
  });
}

// ---------- atalho ± (sinal positivo/negativo) ----------
function initPmButtons(){
  document.querySelectorAll('.wat-pm').forEach(function(b){
    b.addEventListener('click', function(){
      var el = document.getElementById(b.getAttribute('data-t'));
      if (!el) return;
      var v = el.value.trim();
      el.value = (v.charAt(0) === '-') ? v.slice(1) : '-' + v;
      el.dispatchEvent(new Event('input', {bubbles:true}));
      el.focus();
    });
  });
}

// ---------- cabeçalhos de peso em lb (idioma inglês) ----------
function awHeaders(){
  if (!(window.AW && window.AW.lang === 'en')) return;
  var ths = document.querySelectorAll('#watGridTable thead th');
  var kgs = [6400, 6800, 7000];
  kgs.forEach(function(kg, k){
    if (ths[k + 1]) ths[k + 1].textContent = Math.round(kg * 2.20462262) + ' lb';
  });
}

// ---------- inicialização ----------
function init(){
  elAlt = document.getElementById('watAlt');
  elTemp = document.getElementById('watTemp');
  elVento = document.getElementById('watVento');
  elClearBtn = document.getElementById('watClearBtn');
  elGridBody = document.getElementById('watGridBody');
  elDetail = document.getElementById('watDetail');
  elDetailTitle = document.getElementById('watDetailTitle');
  elDetailBody = document.getElementById('watDetailBody');

  loadInputs();
  updateClearBtnState();
  renderCfgRow();
  initPmButtons();
  awHeaders();
  renderGrid();

  INPUT_IDS.forEach(function(id){
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function(){
      saveInputs();
      renderGrid();
      if (openCategoryKey) renderDetail();
    });
  });

  elClearBtn.addEventListener('click', clearInputs);
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
