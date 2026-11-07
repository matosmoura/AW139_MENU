
  window.addEventListener('error', function(e){
    var b = document.getElementById('diagBanner');
    if (!b) return;
    b.style.display = 'block';
    b.textContent += 'ERRO: ' + e.message + '  (linha ' + e.lineno + ')\n';
  });

  (function(){
    var backBtn = document.getElementById('ndlBackBtn');
    if (!backBtn) return;
    backBtn.addEventListener('click', function(){
      var realBackBtn = window.document.getElementById('backBtn');
      if (realBackBtn) { realBackBtn.click(); }
    });
  })();
