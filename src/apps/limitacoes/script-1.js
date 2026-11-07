(function(){
  var sel = document.getElementById('limSelect');
  var panels = document.querySelectorAll('.lim-panel');
  function ativa(nome){
    panels.forEach(function(p){ p.classList.toggle('lim-active', p.id === 'limPanel-' + nome || p.getAttribute('data-grp') === nome); });
  }
  sel.addEventListener('change', function(){ ativa(sel.value); });
  ativa(sel.value);
})();
(function(){
  if (!(window.AW && window.AW.lang === 'en')) return;
  var K = 2.20462262;
  // tabela de consumo: colunas KG (0,2,4,6) em libras
  document.querySelectorAll('.cs-table tbody tr').forEach(function(tr){
    var tds = tr.querySelectorAll('td');
    [0, 2, 4, 6].forEach(function(i){
      var v = parseFloat(tds[i].textContent);
      if (!isNaN(v)) tds[i].textContent = Math.round(v * K);
    });
  });
  // combobox: nomes em inglês e ordem alfabética (item vazio primeiro)
  var sel = document.getElementById('limSelect');
  var nomes = { 'consumo': 'FUEL CONSUMPTION', 'egpws': 'EGPWS', 'ifr-maritima': 'IFR TO OFFSHORE UNIT', 'motor-transmissao': 'ENGINE AND TRANSMISSION', 'sistema-combustivel': 'FUEL SYSTEM', 'sistema-eletrico': 'ELECTRICAL SYSTEM', 'sistema-hidraulico': 'HYDRAULIC SYSTEM', 'velocidades': 'SPEEDS', 'vibration': 'VIBRATION', 'vne': 'VNE' };
  var opts = Array.prototype.slice.call(sel.options);
  var vazio = opts.filter(function(o){ return o.value === ''; })[0];
  var itens = opts.filter(function(o){ return o.value !== ''; });
  itens.forEach(function(o){ o.textContent = nomes[o.value] || o.textContent; });
  itens.sort(function(a, b){ return a.textContent.localeCompare(b.textContent); });
  sel.innerHTML = '';
  if (vazio) sel.appendChild(vazio);
  itens.forEach(function(o){ sel.appendChild(o); });
  sel.value = '';
})();

(function(){
  var en = window.AW && window.AW.lang === 'en';
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var T = en ? {
    head: ['Limitation','Speed'],
    s1: 'Airspeed limitations',
    s2: 'Ground speed limitations',
    s3: 'Wind speed limitations for rotor starting and stopping'
  } : {
    head: ['Limitação','Velocidade'],
    s1: 'Limitações de velocidade indicada (airspeed)',
    s2: 'Limitações de velocidade no solo',
    s3: 'Limitações de velocidade do vento para partida e parada do rotor'
  };
  // [descrição EN, descrição PT, valor EN, valor PT, nota EN, nota PT]  (valor: [principal, secundário])
  var AIR = [
    ['Maximum airspeed with Take-Off Power','Velocidade máxima com potência de decolagem',['90 KIAS'],['90 KIAS']],
    ['Maximum airspeed with NR at 102%','Velocidade máxima com NR a 102%',['90 KIAS'],['90 KIAS']],
    ['Maximum landing gear operating airspeed (Vlo)','Velocidade máxima de operação do trem de pouso (Vlo)',['150 KIAS or Vne if less'],['150 KIAS ou Vne se menor']],
    ['Maximum landing gear extended airspeed (Vle)','Velocidade máxima com o trem de pouso estendido (Vle)',['150 KIAS or Vne if less'],['150 KIAS ou Vne se menor']],
    ['Minimum airspeed for flight under IFR (Vmini)','Velocidade mínima para voo IFR (Vmini)',['50 KIAS'],['50 KIAS']],
    ['Maximum airspeed for IFR approach','Velocidade máxima para aproximação IFR',['150 KIAS'],['150 KIAS']],
    ['Maximum airspeed for climb with one AP failed','Velocidade máxima de subida com um AP inoperante',['100 KIAS'],['100 KIAS']],
    ['Maximum rate of climb with one AP failed','Razão máxima de subida com um AP inoperante',['1000 fpm'],['1000 fpm']],
    ['Maximum airspeed with one AP failed','Velocidade máxima com um AP inoperante',['Vne-27 KIAS'],['Vne-27 KIAS']],
    ['Maximum airspeed for operation of windscreen wipers','Velocidade máxima para operação dos limpadores de para-brisa',['140 KIAS'],['140 KIAS']],
    ['Minimum airspeed in autorotation','Velocidade mínima em autorrotação',['40 KIAS'],['40 KIAS']],
    ['Maximum airspeed with right cabin door locked open','Velocidade máxima com a porta direita da cabine travada aberta',['100 KIAS'],['100 KIAS']],
    ['Maximum airspeed with left or both cabin doors locked open','Velocidade máxima com a porta esquerda ou ambas as portas da cabine travadas abertas',['80 KIAS'],['80 KIAS']],
    ['Maximum airspeed for opening/closing cabin doors','Velocidade máxima para abrir/fechar as portas da cabine',['80 KIAS'],['80 KIAS']]
  ];
  var GND = [
    {g:['On paved surfaces','Em superfícies pavimentadas']},
    ['Maximum taxi speed','Velocidade máxima de táxi',['40 knots','(74 km/hr)'],['40 nós','(74 km/h)'],'Above 20 knots (36 km/hr) nose wheel must be locked fore and aft','Acima de 20 nós (36 km/h) a roda do nariz deve estar travada na posição frente e trás'],
    ['Maximum for emergency landing speed','Velocidade máxima para pouso de emergência',['60 knots','(110 km/hr)'],['60 nós','(110 km/h)'],'Nose wheel locked in fore and aft position','Roda do nariz travada na posição frente e trás'],
    ['Maximum towing speed','Velocidade máxima de reboque',['37 km/hr','(23 mph)'],['37 km/h','(23 mph)']],
    {g:['On prepared grass surfaces','Em superfícies de grama preparada']},
    ['Maximum taxi speed','Velocidade máxima de táxi',['20 knots','(37 km/hr)'],['20 nós','(37 km/h)'],'Above 10 knots (18 km/hr) nose wheel must be locked fore and aft','Acima de 10 nós (18 km/h) a roda do nariz deve estar travada na posição frente e trás'],
    ['Maximum for emergency landing speed','Velocidade máxima para pouso de emergência',['40 knots','(74 km/hr)'],['40 nós','(74 km/h)'],'Nose wheel locked fore and aft','Roda do nariz travada na posição frente e trás']
  ];
  var WND = [
    ['Maximum wind speed','Velocidade máxima do vento',['60 knots','(30 m/s)'],['60 nós','(30 m/s)']]
  ];
  function tabela(rows){
    var h = '<table class="sp-table"><thead><tr><th class="sp-d">' + T.head[0] + '</th><th class="sp-v">' + T.head[1] + '</th></tr></thead><tbody>';
    rows.forEach(function(r){
      if (r.g){ h += '<tr class="sp-group"><td colspan="2">' + esc(r.g[en ? 0 : 1]) + '</td></tr>'; return; }
      var desc = esc(en ? r[0] : r[1]);
      var val = en ? r[2] : r[3];
      var nota = en ? r[4] : r[5];
      h += '<tr><td class="sp-d">' + desc + (nota ? '<span class="sp-note">' + esc(nota) + '</span>' : '') + '</td>' +
           '<td class="sp-v">' + esc(val[0]) + (val[1] ? '<br><small>' + esc(val[1]) + '</small>' : '') + '</td></tr>';
    });
    return h + '</tbody></table>';
  }
  var painel = document.getElementById('limPanel-velocidades');
  painel.innerHTML =
    '<div class="lim-section">' + T.s1 + '</div>' + tabela(AIR) +
    '<div class="lim-section">' + T.s2 + '</div>' + tabela(GND) +
    '<div class="lim-section">' + T.s3 + '</div>' + tabela(WND);
})();

(function(){
  var en = window.AW && window.AW.lang === 'en';
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var HEAD = en ? ['Limitation','Value'] : ['Limitação','Valor'];
  // [descrição EN, descrição PT, valor EN, valor PT, nota EN, nota PT]
  var SEC = [
    { t: ['DC generator load (%)','Carga do gerador DC (%)'], rows: [
      ['Normal Operation Range','Faixa de operação normal','0 to 100','0 a 100'],
      ['Cautionary Range (for engine starting only)','Faixa de cautela (somente para partida do motor)','101 to 155','101 a 155'],
      ['Maximum Cautionary','Cautela máxima','155','155',
        'Maximum Cautionary may be exceeded for maximum of 45 seconds for engine start only',
        'A cautela máxima pode ser excedida por no máximo 45 segundos, somente na partida do motor']
    ]},
    { t: ['DC generator maximum normal operating load (%)','Carga máxima normal de operação do gerador DC (%)'], rows: [
      ['Up to 15000 ft (4570 m) Hp','Até 15000 ft (4570 m) Hp','100 (equivalent 300 A)','100 (equivalente a 300 A)'],
      ['Above 15000 ft (4570 m) Hp','Acima de 15000 ft (4570 m) Hp','reduce by 13.4 every 1000 ft (300 m)','reduzir 13,4 a cada 1000 ft (300 m)',
        'See Placards on page 66 or, for aircraft fitted with EPIC S/W Phase 5 or later, Supplement 68',
        'Ver placas na página 66 ou, para aeronaves com EPIC S/W Fase 5 ou posterior, Suplemento 68'],
      ['20000 ft (6100 m) Hp','20000 ft (6100 m) Hp','33','33'],
      ['MPOG with generator load at 75% or less','MPOG com carga do gerador de 75% ou menos','No time limitations','Sem limite de tempo'],
      ['MPOG with generator load greater than 75%','MPOG com carga do gerador maior que 75%','Max 20 minutes','Máx. 20 minutos']
    ]},
    { t: ['Battery load (A)','Carga da bateria (A)'], rows: [
      ['Battery Discharge','Descarga da bateria','-200 to 0','-200 a 0'],
      ['Battery Charge','Carga da bateria','0 to 200','0 a 200']
    ]},
    { t: ['Main and essential bus voltage (V)','Tensão das barras principal e essencial (V)'], rows: [
      ['Minimum Normal Operation','Operação normal mínima','22','22'],
      ['Normal Operation','Operação normal','22 to 29','22 a 29'],
      ['Maximum Normal Operation','Operação normal máxima','29','29']
    ]}
  ];
  var k = en ? 0 : 1;
  var html = '';
  SEC.forEach(function(sec){
    html += '<div class="lim-section">' + esc(sec.t[k]) + '</div>';
    html += '<table class="sp-table"><thead><tr><th class="sp-d">' + HEAD[0] + '</th><th class="sp-v">' + HEAD[1] + '</th></tr></thead><tbody>';
    sec.rows.forEach(function(r){
      var nota = en ? r[4] : r[5];
      html += '<tr><td class="sp-d">' + esc(r[k]) + (nota ? '<span class="sp-note">' + esc(nota) + '</span>' : '') + '</td>' +
              '<td class="sp-v">' + esc(r[2 + k]) + '</td></tr>';
    });
    html += '</tbody></table>';
  });
  // ---- Starter duty cycle ----
  var ST = {
    t: ['Starter duty cycle','Ciclo de trabalho do motor de partida (starter)'],
    head: [['Cycle','On','Off'],['Ciclo','Ligado','Desligado']],
    rows: [
      ['1',['45 seconds','1 minute'],['45 segundos','1 minuto']],
      ['2',['45 seconds','1 minute'],['45 segundos','1 minuto']],
      ['3',['45 seconds','30 minutes'],['45 segundos','30 minutos']]
    ]
  };
  html += '<div class="lim-section">' + esc(ST.t[k]) + '</div>';
  html += '<table class="sp-table"><thead><tr><th class="sp-c1">' + ST.head[k][0] + '</th><th class="sp-c2">' + ST.head[k][1] + '</th><th class="sp-c2">' + ST.head[k][2] + '</th></tr></thead><tbody>';
  ST.rows.forEach(function(r){
    var v = r[1 + k];
    html += '<tr><td class="sp-c1">' + r[0] + '</td><td class="sp-c2">' + esc(v[0]) + '</td><td class="sp-c2">' + esc(v[1]) + '</td></tr>';
  });
  html += '</tbody></table>';
  // ---- Power margin trend monitoring ----
  var PM = {
    t: ['Power margin trend monitoring','Monitoramento da tendência da margem de potência'],
    head: [['Interval','Action'],['Intervalo','Ação']],
    row: [
      ['Every 50 flight hours','Record engine power assurance check values for engine power margin trend monitoring purposes.'],
      ['A cada 50 horas de voo','Registrar os valores da verificação de garantia de potência (power assurance check) dos motores, para fins de monitoramento da tendência da margem de potência do motor.']
    ]
  };
  html += '<div class="lim-section">' + esc(PM.t[k]) + '</div>';
  html += '<table class="sp-table"><thead><tr><th class="sp-i">' + PM.head[k][0] + '</th><th class="sp-a">' + PM.head[k][1] + '</th></tr></thead><tbody>';
  html += '<tr><td class="sp-i">' + esc(PM.row[k][0]) + '</td><td class="sp-a">' + esc(PM.row[k][1]) + '</td></tr></tbody></table>';
  document.getElementById('limPanel-sistema-eletrico').innerHTML = html;
})();

// ---- Tradução PT-BR das páginas MOTOR E TRANSMISSÃO, VIBRAÇÃO e CONSUMO (o original é em inglês) ----
(function(){
  if (window.AW && window.AW.lang === 'en') return;
  var PT = {
    // motor e transmissão
    'Engine and Transmission Digital Limitations': 'Limitações digitais do motor e da transmissão',
    'The following represent the digital values for PFD and MFD limitations indicated by colours': 'Os valores a seguir representam os valores digitais das limitações do PFD e do MFD, indicadas por cores',
    'All Engine Operating': 'Todos os motores operando',
    'One Engine Inoperative': 'Um motor inoperante',
    'Minimum Transient': 'Transiente mínimo',
    'Minimum Continuous': 'Contínuo mínimo',
    'Maximum Continuous': 'Contínuo máximo',
    'Maximum Take Off (5 min)': 'Decolagem máxima (5 min)',
    'Cautionary': 'Cautela',
    'Maximum Transient (5 secs)': 'Transiente máximo (5 s)',
    'Cautionary (OEI Landing Only)': 'Cautela (somente pouso com OEI)',
    'Maximum 2.5 min OEI': 'Máximo 2,5 min OEI',
    '* 10 seconds transient': '* Transiente de 10 segundos',
    'Power Off': 'Power Off (sem potência)',
    'Maximum Transient': 'Transiente máximo',
    'Engine Starting': 'Partida do motor',
    'Maximum Unlimited': 'Máximo ilimitado',
    'Maximum Transient (2 secs)': 'Transiente máximo (2 s)',
    'ENG OIL °C': 'ÓLEO DO MOTOR °C',
    'Oil Temperature': 'Temperatura do óleo',
    'Minimum for engine starting': 'Mínimo para partida do motor',
    'Cautionary Range for Ground Idle': 'Faixa de cautela para Ground Idle',
    'Normal Operation Range': 'Faixa de operação normal',
    'Maximum Normal Operation': 'Operação normal máxima',
    'Cautionary Range for Torque below 60% (30 min)': 'Faixa de cautela para torque abaixo de 60% (30 min)',
    'Maximum for torque below 60% (30 min)': 'Máximo para torque abaixo de 60% (30 min)',
    'Transient (1 min)': 'Transiente (1 min)',
    '-40 to 9': '-40 a 9',
    '10 to 140': '10 a 140',
    '141 to 145': '141 a 145',
    // vibração
    'RTB vibration and track level limits for release to service': 'Limites de vibração e de track (RTB) para liberação ao serviço',
    'CRUISE': 'CRUZEIRO',
    'SLOW CRZ': 'CRZ LENTO',
    // consumo
    'Times shown based on fuel burn @ 400 kg/h = 6.7 kg/min': 'Tempos baseados no consumo de combustível @ 400 kg/h = 6,7 kg/min',
    'OIL TEMPERATURE (°C)': 'TEMPERATURA DO ÓLEO (°C)',
    'OIL PRESSURE (BAR)': 'PRESSÃO DO ÓLEO (BAR)',
    'Main Gearbox (MGB)': 'Caixa de transmissão principal (MGB)',
    'Intermediate Gearbox (IGB)': 'Caixa de transmissão intermediária (IGB)',
    'Tail Rotor Gearbox (TGB)': 'Caixa de transmissão do rotor de cauda (TGB)',
    'Minimum for starting': 'Mínimo para partida',
    'Ground Operation Range': 'Faixa de operação no solo',
    'Minimum for idle': 'Mínimo para marcha lenta (idle)',
    'Idle Range': 'Faixa de marcha lenta (idle)',
    '-40 to 0': '-40 a 0',
    '1 to 110': '1 a 110',
    '2.3': '2,3',
    '2.3 to 3.0': '2,3 a 3,0',
    '3.1 to 6.0': '3,1 a 6,0',
    '6.0': '6,0',
    'HRS': 'H'
  };
  var VIB_TH = {
    'Lateral vibration (ips)': 'Vibração<br>lateral<br>(ips)',
    'Vertical vibration (ips)': 'Vibração<br>vertical<br>(ips)',
    'Track split (mm)': 'Track split<br>(mm)',
    'Radial vibration (ips)': 'Vibração<br>radial<br>(ips)',
    'Axial vibration (ips)': 'Vibração<br>axial<br>(ips)'
  };
  document.querySelectorAll('.lim-table thead th').forEach(function(th){
    var key = th.textContent.replace(/\s+/g, ' ').trim();
    if (VIB_TH[key]) th.innerHTML = VIB_TH[key];
  });
  ['limPanel-motor-transmissao', 'limPanel-vibration', 'limPanel-consumo'].forEach(function(id){
    var root = document.getElementById(id);
    if (!root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(function(n){
      var t = n.nodeValue.replace(/\s+/g, ' ').trim();
      if (Object.prototype.hasOwnProperty.call(PT, t)) n.nodeValue = n.nodeValue.replace(t, PT[t]);
    });
  });
})();

(function(){
  var en = window.AW && window.AW.lang === 'en';
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var HEAD = en ? ['Limitation','Value'] : ['Limitação','Valor'];
  // [descrição EN, descrição PT, valor EN, valor PT]
  var SEC = [
    { t: ['Hydraulic fluid temperature (°C)','Temperatura do fluido hidráulico (°C)'], rows: [
      ['Minimum for flight control check with electric hydraulic pump','Mínimo para checagem dos comandos de voo com bomba hidráulica elétrica','-50','-50'],
      ['Minimum for starting','Mínimo para partida','-40','-40'],
      ['Ground Operation Range','Faixa de operação no solo','-40 to -21','-40 a -21'],
      ['Minimum Normal Operation','Operação normal mínima','-20','-20'],
      ['Normal Operating Range','Faixa de operação normal','-20 to 119','-20 a 119'],
      ['Cautionary Range','Faixa de cautela','120 to 134','120 a 134'],
      ['Maximum Cautionary','Cautela máxima','134','134']
    ]},
    { t: ['Hydraulic fluid pressure (bar)','Pressão do fluido hidráulico (bar)'], rows: [
      ['Minimum Cautionary','Cautela mínima','163','163'],
      ['Cautionary Range','Faixa de cautela','163 to 179','163 a 179'],
      ['Normal Operation Range','Faixa de operação normal','180 to 225','180 a 225'],
      ['Cautionary Range','Faixa de cautela','226 to 250','226 a 250'],
      ['Maximum Cautionary','Cautela máxima','250','250']
    ]}
  ];
  var k = en ? 0 : 1;
  var html = '';
  SEC.forEach(function(sec){
    html += '<div class="lim-section">' + esc(sec.t[k]) + '</div>';
    html += '<table class="sp-table"><thead><tr><th class="sp-d">' + HEAD[0] + '</th><th class="sp-v">' + HEAD[1] + '</th></tr></thead><tbody>';
    sec.rows.forEach(function(r){
      html += '<tr><td class="sp-d">' + esc(r[k]) + '</td><td class="sp-v">' + esc(r[2 + k]) + '</td></tr>';
    });
    html += '</tbody></table>';
  });
  document.getElementById('limPanel-sistema-hidraulico').innerHTML = html;
})();

(function(){
  var en = window.AW && window.AW.lang === 'en';
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  // pesos do RFM estão em kg: em inglês são mostrados em libras (lb)
  function w(kg){ return en ? Math.round(kg * 2.20462262) + ' lb' : kg + ' kg'; }
  var HEAD = en ? ['Limitation','Value'] : ['Limitação','Valor'];
  var k = en ? 0 : 1;
  // [descrição EN, descrição PT, valor EN, valor PT]
  var SEC = [
    { t: ['Fuel pressure (bar)','Pressão do combustível (bar)'], rows: [
      ['Cautionary Range','Faixa de cautela','0.0 to 0.5','0,0 a 0,5'],
      ['Minimum Normal Operation','Operação normal mínima','0.6','0,6'],
      ['Normal Operation Range','Faixa de operação normal','0.6 to 2.1','0,6 a 2,1'],
      ['Maximum','Máximo','2.1','2,1']
    ], note: ['In suction mode fuel pressure indication is invalid (fuel pressure display \u20180\u2019 or dashed).',
              'No modo de sucção, a indicação de pressão do combustível é inválida (a pressão exibida é \u20180\u2019 ou tracejada).'] },
    { t: ['Fuel capacities','Capacidades de combustível'], rows: [
      ['Total Usable','Total utilizável','1588 litres','1588 litros'],
      ['Unusable','Não utilizável','20 litres','20 litros']
    ]},
    { t: ['Unusable fuel','Combustível não utilizável'], rows: [
      ['In coordinated (ball centered) flight','Em voo coordenado (bola centrada)',
        '0 ' + (en ? 'lb' : 'kg') + ' indicated / (' + w(8) + '/10 litres per tank actual)',
        '0 kg indicado / (' + w(8) + '/10 litros por tanque, real)'],
      ['Hovering in cross winds or sideways flight with sustained roll angles greater than \u00B115\u00B0',
       'Pairado com vento de través ou voo lateral com ângulos de rolagem sustentados maiores que \u00B115\u00B0',
       'Prohibited when fuel indication, in either tank, is less than ' + w(70),
       'Proibido quando a indicação de combustível, em qualquer tanque, for menor que ' + w(70)],
      ['Cross feeding (tank with pump off, not supplying engines)',
       'Alimentação cruzada (tanque com bomba desligada, que não alimenta os motores)',
       'maximum ' + w(228), 'máximo ' + w(228)]
    ], note: ['During XFEED the unusable fuel level indication will change to grey to indicate the tank can no longer supply fuel.',
              'Durante o XFEED, a indicação do nível de combustível não utilizável muda para cinza, indicando que o tanque não pode mais fornecer combustível.'] }
  ];
  var html = '';
  SEC.forEach(function(sec){
    html += '<div class="lim-section">' + esc(sec.t[k]) + '</div>';
    html += '<table class="sp-table"><thead><tr><th class="sp-d">' + HEAD[0] + '</th><th class="sp-v">' + HEAD[1] + '</th></tr></thead><tbody>';
    sec.rows.forEach(function(r){
      html += '<tr><td class="sp-d">' + esc(r[k]) + '</td><td class="sp-v">' + esc(r[2 + k]) + '</td></tr>';
    });
    if (sec.note) html += '<tr class="sp-footnote"><td colspan="2"><b>' + (en ? 'Note' : 'Nota') + ':</b> ' + esc(sec.note[k]) + '</td></tr>';
    html += '</tbody></table>';
  });
  document.getElementById('limPanel-sistema-combustivel').innerHTML = html;
})();
