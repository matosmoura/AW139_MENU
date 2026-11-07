(function(){
  var en = window.AW && window.AW.lang === 'en';
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  var P = en ? {
    title: 'IFR to offshore units',
    intro: 'IFR flight to Offshore Units follows the general IFR rules contained in ICA 100-12 and ICA 100-04, with the applicable RBAC 135 restrictions, of which the following items stand out:',
    s1: 'IFR flight: operating limitations (RBAC 135.215)',
    t1: 'Except as provided in paragraphs (b), (c) and (d) of this section (135.215), it is forbidden to operate an aircraft under IFR outside controlled airspace or at an aerodrome that does not have an approved instrument approach procedure.',
    s2: 'IFR: take-off limitations (RBAC 135.217)',
    a: 'It is only permitted to take off from an aerodrome under IFR where the weather conditions are at or above the take-off minimums, but below the minimums authorized for landing, if there is an alternate aerodrome:',
    a1: 'less than 1 hour of flight from the take-off aerodrome (considering normal cruise speed, in still air); and ...',
    b: 'For an aerodrome to be selected as a take-off alternate, the information available under section 135.213 of this Regulation must indicate that, during the planned period of use, the weather conditions will be above the usage minimums of the intended aerodrome.',
    s3: 'IFR: weather minimums of the alternate aerodrome (RBAC 135.221)',
    t3: 'Helicopters. Except as otherwise authorized by ANAC, an aerodrome may only be indicated as an alternate aerodrome in an IFR flight plan if the weather information or forecasts indicate that, at the estimated time of arrival at that aerodrome, the ceiling and visibility will be at or above the weather minimums indicated below:',
    c1: 'if there are approved instrument approach procedures for the alternate aerodrome, the ceiling must be 200 feet above the minimum for the procedure to be used, and the visibility must be at least 1 mile (1.6 km) and greater than the visibility required for the procedure to be used; [...]',
    s4: 'General items',
    g: [
      'All IFR flights must be stabilized at 1000 ft height.',
      'It should be stressed that the IFR particularities of each location are contained in the AIC and Operational Agreements referred to in item 05 of this lesson.',
      'The type of instrument flight to be filled in the FPL will be “Y” or “Z”, depending on the SID to be used.',
      'For a PINS SID from the mainland to platforms, the plan must be “Z” and, in this case, the route (FPL field 15) must include the VFR-to-IFR change segment and also the IFR-to-VFR segment. The return from the platforms to the mainland, where PINS procedures exist, must be filled in as “Z” and the route (FPL field 15) must include the change from VFR to IFR.'
    ]
  } : {
    title: 'IFR para unidades marítimas',
    intro: 'O voo IFR para Unidades Marítimas seguirá as regras gerais para voo IFR que constam nas ICA 100-12 e ICA 100-04, com as devidas restrições do RBAC 135, onde destacam-se os seguintes itens:',
    s1: 'Voo IFR: limitações operacionais (RBAC 135.215)',
    t1: 'Exceto como previsto nos parágrafos (b), (c) e (d) desta seção (135.215), é vedado operar uma aeronave em voo IFR fora do espaço aéreo controlado ou em um aeródromo que não tenha um procedimento de aproximação por instrumentos aprovado.',
    s2: 'IFR: limitações de decolagem (RBAC 135.217)',
    a: 'Somente é permitido decolar uma aeronave de um aeródromo em voo IFR onde as condições meteorológicas estejam nos mínimos ou acima dos mínimos para decolagem, mas abaixo dos mínimos autorizados para pouso, se existir um aeródromo de alternativa:',
    a1: 'a menos de 1 hora de voo do aeródromo de decolagem (considerando velocidade normal de cruzeiro, com ar calmo); e ...',
    b: 'Para que um aeródromo seja selecionado como de alternativa de decolagem, a informação disponível conforme seção 135.213 deste Regulamento deverá indicar que, no período previsto de utilização, as condições meteorológicas estarão acima dos mínimos de utilização do aeródromo pretendido.',
    s3: 'IFR: mínimos meteorológicos do aeródromo de alternativa (RBAC 135.221)',
    t3: 'Helicópteros. Exceto se de outra forma autorizado pela ANAC, somente é permitido indicar um aeródromo como aeródromo de alternativa em um plano de voo IFR se as informações ou previsões meteorológicas indicarem que, no horário estimado de chegada nesse aeródromo, o teto e a visibilidade estarão nos mínimos ou acima dos mínimos meteorológicos indicados a seguir:',
    c1: 'se houver procedimentos de aproximação por instrumentos aprovados para o aeródromo de alternativa, o teto deve ser 200 pés acima do mínimo para o procedimento a ser utilizado, e a visibilidade deve ser de pelo menos 1 milha (1,6 km) e superior à visibilidade requerida para o procedimento a ser utilizado; [...]',
    s4: 'Itens gerais',
    g: [
      'Todos os voos IFR devem estar estabilizados a 1000 ft de altura.',
      'Cabe ressaltar que as particularidades para voo IFR de cada localidade constam nas AIC e Acordos Operacionais referidos no item 05 desta aula.',
      'O tipo de voo instrumento a ser preenchido no FPL será “Y” ou “Z”, dependendo da SID a ser utilizada.',
      'Para uma SID PINS do continente para plataformas, o plano deverá ser “Z” e, neste caso, na rota (campo 15 do FPL) deverá constar o trecho de mudança de VFR para IFR e também o trecho IFR para VFR. O retorno das plataformas para o continente, no caso da existência dos procedimentos PINS, deverá ser preenchido como “Z” e na rota (campo 15 do FPL) deverá constar a mudança do VFR para IFR.'
    ]
  };
  function li(mark, text, extra){ return '<li><b>' + esc(mark) + '</b><span>' + esc(text) + (extra || '') + '</span></li>'; }
  var h = '<div class="lim-panel-title">' + esc(P.title) + '</div><div class="ifr-intro">' + esc(P.intro) + '</div>';
  h += '<div class="lim-section">' + esc(P.s1) + '</div><div class="ifr-txt">' + esc(P.t1) + '</div>';
  h += '<div class="lim-section">' + esc(P.s2) + '</div><ul class="ifr-list">' +
    li('a)', P.a, '</span></li></ul><ul class="ifr-list ifr-sub" style="margin:0"><li><b>1.</b><span>' + esc(P.a1)).replace('</span></li></ul><ul class="ifr-list ifr-sub" style="margin:0"><li><b>1.</b><span>' + esc(P.a1) + '</span></li>', '') ;
  // monta o item a) com subitem 1.
  h = h.slice(0, h.indexOf('<ul class="ifr-list">'));
  h += '<ul class="ifr-list"><li><b>a)</b><span>' + esc(P.a) + '<ul class="ifr-list ifr-sub">' + li('1.', P.a1) + '</ul></span></li>' + li('b)', P.b) + '</ul>';
  h += '<div class="lim-section">' + esc(P.s3) + '</div><div class="ifr-txt">' + esc(P.t3) + '</div><ul class="ifr-list">' + li('1.', P.c1) + '</ul>';
  h += '<div class="lim-section">' + esc(P.s4) + '</div><ul class="ifr-list">';
  P.g.forEach(function(t){ h += li('•', t); });
  h += '</ul>';
  document.getElementById('limPanel-ifr-maritima').innerHTML = h;
})();
