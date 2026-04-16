/* ── GAME DATA & CONFIGURATION ──────────────────── */
const GAME_VERSION = "1.0";

const PORTS = {
  "리스본": {
    name: "리스본", emoji: "🏛️", x: 46, y: 32,
    desc: "포르투갈 왕국의 수도. 엔히크 왕자의 항해학교에서 시작된 대항해시대의 심장부.",
    history: "<b>리스본(Lisbon)</b>은 15~16세기 대항해시대의 중심지였습니다. 포르투갈의 엔히크 왕자(항해왕자)는 사그리쉬에 항해학교를 세워 천문학·지리학·조선술을 체계화했고, 이곳에서 출발한 탐험가들이 아프리카 해안을 따라 인도에 이르는 항로를 개척했습니다.",
    img: "images/port_lisbon.png",
    buy: {"와인": 20, "모직물": 40},
    sell: {"사탕수수": 160, "향신료": 320, "도자기": 280, "황금": 400}
  },
  "세비야": {
    name: "세비야", emoji: "⛪", x: 47, y: 34,
    desc: "에스파냐 무역의 관문. 콜럼버스가 신대륙으로 출항한 스페인의 무역 중심.",
    history: "<b>세비야(Sevilla)</b>는 스페인 식민지 무역의 독점 허가를 받은 도시입니다. 콜럼버스는 1492년 이곳을 출발해 대서양을 횡단, 아메리카에 도착했습니다. 아메리카에서 쏟아지는 은으로 16세기 유럽 최고의 부유 도시가 되었습니다.",
    img: "images/port_lisbon.png", // fallback
    buy: {"와인": 18, "모직물": 45},
    sell: {"사탕수수": 170, "황금": 500, "향신료": 295, "도자기": 250}
  },
  "베네치아": {
    name: "베네치아", emoji: "🎭", x: 52, y: 28,
    desc: "지중해 무역의 왕자. 오스만 제국에 막혀 새 항로를 열게 한 도시.",
    history: "<b>베네치아(Venice)</b>는 중세 지중해 무역을 독점했던 이탈리아의 도시국가입니다. 동방 향신료를 육로와 지중해를 통해 유럽 전역에 공급하며 막대한 부를 쌓았습니다. 1453년 오스만의 콘스탄티노플 정복으로 교역이 봉쇄된 것이 대항해시대의 배경이 되었습니다.",
    img: "images/port_lisbon.png", // fallback
    buy: {"도자기": 100, "모직물": 50},
    sell: {"향신료": 350, "황금": 450, "사탕수수": 180}
  },
  "살바도르": {
    name: "살바도르", emoji: "🌴", x: 33, y: 65,
    desc: "브라질의 첫 수도. 대서양 노예 무역과 사탕수수 플랜테이션의 중심지.",
    history: "<b>살바도르(Salvador)</b>는 1549년 포르투갈이 건설한 브라질 최초의 수도입니다. 광대한 사탕수수 농장이 세워졌고, 대서양 삼각 무역의 핵심 거점이 되었습니다.",
    img: "images/port_lisbon.png", // fallback
    buy: {"사탕수수": 28, "황금": 120},
    sell: {"와인": 110, "모직물": 130, "도자기": 250}
  },
  "테노치티틀란": {
    name: "테노치티틀란", emoji: "🏺", x: 18, y: 45,
    desc: "아즈텍 제국의 황금 수도. 에르난 코르테스의 정복으로 멸망한 도시.",
    history: "<b>테노치티틀란(Tenochtitlan)</b>은 아즈텍 제국의 수도로, 1521년 에르난 코르테스가 이끄는 스페인 군대와 전염병에 의해 정복당했습니다. 막대한 황금이 스페인으로 유입되었습니다.",
    img: "images/port_tenochtitlan.png",
    buy: {"황금": 80},
    sell: {"모직물": 200, "와인": 180, "사탕수수": 110}
  },
  "희망봉": {
    name: "희망봉", emoji: "🌊", x: 54, y: 75,
    desc: "아프리카 최남단. 인도양으로 가는 관문을 열어준 절벽.",
    history: "<b>희망봉(Cape of Good Hope)</b>은 포르투갈 탐험가 바르톨로메우 디아스가 1488년 처음 발견했습니다. 이를 통해 바스코 다 가마가 인도 캘리컷에 도달할 수 있었습니다.",
    img: "images/event_storm.png", // fallback
    buy: {}, // 보급항 역할
    sell: {"와인": 90, "모직물": 110, "도자기": 120}
  },
  "캘리컷": {
    name: "캘리컷", emoji: "🌶️", x: 70, y: 48,
    desc: "인도 남서부의 향신료 도시. 1498년 포르투갈 함대가 도착한 역사적 무역항.",
    history: "<b>캘리컷(Calicut)</b>은 바스코 다 가마가 1498년 도착함으로써 유럽-인도 직항로가 열린 곳입니다. 당시 후추 등 향신료는 유럽에서 금과 같은 가치를 지녔습니다.",
    img: "images/port_calicut.png",
    buy: {"향신료": 55, "도자기": 80},
    sell: {"와인": 160, "모직물": 210, "황금": 250}
  },
  "말라카": {
    name: "말라카", emoji: "🏯", x: 82, y: 55,
    desc: "동남아시아의 해협 도시. 동서양 무역의 교차로이자 향신료 무역의 허브.",
    history: "<b>말라카(Malacca)</b>는 1511년 포르투갈의 아폰수 드 알부케르크가 정복하여 포르투갈 향신료 독점의 쐐기를 박은 곳입니다. 극동의 도자기와 인도의 면직물이 모이는 곳이었습니다.",
    img: "images/port_calicut.png", // fallback
    buy: {"향신료": 45, "도자기": 60},
    sell: {"모직물": 180, "와인": 140, "황금": 300}
  }
};

const TRAVEL_COSTS = {
  "리스본-세비야": 30, "리스본-베네치아": 90, "세비야-베네치아": 80,
  "리스본-살바도르": 120, "세비야-테노치티틀란": 180, "살바도르-테노치티틀란": 140,
  "리스본-희망봉": 200, "살바도르-희망봉": 160,
  "희망봉-캘리컷": 180, "캘리컷-말라카": 100,
  "베네치아-리스본": 90 // 육로 막힘, 해상 우회 보정 비용
};
// 양방향 비용 자동 설정
Object.keys(TRAVEL_COSTS).forEach(key => {
  let [a, b] = key.split('-');
  TRAVEL_COSTS[`${b}-${a}`] = TRAVEL_COSTS[key];
});

const SHIPS = {
  "카라벨":   { name: "카라벨",   capacity: 10, next: "카락", cost: 800, desc: "소형 쾌속 범선" },
  "카락":     { name: "카락",     capacity: 18, next: "갈레온", cost: 1800, desc: "중형 상선" },
  "갈레온":   { name: "갈레온",   capacity: 30, next: null, cost: 0, desc: "대형 전투상선" }
};

const EQUIPMENTS = {
  "망원경": { id: "망원경", name: "망원경", cost: 200, emoji: "🔭", desc: "이벤트 보상 +10% 효과" },
  "대포":   { id: "대포", name: "선박용 대포", cost: 350, emoji: "💣", desc: "해적 습격 완벽 방어" },
  "해도":   { id: "해도", name: "정밀 해도", cost: 300, emoji: "🗺️", desc: "항해 비용 20% 감소, 구매 10% 할인" }
};

const QUIZZES = [
  { id: "q1", port: "살바도르", diff: "쉬움",
    q: "콜럼버스가 아메리카 원주민을 무엇이라 불렀는가?",
    opts: ["인디오", "아즈텍", "잉카", "마야"], a: 0, reward: 200, figure: "columbus",
    explain: "콜럼버스는 자신이 인도에 도착했다고 착각하여 원주민들을 '인디오(인도인)'라 불렀습니다." },
  { id: "q2", port: "희망봉", diff: "쉬움",
    q: "희망봉을 처음 발견(1488년)한 포르투갈 탐험가는?",
    opts: ["콜럼버스", "마젤란", "바르톨로메우 디아스", "바스코 다 가마"], a: 2, reward: 150, figure: "dias",
    explain: "바르톨로메우 디아스가 아프리카 최남단을 돌아 '폭풍의 곶'이라 명명했고, 훗날 '희망봉'으로 개명되었습니다." },
  { id: "q3", port: "캘리컷", diff: "쉬움",
    q: "바스코 다 가마가 인도에서 가져온 가장 귀한 특산품은?",
    opts: ["비단", "후추(향신료)", "도자기", "면직물"], a: 1, reward: 200, figure: "dagama",
    explain: "후추는 중세 유럽에서 고기 보존과 맛을 위해 금과 맞먹는 가치를 지녔습니다." },
  { id: "q4", port: "테노치티틀란", diff: "보통",
    q: "아즈텍 제국을 정복한 스페인의 정복자는?",
    opts: ["프란시스코 피사로", "에르난 코르테스", "아메리고 베스푸치", "마젤란"], a: 1, reward: 250, figure: "cortes",
    explain: "에르난 코르테스는 1521년 전염병과 내분을 이용하여 아즈텍의 수도 테노치티틀란을 함락시켰습니다." },
  { id: "q5", port: "베네치아", diff: "어려움",
    q: "1453년 오스만 제국이 이 도시를 함락시키며 지중해 무역이 봉쇄되었습니다. 이 도시의 이름은?",
    opts: ["로마", "예루살렘", "알렉산드리아", "콘스탄티노플"], a: 3, reward: 300, figure: null,
    explain: "콘스탄티노플(현 이스탄불)의 함락으로 동방 무역 육로가 막혔고, 이는 새로운 바닷길을 찾는 원동력이 되었습니다." },
  { id: "q6", port: "말라카", diff: "보통",
    q: "포르투갈이 인도양 항로의 전략적 요충지 말라카를 정복(1511년)한 지휘관은?",
    opts: ["엔히크 왕자", "아폰수 드 알부케르크", "페드루 알바르스 카브랄", "바르톨로메우 디아스"], a: 1, reward: 250, figure: "albuquerque",
    explain: "알부케르크는 고아와 말라카를 잇따라 점령하여 포르투갈의 인도양 무역 통제권을 확립했습니다." },
  { id: "q7", port: "리스본", diff: "쉬움",
    q: "항해학교를 세워 대항해시대의 기틀을 마련한 포르투갈의 왕자는?",
    opts: ["주앙 2세", "마누엘 1세", "엔히크 왕자", "펠리페 2세"], a: 2, reward: 150, figure: "henry",
    explain: "엔히크 왕자는 사그리쉬에 항해 연구 센터를 세우고 탐험을 적극 후원하여 '항해왕자'라 불립니다." },
  { id: "q8", port: "세비야", diff: "쉬움",
    q: "세계 최초로 세계 일주 범항을 완수한 함대의 원래 지휘관은?",
    opts: ["마젤란", "콜럼버스", "드레이크", "바스코 다 가마"], a: 0, reward: 200, figure: "magellan",
    explain: "페르디난드 마젤란은 스페인 세비야를 출발해 태평양을 횡단했으나 필리핀에서 사망했고, 남은 선원들이 1522년 세비야로 돌아와 일주를 완성했습니다." }
];

const FIGURES = {
  "columbus": { name: "크리스토퍼 콜럼버스", emoji: "🧭", rarity: "⭐ 에픽", quote: "바다를 건널 용기만 있다면, 누구든 새 세상을 발견할 수 있다." },
  "dias": { name: "바르톨로메우 디아스", emoji: "🌊", rarity: "희귀", quote: "이 폭풍의 끝에 인도로 가는 희망이 있다." },
  "dagama": { name: "바스코 다 가마", emoji: "⚓", rarity: "⭐ 에픽", quote: "마침내, 이국의 향기가 내 코끝에 닿았다." },
  "cortes": { name: "에르난 코르테스", emoji: "⚔️", rarity: "희귀", quote: "우리에겐 황금으로만 낫는 마음의 병이 있다." },
  "albuquerque": { name: "아폰수 드 알부케르크", emoji: "🏰", rarity: "희귀", quote: "바다를 지배하는 자가 무역을 지배한다." },
  "henry": { name: "엔히크 항해왕자", emoji: "📜", rarity: "🌟 전설", quote: "별과 나침반, 그리고 지식이야말로 진정한 권력이다." },
  "magellan": { name: "페르디난드 마젤란", emoji: "🌍", rarity: "🌟 전설", quote: "교회는 지구가 평평하다고 하지만, 나는 달빛에 비친 지구의 둥근 그림자를 보았다." }
};

const QUESTS = [
  { id: "q_world", name: "🌍 세계 일주", target: 8, reward: 1000, fame: 50, desc: "모든 항구(8개)를 방문하라" },
  { id: "q_gold", name: "💰 대상인의 길", target: 5000, reward: 500, fame: 30, desc: "금화 5,000G를 모아라" },
  { id: "q_trade", name: "⚖️ 바다의 거상", target: 30, reward: 600, fame: 25, desc: "총 30회의 교역(구매/판매)을 완료하라" },
  { id: "q_quiz", name: "📚 르네상스 지식인", target: 8, reward: 800, fame: 60, desc: "모든 역사 퀴즈(8개)를 정답으로 풀어라" }
];

const RANKS = [
  { fame: 0, title: "견습 선원 ⛵" },
  { fame: 50, title: "항해사 🧭" },
  { fame: 150, title: "선장 ⚓" },
  { fame: 300, title: "함대장 🏴‍☠️" },
  { fame: 500, title: "제독 ⚔️" },
  { fame: 800, title: "대제독 👑" }
];

const EVENTS = [
  { id: "pirate", name: "🏴‍☠️ 바르바리 해적 습격!", img: "images/event_pirate.png", weight: 3, effect: "gold_lose", min: 100, max: 250, desc: "지중해와 대서양을 위협하는 바르바리 해적선이 나타났다! 금화를 빼앗길 위기다!" },
  { id: "storm", name: "🌪️ 희망봉의 대폭풍", img: "images/event_storm.png", weight: 3, effect: "cargo_lose", amount: 1, desc: "거대한 폭풍우에 휩싸였다. 배를 가볍게 하기 위해 적재된 물품 중 일부를 바다에 던져야 한다." },
  { id: "wind", name: "💨 무역풍 발견", img: "images/game_banner.png", weight: 2, effect: "gold_gain", min: 80, max: 150, desc: "유리한 바람을 타고 예상보다 빨리 항구에 도착했다! 여비와 식량 비용이 크게 절감되었다." },
  { id: "ruins", name: "🌟 미지의 유적 발견", img: "images/port_tenochtitlan.png", weight: 1, effect: "gold_gain", min: 200, max: 400, desc: "항해 중 인적이 드문 해안에서 고대 문명의 황금 유물을 발견했다!" }
];

/* ── GAME STATE ─────────────────────────────────── */
let state = {
  in_game: false,
  gold: 1200,
  fame: 0,
  days: 0,
  port: "리스본",
  ship: "카라벨",
  capacity: 10,
  inventory: { "와인":0, "모직물":0, "사탕수수":0, "향신료":0, "도자기":0, "황금":0 },
  avg_price: { "와인":0, "모직물":0, "사탕수수":0, "향신료":0, "도자기":0, "황금":0 },
  equipment: { "망원경": false, "대포": false, "해도": false },
  visited: ["리스본"],
  trade_count: 0,
  quiz_combo: 0,
  solved_quiz: [], // quiz id string array
  figures: [], // figure id string array
  quests: { "q_world": 1, "q_gold": 1200, "q_trade": 0, "q_quiz": 0 },
  quests_done: [],
  achievements: []
};

/* ── DOM ELEMENTS & INITIALIZATION ──────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Sound placeholder
  playBGM();
});

function get(id) { return document.getElementById(id); }

/* ── SYSTEM LOGIC ───────────────────────────────── */
function startNewGame() {
  state = {
    in_game: true, gold: 1200, fame: 0, days: 0, port: "리스본", ship: "카라벨", capacity: 10,
    inventory: { "와인":0, "모직물":0, "사탕수수":0, "향신료":0, "도자기":0, "황금":0 },
    avg_price: { "와인":0, "모직물":0, "사탕수수":0, "향신료":0, "도자기":0, "황금":0 },
    equipment: { "망원경": false, "대포": false, "해도": false }, visited: ["리스본"],
    trade_count: 0, quiz_combo: 0, solved_quiz: [], figures: [],
    quests: { "q_world": 1, "q_gold": 1200, "q_trade": 0, "q_quiz": 0 }, quests_done: [], achievements: []
  };
  get("screen-title").classList.add("hidden");
  get("screen-game").classList.remove("hidden");
  
  createMapMarkers();
  updateHUD();
  updatePortUI();
  logMsg("⚓ 항해 준비가 완료되었다. 위대한 발견의 여정을 시작하라!");
}

function saveGame() {
  localStorage.setItem("ageOfDiscoverySave", JSON.stringify(state));
  showToast("💾 게임이 성공적으로 저장되었습니다!");
}
function loadSavedGame() {
  let saved = localStorage.getItem("ageOfDiscoverySave");
  if(saved) {
    state = JSON.parse(saved);
    if(!state.avg_price) state.avg_price = {};
    state.in_game = true;
    get("screen-title").classList.add("hidden");
    get("screen-game").classList.remove("hidden");
    createMapMarkers();
    updateHUD();
    updatePortUI();
    logMsg("📂 지난 여정을 이어서 시작합니다.");
    showToast("불러오기 완료!");
  } else {
    alert("저장된 게임이 없습니다.");
  }
}

function playBGM() {
  // HTML5 audio placeholder
}

function logMsg(msg) {
  let ticker = get("log-text");
  ticker.textContent = msg;
  ticker.style.animation = 'none';
  ticker.offsetHeight; // trigger reflow
  ticker.style.animation = 'ticker 18s linear infinite';
}
function showToast(msg) {
  let t = get("toast");
  get("toast-inner").innerHTML = msg;
  t.classList.remove("hidden");
  t.style.animation = 'none';
  t.offsetHeight;
  t.style.animation = 'toastIn 0.4s cubic-bezier(0.2,0.8,0.4,1)';
  setTimeout(() => t.classList.add("hidden"), 3000);
}

// Particle effect
function spawnGoldParticles(x, y) {
  const host = get("particles-host");
  for(let i=0; i<8; i++) {
    let p = document.createElement("div");
    p.className = "gold-particle";
    p.textContent = "💰";
    p.style.left = x + "px"; p.style.top = y + "px";
    p.style.setProperty("--dx", (Math.random()*60-30)+"px");
    host.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

function openModal(id) { 
  if(id==='modal-collection') renderCollection();
  if(id==='modal-quests') renderQuests();
  if(id==='modal-achievements') renderAchievements();
  if(id==='modal-atlas') renderAtlas();
  get(id).classList.remove('hidden'); 
}
function closeModal(id) { get(id).classList.add('hidden'); }

// Tab switching
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
  btn.classList.add('active');
  get('tab-' + tabId).classList.remove('hidden');
}

/* ── HUD & MAP ──────────────────────────────────── */
function getRankInfo(fame) {
  let current = RANKS[0]; let next = RANKS[1];
  for(let i=0; i<RANKS.length; i++) {
    if(fame >= RANKS[i].fame) {
      current = RANKS[i];
      next = i < RANKS.length-1 ? RANKS[i+1] : null;
    }
  }
  return { current, next };
}

function updateHUD() {
  get("hud-gold").textContent = state.gold + "G";
  get("hud-fame").textContent = state.fame;
  get("hud-location").textContent = state.port;
  let totalCargo = Object.values(state.inventory).reduce((a,b)=>a+b, 0);
  get("hud-ship").textContent = `${state.ship} (${totalCargo}/${state.capacity})`;
  get("hud-days").textContent = state.days + "일";

  let rankInfo = getRankInfo(state.fame);
  get("hud-rank-badge").textContent = rankInfo.current.title;
  
  if(rankInfo.next) {
    let range = rankInfo.next.fame - rankInfo.current.fame;
    let prog = state.fame - rankInfo.current.fame;
    let pct = Math.min(100, Math.max(0, (prog/range)*100));
    get("fame-bar-fill").style.width = pct + "%";
    get("fame-bar-label").textContent = `${state.fame} / ${rankInfo.next.fame}`;
  } else {
    get("fame-bar-fill").style.width = "100%";
    get("fame-bar-label").textContent = "최고 등급 달성!";
  }

  // Quests check
  state.quests.q_gold = Math.max(state.quests.q_gold, state.gold);
  checkQuests();
}

function createMapMarkers() {
  let layer = get("port-markers-layer");
  layer.innerHTML = "";
  
  for(let p in PORTS) {
    let port = PORTS[p];
    
    let isCurrent = (state.port === p);
    let isVisited = state.visited.includes(p);
    
    let m = document.createElement("div");
    m.className = "port-marker";
    m.style.left = port.x + "%"; m.style.top = port.y + "%";
    m.id = "marker-" + p;
    
    let dotClass = isCurrent ? "current" : (isVisited ? "visited" : "unvisited");
    m.innerHTML = `
      <div class="port-marker-emoji">${port.emoji}</div>
      <div class="port-marker-dot ${dotClass}"></div>
      <div class="port-marker-label">${p}</div>
    `;
    
    m.onclick = () => {
      // Map click travel? Or just show info? Just show in Travel tab
      switchTab('travel', document.querySelector('[data-tab="travel"]'));
    };
    layer.appendChild(m);
  }

  // Move ship token
  let curPort = PORTS[state.port];
  let ship = get("ship-token");
  ship.style.left = curPort.x + "%";
  ship.style.top = (curPort.y - 2.5) + "%";
}

/* ── PORT UI RENDER ─────────────────────────────── */
function updatePortUI() {
  let pName = state.port;
  let pData = PORTS[pName];

  // Map updates
  createMapMarkers();

  // Header
  get("port-img-bg").style.backgroundImage = `url(${pData.img})`;
  get("port-header-emoji").textContent = pData.emoji;
  get("port-header-name").textContent = pName;
  get("port-header-desc").textContent = pData.desc;

  // Cargo bar
  let totalCargo = Object.values(state.inventory).reduce((a,b)=>a+b, 0);
  get("cargo-count").textContent = totalCargo;
  get("cargo-max").textContent = state.capacity;
  get("cargo-bar-visual").style.setProperty('--cargo-pct', (totalCargo/state.capacity*100) + "%");

  // Trade Store
  let mBuy = get("buy-list"); let mSell = get("sell-list");
  mBuy.innerHTML = ""; mSell.innerHTML = "";
  
  let buyCostMod = state.equipment["해도"] ? 0.9 : 1.0;

  if(Object.keys(pData.buy).length===0) mBuy.innerHTML = "<div class='trade-btn'>보급만 가능</div>";
  for(let item in pData.buy) {
    let basePrice = pData.buy[item];
    let actualPrice = Math.floor(basePrice * buyCostMod);
    mBuy.innerHTML += `
      <button class="trade-btn buy-btn" onclick="buyItem('${item}', ${actualPrice}, event)">
        <span class="item-name">${item}</span> <span class="item-price">-${actualPrice}G</span>
      </button>
    `;
  }
  for(let item in pData.sell) {
    let price = pData.sell[item];
    let inStock = state.inventory[item] || 0;
    let avg = (state.avg_price && state.avg_price[item]) ? state.avg_price[item] : 0;
    let profitStr = "";
    if (inStock > 0 && avg > 0) {
      let profit = price - avg;
      let color = profit > 0 ? "var(--green)" : (profit < 0 ? "var(--red)" : "var(--text-dim)");
      let sign = profit > 0 ? "+" : "";
      profitStr = ` | 매입: ${avg}G <span style="color:${color}; font-weight:bold;">(${sign}${profit}G)</span>`;
    }
    
    mSell.innerHTML += `
      <button class="trade-btn sell-btn" onclick="sellItem('${item}', ${price}, event)">
        <span class="item-name">${item}</span> <span class="item-price">+${price}G</span>
        <br><span class="item-stock">보유: ${inStock}개${profitStr}</span>
      </button>
    `;
  }

  // Inventory Grid
  let invGrid = get("inventory-grid");
  invGrid.innerHTML = "";
  let itemIcons = {"와인":"🍷","모직물":"🧶","사탕수수":"🎋","향신료":"🌶️","도자기":"🏺","황금":"👑"};
  for(let item in state.inventory) {
    let amt = state.inventory[item];
    invGrid.innerHTML += `
      <div class="inv-item ${amt>0?'has-stock':''}">
        <div class="inv-item-emoji">${itemIcons[item]}</div>
        <div class="inv-item-name">${item}</div>
        <div class="inv-item-count">${amt}</div>
      </div>
    `;
  }

  // Travel Tab
  let dList = get("destination-list");
  dList.innerHTML = "";
  let travelMulti = state.equipment["해도"] ? 0.8 : 1.0;
  for(let d in PORTS) {
    if(d === pName) continue;
    let costObj = TRAVEL_COSTS[`${pName}-${d}`] || 150;
    let travelCost = Math.floor(costObj * travelMulti);
    let vis = state.visited.includes(d) ? "<span class='dest-visited-badge'>✅ 방문함</span>" : "";
    
    dList.innerHTML += `
      <button class="dest-btn" onclick="sailTo('${d}', ${travelCost})">
        <span class="dest-emoji">${PORTS[d].emoji}</span>
        <div class="dest-info">
          <div class="dest-name">${d}</div>
          <div class="dest-cost">항해 비용: ${travelCost}G</div>
        </div>
        ${vis}
      </button>
    `;
  }

  // History Tab
  get("history-text").innerHTML = `<h3>📖 ${pName} 역사</h3>${pData.history}`;
  let relatedQuiz = QUIZZES.find(q => q.port === pName);
  let hTease = get("history-quiz-tease");
  hTease.innerHTML = "";
  if(relatedQuiz) {
    if(!state.solved_quiz.includes(relatedQuiz.id)) {
      hTease.innerHTML = `<div class="quiz-tease">
        <div class="tease-title">📜 이 항구에 지식의 시련이 있습니다!</div>
        정답을 맞히면 막대한 금화와 명성, 인물 카드를 얻습니다. 
        <button class="shop-btn available" style="margin-top:5px" onclick="triggerQuiz('${relatedQuiz.id}')">퀴즈 도전하기</button>
      </div>`;
    } else {
      hTease.innerHTML = `<div class="quiz-tease" style="border-color:var(--green)">
        <div class="tease-title" style="color:var(--green)">✅ 지식의 시련 통과</div>
        당신은 이 항구의 역사를 이미 이해했습니다. (문제: ${relatedQuiz.q})
      </div>`;
    }
  }

  // Shop Tab
  let sShop = get("ship-shop");
  let curShip = SHIPS[state.ship];
  if(curShip.next) {
    let nx = SHIPS[curShip.next];
    sShop.innerHTML = `
      <div class="shop-section">
        <h4>조선소</h4>
        <div class="shop-item">
          <div class="shop-item-icon">⛵</div>
          <div class="shop-item-info">
            <div class="shop-item-name">${nx.name} 업그레이드</div>
            <div class="shop-item-desc">${nx.desc} / 적재량 ${nx.capacity}칸</div>
            <div class="shop-item-cost">${nx.cost}G</div>
          </div>
          <button class="shop-btn ${state.gold>=nx.cost ? 'available' : ''}" onclick="upgradeShip('${curShip.next}')">${nx.cost}G 구매</button>
        </div>
      </div>
    `;
  } else {
    sShop.innerHTML = `<div class="shop-section"><h4>조선소</h4><p style="color:var(--green);font-size:0.8rem">✅ 최고 등급 선박(갈레온)을 보유 중입니다.</p></div>`;
  }

  let eShop = get("equipment-shop");
  let eHTML = `<div class="shop-section"><h4>시장 / 특수 장비</h4>`;
  for(let eq in EQUIPMENTS) {
    let e = EQUIPMENTS[eq];
    let isOwned = state.equipment[eq];
    let btnHTML = isOwned 
      ? `<button class="shop-btn owned">보유중</button>`
      : `<button class="shop-btn ${state.gold>=e.cost ? 'available' : ''}" onclick="buyEq('${eq}')">${e.cost}G 구매</button>`;
    eHTML += `
      <div class="shop-item">
        <div class="shop-item-icon">${e.emoji}</div>
        <div class="shop-item-info">
          <div class="shop-item-name">${e.name}</div>
          <div class="shop-item-desc">${e.desc}</div>
        </div>
        ${btnHTML}
      </div>
    `;
  }
  eHTML += `</div>`;
  eShop.innerHTML = eHTML;
}

/* ── ACTION LOGIC ───────────────────────────────── */
function buyItem(item, price, e) {
  let totalCargo = Object.values(state.inventory).reduce((a,b)=>a+b, 0);
  if(state.gold < price) { showToast("❌ 금화가 부족합니다."); get(e.target).classList.add('shake'); setTimeout(()=>get(e.target).classList.remove('shake'),400); return; }
  if(totalCargo >= state.capacity) { showToast("❌ 적재 공간이 부족합니다! 선박을 업그레이드하세요."); return; }
  
  if(!state.avg_price) state.avg_price = {};
  let currentStock = state.inventory[item] || 0;
  let currentAvg = state.avg_price[item] || 0;
  state.avg_price[item] = Math.floor(((currentAvg * currentStock) + price) / (currentStock + 1));

  state.gold -= price;
  state.inventory[item]++;
  state.trade_count++;
  state.quests.q_trade++;
  spawnGoldParticles(e.clientX, e.clientY);
  logMsg(`🛒 ${item} 물품을 ${price}G에 구매했습니다.`);
  updateState();
}

function sellItem(item, price, e) {
  if(!state.inventory[item] || state.inventory[item] <= 0) { showToast(`❌ 보유한 ${item}이 없습니다.`); return; }
  
  state.gold += price;
  state.inventory[item]--;
  if (state.inventory[item] <= 0) {
    if(!state.avg_price) state.avg_price = {};
    state.avg_price[item] = 0;
  }
  state.trade_count++;
  state.quests.q_trade++;
  state.fame += 1;
  spawnGoldParticles(e.clientX, e.clientY);
  logMsg(`💵 ${item} 물품을 ${price}G에 판매했습니다.`);
  updateState();
}

function upgradeShip(nextShip) {
  let info = SHIPS[nextShip];
  if(state.gold < info.cost) { showToast("❌ 금화가 부족합니다."); return; }
  state.gold -= info.cost;
  state.ship = nextShip;
  state.capacity = info.capacity;
  state.fame += 20;
  showToast(`🎉 ${nextShip}로 업그레이드 완료!`);
  logMsg(`🛠️ 조선소에서 선박을 ${nextShip}(으)로 강화했습니다!`);
  updateState();
}

function buyEq(eq) {
  let info = EQUIPMENTS[eq];
  if(state.gold < info.cost) { showToast("❌ 금화가 부족합니다."); return; }
  state.gold -= info.cost;
  state.equipment[eq] = true;
  state.fame += 10;
  showToast(`✅ ${info.name} 구매 완료!`);
  logMsg(`🔧 시장에서 ${info.name} 장비를 구했습니다.`);
  updateState();
}

function updateState() {
  updateHUD();
  updatePortUI();
}

/* ── SAILING & EVENTS ───────────────────────────── */
function sailTo(dest, cost) {
  if(state.gold < cost) { showToast("❌ 항해 자금이 부족합니다."); return; }
  
  // Transition logic
  state.gold -= cost;
  state.port = dest;
  state.days += Math.floor(Math.random() * 15) + 10;
  
  if(!state.visited.includes(dest)) {
    state.visited.push(dest);
    state.quests.q_world++;
    state.fame += 5;
  }
  
  logMsg(`⚓ ${dest} 항구를 향해 돛을 올렸습니다. (-${cost}G)`);
  updateHUD();
  createMapMarkers(); // visually move ship

  // Event trigger chance = 40%
  let eventTriggered = false;
  if(Math.random() < 0.4) {
    let evt = rollEvent();
    if(evt) {
      setTimeout(() => triggerEvent(evt), 1200); // Wait for ship animation
      eventTriggered = true;
    }
  }

  // Quiz trigger
  let autoQuiz = QUIZZES.find(q => q.port === dest);
  if(!eventTriggered && autoQuiz && !state.solved_quiz.includes(autoQuiz.id)) {
    setTimeout(() => {
      showToast(`📍 ${dest}에 도착했습니다. 역사적 사건의 현장입니다!`);
      triggerQuiz(autoQuiz.id);
    }, 1500);
  } else if (!eventTriggered) {
    setTimeout(() => updatePortUI(), 1000); // Standard update
  }
}

function rollEvent() {
  let pool = EVENTS.map(e => e); // copy
  // Pirate protection check
  if(state.equipment["대포"]) {
    pool = pool.filter(e => e.id !== "pirate");
  }
  if(pool.length===0) return null;
  // Weighted random
  let totalW = pool.reduce((a, b) => a + b.weight, 0);
  let r = Math.random() * totalW;
  let sum = 0;
  for(let e of pool) {
    sum += e.weight;
    if(r <= sum) return e;
  }
  return pool[0];
}

let activeEvent = null;
function triggerEvent(evt) {
  activeEvent = evt;
  get("event-img").src = evt.img;
  get("event-name-display").textContent = evt.name;
  get("event-desc-display").textContent = evt.desc;
  
  let btnArea = get("event-btn-area");
  btnArea.innerHTML = "";
  get("event-quiz-escape").classList.add("hidden");

  let eMod = state.equipment["망원경"] ? 1.1 : 1.0; // 망원경 있으면 긍정효과 10% 증가

  if(evt.effect === "gold_lose") {
    let loss = Math.floor((Math.random()*(evt.max-evt.min) + evt.min));
    btnArea.innerHTML = `<button class="event-btn event-btn-primary" onclick="resolveEventGold(-${loss})">피해 감수 (-${loss}G)</button>`;
    
    // 해적일 경우 전투 퀴즈 찬스!
    if(evt.id === "pirate") {
      let eqList = QUIZZES; 
      let randomQ = eqList[Math.floor(Math.random()*eqList.length)];
      setupEventQuiz(randomQ, loss);
    }

  } else if(evt.effect === "gold_gain") {
    let gain = Math.floor((Math.random()*(evt.max-evt.min) + evt.min) * eMod);
    btnArea.innerHTML = `<button class="event-btn event-btn-primary" onclick="resolveEventGold(${gain})">확인 (+${gain}G)</button>`;

  } else if(evt.effect === "cargo_lose") {
    let items = Object.keys(state.inventory).filter(k => state.inventory[k] > 0);
    if(items.length > 0) {
      let loseItem = items[Math.floor(Math.random()*items.length)];
      btnArea.innerHTML = `<button class="event-btn event-btn-primary" onclick="resolveEventCargo('${loseItem}')">${loseItem} 1개 버리기</button>`;
    } else {
      get("event-desc-display").textContent += " 다행히 내다 버릴 화물이 없습니다!";
      btnArea.innerHTML = `<button class="event-btn event-btn-secondary" onclick="closeModal('modal-event'); updatePortUI();">안도하며 넘어가기</button>`;
    }
  }

  openModal("modal-event");
}

function resolveEventGold(amount) {
  state.gold += amount;
  if(state.gold < 0) state.gold = 0;
  if(amount > 0) logMsg(`🌟 이벤트로 ${amount}G를 획득했습니다!`);
  else logMsg(`💔 이벤트로 ${-amount}G를 잃었습니다.`);
  closeModal("modal-event");
  updateState();
  
  // check post-event quiz
  checkPostEventQuiz();
}

function resolveEventCargo(item) {
  state.inventory[item]--;
  logMsg(`🌪️ 거센 파도에 ${item} 1개가 바다로 쓸려갔습니다.`);
  closeModal("modal-event");
  updateState();
  checkPostEventQuiz();
}

function checkPostEventQuiz() {
  let autoQuiz = QUIZZES.find(q => q.port === state.port);
  if(autoQuiz && !state.solved_quiz.includes(autoQuiz.id)) {
    setTimeout(() => {
      showToast(`📍 항구에 무사히 닻을 내렸습니다.`);
      triggerQuiz(autoQuiz.id);
    }, 800);
  }
}

function setupEventQuiz(qObj, potentialLoss) {
  let eArea = get("event-quiz-escape");
  eArea.classList.remove("hidden");
  get("eq-question").textContent = `⚔️ 해적들이 전투 퀴즈를 걸어왔다! 맞히면 피해가 반감된다: ${qObj.q}`;
  
  let oArea = get("eq-options");
  oArea.innerHTML = "";
  qObj.opts.forEach((opt, idx) => {
    let b = document.createElement("button");
    b.className = "eq-opt-btn";
    b.textContent = opt;
    b.onclick = () => {
      let isCorrect = (idx === qObj.a);
      if(isCorrect) {
        showToast("⚔️ 퀴즈 승리! 해적들의 공격을 간신히 막아냈다!");
        resolveEventGold(-Math.floor(potentialLoss/2));
      } else {
        showToast("❌ 퀴즈 패배... 무방비로 약탈당했다.");
        resolveEventGold(-potentialLoss);
      }
    };
    oArea.appendChild(b);
  });
}

/* ── QUIZ LOGIC ─────────────────────────────────── */
let activeQuiz = null;
function triggerQuiz(quizId) {
  activeQuiz = QUIZZES.find(q => q.id === quizId);
  if(!activeQuiz) return;

  get("quiz-port-banner").style.backgroundImage = `url(${PORTS[activeQuiz.port].img})`;
  get("quiz-port-label").textContent = `${activeQuiz.port} 역사 퀴즈`;
  get("quiz-diff-badge").textContent = `난이도: ${activeQuiz.diff}`;
  
  let comboBonus = state.quiz_combo * 0.2;
  get("quiz-combo-badge").textContent = `🔥 ${state.quiz_combo} 콤보 적용 (보상 +${Math.round(comboBonus*100)}%)`;
  get("quiz-combo-badge").style.display = state.quiz_combo > 0 ? "block" : "none";
  
  get("quiz-question-text").textContent = activeQuiz.q;
  let finalReward = Math.floor(activeQuiz.reward * (1 + comboBonus));
  get("quiz-reward-info").textContent = `정답 시 보상: 💰 ${finalReward}G  |  틀릴 경우 콤보 초기화`;
  
  // Timer FX initialization
  get("quiz-timer-fill").style.transition = 'none';
  get("quiz-timer-fill").style.width = '100%';
  get("quiz-timer-fill").style.background = 'linear-gradient(to right, var(--green), var(--gold))';
  
  let oArea = get("quiz-options-grid");
  oArea.innerHTML = "";
  activeQuiz.opts.forEach((opt, idx) => {
    let b = document.createElement("button");
    b.className = "quiz-option-btn";
    b.textContent = opt;
    b.onclick = () => handleQuizAttempt(idx, b);
    oArea.appendChild(b);
  });

  get("quiz-result").classList.add("hidden");
  get("quiz-figure-unlock").classList.add("hidden");
  get("quiz-hint-text").classList.add("hidden");
  get("quiz-hint-btn").disabled = false;
  
  openModal("modal-quiz");

  // Timer run
  setTimeout(() => {
    get("quiz-timer-fill").style.transition = 'width 15s linear, background 15s linear';
    get("quiz-timer-fill").style.width = '0%';
    get("quiz-timer-fill").style.background = 'var(--red)';
  }, 100);
}

function handleQuizAttempt(idx, btnClicked) {
  // Disable all
  document.querySelectorAll(".quiz-option-btn").forEach(b => b.disabled = true);
  get("quiz-timer-fill").style.transition = 'none';

  let isCorrect = (idx === activeQuiz.a);
  let resArea = get("quiz-result");
  resArea.classList.remove("hidden");
  get("quiz-explain-text").innerHTML = `<b>해설:</b> ${activeQuiz.explain}`;

  if(isCorrect) {
    btnClicked.classList.add("correct");
    get("quiz-result-icon").textContent = "✅ 정답이다!";
    get("quiz-result").style.borderColor = "var(--green)";
    get("quiz-result").style.background = "rgba(39,174,96,0.1)";

    let finalReward = Math.floor(activeQuiz.reward * (1 + state.quiz_combo * 0.2));
    state.gold += finalReward;
    state.fame += 10;
    state.quiz_combo++;
    state.quests.q_quiz++;
    state.solved_quiz.push(activeQuiz.id);
    
    logMsg(`📚 퀴즈 정답! 지식의 힘으로 ${finalReward}G 획득 (🔥${state.quiz_combo} 연속 정답)`);
    spawnGoldParticles(window.innerWidth/2, window.innerHeight/2);

    // Figure unlock logic
    if(activeQuiz.figure && !state.figures.includes(activeQuiz.figure)) {
      state.figures.push(activeQuiz.figure);
      let figObj = FIGURES[activeQuiz.figure];
      get("quiz-figure-unlock").classList.remove("hidden");
      get("quiz-figure-unlock").innerHTML = `🎴 역사 인물 발견! <b>${figObj.name}</b> 카드를 방금 획득했다!`;
      
      // Delay showing grand figure pop-up
      btnClicked.dataset.unlockFigure = activeQuiz.figure;
    }

  } else {
    btnClicked.classList.add("wrong");
    // highlight correct
    document.querySelectorAll(".quiz-option-btn")[activeQuiz.a].classList.add("correct");
    
    get("quiz-result-icon").textContent = "❌ 오답이다...";
    get("quiz-result").style.borderColor = "var(--red)";
    get("quiz-result").style.background = "rgba(231,76,60,0.1)";
    state.quiz_combo = 0;
    logMsg(`📚 역사 퀴즈에서 오답을 선택했다... 더 많은 지식이 필요해. (콤보 초기화)`);
  }

  updateHUD();
}

function useHint() {
  if(state.gold < 50) { showToast("❌ 금화가 부족합니다."); return; }
  state.gold -= 50;
  get("quiz-hint-btn").disabled = true;
  get("quiz-hint-text").classList.remove("hidden");
  get("quiz-hint-text").textContent = `💡 첫 글자는 '${activeQuiz.opts[activeQuiz.a][0]}' 입니다!`;
  updateHUD();
}

function closeQuiz() {
  closeModal("modal-quiz");
  
  // Did we unlock a figure? Check button attribute
  let clickedBtn = document.querySelector(".quiz-option-btn.correct");
  if(clickedBtn && clickedBtn.dataset.unlockFigure) {
    showFigureUnlockParams(clickedBtn.dataset.unlockFigure);
  } else {
    updatePortUI(); // refresh history tab
  }
}

function showFigureUnlockParams(figId) {
  let fig = FIGURES[figId];
  get("figure-unlock-emoji").textContent = fig.emoji;
  get("figure-unlock-name").textContent = fig.name;
  get("figure-unlock-rarity").textContent = fig.rarity;
  get("figure-unlock-quote").textContent = `"${fig.quote}"`;
  
  openModal("modal-figure-unlock");
  updatePortUI();
}

/* ── MODALS RENDER ──────────────────────────────── */
function renderCollection() {
  let grid = get("collection-grid");
  grid.innerHTML = "";
  let unlCount = state.figures.length;
  let totCount = Object.keys(FIGURES).length;
  get("collection-progress-text").textContent = `현재 수집한 카드: ${unlCount} / ${totCount}`;
  
  for(let fid in FIGURES) {
    let f = FIGURES[fid];
    let isUnlocked = state.figures.includes(fid);
    
    let cardHTML = isUnlocked ? `
      <div class="collect-card">
        <div class="card-emoji">${f.emoji}</div>
        <div class="card-name">${f.name}</div>
        <div class="card-rarity">${f.rarity}</div>
        <div class="card-quote">"${f.quote.substring(0,25)}..."</div>
      </div>
    ` : `
      <div class="collect-card locked">
        <div class="card-emoji">❓</div>
        <div class="card-name">미지의 인물</div>
        <div class="card-meta">관련 퀴즈를 맞춰 해금하세요</div>
      </div>
    `;
    grid.innerHTML += cardHTML;
  }
}

function renderAtlas() {
  let list = get("atlas-list");
  list.innerHTML = "";
  
  for(let p in PORTS) {
    let pObj = PORTS[p];
    if(state.visited.includes(p)) {
      list.innerHTML += `
        <div class="atlas-entry">
          <div class="atlas-entry-header">
            <span class="atlas-entry-emoji">${pObj.emoji}</span>
            <span class="atlas-entry-name">${pObj.name} 항구</span>
          </div>
          <div class="atlas-entry-body"><br>${pObj.history}</div>
        </div>
      `;
    } else {
      list.innerHTML += `
        <div class="atlas-entry atlas-locked">
          <div class="atlas-entry-header">
            <span class="atlas-entry-emoji">🔒</span>
            <span class="atlas-entry-name">미방문 항구</span>
          </div>
        </div>
      `;
    }
  }
}

function checkQuests() {
  for(let q of QUESTS) {
    if(state.quests_done.includes(q.id)) continue;
    
    let currProg = state.quests[q.id];
    if(currProg >= q.target) {
      // Quest complete
      state.quests_done.push(q.id);
      state.gold += q.reward;
      state.fame += q.fame;
      showToast(`📜 퀘스트 완료: [${q.name}]! 보상 ${q.reward}G 및 명성 획득!`);
      logMsg(`📜 새로운 시대의 위업을 달성했습니다: ${q.name}`);
    }
  }
}

function renderQuests() {
  let list = get("quests-list");
  list.innerHTML = "";
  
  for(let q of QUESTS) {
    let isDone = state.quests_done.includes(q.id);
    let prog = Math.min(state.quests[q.id], q.target);
    let pct = (prog / q.target) * 100;
    
    let wrapCls = isDone ? "quest-item done" : "quest-item";
    let statusText = isDone ? "✅ 완료됨" : `${prog} / ${q.target}`;
    let statusCls = isDone ? "quest-status-done" : "quest-status-prog";
    
    list.innerHTML += `
      <div class="${wrapCls}">
        <div class="quest-header">
          <span class="quest-name">${q.name}</span>
          <span class="${statusCls}">${statusText}</span>
        </div>
        <div class="quest-desc">${q.desc}</div>
        <div class="quest-progress-bar"><div class="quest-progress-fill" style="width:${pct}%"></div></div>
        <div class="quest-reward">보상: 💰 ${q.reward}G | ⭐ 명성 ${q.fame}</div>
      </div>
    `;
  }
}

function renderAchievements() {
  // basic achievement logic on render
  if(state.gold >= 10000 && !state.achievements.includes("황금 제국")) state.achievements.push("황금 제국");
  if(state.fame >= 800 && !state.achievements.includes("전설의 대제독")) state.achievements.push("전설의 대제독");
  if(state.trade_count >= 50 && !state.achievements.includes("무역의 신")) state.achievements.push("무역의 신");
  if(state.ship === "갈레온" && !state.achievements.includes("무적함대")) state.achievements.push("무적함대");
  
  const ACH_LIST = [
    { id: "황금 제국", emoji: "👑", desc: "1만 금화 이상 자산 축적" },
    { id: "무역의 신", emoji: "⚖️", desc: "누적 교역 50회 달성" },
    { id: "무적함대", emoji: "⛵", desc: "갈레온 선박 획득" },
    { id: "전설의 대제독", emoji: "⚔️", desc: "최고 명성치(800) 달성" }
  ];
  
  let grid = get("achievements-grid");
  grid.innerHTML = "";
  
  for(let ach of ACH_LIST) {
    let earned = state.achievements.includes(ach.id);
    let cls = earned ? "ach-card earned" : "ach-card locked";
    
    grid.innerHTML += `
      <div class="${cls}">
        <div class="ach-emoji">${ach.emoji}</div>
        <div class="ach-info">
          <div class="ach-name">${ach.id} ${earned?'✅':''}</div>
          <div class="ach-desc">${ach.desc}</div>
        </div>
      </div>
    `;
  }
}
