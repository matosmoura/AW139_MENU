// EGPWS (último quadro): "TAIL TOO LOW" vira link que abre a figura
// TAIL STRIKE WARNING BOUNDARY, com botão X para fechar.
(function () {
  var panel = document.getElementById('limPanel-egpws2');
  var modal = document.getElementById('limTailModal');
  if (!panel || !modal) return;
  function open() { modal.hidden = false; }
  function close() { modal.hidden = true; }
  panel.querySelectorAll('.eg3-q').forEach(function (q) {
    if (q.textContent.replace(/["\u201c\u201d]/g, '').trim().toUpperCase() !== 'TAIL TOO LOW') return;
    var a = document.createElement('button');
    a.type = 'button'; a.className = 'eg3-link'; a.textContent = q.textContent;
    a.setAttribute('aria-label', 'TAIL TOO LOW');
    a.addEventListener('click', open);
    q.textContent = ''; q.appendChild(a);
  });
  document.getElementById('limTailClose').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
})();
