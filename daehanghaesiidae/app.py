import streamlit as st
import random

st.set_page_config(page_title="대항해시대", layout="wide", page_icon="⚓")

# ── CSS ──────────────────────────────────────────────────
st.markdown("""
<style>
body { background-color: #0d1b2a; }
.stApp { background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%); color: #e0e0e0; }
h1, h2, h3 { color: #f4d03f !important; }
.stButton > button {
    background: linear-gradient(135deg, #1a4a6e, #2471a3);
    color: #fff; border: 1px solid #2e86c1; border-radius: 8px;
    transition: all 0.3s;
}
.stButton > button:hover { background: linear-gradient(135deg, #2471a3, #1a4a6e); transform: scale(1.03); }
.rank-badge { font-size: 1.4em; font-weight: bold; color: #f4d03f; }
div[data-testid="metric-container"] { background: rgba(255,255,255,0.05); border-radius: 10px; padding: 8px; }
</style>
""", unsafe_allow_html=True)

# ── 초기화 ───────────────────────────────────────────────
def init_game():
    if 'initialized' in st.session_state:
        return

    st.session_state.initialized = True

    st.session_state.team = {
        "name": "덕수함대",
        "gold": 1200,
        "fame": 0,
        "location": "리스본",
        "ship": "카라벨",   # 카라벨 / 카락 / 갈레온
        "capacity": 10,     # 최대 적재량
        "inventory": {"와인": 0, "모직물": 0, "사탕수수": 0, "향신료": 0, "도자기": 0, "황금": 0},
        "days": 0,
        "trade_count": 0,
        "total_earned": 0,
        "visited": set(["리스본"]),
        "combo": 0,
    }

    st.session_state.equipment = {"망원경": False, "대포": False, "해도": False}

    st.session_state.ports = {
        "리스본": {
            "desc": "포르투갈 왕국의 수도. 엔히크 왕자의 항해학교에서 시작된 대항해시대의 심장부.",
            "history": """**리스본(Lisbon)**은 15~16세기 대항해시대의 중심지였습니다.
포르투갈의 엔히크 왕자(항해왕자)는 사그리쉬에 항해학교를 세워 천문학·지리학·조선술을 체계화했고,
이곳에서 출발한 탐험가들이 아프리카 해안을 따라 인도에 이르는 항로를 개척했습니다.
1498년 바스코 다 가마가 인도 항로를 개척한 후 리스본은 세계 무역의 중심지가 되었습니다.""",
            "buy": {"와인": 20, "모직물": 40},
            "sell": {"사탕수수": 160, "향신료": 320, "도자기": 280},
            "emoji": "🏛️",
        },
        "세비야": {
            "desc": "에스파냐 무역의 관문. 콜럼버스가 신대륙으로 출항한 항구.",
            "history": """**세비야(Sevilla)**는 스페인 식민지 무역의 독점 허가를 받은 도시입니다.
콜럼버스(크리스토퍼 콜럼버스)는 1492년 이곳을 출발해 대서양을 횡단, 아메리카에 도착했습니다.
스페인 왕실은 '카사 데 콘트라타시온(인디아스 무역소)'을 설치해 모든 신대륙 무역을 세비야로 집중시켰고,
아메리카에서 쏟아지는 은(銀)으로 16세기 유럽 최고의 부유 도시가 되었습니다.""",
            "buy": {"와인": 18, "모직물": 45},
            "sell": {"사탕수수": 170, "황금": 500, "향신료": 295},
            "emoji": "⛪",
        },
        "살바도르": {
            "desc": "브라질의 첫 수도. 대서양 노예 무역과 사탕수수 플랜테이션의 중심지.",
            "history": """**살바도르(Salvador)**는 1549년 포르투갈이 건설한 브라질 최초의 수도입니다.
아메리카 원주민들이 '인디오'로 불린 것은 콜럼버스가 이 땅을 인도라고 착각했기 때문입니다.
브라질에는 광대한 사탕수수 농장(플랜테이션)이 세워졌고, 노동력 부족을 메우기 위해
아프리카에서 수백만 명의 노예가 강제로 끌려왔습니다. 이것이 대서양 삼각 무역입니다.""",
            "buy": {"사탕수수": 28, "황금": 120},
            "sell": {"와인": 110, "모직물": 130},
            "emoji": "🌴",
        },
        "희망봉": {
            "desc": "아프리카 최남단. 인도양으로 가는 관문을 열어준 절벽.",
            "history": """**희망봉(Cape of Good Hope)**은 포르투갈 탐험가 바르톨로메우 디아스가
1488년 처음 발견했습니다. 처음에는 '폭풍의 곶'이라 불렸으나, 이 곳을 돌면 인도에 갈 수 있다는
희망에서 '희망봉'으로 개명되었습니다. 이후 바스코 다 가마가 1497~1498년에 이 항로를 따라
인도 캘리컷에 도달함으로써 오스만 제국을 거치지 않는 동방 무역로가 개척되었습니다.""",
            "buy": {},
            "sell": {"와인": 90, "모직물": 110},
            "emoji": "🌊",
        },
        "캘리컷": {
            "desc": "인도 남서부의 향신료 도시. 후추와 계피가 넘쳐나는 무역항.",
            "history": """**캘리컷(Calicut, 현재의 코지코드)**은 인도 케랄라 주의 항구 도시입니다.
1498년 바스코 다 가마가 도착함으로써 유럽-인도 직항 무역로가 열렸습니다. 
당시 향신료(후추·계피·정향)는 유럽에서 금과 같은 가치를 지녔는데,
이는 냉장 시설이 없던 유럽에서 육류 보존과 약재로 절실히 필요했기 때문입니다.
베네치아와 오스만이 독점하던 향신료 무역이 포르투갈로 넘어가는 역사적 전환점이 되었습니다.""",
            "buy": {"향신료": 55, "도자기": 80},
            "sell": {"와인": 160, "모직물": 210},
            "emoji": "🌶️",
        },
        "말라카": {
            "desc": "동남아시아의 해협 도시. 동서양 무역의 교차로.",
            "history": """**말라카(Malacca)**는 말레이 반도 남단에 위치한 전략적 항구입니다.
15세기부터 동남아시아 최대의 무역항으로, 중국·인도·아랍·유럽 상인들이 모이는 곳이었습니다.
1511년 포르투갈의 아폰수 드 알부케르크가 이 도시를 정복함으로써
포르투갈은 인도양과 태평양을 잇는 향신료 무역로를 완전히 장악하게 됩니다.
중국 도자기, 인도 면직물, 동남아 향신료가 이곳에서 거래되었습니다.""",
            "buy": {"향신료": 45, "도자기": 60},
            "sell": {"모직물": 180, "와인": 140},
            "emoji": "🏯",
        },
        "테노치티틀란": {
            "desc": "아즈텍 제국의 황금 수도. 에르난 코르테스의 정복으로 멸망한 도시.",
            "history": """**테노치티틀란(Tenochtitlan)**은 아즈텍(멕시카) 제국의 수도로,
현재의 멕시코시티 자리에 있었습니다. 인구 20만 이상의 당시 세계 최대 도시 중 하나였습니다.
1519년 에르난 코르테스가 이끄는 스페인 군대가 도착, 아즈텍 황제 목테수마 2세와 협상 끝에
결국 1521년 도시를 완전 정복했습니다. 천연두 등 유럽의 전염병이 원주민을 95% 이상 사망시킨 것이
정복의 결정적 원인 중 하나였습니다. 막대한 황금이 스페인으로 유입되었습니다.""",
            "buy": {"황금": 80},
            "sell": {"모직물": 200, "와인": 180},
            "emoji": "🏺",
        },
        "베네치아": {
            "desc": "지중해 무역의 왕자. 오스만 제국에 막혀 새 항로를 열게 한 도시.",
            "history": """**베네치아(Venice)**는 중세 지중해 무역을 독점했던 이탈리아의 도시국가입니다.
동방 향신료를 육로(실크로드)와 지중해를 통해 유럽 전역에 공급하며 막대한 부를 쌓았습니다.
그러나 1453년 오스만 제국이 콘스탄티노플을 정복하면서 육로 교역이 봉쇄되었고,
이것이 포르투갈과 스페인이 바닷길로 동방을 찾게 된 결정적 계기가 되었습니다.
베네치아의 마르코 폴로가 쓴 '동방견문록'은 이 시대 탐험가들의 교과서였습니다.""",
            "buy": {"도자기": 100, "모직물": 50},
            "sell": {"향신료": 350, "황금": 450},
            "emoji": "🎭",
        },
    }

    # 항해 거리/비용 (출발항 -> 도착항: 비용)
    st.session_state.travel_costs = {
        ("리스본","세비야"): 30, ("세비야","리스본"): 30,
        ("리스본","살바도르"): 120, ("살바도르","리스본"): 120,
        ("리스본","희망봉"): 200, ("희망봉","리스본"): 200,
        ("희망봉","캘리컷"): 180, ("캘리컷","희망봉"): 180,
        ("캘리컷","말라카"): 100, ("말라카","캘리컷"): 100,
        ("세비야","테노치티틀란"): 180, ("테노치티틀란","세비야"): 180,
        ("살바도르","테노치티틀란"): 140, ("테노치티틀란","살바도르"): 140,
        ("세비야","베네치아"): 80, ("베네치아","세비야"): 80,
        ("리스본","베네치아"): 90, ("베네치아","리스본"): 90,
    }

    # 랜덤 이벤트
    st.session_state.events = [
        {"id":"pirate","name":"⚔️ 해적 습격!", "desc":"바르바리 해적들이 나타났다!", "effect":"gold", "amount":-150, "quiz_escape":True},
        {"id":"storm","name":"🌪️ 대폭풍!", "desc":"거센 폭풍우가 몰아친다. 화물 일부를 버려야 한다!", "effect":"cargo", "amount":0},
        {"id":"wind","name":"💨 순풍!", "desc":"무역풍을 타고 빠르게 항해한다! 여비가 절감되었다.", "effect":"gold", "amount":50},
        {"id":"merchant","name":"🧙 신비한 상인", "desc":"이국의 상인이 특별 거래를 제안한다!", "effect":"trade", "amount":0},
        {"id":"discovery","name":"🌟 미지의 섬 발견!", "desc":"항해 중 무인도에서 보물을 발견했다!", "effect":"gold", "amount":200},
        {"id":"disease","name":"😷 괴혈병 발생", "desc":"선원들이 괴혈병에 걸렸다. 치료비가 필요하다.", "effect":"gold", "amount":-80},
        {"id":"ally","name":"🤝 우호적인 현지인", "desc":"원주민들이 환영하며 선물을 가져왔다!", "effect":"gold", "amount":100},
    ]

    # 역사 퀴즈 DB
    st.session_state.quizzes = {
        "살바도르": [
            {"q":"콜럼버스가 아메리카 원주민을 무엇이라 불렀는가?", "opts":["인디오","아즈텍","잉카","마야"], "a":"인디오", "reward":200, "diff":"쉬움",
             "explain":"콜럼버스는 자신이 인도에 도착했다고 착각하여 원주민들을 '인디오(Indio, 인도인)'라 불렀습니다. 이 명칭은 오늘날까지 라틴아메리카에서 원주민을 지칭하는 말로 남아 있습니다."},
            {"q":"대서양 삼각 무역의 세 꼭짓점은?", "opts":["유럽-아프리카-아메리카","유럽-아시아-아프리카","아메리카-아시아-유럽","유럽-인도-중국"], "a":"유럽-아프리카-아메리카", "reward":300, "diff":"보통",
             "explain":"삼각 무역: 유럽→아프리카(공산품 수출, 노예 구매)→아메리카(노예 판매, 면화·설탕 구매)→유럽(농산물 판매). 수백만 명의 아프리카인이 이 체계 속에서 노예가 되었습니다."},
        ],
        "희망봉": [
            {"q":"희망봉을 처음 발견(1488년)한 포르투갈 탐험가는?", "opts":["콜럼버스","마젤란","바르톨로메우 디아스","바스코 다 가마"], "a":"바르톨로메우 디아스", "reward":150, "diff":"쉬움",
             "explain":"바르톨로메우 디아스는 1488년 아프리카 최남단을 돌며 희망봉을 발견했습니다. 처음에는 '폭풍의 곶'으로 명명했으나 주앙 2세가 '희망봉'으로 개명했습니다."},
            {"q":"희망봉 항로 개척이 유럽에 미친 가장 큰 영향은?", "opts":["오스만 제국 우회 인도 직항로 개척","지중해 무역 독점 강화","중국과의 직접 교역 시작","아메리카 대륙 발견"], "a":"오스만 제국 우회 인도 직항로 개척", "reward":250, "diff":"보통",
             "explain":"오스만 제국이 육로 무역로를 장악한 상황에서, 희망봉 항로는 오스만을 완전히 우회해 인도 향신료를 직접 가져오는 길을 열었습니다. 이로써 포르투갈이 향신료 무역을 장악합니다."},
        ],
        "캘리컷": [
            {"q":"바스코 다 가마가 캘리컷에서 가져온 가장 귀한 특산품은?", "opts":["비단","후추(향신료)","도자기","면직물"], "a":"후추(향신료)", "reward":200, "diff":"쉬움",
             "explain":"후추를 비롯한 향신료는 중세 유럽에서 금과 맞먹는 가치를 지녔습니다. 냉장 기술이 없던 시대 육류 보존에 필수적이었고, 약재로도 쓰였습니다."},
            {"q":"바스코 다 가마의 인도 항로 개척 연도는?", "opts":["1492년","1488년","1498년","1519년"], "a":"1498년", "reward":300, "diff":"보통",
             "explain":"1497년 리스본을 출발한 바스코 다 가마는 희망봉을 돌아 1498년 5월 인도 캘리컷에 도착했습니다. 이는 콜럼버스의 아메리카 도착(1492년)보다 6년 뒤의 일입니다."},
        ],
        "말라카": [
            {"q":"포르투갈이 말라카를 정복한 인물은?", "opts":["바스코 다 가마","아폰수 드 알부케르크","마젤란","엔히크 왕자"], "a":"아폰수 드 알부케르크", "reward":250, "diff":"보통",
             "explain":"아폰수 드 알부케르크는 1510년 고아, 1511년 말라카를 정복해 '인도양의 포르투갈 제국'을 건설했습니다. 그는 향신료 무역로의 핵심 거점들을 장악하는 전략을 구사했습니다."},
            {"q":"마르코 폴로가 서술한 책의 이름은?", "opts":["동방견문록","항해기","세계의 서술","신세계 항해"], "a":"동방견문록", "reward":200, "diff":"쉬움",
             "explain":"베네치아 상인 마르코 폴로의 '동방견문록'은 중국·인도·동남아의 풍요를 묘사하여 유럽 탐험가들에게 동방에 대한 동경을 심어주었습니다. 콜럼버스도 이 책을 항상 지참했습니다."},
        ],
        "테노치티틀란": [
            {"q":"아즈텍 제국을 정복한 스페인 정복자는?", "opts":["콜럼버스","프란시스코 피사로","에르난 코르테스","바스코 누네스 데 발보아"], "a":"에르난 코르테스", "reward":200, "diff":"쉬움",
             "explain":"에르난 코르테스는 1519년 멕시코에 상륙, 1521년 테노치티틀란을 함락시켰습니다. 천연두 등 유럽 전염병이 원주민을 대량 사망시킨 것이 정복의 결정적 요인이었습니다."},
            {"q":"스페인이 아메리카 정복으로 가장 많이 가져간 자원은?", "opts":["황금과 은(귀금속)","향신료","노예","면직물"], "a":"황금과 은(귀금속)", "reward":300, "diff":"쉬움",
             "explain":"포토시(볼리비아)와 사카테카스(멕시코) 은광에서 채굴된 방대한 은이 스페인 왕실을 부유하게 했습니다. 이 은의 유입이 유럽 전체의 물가 혁명(인플레이션)을 일으키기도 했습니다."},
        ],
        "베네치아": [
            {"q":"오스만 제국이 유럽의 동방 육로 무역을 막은 사건(1453년)은?", "opts":["콘스탄티노플 함락","십자군 전쟁","레판토 해전","비잔티움 쇠퇴"], "a":"콘스탄티노플 함락", "reward":300, "diff":"어려움",
             "explain":"1453년 오스만 술탄 메흐메트 2세가 콘스탄티노플을 함락시키면서 동로마 제국이 멸망했습니다. 이로써 실크로드를 통한 동방 무역이 막혔고, 포르투갈과 스페인이 바닷길을 찾게 된 직접적 계기가 되었습니다."},
            {"q":"베네치아 상인 마르코 폴로가 방문한 국가는?", "opts":["인도","중국(원나라)","일본","오스만 제국"], "a":"중국(원나라)", "reward":200, "diff":"쉬움",
             "explain":"마르코 폴로는 1271~1295년 중국 원나라 쿠빌라이 칸의 궁정에서 17년간 봉직했습니다. 귀환 후 쓴 '동방견문록'이 유럽 탐험시대의 불씨가 되었습니다."},
        ],
        "리스본": [
            {"q":"포르투갈 대항해시대의 기반을 닦은 왕자의 별명은?", "opts":["항해왕자","정복왕자","무역왕자","발견왕자"], "a":"항해왕자", "reward":150, "diff":"쉬움",
             "explain":"포르투갈 왕자 엔히크(1394~1460)는 사그리쉬에 항해학교를 세우고 아프리카 탐험을 후원했습니다. 그 자신은 항해에 나서지 않았지만 '항해왕자'로 불리며 대항해시대의 아버지로 꼽힙니다."},
        ],
        "세비야": [
            {"q":"콜럼버스가 아메리카에 도착한 연도는?", "opts":["1486년","1492년","1498년","1502년"], "a":"1492년", "reward":150, "diff":"쉬움",
             "explain":"1492년 10월 12일, 콜럼버스는 현재의 바하마 제도에 도착했습니다. 그는 이곳이 아시아라고 믿었고, 사망할 때까지 그 생각을 바꾸지 않았습니다. 아메리고 베스푸치가 이곳이 신대륙임을 밝혔습니다."},
        ],
    }

    # 퀘스트
    st.session_state.quests = [
        {"id":"world_tour","name":"🌍 세계 일주","desc":"8개 항구를 모두 방문하라","type":"visit_all","target":8,"reward":1000,"fame":50,"done":False},
        {"id":"rich","name":"💰 황금함대","desc":"금화 5000G를 달성하라","type":"gold","target":5000,"reward":500,"fame":30,"done":False},
        {"id":"trader","name":"⚖️ 대상인","desc":"50회 교역을 완수하라","type":"trade","target":50,"reward":600,"fame":25,"done":False},
        {"id":"scholar","name":"📚 역사학자","desc":"10개 퀴즈를 맞혀라","type":"quiz","target":10,"reward":400,"fame":40,"done":False},
        {"id":"spice","name":"🌶️ 향신료왕","desc":"향신료를 20개 판매하라","type":"sell_item","item":"향신료","target":20,"reward":500,"fame":20,"done":False},
    ]
    st.session_state.quest_progress = {q["id"]: 0 for q in st.session_state.quests}

    # 업적
    st.session_state.achievements = []

    # 퀴즈 관련
    st.session_state.show_quiz = False
    st.session_state.current_quiz_port = ""
    st.session_state.solved_ports = set()
    st.session_state.quiz_correct_total = 0
    st.session_state.quiz_index = {}  # port -> 현재 퀴즈 인덱스
    st.session_state.sell_count = {"향신료": 0}

    # 이벤트
    st.session_state.pending_event = None
    st.session_state.event_quiz = None

    # 로그
    st.session_state.log = ["⚓ 리스본에서 출항 준비를 마쳤다. 세계 무역의 패자가 되어라!"]


init_game()

team = st.session_state.team
ports = st.session_state.ports
quizzes = st.session_state.quizzes

# ── 계급 시스템 ───────────────────────────────────────────
RANKS = [
    (0,   "견습 선원 ⛵"),
    (50,  "항해사 🧭"),
    (150, "선장 ⚓"),
    (350, "함대장 🏴‍☠️"),
    (700, "제독 ⚔️"),
    (1200,"대제독 👑"),
]

def get_rank(fame):
    r = RANKS[0][1]
    for threshold, name in RANKS:
        if fame >= threshold:
            r = name
    return r

def get_next_rank(fame):
    for threshold, name in RANKS:
        if fame < threshold:
            return threshold, name
    return None, "최고 계급 달성!"

# ── 업적 확인 ─────────────────────────────────────────────
def check_achievements():
    ach = st.session_state.achievements
    team = st.session_state.team

    def add(badge, msg):
        if badge not in ach:
            ach.append(badge)
            st.session_state.log.insert(0, f"🎖️ 업적 달성: {msg}")

    if len(team["visited"]) >= 8:
        add("world_tour","항해왕 - 모든 항구 방문!")
    if team["gold"] >= 5000:
        add("rich","황금함대 - 금화 5000G 달성!")
    if team["trade_count"] >= 50:
        add("trader","대상인 - 교역 50회 달성!")
    if st.session_state.quiz_correct_total >= 10:
        add("scholar","역사학자 - 퀴즈 10개 정답!")
    if team["ship"] == "갈레온":
        add("galleon","대항해함대 - 갈레온 선박 보유!")
    if team["fame"] >= 700:
        add("admiral","제독 - 명성 700 달성!")

# ── 퀘스트 진행 업데이트 ──────────────────────────────────
def update_quest(qtype, amount=1, item=None):
    for q in st.session_state.quests:
        if q["done"]:
            continue
        matched = False
        if q["type"] == qtype:
            if q["type"] == "sell_item" and item == q.get("item"):
                matched = True
            elif q["type"] != "sell_item":
                matched = True
        if matched:
            st.session_state.quest_progress[q["id"]] = min(
                st.session_state.quest_progress[q["id"]] + amount,
                q["target"]
            )
            if st.session_state.quest_progress[q["id"]] >= q["target"] and not q["done"]:
                q["done"] = True
                team["gold"] += q["reward"]
                team["fame"] += q["fame"]
                st.session_state.log.insert(0, f"📜 퀘스트 완료! '{q['name']}' - {q['reward']}G & 명성 {q['fame']} 획득!")

def update_visit_quest():
    st.session_state.quest_progress["world_tour"] = len(team["visited"])
    for q in st.session_state.quests:
        if q["id"] == "world_tour" and not q["done"]:
            if len(team["visited"]) >= q["target"]:
                q["done"] = True
                team["gold"] += q["reward"]
                team["fame"] += q["fame"]
                st.session_state.log.insert(0, f"📜 퀘스트 완료! '{q['name']}' - {q['reward']}G & 명성 {q['fame']} 획득!")

def update_gold_quest():
    st.session_state.quest_progress["rich"] = team["gold"]
    for q in st.session_state.quests:
        if q["id"] == "rich" and not q["done"]:
            if team["gold"] >= q["target"]:
                q["done"] = True
                team["gold"] += q["reward"]
                team["fame"] += q["fame"]
                st.session_state.log.insert(0, f"📜 퀘스트 완료! '{q['name']}' - {q['reward']}G & 명성 {q['fame']} 획득!")

# ── 적재량 계산 ───────────────────────────────────────────
def total_cargo():
    return sum(team["inventory"].values())

# ──────────────────────────────────────────────────────────
# 이벤트 처리 (출항 후 화면 상단)
# ──────────────────────────────────────────────────────────
if st.session_state.pending_event:
    ev = st.session_state.pending_event
    st.warning(f"### {ev['name']}\n{ev['desc']}")

    if ev["effect"] == "gold":
        if ev["amount"] > 0:
            st.success(f"✨ +{ev['amount']}G 획득!")
        else:
            st.error(f"💸 {ev['amount']}G 손실!")
        if ev.get("quiz_escape") and st.session_state.event_quiz is None:
            # 해적: 퀴즈로 탈출 옵션
            all_qs = []
            for pqs in quizzes.values():
                all_qs.extend(pqs)
            st.session_state.event_quiz = random.choice(all_qs)

        if st.session_state.event_quiz:
            eq = st.session_state.event_quiz
            st.info("⚔️ 해적과의 협상! 역사 퀴즈를 맞히면 피해를 절반으로 줄일 수 있다!")
            st.write(f"**문제:** {eq['q']}")
            ev_choice = st.radio("정답:", eq["opts"], index=None, key="event_quiz_radio")
            c1, c2 = st.columns(2)
            with c1:
                if st.button("퀴즈로 탈출 시도", key="ev_quiz_submit"):
                    if ev_choice == eq["a"]:
                        st.session_state.log.insert(0, "⚔️ 퀴즈로 해적을 물리쳤다! 피해 절반 감소.")
                        team["gold"] += ev["amount"] // 2  # 절반만 손실
                        team["gold"] = max(0, team["gold"])
                        st.session_state.quiz_correct_total += 1
                        team["combo"] += 1
                        update_quest("quiz")
                    else:
                        team["gold"] += ev["amount"]
                        team["gold"] = max(0, team["gold"])
                        team["combo"] = 0
                        st.session_state.log.insert(0, "⚔️ 해적에게 항복! 금화를 빼앗겼다.")
                    st.session_state.pending_event = None
                    st.session_state.event_quiz = None
                    check_achievements()
                    st.rerun()
            with c2:
                if st.button("그냥 금화 납부", key="ev_pay"):
                    team["gold"] += ev["amount"]
                    team["gold"] = max(0, team["gold"])
                    st.session_state.log.insert(0, f"💸 해적에게 {-ev['amount']}G를 바쳤다.")
                    st.session_state.pending_event = None
                    st.session_state.event_quiz = None
                    st.rerun()
            st.stop()
        else:
            team["gold"] += ev["amount"]
            team["gold"] = max(0, team["gold"])
            if st.button("확인", key="ev_ok"):
                st.session_state.pending_event = None
                st.rerun()
            st.stop()

    elif ev["effect"] == "cargo":
        st.error("화물 일부가 바다에 빠졌다!")
        # 가장 많은 화물 1개 손실
        max_item = max(team["inventory"], key=team["inventory"].get)
        if team["inventory"][max_item] > 0:
            team["inventory"][max_item] -= 1
            st.write(f"**{max_item} 1개 손실**")
        if st.button("확인", key="ev_cargo_ok"):
            st.session_state.pending_event = None
            st.rerun()
        st.stop()

    elif ev["effect"] in ("trade", "ally", "discovery"):
        team["gold"] += ev["amount"]
        if st.button("확인", key="ev_trade_ok"):
            st.session_state.pending_event = None
            st.rerun()
        st.stop()

# ──────────────────────────────────────────────────────────
# 퀴즈 팝업
# ──────────────────────────────────────────────────────────
if st.session_state.show_quiz:
    quiz_port = st.session_state.current_quiz_port
    port_quizzes = quizzes.get(quiz_port, [])
    qi = st.session_state.quiz_index.get(quiz_port, 0)
    if qi >= len(port_quizzes):
        st.session_state.show_quiz = False
        st.session_state.solved_ports.add(quiz_port)
        st.rerun()

    qdata = port_quizzes[qi]
    diff_color = {"쉬움": "🟢", "보통": "🟡", "어려움": "🔴"}.get(qdata["diff"], "⚪")

    st.error(f"## 📜 {quiz_port} 역사 퀴즈! {diff_color} {qdata['diff']}")
    st.write(f"**문제:** {qdata['q']}")
    st.caption(f"정답 시 보상: {qdata['reward']}G (콤보 ×{team['combo']+1})")

    user_choice = st.radio("정답을 고르시오:", qdata["opts"], index=None, key=f"quiz_{quiz_port}_{qi}")

    col_hint, col_submit = st.columns([1,2])
    with col_hint:
        if st.button("💡 힌트 (-50G)", key=f"hint_{quiz_port}_{qi}"):
            if team["gold"] >= 50:
                team["gold"] -= 50
                st.info(f"**힌트:** 정답은 '{qdata['a'][:1]}...' 로 시작합니다.")
    with col_submit:
        if st.button("✅ 정답 제출", key=f"submit_{quiz_port}_{qi}"):
            if user_choice is None:
                st.warning("정답을 선택하세요.")
            else:
                combo_bonus = team["combo"]
                if user_choice == qdata["a"]:
                    bonus = qdata["reward"] * (1 + combo_bonus * 0.2)
                    bonus = int(bonus)
                    team["gold"] += bonus
                    team["fame"] += 5
                    team["combo"] += 1
                    st.session_state.quiz_correct_total += 1
                    update_quest("quiz")
                    st.session_state.quiz_index[quiz_port] = qi + 1
                    st.session_state.log.insert(0, f"📚 퀴즈 정답! +{bonus}G (콤보 ×{team['combo']})")
                    # 마지막 퀴즈면 solved
                    if qi + 1 >= len(port_quizzes):
                        st.session_state.solved_ports.add(quiz_port)
                        st.session_state.show_quiz = False
                else:
                    team["combo"] = 0
                    st.session_state.quiz_index[quiz_port] = qi + 1
                    st.session_state.log.insert(0, f"📚 퀴즈 오답. 콤보 초기화.")
                    if qi + 1 >= len(port_quizzes):
                        st.session_state.solved_ports.add(quiz_port)
                        st.session_state.show_quiz = False

                with st.expander("📖 역사 해설 보기"):
                    st.write(qdata["explain"])
                check_achievements()
                update_visit_quest()
                update_gold_quest()
                st.rerun()
    st.stop()

# ──────────────────────────────────────────────────────────
# 메인 UI
# ──────────────────────────────────────────────────────────
st.title("⚓ 대항해시대: 무역의 지배자")

rank = get_rank(team["fame"])
next_threshold, next_rank = get_next_rank(team["fame"])
fame_progress = 0
for i, (t, _) in enumerate(RANKS):
    if team["fame"] >= t and i < len(RANKS)-1:
        low = t
        high = RANKS[i+1][0]
        fame_progress = (team["fame"] - low) / (high - low)

st.markdown(f"<div class='rank-badge'>{rank}</div>", unsafe_allow_html=True)
if next_threshold:
    st.progress(min(fame_progress, 1.0), text=f"다음 계급까지: {next_threshold - team['fame']} 명성 필요")

st.markdown("---")
c1,c2,c3,c4,c5,c6 = st.columns(6)
c1.metric("🏴 함대명", team["name"])
c2.metric("💰 금화", f"{team['gold']}G")
c3.metric("⭐ 명성", team["fame"])
c4.metric("📍 위치", team["location"])
c5.metric("⛵ 선박", team["ship"])
c6.metric("📦 적재", f"{total_cargo()}/{team['capacity']}")
st.markdown("---")

# ── 탭 레이아웃 ───────────────────────────────────────────
tab_port, tab_sail, tab_ship, tab_quest, tab_log, tab_history = st.tabs([
    "🏛️ 항구", "🗺️ 출항", "⚙️ 선박/장비", "📜 퀘스트/업적", "📰 항해일지", "📖 역사도감"
])

# ── 탭1: 항구 ─────────────────────────────────────────────
with tab_port:
    current_port_name = team["location"]
    port_data = ports[current_port_name]

    st.header(f"{port_data['emoji']} {current_port_name}")
    st.write(port_data["desc"])
    with st.expander("📖 역사 정보 보기"):
        st.markdown(port_data["history"])

    st.subheader("⚖️ 교역소")
    cargo_left = team["capacity"] - total_cargo()
    st.caption(f"남은 적재 공간: {cargo_left}칸")

    trade_col1, trade_col2, inv_col = st.columns([1,1,1])
    with trade_col1:
        st.write("**🛒 구매**")
        if port_data["buy"]:
            for item, price in port_data["buy"].items():
                discount = 0.9 if st.session_state.equipment["해도"] else 1.0
                actual = int(price * discount)
                btn_label = f"{item} 구매 -{actual}G"
                if st.session_state.equipment["해도"]:
                    btn_label += " (해도 10%↓)"
                if st.button(btn_label, key=f"buy_{item}"):
                    if team["gold"] < actual:
                        st.error("금화 부족!")
                    elif cargo_left <= 0:
                        st.error("적재 공간 부족! 선박을 업그레이드하세요.")
                    else:
                        team["gold"] -= actual
                        team["inventory"][item] += 1
                        team["trade_count"] += 1
                        update_quest("trade")
                        update_gold_quest()
                        st.session_state.log.insert(0, f"🛒 {item} 구매 -{actual}G")
                        st.rerun()
        else:
            st.write("_구매 가능한 물품 없음_")

    with trade_col2:
        st.write("**💵 판매**")
        if port_data["sell"]:
            for item, price in port_data["sell"].items():
                in_stock = team["inventory"].get(item, 0)
                if st.button(f"{item} 판매 +{price}G | 보유:{in_stock}", key=f"sell_{item}"):
                    if in_stock <= 0:
                        st.error("보유량 없음!")
                    else:
                        team["gold"] += price
                        team["inventory"][item] -= 1
                        team["trade_count"] += 1
                        team["total_earned"] += price
                        if item == "향신료":
                            st.session_state.sell_count["향신료"] = st.session_state.sell_count.get("향신료",0)+1
                            update_quest("sell_item", item="향신료")
                        update_quest("trade")
                        update_gold_quest()
                        check_achievements()
                        st.session_state.log.insert(0, f"💵 {item} 판매 +{price}G")
                        st.rerun()
        else:
            st.write("_판매 가능한 물품 없음_")

    with inv_col:
        st.write("**📦 선박 적재함**")
        for item, amount in team["inventory"].items():
            bar = "█" * amount + "░" * max(0, 3-amount)
            st.write(f"`{bar}` {item}: **{amount}개**")

# ── 탭2: 출항 ─────────────────────────────────────────────
with tab_sail:
    st.header("🗺️ 출항소")
    current = team["location"]

    dest_options = [p for p in ports.keys() if p != current]
    destination = st.selectbox("목적지 선택", dest_options)

    cost_key = (current, destination)
    rev_key = (destination, current)
    base_cost = st.session_state.travel_costs.get(cost_key) or st.session_state.travel_costs.get(rev_key) or 100
    if st.session_state.equipment["해도"]:
        travel_cost = int(base_cost * 0.8)
        st.caption(f"항해 비용: {base_cost}G → **{travel_cost}G** (해도 20%↓)")
    else:
        travel_cost = base_cost
        st.caption(f"항해 비용: {travel_cost}G")

    dest_data = ports[destination]
    st.info(f"**{destination}** {dest_data['emoji']}: {dest_data['desc']}")

    if st.button(f"⚓ {destination}으로 출항! (-{travel_cost}G)", key="sail_btn"):
        if team["gold"] < travel_cost:
            st.error("금화가 부족하다!")
        else:
            team["gold"] -= travel_cost
            team["location"] = destination
            team["days"] += random.randint(10, 30)
            team["visited"].add(destination)
            update_visit_quest()

            # 예방 이벤트 (25% 확률, 대포 있으면 해적 이벤트 제외)
            events = st.session_state.events
            if not st.session_state.equipment["대포"]:
                possible_events = events
            else:
                possible_events = [e for e in events if e["id"] != "pirate"]

            if random.random() < 0.35:
                ev = random.choice(possible_events)
                st.session_state.pending_event = dict(ev)
                st.session_state.event_quiz = None

            # 퀴즈 트리거
            if destination in quizzes and destination not in st.session_state.solved_ports:
                st.session_state.show_quiz = True
                st.session_state.current_quiz_port = destination

            st.session_state.log.insert(0, f"⚓ {current} → {destination} 출항 (-{travel_cost}G)")
            check_achievements()
            st.rerun()

# ── 탭3: 선박/장비 ───────────────────────────────────────
with tab_ship:
    st.header("⚙️ 선박 & 장비 업그레이드")

    ships = {
        "카라벨": {"capacity":10, "upgrade_to":"카락", "cost":800, "desc":"소형 쾌속 범선. 적재량 10."},
        "카락":   {"capacity":18, "upgrade_to":"갈레온", "cost":1800, "desc":"중형 상선. 적재량 18."},
        "갈레온": {"capacity":30, "upgrade_to":None, "cost":0, "desc":"대형 전투상선. 적재량 30."},
    }
    current_ship = team["ship"]
    ship_info = ships[current_ship]
    st.write(f"**현재 선박:** {current_ship} — {ship_info['desc']}")

    if ship_info["upgrade_to"]:
        next_ship = ship_info["upgrade_to"]
        cost = ship_info["cost"]
        if st.button(f"🛠️ {next_ship}으로 업그레이드 (-{cost}G)", key="upgrade_ship"):
            if team["gold"] >= cost:
                team["gold"] -= cost
                team["ship"] = next_ship
                team["capacity"] = ships[next_ship]["capacity"]
                st.session_state.log.insert(0, f"🛠️ {next_ship} 업그레이드 완료! 적재량: {ships[next_ship]['capacity']}")
                check_achievements()
                st.rerun()
            else:
                st.error(f"금화 부족! {cost}G 필요.")
    else:
        st.success("✅ 최고 등급 선박 보유!")

    st.markdown("---")
    st.subheader("🔧 특수 장비")
    equip_info = {
        "망원경": {"cost":200, "desc":"항구 도착 전 이벤트 예보 기능 (구현 예정)", "emoji":"🔭"},
        "대포":   {"cost":350, "desc":"해적 이벤트 완전 방어", "emoji":"💣"},
        "해도":   {"cost":300, "desc":"항해 비용 20% 절감, 교역 가격 10% 할인", "emoji":"🗺️"},
    }
    for eq, info in equip_info.items():
        owned = st.session_state.equipment[eq]
        col_eq, col_btn = st.columns([3,1])
        col_eq.write(f"{info['emoji']} **{eq}** ({info['cost']}G) — {info['desc']}")
        if owned:
            col_btn.success("보유 중")
        else:
            if col_btn.button(f"구매", key=f"buy_eq_{eq}"):
                if team["gold"] >= info["cost"]:
                    team["gold"] -= info["cost"]
                    st.session_state.equipment[eq] = True
                    st.session_state.log.insert(0, f"🔧 {eq} 구매 완료!")
                    st.rerun()
                else:
                    st.error("금화 부족!")

# ── 탭4: 퀘스트/업적 ─────────────────────────────────────
with tab_quest:
    st.header("📜 퀘스트")
    for q in st.session_state.quests:
        prog = st.session_state.quest_progress[q["id"]]
        target = q["target"]
        pct = min(prog / target, 1.0)
        status = "✅ 완료" if q["done"] else f"{prog}/{target}"
        with st.expander(f"{'✅' if q['done'] else '🔲'} {q['name']} — {status}"):
            st.write(q["desc"])
            st.progress(pct)
            st.caption(f"보상: {q['reward']}G + 명성 {q['fame']}")

    st.markdown("---")
    st.header("🎖️ 업적")
    ach_list = st.session_state.achievements
    if ach_list:
        st.write(" | ".join([f"🏅 {a}" for a in ach_list]))
    else:
        st.write("아직 달성한 업적이 없습니다.")

# ── 탭5: 항해일지 ─────────────────────────────────────────
with tab_log:
    st.header("📰 항해일지")
    st.caption(f"항해 경과일: {team['days']}일 | 총 교역 횟수: {team['trade_count']}회 | 누적 수익: {team['total_earned']}G")
    for entry in st.session_state.log[:30]:
        st.write(f"• {entry}")

# ── 탭6: 역사 도감 ────────────────────────────────────────
with tab_history:
    st.header("📖 역사 도감")
    st.caption("방문한 항구의 역사만 열람 가능합니다.")
    visited = team["visited"]
    for pname, pdata in ports.items():
        if pname in visited:
            with st.expander(f"{pdata['emoji']} {pname} (방문 완료)"):
                st.markdown(pdata["history"])
                pqs = quizzes.get(pname, [])
                if pqs:
                    st.markdown("**관련 퀴즈 문제들:**")
                    for i, pq in enumerate(pqs):
                        solved = pname in st.session_state.solved_ports
                        marker = "✅" if solved else "🔒"
                        st.write(f"{marker} Q{i+1}: {pq['q']}")
                        if solved:
                            st.caption(f"> {pq['explain']}")
        else:
            st.write(f"🔒 **{pname}** — 아직 방문하지 않은 항구입니다.")
