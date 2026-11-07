(function(){
  var en = !!(window.AW && window.AW.lang === 'en');
  var KEY = 'aw139_abast_unit', u = null;
  try { u = localStorage.getItem(KEY); } catch (e) {}
  if (u !== 'kg' && u !== 'lb') u = window.__awAbastUnitSaved || (en ? 'lb' : 'kg');
  window.__awAbastUnit = u;
  window.__awAbastCbs = [];
  window.__awAbastRepCbs = [];
  window.__awAbastHide = true;
  var host = window.document.getElementById('appTopRight');
  if (!host) return;
  host.style.display = 'flex';
  host.innerHTML = '<button type="button" id="absUnitSw" role="switch" style="display:inline-flex;align-items:center;gap:2px;padding:2px;border-radius:999px;border:1px solid rgba(255,255,255,0.4);background:rgba(255,255,255,0.12);cursor:pointer;font-family:inherit;"><span data-u="kg">kg</span><span data-u="lb">lb</span></button>';
  var sw = host.querySelector('#absUnitSw'), sp = sw.querySelectorAll('span');
  function paint(){
    var cur = window.__awAbastUnit;
    sw.setAttribute('aria-checked', cur === 'lb' ? 'true' : 'false');
    sw.setAttribute('aria-label', en ? 'Units: kilograms or pounds' : 'Unidade: quilos ou libras');
    Array.prototype.forEach.call(sp, function(el){
      var on = el.getAttribute('data-u') === cur;
      el.style.cssText = 'min-width:26px;text-align:center;padding:4px 8px;border-radius:999px;font-size:12px;font-weight:800;letter-spacing:0.03em;transition:all .15s;' +
        (on ? 'background:#ffffff;color:#123a63;box-shadow:0 1px 3px rgba(0,0,0,0.35);' : 'background:transparent;color:#cfe0f0;');
    });
  }
  paint();
  sw.addEventListener('click', function(){
    window.__awAbastUnit = window.__awAbastUnit === 'kg' ? 'lb' : 'kg';
    window.__awAbastUnitSaved = window.__awAbastUnit;
    try { localStorage.setItem(KEY, window.__awAbastUnit); } catch (e) {}
    paint();
    (window.__awAbastCbs || []).forEach(function(f){ try { f(); } catch (e) {} });
  });
})();
