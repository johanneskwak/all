// =============================================
// 세계사 모노폴리 - Game Engine
// =============================================

// --- CONSTANTS ---
const STARTING_MONEY = 1500;
const GO_SALARY = 200;
const JAIL_INDEX = 10;
const GO_TO_JAIL_INDEX = 30;
const DICE_FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];
const PLAYER_COLORS = ['#ef4444','#3b82f6','#22c55e','#f59e0b'];
const PLAYER_EMOJIS = ['🏛️','⚔️','🏰','👑'];
const BUILD_NAMES = ['마을','도시','국가','제국'];
const BUILD_COST_MULT = [1, 1, 1, 1.5]; // empire costs 1.5x

// --- BOARD DATA (40 spaces) ---
const boardSpaces = [
  { type:'corner', name:'출발<br>GO', icon:'fa-arrow-left', id:'go' },
  { type:'property', color:'#8B4513', name:'메소포타미아', group:'civ', price:60, rent:[2,10,30,90,160,250], buildCost:50 },
  { type:'chest', name:'역사적 사건', icon:'fa-book-open' },
  { type:'property', color:'#8B4513', name:'이집트', group:'civ', price:60, rent:[4,20,60,180,320,450], buildCost:50 },
  { type:'tax', name:'공물 납부', icon:'fa-coins', amount:200 },
  { type:'station', name:'초원길', icon:'fa-horse', price:200 },
  { type:'property', color:'#87CEEB', name:'흑해 연안', group:'nomad', price:100, rent:[6,30,90,270,400,550], buildCost:50 },
  { type:'chance', name:'운명의<br>수레바퀴', icon:'fa-dharmachakra' },
  { type:'property', color:'#87CEEB', name:'몽골 고원', group:'nomad', price:100, rent:[6,30,90,270,400,550], buildCost:50 },
  { type:'property', color:'#87CEEB', name:'장안', group:'nomad', price:120, rent:[8,40,100,300,450,600], buildCost:50 },
  { type:'corner', name:'사막 조난<br>(휴식)', icon:'fa-sun', id:'jail' },
  { type:'property', color:'#e91e63', name:'서역', group:'western', price:140, rent:[10,50,150,450,625,750], buildCost:100 },
  { type:'utility', name:'제지술 공방', icon:'fa-scroll', price:150 },
  { type:'property', color:'#e91e63', name:'타클라마칸', group:'western', price:140, rent:[10,50,150,450,625,750], buildCost:100 },
  { type:'property', color:'#e91e63', name:'파미르 고원', group:'western', price:160, rent:[12,60,180,500,700,900], buildCost:100 },
  { type:'station', name:'비단길', icon:'fa-route', price:200 },
  { type:'property', color:'#ff9800', name:'파탈리푸트라', group:'gupta', price:180, rent:[14,70,200,550,750,950], buildCost:100 },
  { type:'chest', name:'역사적 사건', icon:'fa-book-open' },
  { type:'property', color:'#ff9800', name:'갠지스강', group:'gupta', price:180, rent:[14,70,200,550,750,950], buildCost:100 },
  { type:'property', color:'#ff9800', name:'아잔타 석굴', group:'gupta', price:200, rent:[16,80,220,600,800,1000], buildCost:100 },
  { type:'corner', name:'오아시스<br>무료 휴식', icon:'fa-tent', id:'parking' },
  { type:'property', color:'#f44336', name:'클뤼니', group:'christ1', price:220, rent:[18,90,250,700,875,1050], buildCost:150 },
  { type:'chance', name:'운명의<br>수레바퀴', icon:'fa-dharmachakra' },
  { type:'property', color:'#f44336', name:'보름스', group:'christ1', price:220, rent:[18,90,250,700,875,1050], buildCost:150 },
  { type:'property', color:'#f44336', name:'카노사', group:'christ1', price:240, rent:[20,100,300,750,925,1100], buildCost:150 },
  { type:'station', name:'바닷길', icon:'fa-ship', price:200 },
  { type:'property', color:'#fdd835', name:'신성 로마', group:'christ2', price:260, rent:[22,110,330,800,975,1150], buildCost:150 },
  { type:'property', color:'#fdd835', name:'아비뇽', group:'christ2', price:260, rent:[22,110,330,800,975,1150], buildCost:150 },
  { type:'utility', name:'나침반 제작소', icon:'fa-compass', price:150 },
  { type:'property', color:'#fdd835', name:'로마 (교황청)', group:'christ2', price:280, rent:[24,120,360,850,1025,1200], buildCost:150 },
  { type:'corner', name:'이민족<br>침입!', icon:'fa-shield-halved', id:'gotojail' },
  { type:'property', color:'#4caf50', name:'알렉산드리아', group:'med', price:300, rent:[26,130,390,900,1100,1275], buildCost:200 },
  { type:'property', color:'#4caf50', name:'지중해', group:'med', price:300, rent:[26,130,390,900,1100,1275], buildCost:200 },
  { type:'chest', name:'역사적 사건', icon:'fa-book-open' },
  { type:'property', color:'#4caf50', name:'비잔티움', group:'med', price:320, rent:[28,150,450,1000,1200,1400], buildCost:200 },
  { type:'station', name:'사하라 교역로', icon:'fa-map-location-dot', price:200 },
  { type:'chance', name:'운명의<br>수레바퀴', icon:'fa-dharmachakra' },
  { type:'property', color:'#1a237e', name:'굽타 왕조', group:'empire', price:350, rent:[35,175,500,1100,1300,1500], buildCost:200 },
  { type:'tax', name:'십일조 납부', icon:'fa-church', amount:100 },
  { type:'property', color:'#1a237e', name:'유라시아', group:'empire', price:400, rent:[50,200,600,1400,1700,2000], buildCost:200 },
];

// Station indices for "nearest station" card
const STATION_INDICES = [5, 15, 25, 35];
const UTILITY_INDICES = [12, 28];

// Group sizes for monopoly check
const GROUP_SIZES = { civ:2, nomad:3, western:3, gupta:3, christ1:3, christ2:3, med:3, empire:2 };

// --- QUIZ BANK ---
const quizBank = {
    civ: [
        { q: "메소포타미아 문명에서 최초로 만들어 사용한 문자로, 점토판에 갈대 조각으로 새긴 문자는?", options: ["쐐기 문자", "상형 문자", "갑골 문자", "알파벳"], answer: 0 },
        { q: "나일강의 정기적인 범람을 예측하는 과정에서 태양력과 기하학이 발달한 고대 문명은?", options: ["이집트 문명", "메소포타미아 문명", "인더스 문명", "황허 문명"], answer: 0 }
    ],
    nomad: [
        { q: "기원전 4세기경부터 유라시아 초원 지대에서 활약하며, 강력한 기마병을 바탕으로 중국 한나라와 대립했던 유목 제국은?", options: ["흉노", "선비족", "거란", "여진"], answer: 0 },
        { q: "중국 한 무제의 명을 받아 대월지와 동맹을 맺기 위해 서역으로 파견되어, 결과적으로 동서 교역로를 개척하는 데 기여한 인물은?", options: ["장건", "반초", "곽거병", "동중서"], answer: 0 }
    ],
    western: [
        { q: "장건의 서역 파견을 계기로 열렸으며, 중국의 주요 특산물이 로마 제국까지 전해진 아시아와 유럽을 잇는 대표적인 내륙상 교역로는?", options: ["비단길", "초원길", "바닷길", "사하라길"], answer: 0 },
        { q: "중국 신장 웨이우얼 자치구에 있는 사막으로, 비단길을 가는 상인들이 목숨을 걸고 통과해야 했던 '들어가면 나올 수 없는' 이라는 뜻을 가진 사막은?", options: ["타클라마칸 사막", "고비 사막", "사하라 사막", "모하비 사막"], answer: 0 }
    ],
    gupta: [
        { q: "4세기경 인도 북부를 다시 통일하고, 산스크리트 문학이 융성하여 인도 고전 문화의 황금기를 이룩한 왕조는?", options: ["굽타 왕조", "마우리아 왕조", "쿠샨 왕조", "무굴 제국"], answer: 0 },
        { q: "굽타 왕조 시대에 브라만교를 바탕으로 불교, 민간 신앙 등이 융합되어 성립된 인도의 대중적인 종교는?", options: ["힌두교", "불교", "자이나교", "이슬람교"], answer: 0 },
        { q: "굽타 왕조 시기 인도에서 기원하여 수학 발전에 큰 영향을 끼친 개념으로, 아라비아 상인들을 통해 유럽으로 전해진 것은?", options: ["'0'의 개념", "60진법", "태양력", "십진법"], answer: 0 }
    ],
    christ1: [
        { q: "1077년, 성직자 서임권을 둘러싸고 신성 로마 제국 황제가 교황에게 파문을 당한 뒤, 성문 밖 눈밭에서 용서를 구한 사건은?", options: ["카노사의 굴욕", "아비뇽 유수", "십자군 전쟁", "보름스 협약"], answer: 0 },
        { q: "10세기 초, 타락한 교회를 비판하고 세속 군주의 간섭에서 벗어나 교회의 순수성을 회복하고자 개혁 운동을 주도한 수도원은?", options: ["클뤼니 수도원", "베네딕트 수도원", "프란치스코 수도원", "도미니코 수도원"], answer: 0 }
    ],
    christ2: [
        { q: "14세기 초, 프랑스 왕 필리프 4세가 교황을 통제하기 위해 교황청을 로마에서 프랑스 남부로 옮겨 가둔 사건은?", options: ["아비뇽 유수", "카노사의 굴욕", "교회의 대분열", "밀라노 칙령"], answer: 0 },
        { q: "1122년, 황제와 교황 간의 서임권 투쟁을 끝내고 교황이 성직자 임명권을 갖는 것으로 타협을 이룬 조약은?", options: ["보름스 협약", "베스트팔렌 조약", "트루아 조약", "아우크스부르크 화의"], answer: 0 }
    ],
    med: [
        { q: "로마 제국이 395년 동서로 분열된 후, 1,000년 이상 존속하며 그리스 정교를 바탕으로 독자적인 문화를 꽃피운 제국은?", options: ["비잔티움 제국", "신성 로마 제국", "오스만 제국", "프랑크 왕국"], answer: 0 },
        { q: "비잔티움 제국의 전성기를 이끈 황제로, 대규모 법전을 편찬하여 유럽 식민법의 기초를 다진 인물은?", options: ["유스티니아누스 황제", "콘스탄티누스 대제", "옥타비아누스", "알렉산드로스 대왕"], answer: 0 },
        { q: "아프리카 북부에 위치하여 헬레니즘 제국 시대부터 지중해 무역과 학문의 중심지로 번영했던 도시는?", options: ["알렉산드리아", "아테네", "로마", "카르타고"], answer: 0 }
    ],
    empire: [
        { q: "13세기 초, 흩어져 있던 유목 부족을 통일하고 몽골 제국을 세워 유라시아 대륙에 걸친 거대한 제국을 건설한 인물은?", options: ["칭기즈 칸", "쿠빌라이 칸", "티무르", "누르하치"], answer: 0 },
        { q: "아시아와 유럽 대륙을 하나의 권역으로 묶어 부르는 말로, 활발한 동서 교류가 일어난 이 광활한 영역은?", options: ["유라시아", "오세아니아", "아프로-유라시아", "아메리카"], answer: 0 }
    ],
    stations: [
        { q: "스텝 기후 지역을 따라 형성되어 옛날부터 유목민들의 활동 무대가 되었으며, 주로 말이 교통수단으로 이용된 길은?", options: ["초원길", "비단길", "바닷길", "사하라길"], answer: 0 },
        { q: "계절풍을 이용하여 아프리카, 인도, 동남아시아, 동아시아를 연결하는 해상 교역망으로 향신료 등이 주로 거래된 길은?", options: ["바닷길", "초원길", "비단길", "지중해 항로"], answer: 0 },
        { q: "북아프리카와 내륙을 아우르며, 주로 낙타를 이용해 소금과 금을 활발하게 거래했던 사막 교역로는?", options: ["사하라 교역로", "사막길", "아라비아길", "베르베르길"], answer: 0 }
    ],
    utilities: [
        { q: "중국 후한의 채륜이 개량하였고, 8세기 탈라스 전투를 계기로 이슬람 세계와 유럽으로 전파되어 정보의 확산에 기여한 것은?", options: ["제지술", "나침반", "화약", "금속 활자"], answer: 0 },
        { q: "중국 송나라 때 실용화되었으며, 뱃사람들이 바다에서 방향을 잡는 데 사용하여 신항로 개척에 큰 영향을 준 발명품은?", options: ["나침반", "화약", "제지술", "망원경"], answer: 0 }
    ]
};

// --- CHANCE CARDS (운명의 수레바퀴) ---
const chanceCards = [
  { title:'알렉산드로스의 동방 원정', desc:'거대한 원정군에 합류합니다. 즉시 출발(GO) 칸으로 직행합니다!', icon:'fa-flag', effect:'goto', target:0, collectGo:true },
  { title:'카노사의 굴욕', desc:'교황의 분노를 샀습니다. 파문을 면하기 위해 즉시 카노사 칸으로 이동하십시오.', icon:'fa-person-praying', effect:'goto', target:24, collectGo:false },
  { title:'십자군 전쟁 발발', desc:'성지 회복을 위한 전쟁에 참전하게 되었습니다. 혼란 속에 세 칸 뒤로 물러나십시오.', icon:'fa-shield-halved', effect:'move', amount:-3 },
  { title:'장건의 서역 개척', desc:'새로운 무역로를 발견했습니다. 가장 가까운 교역로로 즉시 이동하십시오!', icon:'fa-person-hiking', effect:'nearest_station' },
  { title:'로마의 도로 건설', desc:'사방으로 뻗은 로마의 도로 덕분에 이동이 빨라졌습니다.', icon:'fa-road', effect:'move', amount:3 },
  { title:'수도원 운동 성공', desc:'클뤼니 수도원 중심의 개혁 운동이 성공했습니다.', icon:'fa-church', effect:'money', amount:150 },
  { title:'이민족 침입 경보!', desc:'국경이 위협받고 있습니다. 사막 조난 칸으로 이동하세요.', icon:'fa-skull-crossbones', effect:'go_jail' },
  { title:'비단 무역 호황', desc:'비단의 가격이 폭등하여 큰 이익을 얻었습니다.', icon:'fa-sack-dollar', effect:'money', amount:100 },
];

// --- COMMUNITY CHEST CARDS (역사적 사건) ---
const chestCards = [
  { title:'나일 강의 정기적 범람', desc:'비옥한 토지로 인해 올해 농사에 큰 풍년이 들었습니다.', icon:'fa-water', effect:'money', amount:200 },
  { title:'수나라 대운하 개통', desc:'남북의 물류 이동이 원활해져 막대한 상업적 이익을 얻습니다. 모든 플레이어에게서 50 골드씩 받습니다.', icon:'fa-sailboat', effect:'collect_all', amount:50 },
  { title:'르네상스 시대의 도래', desc:'메디치 가문이 당신의 예술품을 후원하기로 했습니다.', icon:'fa-palette', effect:'money', amount:100 },
  { title:'흑사병의 유행', desc:'유럽 전역에 전염병이 돌고 있습니다. 방역 및 치료비를 지불하십시오.', icon:'fa-skull', effect:'money', amount:-100 },
  { title:'산스크리트 문학 부흥', desc:'굽타 왕조 시대의 문학이 꽃피었습니다. 저작권 수입을 받습니다.', icon:'fa-feather-pointed', effect:'money', amount:50 },
  { title:'보름스 협약 체결', desc:'황제와 교황의 대립이 해결되어 평화의 시기가 도래했습니다.', icon:'fa-file-signature', effect:'money', amount:75 },
  { title:'교회의 대분열', desc:'서유럽 크리스트교 세계가 큰 혼란에 빠졌습니다. 모든 건물 수리비 발생!', icon:'fa-bolt', effect:'repair', houseCost:25, hotelCost:100 },
  { title:'굽타 양식 미술품 발견', desc:'가치있는 미술품을 발견하여 판매했습니다.', icon:'fa-gem', effect:'money', amount:120 },
];

// --- GAME STATE ---
let gameState = {
  players: [],
  currentPlayer: 0,
  turnNumber: 1,
  phase: 'ROLL', // ROLL, MOVED, ACTION, GAME_OVER
  doublesCount: 0,
  lastDice: [0, 0],
  properties: {}, // spaceIndex -> { owner, buildings }
  started: false,
};

let playerCount = 3;

// =============================================
// START SCREEN
// =============================================
function setPlayerCount(n) {
  playerCount = n;
  document.querySelectorAll('.count-btn').forEach((b,i) => {
    b.classList.toggle('active', [2,3,4][i] === n);
  });
  renderPlayerNameInputs();
}

function renderPlayerNameInputs() {
  const c = document.getElementById('player-names');
  const defaults = ['알렉산드로스','장건','칼리다사','칭기즈칸'];
  c.innerHTML = '';
  for (let i = 0; i < playerCount; i++) {
    c.innerHTML += `<div class="player-name-row">
      <div class="player-name-dot" style="background:${PLAYER_COLORS[i]}"></div>
      <input class="player-name-input" id="pname-${i}" value="${defaults[i]}" maxlength="10" placeholder="플레이어 ${i+1}">
    </div>`;
  }
}

function startGame() {
  gameState.players = [];
  for (let i = 0; i < playerCount; i++) {
    const name = document.getElementById(`pname-${i}`).value || `플레이어 ${i+1}`;
    gameState.players.push({
      id: i, name, money: STARTING_MONEY, position: 0,
      inJail: false, jailTurns: 0, bankrupt: false,
      color: PLAYER_COLORS[i], emoji: PLAYER_EMOJIS[i],
    });
  }
  gameState.currentPlayer = 0;
  gameState.turnNumber = 1;
  gameState.phase = 'ROLL';
  gameState.doublesCount = 0;
  gameState.properties = {};
  gameState.started = true;

  document.getElementById('start-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  
  renderBoard();
  renderPlayerPanels();
  updateUI();
  addLog('🌍 세계사 모노폴리 게임이 시작되었습니다!', 'important');
}

// =============================================
// BOARD RENDERING
// =============================================
function renderBoard() {
  const board = document.getElementById('monopoly-board');
  board.innerHTML = `<div class="center-piece">
    <div class="center-title">🌍 세계사 모노폴리</div>
    <div class="deck-container">
      <div class="deck chance-deck"><i class="fa-solid fa-dharmachakra"></i><span>운명의 수레바퀴</span></div>
      <div class="deck chest-deck"><i class="fa-solid fa-book-open"></i><span>역사적 사건</span></div>
    </div>
  </div>`;

  boardSpaces.forEach((space, index) => {
    let row, col, edgeClass = '';
    if (index === 0) { row=11; col=11; edgeClass='corner go'; }
    else if (index < 10) { row=11; col=11-index; edgeClass='edge-bottom'; }
    else if (index === 10) { row=11; col=1; edgeClass='corner jail'; }
    else if (index < 20) { row=11-(index-10); col=1; edgeClass='edge-left'; }
    else if (index === 20) { row=1; col=1; edgeClass='corner parking'; }
    else if (index < 30) { row=1; col=1+(index-20); edgeClass='edge-top'; }
    else if (index === 30) { row=1; col=11; edgeClass='corner gotojail'; }
    else { row=1+(index-30); col=11; edgeClass='edge-right'; }

    let html = '';
    if (space.type === 'property') {
      html = `<div class="color-bar" style="background:${space.color}"></div>
        <div class="building-indicators" id="buildings-${index}"></div>
        <div class="space-name">${space.name}</div>
        <div class="space-price">${space.price}G</div>`;
    } else if (space.type === 'corner') {
      html = `<div class="space-name corner-name"><i class="fa-solid ${space.icon} corner-icon"></i><br>${space.name}</div>`;
    } else if (space.type === 'station') {
      html = `<div class="space-name"><i class="fa-solid ${space.icon} space-icon"></i><br>${space.name}</div>
        <div class="space-price">${space.price}G</div>`;
    } else if (space.type === 'utility') {
      html = `<div class="space-name"><i class="fa-solid ${space.icon} space-icon"></i><br>${space.name}</div>
        <div class="space-price">${space.price}G</div>`;
    } else {
      html = `<div class="space-name"><i class="fa-solid ${space.icon||'fa-star'} space-icon"></i><br>${space.name}</div>`;
      if (space.amount) html += `<div class="space-price">${space.amount}G</div>`;
    }

    html += `<div class="owner-indicator" id="owner-${index}" style="display:none"></div>`;
    html += `<div class="player-tokens" id="tokens-${index}"></div>`;

    board.innerHTML += `<div class="space ${edgeClass}" style="grid-row:${row};grid-column:${col}" 
      id="space-${index}" onclick="showSpaceInfo(${index})">${html}</div>`;
  });

  updateTokenPositions();
}

function updateTokenPositions() {
  // Clear all token containers
  for (let i = 0; i < 40; i++) {
    const el = document.getElementById(`tokens-${i}`);
    if (el) el.innerHTML = '';
  }
  // Place tokens
  gameState.players.forEach(p => {
    if (p.bankrupt) return;
    const el = document.getElementById(`tokens-${p.position}`);
    if (el) {
      el.innerHTML += `<div class="board-token" style="background:${p.color}">${p.id+1}</div>`;
    }
  });
}

function updateBoardOwnership() {
  for (let i = 0; i < 40; i++) {
    const ownerEl = document.getElementById(`owner-${i}`);
    const buildEl = document.getElementById(`buildings-${i}`);
    if (!ownerEl) continue;
    
    const prop = gameState.properties[i];
    if (prop && prop.owner !== undefined) {
      ownerEl.style.display = 'block';
      ownerEl.style.background = gameState.players[prop.owner].color;
      
      if (buildEl && prop.buildings > 0) {
        buildEl.innerHTML = '';
        if (prop.buildings === 4) {
          buildEl.innerHTML = '<div class="building-dot empire"></div>';
        } else {
          for (let b = 0; b < prop.buildings; b++) {
            buildEl.innerHTML += '<div class="building-dot"></div>';
          }
        }
      }
    } else {
      ownerEl.style.display = 'none';
      if (buildEl) buildEl.innerHTML = '';
    }
  }
}

// =============================================
// PLAYER PANELS
// =============================================
function renderPlayerPanels() {
  const c = document.getElementById('player-panels');
  c.innerHTML = '';
  gameState.players.forEach(p => {
    c.innerHTML += `<div class="player-panel" id="panel-${p.id}">
      <div class="player-panel-header">
        <div class="player-token-display" style="background:${p.color}">${p.id+1}</div>
        <div class="player-panel-name">${p.name}</div>
        <div class="player-panel-money" id="money-${p.id}" style="color:${p.color}"></div>
      </div>
      <div class="player-properties-mini" id="props-${p.id}"></div>
      <div class="player-panel-status" id="status-${p.id}"></div>
    </div>`;
  });
}

function updatePlayerPanels() {
  gameState.players.forEach(p => {
    const panel = document.getElementById(`panel-${p.id}`);
    const moneyEl = document.getElementById(`money-${p.id}`);
    const propsEl = document.getElementById(`props-${p.id}`);
    const statusEl = document.getElementById(`status-${p.id}`);
    if (!panel) return;

    panel.classList.toggle('active-player', p.id === gameState.currentPlayer && !p.bankrupt);
    panel.classList.toggle('bankrupt', p.bankrupt);
    moneyEl.textContent = p.money + 'G';

    // Mini property dots
    let dots = '';
    for (const [idx, prop] of Object.entries(gameState.properties)) {
      if (prop.owner === p.id) {
        const sp = boardSpaces[idx];
        let cls = sp.type === 'station' ? 'station' : sp.type === 'utility' ? 'utility' : '';
        let bg = sp.color || '#666';
        dots += `<div class="prop-dot ${cls}" style="background:${bg}"></div>`;
      }
    }
    propsEl.innerHTML = dots;

    if (p.bankrupt) statusEl.textContent = '💀 파산';
    else if (p.inJail) statusEl.textContent = `🏜️ 사막 조난 (${p.jailTurns}/3턴)`;
    else statusEl.textContent = `📍 ${boardSpaces[p.position].name.replace('<br>',' ')}`;
  });
}

// =============================================
// UI UPDATE
// =============================================
function updateUI() {
  const p = currentPlayer();
  document.getElementById('current-player-name').innerHTML = 
    `<span class="player-dot" style="background:${p.color}"></span> ${p.name}의 차례`;
  document.getElementById('turn-number').textContent = `TURN ${gameState.turnNumber}`;

  const rollBtn = document.getElementById('roll-btn');
  rollBtn.disabled = gameState.phase !== 'ROLL';

  updatePlayerPanels();
  updateBoardOwnership();
  updateTokenPositions();
  updateActionButtons();
}

function updateActionButtons() {
  const c = document.getElementById('action-buttons');
  c.innerHTML = '';
  const p = currentPlayer();

  if (gameState.phase === 'MOVED' || gameState.phase === 'ACTION') {
    // Build button if player owns a monopoly
    if (canBuildAnything(p.id)) {
      c.innerHTML += `<button class="action-btn build" onclick="showBuildMenu()"><i class="fa-solid fa-city"></i> 문명 건설</button>`;
    }
    // End turn
    c.innerHTML += `<button class="action-btn end-turn" onclick="endTurn()"><i class="fa-solid fa-forward"></i> 턴 종료</button>`;
  }
}

function currentPlayer() {
  return gameState.players[gameState.currentPlayer];
}

// =============================================
// DICE ROLLING & MOVEMENT
// =============================================
function rollDice() {
  if (gameState.phase !== 'ROLL') return;
  const rollBtn = document.getElementById('roll-btn');
  rollBtn.disabled = true;

  const d1El = document.getElementById('die1');
  const d2El = document.getElementById('die2');
  d1El.classList.add('rolling');
  d2El.classList.add('rolling');

  let rolls = 0;
  const anim = setInterval(() => {
    d1El.querySelector('span').textContent = DICE_FACES[Math.floor(Math.random()*6)];
    d2El.querySelector('span').textContent = DICE_FACES[Math.floor(Math.random()*6)];
    rolls++;
    if (rolls > 12) {
      clearInterval(anim);
      const v1 = Math.floor(Math.random()*6)+1;
      const v2 = Math.floor(Math.random()*6)+1;
      d1El.querySelector('span').textContent = DICE_FACES[v1-1];
      d2El.querySelector('span').textContent = DICE_FACES[v2-1];
      d1El.classList.remove('rolling');
      d2El.classList.remove('rolling');
      gameState.lastDice = [v1, v2];
      handleDiceResult(v1, v2);
    }
  }, 80);
}

function handleDiceResult(v1, v2) {
  const p = currentPlayer();
  const total = v1 + v2;
  const isDoubles = v1 === v2;

  addLog(`🎲 ${p.name}: ${v1} + ${v2} = ${total}${isDoubles ? ' (더블!)' : ''}`);

  if (p.inJail) {
    if (isDoubles) {
      p.inJail = false;
      p.jailTurns = 0;
      addLog(`🆓 ${p.name}이(가) 더블로 사막 조난에서 탈출!`, 'important');
      movePlayer(p, total);
    } else {
      p.jailTurns++;
      if (p.jailTurns >= 3) {
        p.inJail = false;
        p.jailTurns = 0;
        changeMoney(p, -50);
        addLog(`💸 ${p.name}: 50G를 내고 사막에서 탈출`, 'negative');
        movePlayer(p, total);
      } else {
        addLog(`🏜️ ${p.name}: 아직 사막에서 탈출 못함 (${p.jailTurns}/3)`);
        gameState.phase = 'ACTION';
        updateUI();
      }
    }
    return;
  }

  if (isDoubles) {
    gameState.doublesCount++;
    if (gameState.doublesCount >= 3) {
      addLog(`🚨 ${p.name}: 3연속 더블! 사막 조난으로 이동`, 'negative');
      sendToJail(p);
      return;
    }
  } else {
    gameState.doublesCount = 0;
  }

  movePlayer(p, total);
}

function movePlayer(player, steps) {
  const oldPos = player.position;
  const newPos = (oldPos + steps) % 40;
  
  // Check if passed GO
  if (newPos < oldPos && steps > 0) {
    changeMoney(player, GO_SALARY);
    addLog(`💰 ${player.name}: 출발 칸 통과! ${GO_SALARY}G 획득`, 'important');
  }

  player.position = newPos;
  updateTokenPositions();

  setTimeout(() => handleLanding(player), 400);
}

function movePlayerTo(player, target, collectGoSalary) {
  const oldPos = player.position;
  if (collectGoSalary && target < oldPos) {
    changeMoney(player, GO_SALARY);
    addLog(`💰 ${player.name}: 출발 칸 통과! ${GO_SALARY}G 획득`, 'important');
  }
  player.position = target;
  updateTokenPositions();
  setTimeout(() => handleLanding(player), 400);
}

function sendToJail(player) {
  player.position = JAIL_INDEX;
  player.inJail = true;
  player.jailTurns = 0;
  gameState.phase = 'ACTION';
  updateUI();
}

// =============================================
// LANDING LOGIC
// =============================================
function handleLanding(player) {
  const space = boardSpaces[player.position];
  const idx = player.position;

  addLog(`📍 ${player.name} → ${space.name.replace(/<br>/g,' ')}`);

  switch(space.type) {
    case 'property':
    case 'station':
    case 'utility':
      handlePropertyLanding(player, idx, space);
      break;
    case 'chance':
      drawChanceCard(player);
      break;
    case 'chest':
      drawChestCard(player);
      break;
    case 'tax':
      changeMoney(player, -space.amount);
      addLog(`💸 ${player.name}: ${space.name}으로 ${space.amount}G 지불`, 'negative');
      gameState.phase = 'ACTION';
      updateUI();
      break;
    case 'corner':
      if (space.id === 'gotojail') {
        addLog(`⚠️ 이민족 침입! ${player.name} 사막 조난으로!`, 'negative');
        sendToJail(player);
      } else if (space.id === 'go') {
        // Already collected GO salary if moving
        gameState.phase = 'ACTION';
        updateUI();
      } else {
        gameState.phase = 'ACTION';
        updateUI();
      }
      break;
    default:
      gameState.phase = 'ACTION';
      updateUI();
  }
}

function handlePropertyLanding(player, idx, space) {
  const prop = gameState.properties[idx];
  
  if (!prop || prop.owner === undefined) {
    // Unowned - present quiz instead of buy modal
    showQuizModal(player, idx, space);
  } else if (prop.owner === player.id) {
    addLog(`🏠 ${player.name}: 자신의 영토 ${space.name}`);
    gameState.phase = 'ACTION';
    updateUI();
  } else {
    // Pay rent
    const owner = gameState.players[prop.owner];
    if (owner.bankrupt) {
      gameState.phase = 'ACTION';
      updateUI();
      return;
    }
    const rent = calculateRent(idx, space, prop);
    addLog(`💸 ${player.name} → ${owner.name}: 통행료 ${rent}G`, 'negative');
    changeMoney(player, -rent);
    changeMoney(owner, rent);
    gameState.phase = 'ACTION';
    updateUI();
  }
}

function calculateRent(idx, space, prop) {
  if (space.type === 'station') {
    const owned = STATION_INDICES.filter(si => {
      const p = gameState.properties[si];
      return p && p.owner === prop.owner;
    }).length;
    return 25 * Math.pow(2, owned - 1); // 25, 50, 100, 200
  }
  if (space.type === 'utility') {
    const owned = UTILITY_INDICES.filter(ui => {
      const p = gameState.properties[ui];
      return p && p.owner === prop.owner;
    }).length;
    const diceTotal = gameState.lastDice[0] + gameState.lastDice[1];
    return owned === 2 ? diceTotal * 10 : diceTotal * 4;
  }
  // Property
  const buildings = prop.buildings || 0;
  if (buildings > 0) return space.rent[buildings];
  // Check monopoly
  const hasMonopoly = checkMonopoly(prop.owner, space.group);
  return hasMonopoly ? space.rent[0] * 2 : space.rent[0];
}

function checkMonopoly(playerId, group) {
  let count = 0;
  boardSpaces.forEach((sp, i) => {
    if (sp.group === group) {
      const p = gameState.properties[i];
      if (p && p.owner === playerId) count++;
    }
  });
  return count >= GROUP_SIZES[group];
}

// =============================================
// BUYING / BUILDING
// =============================================
let selectedPropertyIndex = -1;

function getRandomQuiz(space) {
    let groupQuizzes = [];
    if (space.type === 'station') {
        groupQuizzes = quizBank.stations;
    } else if (space.type === 'utility') {
        groupQuizzes = quizBank.utilities;
    } else if (space.type === 'property') {
        groupQuizzes = quizBank[space.group];
    }
    
    if (!groupQuizzes || groupQuizzes.length === 0) {
        return {
            q: "역사 상식 퀴즈! 다음 중 고대 로마의 수도는 어디일까요?",
            options: ["로마", "아테네", "카이로", "스파르타"],
            answer: 0
        };
    }
    
    return groupQuizzes[Math.floor(Math.random() * groupQuizzes.length)];
}

function showQuizModal(player, idx, space) {
  selectedPropertyIndex = idx;
  const quiz = getRandomQuiz(space);
  
  // Mix options but remember the correct one (it's always index 0 originally)
  let displayOptions = quiz.options.map((opt, i) => ({ text: opt, isCorrect: i === quiz.answer }));
  for (let i = displayOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [displayOptions[i], displayOptions[j]] = [displayOptions[j], displayOptions[i]];
  }

  const modal = document.getElementById('modal-overlay');
  document.getElementById('modal-icon').textContent = '❓';
  document.getElementById('modal-title').textContent = `${space.name.replace(/<br>/g,' ')} 획득 퀴즈!`;

  let bodyHtml = `
    <p style="color: var(--gold); font-size: 15px; font-weight: bold; margin-bottom: 12px; text-align: center;">퀴즈를 맞추면 영토를 무료로 획득합니다!</p>
    <p style="font-size: 16px; font-weight: bold; line-height: 1.5; color: white;">Q. ${quiz.q}</p>
    <div class="quiz-options" id="quiz-options">
  `;

  displayOptions.forEach((opt, i) => {
      bodyHtml += `<button class="quiz-btn" onclick="submitQuizAnswer(${opt.isCorrect}, this, ${player.id})">${i + 1}. ${opt.text}</button>`;
  });
  bodyHtml += `</div>`;

  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-actions').innerHTML = `
    <button class="modal-btn secondary" onclick="skipBuy()">포기하기</button>
  `;
  modal.classList.add('active');
}

function submitQuizAnswer(isCorrect, btnElement, playerId) {
    const buttons = document.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        document.getElementById('modal-actions').innerHTML = `
            <button class="modal-btn primary" onclick="acquirePropertyByQuiz(${playerId}, ${selectedPropertyIndex})">영토 획득하기</button>
        `;
        addLog(`🎉 정답! ${gameState.players[playerId].name}이(가) 역사 지식을 증명했습니다.`, 'important');
    } else {
        btnElement.classList.add('wrong');
        // highlight correct implicitly if wanted, but just let the player know it's wrong
        document.getElementById('modal-actions').innerHTML = `
            <button class="modal-btn secondary" onclick="skipBuy()">닫기</button>
        `;
        addLog(`❌ 오답입니다! 영토 획득 기회를 놓쳤습니다.`, 'negative');
    }
}

function acquirePropertyByQuiz(playerId, idx) {
  const p = gameState.players[playerId];
  const space = boardSpaces[idx];
  
  // Provide the property for free as a reward for historical knowledge
  gameState.properties[idx] = { owner: playerId, buildings: 0 };
  addLog(`🏛️ ${p.name}: 퀴즈에 통과하여 ${space.name} 무료 획득!`, 'important');
  closeModal();
  gameState.phase = 'ACTION';
  updateUI();
}

function skipBuy() {
  closeModal();
  gameState.phase = 'ACTION';
  updateUI();
}

function canBuildAnything(playerId) {
  for (let i = 0; i < 40; i++) {
    const sp = boardSpaces[i];
    if (sp.type !== 'property') continue;
    const prop = gameState.properties[i];
    if (!prop || prop.owner !== playerId) continue;
    if ((prop.buildings || 0) >= 4) continue;
    if (!checkMonopoly(playerId, sp.group)) continue;
    if (gameState.players[playerId].money >= sp.buildCost) return true;
  }
  return false;
}

function showBuildMenu() {
  const p = currentPlayer();
  let bodyHtml = '<p>건설할 영토를 선택하세요:</p>';
  
  for (let i = 0; i < 40; i++) {
    const sp = boardSpaces[i];
    if (sp.type !== 'property') continue;
    const prop = gameState.properties[i];
    if (!prop || prop.owner !== p.id) continue;
    if ((prop.buildings || 0) >= 4) continue;
    if (!checkMonopoly(p.id, sp.group)) continue;
    if (p.money < sp.buildCost) continue;

    const b = prop.buildings || 0;
    const nextName = BUILD_NAMES[b];
    bodyHtml += `<button class="action-btn build" style="margin:4px 0;width:100%" onclick="buildOn(${i})">
      <span style="display:inline-block;width:12px;height:12px;background:${sp.color};border-radius:2px;margin-right:6px"></span>
      ${sp.name}: ${nextName} 건설 (${sp.buildCost}G)</button>`;
  }

  document.getElementById('modal-icon').textContent = '🏗️';
  document.getElementById('modal-title').textContent = '문명 건설';
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-actions').innerHTML = `<button class="modal-btn secondary" onclick="closeModal()">닫기</button>`;
  document.getElementById('modal-overlay').classList.add('active');
}

function buildOn(idx) {
  const p = currentPlayer();
  const sp = boardSpaces[idx];
  const prop = gameState.properties[idx];
  changeMoney(p, -sp.buildCost);
  prop.buildings = (prop.buildings || 0) + 1;
  const bName = BUILD_NAMES[prop.buildings - 1];
  addLog(`🏗️ ${p.name}: ${sp.name}에 ${bName} 건설! (-${sp.buildCost}G)`, 'important');
  closeModal();
  updateUI();
}

// =============================================
// CARDS
// =============================================
function drawChanceCard(player) {
  const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
  showCardReveal('chance', card, () => executeCardEffect(player, card));
}

function drawChestCard(player) {
  const card = chestCards[Math.floor(Math.random() * chestCards.length)];
  showCardReveal('chest', card, () => executeCardEffect(player, card));
}

let pendingCardCallback = null;

function showCardReveal(type, card, callback) {
  pendingCardCallback = callback;
  const overlay = document.getElementById('card-overlay');
  document.getElementById('card-header-bar').className = `card-header-bar ${type}`;
  document.getElementById('card-icon-area').className = `card-icon-area ${type}`;
  document.getElementById('card-icon-area').innerHTML = `<i class="fa-solid ${card.icon}"></i>`;
  document.getElementById('card-name').textContent = card.title;
  document.getElementById('card-desc').textContent = card.desc;

  let effectText = '';
  let effectClass = 'neutral';
  if (card.effect === 'money') {
    effectText = card.amount > 0 ? `+${card.amount}G 획득` : `${card.amount}G 지불`;
    effectClass = card.amount > 0 ? 'positive' : 'negative';
  } else if (card.effect === 'collect_all') {
    effectText = `모든 플레이어에게서 ${card.amount}G씩 수금`;
    effectClass = 'positive';
  } else if (card.effect === 'goto') {
    effectText = `${boardSpaces[card.target].name.replace(/<br>/g,' ')} 칸으로 이동!`;
  } else if (card.effect === 'move') {
    effectText = card.amount > 0 ? `${card.amount}칸 전진` : `${Math.abs(card.amount)}칸 후퇴`;
    effectClass = card.amount > 0 ? 'positive' : 'negative';
  } else if (card.effect === 'nearest_station') {
    effectText = '가장 가까운 교역로로 이동!';
  } else if (card.effect === 'go_jail') {
    effectText = '사막 조난으로 이동!';
    effectClass = 'negative';
  } else if (card.effect === 'repair') {
    effectText = `건물 수리: 마을당 ${card.houseCost}G, 제국당 ${card.hotelCost}G`;
    effectClass = 'negative';
  }

  const effectEl = document.getElementById('card-effect');
  effectEl.textContent = effectText;
  effectEl.className = `card-effect ${effectClass}`;
  overlay.classList.add('active');
}

function closeCard() {
  document.getElementById('card-overlay').classList.remove('active');
  if (pendingCardCallback) {
    const cb = pendingCardCallback;
    pendingCardCallback = null;
    cb();
  }
}

function executeCardEffect(player, card) {
  switch(card.effect) {
    case 'money':
      changeMoney(player, card.amount);
      addLog(`${card.amount > 0 ? '💰' : '💸'} ${player.name}: ${card.title} (${card.amount > 0 ? '+' : ''}${card.amount}G)`, card.amount > 0 ? 'important' : 'negative');
      gameState.phase = 'ACTION';
      updateUI();
      break;
    case 'collect_all':
      let collected = 0;
      gameState.players.forEach(op => {
        if (op.id !== player.id && !op.bankrupt) {
          changeMoney(op, -card.amount);
          collected += card.amount;
        }
      });
      changeMoney(player, collected);
      addLog(`💰 ${player.name}: 모든 플레이어에게서 총 ${collected}G 수금!`, 'important');
      gameState.phase = 'ACTION';
      updateUI();
      break;
    case 'goto':
      addLog(`🚶 ${player.name}: ${boardSpaces[card.target].name.replace(/<br>/g,' ')}(으)로 이동!`);
      movePlayerTo(player, card.target, card.collectGo !== false);
      break;
    case 'move':
      const newPos = ((player.position + card.amount) + 40) % 40;
      if (card.amount < 0) {
        player.position = newPos;
        updateTokenPositions();
        setTimeout(() => handleLanding(player), 400);
      } else {
        movePlayer(player, card.amount);
      }
      break;
    case 'nearest_station':
      const nearest = findNearestStation(player.position);
      addLog(`🚶 ${player.name}: 가장 가까운 교역로 ${boardSpaces[nearest].name}(으)로!`);
      movePlayerTo(player, nearest, true);
      break;
    case 'go_jail':
      addLog(`🏜️ ${player.name}: 사막 조난으로 이동!`, 'negative');
      sendToJail(player);
      break;
    case 'repair':
      let repairCost = 0;
      for (const [idx, prop] of Object.entries(gameState.properties)) {
        if (prop.owner === player.id && prop.buildings > 0) {
          if (prop.buildings === 4) repairCost += card.hotelCost;
          else repairCost += prop.buildings * card.houseCost;
        }
      }
      changeMoney(player, -repairCost);
      addLog(`🔧 ${player.name}: 건물 수리비 ${repairCost}G 지불`, 'negative');
      gameState.phase = 'ACTION';
      updateUI();
      break;
  }
}

function findNearestStation(pos) {
  let minDist = 99, nearest = STATION_INDICES[0];
  STATION_INDICES.forEach(si => {
    const dist = (si - pos + 40) % 40;
    if (dist > 0 && dist < minDist) { minDist = dist; nearest = si; }
  });
  return nearest;
}

// =============================================
// MONEY & BANKRUPTCY
// =============================================
function changeMoney(player, amount) {
  player.money += amount;
  if (player.money < 0) {
    handleBankruptcy(player);
  }
}

function handleBankruptcy(player) {
  player.bankrupt = true;
  player.money = 0;
  addLog(`💀 ${player.name} 파산!`, 'negative');
  
  // Release properties
  for (const [idx, prop] of Object.entries(gameState.properties)) {
    if (prop.owner === player.id) {
      delete gameState.properties[idx];
    }
  }

  // Check if game over
  const alive = gameState.players.filter(p => !p.bankrupt);
  if (alive.length <= 1) {
    gameOver(alive[0]);
  }
}

function gameOver(winner) {
  gameState.phase = 'GAME_OVER';
  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('gameover-screen').classList.add('active');
  document.getElementById('winner-name').textContent = winner.name;

  let propCount = 0;
  for (const prop of Object.values(gameState.properties)) {
    if (prop.owner === winner.id) propCount++;
  }
  document.getElementById('winner-stats').innerHTML = `
    <div class="stat-box"><div class="stat-value">${winner.money}G</div><div class="stat-label">최종 자산</div></div>
    <div class="stat-box"><div class="stat-value">${propCount}</div><div class="stat-label">보유 영토</div></div>
    <div class="stat-box"><div class="stat-value">${gameState.turnNumber}</div><div class="stat-label">총 턴 수</div></div>`;
}

// =============================================
// TURN MANAGEMENT
// =============================================
function endTurn() {
  closeModal();
  const isDoubles = gameState.lastDice[0] === gameState.lastDice[1] && gameState.doublesCount > 0;
  
  if (isDoubles && !currentPlayer().inJail) {
    addLog(`🎲 더블! ${currentPlayer().name} 한 번 더!`, 'important');
    gameState.phase = 'ROLL';
    updateUI();
    return;
  }

  gameState.doublesCount = 0;
  // Next player
  let next = gameState.currentPlayer;
  do {
    next = (next + 1) % gameState.players.length;
    if (next === 0) gameState.turnNumber++;
  } while (gameState.players[next].bankrupt && next !== gameState.currentPlayer);

  gameState.currentPlayer = next;
  gameState.phase = 'ROLL';
  updateUI();
}

// =============================================
// SPACE INFO (click on board)
// =============================================
function showSpaceInfo(idx) {
  if (!gameState.started) return;
  const space = boardSpaces[idx];
  const prop = gameState.properties[idx];
  
  if (space.type !== 'property' && space.type !== 'station' && space.type !== 'utility') return;

  let icon = space.type === 'station' ? '🐎' : space.type === 'utility' ? '📜' : '🏛️';
  document.getElementById('modal-icon').textContent = icon;
  document.getElementById('modal-title').textContent = space.name.replace(/<br>/g,' ');

  let bodyHtml = '';
  if (prop && prop.owner !== undefined) {
    const owner = gameState.players[prop.owner];
    bodyHtml += `<p>소유자: <strong style="color:${owner.color}">${owner.name}</strong></p>`;
    if (space.type === 'property' && prop.buildings > 0) {
      bodyHtml += `<p>발전 단계: <strong>${BUILD_NAMES[prop.buildings-1]}</strong> (${prop.buildings}/4)</p>`;
    }
  } else {
    bodyHtml += `<p>소유자: 없음</p>`;
  }
  bodyHtml += `<p>가격: ${space.price}G</p>`;

  if (space.type === 'property') {
    bodyHtml += `<table class="rent-table">
      <tr><th>기본</th><td>${space.rent[0]}G</td></tr>
      <tr><th>마을</th><td>${space.rent[1]}G</td></tr>
      <tr><th>도시</th><td>${space.rent[2]}G</td></tr>
      <tr><th>국가</th><td>${space.rent[3]}G</td></tr>
      <tr><th>제국★</th><td>${space.rent[4]}G</td></tr>
    </table>`;
  }

  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-actions').innerHTML = `<button class="modal-btn secondary" onclick="closeModal()">닫기</button>`;
  document.getElementById('modal-overlay').classList.add('active');
}

// =============================================
// UTILITIES
// =============================================
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

function addLog(msg, type = '') {
  const c = document.getElementById('log-entries');
  const div = document.createElement('div');
  div.className = `log-entry ${type}`;
  div.textContent = msg;
  c.insertBefore(div, c.firstChild);
  if (c.children.length > 50) c.removeChild(c.lastChild);
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  renderPlayerNameInputs();
});
