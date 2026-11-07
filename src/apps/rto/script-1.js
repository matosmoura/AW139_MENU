
// ---------------------------------------------------------------
// TABELA DE DADOS — RTO CAT A CLEAR AREA (AW139)
// Estrutura: peso -> altitude -> temperatura -> {d: distancia(m), w: fator vento (por kt), red: bool, xxx: bool}
// ---------------------------------------------------------------

const WEIGHTS = [6400, 6500, 6600, 6700, 6800, 6900, 7000];
const ALTS = [0, 250, 500, 1000];
const TEMPS = [10, 15, 20, 25, 30, 35, 40, 45, 50];

// cell(d, w, opts) helper: d = distance in meters, w = wind factor (negative per parens)
function c(d, w, opts) {
  opts = opts || {};
  return { d: d, w: w, red: !!opts.red, xxx: !!opts.xxx };
}

const TABLE = {
  6400: {
    0:    [c(100,-6), c(100,-7), c(100,-8), c(100,-10), c(100,-12), c(190,-14), c(280,-16), c(400,-17), c(500,-18)],
    250:  [c(100,-6), c(100,-7), c(100,-9), c(103,-11), c(105,-12), c(200,-14), c(295,-16), c(420,-17), c(0,0,{xxx:true})],
    500:  [c(100,-7), c(100,-8), c(100,-10), c(105,-12), c(110,-13), c(210,-15), c(310,-16), c(440,-17), c(0,0,{xxx:true})],
    1000: [c(100,-9), c(100,-10), c(100,-12), c(150,-13), c(200,-14), c(305,-16), c(410,-17), c(500,-18), c(0,0,{xxx:true})]
  },
  6500: {
    0:    [c(100,-6), c(100,-7), c(145,-8), c(198,-10), c(250,-12), c(340,-14), c(430,-16), c(550,-17), c(650,-18)],
    250:  [c(100,-6), c(118,-7), c(163,-9), c(216,-11), c(268,-12), c(361,-14), c(455,-16), c(570,-17), c(0,0,{xxx:true})],
    500:  [c(100,-7), c(135,-8), c(180,-10), c(233,-12), c(285,-13), c(383,-15), c(480,-16), c(590,-17), c(0,0,{xxx:true})],
    1000: [c(140,-9), c(175,-10), c(220,-12), c(295,-13), c(370,-14), c(465,-16), c(560,-17), c(650,-18), c(0,0,{xxx:true})]
  },
  6600: {
    0:    [c(100,-6), c(100,-7), c(190,-8), c(295,-10), c(400,-12), c(490,-14), c(580,-16), c(700,-17), c(800,-18)],
    250:  [c(100,-6), c(135,-7), c(225,-9), c(328,-11), c(430,-12), c(522,-14), c(615,-16), c(720,-17), c(0,0,{xxx:true})],
    500:  [c(100,-7), c(170,-8), c(260,-10), c(360,-12), c(460,-13), c(555,-15), c(650,-16), c(740,-17), c(0,0,{xxx:true})],
    1000: [c(180,-9), c(250,-10), c(340,-12), c(440,-13), c(540,-14), c(625,-16), c(710,-17), c(800,-18), c(0,0,{xxx:true})]
  },
  6700: {
    0:    [c(230,-6), c(268,-7), c(350,-8), c(450,-10), c(550,-12), c(638,-14), c(725,-16), c(845,-17), c(955,-18)],
    250:  [c(248,-6), c(304,-7), c(388,-9), c(487,-11), c(585,-12), c(674,-14), c(763,-16), c(873,-17), c(0,0,{xxx:true})],
    500:  [c(265,-7), c(340,-8), c(425,-10), c(523,-12), c(620,-13), c(710,-15), c(800,-16), c(900,-17), c(0,0,{xxx:true})],
    1000: [c(335,-9), c(413,-10), c(500,-12), c(595,-13), c(690,-14), c(775,-16), c(860,-17), c(955,-18), c(0,0,{xxx:true})]
  },
  6800: {
    0:    [c(360,-12), c(435,-13), c(510,-14), c(605,-15), c(700,-17), c(785,-18,{red:true}), c(870,-19,{red:true}), c(990,-21,{red:true}), c(1110,-22,{red:true})],
    250:  [c(395,-12), c(473,-13), c(550,-14), c(645,-15), c(740,-17), c(825,-18,{red:true}), c(910,-19,{red:true}), c(1025,-21,{red:true}), c(0,0,{xxx:true})],
    500:  [c(430,-13), c(510,-14), c(590,-15), c(685,-16), c(780,-18), c(865,-19,{red:true}), c(950,-20,{red:true}), c(1060,-22,{red:true}), c(0,0,{xxx:true})],
    1000: [c(490,-14), c(575,-15), c(660,-16), c(750,-17), c(840,-19), c(925,-20,{red:true}), c(1010,-21,{red:true}), c(1110,-22,{red:true}), c(0,0,{xxx:true})]
  },
  6900: {
    0:    [c(510,-12), c(590,-13), c(670,-14), c(760,-15), c(850,-17), c(938,-18,{red:true}), c(1025,-19,{red:true}), c(1145,-21,{red:true}), c(1255,-22,{red:true})],
    250:  [c(548,-12), c(627,-13), c(705,-14), c(797,-15), c(888,-17), c(975,-18,{red:true}), c(1063,-19,{red:true}), c(1178,-21,{red:true}), c(0,0,{xxx:true})],
    500:  [c(585,-13), c(663,-14), c(740,-15), c(833,-16), c(925,-18), c(1013,-19,{red:true}), c(1100,-20,{red:true}), c(1210,-22,{red:true}), c(0,0,{xxx:true})],
    1000: [c(645,-14), c(728,-15), c(810,-16), c(900,-17), c(990,-19), c(1075,-20,{red:true}), c(1160,-21,{red:true}), c(1255,-22,{red:true}), c(0,0,{xxx:true})]
  },
  7000: {
    0:    [c(660,-12), c(745,-13), c(830,-14), c(915,-15), c(1000,-17), c(1090,-18,{red:true}), c(1180,-19,{red:true}), c(1300,-21,{red:true}), c(1400,-22,{red:true})],
    250:  [c(700,-12), c(780,-13), c(860,-14), c(948,-15), c(1035,-17), c(1125,-18,{red:true}), c(1215,-19,{red:true}), c(1330,-21,{red:true}), c(0,0,{xxx:true})],
    500:  [c(740,-13), c(815,-14), c(890,-15), c(980,-16), c(1070,-18), c(1160,-19,{red:true}), c(1250,-20,{red:true}), c(1360,-22,{red:true}), c(0,0,{xxx:true})],
    1000: [c(800,-14), c(880,-15), c(960,-16), c(1050,-17), c(1140,-19), c(1225,-20,{red:true}), c(1310,-21,{red:true}), c(1400,-22,{red:true}), c(0,0,{xxx:true})]
  }
};

// EAPS/IBF addition (meters), applied after wind correction, per manual note
const EAPS_ADD = 110;
const IBF_ADD = 170;

// ---------------------------------------------------------------
// PISTAS
// ---------------------------------------------------------------
const RUNWAYS = [
  { name: "SBAR(12X30)", len: 2200 },
  { name: "SBBE(03X21)", len: 1830 },
  { name: "SBBE(07X25)", len: 2920 },
  { name: "SBCB(10X28)", len: 2550 },
  { name: "SBCP(07X25)", len: 1544 },
  { name: "SBFS(15X33)", len: 580 },
  { name: "SBFZ(13X31)", len: 2755 },
  { name: "SBGL(10X28)", len: 4000 },
  { name: "SBGL(15X33)", len: 3180 },
  { name: "SBJR(03X21)", len: 900 },
  { name: "SBME(05X23)", len: 1410 },
  { name: "SBME(06X24)", len: 899 },
  { name: "SBMI(09X27)", len: 1190 },
  { name: "SBMO(12X30)", len: 2602 },
  { name: "SBMQ(08X26)", len: 2100 },
  { name: "SBNF(08X26)", len: 1800 },
  { name: "SBRJ(02X20)L", len: 1323 },
  { name: "SBRJ(02X20)R", len: 1260 },
  { name: "SBVT(02X20)", len: 2058 },
  { name: "SBVT(06X24)", len: 1750 }
].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

const pistaSelect = document.getElementById('pista');
RUNWAYS.forEach(rw => {
  const opt = document.createElement('option');
  opt.value = rw.len;
  opt.textContent = `${rw.name} - ${rw.len} m`;
  pistaSelect.appendChild(opt);
});

// ---------------------------------------------------------------
// INTERPOLAÇÃO
// ---------------------------------------------------------------

// Find bracketing indices in a sorted array, with linear extrapolation support
function bracket(arr, value) {
  if (value <= arr[0]) return { lo: 0, hi: 1, t: (value - arr[0]) / (arr[1] - arr[0]) };
  if (value >= arr[arr.length - 1]) {
    const n = arr.length;
    return { lo: n - 2, hi: n - 1, t: (value - arr[n - 2]) / (arr[n - 1] - arr[n - 2]) };
  }
  for (let i = 0; i < arr.length - 1; i++) {
    if (value >= arr[i] && value <= arr[i + 1]) {
      return { lo: i, hi: i + 1, t: (value - arr[i]) / (arr[i + 1] - arr[i]) };
    }
  }
  return { lo: 0, hi: 1, t: 0 };
}

function lerp(a, b, t) { return a + (b - a) * t; }

// Get raw cell for exact weight/alt indices and temp index
function cellAt(weightIdx, altIdx, tempIdx) {
  const w = WEIGHTS[weightIdx];
  const a = ALTS[altIdx];
  return TABLE[w][a][tempIdx];
}

// Interpolate across temperature axis for a fixed weight/alt combination
function interpTemp(weightIdx, altIdx, oat) {
  const tb = bracket(TEMPS, oat);
  const cLo = cellAt(weightIdx, altIdx, tb.lo);
  const cHi = cellAt(weightIdx, altIdx, tb.hi);
  if (cLo.xxx || cHi.xxx) return { xxx: true };
  return {
    d: lerp(cLo.d, cHi.d, tb.t),
    w: lerp(cLo.w, cHi.w, tb.t),
    red: cLo.red || cHi.red,
    xxx: false
  };
}

// Interpolate across altitude axis (for fixed weight), given oat
function interpAlt(weightIdx, alt, oat) {
  const ab = bracket(ALTS, alt);
  const rLo = interpTemp(weightIdx, ab.lo, oat);
  const rHi = interpTemp(weightIdx, ab.hi, oat);
  if (rLo.xxx || rHi.xxx) return { xxx: true };
  return {
    d: lerp(rLo.d, rHi.d, ab.t),
    w: lerp(rLo.w, rHi.w, ab.t),
    red: rLo.red || rHi.red,
    xxx: false
  };
}

// Full interpolation across weight, altitude, and temperature
function interpolate(weight, alt, oat) {
  const wb = bracket(WEIGHTS, weight);
  const rLo = interpAlt(wb.lo, alt, oat);
  const rHi = interpAlt(wb.hi, alt, oat);
  if (rLo.xxx || rHi.xxx) return { xxx: true };
  return {
    d: lerp(rLo.d, rHi.d, wb.t),
    w: lerp(rLo.w, rHi.w, wb.t),
    red: rLo.red || rHi.red,
    xxx: false
  };
}

// ---------------------------------------------------------------
// LÓGICA DE CÁLCULO E UI
// ---------------------------------------------------------------

const pesoInput = document.getElementById('peso');
const altInput = document.getElementById('alt');
const oatInput = document.getElementById('oat');
const ventoInput = document.getElementById('vento');
const eapsCheck = document.getElementById('eaps');
const ibfCheck = document.getElementById('ibf');

const resultLabel = document.getElementById('resultLabel');
const resultValue = document.getElementById('resultValue');
const breakdown = document.getElementById('breakdown');
const bBase = document.getElementById('bBase');
const bWind = document.getElementById('bWind');
const bExtra = document.getElementById('bExtra');
const runwayCompare = document.getElementById('runwayCompare');
const rcText = document.getElementById('rcText');
const rcMargin = document.getElementById('rcMargin');
const noticeCatB = document.getElementById('noticeCatB');
const noticeBlocked = document.getElementById('noticeBlocked');
const noticeInvalid = document.getElementById('noticeInvalid');

let lastResult = null; // { finalDistance, xxx }

function hideAllNotices() {
  noticeCatB.classList.remove('visible');
  noticeBlocked.classList.remove('visible');
  noticeInvalid.classList.remove('visible');
}

function resetResultVisual() {
  resultValue.textContent = '—';
  resultValue.classList.add('pending');
  breakdown.classList.remove('visible');
  runwayCompare.classList.remove('visible');
}

function clampWarn(value, min, max) {
  return value < min || value > max;
}

function compute() {
  hideAllNotices();
  lastResult = null;

  const pesoRaw = parseFloat(pesoInput.value);
  const peso = (!isNaN(pesoRaw) && window.AW && window.AW.lang === 'en') ? pesoRaw / 2.20462262 : pesoRaw;
  const alt = parseFloat(altInput.value);
  const oat = parseFloat(oatInput.value);
  const vento = parseFloat(ventoInput.value) || 0;

  if (isNaN(peso) || isNaN(alt) || isNaN(oat)) {
    resetResultVisual();
    noticeInvalid.classList.add('visible');
    updatePistaState();
    return;
  }

  const result = interpolate(peso, alt, oat);

  if (result.xxx) {
    resetResultVisual();
    noticeBlocked.classList.add('visible');
    updatePistaState();
    return;
  }

  const windCorrection = vento * result.w;
  let extra = 0;
  if (eapsCheck.checked) extra += EAPS_ADD;
  if (ibfCheck.checked) extra += IBF_ADD;

  const finalDistance = result.d + windCorrection + extra;

  resultValue.textContent = Math.round(finalDistance).toLocaleString('pt-BR');
  resultValue.classList.remove('pending');

  bBase.textContent = Math.round(result.d).toLocaleString('pt-BR') + ' m';
  bWind.textContent = (windCorrection >= 0 ? '+' : '') + Math.round(windCorrection).toLocaleString('pt-BR') + ' m';
  bExtra.textContent = (extra > 0 ? '+' : '') + extra + ' m';
  breakdown.classList.add('visible');

  if (result.red) {
    noticeCatB.classList.add('visible');
  }

  lastResult = { finalDistance: finalDistance, xxx: false };
  updatePistaState();
}

function updatePistaState() {
  const sel = pistaSelect;
  sel.classList.remove('state-green', 'state-red', 'state-empty');

  if (!sel.value) {
    sel.classList.add('state-empty');
    resultLabel.classList.remove('visible');
    runwayCompare.classList.remove('visible');
    return;
  }

  resultLabel.classList.add('visible');

  if (!lastResult) {
    sel.classList.add('state-empty');
    runwayCompare.classList.remove('visible');
    return;
  }

  const runwayLen = parseFloat(sel.value);
  const margin = runwayLen - lastResult.finalDistance;

  if (margin >= 0) {
    sel.classList.add('state-green');
    runwayCompare.classList.add('visible', 'ok');
    runwayCompare.classList.remove('bad');
    rcText.textContent = 'Pista suficiente';
    rcText.classList.add('ok');
    rcText.classList.remove('bad');
    rcMargin.textContent = '+' + Math.round(margin).toLocaleString('pt-BR') + ' m de margem';
  } else {
    sel.classList.add('state-red');
    runwayCompare.classList.add('visible', 'bad');
    runwayCompare.classList.remove('ok');
    rcText.textContent = 'Pista insuficiente';
    rcText.classList.add('bad');
    rcText.classList.remove('ok');
    rcMargin.textContent = Math.round(margin).toLocaleString('pt-BR') + ' m de déficit';
  }
}

[pesoInput, altInput, oatInput, ventoInput, eapsCheck, ibfCheck].forEach(el => {
  el.addEventListener('input', compute);
  el.addEventListener('change', compute);
});

pistaSelect.addEventListener('change', updatePistaState);

// ---------------------------------------------------------------
// BOTÃO LIMPAR
// ---------------------------------------------------------------
const clearBtn = document.getElementById('clearBtn');

function isRtoTabActive() {
  return tabPanelRto.classList.contains('active');
}

function isFormEmptyRto() {
  return pesoInput.value === '' &&
         altInput.value === '' &&
         oatInput.value === '' &&
         ventoInput.value === '' &&
         !eapsCheck.checked &&
         !ibfCheck.checked &&
         pistaSelect.value === '';
}

function isFormEmptyLdg() {
  return ldgPesoInput.value === '' &&
         ldgAltInput.value === '' &&
         ldgOatInput.value === '' &&
         ldgPistaSelect.value === '';
}

function isFormEmpty() {
  return isRtoTabActive() ? isFormEmptyRto() : isFormEmptyLdg();
}

function updateClearBtnState() {
  if (isFormEmpty()) {
    clearBtn.classList.remove('state-red');
    clearBtn.classList.add('state-green');
  } else {
    clearBtn.classList.remove('state-green');
    clearBtn.classList.add('state-red');
  }
}

function clearRtoForm() {
  pesoInput.value = '';
  altInput.value = '';
  oatInput.value = '';
  ventoInput.value = '';
  eapsCheck.checked = false;
  ibfCheck.checked = false;
  pistaSelect.value = '';
  hideAllNotices();
  resetResultVisual();
  updatePistaState();
}

function clearLdgForm() {
  ldgPesoInput.value = '';
  ldgAltInput.value = '';
  ldgOatInput.value = '';
  ldgPistaSelect.value = '';
  ldgResetVisual();
}

clearBtn.addEventListener('click', () => {
  if (isRtoTabActive()) {
    clearRtoForm();
  } else {
    clearLdgForm();
  }
  updateClearBtnState();
});

[pesoInput, altInput, oatInput, ventoInput].forEach(el => {
  el.addEventListener('input', updateClearBtnState);
});
[eapsCheck, ibfCheck, pistaSelect].forEach(el => {
  el.addEventListener('change', updateClearBtnState);
});

// initial state (resultado visual do RTO já é resetado aqui;
// o estado do botão LIMPAR é inicializado ao final do arquivo,
// após todas as referências da aba LANDING OEI serem declaradas)
resetResultVisual();

// ---------------------------------------------------------------
// SISTEMA DE ABAS
// ---------------------------------------------------------------
const tabBtnRto = document.getElementById('tabBtnRto');
const tabBtnLdg = document.getElementById('tabBtnLdg');
const tabPanelRto = document.getElementById('tabPanelRto');
const tabPanelLdg = document.getElementById('tabPanelLdg');

function switchTab(name) {
  const isRto = name === 'rto';
  tabBtnRto.classList.toggle('active', isRto);
  tabBtnLdg.classList.toggle('active', !isRto);
  tabPanelRto.classList.toggle('active', isRto);
  tabPanelLdg.classList.toggle('active', !isRto);
  updateClearBtnState();
}

tabBtnRto.addEventListener('click', () => switchTab('rto'));
tabBtnLdg.addEventListener('click', () => switchTab('ldg'));

// ---------------------------------------------------------------
// LANDING DISTANCE OEI & BRAKING DISTANCE — DATASET
// Fonte: AW139 RFM-4D, extraído visualmente de:
//   Supl 12 (Fig 4J-2/1 Landing OEI, 4J-2/2 Braking) — 4400 a 6400 kg
//   Supl 50 (Fig 4-60 Landing OEI, 4-61 Braking)      — 6400 a 6800 kg
//   Supl 90 (Fig 4-100 Landing OEI, 4-101 Braking)    — 6800 a 7000 kg
// Valores por leitura visual das curvas — aproximação de engenharia,
// não substitui o RFM oficial para operação real.
// ---------------------------------------------------------------

const LDG_DATASET = {
  weights: [4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800, 7000],

  maxOatLimit: [
    { altitude: -2000, oat: 51 },
    { altitude: 0,     oat: 50 },
    { altitude: 2000,  oat: 45 },
    { altitude: 4000,  oat: 39 },
    { altitude: 6000,  oat: 33 },
    { altitude: 8000,  oat: 27 },
    { altitude: 10000, oat: 21 },
    { altitude: 12000, oat: 15 },
    { altitude: 14000, oat: 9  }
  ],

  braking: {
    4600: { 0: { '0': 14, '30': 22 }, 8000: { '0': 24 } },
    5000: { 0: { '0': 16, '30': 26 }, 8000: { '0': 28 } },
    5400: { 0: { '0': 18, '30': 30 }, 8000: { '0': 32 } },
    5800: { 0: { '0': 21, '30': 35 }, 8000: { '0': 38 } },
    6200: { 0: { '0': 24, '30': 39 }, 8000: { '0': 44 } },
    6400: { 0: { '0': 26, '30': 42, '50': 54 }, 4000: { '0': 36, '30': 58 }, 8000: { '0': 48 } },
    6600: { 0: { '0': 28, '30': 45, '50': 58 }, 4000: { '0': 39, '30': 63 }, 8000: { '0': 52 } },
    6800: { 0: { '0': 30, '30': 48, '50': 62 }, 4000: { '0': 42, '30': 68 }, 8000: { '0': 56 } },
    7000: { 0: { '0': 33, '30': 53, '50': 68 }, 4000: { '0': 46, '30': 75 }, 8000: { '0': 60 } }
  },

  landingOEI: {
    4400: { 0: { '0': 150, '30': 195 }, 8000: { '0': 220 } },
    4800: { 0: { '0': 165, '30': 215 }, 8000: { '0': 240 } },
    5200: { 0: { '0': 180, '30': 232 }, 8000: { '0': 260 } },
    5600: { 0: { '0': 195, '30': 250 }, 8000: { '0': 280 } },
    6000: { 0: { '0': 210, '30': 268 }, 8000: { '0': 300 } },
    6400: { 0: { '0': 210, '30': 270, '50': 315 }, 4000: { '0': 260, '30': 335 }, 8000: { '0': 305 } },
    6800: { 0: { '0': 230, '30': 290, '50': 340 }, 4000: { '0': 280, '30': 360 }, 8000: { '0': 325 } },
    7000: { 0: { '0': 240, '30': 305, '50': 355 }, 4000: { '0': 295, '30': 378 }, 8000: { '0': 345 } }
  }
};

function ldgClamp(v, min, max){ return Math.max(min, Math.min(max, v)); }
function ldgLerp(x, x0, x1, y0, y1){
  if (x1 === x0) return y0;
  return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}
function ldgNeighbors(arr, v){
  if (v <= arr[0]) return [arr[0], arr[0]];
  if (v >= arr[arr.length-1]) return [arr[arr.length-1], arr[arr.length-1]];
  for (let i=0; i<arr.length-1; i++){
    if (v >= arr[i] && v <= arr[i+1]) return [arr[i], arr[i+1]];
  }
  return [arr[0], arr[arr.length-1]];
}

function ldgValueAtWeightAltitude(table, weight, altitude){
  const wData = table[weight];
  if (!wData) return null;
  const altKeys = Object.keys(wData).map(Number).sort((a,b)=>a-b);
  if (altKeys.length === 0) return null;
  const [a0, a1] = ldgNeighbors(altKeys, altitude);

  function valueAtOat(altKey, oat){
    const m = wData[altKey];
    const oatKeys = Object.keys(m).map(Number).sort((a,b)=>a-b);
    if (oatKeys.length === 1) return m[oatKeys[0]];
    const [o0, o1] = ldgNeighbors(oatKeys, oat);
    if (o0 === o1) return m[o0];
    return ldgLerp(oat, o0, o1, m[o0], m[o1]);
  }

  return { a0, a1, valueAtOat };
}

function ldgInterpolate3D(table, weights, weight, altitude, oat){
  const wKeys = weights.filter(w => table[w]).sort((a,b)=>a-b);
  if (wKeys.length === 0) return null;
  const [w0, w1] = ldgNeighbors(wKeys, weight);

  function valueAtWeight(w){
    const res = ldgValueAtWeightAltitude(table, w, altitude);
    if (!res) return null;
    const { a0, a1, valueAtOat } = res;
    if (a0 === a1) return valueAtOat(a0, oat);
    const v0 = valueAtOat(a0, oat);
    const v1 = valueAtOat(a1, oat);
    return ldgLerp(altitude, a0, a1, v0, v1);
  }

  const vw0 = valueAtWeight(w0);
  const vw1 = valueAtWeight(w1);
  if (vw0 === null) return vw1;
  if (vw1 === null) return vw0;
  if (w0 === w1) return vw0;
  return ldgLerp(weight, w0, w1, vw0, vw1);
}

function ldgGetMaxOatLimit(altitude){
  const pts = LDG_DATASET.maxOatLimit.slice().sort((a,b)=>a.altitude-b.altitude);
  const alts = pts.map(p=>p.altitude);
  const [a0, a1] = ldgNeighbors(alts, altitude);
  if (a0 === a1){
    return pts.find(p=>p.altitude===a0).oat;
  }
  const p0 = pts.find(p=>p.altitude===a0);
  const p1 = pts.find(p=>p.altitude===a1);
  return ldgLerp(altitude, a0, a1, p0.oat, p1.oat);
}

function calcLdgAndBraking(weight, altitude, oat){
  const w = ldgClamp(weight, LDG_DATASET.weights[0], LDG_DATASET.weights[LDG_DATASET.weights.length-1]);
  const maxOat = ldgGetMaxOatLimit(altitude);
  const exceedsLimit = oat > maxOat;
  const landingOEI = ldgInterpolate3D(LDG_DATASET.landingOEI, LDG_DATASET.weights, w, altitude, oat);
  const braking = ldgInterpolate3D(LDG_DATASET.braking, LDG_DATASET.weights, w, altitude, oat);
  return {
    landingOEI: landingOEI !== null ? Math.round(landingOEI) : null,
    braking: braking !== null ? Math.round(braking) : null,
    maxOat: Math.round(maxOat * 10) / 10,
    exceedsLimit
  };
}

// ---------------------------------------------------------------
// UI — ABA LANDING OEI
// ---------------------------------------------------------------
const ldgPesoInput = document.getElementById('ldgPeso');
const ldgAltInput = document.getElementById('ldgAlt');
const ldgOatInput = document.getElementById('ldgOat');
const ldgResultLanding = document.getElementById('ldgResultLanding');
const ldgResultBraking = document.getElementById('ldgResultBraking');
const ldgResultTotal = document.getElementById('ldgResultTotal');
const ldgNoticeMaxOat = document.getElementById('ldgNoticeMaxOat');
const ldgNoticeInvalid = document.getElementById('ldgNoticeInvalid');
const ldgMaxOatValue = document.getElementById('ldgMaxOatValue');

// combobox de pistas (mesma lista da aba RTO)
const ldgPistaSelect = document.getElementById('ldgPista');
RUNWAYS.forEach(rw => {
  const opt = document.createElement('option');
  opt.value = rw.len;
  opt.textContent = `${rw.name} - ${rw.len} m`;
  ldgPistaSelect.appendChild(opt);
});
const ldgRunwayCompare = document.getElementById('ldgRunwayCompare');
const ldgRcText = document.getElementById('ldgRcText');
const ldgRcMargin = document.getElementById('ldgRcMargin');
let ldgLastTotal = null;   // distância total (landing OEI + braking) do último cálculo

function ldgUpdatePistaState(){
  const sel = ldgPistaSelect;
  sel.classList.remove('state-green', 'state-red', 'state-empty');
  ldgRunwayCompare.classList.remove('visible', 'ok', 'bad');
  ldgRcText.classList.remove('ok', 'bad');

  if (!sel.value || ldgLastTotal === null) {
    sel.classList.add('state-empty');
    return;
  }

  const margin = parseFloat(sel.value) - ldgLastTotal;
  if (margin >= 0) {
    sel.classList.add('state-green');
    ldgRunwayCompare.classList.add('visible', 'ok');
    ldgRcText.classList.add('ok');
    ldgRcText.textContent = 'Pista suficiente';
    ldgRcMargin.textContent = '+' + Math.round(margin).toLocaleString('pt-BR') + ' m de margem';
  } else {
    sel.classList.add('state-red');
    ldgRunwayCompare.classList.add('visible', 'bad');
    ldgRcText.classList.add('bad');
    ldgRcText.textContent = 'Pista insuficiente';
    ldgRcMargin.textContent = Math.round(margin).toLocaleString('pt-BR') + ' m de déficit';
  }
}

function ldgResetVisual(){
  ldgLastTotal = null;
  ldgResultLanding.textContent = '—';
  ldgResultLanding.classList.add('pending');
  ldgResultBraking.textContent = '—';
  ldgResultBraking.classList.add('pending');
  ldgResultTotal.textContent = '—';
  ldgResultTotal.classList.add('pending');
  ldgNoticeMaxOat.classList.remove('visible');
  ldgNoticeInvalid.classList.remove('visible');
  ldgUpdatePistaState();
}

function ldgCompute(){
  ldgNoticeMaxOat.classList.remove('visible');
  ldgNoticeInvalid.classList.remove('visible');

  const pesoRaw = parseFloat(ldgPesoInput.value);
  const peso = (!isNaN(pesoRaw) && window.AW && window.AW.lang === 'en') ? pesoRaw / 2.20462262 : pesoRaw;
  const alt = parseFloat(ldgAltInput.value);
  const oat = parseFloat(ldgOatInput.value);

  if (isNaN(peso) || isNaN(alt) || isNaN(oat)) {
    ldgResetVisual();
    ldgNoticeInvalid.classList.add('visible');
    return;
  }

  const r = calcLdgAndBraking(peso, alt, oat);

  ldgResultLanding.textContent = r.landingOEI !== null ? r.landingOEI.toLocaleString('pt-BR') : '—';
  ldgResultLanding.classList.toggle('pending', r.landingOEI === null);
  ldgResultBraking.textContent = r.braking !== null ? r.braking.toLocaleString('pt-BR') : '—';
  ldgResultBraking.classList.toggle('pending', r.braking === null);

  if (r.landingOEI !== null && r.braking !== null) {
    const total = r.landingOEI + r.braking;
    ldgResultTotal.textContent = total.toLocaleString('pt-BR');
    ldgResultTotal.classList.remove('pending');
    ldgLastTotal = total;
  } else {
    ldgResultTotal.textContent = '—';
    ldgResultTotal.classList.add('pending');
    ldgLastTotal = null;
  }
  ldgUpdatePistaState();

  if (r.exceedsLimit) {
    ldgMaxOatValue.textContent = r.maxOat;
    ldgNoticeMaxOat.classList.add('visible');
  }
}

[ldgPesoInput, ldgAltInput, ldgOatInput].forEach(el => {
  el.addEventListener('input', ldgCompute);
  el.addEventListener('input', updateClearBtnState);
});

ldgPistaSelect.addEventListener('change', ldgUpdatePistaState);
ldgPistaSelect.addEventListener('change', updateClearBtnState);

ldgResetVisual();

// estado inicial do botão LIMPAR (agora que todas as referências
// de ambas as abas já foram declaradas)
updateClearBtnState();
