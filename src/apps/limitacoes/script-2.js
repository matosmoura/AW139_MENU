
(function(){
  var en = window.AW && window.AW.lang === 'en';
  var T = en ? {
    title: 'VNE power on airspeed limitation (KIAS)',
    above: 'Above 6800 kg: Vne PWR ON / OEI / PWR OFF = 147 KIAS',
    corner: ['Hp ft', 'OAT °C'], first: '-1000 to SL', below: 'and below',
    foot1: 'VNE OEI / PWR OFF = VNE PWR ON less 20 KIAS', foot2: 'VLE / VLO = 150 KIAS',
    src: 'Source: RFM Supplement 90 (weight extension 7000 kg), placard A.'
  } : {
    title: 'Limitação de velocidade VNE com potência (PWR ON) — KIAS',
    above: 'Acima de 6800 kg: Vne PWR ON / OEI / PWR OFF = 147 KIAS',
    corner: ['Hp ft', 'OAT °C'], first: '-1000 a SL', below: 'e abaixo',
    foot1: 'VNE OEI / PWR OFF = VNE PWR ON menos 20 KIAS', foot2: 'VLE / VLO = 150 KIAS',
    src: 'Fonte: RFM Suplemento 90 (extensão de peso 7000 kg), placard A.'
  };
  var HP = [T.first, '4000', '8000', '10000', '15000', '20000'];
  var D = [
    ['50', ['160','-','-','-','-','-']],
    ['20', ['167','157','145','147','128','-']],
    ['10', ['167','159','147','151','133','-']],
    ['0',  ['167','162','150','156','136','-']],
    ['-10',['167','164','154','159','139','-']],
    ['-25 ' + T.below, ['167','167','158','165','144','125']]
  ];
  var h = '<div class="lim-panel-title">' + T.title + '</div>' +
    '<div class="vne-above">' + T.above + '</div>' +
    '<table class="vne-table"><thead><tr><th class="vne-oat">' + T.corner[0] + ' →<br>' + T.corner[1] + ' ↓</th>';
  HP.forEach(function(x){ h += '<th>' + x + '</th>'; });
  h += '</tr></thead><tbody>';
  D.forEach(function(r){
    h += '<tr><td class="vne-oat">' + r[0] + '</td>';
    r[1].forEach(function(v){ h += '<td' + (v === '-' ? ' class="vne-na"' : '') + '>' + (v === '-' ? '—' : v) + '</td>'; });
    h += '</tr>';
  });
  h += '</tbody></table>' +
    '<div class="vne-foot"><div>' + T.foot1 + '</div><div>' + T.foot2 + '</div></div>' +
    '<div class="vne-src">' + T.src + '</div>';
  document.getElementById('limPanel-vne').innerHTML = h;
})();
