(function(){
  var en = window.AW && window.AW.lang === 'en';
  var T = en ? {
    title: 'Terrain display',
    intro: 'The terrain display presented on the PFD and MFD uses the colours green, yellow and red to indicate the following:',
    head: ['Colour', 'Meaning'],
    rows: [
      ['GREEN', '#2fb344', '#ffffff', '#e3f6e7', 'Terrain/obstacles are at least 250 ft below the aircraft\'s altitude and there is a safe terrain/obstacle clearance.'],
      ['YELLOW', '#f2c40f', '#2a2200', '#fdf6d3', 'Terrain is from 250 ft below to 500 ft above the aircraft\'s altitude. The aircraft may not have a safe terrain clearance.'],
      ['RED', '#d7191c', '#ffffff', '#fbe0e0', 'Terrain is at least 500 ft above the aircraft\'s altitude. The aircraft does not have safe terrain clearance and may not be able to escape this terrain.']
    ],
    src: 'Source: training material (slide 53). Figure redrawn from the original.'
  } : {
    title: 'Display de terreno',
    intro: 'O display de terreno apresentado no PFD e no MFD usa as cores verde, amarelo e vermelho para indicar o seguinte:',
    head: ['Cor', 'Significado'],
    rows: [
      ['VERDE', '#2fb344', '#ffffff', '#e3f6e7', 'Terreno/obstáculos estão pelo menos 250 ft abaixo da altitude da aeronave e há uma folga segura de terreno/obstáculo.'],
      ['AMARELO', '#f2c40f', '#2a2200', '#fdf6d3', 'O terreno está de 250 ft abaixo a 500 ft acima da altitude da aeronave. A aeronave pode não ter folga segura de terreno.'],
      ['VERMELHO', '#d7191c', '#ffffff', '#fbe0e0', 'O terreno está pelo menos 500 ft acima da altitude da aeronave. A aeronave não tem folga segura de terreno e pode não conseguir escapar desse terreno.']
    ],
    src: 'Fonte: material de treinamento (slide 53). Figura redesenhada a partir do original.'
  };
  // ---- figura (pirâmide de terreno) ----
  var CX = 165;
  function hw(y){ return y < 55 ? 0 : 18 + (y - 55) * 0.78; }
  function L(y){ return CX - hw(y); }
  function R(y){ return CX + hw(y); }
  function band(y1, y2, fill){
    return '<polygon points="' + L(y1) + ',' + y1 + ' ' + R(y1) + ',' + y1 + ' ' + R(y2) + ',' + y2 + ' ' + L(y2) + ',' + y2 + '" fill="' + fill + '"/>';
  }
  var svg = '<svg class="eg-fig" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Terrain display colours" font-family="Arial, Helvetica, sans-serif">' +
    '<defs>' +
    '<linearGradient id="egY1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e21c"/><stop offset="1" stop-color="#f3c20e"/></linearGradient>' +
    '<linearGradient id="egY2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3ee3a"/><stop offset="1" stop-color="#c8ee3c"/></linearGradient>' +
    '<linearGradient id="egG1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4ee23a"/><stop offset="1" stop-color="#37d63a"/></linearGradient>' +
    '<linearGradient id="egG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#90e892"/><stop offset="1" stop-color="#bff0c4"/></linearGradient>' +
    '<linearGradient id="egC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ec3e8"/><stop offset="1" stop-color="#3aa6d6"/></linearGradient>' +
    '</defs>';
  // picos vermelhos (acima de +500')
  svg += '<polygon points="' + (CX - 18) + ',55 ' + (CX - 9) + ',34 ' + (CX - 2) + ',20 ' + (CX + 4) + ',8 ' + (CX + 11) + ',24 ' + (CX + 16) + ',34 ' + (CX + 25) + ',46 ' + (CX + 18) + ',55" fill="#e0141b"/>';
  svg += band(55, 100, 'url(#egY1)') + band(100, 130, 'url(#egY2)') + band(130, 155, 'url(#egG1)') + band(155, 190, 'url(#egG2)');
  // faixa preta e corpos d'água (ciano)
  svg += '<polygon points="' + (L(190) - 8) + ',190 ' + (R(190) + 8) + ',190 ' + (R(190) + 14) + ',213 ' + (L(190) - 14) + ',213" fill="#15171a"/>';
  svg += '<polygon points="' + (L(190) - 14) + ',215 ' + (R(190) + 14) + ',215 ' + (R(190) + 14) + ',234 ' + (L(190) - 14) + ',234" fill="url(#egC)" stroke="#2a7fa8" stroke-width="1"/>';
  // linhas de referência e valores
  var LV = [[55, "+500'"], [100, "0'"], [130, "-250'"], [155, "-500'"]];
  LV.forEach(function(v){
    svg += '<line x1="' + (L(v[0]) - 2) + '" y1="' + v[0] + '" x2="340" y2="' + v[0] + '" stroke="#2b2b2b" stroke-width="' + (v[0] === 100 ? 1.2 : 0.8) + '"' + (v[0] === 100 ? ' stroke-dasharray="3 2"' : '') + '/>';
    svg += '<text x="344" y="' + (v[0] + 3) + '" font-size="9" font-weight="700" fill="#1a1a1a">' + v[1] + '</text>';
  });
  svg += '<line x1="' + (L(190) - 8) + '" y1="190" x2="340" y2="190" stroke="#2b2b2b" stroke-width="0.8"/>';
  svg += '<text x="344" y="188" font-size="9" font-weight="700" fill="#1a1a1a">-1500\'</text><text x="344" y="198" font-size="8" fill="#1a1a1a">or</text><text x="344" y="208" font-size="8.5" font-weight="700" fill="#1a1a1a">100\' + M</text>';
  // rótulos à esquerda
  function lt(y, t){ return '<text x="' + (L(y) - 5) + '" y="' + (y + 3) + '" font-size="9" font-weight="700" text-anchor="end" fill="#1a1a1a">' + t + '</text>'; }
  svg += lt(40, '50% Red').replace('x="' + (L(40) - 5) + '"', 'x="' + (CX - 24) + '"');
  svg += lt(78, '50% Yellow') + lt(115, '25% Yellow') + lt(143, '50% Green') + lt(172, '16% Green') + lt(200, 'Black');
  // rótulos internos
  svg += '<text x="' + CX + '" y="97" font-size="8.5" text-anchor="middle" fill="#3a3a3a">Aircraft Elevation</text>';
  svg += '<text x="' + CX + '" y="176" font-size="8.5" text-anchor="middle" fill="#3a3a3a">Lower Elevation #</text>';
  svg += '<text x="' + CX + '" y="205" font-size="8.5" text-anchor="middle" fill="#d9dde2">Green/Black Interface (MSL)</text>';
  svg += '<text x="' + CX + '" y="228" font-size="8.5" text-anchor="middle" fill="#14425c">CYAN - Bodies of Water</text>';
  // helicóptero
  svg += '<g transform="translate(262 82)" fill="#1d3a6e"><ellipse cx="0" cy="8" rx="15" ry="6"/><path d="M-10 4 L-6 -2 L6 -2 L10 4 Z"/><path d="M12 7 L38 3 L38 6 L13 11 Z"/><path d="M36 -3 L40 -3 L40 8 L36 6 Z"/><rect x="-1" y="-5" width="2" height="4"/><rect x="-26" y="-7" width="52" height="1.6"/><rect x="-12" y="15" width="24" height="1.6"/></g>';
  svg += '</svg>';
  var h = '<div class="lim-panel-title">' + T.title + '</div>' + svg + '<div class="eg-intro">' + T.intro + '</div>' +
    '<table class="eg-table"><thead><tr><th>' + T.head[0] + '</th><th>' + T.head[1] + '</th></tr></thead><tbody>';
  T.rows.forEach(function(r){
    h += '<tr><td class="eg-c" style="background:' + r[1] + ';color:' + r[2] + ';">' + r[0] + '</td><td style="background:' + r[3] + ';">' + r[4] + '</td></tr>';
  });
  h += '</tbody></table><div class="eg-src">' + T.src + '</div>';
  document.getElementById('limPanel-egpws').innerHTML = h;
})();
