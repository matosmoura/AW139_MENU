// Motor de cálculo de peso e balanceamento — cópia sem alterações do arquivo AW139_PB.html.
/* Motor de cálculo W&B AW139 — unidades internas: kg e mm. */
(function (root) {
  'use strict';

  // Seção 1 do RFM: limites
  var LIM = { taxi: 6450, mtow: 6400, extMin: 6400, mtowExt: 7000, minFlight: 4400, baggageMax: 200, fuelMax: 1270, fuelDensity: 0.8 };

  // Envelope longitudinal (Fig. 1-1): [STA mm, peso kg]
  var LONG_ENV = [[5504, 6400], [5180, 6400], [5000, 5170], [5000, 4660], [5071, 4400], [5536, 4400], [5595, 4850]];
  // Envelope lateral (Fig. 1-2): [BL mm, peso kg]
  var LAT_ENV = [[-70, 6400], [90, 6400], [120, 4400], [-88, 4400]];

  // Envelope estendido (ficha de pesagem da operadora, válido acima de 6400 kg, até 7000 kg): [STA mm, peso kg]
  var EXT_LONG_ENV = [[5469, 7000], [5266, 7000], [5238, 6800], [5000, 5170], [5000, 4660], [5071, 4400], [5536, 4400], [5595, 4850], [5480, 6800]];
  // Limites laterais da ficha acima de 6400 kg (sem variação com o peso): BL mm
  var EXT_LAT_LIM = [-88, 120];

  // Seção 6, "Total Fuel": [kg, braço mm]
  var FUEL_TABLE = [[0, 6208], [25, 6208], [50, 6209], [75, 6210], [100, 6210], [125, 6210], [150, 6210], [175, 6210], [200, 6210], [225, 6210], [250, 6210], [275, 6210], [300, 6210], [325, 6210], [350, 6211], [375, 6211], [400, 6211], [425, 6211], [450, 6211], [475, 6211], [500, 6212], [525, 6212], [550, 6212], [575, 6212], [600, 6213], [625, 6213], [650, 6214], [675, 6214], [700, 6214], [725, 6215], [750, 6215], [775, 6216], [800, 6217], [825, 6219], [850, 6221], [875, 6223], [900, 6225], [925, 6225], [950, 6226], [975, 6227], [1000, 6228], [1025, 6228], [1050, 6229], [1075, 6229], [1100, 6230], [1125, 6230], [1150, 6231], [1175, 6231], [1200, 6232], [1225, 6232], [1250, 6233], [1270, 6233]];

  // Posições de assentos (Chart E / Fig. 6-1 e 6-2). bl positivo = direita.
  var SEATS_12 = [
    { id: 'A', row: 1, sta: 3415, bl: 737 }, { id: 'B', row: 1, sta: 3415, bl: 254 }, { id: 'C', row: 1, sta: 3415, bl: -254 }, { id: 'D', row: 1, sta: 3415, bl: -737 },
    { id: 'E', row: 2, sta: 4789, bl: 737 }, { id: 'F', row: 2, sta: 4789, bl: 254 }, { id: 'G', row: 2, sta: 4789, bl: -254 }, { id: 'H', row: 2, sta: 4789, bl: -737 },
    { id: 'I', row: 3, sta: 5600, bl: 737 }, { id: 'L', row: 3, sta: 5600, bl: 254 }, { id: 'M', row: 3, sta: 5600, bl: -254 }, { id: 'N', row: 3, sta: 5600, bl: -737 }
  ];
  var SEATS_15 = [
    { id: 'A', row: 1, sta: 3449, bl: 813 }, { id: 'B', row: 1, sta: 3415, bl: 406 }, { id: 'C', row: 1, sta: 3415, bl: 0 }, { id: 'D', row: 1, sta: 3415, bl: -406 }, { id: 'E', row: 1, sta: 3449, bl: -813 },
    { id: 'F', row: 2, sta: 4789, bl: 813 }, { id: 'G', row: 2, sta: 4789, bl: 406 }, { id: 'H', row: 2, sta: 4789, bl: 0 }, { id: 'I', row: 2, sta: 4789, bl: -406 }, { id: 'L', row: 2, sta: 4789, bl: -813 },
    { id: 'M', row: 3, sta: 5556, bl: 813 }, { id: 'N', row: 3, sta: 5600, bl: 406 }, { id: 'O', row: 3, sta: 5600, bl: 0 }, { id: 'P', row: 3, sta: 5600, bl: -406 }, { id: 'Q', row: 3, sta: 5556, bl: -813 }
  ];
  var ROWS = { 12: [{ n: 1, sta: 3415 }, { n: 2, sta: 4789 }, { n: 3, sta: 5600 }], 15: [{ n: 1, sta: 3415 }, { n: 2, sta: 4789 }, { n: 3, sta: 5600 }] };
  var CREW = { pilot: { sta: 2820, bl: 550 }, copilot: { sta: 2820, bl: -550 } };
  var BAGGAGE_ARMS = [7200, 7700, 8200];
  var OIL = { w: 16, sta: 6878, bl: 0 };

  // Suplemento EMS (Spectrum Aeromed 7012FMS Rev. 2): [config, tipo, STA, BL, cabeça-atrás(+183)]
  // tipos: STR maca; I006 ITS 1307-006; I001 ITS 1307-001; I302 ITS 1302-002; I307 ITS 1302-007; EQ suporte de equipamento; OS ocupantes e macas
  var EMS = [];
  function ems(c, rows) { rows.forEach(function (r) { EMS.push({ cfg: c, type: r[0], sta: r[1], bl: r[2], aft: !!r[3] }); }); }
  function std(c, bl) { ems(c, [['STR', 4570, bl, 1], ['I006', 4832, bl], ['I001', 4743, bl]]); }
  function f4(c, bl) { ems(c, [['STR', 4029, bl, 1], ['I006', 4202, bl], ['I001', 4291, bl]]); }
  function f3(c, bl) { ems(c, [['STR', 4391, bl, 1], ['I302', 4600, bl], ['I307', 4483, bl]]); }
  f4('A', -419); f4('B', -12); f4('C', 13); f4('D', 419);
  ems('E', [['STR', 4650, 82], ['I006', 4650, -91], ['I001', 4650, -180]]);
  f3('F', 610); f3('G', 0); f3('H', -610);
  std('J', -587); std('K', 587); std('L', -587); std('M', -155); std('N', 587); std('P', 155);
  ems('Q', [['STR', 4600, 90], ['I006', 4600, -172], ['I001', 4600, -83]]);
  std('R', -522);
  ems('S', [['STR', 4600, -90], ['I006', 4600, 172], ['I001', 4600, 83]]);
  std('T', 522);
  ems('U', [['STR', 4600, 96], ['I006', 4600, -166], ['I001', 4600, -77]]);
  std('V', -649); std('W', -254); std('X', 0); std('Y', 254); std('Z', 649);
  ems('AA', [['STR', 4600, -96], ['I006', 4600, 166], ['I001', 4600, 77]]);
  ems('BB', [['EQ', 4202, 649]]); ems('CC', [['EQ', 4202, 172]]); ems('DD', [['EQ', 4202, -649]]);
  ems('EE', [['EQ', 4202, 254]]); ems('FF', [['EQ', 4202, -254]]);
  ems('GG', [['OS', 4600, 96]]);
  var EMS_AFT_SHIFT = 183;

  // Pesos de componentes (kg) — suplemento, p. 9
  var DEVICES = {
    stretchers: [['1201-001', 18.1], ['1206-006', 20.4], ['1211-002', 19.5]],
    its: { I006: ['1307-006', 15.0], I001: ['1307-001', 11.3], I302: ['1302-002', 16.8], I307: ['1302-007', 16.8] },
    presets: [['Adaptador de maca 1306-001', 12.7], ['Adaptador de maca 1306-006', 11.3], ['Ponte de maca 1403-001/011/012', 4.5], ['Ponte de maca 1403-013', 5.2], ['Incubadora/ITS 1302-006', 15.0]]
  };

  function fuelArm(kg) {
    var t = FUEL_TABLE;
    if (kg <= 0) return t[0][1];
    if (kg >= t[t.length - 1][0]) return t[t.length - 1][1];
    for (var i = 1; i < t.length; i++) {
      if (kg <= t[i][0]) {
        var a = t[i - 1], b = t[i];
        return a[1] + (b[1] - a[1]) * (kg - a[0]) / (b[0] - a[0]);
      }
    }
    return t[t.length - 1][1];
  }

  // Intervalo [min,max] do polígono à altura (peso) w; null se fora.
  function slice(poly, w) {
    var xs = [], n = poly.length;
    for (var i = 0; i < n; i++) {
      var p = poly[i], q = poly[(i + 1) % n];
      if (p[1] === q[1]) { if (p[1] === w) { xs.push(p[0], q[0]); } }
      else if (w >= Math.min(p[1], q[1]) && w <= Math.max(p[1], q[1])) {
        xs.push(p[0] + (q[0] - p[0]) * (w - p[1]) / (q[1] - p[1]));
      }
    }
    if (!xs.length) return null;
    return [Math.min.apply(null, xs), Math.max.apply(null, xs)];
  }

  // items: [{w, sta, bl}] -> totais
  function totals(items) {
    var w = 0, mL = 0, mB = 0;
    items.forEach(function (it) {
      var iw = +it.w || 0; if (iw <= 0) return;
      w += iw; mL += iw * (+it.sta || 0); mB += iw * (+it.bl || 0);
    });
    return { w: w, mL: mL, mB: mB, sta: w > 0 ? mL / w : NaN, bl: w > 0 ? mB / w : NaN };
  }

  // kind: 'zfw' | 'flight'
  function evaluate(w, sta, bl, kind) {
    var res = { w: w, sta: sta, bl: bl, msgs: [] };
    var wEval = w, clamped = false;
    if (kind === 'zfw' && w < LIM.minFlight) { wEval = LIM.minFlight; clamped = true; }
    res.clamped = clamped;
    var ext = w > LIM.extMin;
    res.env = ext ? 'ext' : 'rfm';
    var gap = false;
    var wMax = ext ? LIM.mtowExt : LIM.mtow;
    res.weightOk = w <= wMax && !gap && (kind === 'zfw' || w >= LIM.minFlight);
    if (w > LIM.mtowExt) res.msgs.push('Acima do peso máximo de decolagem do envelope estendido (7000 kg).');
    if (kind !== 'zfw' && w < LIM.minFlight) res.msgs.push('Abaixo do peso mínimo de voo (4400 kg).');
    var L, B;
    if (ext) { L = slice(EXT_LONG_ENV, Math.min(w, LIM.mtowExt)); B = w <= LIM.mtowExt ? EXT_LAT_LIM : null; }
    else {
      var wc = Math.min(Math.max(wEval, LIM.minFlight), LIM.mtow);
      L = slice(LONG_ENV, wc); B = slice(LAT_ENV, wc);
    }
    res.longLim = L; res.latLim = B;
    res.longOk = !!L && sta >= L[0] - 1e-9 && sta <= L[1] + 1e-9 && res.weightOk;
    res.latOk = !!B && bl >= B[0] - 1e-9 && bl <= B[1] + 1e-9 && res.weightOk;
    if (L) { res.fwdMargin = sta - L[0]; res.aftMargin = L[1] - sta; }
    if (B) { res.leftMargin = bl - B[0]; res.rightMargin = B[1] - bl; }
    res.ok = res.weightOk && res.longOk && res.latOk;
    return res;
  }

  root.WB = {
    LIM: LIM, LONG_ENV: LONG_ENV, LAT_ENV: LAT_ENV, EXT_LONG_ENV: EXT_LONG_ENV, EXT_LAT_LIM: EXT_LAT_LIM, FUEL_TABLE: FUEL_TABLE,
    SEATS_12: SEATS_12, SEATS_15: SEATS_15, ROWS: ROWS, CREW: CREW, BAGGAGE_ARMS: BAGGAGE_ARMS, OIL: OIL,
    EMS: EMS, EMS_AFT_SHIFT: EMS_AFT_SHIFT, DEVICES: DEVICES,
    fuelArm: fuelArm, slice: slice, totals: totals, evaluate: evaluate
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.WB;
})(typeof window !== 'undefined' ? window : globalThis);
