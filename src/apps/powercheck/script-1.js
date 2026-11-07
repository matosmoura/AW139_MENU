
// ---------------------------------------------------------------------------
// DADOS — extraídos das fichas AW-139 Power Check (Suplementos 86 e 12, RFM)
// ---------------------------------------------------------------------------
var ALTITUDES = [-1000, -500, -250, -125, 0, 125, 250, 500, 1000];
var OATS = [0, 5, 10, 15, 20, 25, 30, 35, 40];

var DATA = {
  IBF: {
    label: "IBF Installed",
    sub: "Suplemento 86 · Rev 02",
    T95: {
      itt: [
        [610, 625, 640, 654, 668, 683, 698, 713, 728],
        [613, 628, 643, 656, 670, 685, 700, 715, 730],
        [614, 629, 644, 657, 671, 686, 701, 716, 731],
        [614, 629, 644, 658, 672, 687, 702, 717, 732],
        [615, 630, 645, 659, 672, 687, 702, 717, 732],
        [616, 631, 646, 659, 673, 688, 703, 718, 733],
        [617, 632, 647, 660, 674, 689, 704, 719, 734],
        [618, 633, 648, 662, 677, 691, 706, 721, 735],
        [621, 636, 651, 666, 681, 696, 710, 724, 738],
      ],
      ng: [
        [89.8, 90.5, 91.2, 91.9, 92.5, 93.2, 93.8, 94.4, 95.0],
        [90.0, 90.7, 91.4, 92.0, 92.7, 93.3, 94.0, 94.6, 95.3],
        [90.0, 90.7, 91.4, 92.1, 92.7, 93.4, 94.1, 94.7, 95.4],
        [90.1, 90.8, 91.5, 92.1, 92.8, 93.5, 94.2, 94.8, 95.4],
        [90.1, 90.8, 91.5, 92.2, 92.8, 93.5, 94.2, 94.9, 95.5],
        [90.2, 90.9, 91.6, 92.2, 92.9, 93.6, 94.3, 94.9, 95.6],
        [90.3, 91.0, 91.6, 92.3, 92.9, 93.6, 94.3, 95.0, 95.6],
        [90.5, 91.1, 91.8, 92.4, 93.1, 93.8, 94.4, 95.1, 95.8],
        [90.8, 91.4, 92.0, 92.7, 93.4, 94.0, 94.6, 95.3, 96.0],
      ],
    },
    T90: {
      itt: [
        [602, 617, 632, 646, 660, 675, 690, 704, 718],
        [605, 620, 635, 649, 663, 678, 693, 706, 720],
        [607, 622, 637, 650, 664, 679, 694, 707, 721],
        [607, 622, 637, 651, 664, 679, 694, 708, 722],
        [608, 623, 638, 652, 665, 680, 695, 709, 723],
        [609, 624, 639, 652, 666, 681, 696, 709, 724],
        [610, 625, 640, 653, 667, 683, 696, 710, 726],
        [611, 626, 641, 655, 668, 683, 698, 712, 726],
        [614, 629, 644, 658, 671, 686, 700, 715, 730],
      ],
      ng: [
        [89.2, 89.9, 90.5, 91.2, 91.8, 92.4, 93.0, 93.7, 94.4],
        [89.4, 90.0, 90.7, 91.3, 92.0, 92.6, 93.2, 93.9, 94.5],
        [89.4, 90.1, 90.7, 91.4, 92.0, 92.7, 93.3, 93.9, 94.6],
        [89.5, 90.1, 90.8, 91.4, 92.1, 92.7, 93.4, 94.0, 94.6],
        [89.5, 90.2, 90.8, 91.5, 92.1, 92.8, 93.4, 94.0, 94.6],
        [89.6, 90.2, 90.9, 91.6, 92.3, 92.9, 93.5, 94.1, 94.7],
        [89.6, 90.3, 90.9, 91.7, 92.3, 93.0, 93.6, 94.2, 94.8],
        [89.8, 90.4, 91.0, 91.9, 92.4, 93.3, 93.7, 94.3, 94.9],
        [90.0, 90.6, 91.2, 92.0, 92.6, 93.0, 93.7, 94.3, 94.9],
      ],
    },
  },
  EAPS: {
    label: "EAPS Installed",
    sub: "Suplemento 12 · Rev 00",
    T95: {
      itt: [
        [620, 635, 650, 664, 678, 693, 707, 722, 737],
        [623, 638, 653, 667, 681, 696, 711, 726, 741],
        [624, 639, 654, 668, 683, 697, 712, 727, 742],
        [624, 639, 654, 669, 683, 698, 713, 728, 743],
        [625, 640, 655, 670, 684, 699, 714, 729, 744],
        [626, 641, 656, 670, 685, 700, 715, 730, 745],
        [627, 641, 656, 671, 686, 701, 716, 730, 745],
        [628, 643, 658, 672, 687, 702, 717, 732, 747],
        [631, 646, 660, 675, 690, 705, 720, 735, 749],
      ],
      ng: [
        [89.7, 90.0, 91.0, 92.0, 92.3, 93.0, 93.7, 94.3, 94.9],
        [89.9, 90.6, 91.2, 91.9, 92.6, 93.2, 93.9, 94.5, 95.2],
        [90.0, 90.7, 91.3, 92.0, 92.7, 93.3, 94.0, 94.6, 95.3],
        [90.1, 90.7, 91.4, 92.0, 92.7, 93.4, 94.1, 94.7, 95.3],
        [90.1, 91.0, 91.4, 92.0, 92.8, 93.0, 94.1, 94.7, 95.4],
        [90.2, 90.8, 91.5, 92.2, 92.9, 93.5, 94.2, 94.8, 95.5],
        [90.2, 90.9, 91.5, 92.2, 92.9, 93.6, 94.2, 94.9, 95.5],
        [90.4, 91.0, 91.7, 92.4, 93.1, 93.7, 94.4, 95.0, 95.6],
        [90.6, 91.0, 91.9, 92.6, 93.3, 94.0, 94.6, 95.0, 95.8],
      ],
    },
    T90: {
      itt: [
        [614, 629, 644, 658, 672, 685, 698, 713, 727],
        [616, 631, 646, 660, 674, 687, 701, 716, 730],
        [617, 632, 647, 661, 674, 688, 703, 717, 732],
        [618, 633, 648, 661, 675, 689, 703, 718, 732],
        [618, 633, 648, 662, 675, 690, 704, 719, 733],
        [619, 634, 649, 662, 676, 690, 705, 719, 734],
        [619, 634, 649, 663, 677, 691, 706, 720, 735],
        [620, 635, 650, 664, 679, 693, 708, 722, 737],
        [622, 637, 652, 667, 682, 697, 711, 726, 741],
      ],
      ng: [
        [89.1, 89.3, 89.4, 89.5, 89.6, 89.8, 89.9, 90.0, 90.2],
        [89.3, 90.0, 90.1, 90.1, 90.2, 90.5, 90.7, 90.8, 90.9],
        [89.4, 90.1, 90.7, 91.4, 92.1, 92.7, 93.3, 93.9, 94.5],
        [89.5, 90.1, 90.8, 91.5, 92.2, 92.8, 93.4, 94.0, 94.7],
        [89.5, 90.2, 90.8, 91.5, 92.2, 92.8, 93.4, 94.1, 94.7],
        [89.6, 90.3, 90.9, 91.6, 92.3, 92.9, 93.5, 94.1, 94.8],
        [89.6, 90.3, 91.0, 91.6, 92.3, 93.0, 93.6, 94.2, 94.8],
        [89.7, 90.4, 91.1, 91.8, 92.4, 93.1, 93.7, 94.3, 94.9],
        [89.9, 90.6, 91.3, 92.0, 92.6, 93.3, 93.9, 94.5, 95.2],
      ],
    },
  },
  NONE: {
    label: "IBF/EAPS Not Installed",
    sub: "Suplemento 12 · Rev 02",
    T95: {
      itt: [
        [600, 615, 630, 645, 659, 674, 688, 703, 717],
        [603, 617, 632, 647, 661, 676, 690, 705, 720],
        [604, 618, 633, 648, 662, 677, 691, 706, 721],
        [604, 619, 634, 648, 663, 677, 692, 706, 721],
        [605, 620, 634, 649, 663, 678, 692, 707, 722],
        [605, 620, 635, 649, 664, 678, 692, 707, 722],
        [606, 620, 635, 650, 664, 678, 693, 708, 723],
        [607, 621, 636, 651, 665, 679, 694, 709, 724],
        [608, 623, 638, 653, 667, 681, 695, 710, 725],
      ],
      ng: [
        [89.1, 89.8, 90.5, 91.2, 91.8, 92.5, 93.1, 93.8, 94.4],
        [89.3, 90.0, 90.7, 91.3, 92.0, 92.7, 93.3, 94.0, 94.6],
        [89.4, 90.1, 90.7, 91.4, 92.1, 92.8, 93.4, 94.1, 94.7],
        [89.5, 90.1, 90.8, 91.5, 92.2, 92.8, 93.5, 94.1, 94.8],
        [89.5, 90.2, 90.8, 91.5, 92.2, 92.9, 93.5, 94.2, 94.8],
        [89.5, 90.2, 90.8, 91.5, 92.2, 92.9, 93.5, 94.2, 94.8],
        [89.6, 90.2, 90.9, 91.6, 92.3, 92.9, 93.6, 94.2, 94.9],
        [89.6, 90.3, 91.0, 91.6, 92.3, 93.0, 93.6, 94.3, 94.9],
        [89.7, 90.4, 91.1, 91.8, 92.4, 93.1, 93.7, 94.4, 95.1],
      ],
    },
    T90: {
      itt: [
        [594, 609, 624, 638, 652, 666, 680, 694, 708],
        [596, 611, 626, 640, 655, 669, 683, 697, 711],
        [596, 611, 626, 641, 656, 670, 684, 698, 713],
        [597, 612, 627, 642, 656, 670, 684, 699, 713],
        [597, 612, 627, 642, 657, 671, 685, 700, 714],
        [598, 613, 628, 643, 658, 672, 686, 700, 715],
        [599, 613, 628, 643, 658, 672, 686, 701, 716],
        [600, 615, 630, 645, 660, 674, 688, 702, 717],
        [603, 618, 632, 647, 662, 676, 690, 705, 720],
      ],
      ng: [
        [88.6, 89.3, 90.0, 90.7, 91.3, 92.0, 92.6, 93.2, 93.8],
        [88.8, 89.5, 90.2, 90.8, 91.5, 92.1, 92.8, 93.4, 94.0],
        [88.8, 89.5, 90.2, 90.9, 91.5, 92.2, 92.8, 93.5, 94.1],
        [88.9, 89.6, 90.3, 90.9, 91.6, 92.2, 92.9, 93.5, 94.2],
        [88.9, 89.6, 90.3, 91.0, 91.6, 92.3, 92.9, 93.6, 94.2],
        [89.0, 89.7, 90.4, 91.1, 91.7, 92.3, 93.0, 93.6, 94.3],
        [89.0, 89.7, 90.4, 91.1, 91.7, 92.4, 93.0, 93.7, 94.3],
        [89.1, 89.8, 90.5, 91.2, 91.8, 92.5, 93.2, 93.8, 94.4],
        [89.3, 90.0, 90.7, 91.4, 92.0, 92.7, 93.4, 94.0, 94.6],
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// INTERPOLAÇÃO BILINEAR (altitude x OAT)
// ---------------------------------------------------------------------------
function findBracket(arr, value) {
  if (value <= arr[0]) return [0, 0];
  if (value >= arr[arr.length - 1]) return [arr.length - 1, arr.length - 1];
  for (var i = 0; i < arr.length - 1; i++) {
    if (value >= arr[i] && value <= arr[i + 1]) return [i, i + 1];
  }
  return [0, 0];
}

function lerp(x0, x1, y0, y1, x) {
  if (x1 === x0) return y0;
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
}

function bilinear(matrix, altitude, oat) {
  var b1 = findBracket(ALTITUDES, altitude);
  var ai0 = b1[0], ai1 = b1[1];
  var b2 = findBracket(OATS, oat);
  var oi0 = b2[0], oi1 = b2[1];

  var a0 = ALTITUDES[ai0], a1 = ALTITUDES[ai1];
  var o0 = OATS[oi0], o1 = OATS[oi1];

  var rowLow = lerp(o0, o1, matrix[ai0][oi0], matrix[ai0][oi1], oat);
  var rowHigh = lerp(o0, o1, matrix[ai1][oi0], matrix[ai1][oi1], oat);

  return lerp(a0, a1, rowLow, rowHigh, altitude);
}

function round1(n) { return Math.round(n * 10) / 10; }

// ---------------------------------------------------------------------------
// ESTADO DA APLICAÇÃO
// ---------------------------------------------------------------------------
var state = {
  config: "NONE",
  torqueRef: "T90",
  altitudeAbs: "",
  altitudeSign: "pos",
  oat: "",
  ng1: "", itt1: "", ng2: "", itt2: "",
  registration: "",
  dateTime: "",
  result: null,
  reportHtml: null,
};

var CONFIGS = [
  { key: "NONE", label: "IBF/EAPS Não Instalado" },
  { key: "IBF", label: "IBF Installed" },
  { key: "EAPS", label: "EAPS Installed" },
];
var TORQUES = [
  { key: "T90", label: "90%" },
  { key: "T95", label: "95%" },
];

// ---------------------------------------------------------------------------
// RENDER: seção 01 - configuração
// ---------------------------------------------------------------------------
function renderConfigOptions() {
  var el = document.getElementById("configOptions");
  el.innerHTML = "";
  CONFIGS.forEach(function (c) {
    var btn = document.createElement("button");
    btn.className = "pc-seg-btn" + (state.config === c.key ? " is-active" : "");
    btn.textContent = c.label;
    btn.addEventListener("click", function () {
      state.config = c.key;
      renderConfigOptions();
      renderConfigTag();
    });
    el.appendChild(btn);
  });
}

function renderTorqueOptions() {
  var el = document.getElementById("torqueOptions");
  el.innerHTML = "";
  TORQUES.forEach(function (t) {
    var btn = document.createElement("button");
    btn.className = "pc-seg-btn" + (state.torqueRef === t.key ? " is-active" : "");
    btn.textContent = t.label;
    btn.addEventListener("click", function () {
      state.torqueRef = t.key;
      renderTorqueOptions();
      renderConfigTag();
    });
    el.appendChild(btn);
  });
}

function renderConfigTag() {
  var el = document.getElementById("configTag");
  var torqueLabel = state.torqueRef === "T90" ? "90%" : "95%";
  el.textContent = DATA[state.config].label + " · Torque " + torqueLabel;
}

// ---------------------------------------------------------------------------
// Campo de altitude com sinal (POS/NEG)
// ---------------------------------------------------------------------------
// O sinal agora é digitado no próprio campo pelo atalho ± (como no CAT B e no W.A.T).
function updateSignButton() { /* sem estado visual: o "-" aparece no campo */ }

function syncAltitudeFromInput() {
  var el = document.getElementById("altitudeAbs");
  var raw = el.value;
  var neg = raw.trim().charAt(0) === "-";
  var abs = raw.replace(/[^0-9.,]/g, "");
  el.value = (neg ? "-" : "") + abs;
  state.altitudeAbs = abs;
  state.altitudeSign = neg ? "neg" : "pos";
}

document.getElementById("altitudeAbs").addEventListener("input", syncAltitudeFromInput);

document.getElementById("signBtn").addEventListener("click", function () {
  var el = document.getElementById("altitudeAbs");
  var v = el.value.trim();
  el.value = v.charAt(0) === "-" ? v.slice(1) : "-" + v;
  syncAltitudeFromInput();
  el.focus();
});

// ---------------------------------------------------------------------------
// Demais campos simples
// ---------------------------------------------------------------------------
["oat", "ng1", "itt1", "ng2", "itt2"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function (e) {
    state[id] = e.target.value;
  });
});

document.getElementById("registration").addEventListener("input", function (e) {
  var v = e.target.value.toUpperCase();
  e.target.value = v;
  state.registration = v;
});

document.getElementById("dateTime").addEventListener("click", function () {
  var now = new Date();
  function pad(n) { return String(n).padStart(2, "0"); }
  var formatted = pad(now.getDate()) + "/" + pad(now.getMonth() + 1) + "/" + now.getFullYear() + " " + pad(now.getHours()) + ":" + pad(now.getMinutes());
  state.dateTime = formatted;
  document.getElementById("dateTime").value = formatted;
});

// ---------------------------------------------------------------------------
// Cálculo do Power Check
// ---------------------------------------------------------------------------
function parseNum(v) {
  return parseFloat(String(v).replace(",", "."));
}

function handleCalc() {
  var errEl = document.getElementById("calcError");
  errEl.innerHTML = "";
  document.getElementById("resultSection").style.display = "none";
  state.result = null;

  var altAbsV = parseNum(state.altitudeAbs);
  var altV = isNaN(altAbsV) ? NaN : (state.altitudeSign === "neg" ? -Math.abs(altAbsV) : Math.abs(altAbsV));
  var oatV = parseNum(state.oat);
  var ng1V = parseNum(state.ng1);
  var itt1V = parseNum(state.itt1);
  var ng2V = parseNum(state.ng2);
  var itt2V = parseNum(state.itt2);

  if (isNaN(altV) || isNaN(oatV)) {
    errEl.innerHTML = '<div class="pc-error">Preencha altitude e OAT com valores numéricos válidos.</div>';
    return;
  }

  // cada motor pode ser calculado separadamente: NG e ITT juntos, ou ambos vazios
  function pairStatus(ng, itt) {
    var a = isNaN(ng), b = isNaN(itt);
    if (a && b) return "empty";
    if (a || b) return "partial";
    return "ok";
  }
  var st1 = pairStatus(ng1V, itt1V);
  var st2 = pairStatus(ng2V, itt2V);
  if (st1 === "partial" || st2 === "partial") {
    errEl.innerHTML = '<div class="pc-error">Preencha NG e ITT do motor (os dois valores) ou deixe os dois vazios.</div>';
    return;
  }
  if (st1 === "empty" && st2 === "empty") {
    errEl.innerHTML = '<div class="pc-error">Preencha NG e ITT de pelo menos um motor.</div>';
    return;
  }

  var ALT_MIN = ALTITUDES[0], ALT_MAX = ALTITUDES[ALTITUDES.length - 1];
  var OAT_MIN = OATS[0], OAT_MAX = OATS[OATS.length - 1];

  if (altV < ALT_MIN || altV > ALT_MAX) {
    errEl.innerHTML = '<div class="pc-error">Altitude fora da faixa da tabela (' + ALT_MIN + ' a ' + ALT_MAX + ' ft). Não é possível calcular.</div>';
    return;
  }
  if (oatV < OAT_MIN || oatV > OAT_MAX) {
    errEl.innerHTML = '<div class="pc-error">OAT fora da faixa da tabela (' + OAT_MIN + ' a ' + OAT_MAX + ' °C). Não é possível calcular.</div>';
    return;
  }

  var configData = DATA[state.config][state.torqueRef];
  var ngTable = round1(bilinear(configData.ng, altV, oatV));
  var ittTable = round1(bilinear(configData.itt, altV, oatV));

  function buildEngineResult(ngV, ittV) {
    var deltaNg = round1(ngTable - ngV);
    var deltaItt = round1(ittTable - ittV);
    var ngOk = deltaNg >= 0;
    var ittOk = deltaItt >= 0;
    return { ngV: ngV, ittV: ittV, deltaNg: deltaNg, deltaItt: deltaItt, ngOk: ngOk, ittOk: ittOk, approved: ngOk && ittOk };
  }

  var engine1 = st1 === "ok" ? buildEngineResult(ng1V, itt1V) : null;
  var engine2 = st2 === "ok" ? buildEngineResult(ng2V, itt2V) : null;

  state.result = {
    ngTable: ngTable, ittTable: ittTable, altV: altV, oatV: oatV,
    engine1: engine1, engine2: engine2,
    approved: [engine1, engine2].filter(Boolean).every(function (e) { return e.approved; }),
  };

  renderResult();
}

function engineRowsHtml(eng) {
  return (
    '<div class="pc-table-row">' +
      '<span>ITT °C</span>' +
      '<span>' + state.result.ittTable.toFixed(1) + '</span>' +
      '<span>' + eng.ittV.toFixed(1) + '</span>' +
      '<span class="' + (eng.ittOk ? "pc-pos" : "pc-neg") + '">' + (eng.deltaItt > 0 ? "+" : "") + eng.deltaItt.toFixed(1) + '</span>' +
    '</div>' +
    '<div class="pc-table-row">' +
      '<span>NG %</span>' +
      '<span>' + state.result.ngTable.toFixed(1) + '</span>' +
      '<span>' + eng.ngV.toFixed(1) + '</span>' +
      '<span class="' + (eng.ngOk ? "pc-pos" : "pc-neg") + '">' + (eng.deltaNg > 0 ? "+" : "") + eng.deltaNg.toFixed(1) + '</span>' +
    '</div>'
  );
}

function renderResult() {
  var section = document.getElementById("resultSection");
  var r = state.result;
  section.className = "pc-card pc-result " + (r.approved ? "is-approved" : "is-rejected");
  section.style.display = "";

  var html = '';
  html += '<div class="pc-result-head">';
  html += '<h2 class="pc-card-title">03 — Resultado</h2>';
  html += '<div class="pc-badge ' + (r.approved ? "pc-badge-ok" : "pc-badge-fail") + '">' + (r.approved ? "APROVADO" : "REPROVADO") + '</div>';
  html += '</div>';
  html += '<p class="pc-result-context">' + DATA[state.config].label + ' · Torque ' + (state.torqueRef === "T90" ? "90%" : "95%") + ' · Alt ' + r.altV + ' ft · OAT ' + r.oatV + '°C</p>';

  [{ label: "MOTOR 1", data: r.engine1 }, { label: "MOTOR 2", data: r.engine2 }].filter(function (e) { return e.data; }).forEach(function (eng) {
    html += '<div class="pc-engine-result">';
    html += '<div class="pc-engine-result-head">';
    html += '<span class="pc-engine-title">' + eng.label + '</span>';
    html += '<div class="pc-badge pc-badge-sm ' + (eng.data.approved ? "pc-badge-ok" : "pc-badge-fail") + '">' + (eng.data.approved ? "APROVADO" : "REPROVADO") + '</div>';
    html += '</div>';
    html += '<div class="pc-table">';
    html += '<div class="pc-table-row pc-table-head"><span></span><span>TGT</span><span>LIDO</span><span>TOT</span></div>';
    html += engineRowsHtml(eng.data);
    html += '</div></div>';
  });

  html += '<p class="pc-result-note">Diferença = valor da tabela (interpolado) − valor informado. Diferença negativa (vermelho) em NG ou ITT reprova o Power Check daquele motor.</p>';

  section.innerHTML = html;
}

function handleReset() {
  state.altitudeAbs = "";
  state.altitudeSign = "pos";
  state.oat = "";
  state.ng1 = ""; state.itt1 = ""; state.ng2 = ""; state.itt2 = "";
  state.result = null;

  document.getElementById("altitudeAbs").value = "";
  document.getElementById("oat").value = "";
  document.getElementById("ng1").value = "";
  document.getElementById("itt1").value = "";
  document.getElementById("ng2").value = "";
  document.getElementById("itt2").value = "";
  document.getElementById("calcError").innerHTML = "";
  document.getElementById("resultSection").style.display = "none";
  updateSignButton();
  closeReport();
}

document.getElementById("calcBtn").addEventListener("click", handleCalc);
document.getElementById("resetBtn").addEventListener("click", handleReset);

// ---------------------------------------------------------------------------
// RELATÓRIO (HTML)
// ---------------------------------------------------------------------------
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildReportHtml() {
  var r = state.result;
  var configLabel = DATA[state.config].label;
  var torqueLabel = state.torqueRef === "T90" ? "90%" : "95%";

  function engineBlock(label, eng) {
    return (
      '<div class="engine">' +
        '<div class="engine-head">' +
          '<span class="engine-title">' + esc(label) + '</span>' +
          '<span class="badge ' + (eng.approved ? "ok" : "fail") + '">' + (eng.approved ? "APROVADO" : "REPROVADO") + '</span>' +
        '</div>' +
        '<table><thead><tr><th>Parâmetro</th><th>Tabela</th><th>Informado</th><th>Diferença</th></tr></thead><tbody>' +
          '<tr><td>ITT °C</td><td>' + r.ittTable.toFixed(1) + '</td><td>' + eng.ittV.toFixed(1) + '</td>' +
          '<td class="' + (eng.ittOk ? "pos" : "neg") + '">' + (eng.deltaItt > 0 ? "+" : "") + eng.deltaItt.toFixed(1) + '</td></tr>' +
          '<tr><td>NG %</td><td>' + r.ngTable.toFixed(1) + '</td><td>' + eng.ngV.toFixed(1) + '</td>' +
          '<td class="' + (eng.ngOk ? "pos" : "neg") + '">' + (eng.deltaNg > 0 ? "+" : "") + eng.deltaNg.toFixed(1) + '</td></tr>' +
        '</tbody></table>' +
      '</div>'
    );
  }

  return (
    '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8" />' +
    '<title>Power Check AW139 - ' + esc(state.registration || "") + '</title>' +
    '<style>' +
    '*{box-sizing:border-box;}' +
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:#f4f2ec;color:#0d1b2a;margin:0;padding:24px 18px 40px;}' +
    '.sheet{max-width:640px;margin:0 auto;background:#fff;border:1px solid #d8d3c4;border-radius:10px;overflow:hidden;}' +
    '.header{background:linear-gradient(160deg,#0d1b2a 0%,#14273b 100%);color:#fff;padding:20px 22px;border-bottom:6px solid #d9a441;}' +
    '.header h1{margin:0 0 10px;font-size:20px;font-weight:800;}' +
    '.header .meta{font-size:12.5px;color:#cfd9e2;line-height:1.6;}' +
    '.section{padding:18px 22px;border-bottom:1px solid #eee;}' +
    '.section:last-of-type{border-bottom:none;}' +
    '.section h2{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#3a5875;margin:0 0 10px;}' +
    '.row{display:flex;justify-content:space-between;font-size:13.5px;padding:3px 0;}' +
    '.row span:first-child{color:#5b6b7a;}.row span:last-child{font-weight:600;}' +
    '.overall{display:flex;align-items:center;justify-content:space-between;padding:16px 22px;}' +
    '.overall h2{margin:0;font-size:14px;color:#0d1b2a;}' +
    '.badge{display:inline-block;font-size:11.5px;font-weight:800;letter-spacing:.04em;padding:5px 12px;border-radius:999px;}' +
    '.badge.ok{background:#e7f2ec;color:#2f6b4f;}.badge.fail{background:#fbeae7;color:#a8382c;}' +
    '.engine{padding:16px 22px;border-top:1px solid #eee;}' +
    '.engine-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}' +
    '.engine-title{font-size:11.5px;font-weight:800;letter-spacing:.05em;color:#3a5875;}' +
    'table{width:100%;border-collapse:collapse;font-size:13px;}' +
    'th,td{text-align:left;padding:7px 6px;}' +
    'thead th{font-size:10.5px;text-transform:uppercase;letter-spacing:.02em;color:#7c8894;border-bottom:1px solid #d8d3c4;}' +
    'tbody td{border-bottom:1px solid #eee;}' +
    'td.pos{color:#2f6b4f;font-weight:700;}td.neg{color:#a8382c;font-weight:700;}' +
    '.disclaimer{padding:14px 22px 20px;font-size:11px;color:#9aa4ac;line-height:1.5;}' +
    '</style></head><body>' +
    '<div class="sheet">' +
      '<div class="header"><h1>POWER CHECK - AW139</h1>' +
      '<div class="meta">Matrícula: ' + esc(state.registration || "-") + '<br />Data/Hora: ' + esc(state.dateTime || "-") + '</div></div>' +
      '<div class="section"><h2>Configuração</h2>' +
      '<div class="row"><span>Filtro de admissão</span><span>' + esc(configLabel) + '</span></div>' +
      '<div class="row"><span>Torque de referência</span><span>' + torqueLabel + '</span></div>' +
      '<div class="row"><span>RPM</span><span>102 %</span></div></div>' +
      '<div class="section"><h2>Condições</h2>' +
      '<div class="row"><span>Altitude pressão</span><span>' + r.altV + ' ft</span></div>' +
      '<div class="row"><span>OAT</span><span>' + r.oatV + ' °C</span></div>' +
      '<div class="row"><span>ITT tabela (interpolada)</span><span>' + r.ittTable.toFixed(1) + ' °C</span></div>' +
      '<div class="row"><span>NG tabela (interpolada)</span><span>' + r.ngTable.toFixed(1) + ' %</span></div></div>' +
      '<div class="overall"><h2>Resultado geral</h2><span class="badge ' + (r.approved ? "ok" : "fail") + '">' + (r.approved ? "APROVADO" : "REPROVADO") + '</span></div>' +
      (r.engine1 ? engineBlock("MOTOR 1", r.engine1) : "") + (r.engine2 ? engineBlock("MOTOR 2", r.engine2) : "") +
      '<div class="disclaimer">Ferramenta de apoio ao cálculo. Consulte sempre o RFM / gráfico oficial de Power Check em caso de margens de torque diferentes de 90% ou 95%, ou de ITT/NG limítrofes.</div>' +
    '</div></body></html>'
  );
}

function handleGenerateReport() {
  var errEl = document.getElementById("reportError");
  errEl.innerHTML = "";
  document.getElementById("sendNote").innerHTML = "";

  if (!state.result) {
    errEl.innerHTML = '<div class="pc-error">Calcule o Power Check antes de gerar o relatório.</div>';
    return;
  }

  var html = buildReportHtml();
  state.reportHtml = html;

  document.getElementById("reportFrame").srcdoc = html;
  document.getElementById("reportPreview").style.display = "";
}

function closeReport() {
  state.reportHtml = null;
  document.getElementById("reportPreview").style.display = "none";
  document.getElementById("reportFrame").srcdoc = "";
  document.getElementById("reportError").innerHTML = "";
  document.getElementById("sendNote").innerHTML = "";
}

function buildShareText() {
  var r = state.result;
  if (!r) return "Power Check AW139";
  var configLabel = DATA[state.config].label;
  var torqueLabel = state.torqueRef === "T90" ? "90%" : "95%";
  var lines = [
    "POWER CHECK - AW139",
    "Matrícula: " + (state.registration || "-"),
    "Data/Hora: " + (state.dateTime || "-"),
    "",
    "Configuração: " + configLabel + " · Torque " + torqueLabel,
    "Altitude: " + r.altV + " ft · OAT: " + r.oatV + " °C",
    "",
    "Resultado geral: " + (r.approved ? "APROVADO" : "REPROVADO"),
    "",
  ];
  [["MOTOR 1", r.engine1], ["MOTOR 2", r.engine2]].forEach(function (pair) {
    var eng = pair[1];
    if (!eng) return;
    if (lines[lines.length - 1] !== "") lines.push("");
    lines.push(pair[0] + " (" + (eng.approved ? "APROVADO" : "REPROVADO") + ")");
    lines.push("  ITT: TGT " + r.ittTable.toFixed(1) + " / LIDO " + eng.ittV.toFixed(1) + " / TOT " + eng.deltaItt.toFixed(1));
    lines.push("  NG:  TGT " + r.ngTable.toFixed(1) + " / LIDO " + eng.ngV.toFixed(1) + " / TOT " + eng.deltaNg.toFixed(1));
  });
  return lines.join("\n");
}

function handleSendWhatsapp() {
  if (!state.reportHtml) {
    document.getElementById("sendNote").innerHTML = '<div class="pc-error">Gere o relatório antes de enviar.</div>';
    return;
  }
  var text = encodeURIComponent(buildShareText());
  window.open("https://wa.me/?text=" + text, "_blank", "noopener");
}

document.getElementById("generateReportBtn").addEventListener("click", handleGenerateReport);
document.getElementById("closeReportBtn").addEventListener("click", closeReport);
document.getElementById("sendWhatsappBtn").addEventListener("click", handleSendWhatsapp);

// ---------------------------------------------------------------------------
// INICIALIZAÇÃO
// ---------------------------------------------------------------------------
renderConfigOptions();
renderTorqueOptions();
renderConfigTag();
updateSignButton();
