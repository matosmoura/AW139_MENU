
// ---------- DATA ----------
// weight -> altitude(0/100/200/300) -> temp(10..50) -> value in ft or null (XXX)
const TEMPS = [10,15,20,25,30,35,40,45,50];
const ALTS = [0,100,200,300];
const WEIGHTS = [6000,6100,6200,6300,6400,6500,6600,6700,6800];

const TABLE = {
  6000: {
    0:   [0,0,0,0,0,0,0,3,17],
    100: [0,0,0,0,0,0,0,null,null],
    200: [0,0,0,0,0,0,0,null,null],
    300: [0,0,0,0,0,0,0,null,null],
  },
  6100: {
    0:   [0,0,0,0,0,2,9,17,31],
    100: [0,0,0,0,0,4,11,null,null],
    200: [0,0,0,0,0,5,13,null,null],
    300: [0,0,0,0,0,6,14,null,null],
  },
  6200: {
    0:   [0,0,0,0,0,4,17,30,44],
    100: [0,0,0,0,0,7,21,null,null],
    200: [0,0,0,0,0,9,26,null,null],
    300: [0,0,0,0,0,12,28,null,null],
  },
  6300: {
    0:   [0,0,0,3,8,19,31,45,58],
    100: [0,0,0,4,10,21,34,null,null],
    200: [0,0,0,5,12,24,39,null,null],
    300: [0,0,0,6,13,27,42,null,null],
  },
  6400: {
    0:   [0,0,0,5,16,33,44,60,72],
    100: [0,0,0,8,20,35,47,null,null],
    200: [0,0,0,10,23,38,51,null,null],
    300: [0,0,0,12,26,41,55,null,null],
  },
  6500: {
    0:   [0,3,8,17,30,46,57,74,87],
    100: [0,4,9,20,33,48,60,null,null],
    200: [0,4,10,23,37,51,63,null,null],
    300: [0,5,12,25,40,53,67,null,null],
  },
  6600: {
    0:   [0,5,15,28,43,58,70,88,102],
    100: [0,7,17,31,46,61,72,null,null],
    200: [0,8,20,35,50,63,75,null,null],
    300: [0,10,23,37,54,64,78,null,null],
  },
  6700: {
    0:   [5,15,28,41,56,71,84,101,115],
    100: [7,18,30,44,59,74,41,null,null],
    200: [8,20,33,48,63,77,43,null,null],
    300: [9,23,36,51,67,79,44,null,null],
  },
  6800: {
    0:   [10,25,40,53,68,83,98,113,127],
    100: [13,29,43,57,72,87,102,null,null],
    200: [15,32,45,60,75,90,105,null,null],
    300: [18,36,48,64,79,94,109,null,null],
  },
};

// ENHANCED OFFSHORE — weight -> altitude -> temp array
const WEIGHTS_ENH = [6000,6100,6200,6300,6400,6500,6600,6700,6800,6900,7000];

const TABLE_ENH = {
  6000: {
    0:   [0,0,0,0,0,0,1,7,14],
    100: [0,0,0,0,0,0,3,null,null],
    200: [0,0,0,0,0,0,4,null,null],
    300: [0,0,0,0,0,0,5,null,null],
  },
  6100: {
    0:   [0,0,0,1,1,4,8,16,25],
    100: [0,0,0,1,2,5,10,null,null],
    200: [0,0,0,1,2,6,12,null,null],
    300: [0,0,0,2,3,7,13,null,null],
  },
  6200: {
    0:   [0,0,0,1,1,8,15,24,35],
    100: [0,0,0,1,3,10,17,null,null],
    200: [0,0,0,2,4,11,19,null,null],
    300: [0,0,0,3,5,13,21,null,null],
  },
  6300: {
    0:   [0,0,0,4,8,17,26,37,49],
    100: [0,1,1,5,10,19,28,null,null],
    200: [0,1,2,7,12,21,30,null,null],
    300: [0,1,2,8,13,23,32,null,null],
  },
  6400: {
    0:   [0,0,0,7,15,25,36,49,null],
    100: [0,1,2,9,17,28,39,null,null],
    200: [0,1,3,11,19,30,41,null,null],
    300: [0,2,4,12,21,32,43,null,null],
  },
  6500: {
    0:   [0,3,7,15,25,37,49,62,null],
    100: [1,5,9,18,27,40,53,null,null],
    200: [1,6,11,20,30,43,56,null,null],
    300: [2,7,12,22,32,45,58,null,null],
  },
  6600: {
    0:   [0,6,13,23,34,48,62,null,null],
    100: [1,8,16,26,37,51,66,null,null],
    200: [2,10,18,29,40,55,70,null,null],
    300: [4,12,20,31,43,58,73,null,null],
  },
  6700: {
    0:   [6,14,23,34,47,62,78,null,null],
    100: [7,16,26,38,50,65,83,null,null],
    200: [9,18,28,41,53,70,88,null,null],
    300: [11,20,30,43,56,72,null,null,null],
  },
  6800: {
    0:   [11,21,32,45,59,76,94,null,null],
    100: [13,24,36,49,63,79,null,null,null],
    200: [15,26,38,52,66,null,null,null,null],
    300: [17,28,40,54,69,null,null,null,null],
  },
  6900: {
    0:   [20,31,44,59,null,null,null,null,null],
    100: [22,34,46,62,null,null,null,null,null],
    200: [24,36,48,65,null,null,null,null,null],
    300: [26,38,52,69,null,null,null,null,null],
  },
  7000: {
    0:   [28,null,null,null,null,null,null,null,null],
    100: [null,null,null,null,null,null,null,null,null],
    200: [null,null,null,null,null,null,null,null,null],
    300: [null,null,null,null,null,null,null,null,null],
  },
};

// ---------- TABLE MODE (CONVENCIONAL / ENHANCED) ----------
let tableMode = 'conv'; // 'conv' | 'enh'

const btnConv = document.getElementById('btnConv');
const btnEnh = document.getElementById('btnEnh');
const approachField = document.getElementById('approachField');
const pesoHint = document.getElementById('pesoHint');
const pesoInput = document.getElementById('peso');

function setTableMode(mode){
  tableMode = mode;
  if(mode === 'conv'){
    btnConv.classList.add('active');
    btnEnh.classList.remove('active');
    approachField.style.display = '';
    pesoHint.textContent = 'Faixa válida: 6.000 a 6.800 kg';
    pesoInput.min = 6000; pesoInput.max = 6800;
  } else {
    btnEnh.classList.add('active');
    btnConv.classList.remove('active');
    approachField.style.display = 'none';
    pesoHint.textContent = 'Faixa válida: 6.000 a 7.000 kg';
    pesoInput.min = 6000; pesoInput.max = 7000;
  }
}

btnConv.addEventListener('click', () => setTableMode('conv'));
btnEnh.addEventListener('click', () => setTableMode('enh'));

// ---------- CLEAR BUTTON ----------
const clearBtn = document.getElementById('clearBtn');
const inputIds = ['peso','temp','alt','wind'];

function isFormDirty(){
  return inputIds.some(id => document.getElementById(id).value.trim() !== '');
}

function updateClearBtnState(){
  clearBtn.classList.toggle('dirty', isFormDirty());
}

inputIds.forEach(id => {
  document.getElementById(id).addEventListener('input', updateClearBtnState);
});

clearBtn.addEventListener('click', () => {
  inputIds.forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('result').className = 'result';
  document.getElementById('result').innerHTML = '';
  updateClearBtnState();
});

updateClearBtnState();

// ---------- STATE ----------
let approachMode = 'descending'; // 'level' | 'descending'

const btnLevel = document.getElementById('btnLevel');
const btnDesc = document.getElementById('btnDesc');
btnLevel.addEventListener('click', () => {
  approachMode = 'level';
  btnLevel.classList.add('active');
  btnDesc.classList.remove('active');
});
btnDesc.addEventListener('click', () => {
  approachMode = 'descending';
  btnDesc.classList.add('active');
  btnLevel.classList.remove('active');
});

// ---------- INTERPOLATION HELPERS ----------
function findBracket(arr, val){
  // returns [lowVal, highVal, frac] with clamping to array range
  if(val <= arr[0]) return [arr[0], arr[0], 0];
  if(val >= arr[arr.length-1]) return [arr[arr.length-1], arr[arr.length-1], 0];
  for(let i=0;i<arr.length-1;i++){
    if(val >= arr[i] && val <= arr[i+1]){
      const frac = (val - arr[i]) / (arr[i+1]-arr[i]);
      return [arr[i], arr[i+1], frac];
    }
  }
  return [arr[0], arr[0], 0];
}

function lerp(a,b,f){
  if(a===null || b===null) return null;
  return a + (b-a)*f;
}

// Get raw table value for exact weight/alt/temp keys
function rawValue(table, weight, alt, temp){
  const wTable = table[weight];
  if(!wTable) return undefined;
  const altArr = wTable[alt];
  if(!altArr) return undefined;
  const tIdx = TEMPS.indexOf(temp);
  if(tIdx === -1) return undefined;
  return altArr[tIdx];
}

// Interpolate across temperature for a given exact weight & alt
function interpTemp(table, weight, alt, temp){
  const [tLo, tHi, tf] = findBracket(TEMPS, temp);
  const vLo = rawValue(table, weight, alt, tLo);
  const vHi = rawValue(table, weight, alt, tHi);
  if(vLo === undefined || vHi === undefined) return undefined;
  return lerp(vLo, vHi, tf);
}

// Interpolate across altitude for a given exact weight
function interpAlt(table, weight, alt, temp){
  const [aLo, aHi, af] = findBracket(ALTS, alt);
  const vLo = interpTemp(table, weight, aLo, temp);
  const vHi = interpTemp(table, weight, aHi, temp);
  if(vLo === undefined || vHi === undefined) return undefined;
  return lerp(vLo, vHi, af);
}

// Interpolate across weight
function interpWeight(table, weights, weight, alt, temp){
  const [wLo, wHi, wf] = findBracket(weights, weight);
  const vLo = interpAlt(table, wLo, alt, temp);
  const vHi = interpAlt(table, wHi, alt, temp);
  if(vLo === undefined || vHi === undefined) return undefined;
  return lerp(vLo, vHi, wf);
}

function fmt(n, dec=1){
  return n.toLocaleString('pt-BR', {minimumFractionDigits:dec, maximumFractionDigits:dec});
}

// ---------- MAIN CALC ----------
document.getElementById('calcBtn').addEventListener('click', () => {
  const pesoRawDD = parseFloat(document.getElementById('peso').value);
  const peso = (!isNaN(pesoRawDD) && window.AW && window.AW.lang === 'en') ? pesoRawDD / 2.20462262 : pesoRawDD;
  const temp = parseFloat(document.getElementById('temp').value);
  const alt  = parseFloat(document.getElementById('alt').value);
  const wind = parseFloat(document.getElementById('wind').value) || 0;

  const resEl = document.getElementById('result');

  const isEnh = tableMode === 'enh';
  const activeTable = isEnh ? TABLE_ENH : TABLE;
  const activeWeights = isEnh ? WEIGHTS_ENH : WEIGHTS;
  const wMin = isEnh ? 6000 : 6000;
  const wMax = isEnh ? 7000 : 6800;

  // Validation
  const errors = [];
  if(isNaN(peso)) errors.push('Informe o peso (kg).');
  else if(peso < wMin || peso > wMax) errors.push((window.AW && window.AW.lang === 'en') ? `Peso fora da faixa das tabelas (${Math.round(wMin * 2.20462262).toLocaleString('en-US')}–${Math.round(wMax * 2.20462262).toLocaleString('en-US')} lb).` : `Peso fora da faixa das tabelas (${wMin.toLocaleString('pt-BR')}–${wMax.toLocaleString('pt-BR')} kg).`);

  if(isNaN(temp)) errors.push('Informe a temperatura (°C).');
  else if(temp < 10 || temp > 50) errors.push('Temperatura fora da faixa das tabelas (10–50°C).');

  if(isNaN(alt)) errors.push('Informe a altitude de decisão (ft).');
  else if(alt < 0 || alt > 300) errors.push('Altitude fora da faixa das tabelas (0–300 ft).');

  if(wind < 0) errors.push('Componente de headwind não pode ser negativo.');

  if(errors.length){
    resEl.className = 'result err show';
    resEl.innerHTML = `
      <div class="r-title">Não foi possível calcular</div>
      <div>${errors.join('<br>')}</div>
    `;
    return;
  }

  // Base interpolated value
  const baseVal = interpWeight(activeTable, activeWeights, peso, alt, temp);

  if(baseVal === undefined || baseVal === null){
    resEl.className = 'result err show';
    resEl.innerHTML = `
      <div class="r-title">Condição não disponível</div>
      <div>A combinação de peso, altitude e temperatura informada cai em uma célula marcada como <strong>XXX</strong> na tabela de referência (limite estrutural/performance não coberto para esta altitude+temperatura). Ajuste os parâmetros de entrada.</div>
    `;
    return;
  }

  let dropDown = baseVal;

  // Descending approach note 1 — apenas no modo convencional
  const descAdj = (!isEnh && approachMode === 'descending') ? 15 : 0;
  dropDown += descAdj;

  // Wind correction note 2
  dropDown -= wind;

  let clamped = false;
  if(dropDown < 0){
    dropDown = 0;
    clamped = true;
  }

  const detailRows = [`<div><span>Valor base (interpolado)</span><span>${fmt(baseVal,2)} ft</span></div>`];
  if(!isEnh){
    detailRows.push(`<div><span>Ajuste ${approachMode === 'descending' ? 'descending approach' : 'level approach'}</span><span>${descAdj >= 0 ? '+' : ''}${descAdj} ft</span></div>`);
  }
  detailRows.push(`<div><span>Correção de headwind</span><span>−${fmt(wind,1)} ft</span></div>`);

  resEl.className = 'result ok show';
  resEl.innerHTML = `
    <div class="r-label">DROP DOWN CALCULADO · ${isEnh ? 'ENHANCED' : 'CONVENCIONAL'}</div>
    <div class="r-value">${fmt(dropDown,1)}<span class="r-unit">FT</span></div>
    <div class="r-detail">
      ${detailRows.join('')}
    </div>
    ${clamped ? '<div class="flag">Resultado limitado em 0 ft</div>' : ''}
  `;
});
