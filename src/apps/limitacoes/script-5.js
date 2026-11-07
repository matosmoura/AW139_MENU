(function(){
  var en = window.AW && window.AW.lang === 'en';
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function qt(t){ return esc(t).replace(/&quot;/g, '"').replace(/"([^"]+)"/g, '<span class="eg3-q">"$1"</span>'); }
  var T = en ? {
    title: 'Ground Proximity Warning System (GPWS)',
    intro: 'This function is based primarily on the vertical separation of the helicopter with terrain. It uses altitude and altitude rates / terrain closure rates to alert for insufficient terrain separation. There are six operating modes:',
    rows: [
      ['Mode 1', 'Excessive Descent Rate'],
      ['msg', 'Aural', '"SINK RATE"'],
      ['msg', 'Visual', 'GND PROX (amber, on the ADI), caution'],
      ['msg', 'Descent continues', '"SINK RATE" repeated with increasing frequency'],
      ['msg', 'Warning limit', 'Continuous aural "PULL UP" + red PULL UP on the ADI'],
      ['Mode 2', 'Excessive Terrain Closure Rate'],
      ['msg', 'Aural', '"TERRAIN, TERRAIN"'],
      ['msg', 'Visual', 'GND PROX (amber, on the ADI), caution'],
      ['msg', 'Envelope penetration continues', 'Continuous aural "PULL UP" + red PULL UP on the ADI'],
      ['msg', 'Mode 2B', 'Desensitized envelope (gear down, ILS, up to 60 s after take-off): aural "TERRAIN" + amber GND PROX until out of the envelope'],
      ['Mode 3', 'Descent after Take-Off'],
      ['msg', 'Aural', '"DON\'T SINK"'],
      ['msg', 'Visual', 'GND PROX on the ADI, until a positive rate of climb is established'],
      ['msg', 'Condition', 'Take-off or go-around, with gear up or above 50 KIAS'],
      ['note', 'Additional feature for the -036 version only:'],
      ['sub', 'Mode 3B', 'Loss of Airspeed after Take-Off'],
      ['msg', 'Aural', '"CHECK AIRSPEED" when airspeed falls below 55 KIAS after take-off, having reached 60 KIAS. Remains until above 60 KIAS or for 60 s.'],
      ['Mode 4', 'Unsafe terrain separation'],
      ['sub', 'Mode 4A', 'Cruise and approach with landing gear up'],
      ['msg', 'Aural', '"TOO LOW TERRAIN": below 150 ft radio altitude, above 60 KIAS'],
      ['msg', 'OFSH (-036)', 'Below 350 ft: "TOO LOW GEAR" below 100 KIAS and "TOO LOW TERRAIN" above 100 KIAS'],
      ['sub', 'Mode 4B', 'Cruise and approach with landing gear down'],
      ['msg', 'Aural', '"TOO LOW TERRAIN": above 120 KIAS and below 100 ft AGL'],
      ['msg', '120 to 80 KIAS', 'The limit decreases from 100 to 10 ft AGL'],
      ['sub', 'Mode 4C', 'Take-Off with landing gear up'],
      ['msg', 'Aural', '"TOO LOW TERRAIN": radio altitude enters the minimum terrain separation, with gear up or above 50 KIAS'],
      ['Mode 5', 'Descent Below Glideslope'],
      ['msg', 'Soft', '"GLIDESLOPE" at about half volume, more than 1.3 dots below the beam'],
      ['msg', 'Hard', '"GLIDESLOPE" at standard volume, below 300 ft (radio altimeter) and more than 2 dots deviation'],
      ['msg', 'Condition', 'ILS front course or LPV only (-030 and later)'],
      ['Mode 6', 'Advisory alerts for:'],
      ['sub', '', 'Excessive Bank Angle'],
      ['msg', 'Aural', '"BANK ANGLE": bank limit 30° between 10 and 50 ft AGL, 45° at 500 ft, 55° at 1000 ft and above'],
      ['sub', '', 'Tail Too Low'],
      ['msg', 'Aural', '"TAIL TOO LOW": pitch limit starts at 15° at 3 ft AGL and rises to 48.5° at 50 ft AGL'],
      ['sub', '', 'Altitude call outs in autorotation.'],
      ['msg', 'Aural', '"200", "100", "80", "60", "40", "20", "10" (radio altimeter heights)']
    ]
  } : {
    title: 'Ground Proximity Warning System (GPWS)',
    intro: 'Esta função é baseada principalmente na separação vertical do helicóptero em relação ao terreno. Usa altitude e razões de altitude / razões de aproximação do terreno para alertar sobre separação de terreno insuficiente. Existem seis modos de operação:',
    rows: [
      ['Mode 1', 'Razão de descida excessiva'],
      ['msg', 'Aural', '"SINK RATE"'],
      ['msg', 'Visual', 'GND PROX (âmbar, no ADI), caution'],
      ['msg', 'Descida alta continua', '"SINK RATE" repetido com frequência crescente'],
      ['msg', 'Limite de warning', '"PULL UP" aural contínuo + PULL UP vermelho no ADI'],
      ['Mode 2', 'Razão de aproximação do terreno excessiva'],
      ['msg', 'Aural', '"TERRAIN, TERRAIN"'],
      ['msg', 'Visual', 'GND PROX (âmbar, no ADI), caution'],
      ['msg', 'Penetração no envelope continua', '"PULL UP" aural contínuo + PULL UP vermelho no ADI'],
      ['msg', 'Mode 2B', 'Envelope dessensibilizado (trem baixado, ILS, até 60 s após a decolagem): aural "TERRAIN" + GND PROX âmbar até sair do envelope'],
      ['Mode 3', 'Descida após a decolagem'],
      ['msg', 'Aural', '"DON\'T SINK"'],
      ['msg', 'Visual', 'GND PROX no ADI, até se estabelecer razão de subida positiva'],
      ['msg', 'Condição', 'Decolagem ou go-around, com trem recolhido ou acima de 50 KIAS'],
      ['note', 'Recurso adicional apenas para a versão -036:'],
      ['sub', 'Mode 3B', 'Perda de velocidade (airspeed) após a decolagem'],
      ['msg', 'Aural', '"CHECK AIRSPEED" quando a velocidade cai abaixo de 55 KIAS após a decolagem, depois de ter atingido 60 KIAS. Permanece até passar de 60 KIAS ou por 60 s.'],
      ['Mode 4', 'Separação de terreno insegura'],
      ['sub', 'Mode 4A', 'Cruzeiro e aproximação com trem de pouso recolhido'],
      ['msg', 'Aural', '"TOO LOW TERRAIN": abaixo de 150 ft de rádio altitude, acima de 60 KIAS'],
      ['msg', 'OFSH (-036)', 'Abaixo de 350 ft: "TOO LOW GEAR" abaixo de 100 KIAS e "TOO LOW TERRAIN" acima de 100 KIAS'],
      ['sub', 'Mode 4B', 'Cruzeiro e aproximação com trem de pouso estendido'],
      ['msg', 'Aural', '"TOO LOW TERRAIN": acima de 120 KIAS e abaixo de 100 ft AGL'],
      ['msg', '120 a 80 KIAS', 'O limite diminui de 100 para 10 ft AGL'],
      ['sub', 'Mode 4C', 'Decolagem com trem de pouso recolhido'],
      ['msg', 'Aural', '"TOO LOW TERRAIN": rádio altitude entra na separação mínima de terreno, com trem recolhido ou acima de 50 KIAS'],
      ['Mode 5', 'Descida abaixo do glideslope'],
      ['msg', 'Soft', '"GLIDESLOPE" com cerca de meio volume, mais de 1,3 dots abaixo do feixe'],
      ['msg', 'Hard', '"GLIDESLOPE" com volume padrão, abaixo de 300 ft (rádio altímetro) e mais de 2 dots de desvio'],
      ['msg', 'Condição', 'Apenas ILS front course ou LPV (-030 e posteriores)'],
      ['Mode 6', 'Alertas advisory para:'],
      ['sub', '', 'Ângulo de inclinação (bank) excessivo'],
      ['msg', 'Aural', '"BANK ANGLE": limite de inclinação 30° entre 10 e 50 ft AGL, 45° a 500 ft, 55° a 1000 ft e acima'],
      ['sub', '', 'Tail Too Low (cauda muito baixa)'],
      ['msg', 'Aural', '"TAIL TOO LOW": limite de pitch começa em 15° a 3 ft AGL e sobe até 48,5° a 50 ft AGL'],
      ['sub', '', 'Callouts de altitude em autorrotação.'],
      ['msg', 'Aural', '"200", "100", "80", "60", "40", "20", "10" (alturas do rádio altímetro)']
    ]
  };
  var h = '<div class="lim-section" style="margin-top:16px;">' + esc(T.title) + '</div><div class="eg-intro">' + esc(T.intro) + '</div><table class="eg3-table"><tbody>';
  T.rows.forEach(function(r){
    if (r[0] === 'note') h += '<tr class="eg3-note"><td colspan="2">' + esc(r[1]) + '</td></tr>';
    else if (r[0] === 'sub') h += '<tr class="eg3-sub"><td class="eg3-m">' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>';
    else if (r[0] === 'msg') h += '<tr class="eg3-msg"><td class="eg3-l">' + esc(r[1]) + '</td><td>' + qt(r[2]) + '</td></tr>';
    else h += '<tr><td class="eg3-m">' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>';
  });
  h += '</tbody></table>';
  document.getElementById('limPanel-egpws2').insertAdjacentHTML('beforeend', h);
})();
