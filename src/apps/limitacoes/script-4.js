(function(){
  var en = window.AW && window.AW.lang === 'en';
  var T = en ? {
    title: 'MCDU functions that change the alerts',
    intro: 'The EGPWS functions are controlled on the TAWS page, under the MCDU MENU button. At power-up, all options are OFF.',
    head: ['Function', 'Effect on alerts', 'CAS message (green)'],
    rows: [
      ['LOW ALT', 'For low-altitude VFR operations, to minimize nuisance alerts. Inhibits Mode 1 and Mode 2, inhibits "DON\'T SINK" above 100 ft, reduces the Mode 4 limits and the look-ahead times. Modes 5 and 6 are not affected.', 'TAWS LOW ALT'],
      ['G/S CANCEL', 'Avoids unnecessary glideslope alerts with an active ILS signal, when the pilot will deliberately descend more than 1.3 dots below the beam centre. Re-arms when climbing above 2000 ft AGL, descending below 50 ft AGL or tuning another NAV frequency.', 'TAWS GS CANCEL'],
      ['TERR INHIBIT', 'Inhibits all look-ahead visual and aural cautions and warnings. Shows TAWS INHIB in white on the PFD.', 'n/a'],
      ['MUTE', 'Inhibits all EGPWS aural alerts for 5 minutes, except the Mode 6 advisories (BANK ANGLE, TAIL TOO LOW and autorotation callouts).', 'n/a'],
      ['OFFSHORE', 'Modifies the look-ahead limits to reduce nuisance alerts. Sea-level water is shown in blue unless there is a terrain alert. Inhibits Mode 2. Mutually exclusive with NORMAL, LOW ALT and SAR.', 'TAWS OFFSHORE MODE']
    ]
  } : {
    title: 'Funções do MCDU que alteram os avisos',
    intro: 'O controle das funções do EGPWS é feito pela página TAWS, sob o botão MENU do MCDU. Na inicialização, todas as opções ficam em OFF.',
    head: ['Função', 'Efeito nos avisos', 'Mensagem CAS (verde)'],
    rows: [
      ['LOW ALT', 'Para operações VFR a baixa altitude, para minimizar alertas incômodos. Inibe Mode 1 e Mode 2, inibe "DON\'T SINK" acima de 100 ft, reduz os limites do Mode 4 e os tempos do look-ahead. Modes 5 e 6 não são afetados.', 'TAWS LOW ALT'],
      ['G/S CANCEL', 'Evita alertas de glideslope desnecessários com sinal ILS ativo, quando o piloto vai descer de propósito mais de 1,3 dots abaixo do centro do feixe. Rearma ao subir acima de 2000 ft AGL, descer abaixo de 50 ft AGL ou sintonizar outra frequência NAV.', 'TAWS GS CANCEL'],
      ['TERR INHIBIT', 'Inibe todos os cautions e warnings visuais e aurais do look-ahead. Mostra TAWS INHIB em branco no PFD.', 'n/a'],
      ['MUTE', 'Inibe todos os alertas aurais do EGPWS por 5 minutos, exceto os advisory do Mode 6 (BANK ANGLE, TAIL TOO LOW e callouts de autorrotação).', 'n/a'],
      ['OFFSHORE', 'Modifica os limites look-ahead para reduzir alertas incômodos. Água ao nível do mar aparece em azul, a menos que haja alerta de terreno. Inibe o Mode 2. Mutuamente exclusivo com NORMAL, LOW ALT e SAR.', 'TAWS OFFSHORE MODE']
    ]
  };
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var h = '<div class="lim-panel-title">' + esc(T.title) + '</div><div class="eg-intro">' + esc(T.intro) + '</div>' +
    '<table class="eg2-table"><thead><tr><th>' + T.head[0] + '</th><th>' + T.head[1] + '</th><th>' + T.head[2] + '</th></tr></thead><tbody>';
  T.rows.forEach(function(r){
    h += '<tr><td class="eg2-f">' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td class="eg2-m' + (r[2] === 'n/a' ? ' eg2-na' : '') + '">' + esc(r[2]) + '</td></tr>';
  });
  h += '</tbody></table>';
  document.getElementById('limPanel-egpws2').innerHTML = h;
})();
