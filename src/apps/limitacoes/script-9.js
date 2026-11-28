// LIMITAÇÕES › FMS: funcionalidades do FMS (FCOM OM-B 2.3.7 / 2.3.8), mesmo app feito na
// Rotina Bristow: lista por seção; tocar numa funcionalidade abre os passos (‹ Anterior / Lista / Próximo ›).
// Linhas: "# título" · "* passo" · "o subpasso" · "N: nota" · "P parágrafo" · "T a|b;c|d" (tabela)
(function () {
  var panel = document.getElementById('limPanel-fms');
  if (!panel) return;
var FMS = [
 {sec:"Navegação Lateral", itens:[
  ["2.3.7.1.1","Edição de Waypoints no Plano de Voo",[
   "N: Se a edição de um waypoint no plano de voo causar uma mudança significativa de rumo no trecho ativo em voo, utilize imediatamente a função Direct-To (conforme descrito neste capítulo) para navegar até o waypoint TO ativo. Isso ajudará a minimizar ângulos de inclinação indesejados ao usar o modo NAV do diretor de voo.",
   "# Para adicionar um waypoint ao plano de voo:",
   "* Pressionar a tecla FPL",
   "* Inserir o nome do waypoint no scratchpad",
   "* Selecionar a tecla de seleção de linha onde o novo waypoint será inserido",
   "* Se o waypoint for inserido no trecho ativo FROM/TO (2L), selecionar YES quando solicitado a alterar o trecho ativo",
   "N: Quando um identificador de waypoint é inserido em qualquer página e o FMS encontra mais de uma definição para o identificador, a página WAYPOINT SELECT é exibida. Selecionar a tecla de seleção de linha do waypoint desejado.",
   "# Para excluir um único waypoint do plano de voo:",
   "* Pressionar a tecla FPL",
   "* Pressionar a tecla DEL e verificar que *DELETE* é exibido no scratchpad",
   "* Selecionar a tecla de seleção de linha do waypoint que será excluído",
   "* Se o waypoint for inserido no trecho ativo FROM/TO (2L), selecionar YES quando solicitado a alterar o trecho ativo",
   "# Para excluir todos os waypoints do plano de voo quando no solo:",
   "* Pressionar a tecla FPL",
   "* Pressionar a tecla DEL e verificar que *DELETE* é exibido no scratchpad",
   "* Selecionar a tecla de seleção de linha do waypoint ORIGIN (1L)",
   "* Alternativamente, selecionar o prompt CLEAR FPL quando exibido 15 segundos após o pouso"]],
  ["2.3.7.1.2","Criação ou Modificação de um Waypoint Definido pelo Piloto",[
   "# Para criar um novo waypoint:",
   "* Pressionar a tecla FPL",
   "* Inserir o nome do novo waypoint no scratchpad",
   "* Selecionar a tecla de seleção de linha onde o novo waypoint será inserido para exibir a página PILOT WAYPOINT",
   "* Inserir a latitude e a longitude do novo waypoint no scratchpad sem espaços entre os dígitos (p. ex., N4201.12W04077.04), ou o Local/Marcação/Distância ou Local/Marcação/Local/Marcação a partir dos waypoints aplicáveis, se o waypoint for definido em referência a waypoints existentes",
   "* Selecionar as teclas de seleção de linha LAT LON ou P/B/D ou P/B/P/B, conforme aplicável",
   "N: Para carregar as coordenadas GPS atuais no campo LAT LON, selecionar a tecla de seleção de linha LOAD.",
   "* Para retornar à página do plano de voo, selecionar a tecla de seleção de linha FPL",
   "# Para modificar um waypoint definido pelo piloto existente:",
   "N: Um waypoint definido pelo piloto não pode ser modificado se fizer parte do plano de voo ativo.",
   "* Pressionar a tecla NAV",
   "* Selecionar a tecla de seleção de linha WAYPOINT LIST para exibir a página PILOT WAYPOINT LIST",
   "* Selecionar a tecla de seleção de linha SHOW WAYPOINT",
   "* Inserir os parâmetros modificados no scratchpad",
   "* Selecionar as teclas de seleção de linha LAT LON ou P/B/D ou P/B/P/B, conforme aplicável, para modificar o waypoint",
   "N: Para carregar as coordenadas GPS atuais no campo LAT LON, selecionar a tecla de seleção de linha LOAD."]],
  ["2.3.7.1.3","Inserção de uma Rota de Saída por Instrumentos Padrão (SID)",[
   "* Selecionar DEPARTURE na página ACTIVE FLIGHT PLAN ou NAV INDEX",
   "* Selecionar a superfície desejada na página DEPARTURE SURFACES",
   "* Selecionar a SID desejada na página SIDs",
   "* Selecionar a transição de saída desejada na página DEPARTURE TRANS",
   "* Selecionar REVIEW para revisar o procedimento selecionado ou selecionar ACTIVATE"]],
  ["2.3.7.1.4","Inserção de uma Rota Aerovia",[
   "* Pressionar a tecla FPL",
   "* Inserir o waypoint de entrada da aerovia, o identificador da aerovia e o waypoint de saída ou de transição no seguinte formato: ENTRY.AIRWAY.EXIT",
   "N: Se o ponto de entrada já estiver no plano de voo (ex.: transição de aerovia), somente o identificador da aerovia e o waypoint de saída ou transição precisam ser inseridos.",
   "* Selecionar a tecla de seleção de linha onde a rota será inserida"]],
  ["2.3.7.1.5","Inserção de uma Rota de Chegada Padrão (STAR)",[
   "* Selecionar ARRIVAL na página ACTIVE FLIGHT PLAN ou NAV INDEX",
   "* Selecionar STAR na página ARRIVAL",
   "* Selecionar a STAR desejada na página STAR",
   "* Selecionar a transição de chegada desejada na página STAR TRANS",
   "* Selecionar a tecla de seleção de linha ARRIVAL para retornar à página ARRIVAL",
   "* Selecionar REVIEW para revisar o procedimento selecionado ou selecionar ACTIVATE para inserir o procedimento selecionado no plano de voo ativo"]],
  ["2.3.7.1.6","Inserção de um Procedimento de Aproximação",[
   "* Selecionar ARRIVAL na página ACTIVE FLIGHT PLAN ou NAV INDEX",
   "* Selecionar APPROACH na página ARRIVAL",
   "* Selecionar a aproximação desejada na página APPROACH",
   "N: Se for selecionada uma aproximação subsequente no mesmo aeroporto, mas para uma pista diferente (ex.: após uma aproximação perdida), a superfície da pista deve primeiro ser alterada para permitir a seleção de uma aproximação para a nova pista (ver Inserção de uma Superfície de Pouso).",
   "* Selecionar a transição de aproximação desejada na página APPROACH TRANS",
   "* Selecionar a tecla de seleção de linha ARRIVAL para retornar à página ARRIVAL",
   "* Selecionar REVIEW para revisar o procedimento selecionado ou selecionar ACTIVATE para inserir o procedimento selecionado no plano de voo ativo",
   "# Para inserir parâmetros de velocidade de aproximação ou de arremetida para uma aproximação:",
   "* Pressionar a tecla PERF para exibir a página PERF INDEX",
   "* Selecionar a tecla de seleção de linha APPRCH SPD",
   "* Inserir os parâmetros conforme necessário nas páginas APPROACH SPEED e GO AROUND SPEEDS",
   "N: Esses parâmetros de velocidade são usados pelo modo de desaceleração do diretor de voo durante aproximações VGP ou LPV. Se o modo DECEL for selecionado antes da distância no campo INIT DIST, as velocidades de referência do modo DECEL são aquelas dos campos CLIMB, CRUISE ou DESCENT da página PERFORMANCE INIT 2/3."]],
  ["2.3.7.1.7","Inserção de uma Superfície de Pouso",[
   "* Selecionar ARRIVAL na página ACTIVE FLIGHT PLAN ou NAV INDEX",
   "* Selecionar SURFACE na página ARRIVAL",
   "* Selecionar a superfície desejada na página SURFACE",
   "* Selecionar a tecla de seleção de linha ARRIVAL para retornar à página ARRIVAL",
   "* Selecionar ACTIVATE para inserir a superfície selecionada no plano de voo ativo"]],
  ["2.3.7.1.8","Inserção de um Waypoint Temporário no Plano de Voo",[
   "P Quando a definição é inserida no plano de voo, o waypoint recebe um nome que descreve como o waypoint foi definido e um número (XX). Os waypoints temporários inseridos no FMS esquerdo recebem números pares. O nome também é precedido por um asterisco (*) para indicar um waypoint temporário.",
   "T Definição do waypoint temporário|Nome exibido;Lat/Lon|*LLXX;Local/Marcação/Distância|*PBDXX;Local/Marcação/Local/Marcação|*RRXX;Local//Distância|*PDXX",
   "# Para criar um waypoint temporário usando latitude/longitude:",
   "* Pressionar a tecla FPL",
   "* Inserir a latitude e a longitude do novo waypoint no scratchpad sem espaços entre os dígitos (p. ex., N4201.12W04077.04)",
   "* Alternativamente, usar a função de designador do MAP para inserir as coordenadas no scratchpad, como segue:",
   "o Exibir a página MFD MAP",
   "o Ativar o modo designador pressionando e mantendo pressionado o botão de seleção de display do MFD no CCD até que o designador seja exibido, ou selecionando o prompt do designador no menu MAP do MFD",
   "o Usar o joystick do CCD para posicionar o cursor na posição desejada",
   "o Pressionar o botão ENTER no CCD para inserir as coordenadas no scratchpad",
   "N: O ponto de referência do cursor pode ser alterado usando o botão interno do CCD.",
   "* Selecionar a tecla de seleção de linha onde o waypoint temporário será inserido",
   "# Para criar um waypoint temporário usando local/marcação/distância:",
   "* Inserir o local/marcação/distância no scratchpad na página de plano de voo aplicável",
   "o Local é qualquer nome de waypoint definido",
   "o A faixa de marcação é de 0 a 360° em incrementos de 0,1 (decimal obrigatório para décimos)",
   "o O azimute é verdadeiro (True) ao colocar T após o número (p. ex., PXR/090T/30)",
   "o A faixa de distância é de 0 a 9999.9 NM em incrementos de 0.1 (decimal obrigatório para décimos)",
   "N: Um waypoint temporário pode ser criado usando apenas o método local/distância, inserindo PLACE//DISTANCE.",
   "* Selecionar a tecla de seleção de linha onde o waypoint temporário será inserido",
   "# Para criar um waypoint temporário usando local/marcação/local/marcação:",
   "* Inserir o local/marcação/local/marcação no scratchpad",
   "o Local é qualquer nome de waypoint definido",
   "o A faixa de marcação é de 0 a 360° em incrementos de 0,1 (decimal obrigatório para décimos)",
   "o O azimute é verdadeiro (True) ao colocar T após o número (p. ex., PXR/090T/30)",
   "* Selecionar a tecla de seleção de linha onde o waypoint temporário será inserido",
   "# Prolongamento do eixo da pista (P/B/D temporário):",
   "P Um waypoint P/B/D temporário pode ser usado para estender o eixo da pista, o que pode ser útil para aumentar a consciência situacional durante aproximações visuais a pistas paralelas, trabalho em circuito de tráfego, etc. Após uma superfície de pouso ter sido inserida e ativada na página ARRIVAL (ver Inserção de uma Superfície de Pouso):",
   "* Selecionar a tecla de seleção de linha da pista na página ACTIVE FLT PLAN. O identificador da pista selecionada e os dados de marcação serão exibidos automaticamente no scratchpad no formato P/B/ (p. ex., RWY10/101/). Adicionar os dados de distância desejados",
   "* Selecionar a tecla de seleção de linha onde o waypoint temporário será inserido",
   "N: Uma restrição de altitude adicional também pode ser inserida usando o formato P/B/D/ALT ou P/B/P/B/ALT, se desejado."]],
  ["2.3.7.1.9","Designação de um Waypoint Flyover",[
   "* Pressionar a tecla DIR",
   "* Selecionar PATTERN para exibir a página PATTERNS",
   "N: A página PATTERNS também pode ser selecionada a partir da página NAV INDEX.",
   "* Selecionar FLYOVER",
   "* Selecionar a tecla de seleção de linha do waypoint onde o sobrevoo é desejado",
   "# Para remover um sobrevoo de um waypoint:",
   "* Pressionar a tecla DEL",
   "* Selecionar a tecla de seleção de linha do waypoint do qual o sobrevoo será removido"]],
  ["2.3.7.1.10","Direto a um Waypoint (Direct-To)",[
   "# Para navegar diretamente para um waypoint dentro do plano de voo atual:",
   "* Pressionar a tecla DTO",
   "* Pressionar a tecla de seleção de linha do waypoint direct-to desejado",
   "# Para navegar diretamente para um waypoint fora do plano de voo atual:",
   "* Pressionar a tecla DTO",
   "* Inserir o nome do waypoint no scratchpad",
   "* Pressionar a tecla de seleção de linha 1L",
   "# Para recuperar waypoints excluídos após navegar diretamente para um waypoint:",
   "* Pressionar a tecla DTO",
   "* Pressionar a tecla PREV",
   "* Pressionar a tecla de seleção de linha do waypoint a partir do qual se deseja recuperar o plano de voo. O FMS recuperará o plano de voo a partir do waypoint selecionado e prosseguirá diretamente para o waypoint selecionado"]],
  ["2.3.7.1.11","Execução de Sequenciamento Manual da Perna Ativa do Plano de Voo",[
   "* Pressionar a tecla de seleção de linha do waypoint desejado no plano de voo",
   "* Pressionar a tecla de seleção de linha 1L",
   "* Selecionar YES quando solicitado a mudar o trecho ativo"]],
  ["2.3.7.1.12","Inserção Manual de um Curso de Interceptação para um Waypoint ou Arco",[
   "* Pressionar a tecla DIR",
   "* Selecionar INTERCEPT",
   "* Selecionar a tecla de seleção de linha do waypoint ou arco a ser interceptado",
   "N: Se interceptar um arco em radial diferente do waypoint de entrada do arco, selecionar o waypoint que indica o fim do arco (ou seja, o segundo “A” em vídeo reverso).",
   "* Inserir no scratchpad o rumo de saída ou radial desejado a partir do waypoint anterior e selecionar a tecla de seleção de linha do campo RAD/CRS (1L). Alternativamente, selecionar HDG SEL (R1) se estiver voando manualmente uma proa a partir do waypoint anterior para interceptar",
   "* Se estiver interceptando um waypoint, inserir no scratchpad a radial ou rumo de interceptação desejado e selecionar as teclas de seleção de linha do campo RAD (3L) ou CRS (3R), conforme apropriado",
   "* Selecionar ACTIVATE",
   "N: Se estiver interceptando com HDG SEL, o modo LNAV do diretor de voo desengajará automaticamente ao cruzar o waypoint FROM. Pilote manualmente ou utilize o modo HDG do diretor de voo para interceptar o curso ou radial TO desejado. O modo LNAV terá de ser selecionado novamente para recapturar o curso ou radial TO de interceptação."]],
  ["2.3.7.1.13","Suspensão do Sequenciamento Automático de Pernas do Plano de Voo",[
   "* Pressionar a tecla DIR",
   "* Selecionar PATTERN para exibir a página PATTERNS",
   "N: A página PATTERNS também pode ser selecionada a partir da página NAV INDEX.",
   "* Selecionar SUSPEND",
   "* Selecionar o waypoint desejado para suspender o sequenciamento, ou selecionar a tecla de seleção de linha 1L para suspender na posição atual",
   "# Para retomar o sequenciamento:",
   "* Selecionar RESUME na página ACTIVE FLIGHT PLAN para prosseguir diretamente para o waypoint de suspensão, ou usar o procedimento Direct-To para prosseguir diretamente para outro waypoint do plano de voo",
   "# Para excluir uma suspensão:",
   "* Pressionar a tecla DEL",
   "* Selecionar a tecla de seleção de linha do waypoint onde a suspensão está localizada"]],
  ["2.3.7.1.14","Inserção de um Offset Lateral de Curso",[
   "* Pressionar a tecla PROG",
   "* Pressionar a tecla PREV para exibir a página PROGRESS 3/3",
   "* Inserir o afastamento à esquerda (L) ou à direita (R) seguido da distância em milhas náuticas (p. ex., L2.5) no scratchpad",
   "* Pressionar a tecla de seleção de linha do campo OFFSET",
   "# Para cancelar um afastamento lateral de curso:",
   "* Pressionar a tecla DEL",
   "* Pressionar a tecla de seleção de linha do campo OFFSET",
   "# Afastamentos laterais não podem ser inseridos durante o voo em qualquer um dos seguintes:",
   "* Saída por instrumentos padrão (SIDs), rota de chegada padrão por instrumentos (STARs), aproximações",
   "* Patterns",
   "* Na área terminal (10 NM da origem, 25 NM do destino)",
   "* Na região polar",
   "# Afastamentos são cancelados automaticamente nos seguintes casos:",
   "* Mudanças de curso superiores a 90°",
   "* SIDs, STARs, aproximações",
   "* Patterns",
   "* Interceptações",
   "N: Uma mensagem OFFSET CANCEL NEXT WPT é exibida antes de o offset ser cancelado automaticamente."]],
  ["2.3.7.1.15","Alteração Manual do Desempenho de Navegação Requerido (RNP)",[
   "* Pressionar a tecla PROG",
   "* Pressionar a tecla NEXT para exibir a página PROGRESS 2/3",
   "* Selecionar RNP",
   "* Inserir o valor de RNP manual desejado no scratchpad",
   "* Pressionar a tecla de seleção de linha do campo MANUAL",
   "# Para remover uma entrada manual de RNP:",
   "* Pressionar a tecla DEL",
   "* Pressionar a tecla de seleção de linha do campo MANUAL"]],
  ["2.3.7.1.16","Inserção de Dados de Espera (Holding)",[
   "# Para inserir uma espera sobre um waypoint do plano de voo:",
   "* Pressionar a tecla DIR",
   "* Selecionar PATTERN para exibir a página PATTERNS",
   "N: A página PATTERNS também pode ser selecionada a partir da página NAV INDEX.",
   "* Selecionar HOLD",
   "* Selecionar o waypoint onde a espera é requerida para exibir a página HOLDING PATTERN",
   "* Inserir a velocidade de espera no scratchpad, se desejado, e pressionar a tecla de seleção de linha do campo SPEED",
   "* Inserir um tempo ou distância de perna no scratchpad e pressionar a tecla de seleção de linha do campo LEG TIME ou LEG DIST apropriada",
   "* Inserir o rumo de entrada seguido de uma barra e do sentido de curva, se aplicável, no scratchpad (p. ex., 360/L) e pressionar a tecla de seleção de linha do campo INBD CRS / DIR",
   "* Selecionar ACTIVATE",
   "# Para inserir uma espera na posição atual:",
   "* Pressionar a tecla DIR",
   "* Selecionar PATTERN para exibir a página PATTERNS",
   "* Selecionar REVIEW para exibir a página HOLDING PATTERN com a posição atual como HOLD FIX",
   "* Inserir os dados do padrão de espera conforme descrito anteriormente",
   "* Selecionar ACTIVATE",
   "N: A espera na posição atual só pode ser realizada quando o LNAV estiver capturado e o erro de afastamento da rota (cross-track) for inferior a 0.25 NM.",
   "# Para excluir um padrão de espera:",
   "* Pressionar a tecla DEL",
   "* Selecionar a tecla de seleção de linha do waypoint onde o padrão de espera está localizado"]],
  ["2.3.7.1.17","Saída de um Padrão de Espera",[
   "N: Um minuto antes do fixo de espera, a página ACTIVE FLT PLAN exibe o comando EXIT. Quando selecionado antes de o fixo de espera ser cruzado, o padrão de espera é deletado do plano de voo.",
   "# Para sair da espera a qualquer momento após cruzar o fixo de espera:",
   "* Selecionar EXIT na página ACTIVE FLT PLAN",
   "N: Quando o comando EXIT é selecionado após cruzar o fixo de espera, a aeronave retorna ao fixo de espera, cruza o fixo e continua com o plano de voo.",
   "# Para retomar a espera após selecionar a opção EXIT:",
   "* Selecionar RESUME na página ACTIVE FLT PLAN",
   "# Para sair imediatamente do padrão de espera e navegar diretamente para um fixo:",
   "* Usar o procedimento Direct-To a waypoint conforme descrito em Direto a um Waypoint (Direct-To)",
   "# Quando padrões de espera são incluídos como parte de um procedimento de aproximação publicado para inversão de rumo:",
   "* Tanto para entradas em gota (teardrop) quanto paralelas, o FMS muda automaticamente para saída da espera no início da entrada",
   "* Para entradas diretas, o FMS muda automaticamente para saída da espera na curva de aproximação para o fixo de espera",
   "* Em ambos os casos, o piloto pode retomar a espera a qualquer momento antes de sair do padrão de espera. Quando a espera é retomada, a saída do padrão de espera requer nova ação do piloto"]]
 ]},
 {sec:"Navegação Vertical", itens:[
  ["2.3.7.2.1","Inserção Manual de um Perfil VPATH",[
   "* Pressionar a tecla FPL",
   "* Inserir o ângulo VPATH desejado e a restrição de altitude no scratchpad no seguinte formato: ANGLE/ALTITUDE",
   "N: O ângulo é inserido em graus e décimos de grau. O decimal é necessário somente ao inserir décimos. Faixa de 1.0 a 6.0. Se somente a altitude for inserida (p. ex., /ALTITUDE), o ângulo de descida da página PERFORMANCE INIT 2/3 é usado como ângulo padrão.",
   "* Selecionar a tecla de seleção de linha do lado direito onde a restrição de altitude é desejada"]],
  ["2.3.7.2.2","Direto Vertical a um Waypoint",[
   "* Pressionar a tecla DTO",
   "* Pressionar a tecla de seleção de linha da restrição de altitude desejada"]],
  ["2.3.7.2.3","Para Deletar um Perfil VPATH",[
   "# Para excluir um perfil VPATH:",
   "* Pressionar a tecla DEL",
   "* Selecionar a tecla de seleção de linha onde a restrição de altitude está localizada"]],
  ["2.3.7.2.4","Para Determinar o Tempo até o Topo/Fim da Descida",[
   "* Pressionar a tecla PROG",
   "* Pressionar a tecla NEXT para exibir a página PROGRESS 2/3",
   "* Selecionar a tecla de seleção de linha VNAV DATA"]]
 ]},
 {sec:"Funções em Voo de Progresso e Planejamento de Combustível", itens:[
  ["2.3.7.3.1","Determinação de ETA e Combustível (FUEL) Remanescente para Novo Destino ou Alternativa",[
   "# Para determinar o ETE e o combustível remanescente sobre o destino alternativo, direto da posição atual da aeronave:",
   "* Pressionar a tecla NAV para exibir a página NAV INDEX 1/2",
   "* Selecionar a tecla de seleção de linha CROSS PTS",
   "* Selecionar a tecla de seleção de linha PROS DIR",
   "* Inserir o novo destino ou o nome do waypoint alternativo no scratchpad",
   "* Selecionar a tecla de seleção de linha WAYPOINT",
   "# Para determinar o ETA e o combustível remanescente sobre o destino alternativo, pela rota alternativa a partir do destino original:",
   "* Certificar-se de que a rota alternativa e o destino estejam inseridos na página ALTERNATE FPL",
   "* Selecionar a tecla de seleção de linha ALTERNATE para colocar o waypoint alternativo no scratchpad",
   "* Pressionar a tecla PROG para exibir a página PROGRESS 1/3",
   "* Pressionar a tecla de seleção de linha NEXT para inserir o conteúdo do scratchpad nesse campo, mudando o campo NEXT para o campo ALTN"]],
  ["2.3.7.3.2","Exibição do Resumo de Voo (Flight Summary)",[
   "* Pressionar a tecla NAV para exibir a página NAV INDEX 1/2",
   "* Pressionar a tecla de seleção de linha FLT SUM",
   "N: Alternativamente, a página FLIGHT SUMMARY pode ser acessada a partir da página PROGRESS 3/3."]]
 ]},
 {sec:"Funções Adicionais", itens:[
  ["2.3.7.4.1","Configuração da Compensação de Temperatura do MCDU",[
   "P A configuração padrão da empresa para compensação de temperatura é o estado HOT&COLD. A configuração não deve ser alterada intencionalmente pelos pilotos a partir desse estado padrão. Entretanto, pode haver situações em que esse modo padrão tenha sido alterado (p. ex., após manutenção) e a opção TEMP COMP não esteja disponível na página LANDING. As seguintes etapas do procedimento podem ser usadas para restaurar a configuração ao estado padrão:",
   "# 1. MCDU",
   "* Selecionar a opção MAINTENANCE na página NAV INDEX 2/2",
   "* Selecionar a opção SETUP na página FMS X MAINTENANCE 2/2",
   "* Selecionar a opção FLIGHT CONFIG na página FMS SETUP",
   "* Selecionar a opção TEMP COMP CONFIGURATION na página FLIGHT CONFIG 2/2",
   "* Selecionar a opção HOT&COLD"]],
  ["2.3.7.4.2","Configuração de Saída do Resumo de Voo do MCDU",[
   "P Se desejado, o MCDU pode ser ajustado para exibir automaticamente a página FLIGHT SUMMARY 15 segundos após o pouso. Para ajustar este estado de configuração opcional:",
   "# 1. MCDU",
   "* Selecionar a opção MAINTENANCE na página NAV INDEX 2/2",
   "* Selecionar a opção SETUP na página FMS X MAINTENANCE 2/2",
   "* Selecionar a opção FLIGHT CONFIG na página FMS SETUP",
   "* Selecionar a opção FLIGHT SUMMARY OUTPUT na página FLIGHT CONFIG 2/2",
   "* Selecionar a opção MCDU",
   "N: A página FLIGHT SUMMARY não será exibida automaticamente após o pouso se a página RADIO estiver exibida."]]
 ]},
 {sec:"Operações Fora das Áreas de Cobertura SBAS", itens:[
  ["2.3.7.5.1","Procedimento Antes da Partida (Before Departure)",[
   "P Esta seção contém procedimentos suplementares a serem seguidos ao conduzir operações fora das áreas de cobertura SBAS, ou em caso de indisponibilidades do SBAS.",
   "# 1. MCDU – quando a predição RAIM no destino for necessária para o segmento de voo:",
   "* Página MCDU ACTIVE FLT PLAN:",
   "o Inserir o horário estimado de partida na linha ORIGIN (L1) (p. ex., /0000)",
   "* Página NAV INDEX 1/2:",
   "o Selecionar POS SENSORS",
   "o Selecionar GPS STATUS",
   "o Selecionar PRED RAIM para visualizar a previsão de RAIM na ETA do destino",
   "o Para RAIM do destino na ETA −15 a +15 minutos, selecionar DEST"]]
 ]},
 {sec:"Combustível", itens:[
  ["2.3.8.1","Geral",[
   "P Esta seção detalha os procedimentos de reabastecimento.",
   "* Minimizar o uso da bateria da aeronave durante as operações de reabastecimento para evitar descarga desnecessária",
   "N: Quando a energia é aplicada pela primeira vez, o combustível pode inicialmente ser exibido em KG antes de reverter para LB.",
   "N: Sempre assegure que a tampa do tanque esteja firmemente fechada, com a seta FWD apontando para a frente da aeronave."]],
  ["2.3.8.2","Conversão de Peso de Combustível em Volume Usando o MCDU",[
   "* Pressionar a tecla NAV",
   "* Pressionar a tecla NEXT para exibir a página NAV INDEX 2/2",
   "* Selecionar a tecla de seleção de linha CONVERSION",
   "* Pressionar a tecla PREV até que a página CONVERSION 3/4 seja exibida",
   "* Inserir o peso do combustível no scratchpad",
   "* Selecionar a tecla de seleção de linha do campo LB ou KG, conforme aplicável, para exibir o volume de combustível"]]
 ]}
];
  var ITENS = [];
  FMS.forEach(function (s) { s.itens.forEach(function (it) { ITENS.push({ n: it[0], t: it[1], l: it[2], sec: s.sec }); }); });
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function corpo(linhas) {
    var h = '', ul = false, sub = false;
    function fecha() { if (sub) { h += '</ul></li>'; sub = false; } if (ul) { h += '</ul>'; ul = false; } }
    linhas.forEach(function (x) {
      if (x.indexOf('o ') === 0) {
        if (!ul) { h += '<ul class="fms-l">'; ul = true; }
        if (!sub) { if (h.slice(-5) === '</li>') h = h.slice(0, -5); else h += '<li>'; h += '<ul>'; sub = true; }
        h += '<li>' + esc(x.slice(2)) + '</li>'; return;
      }
      if (x.indexOf('* ') === 0) { if (sub) { h += '</ul></li>'; sub = false; } if (!ul) { h += '<ul class="fms-l">'; ul = true; } h += '<li>' + esc(x.slice(2)) + '</li>'; return; }
      fecha();
      if (x.indexOf('# ') === 0) h += '<h3 class="fms-h">' + esc(x.slice(2)) + '</h3>';
      else if (x.indexOf('N: ') === 0) h += '<div class="fms-nt"><b>Nota:</b> ' + esc(x.slice(3)) + '</div>';
      else if (x.indexOf('P ') === 0) h += '<p class="fms-p">' + esc(x.slice(2)) + '</p>';
      else if (x.indexOf('T ') === 0) {
        var r = x.slice(2).split(';').map(function (l) { return l.split('|'); });
        h += '<table class="fms-tb"><tr>' + r[0].map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' +
          r.slice(1).map(function (l) { return '<tr>' + l.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
      }
    });
    fecha(); return h;
  }
  function lista() {
    var h = '<div class="lim-panel-title">FMS</div><p class="fms-hint">Toque numa funcionalidade para ver os passos.</p>';
    FMS.forEach(function (s) {
      h += '<div class="fms-sec">' + esc(s.sec) + '</div><div class="fms-list">' +
        s.itens.map(function (it) { return '<button type="button" class="fms-row" data-fms="' + it[0] + '"><span>' + esc(it[1]) + '</span><i>›</i></button>'; }).join('') + '</div>';
    });
    return h;
  }
  function item(n) {
    var i = -1; ITENS.forEach(function (x, k) { if (x.n === n) i = k; });
    var it = ITENS[i], ant = ITENS[i - 1], prox = ITENS[i + 1];
    return '<button type="button" class="fms-back" data-fms="">‹ FMS</button><div class="fms-secname">' + esc(it.sec) + '</div>' +
      '<div class="fms-card"><h2>' + esc(it.t) + '</h2><hr><div class="fms-c">' + corpo(it.l) + '</div></div>' +
      '<div class="fms-pager"><button type="button" ' + (ant ? 'data-fms="' + ant.n + '"' : 'disabled') + '>‹ Anterior</button>' +
      '<button type="button" data-fms="">Lista</button>' +
      '<button type="button" ' + (prox ? 'data-fms="' + prox.n + '"' : 'disabled') + '>Próximo ›</button></div>';
  }
  var rolagemLista = null;
  function topo() { var r = panel.getBoundingClientRect(); if (r.top < 0) panel.scrollIntoView({ block: 'start' }); }
  function mostra(n) {
    if (n) {
      if (rolagemLista === null) rolagemLista = window.scrollY;
      panel.innerHTML = item(n); topo();
    } else {
      panel.innerHTML = lista();
      if (rolagemLista !== null) { window.scrollTo(0, rolagemLista); rolagemLista = null; }
    }
  }
  panel.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fms]'); if (!b || b.disabled) return;
    var n = b.getAttribute('data-fms');
    if (n && rolagemLista !== null) { panel.innerHTML = item(n); topo(); return; }
    mostra(n);
  });
  // ao escolher FMS no seletor, abre sempre na lista
  var sel = document.getElementById('limSelect');
  if (sel) sel.addEventListener('change', function () { if (sel.value === 'fms') { rolagemLista = null; panel.innerHTML = lista(); } });
  panel.innerHTML = lista();
})();
