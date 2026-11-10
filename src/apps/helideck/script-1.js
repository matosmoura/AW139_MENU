// CAT A — Limitação de peso para pouso em helideck offshore (0 ft Hp).
// Tabela do manual: peso máximo (lb) x OAT (°C) x componente de vento de proa (kt).
const HD_OAT = [15, 20, 25, 30, 35, 40];
const HD_HW  = [0, 5, 10, 15];
const HD_TAB = [
  [14994, 14994, 14994, 14994], // ≤15
  [14825, 14994, 14994, 14994], // 20
  [14640, 14994, 14994, 14994], // 25
  [14465, 14730, 14994, 14994], // 30
  [14300, 14608, 14994, 14994], // 35
  [14112, 14420, 14815, 14994]  // 40
];
const HD_KG_LB = 2.20462262;

// índice e fração dentro de um eixo crescente (valor já limitado ao eixo)
function hdBracket(axis, v) {
  let i = 0;
  while (i < axis.length - 2 && v > axis[i + 1]) i++;
  return { i: i, f: (v - axis[i]) / (axis[i + 1] - axis[i]) };
}

// Interpolação bilinear. Retorna lb (sem arredondar) e as células usadas.
function hdWeight(oat, hw) {
  const t = Math.max(HD_OAT[0], oat);
  const w = Math.min(HD_HW[HD_HW.length - 1], Math.max(0, hw));
  const r = hdBracket(HD_OAT, t), c = hdBracket(HD_HW, w);
  const a = HD_TAB[r.i][c.i], b = HD_TAB[r.i][c.i + 1];
  const d = HD_TAB[r.i + 1][c.i], e = HD_TAB[r.i + 1][c.i + 1];
  const top = a + c.f * (b - a), bot = d + c.f * (e - d);
  const cells = [];
  [[r.i, 1 - r.f], [r.i + 1, r.f]].forEach(function (R) {
    [[c.i, 1 - c.f], [c.i + 1, c.f]].forEach(function (C) {
      if (R[1] > 1e-9 && C[1] > 1e-9) cells.push(R[0] + ':' + C[0]);
    });
  });
  return { lb: top + r.f * (bot - top), cells: cells };
}

// Componentes de vento. dir = de onde o vento sopra; hdg = proa de pouso.
function hdComponents(dir, spd, hdg) {
  const ang = ((dir - hdg) % 360 + 540) % 360 - 180; // -180..180, + = vento pela direita
  const rad = ang * Math.PI / 180;
  return { hw: spd * Math.cos(rad), xw: Math.abs(spd * Math.sin(rad)), side: ang > 0.5 ? 'R' : (ang < -0.5 ? 'L' : '') };
}

const $ = function (id) { return document.getElementById(id); };
const EN = !!(window.AW && window.AW.lang === 'en');
const T = function (pt, en) { return EN ? en : pt; };
const F = ['oat', 'wdir', 'wspd', 'hdg'];
let gap = false; // chave do vão de ar (desligada = NÃO, conservador)

// textos estáticos em inglês
if (EN) {
  document.querySelectorAll('[data-en]').forEach(function (el) { el.textContent = el.getAttribute('data-en'); });
  document.querySelectorAll('[data-en-html]').forEach(function (el) { el.innerHTML = el.getAttribute('data-en-html'); });
}

function num(v) { v = (v || '').trim().replace(',', '.'); if (v === '' || v === '-') return null; const n = Number(v); return isFinite(n) ? n : null; }
function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, EN ? ',' : '.'); }
// unidade via CSS (o tradutor global troca o texto "kg" por "lb" no modo EN)
function kt(v) { const r = Math.round(v * 10) / 10; return String(r).replace('.', EN ? '.' : ',') + '<small>kt</small>'; }

function buildTable(hits) {
  const head = '<tr><th>OAT</th>' + HD_HW.map(function (h, j) { return '<th>' + (j === HD_HW.length - 1 ? '≥' : '') + h + '</th>'; }).join('') + '</tr>';
  const rows = HD_OAT.slice().reverse().map(function (o) {
    const i = HD_OAT.indexOf(o);
    return '<tr><th>' + (i === 0 ? '≤' : '') + o + '</th>' + HD_TAB[i].map(function (v, j) {
      const cls = (hits.indexOf(i + ':' + j) >= 0 ? 'hit' : '') + (v === 14994 ? ' max' : '');
      return '<td class="' + cls.trim() + '">' + v + '</td>';
    }).join('') + '</tr>';
  }).join('');
  $('tbl').innerHTML = head + rows;
}

function setMsg(cls, txt) { const m = $('msg'); m.className = 'msg' + (cls ? ' ' + cls : ''); m.innerHTML = txt || ''; }

function update() {
  const filled = F.some(function (i) { return $(i).value.trim() !== ''; }) || gap;
  $('clearBtn').classList.toggle('filled', filled);
  ['rHw', 'rXw', 'rHwUsed', 'rKg', 'rLb'].forEach(function (i) { $(i).innerHTML = '—'; $(i).classList.remove('bad'); });
  F.forEach(function (i) { $(i).classList.remove('bad'); });
  setMsg('', '');
  buildTable([]);

  const oat = num($('oat').value), dir = num($('wdir').value), spd = num($('wspd').value), hdg = num($('hdg').value);
  const errs = [];
  if (dir !== null && (dir < 0 || dir > 360)) { errs.push(T('Direção do vento deve estar entre 000° e 360°.', 'Wind direction must be between 000° and 360°.')); $('wdir').classList.add('bad'); }
  if (hdg !== null && (hdg < 0 || hdg > 360)) { errs.push(T('Proa deve estar entre 000° e 360°.', 'Heading must be between 000° and 360°.')); $('hdg').classList.add('bad'); }
  if (spd !== null && spd < 0) { errs.push(T('Velocidade do vento não pode ser negativa.', 'Wind speed cannot be negative.')); $('wspd').classList.add('bad'); }
  if (oat !== null && oat > 40) { errs.push(T('Fora da tabela — OAT acima de 40 °C. Sem dados para cálculo.', 'Outside the table — OAT above 40 °C. No data for calculation.')); $('oat').classList.add('bad'); }
  if (errs.length) { setMsg('err', errs.join('<br>')); return; }

  // componentes de vento (vento calmo dispensa direção e proa)
  let comp = null;
  if (spd !== null && spd === 0) comp = { hw: 0, xw: 0, side: '' };
  else if (spd !== null && dir !== null && hdg !== null) comp = hdComponents(dir, spd, hdg);
  if (!comp) return;

  const hwShow = Math.abs(comp.hw) < 0.05 ? 0 : comp.hw;
  $('rHw').innerHTML = hwShow < -0.05 ? T('CAUDA ', 'TAIL ') + kt(-hwShow) : kt(hwShow);
  $('rXw').innerHTML = kt(comp.xw) + (Math.round(comp.xw) > 0 && comp.side ? ' <small>' + (comp.side === 'R' ? T('DIR', 'R') : T('ESQ', 'L')) + '</small>' : '');

  // limitações de vento
  const lim = [];
  if (comp.hw < -0.05) { lim.push(T('<b>Vento de cauda</b> — decolagem ou pouso proibido.', '<b>Tailwind</b> — take-off or landing prohibited.')); $('rHw').classList.add('bad'); }
  if (comp.xw > 20 + 1e-9) { lim.push(T('<b>Vento de través acima de 20 kt</b> — excede o limite máximo.', '<b>Crosswind above 20 kt</b> — exceeds the maximum limit.')); $('rXw').classList.add('bad'); }
  else if (comp.xw > 10 + 1e-9 && comp.hw < 5 - 1e-9) {
    lim.push(T('<b>Través entre 10 e 20 kt</b> exige vento de proa de pelo menos 5 kt.', '<b>Crosswind between 10 and 20 kt</b> requires a headwind of at least 5 kt.'));
    $('rXw').classList.add('bad'); $('rHw').classList.add('bad');
  }

  if (oat === null) { if (lim.length) setMsg('err', lim.join('<br>')); return; }

  const hwUsed = gap ? Math.max(0, comp.hw) : 0;
  $('rHwUsed').innerHTML = kt(Math.min(15, hwUsed)) ;
  const r = hdWeight(oat, hwUsed);
  buildTable(r.cells);
  if (lim.length) { setMsg('err', lim.join('<br>') + '<br>' + T('Operação não permitida — peso não calculado.', 'Operation not permitted — weight not calculated.')); return; }

  const lb = Math.floor(r.lb + 1e-9), kg = Math.floor(r.lb / HD_KG_LB + 1e-9);
  $('rLb').innerHTML = fmt(lb) + '<small class="u-lb"></small>';
  $('rKg').innerHTML = fmt(kg) + '<small class="u-kg"></small>';
  const info = [];
  if (!gap && comp.hw > 0.05) info.push(T('Sem vão de ar ≥ 10 ft: benefício do vento de proa não aplicado (tabela com 0 kt).', 'No air gap ≥ 10 ft: headwind benefit not applied (table at 0 kt).'));
  if (oat < 15) info.push(T('OAT abaixo de 15 °C: usada a linha ≤ 15 °C.', 'OAT below 15 °C: ≤ 15 °C row used.'));
  if (info.length) setMsg('info', info.join('<br>'));
}

F.forEach(function (i) { $(i).addEventListener('input', update); });
document.querySelectorAll('.pm').forEach(function (b) {
  b.addEventListener('click', function () {
    const el = $(b.dataset.t); const v = el.value.trim();
    el.value = v.startsWith('-') ? v.slice(1) : '-' + v; update(); el.focus();
  });
});
function setGap(v) { gap = v; $('gap').checked = v; $('gapState').textContent = v ? T('SIM', 'YES') : T('NÃO', 'NO'); }
$('gap').addEventListener('change', function () { setGap($('gap').checked); update(); });
$('clearBtn').addEventListener('click', function () {
  F.forEach(function (i) { $(i).value = ''; });
  setGap(false);
  update();
});
setGap(false);
update();
