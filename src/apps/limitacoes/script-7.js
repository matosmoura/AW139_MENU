// EGPWS (último quadro): "TAIL TOO LOW" e "BANK ANGLE" viram links que abrem
// as figuras TAIL STRIKE / BANK ANGLE WARNING BOUNDARY, com botão X para fechar.
(function () {
  var panel = document.getElementById('limPanel-egpws2');
  if (!panel) return;
  var LINKS = { 'TAIL TOO LOW': 'limTailModal', 'BANK ANGLE': 'limBankModal' };
  panel.querySelectorAll('.eg3-q').forEach(function (q) {
    var key = q.textContent.replace(/["\u201c\u201d]/g, '').trim().toUpperCase();
    var modal = LINKS[key] && document.getElementById(LINKS[key]);
    if (!modal) return;
    var a = document.createElement('button');
    a.type = 'button'; a.className = 'eg3-link'; a.textContent = q.textContent;
    a.setAttribute('aria-label', key);
    a.addEventListener('click', function () { modal.hidden = false; });
    q.textContent = ''; q.appendChild(a);
  });
  Object.keys(LINKS).forEach(function (k) {
    var modal = document.getElementById(LINKS[k]); if (!modal) return;
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.hidden = true; });
    var x = modal.querySelector('[data-close]'); if (x) x.addEventListener('click', function () { modal.hidden = true; });
  });
})();
