(function(){
'use strict';
var W=window.WB;

/* ---------- idioma (PT/EN): tradução da tela e do relatório ---------- */
var EN=!!(window.AW&&window.AW.lang==='en');
var TR_EXACT={
 'Preparando imagem…':'Preparing image…',
 'PESO E BALANCEAMENTO / C.G':'WEIGHT AND BALANCE / C.G','LIMPAR':'CLEAR','CONFIRMAR?':'CONFIRM?','LIMPAR SALVOS':'CLEAR SAVED','CONFIRMAR APAGAR?':'CONFIRM DELETE?',
 'Matrícula':'Registration','Data / Hora':'Date / Time','Toque aqui':'Tap here','Unidade':'Unit','litros':'liters','Resultado':'Result',
 'Envelope longitudinal':'Longitudinal envelope','Envelope lateral':'Lateral envelope','GERAR RELATÓRIO':'GENERATE REPORT','Remover':'Remove','Limpar':'Clear',
 'Configuração':'Configuration','Dispositivo':'Device','Descrição':'Description','Item':'Item','Carregamento':'Loading','Combustível':'Fuel','Resultados':'Results',
 'Bagageiro':'Baggage compartment','Aguardando dados':'Waiting for data','Aguardando dados.':'Waiting for data.','DENTRO':'WITHIN','FORA':'OUT',
 'Informe o peso vazio para calcular':'Enter the empty weight to calculate','Peso':'Weight','Zero fuel':'Zero fuel',
 'APROVAÇÃO':'APPROVAL',
 'Configuração da cabine':'Cabin configuration','Croqui da cabine':'Cabin layout','Unidades':'Units',
 'Envelope de CG longitudinal':'Longitudinal CG envelope','Envelope de CG lateral':'Lateral CG envelope',
 'Aviso sobre bagagem em assentos de passageiros':'Notice about baggage on passenger seats','Aviso sobre cálculo dos braços':'Notice about arm calculation',
 'Relatório de peso e balanceamento':'Weight and balance report','Fechar':'Close',
 'Apagar os dados das aeronaves?':'Delete the aircraft data?','Apagar os dados das aeronaves':'Delete the aircraft data','CANCELAR':'CANCEL','APAGAR':'DELETE','SALVAR':'SAVE','Carregar':'Load','Aeronaves salvas / salvar aeronave':'Saved aircraft / save aircraft','Aeronaves salvas':'Saved aircraft','FECHAR':'CLOSE','Nenhuma aeronave salva.':'No saved aircraft.','Apagar aeronave':'Delete aircraft','Salvar dados da aeronave?':'Save the aircraft data?','Salvar dados da aeronave':'Save the aircraft data','CONFIRMAR':'CONFIRM'
};
var TR_PHRASES=[
 ['Itens de bagagem ou carga leve que não excedam ','Baggage items or light cargo not exceeding '],
 [' de peso por item podem ser acomodados em assentos de passageiros vazios quando o compartimento de bagagem tiver atingido sua capacidade. Todos os itens transportados em assentos de passageiros devem ser firmemente presos usando os cintos de segurança normais.',' per item may be carried on empty passenger seats when the baggage compartment has reached its capacity. All items carried on passenger seats must be firmly secured using the normal seat belts.'],
 ['Ao transportar passageiros, somente os seguintes assentos podem ser usados para essa finalidade, na ordem de prioridade listada abaixo (a menos que os limites de centro de gravidade determinem de outra forma):','When carrying passengers, only the following seats may be used for this purpose, in the order of priority listed below (unless the center of gravity limits dictate otherwise):'],
 ['*Nota: Se bagagem ou carga leve for carregada nos assentos 3B ou 3C, é proibido que passageiros ocupem os outros assentos dessa fileira.','*Note: If baggage or light cargo is loaded on seats 3B or 3C, passengers are not allowed to occupy the other seats of that row.'],
 ['*PESQUISAR FICHA DE PESO E BALANCEAMENTO DA AERONAVE*','*LOOK UP THE AIRCRAFT WEIGHT AND BALANCE SHEET*'],
 ['Cálculo do braço longitudinal é obtido dividindo o valor de ','The longitudinal arm is obtained by dividing the total '],
 ['Cálculo do braço lateral é obtido dividindo ','The lateral arm is obtained by dividing the total '],
 ['MOMENTO LONGITUDINAL','LONGITUDINAL MOMENT'],['MOMENTO LATERAL','LATERAL MOMENT'],['PESO LÍQUIDO','NET WEIGHT'],[' total pelo ',' by the total '],
 ['Braço do combustível pela tabela "Total Fuel" do RFM (interpolada), BL 0. Combustível inutilizável (16 kg) já está no peso vazio.','Fuel arm from the RFM "Total Fuel" table (interpolated), BL 0. Unusable fuel (16 kg) is already included in the empty weight.'],
 ['Toque no assento para informar o peso do passageiro. Vista superior, nariz à esquerda; direita da aeronave no topo.','Tap a seat to enter the passenger weight. Top view, nose to the left; aircraft right side at the top.'],
 ['Peso total por fileira, usando o STA da fileira e BL 0 (passageiros distribuídos simetricamente). Para carga assimétrica, use o modo por assento.','Total weight per row, using the row STA and BL 0 (passengers distributed symmetrically). For asymmetric loading, use the per-seat mode.'],
 ['Escolha a configuração (letra) e o dispositivo instalado, conforme o diário da aeronave. Posições do suplemento 7012FMS (tolerância ±25 mm). Incubadora e cilindros não estão incluídos nos pesos dos ITS: lance-os em Itens adicionais.','Choose the configuration (letter) and the installed device, per the aircraft logbook. Positions from supplement 7012FMS (tolerance ±25 mm). Incubator and cylinders are not included in the ITS weights: enter them under Additional items.'],
 ['EMS: confirme limites e pesos do suplemento (Seção 2) e o peso vazio com a configuração médica instalada (diário de bordo).','EMS: confirm the supplement limits and weights (Section 2) and the empty weight with the medical configuration installed (logbook).'],
 ['Considera a carga centralizada no bagageiro','Assumes the load centered in the baggage compartment'],
 ['Rede de contenção instalada no bagageiro','Cargo net installed in the baggage compartment'],
 ['Combustível de decolagem acima da capacidade utilizável','Takeoff fuel above the usable capacity'],
 ['Combustível de pouso maior que o de decolagem.','Landing fuel greater than takeoff fuel.'],
 ['Há ponto intermediário com mais combustível que a decolagem.','An intermediate point has more fuel than takeoff.'],
 ['Acima do peso máximo de decolagem do envelope estendido','Above the extended envelope maximum takeoff weight'],
 ['Abaixo do peso mínimo de voo','Below the minimum flight weight'],
 ['Todas as condições dentro dos limites aplicáveis','All conditions within the applicable limits'],
 ['TODAS AS CONDIÇÕES DENTRO DOS LIMITES','ALL CONDITIONS WITHIN LIMITS'],['FORA DOS LIMITES','OUT OF LIMITS'],['Fora dos limites','Out of limits'],
 ['ficha da operadora, acima de 6400 kg (máx. 7000 kg)',"operator's sheet, above 6400 kg (max. 7000 kg)"],
 ['(referência: limites de 4400 kg)','(reference: 4400 kg limits)'],
 ['(envelope estendido, acima de 6400 kg)','(extended envelope, above 6400 kg)'],
 ['tracejado = limites laterais acima de 6400 kg (ficha)','dashed = lateral limits above 6400 kg (sheet)'],
 ['Pontos vermelhos / ✕ = fora do envelope.','Red points / ✕ = outside the envelope.'],
 ['AW139 – Relatório de Peso e Balanceamento','AW139 – Weight and Balance Report'],['AW139 – Peso e Balanceamento','AW139 – Weight and Balance'],
 ['Envelope longitudinal (CG × peso)','Longitudinal envelope (CG × weight)'],['Envelope lateral (CG × peso)','Lateral envelope (CG × weight)'],
 ['trajetória do consumo','fuel burn path'],['vermelho/✕ = fora','red/✕ = out'],
 ['Bagageiro (peso acima do limite)','Baggage compartment (weight above limit)'],
 ['ERRO: peso do bagageiro (','ERROR: baggage weight ('],[') acima do limite de ',') above the limit of '],[' com rede instalada.',' with net installed.'],[' sem rede instalada.',' without net installed.'],
 [') acima do limite da configuração (',') above the configuration limit ('],[', incluindo tripulação).',', including crew).'],['Ocupantes (','Occupants ('],
 ['Peso: dentro do limite','Weight: within limit'],['Peso dentro do limite','Weight within limit'],
 ['Longitudinal dentro','Longitudinal within'],['Longitudinal FORA','Longitudinal OUT'],['Lateral dentro','Lateral within'],['Lateral FORA','Lateral OUT'],
 ['à frente do limite','forward of limit'],['atrás do limite','aft of limit'],['folga diant.','fwd margin'],['folga esq.','left margin'],
 ['Envelope estendido','Extended envelope'],
 ['Peso vazio da aeronave','Aircraft empty weight'],['Peso vazio','Empty weight'],['Braço long. – STA','Long. arm – STA'],['Braço lat. – BL','Lat. arm – BL'],
 ['Momento long.','Long. moment'],['Momento lat.','Lat. moment'],['Braço do bagageiro (centralizado)','Baggage arm (centered)'],
 ['Dados da aeronave','Aircraft data'],['Tripulação','Crew'],['Bagagem e itens adicionais','Baggage and additional items'],
 ['Configuração médica (EMS)','Medical configuration (EMS)'],['Passageiros (','Passengers ('],[' assentos)',' seats)'],
 ['Piloto – direita','Pilot – right'],['Cop. – esquerda','Copilot – left'],['Piloto (direita)','Pilot (right)'],['Cop. (esquerda)','Copilot (left)'],
 ['(piloto) e ','(pilot) and '],['(copiloto).','(copilot).'],['(com rede)','(with net)'],['(sem rede)','(without net)'],
 ['+ Item adicional','+ Additional item'],['Item adicional','Additional item'],['+ Item predefinido…','+ Preset item…'],['+ Ponto intermediário','+ Intermediate point'],['+ Posição médica','+ Medical position'],
 ['Densidade (kg/L)','Density (kg/L)'],['Densidade:','Density:'],
 ['Maca (ocupante + maca)','Stretcher (occupant + stretcher)'],['(deck + ocupante)','(deck + occupant)'],['Suporte de equipamentos','Equipment mount'],
 ['Ocupantes e macas (peso total)','Occupants and stretchers (total weight)'],['Peso total (ocupantes + macas)','Total weight (occupants + stretchers)'],
 ['Peso do equipamento','Equipment weight'],['Peso do paciente/ocupante','Patient/occupant weight'],['Peso do dispositivo','Device weight'],['Maca (P/N)','Stretcher (P/N)'],
 ['Cabeça para trás (+','Head aft (+'],[' mm na estação)',' mm on station)'],
 ['Adaptador de maca','Stretcher adapter'],['Ponte de maca','Stretcher bridge'],['Incubadora/ITS','Incubator/ITS'],
 ['Bagageiro – frente','Baggage – front'],['Bagageiro – centro','Baggage – center'],['Bagageiro – atrás','Baggage – aft'],['Outra posição…','Other position…'],
 ['BL (centralizado)','BL (centered)'],['Posição (STA)','Position (STA)'],['distribuição simétrica','symmetric distribution'],
 ['Peso total','Total weight'],[' – peso (',' – weight ('],['Próximo ▶','Next ▶'],['◀ FRENTE','◀ FRONT'],['TRÁS ▶','AFT ▶'],
 ['Intermediário','Intermediate'],['Decolagem','Takeoff'],['Pouso','Landing'],['Combustível','Fuel'],['Configuração','Configuration'],['Unidades','Units'],
 ['Data/Hora','Date/Time'],['Matrícula','Registration'],['Assentos','Seats'],['Assento','Seat'],['Fileira','Row'],['Posição','Position'],
 ['Bagageiro','Baggage compartment'],['Peso','Weight'],['limites','limits'],['Máx.','Max.'],['AVISO','NOTICE'],
 ['✓ Dentro','✓ Within'],['✕ Fora','✕ Out'],[' dentro',' within'],[' FORA',' OUT']
];
TR_PHRASES.sort(function(a,b){return b[0].length-a[0].length;});
var TR_RX=TR_PHRASES.map(function(p){
  // limite de palavra só quando a frase começa/termina com letra (evita trocar pedaços de palavras)
  var L=/^[A-Za-zÀ-ÿ]/.test(p[0]),R=/[A-Za-zÀ-ÿ]$/.test(p[0]);
  return [new RegExp((L?'(^|[^A-Za-zÀ-ÿ])':'()')+p[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+(R?'(?=$|[^A-Za-zÀ-ÿ])':''),'g'),p[1]];});
function tr(s){
  if(!EN||s==null)return s; s=String(s);
  var t=s.trim(); if(!t)return s;
  if(Object.prototype.hasOwnProperty.call(TR_EXACT,t))return s.replace(t,TR_EXACT[t]);
  var o=s;
  o=o.replace(/limites (\S+ \S+) a (\S+ \S+)/g,'limits $1 to $2').replace(/ \/ tras\. /g,' / aft ').replace(/ \/ dir\. /g,' / right ').replace(/ \(esq\.\)/g,' (left)').replace(/ \(dir\.\)/g,' (right)').replace(/ e (\d)([BC]) /g,' and $1$2 ').replace(/^(Assentos? \S+) e /,'$1 and ');
  TR_RX.forEach(function(r){o=o.replace(r[0],function(m,pre){return pre+r[1];});});
  return o;
}
function trNode(n){ if(n.nodeType===3){var v=tr(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;} }
function trTree(root){
  if(!EN||!root)return;
  if(root.nodeType===3){trNode(root);return;}
  if(root.nodeType!==1)return;
  var w=window.document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),list=[];while(w.nextNode())list.push(w.currentNode);list.forEach(trNode);
  [root].concat([].slice.call(root.querySelectorAll('[placeholder],[aria-label],[title]'))).forEach(function(el){['placeholder','aria-label','title'].forEach(function(a){if(el.hasAttribute&&el.hasAttribute(a)){var v=tr(el.getAttribute(a));if(v!==el.getAttribute(a))el.setAttribute(a,v);}});});
}

var KG_LB=2.2046226218, MM_IN=25.4;

function def(){return {
  units:'metric', cfg:'12', empty:{w:null,mlong:null,mlat:null}, oil:false,
  crew:{pilot:null,copilot:null}, paxMode:'seat', seats:{}, rows:{1:{w:null,bl:null},2:{w:null,bl:null},3:{w:null,bl:null}},
  bag:{w:null,arm:7700,net:true}, extras:[], ems:[], fuel:{unit:'kg',density:0.8,to:null,ldg:null,mids:[]}, sel:null
};}
var S=def();S.reg='';S.dt='';
var FKEY='aw139wb.fleet.v1';
function regKey(r){return String(r||'').toUpperCase().replace(/[^A-Z0-9]/g,'');}
// máscara da matrícula: XX-XXX
function regFmt(r){var k=regKey(r).slice(0,5);return k.length>2?k.slice(0,2)+'-'+k.slice(2):k;}
function getFleet(){try{return JSON.parse(localStorage.getItem(FKEY)||'{}')||{};}catch(e){return {};}}
function applyProfile(p){
  if(p.cfg==='12'||p.cfg==='15'||p.cfg==='ems')S.cfg=p.cfg;
  if(p.units==='metric'||p.units==='imp')S.units=p.units;
  if(p.empty)S.empty={w:p.empty.w==null?null:p.empty.w,mlong:p.empty.mlong==null?null:p.empty.mlong,mlat:p.empty.mlat==null?null:p.empty.mlat};
}
var KEY='aw139wb.v1';
function load(){try{var j=JSON.parse(localStorage.getItem(KEY)||'null');if(j){
  ['units','oil','paxMode'].forEach(function(k){if(j[k]!=null)S[k]=j[k];});
  if(j.bagNet===false)S.bag.net=false; 
  if(j.fuelUnit)S.fuel.unit=j.fuelUnit; if(j.density)S.fuel.density=j.density;
}}catch(e){}
  S.regKey='';}
function save(){try{localStorage.setItem(KEY,JSON.stringify({reg:S.reg,units:S.units,cfg:S.cfg,oil:S.oil,paxMode:S.paxMode,empty:S.empty,bagNet:S.bag.net,fuelUnit:S.fuel.unit,density:S.fuel.density}));}catch(e){}}
load();

var imp=function(){return S.units==='imp';};
function fromSI(k,v){ if(k==='w')return imp()?v*KG_LB:v; if(k==='l')return imp()?v/MM_IN:v;
  if(k==='f'){var u=S.fuel.unit;return u==='kg'?v:(u==='L'?v/S.fuel.density:v*KG_LB);} return v;}
function toSI(k,v){ if(k==='w')return imp()?v/KG_LB:v; if(k==='l')return imp()?v*MM_IN:v;
  if(k==='f'){var u=S.fuel.unit;return u==='kg'?v:(u==='L'?v*S.fuel.density:v/KG_LB);} return v;}
function dec(k){return k==='l'?(imp()?2:1):1;}
function fmtIn(k,v){return String(+fromSI(k,v).toFixed(dec(k)));}
function nf(v,d){return (+v).toLocaleString(EN?'en-US':'pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});}
function wTxt(kg){return nf(fromSI('w',kg),imp()?0:0)+' '+(imp()?'lb':'kg');}
function lTxt(mm,sign){var v=fromSI('l',mm);var s=nf(v,imp()?2:1);if(sign&&v>0)s='+'+s;return s+' '+(imp()?'in':'mm');}
function gp(p){return p.split('.').reduce(function(o,k){return o==null?o:o[k];},S);}
function sp(p,v){var k=p.split('.');var last=k.pop();var o=k.reduce(function(o,x){return o[x];},S);o[last]=v;}
function num(v){return +v||0;}
function $(id){return document.getElementById(id);}

/* ---------- entradas ---------- */
function refreshInputs(){
  if($('reg')&&document.activeElement!==$('reg'))$('reg').value=regFmt(S.reg);
  if($('dt'))$('dt').value=S.dt||'';
  document.querySelectorAll('[data-bind]').forEach(function(el){
    if(el===document.activeElement)return;
    var v=gp(el.dataset.bind);
    el.value=(v==null)?'':(el.dataset.k?fmtIn(el.dataset.k,v):String(v));
  });
  var u={w:imp()?'lb':'kg',l:imp()?'in':'mm',f:S.fuel.unit==='L'?'L':(S.fuel.unit==='lb'?'lb':'kg')};
  document.querySelectorAll('[data-u]').forEach(function(el){el.textContent='';el.setAttribute('data-ut',u[el.dataset.u]);});
  document.querySelectorAll('#segCfg button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.cfg===S.cfg);});
  document.querySelectorAll('#segUnits button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.units===S.units);});
  $('crewHint').textContent='STA '+lTxt(2820)+' · BL '+lTxt(550,true)+' (piloto) e '+lTxt(-550)+' (copiloto).';
  $('presetExtra').style.display=S.cfg==='ems'?'':'none';
  $('bagNet').checked=S.bag.net;
  $('bagHint').textContent='Máx. '+(S.bag.net?300:200)+' kg ('+(S.bag.net?'com':'sem')+' rede). Considera a carga centralizada no bagageiro (STA 7700 mm, BL 0).'; $('fuelUnit').value=S.fuel.unit;
  $('bagArmTxt').textContent='STA '+lTxt(7700);
}
document.addEventListener('input',function(e){
  var el=e.target; if(!el.dataset||!el.dataset.bind)return;
  var raw=el.value; var v=raw===''?null:parseFloat(raw);
  if(v!=null&&isNaN(v))v=null;
  if(v!=null&&el.dataset.k)v=toSI(el.dataset.k,v);
  sp(el.dataset.bind,v);
  if(el.dataset.bind.indexOf('empty.')===0||el.dataset.bind==='fuel.density')save();
  update();
});

/* ---------- cabine ---------- */
var EMS_LBL={STR:'Maca (ocupante + maca)',I006:'ITS 1307-006 (deck + ocupante)',I001:'ITS 1307-001 (deck + ocupante)',I302:'ITS 1302-002 (deck + ocupante)',I307:'ITS 1302-007 (deck + ocupante)',EQ:'Suporte de equipamentos',OS:'Ocupantes e macas (peso total)'};
function seatsList(){return S.cfg==='15'?W.SEATS_15:W.SEATS_12;}
function renderCabin(){
  var host=$('secCabin');
  if(S.cfg==='ems'){ renderEms(host); return; }
  var h='<h2>3 · Passageiros ('+S.cfg+' assentos)</h2>';
  h+='<hr class="sep" style="margin:10px 0 0"><div style="display:flex;justify-content:space-between;gap:8px;align-items:stretch;margin:12px 0 12px"><div class="seg" id="segMode" style="flex:0 0 56%;min-width:0;display:flex"><button style="flex:1 1 0;min-width:0;white-space:nowrap" data-mode="seat" aria-pressed="'+(S.paxMode==='seat')+'">Assento</button><button style="flex:1 1 0;min-width:0;white-space:nowrap" data-mode="row" aria-pressed="'+(S.paxMode==='row')+'">Fileira</button></div><button class="btn sm" data-act="aviso" style="flex:0 0 auto;font-weight:700;letter-spacing:.04em;white-space:nowrap;border-color:var(--warn);color:var(--warn)">⚠ AVISO</button></div><hr class="sep" style="margin:0 0 10px">';
  if(S.paxMode==='seat'){
    h+='<p class="hint">Toque no assento para informar o peso do passageiro. Vista superior, nariz à esquerda; direita da aeronave no topo.</p>';
    h+=croqui();
    h+='<div id="editor"></div>';
  } else {
    h+='<p class="hint">Peso total por fileira, usando o STA da fileira e BL 0 (passageiros distribuídos simetricamente). Para carga assimétrica, use o modo por assento.</p>';
    W.ROWS[S.cfg].forEach(function(r){
      h+='<div class="item"><div class="top"><b>Fileira '+r.n+'</b><span>STA '+lTxt(r.sta)+'</span></div>'+
      '<label class="f">Peso total (<span data-u="w"></span>)<input type="number" step="any" inputmode="decimal" data-bind="rows.'+r.n+'.w" data-k="w"></label><div class="loc">BL 0 (distribuição simétrica)</div></div>';
    });
  }
  host.innerHTML=h; renderEditor(); refreshInputs(); paintSeats();
}
function croqui(){
  var X=function(sta){return 40+(sta-2400)*(640/3600);}, Y=function(bl){return 125-bl*0.105;};
  var s='<svg class="croqui" viewBox="0 0 720 296" role="group" aria-label="Croqui da cabine">';
  s+='<path d="M24 125 Q24 24 100 13 L690 13 L690 237 L100 237 Q24 226 24 125Z" fill="var(--bg)" stroke="var(--ink2)" stroke-width="3.5" stroke-linejoin="round"/>';
  s+='<line x1="30" y1="125" x2="690" y2="125" stroke="var(--ink3)" stroke-width="1.5" stroke-dasharray="10 6" opacity=".7"/>';
  s+='<path d="M150 13 L150 237" stroke="var(--ink3)" stroke-width="1.5" opacity=".55"/>';
  s+='<text x="34" y="289" font-size="19" font-weight="600" fill="var(--ink2)">◀ FRENTE</text><text x="690" y="289" font-size="19" font-weight="600" fill="var(--ink2)" text-anchor="end">TRÁS ▶</text>';
  [[1,3415],[2,4789],[3,5600]].forEach(function(r){s+= '<text x="'+X(r[1])+'" y="264" font-size="18" fill="var(--ink2)" text-anchor="middle">Fileira '+r[0]+'</text>';});
  [['pilot','P',550],['copilot','C',-550]].forEach(function(c){
    s+='<g class="crewg" id="crew-'+c[0]+'"><rect x="'+(X(2820)-26)+'" y="'+(Y(c[2])-19)+'" width="52" height="38" rx="8"/><text x="'+X(2820)+'" y="'+(Y(c[2])-3)+'" text-anchor="middle">'+c[1]+'</text><text class="cw" x="'+X(2820)+'" y="'+(Y(c[2])+13)+'" text-anchor="middle" style="font-weight:700;font-size:20px"></text></g>';
  });
  seatsList().forEach(function(st){
    var cx=X(st.sta), cy=Y(st.bl);
    s+='<g class="seatg" data-seat="'+st.id+'" role="button" tabindex="0" aria-label="Assento '+st.id+'"><rect x="'+(cx-27)+'" y="'+(cy-19)+'" width="54" height="38" rx="8"/><text class="id" x="'+cx+'" y="'+(cy-6)+'" text-anchor="middle">'+st.id+'</text><text class="wt" x="'+cx+'" y="'+(cy+13)+'" text-anchor="middle"></text></g>';
  });
  return s+'</svg>';
}
function paintSeats(){
  seatsList().forEach(function(st){
    var g=document.querySelector('[data-seat="'+st.id+'"]'); if(!g)return;
    var v=S.seats[st.id]; g.classList.toggle('on',v>0); g.classList.toggle('sel',S.sel===st.id);
    g.querySelector('.wt').textContent=v>0?String(Math.round(fromSI('w',v))):'';
  });
  [['pilot'],['copilot']].forEach(function(c){var g=$('crew-'+c[0]);if(g)g.querySelector('.cw').textContent=S.crew[c[0]]>0?String(Math.round(fromSI('w',S.crew[c[0]]))):'';});
}
function renderEditor(){
  var host=$('editor'); if(!host)return;
  if(!S.sel){host.innerHTML='';return;}
  host.innerHTML='<div class="editor"><label class="f">Assento '+S.sel+' – peso (<span data-u="w"></span>)<input type="number" step="any" inputmode="decimal" id="seatInput" data-bind="seats.'+S.sel+'" data-k="w"></label><button class="btn" data-act="seatnext">Próximo ▶</button><button class="btn" data-act="seatclear">Limpar</button><button class="btn" data-act="seatclose">OK</button></div>';
  refreshInputs();
}
function selectSeat(id){S.sel=id;renderEditor();paintSeats();var i=$('seatInput');if(i){i.focus();i.select&&i.select();}}

/* ---------- EMS ---------- */
function cfgNames(){var seen={},out=[];W.EMS.forEach(function(e){if(!seen[e.cfg]){seen[e.cfg]=1;out.push(e.cfg);}});return out;}
function emsEntry(r){return W.EMS.filter(function(e){return e.cfg===r.cfg&&e.type===r.type;})[0];}
function devDefault(type){return type==='STR'?W.DEVICES.stretchers[0][1]:(W.DEVICES.its[type]?W.DEVICES.its[type][1]:null);}
function newEms(){var e=W.EMS[0];return {cfg:e.cfg,type:e.type,aft:false,patient:null,device:devDefault(e.type),pn:W.DEVICES.stretchers[0][0]};}
function renderEms(host){
  var h='<h2>3 · Configuração médica (EMS)</h2><p class="hint">Escolha a configuração (letra) e o dispositivo instalado, conforme o diário da aeronave. Posições do suplemento 7012FMS (tolerância ±25 mm). Incubadora e cilindros não estão incluídos nos pesos dos ITS: lance-os em Itens adicionais.</p><div id="emsList">';
  S.ems.forEach(function(r,i){
    var types=W.EMS.filter(function(e){return e.cfg===r.cfg;});
    var en=emsEntry(r)||types[0];
    var sta=en.sta+((en.aft&&r.aft)?W.EMS_AFT_SHIFT:0);
    h+='<div class="item"><div class="top"><b>Posição '+(i+1)+'</b><button class="btn sm del" data-act="emsdel" data-i="'+i+'">Remover</button></div>';
    h+='<div class="two"><label class="f">Configuração<select data-act="emscfg" data-i="'+i+'">'+cfgNames().map(function(c){return '<option'+(c===r.cfg?' selected':'')+'>'+c+'</option>';}).join('')+'</select></label>';
    h+='<label class="f">Dispositivo<select data-act="emstype" data-i="'+i+'">'+types.map(function(t){return '<option value="'+t.type+'"'+(t.type===r.type?' selected':'')+'>'+EMS_LBL[t.type]+'</option>';}).join('')+'</select></label></div>';
    var lblP=r.type==='EQ'?'Peso do equipamento':(r.type==='OS'?'Peso total (ocupantes + macas)':'Peso do paciente/ocupante');
    h+='<div class="two" style="margin-top:8px"><label class="f">'+lblP+' (<span data-u="w"></span>)<input type="number" step="any" inputmode="decimal" data-bind="ems.'+i+'.patient" data-k="w"></label>';
    if(r.type==='STR'){
      h+='<label class="f">Maca (P/N)<select data-act="emspn" data-i="'+i+'">'+W.DEVICES.stretchers.map(function(s){return '<option value="'+s[0]+'"'+(s[0]===r.pn?' selected':'')+'>'+s[0]+' · '+s[1]+' kg</option>';}).join('')+'</select></label>';
    }
    if(r.type!=='EQ'&&r.type!=='OS'){
      h+='<label class="f">Peso do dispositivo (<span data-u="w"></span>)<input type="number" step="any" inputmode="decimal" data-bind="ems.'+i+'.device" data-k="w"></label>';
    }
    h+='</div>';
    if(en.aft){h+='<label class="chk"><input type="checkbox" data-act="emsaft" data-i="'+i+'"'+(r.aft?' checked':'')+'><span>Cabeça para trás (+'+W.EMS_AFT_SHIFT+' mm na estação)</span></label>';}
    h+='<div class="loc">STA '+lTxt(sta)+' · BL '+lTxt(en.bl,true)+(en.bl<0?' (esq.)':en.bl>0?' (dir.)':'')+'</div></div>';
  });
  h+='</div><button class="btn" data-act="emsadd" style="margin-top:10px">+ Posição médica</button>';
  host.innerHTML=h; refreshInputs();
}

/* ---------- extras / mids ---------- */
function renderExtras(){
  $('extras').innerHTML=S.extras.map(function(x,i){
    return '<div class="item"><div class="top"><input type="text" style="min-height:34px;font-size:14px" placeholder="Descrição" data-lbl="'+i+'" value="'+(x.label||'').replace(/"/g,'&quot;')+'"><button class="btn sm del" data-act="exdel" data-i="'+i+'">Remover</button></div>'+
    '<div class="grid" style="grid-template-columns:1fr 1fr"><label class="f">Peso (<span data-u="w"></span>)<input type="number" step="any" inputmode="decimal" data-bind="extras.'+i+'.w" data-k="w"></label>'+
    (x.other?'<label class="f">BL (<span data-u="l"></span>)<input type="number" step="any" inputmode="decimal" data-bind="extras.'+i+'.bl" data-k="l"></label>':'<div class="f">BL (centralizado)<div style="margin-top:3px;min-height:42px;display:flex;align-items:center;font-size:16px;color:var(--ink)">0 '+(imp()?'in':'mm')+'</div></div>')+
    '<label class="f" style="grid-column:1/-1">Posição (STA)<select data-act="exsta" data-i="'+i+'">'+[[7200,'Bagageiro – frente'],[7700,'Bagageiro – centro'],[8200,'Bagageiro – atrás']].map(function(o){return '<option value="'+o[0]+'"'+(!x.other&&x.sta===o[0]?' selected':'')+'>'+o[1]+' ('+lTxt(o[0])+')</option>';}).join('')+'<option value="other"'+(x.other?' selected':'')+'>Outra posição…</option></select>'+(x.other?'<input type="number" step="any" inputmode="decimal" data-bind="extras.'+i+'.sta" data-k="l" placeholder="STA ('+(imp()?'in':'mm')+')" style="margin-top:6px">':'')+'</label>'+
    '</div></div>';
  }).join('');
  refreshInputs();
}
function renderMids(){
  $('mids').innerHTML=S.fuel.mids.map(function(m,i){
    return '<div class="row" style="margin:0 0 8px"><label class="f" style="flex:1">Intermediário '+(i+1)+' (<span data-u="f"></span>)<input type="number" step="any" inputmode="decimal" data-bind="fuel.mids.'+i+'" data-k="f"></label><button class="btn sm del" data-act="middel" data-i="'+i+'">Remover</button></div>';
  }).join('');
  refreshInputs();
}
document.addEventListener('input',function(e){var el=e.target;if(el.dataset&&el.dataset.lbl!=null){S.extras[+el.dataset.lbl].label=el.value;}});

/* ---------- cliques ---------- */
document.addEventListener('click',function(e){
  var t=e.target.closest('button,[data-seat]'); if(!t)return;
  if(t.dataset.seat){selectSeat(t.dataset.seat);return;}
  if(t.dataset.cfg){S.cfg=t.dataset.cfg;S.sel=null;if(S.cfg==='ems'&&!S.ems.length)S.ems.push(newEms());save();renderCabin();update();refreshInputs();return;}
  if(t.dataset.units){S.units=t.dataset.units;save();refreshInputs();renderCabin();renderExtras();renderMids();update();return;}
  if(t.dataset.mode){S.paxMode=t.dataset.mode;save();renderCabin();update();return;}
  var a=t.dataset.act; if(!a)return;
  var i=+t.dataset.i;
  if(a==='avisoEmpty'){$('avisoEmptyModal').classList.add('open');$('avisoEmptyClose').focus();return;}
  if(a==='aviso'){$('avisoModal').classList.add('open');$('avisoClose').focus();return;}
  if(a==='seatclose'){S.sel=null;renderEditor();paintSeats();}
  else if(a==='seatclear'){S.seats[S.sel]=null;refreshInputs();paintSeats();update();var inp=$('seatInput');if(inp)inp.value='';}
  else if(a==='seatnext'){var L=seatsList();var k=L.map(function(s){return s.id;}).indexOf(S.sel);selectSeat(L[(k+1)%L.length].id);}
  else if(a==='emsadd'){S.ems.push(newEms());renderCabin();update();}
  else if(a==='emsdel'){S.ems.splice(i,1);renderCabin();update();}
  else if(a==='exdel'){S.extras.splice(i,1);renderExtras();update();}
  else if(a==='middel'){S.fuel.mids.splice(i,1);renderMids();update();}
});
document.addEventListener('keydown',function(e){var g=e.target.closest&&e.target.closest('[data-seat]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();selectSeat(g.dataset.seat);}
  if(e.target.id==='seatInput'&&e.key==='Enter'){e.preventDefault();var L=seatsList();var k=L.map(function(s){return s.id;}).indexOf(S.sel);selectSeat(L[(k+1)%L.length].id);}});
document.addEventListener('change',function(e){
  var el=e.target,a=el.dataset&&el.dataset.act,i=+(el.dataset&&el.dataset.i);
  if(a==='emscfg'){var r=S.ems[i];r.cfg=el.value;var ok=W.EMS.some(function(x){return x.cfg===r.cfg&&x.type===r.type;});if(!ok){r.type=W.EMS.filter(function(x){return x.cfg===r.cfg;})[0].type;r.device=devDefault(r.type);if(r.type==='STR')r.device=pnW(r.pn);}r.aft=false;renderCabin();update();}
  else if(a==='emstype'){var r2=S.ems[i];r2.type=el.value;r2.device=r2.type==='STR'?pnW(r2.pn):devDefault(r2.type);r2.aft=false;renderCabin();update();}
  else if(a==='emspn'){var r3=S.ems[i];r3.pn=el.value;r3.device=pnW(el.value);renderCabin();update();}
  else if(a==='emsaft'){S.ems[i].aft=el.checked;renderCabin();update();}
  else if(a==='exsta'){var x=S.extras[i];if(el.value==='other'){x.other=true;x.sta=null;}else{x.other=false;x.sta=+el.value;x.bl=null;}renderExtras();update();}
  else if(el.id==='bagNet'){S.bag.net=el.checked;save();refreshInputs();update();}
  else if(el.id==='fuelUnit'){S.fuel.unit=el.value;save();refreshInputs();update();}
  else if(el.id==='presetExtra'){var p=W.DEVICES.presets[+el.value-1];if(p){S.extras.push({label:p[0],w:p[1],sta:7700,bl:null});renderExtras();update();}el.value='0';}
});
function pnW(pn){var s=W.DEVICES.stretchers.filter(function(x){return x[0]===pn;})[0];return s?s[1]:null;}
$('addExtra').onclick=function(){S.extras.push({label:'',w:null,sta:7700,bl:null});renderExtras();};
$('addMid').onclick=function(){S.fuel.mids.push(null);renderMids();};
/* ---------- braço <-> momento (campo 1) ---------- */
function armFmt(mm){var v=imp()?mm/MM_IN:mm;return String(Math.round(v*10)/10);}
function syncArms(){
  var w=+S.empty.w,E=S.empty;
  if(w>0){
    var ch=false;
    if(E.mlong==null&&E.pa!=null){E.mlong=w*E.pa/1000;E.pa=null;ch=true;}
    if(E.mlat==null&&E.pb!=null){E.mlat=w*E.pb/1000;E.pb=null;ch=true;}
    if(ch){save();refreshInputs();}
  }
  var pairs=[['e_asta','mlong','pa'],['e_abl','mlat','pb']];
  pairs.forEach(function(p){
    var el=$(p[0]);if(!el||el===document.activeElement)return;
    var m=E[p[1]];
    if(w>0&&m!=null&&m!=='')el.value=armFmt(m*1000/w);
    else if(E[p[2]]!=null)el.value=armFmt(E[p[2]]);
    else el.value='';
  });
}
function armInput(id,mk,pk){
  $(id).addEventListener('input',function(){
    var s=this.value,w=+S.empty.w;
    if(s===''||isNaN(+s)){S.empty[mk]=null;S.empty[pk]=null;}
    else{var mm=imp()?+s*MM_IN:+s;
      if(w>0){S.empty[mk]=w*mm/1000;S.empty[pk]=null;}
      else{S.empty[pk]=mm;S.empty[mk]=null;}}
    save();refreshInputs();update();
  });
}
armInput('e_asta','mlong','pa');armInput('e_abl','mlat','pb');
/* ---------- botões limpar: cor por estado ---------- */
function pos(v){return +v>0;}
function formHasData(noF1){
  var d=pos(S.crew.pilot)||pos(S.crew.copilot)||pos(S.bag.w)||pos(S.fuel.to)||pos(S.fuel.ldg);
  if(!d&&!noF1)d=field1HasData();
  Object.keys(S.seats).forEach(function(k){if(pos(S.seats[k]))d=true;});
  Object.keys(S.rows).forEach(function(k){if(pos(S.rows[k].w))d=true;});
  S.extras.forEach(function(x){if(pos(x.w)||x.label)d=true;});
  S.ems.forEach(function(x){if(pos(x.patient))d=true;});
  if(S.ems.length>1)d=true;
  S.fuel.mids.forEach(function(m){if(m!=null&&m!=='')d=true;});
  return !!d;
}
// qualquer dado do campo 1 na tela (só para a cor do LIMPAR; não libera o Resultado)
function field1HasData(){var E=S.empty,v=function(x){return x!=null&&x!=='';};return !!S.reg||!!S.dt||S.cfg!=='12'||v(E.pa)||v(E.pb)||(S.empty.w!=null&&S.empty.w!=='')||(S.empty.mlong!=null&&S.empty.mlong!=='')||(S.empty.mlat!=null&&S.empty.mlat!=='');}
function savedHasData(){return Object.keys(getFleet()).length>0;}
function paintClr(){
  var a=$('clearAll'),b=$('clearFleet');
  if(a)a.classList.toggle('has',formHasData());
  if(b)b.classList.toggle('has',savedHasData());
  paintSave();
}
// + do campo 1: habilitado com aeronaves salvas ou com o campo 1 completo; lista as matrículas salvas (+ carrega) e salva a atual
function fld(v){return v!=null&&v!==''&&isFinite(v);}
function field1Full(){return regKey(S.reg).length>0&&!!S.dt&&pos(S.empty.w)&&fld(S.empty.mlong)&&fld(S.empty.mlat);}
function paintSave(){var b=$('saveFleet');if(b)b.disabled=!(field1Full()||savedHasData());}
function fleetSave(){
  var k=regKey(S.reg);if(!k)return;
  try{var f=getFleet();f[k]={reg:S.reg,cfg:S.cfg,units:S.units,empty:{w:S.empty.w,mlong:S.empty.mlong,mlat:S.empty.mlat}};localStorage.setItem(FKEY,JSON.stringify(f));}catch(e){}
  S.regKey=k;save();paintClr();
}
function renderPickList(){
  var f=getFleet(),ks=Object.keys(f).sort(),L=$('pickList'),full=field1Full();
  L.innerHTML=ks.length?ks.map(function(k){return fleetRow(k,f[k]||{},'<button type="button" class="pb-x pb-plus" data-load="'+esc(k)+'" aria-label="'+esc(tr('Carregar'))+' '+esc(regFmt(f[k].reg||k))+'">+</button>');}).join('')
    :'<div class="pb-fleet-empty">'+esc(tr('Nenhuma aeronave salva.'))+'</div>';
  $('pickSave').style.display=full?'':'none';$('pickBtns').classList.toggle('pb-one',!full);
}
function fleetLoad(k){
  var p=getFleet()[k];if(!p)return;
  S.reg=regFmt(p.reg||k);S.regKey=k;applyProfile(p);S.sel=null;if(S.cfg==='ems'&&!S.ems.length)S.ems.push(newEms());
  save();renderCabin();renderExtras();renderMids();refreshInputs();update();
}
$('saveFleet').onclick=function(){if(this.disabled)return;renderPickList();$('pickModal').classList.add('open');$('pickClose').focus();};
$('pickClose').onclick=function(){$('pickModal').classList.remove('open');};
$('pickSave').onclick=function(){if(!field1Full())return;$('saveModal').classList.add('open','pb-top');$('saveCancel').focus();};
$('pickModal').addEventListener('click',function(e){if(e.target===this){this.classList.remove('open');return;}
  var bt=e.target.closest&&e.target.closest('[data-load]');if(!bt)return;
  this.classList.remove('open');fleetLoad(bt.getAttribute('data-load'));});
$('saveCancel').onclick=function(){$('saveModal').classList.remove('open');};
$('saveOk').onclick=function(){$('saveModal').classList.remove('open');$('pickModal').classList.remove('open');fleetSave();};
$('saveModal').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
// X do campo 1: lista as matrículas salvas e apaga uma de cada vez (verde quando não há aeronaves salvas)
var CFGN={'12':'12 pax','15':'15 pax','ems':'EMS'};
function renderFleetList(){
  var f=getFleet(),ks=Object.keys(f).sort(),L=$('fleetList');
  if(!ks.length){L.innerHTML='<div class="pb-fleet-empty">'+esc(tr('Nenhuma aeronave salva.'))+'</div>';return;}
  L.innerHTML=ks.map(function(k){return fleetRow(k,f[k]||{},'<button type="button" class="btn pb-danger" data-del="'+esc(k)+'">'+esc(tr('APAGAR'))+'</button>');}).join('');
}
function fleetRow(k,p,btn){var w=p.empty&&p.empty.w,im=p.units==='imp';
  var det=(CFGN[p.cfg]||'')+(pos(w)?' · '+tr('Peso vazio')+' '+nf(im?w*KG_LB:w,0)+' '+(im?'lb':'kg\u200d'):'');
  return '<div class="pb-fleet-row"><div class="info"><div class="reg">'+esc(regFmt(p.reg||k))+'</div><div class="det">'+esc(det)+'</div></div>'+btn+'</div>';}
var delK=null;
function fleetDelete(k){
  try{var f=getFleet();delete f[k];localStorage.setItem(FKEY,JSON.stringify(f));}catch(e){}
  if(regKey(S.reg)===k){S.regKey='';save();}
  renderFleetList();paintClr();
}
$('clearFleet').onclick=function(){renderFleetList();$('fleetModal').classList.add('open');$('fleetCancel').focus();};
$('fleetCancel').onclick=function(){$('fleetModal').classList.remove('open');};
$('fleetModal').addEventListener('click',function(e){if(e.target===this){this.classList.remove('open');return;}
  var bt=e.target.closest&&e.target.closest('[data-del]');if(!bt)return;
  delK=bt.getAttribute('data-del');var p=getFleet()[delK]||{};
  $('delQ').textContent=(EN?'Delete aircraft ':'Apagar a aeronave ')+regFmt(p.reg||delK)+'?';
  $('delModal').classList.add('open','pb-top');$('delCancel').focus();});
$('delCancel').onclick=function(){$('delModal').classList.remove('open');delK=null;};
$('delOk').onclick=function(){$('delModal').classList.remove('open');if(delK)fleetDelete(delK);delK=null;};
$('delModal').addEventListener('click',function(e){if(e.target===this){this.classList.remove('open');delK=null;}});
var clrT=null;
$('clearAll').onclick=function(){
  var b=$('clearAll');
  if(!clrT){b.textContent='CONFIRMAR?';b.style.background='var(--bad-bg)';clrT=setTimeout(function(){clrT=null;b.textContent='LIMPAR';b.style.background='';},3000);return;}
  clearTimeout(clrT);clrT=null;b.textContent='LIMPAR';b.style.background='';
  // apaga a tela toda, inclusive o campo 1 (mantém só as unidades); as aeronaves salvas não são alteradas
  var k={units:S.units,fu:S.fuel.unit,mode:S.paxMode};
  S=def();S.reg='';S.dt='';S.regKey='';S.units=k.units;S.fuel.unit=k.fu;S.paxMode=k.mode;
  save();renderCabin();renderExtras();renderMids();refreshInputs();update();
};
function pad(n){return (n<10?'0':'')+n;}
function applyReg(){
  var k=regKey(S.reg),pr=getFleet()[k];
  if(pr){S.regKey=k;applyProfile(pr);S.sel=null;if(S.cfg==='ems'&&!S.ems.length)S.ems.push(newEms());save();renderCabin();renderExtras();renderMids();refreshInputs();update();}
  else S.regKey='';
}
$('reg').addEventListener('input',function(){this.value=regFmt(this.value);S.reg=this.value;applyReg();save();paintClr();paintSave();});
$('reg').addEventListener('change',function(){save();});
$('dt').addEventListener('click',function(){var d=new Date();S.dt=pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear()+' '+pad(d.getHours())+':'+pad(d.getMinutes());this.value=S.dt;paintClr();});
$('presetExtra').innerHTML='<option value="0">+ Item predefinido…</option>'+W.DEVICES.presets.map(function(p,i){return '<option value="'+(i+1)+'">'+p[0]+' ('+p[1]+' kg)</option>';}).join('');
$('avisoEmptyClose').onclick=function(){$('avisoEmptyModal').classList.remove('open');};
$('avisoEmptyModal').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
$('avisoClose').onclick=function(){$('avisoModal').classList.remove('open');};
$('avisoModal').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){$('avisoModal').classList.remove('open');$('avisoEmptyModal').classList.remove('open');}});
$('sticky').onclick=function(){$('results').scrollIntoView({behavior:'smooth'});};

/* ---------- cálculo ---------- */
function baseItems(){
  var it=[],c=W.CREW,warn=[],occ=0;
  var emptyOk=S.empty.w>0&&S.empty.mlong>0;
  var eSta=emptyOk?S.empty.mlong*1000/S.empty.w:0,eBl=emptyOk?(S.empty.mlat||0)*1000/S.empty.w:0;
  if(emptyOk)it.push({w:S.empty.w,sta:eSta,bl:eBl});
  if(S.crew.pilot>0){it.push({w:S.crew.pilot,sta:c.pilot.sta,bl:c.pilot.bl});occ++;}
  if(S.crew.copilot>0){it.push({w:S.crew.copilot,sta:c.copilot.sta,bl:c.copilot.bl});occ++;}
  if(S.cfg==='ems'){
    S.ems.forEach(function(r){var en=emsEntry(r);if(!en)return;var w=num(r.patient)+((r.type==='EQ'||r.type==='OS')?0:num(r.device));
      it.push({w:w,sta:en.sta+((en.aft&&r.aft)?W.EMS_AFT_SHIFT:0),bl:en.bl});});
  } else if(S.paxMode==='seat'){
    seatsList().forEach(function(s){if(S.seats[s.id]>0){it.push({w:S.seats[s.id],sta:s.sta,bl:s.bl});occ++;}});
  } else {
    W.ROWS[S.cfg].forEach(function(r){var x=S.rows[r.n];if(x&&x.w>0)it.push({w:x.w,sta:r.sta,bl:0});});
  }
  if(S.bag.w>0)it.push({w:S.bag.w,sta:7700,bl:0});
  S.extras.forEach(function(x){if(x.w>0)it.push({w:x.w,sta:x.sta||0,bl:x.bl||0});});
  return {items:it,emptyOk:emptyOk,occ:occ};
}
function conditions(){
  var f=S.fuel,c=[{k:'zfw',label:'Zero fuel',fuel:0,kind:'zfw',sym:'d'}];
  var mids=f.mids.map(function(m,i){return {k:'m'+i,label:'Intermediário '+(i+1),fuel:num(m),kind:'flight',sym:'t'};}).filter(function(x){return x.fuel>0;});
  c.push({k:'to',label:'Decolagem',fuel:num(f.to),kind:'flight',sym:'c'});
  mids.forEach(function(m){c.push(m);});
  c.push({k:'ldg',label:'Pouso',fuel:num(f.ldg),kind:'flight',sym:'s'});
  return c;
}
var LAST=null;
function compute(){
  var b=baseItems(),conds=conditions(),out=[],has=formHasData(true);
  conds.forEach(function(c){
    var items=b.items.slice(); if(c.fuel>0)items.push({w:c.fuel,sta:W.fuelArm(c.fuel),bl:0});
    var t=W.totals(items);
    var ev=(has&&t.w>0&&b.emptyOk)?W.evaluate(t.w,t.sta,t.bl,c.kind):null;
    out.push({c:c,t:t,ev:ev});
  });
  return {b:b,rows:out};
}

/* ---------- saída ---------- */
function badge(cls,icon,title,detail){return '<span class="badge '+cls+'">'+icon+' '+title+(detail?' <span>· '+detail+'</span>':'')+'</span>';}
function update(){
  try{syncArms();paintClr();paintSave();}catch(e){}
  paintSeats();
  var R=compute(),b=R.b,warns=[];
  LAST=R;
  var f=S.fuel;
  var toKg=num(f.to);
  $('fuelConv').textContent=toKg>0?('Decolagem = '+nf(toKg,0)+' kg · '+nf(toKg/f.density,0)+' L · '+nf(toKg*KG_LB,0)+' lb'):'';
  if(toKg>W.LIM.fuelMax+0.01)warns.push('Combustível de decolagem acima da capacidade utilizável ('+W.LIM.fuelMax+' kg / 1588 L).');
  if(num(f.ldg)>toKg+0.01)warns.push('Combustível de pouso maior que o de decolagem.');
  if(f.mids.some(function(m){return num(m)>toKg+0.01;}))warns.push('Há ponto intermediário com mais combustível que a decolagem.');
  var bmax=S.bag.net?300:200, bagErr=S.bag.w>bmax;
  var be=$('bagErr');be.style.display=bagErr?'block':'none';
  be.textContent=bagErr?('✕ ERRO: peso do bagageiro ('+nf(fromSI('w',S.bag.w),0)+' '+(imp()?'lb':'kg')+') acima do limite de '+nf(fromSI('w',bmax),0)+' '+(imp()?'lb':'kg')+' '+(S.bag.net?'com':'sem')+' rede instalada.'):'';
  document.querySelector('[data-bind="bag.w"]').style.borderColor=bagErr?'var(--bad)':'';
  var lim=S.cfg==='15'?17:14;
  if(S.cfg!=='ems'&&S.paxMode==='seat'&&b.occ>lim)warns.push('Ocupantes ('+b.occ+') acima do limite da configuração ('+lim+', incluindo tripulação).');
  if(S.cfg==='ems')warns.push('EMS: confirme limites e pesos do suplemento (Seção 2) e o peso vazio com a configuração médica instalada (diário de bordo).');
  $('warns').innerHTML=warns.map(function(w){return '<li>⚠ '+w+'</li>';}).join('');

  var bad=[],anyEv=false;
  var h=R.rows.map(function(r){
    var c=r.c,t=r.t,ev=r.ev;
    var head='<div class="ch"><b>'+c.label+'</b><span>Combustível '+nf(fromSI('f',c.fuel),0)+' '+(S.fuel.unit==='L'?'L':S.fuel.unit)+' = '+wTxt(c.fuel)+'</span></div>';
    if(!ev)return '<div class="cond">'+head+'<p class="hint">Aguardando dados.</p></div>';
    anyEv=true;
    var kv='<div class="kv"><div><small>Peso</small><b>'+wTxt(t.w)+'</b></div><div><small>CG long. (STA)</small><b>'+lTxt(t.sta)+'</b></div><div><small>CG lat. (BL)</small><b>'+lTxt(t.bl,true)+'</b></div></div>';
    var B='';
    if(ev.msgs.length)ev.msgs.forEach(function(m){B+=badge('bad','✕','Peso',m);});
    else B+=badge('ok','✓','Peso dentro do limite');
    if(ev.env==='ext')B=badge('info','ℹ','Envelope estendido','ficha da operadora, acima de 6400 kg (máx. 7000 kg)')+B;
    var L=ev.longLim,A=ev.latLim;
    var ref=ev.clamped?' (referência: limites de 4400 kg)':'';
    B+=ev.longOk?badge(ev.clamped?'info':'ok',ev.clamped?'•':'✓','Longitudinal dentro','limites '+lTxt(L[0])+' a '+lTxt(L[1])+' · folga diant. '+lTxt(ev.fwdMargin)+' / tras. '+lTxt(ev.aftMargin)+ref)
      :badge('bad','✕','Longitudinal FORA',L?('limites '+lTxt(L[0])+' a '+lTxt(L[1])+(t.sta<L[0]?' · à frente do limite':' · atrás do limite')):'');
    B+=ev.latOk?badge(ev.clamped?'info':'ok',ev.clamped?'•':'✓','Lateral dentro','limites '+lTxt(A[0],true)+' a '+lTxt(A[1],true)+' · folga esq. '+lTxt(ev.leftMargin)+' / dir. '+lTxt(ev.rightMargin))
      :badge('bad','✕','Lateral FORA',A?('limites '+lTxt(A[0],true)+' a '+lTxt(A[1],true)):'');
    if(!ev.ok&&!(c.kind==='zfw'&&ev.longOk&&ev.latOk&&ev.weightOk))bad.push(c.label);
    var u=imp()?'lb·in':'kg·m', mL=imp()?t.mL*KG_LB/MM_IN:t.mL/1000, mB=imp()?t.mB*KG_LB/MM_IN:t.mB/1000;
    return '<div class="cond">'+head+kv+'<div class="badges">'+B+'</div><div class="mom">Momento long. '+nf(mL,1)+' · lat. '+nf(mB,1)+' '+u+'</div></div>';
  }).join('<hr class="sep">');
  if(bagErr)bad.push('Bagageiro (peso acima do limite)');
  $('conds').innerHTML=h;
  $('banner').innerHTML=!b.emptyOk?'<div class="banner info">Informe o peso vazio para calcular</div>':(bad.length?'<div class="banner bad">✕ Fora dos limites: '+bad.join(', ')+'</div>':(anyEv?'<div class="banner ok">✓ Todas as condições dentro dos limites aplicáveis</div>':''));
  // barra fixa
  var to=R.rows.filter(function(r){return r.c.k==='to';})[0];
  var st='<span>Aguardando dados</span><span class="tag info">—</span>';
  if(to&&to.ev){st='<span><b>Decolagem</b> '+wTxt(to.t.w)+' · STA '+lTxt(to.t.sta)+' · BL '+lTxt(to.t.bl,true)+'</span><span class="tag '+(bad.length?'bad':'ok')+'">'+(bad.length?'✕ Fora':'✓ Dentro')+'</span>';}
  $('sticky').innerHTML=st;
  charts(R);
  try{paintReport();}catch(e){}
}

/* ---------- gráficos ---------- */
function ticks(min,max,n){var span=max-min,step=Math.pow(10,Math.floor(Math.log10(span/n))),e=span/n/step;step*=e>=5?5:e>=2?2:1;var t=[];for(var v=Math.ceil(min/step)*step;v<=max+1e-9;v+=step)t.push(+v.toFixed(6));return t;}
function shape(sym,x,y,cls,ok){
  x=+x;y=+y;var col=ok?'var(--accent)':'var(--bad)',st='stroke="var(--surface)" stroke-width="2"';
  if(sym==='d')return '<path d="M'+x+' '+(y-8)+'L'+(x+8)+' '+y+'L'+x+' '+(y+8)+'L'+(x-8)+' '+y+'Z" fill="'+col+'" '+st+'/>';
  if(sym==='s')return '<rect x="'+(x-7)+'" y="'+(y-7)+'" width="14" height="14" fill="'+col+'" '+st+'/>';
  if(sym==='t')return '<path d="M'+x+' '+(y-8)+'L'+(x+8)+' '+(y+6)+'L'+(x-8)+' '+(y+6)+'Z" fill="'+col+'" '+st+'/>';
  return '<circle cx="'+x+'" cy="'+y+'" r="8" fill="'+col+'" '+st+'/>';
}
function chart(svgId,poly,pts,xlabel,xmin,xmax,extra){
  var svg=$(svgId),Wd=520,Ht=380,ml=64,mr=14,mt=12,mb=44;
  var fx=function(v){return imp()?v/MM_IN:v;}, fy=function(v){return imp()?v*KG_LB:v;};
  var P=poly.map(function(p){return [fx(p[0]),fy(p[1])];});
  var E=(extra||[]).map(function(p){return [fx(p[0]),fy(p[1])];});
  var Q=pts.map(function(p){return {x:fx(p.x),y:fy(p.w),sym:p.sym,ok:p.ok,label:p.label,fuel:p.fuel};});
  var xs=P.concat(E).map(function(p){return p[0];}).concat(Q.map(function(p){return p.x;}).filter(isFinite));
  var x0=fx(xmin),x1=fx(xmax);xs.push(x0,x1);
  var ys=P.concat(E).map(function(p){return p[1];}).concat(Q.map(function(p){return p.y;}).filter(isFinite));
  var ylo=Math.min.apply(null,ys),yhi=Math.max.apply(null,ys);
  var pad=(yhi-ylo)*0.05;ylo-=pad;yhi+=pad;
  var xlo=Math.min.apply(null,xs),xhi=Math.max.apply(null,xs);var xp=(xhi-xlo)*0.04;xlo-=xp;xhi+=xp;
  var X=function(v){return ml+(v-xlo)/(xhi-xlo)*(Wd-ml-mr);}, Y=function(v){return Ht-mb-(v-ylo)/(yhi-ylo)*(Ht-mt-mb);};
  var s='';
  ticks(ylo,yhi,5).forEach(function(v){s+='<line class="grid" x1="'+ml+'" x2="'+(Wd-mr)+'" y1="'+Y(v)+'" y2="'+Y(v)+'"/><text x="'+(ml-6)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+nf(v,0)+'</text>';});
  ticks(xlo,xhi,5).forEach(function(v){s+='<line class="grid" y1="'+mt+'" y2="'+(Ht-mb)+'" x1="'+X(v)+'" x2="'+X(v)+'"/><text x="'+X(v)+'" y="'+(Ht-mb+16)+'" text-anchor="middle">'+nf(v,imp()?1:0)+'</text>';});
  s+='<line class="axis" x1="'+ml+'" x2="'+(Wd-mr)+'" y1="'+(Ht-mb)+'" y2="'+(Ht-mb)+'"/><line class="axis" x1="'+ml+'" x2="'+ml+'" y1="'+mt+'" y2="'+(Ht-mb)+'"/>';
  s+='<polygon class="env" points="'+P.map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);}).join(' ')+'"/>';
  if(E.length)s+='<polygon class="env2" points="'+E.map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);}).join(' ')+'"/>';
  var ok=Q.filter(function(p){return isFinite(p.x)&&isFinite(p.y);}).sort(function(a,b){return b.fuel-a.fuel;});
  if(ok.length>1)s+='<polyline fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4" points="'+ok.map(function(p){return X(p.x).toFixed(1)+','+Y(p.y).toFixed(1);}).join(' ')+'"/>';
  ok.forEach(function(p){var x=X(p.x),y=Y(p.y);s+='<g><title>'+p.label+'</title>'+shape(p.sym,x.toFixed(1),y.toFixed(1),'',p.ok)+'</g>';
    {var right=x<Wd-110;s+='<text class="ptl" x="'+(right?x+12:x-12)+'" y="'+(y+4)+'" text-anchor="'+(right?'start':'end')+'">'+p.label+(p.ok?'':' ✕')+'</text>';}});
  s+='<text x="'+((ml+Wd-mr)/2)+'" y="'+(Ht-6)+'" text-anchor="middle">'+xlabel+' ('+(imp()?'in':'mm')+')</text>';
  s+='<text transform="translate(12 '+((mt+Ht-mb)/2)+') rotate(-90)" text-anchor="middle">Peso ('+(imp()?'lb':'kg')+')</text>';
  svg.setAttribute('viewBox','0 0 '+Wd+' '+Ht);svg.innerHTML=s;
}
function charts(R){
  var pL=[],pB=[];
  R.rows.forEach(function(r){if(!r.ev)return;var base={w:r.t.w,sym:r.c.sym,label:r.c.label.replace('Intermediário ','Int. '),fuel:r.c.fuel};
    pL.push(Object.assign({x:r.t.sta,ok:r.ev.weightOk&&r.ev.longOk},base));
    pB.push(Object.assign({x:r.t.bl,ok:r.ev.weightOk&&r.ev.latOk},base));});
  var ext=R.rows.some(function(r){return r.ev&&r.ev.env==='ext';});
  chart('chartLong',ext?W.EXT_LONG_ENV:W.LONG_ENV,pL,'STA',4950,5650);
  chart('chartLat',W.LAT_ENV,pB,'BL',-120,160,ext?[[W.EXT_LAT_LIM[0],7000],[W.EXT_LAT_LIM[1],7000],[W.EXT_LAT_LIM[1],6400],[W.EXT_LAT_LIM[0],6400]]:null);
  $('legend1').innerHTML='<span>◆ Zero fuel</span><span>● Decolagem</span><span>▲ Intermediário</span><span>■ Pouso</span><span>- - trajetória do consumo</span><span style="color:var(--bad)">vermelho/✕ = fora</span>'+(ext?'<span>▭ tracejado = limites laterais acima de 6400 kg (ficha)</span>':'');
}

/* ---------- relatório ---------- */
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function reportReady(){
  if(!LAST||!LAST.b.emptyOk)return false;
  if(!(num(S.fuel.to)>0&&num(S.fuel.ldg)>0))return false;
  if(S.bag.w>(S.bag.net?300:200))return false;
  return LAST.rows.every(function(r){return !!r.ev;});
}
function paintReport(){var b=$('reportBtn');if(b)b.disabled=!reportReady();}
function reportItems(){
  var it=[],c=W.CREW,E=S.empty;
  var eS=E.mlong*1000/E.w,eB=(E.mlat||0)*1000/E.w;
  it.push(['Peso vazio da aeronave',E.w,eS,eB]);
  if(S.crew.pilot>0)it.push(['Piloto (direita)',S.crew.pilot,c.pilot.sta,c.pilot.bl]);
  if(S.crew.copilot>0)it.push(['Cop. (esquerda)',S.crew.copilot,c.copilot.sta,c.copilot.bl]);
  if(S.cfg==='ems'){
    S.ems.forEach(function(r,i){var en=emsEntry(r);if(!en)return;var w=num(r.patient)+((r.type==='EQ'||r.type==='OS')?0:num(r.device));
      if(w>0)it.push(['EMS pos. '+(i+1)+' – cfg '+r.cfg+' ('+r.type+')',w,en.sta+((en.aft&&r.aft)?W.EMS_AFT_SHIFT:0),en.bl]);});
  } else if(S.paxMode==='seat'){
    seatsList().forEach(function(s){if(S.seats[s.id]>0)it.push(['Assento '+s.id,S.seats[s.id],s.sta,s.bl]);});
  } else {
    W.ROWS[S.cfg].forEach(function(r){var x=S.rows[r.n];if(x&&x.w>0)it.push(['Fileira '+r.n,x.w,r.sta,0]);});
  }
  if(S.bag.w>0)it.push(['Bagageiro',S.bag.w,7700,0]);
  S.extras.forEach(function(x,i){if(x.w>0)it.push([x.label||('Item adicional '+(i+1)),x.w,x.sta||0,x.bl||0]);});
  return it;
}
function chartForReport(id,x,y,w){
  var el=$(id),vb=el.getAttribute('viewBox').split(' ').map(Number);
  var inner=el.innerHTML.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/var\(--accent\)/g,'#2a78d6').replace(/var\(--surface\)/g,'#ffffff').replace(/var\(--bad\)/g,'#c62828');
  return '<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+(w*vb[3]/vb[2])+'" viewBox="0 0 '+vb[2]+' '+vb[3]+'" class="rc">'+inner+'</svg>';
}
function buildReport(){
  var Wd=720,M=24,y=0,s='',R=LAST,u={w:imp()?'lb':'kg',l:imp()?'in':'mm'};
  var T=function(x,yy,t,o){o=o||{};return '<text x="'+x+'" y="'+yy+'"'+(o.a?' text-anchor="'+o.a+'"':'')+' font-size="'+(o.s||13)+'" font-weight="'+(o.b?700:400)+'" fill="'+(o.c||'#0b0b0b')+'">'+esc(tr(t))+'</text>';};
  var HR=function(yy){return '<line x1="'+M+'" x2="'+(Wd-M)+'" y1="'+yy+'" y2="'+yy+'" stroke="#dcdbd5" stroke-width="1"/>';};
  var sec=function(t){y+=26;s+=T(M,y,t,{s:15,b:1});y+=8;s+=HR(y);y+=18;};
  y=34;s+=T(M,y,'AW139 – Relatório de Peso e Balanceamento',{s:20,b:1});
  y+=22;s+=T(M,y,'Matrícula: '+(S.reg||'—')+' | Data/Hora: '+(S.dt||'—'),{s:14});
  y+=20;s+=T(M,y,'Configuração: '+(S.cfg==='ems'?'EMS':S.cfg+' pax')+' | Unidades: '+(imp()?'lb · in':'kg · mm'),{s:14,c:'#52514e'});
  // status geral
  var bad=[];R.rows.forEach(function(r){var ev=r.ev;if(ev&&!ev.ok&&!(r.c.kind==='zfw'&&ev.longOk&&ev.latOk&&ev.weightOk))bad.push(r.c.label);});
  y+=16;s+='<rect x="'+M+'" y="'+y+'" width="'+(Wd-2*M)+'" height="34" rx="7" fill="'+(bad.length?'#fbe5e4':'#e3f3e8')+'"/>';
  s+=T(Wd/2,y+22,bad.length?('FORA DOS LIMITES: '+bad.join(', ')):'TODAS AS CONDIÇÕES DENTRO DOS LIMITES',{s:15,b:1,a:'middle',c:bad.length?'#c62828':'#0b7a3b'});
  y+=34;
  // carregamento
  sec('Carregamento');
  s+=T(M,y,'Item',{s:12,b:1,c:'#52514e'})+T(400,y,'Peso ('+u.w+')',{s:12,b:1,a:'end',c:'#52514e'})+T(545,y,'STA ('+u.l+')',{s:12,b:1,a:'end',c:'#52514e'})+T(Wd-M,y,'BL ('+u.l+')',{s:12,b:1,a:'end',c:'#52514e'});
  y+=8;s+=HR(y);y+=16;
  reportItems().forEach(function(r){
    s+=T(M,y,r[0])+T(400,y,nf(fromSI('w',r[1]),imp()?1:1),{a:'end'})+T(545,y,nf(fromSI('l',r[2]),1),{a:'end'})+T(Wd-M,y,nf(fromSI('l',r[3]),1),{a:'end'});
    y+=19;});
  // combustível
  sec('Combustível');
  R.rows.forEach(function(r){
    var f=r.c.fuel;
    s+=T(M,y,r.c.label)+T(Wd-M,y,nf(f,0)+' kg · '+nf(f/S.fuel.density,0)+' L · '+nf(f*KG_LB,0)+' lb',{a:'end'});y+=19;});
  s+=T(M,y,'Densidade: '+nf(S.fuel.density,3)+' kg/L',{s:12,c:'#52514e'});y+=6;
  // resultados
  sec('Resultados');
  R.rows.forEach(function(r){
    var t=r.t,ev=r.ev,ok=ev.ok||(r.c.kind==='zfw'&&ev.longOk&&ev.latOk&&ev.weightOk);
    s+='<rect x="'+M+'" y="'+(y-14)+'" width="'+(Wd-2*M)+'" height="120" rx="8" fill="#fcfcfb" stroke="#dcdbd5"/>';
    s+=T(M+12,y+4,r.c.label,{s:15,b:1});
    s+=T(Wd-M-12,y+4,ok?'DENTRO':'FORA',{s:14,b:1,a:'end',c:ok?'#0b7a3b':'#c62828'});
    y+=26;
    s+=T(M+12,y,'Peso '+wTxt(t.w)+'   ·   CG long. (STA) '+lTxt(t.sta)+'   ·   CG lat. (BL) '+lTxt(t.bl,true),{s:13,b:1});
    var mL=imp()?t.mL*KG_LB/MM_IN:t.mL/1000,mB=imp()?t.mB*KG_LB/MM_IN:t.mB/1000;
    y+=19;s+=T(M+12,y,'Momento long. '+nf(mL,1)+'  ·  lat. '+nf(mB,1)+' '+(imp()?'lb·in':'kg·m')+'   ·   Combustível '+wTxt(r.c.fuel),{s:12,c:'#52514e'});
    var L=ev.longLim,A=ev.latLim;
    y+=19;s+=T(M+12,y,(ev.weightOk?'Peso: dentro do limite':('Peso: '+ev.msgs.join(' ')))+(ev.env==='ext'?'  (envelope estendido, acima de 6400 kg)':''),{s:12,c:ev.weightOk?'#0b7a3b':'#c62828'});
    y+=18;s+=T(M+12,y,'Longitudinal '+(ev.longOk?'dentro':'FORA')+(L?(': limites '+lTxt(L[0])+' a '+lTxt(L[1])+(ev.longOk?(' · folga diant. '+lTxt(ev.fwdMargin)+' / tras. '+lTxt(ev.aftMargin)):'')):''),{s:12,c:ev.longOk?'#0b7a3b':'#c62828'});
    y+=18;s+=T(M+12,y,'Lateral '+(ev.latOk?'dentro':'FORA')+(A?(': limites '+lTxt(A[0],true)+' a '+lTxt(A[1],true)+(ev.latOk?(' · folga esq. '+lTxt(ev.leftMargin)+' / dir. '+lTxt(ev.rightMargin)):'')):''),{s:12,c:ev.latOk?'#0b7a3b':'#c62828'});
    y+=44;});
  // gráficos
  var cw=Wd-2*M;
  sec('Envelope longitudinal (CG × peso)');
  var lg=y-6,lx=M+4;
  [['d','Zero fuel'],['c','Decolagem'],['t','Intermediário'],['s','Pouso']].forEach(function(p){
    s+=shape(p[0],lx+8,lg,'',true).replace(/var\(--accent\)/g,'#2a78d6').replace(/var\(--surface\)/g,'#ffffff')+T(lx+20,lg+4,p[1],{s:12});lx+=p[1].length*7+44;});
  y+=10;
  var h1=cw*380/520;s+=chartForReport('chartLong',M,y,cw);y+=h1+6;
  sec('Envelope lateral (CG × peso)');
  var h2=cw*380/520;s+=chartForReport('chartLat',M,y,cw);y+=h2+14;
  s+=T(M,y,'Pontos vermelhos / ✕ = fora do envelope.',{s:11,c:'#7a7974'});y+=22;
  var css='<style>text{font-family:Arial,Helvetica,sans-serif}.rc text{fill:#52514e;font-size:14px}.rc .grid{stroke:#ecebe6}.rc .axis{stroke:#dcdbd5}.rc .env2{fill:none;stroke:#0b0b0b;stroke-width:2;stroke-dasharray:6 4}.rc .env{fill:rgba(42,120,214,.10);stroke:#0b0b0b;stroke-width:2}.rc .ptl{fill:#0b0b0b;font-weight:700;font-size:14px}</style>';
  return {w:Wd,h:Math.ceil(y),svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+Wd+' '+Math.ceil(y)+'" width="'+Wd+'" height="'+Math.ceil(y)+'">'+css+'<rect width="100%" height="100%" fill="#ffffff"/>'+s+'</svg>'};
}
var REP=null;
$('reportBtn').onclick=function(){
  if(!reportReady())return;
  REP=buildReport();
  $('repBody').innerHTML=REP.svg.replace(/ width="\d+" height="\d+">/,' style="width:100%;height:auto;display:block">');
  $('repStatus').textContent='';$('repModal').classList.add('open');$('repBody').scrollTop=0;
};
$('repClose').onclick=function(){$('repModal').classList.remove('open');};
function repPng(cb){
  var img=new Image(),sc=2;
  img.onload=function(){var c=document.createElement('canvas');c.width=REP.w*sc;c.height=REP.h*sc;var g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(img,0,0,c.width,c.height);
    try{c.toBlob(function(b){cb(b);},'image/png');}catch(e){cb(null);}};
  img.onerror=function(){cb(null);};
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(REP.svg);
}
function repText(){
  var L=['AW139 – Peso e Balanceamento','Matrícula: '+(S.reg||'—')+' | '+(S.dt||'—')];
  LAST.rows.forEach(function(r){L.push(r.c.label+': '+wTxt(r.t.w)+' | STA '+lTxt(r.t.sta)+' | BL '+lTxt(r.t.bl,true)+' | '+(r.ev.ok||(r.c.kind==='zfw'&&r.ev.longOk&&r.ev.latOk&&r.ev.weightOk)?'DENTRO':'FORA'));});
  return L.map(tr).join('\n');
}
$('repShare').onclick=function(){
  var st=$('repStatus');st.textContent=tr('Preparando imagem…');
  repPng(function(blob){
    var name='PesoBalanceamento_'+(regKey(S.reg)||'AW139')+'.png';
    if(!blob){st.textContent=EN?'Unable to generate the report image.':'Não foi possível gerar a imagem do relatório.';return;}
    var f=new File([blob],name,{type:'image/png'});
    var can=false;try{can=!!(navigator.canShare&&navigator.share&&navigator.canShare({files:[f]}));}catch(e){}
    if(can){navigator.share({files:[f],title:tr('AW139 – Peso e Balanceamento')}).then(function(){st.textContent='';}).catch(function(){st.textContent='';});return;}
    var url=URL.createObjectURL(blob),a=window.document.createElement('a');a.href=url;a.download=name;a.style.display='none';$('repStatus').appendChild(a);a.click();
    setTimeout(function(){URL.revokeObjectURL(url);a.remove();},1000);
    st.textContent=EN?('Report image saved ('+name+'). Attach it to the WhatsApp chat.'):('Imagem do relatório salva ('+name+'). Anexe-a na conversa do WhatsApp.');
  });
};
document.addEventListener('keydown',function(e){if(e.key==='Escape')$('repModal').classList.remove('open');});

/* ---------- init ---------- */
if(S.cfg==='ems'&&!S.ems.length)S.ems.push(newEms());
renderCabin();renderExtras();renderMids();refreshInputs();update();
window.__S=function(){return S;};
function fitTitle(){var h=$('pbTitle');if(!h||!h.clientWidth)return;var fs=17;h.style.fontSize=fs+'px';while(fs>10&&h.scrollWidth>h.clientWidth){fs-=0.25;h.style.fontSize=fs+'px';}}
window.addEventListener('resize',fitTitle);requestAnimationFrame(fitTitle);setTimeout(fitTitle,300);
if(EN){
  var appRoot=$('pbApp');
  trTree(appRoot);
  new MutationObserver(function(ms){ms.forEach(function(m){
    if(m.type==='childList')m.addedNodes.forEach(trTree);
    else if(m.type==='characterData')trNode(m.target);
    else if(m.type==='attributes')trTree(m.target);
  });}).observe(appRoot,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
}
})();
