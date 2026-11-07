(function(){
  var dt = document.getElementById('absDt');
  function p2(n){ return (n < 10 ? '0' : '') + n; }
  function agora(){
    var n = new Date();
    return p2(n.getDate()) + '/' + p2(n.getMonth() + 1) + '/' + n.getFullYear() + ' ' + p2(n.getHours()) + ':' + p2(n.getMinutes());
  }
  // a cada toque no campo, atualiza com a data e hora atuais do aparelho; depois pode ser editado pelo teclado
  function preenche(){
    dt.value = agora();
    try { dt.setSelectionRange(dt.value.length, dt.value.length); } catch (e) {}
  }
  dt.addEventListener('focus', preenche);
  dt.addEventListener('click', preenche);
})();
