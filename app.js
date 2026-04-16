const IMAGES = {
  hero: "",
  swordsman: "",
  healer: "",
  wizard: ""
};


/* --- DATA: Basic Test (RIASEC) --- */
const riasecQuestions = [
    { q: "기계나 도구를 조립하고 수리하는 일이 재미있다.", type: "R" },
    { q: "자연 현상이나 과학적인 원리를 탐구하는 것이 좋다.", type: "I" },
    { q: "내 생각이나 감정을 글, 그림, 음악 등으로 표현하는 것이 좋다.", type: "A" },
    { q: "어려움에 처한 사람을 도와주고 상담해주는 일에 보람을 느낀다.", type: "S" },
    { q: "사람들을 이끌고 목표를 달성하거나 프로젝트를 지휘하는 것이 좋다.", type: "E" },
    { q: "정해진 규칙과 절차에 따라 정확하게 업무를 처리하는 것이 편하다.", type: "C" },
    { q: "야외에서 몸을 움직이거나 현장에서 일하는 것을 선호한다.", type: "R" },
    { q: "복잡한 수학 문제나 논리적인 퍼즐을 푸는 것이 즐겁다.", type: "I" },
    { q: "새롭고 독창적인 아이디어를 생각내어 무언가를 디자인하고 싶다.", type: "A" },
    { q: "다른 사람에게 새로운 지식을 가르쳐주거나 설명하는 것을 잘한다.", type: "S" },
    { q: "새로운 사업 아이템을 기획하거나 물건을 판매하여 수익을 내고 싶다.", type: "E" },
    { q: "문서 작성, 데이터 정리, 회계 처리 등 꼼꼼한 일이 적성에 맞다.", type: "C" }
]; // 1~5 scale (1: 전혀 아님, 5: 매우 그렇다)

const valuesQuestions = [
    { id: 'salary', q: "나의 직업 선택에 있어 '높은 연봉'은 얼마나 중요합니까?" },
    { id: 'worklife', q: "나의 직업 선택에 있어 '워라밸(개인 시간 보장)'은 얼마나 중요합니까?" },
    { id: 'stability', q: "나의 직업 선택에 있어 '직업적 안정성(해고 위험 낮음)'은 얼마나 중요합니까?" },
    { id: 'impact', q: "나의 직업 선택에 있어 '사회적 기여/파급력'은 얼마나 중요합니까?" }
]; // 1~5 scale

/* --- QUEST SIMULATION DATA ("Plant the Seed") --- */
const questData = {
    lawyer: {
        title: "변호사",
        icon: "⚖️",
        stages: [
            {
                type: "quiz",
                title: "튜토리얼 퀘스트: LEET 논리 추론",
                desc: "로스쿨 진학을 위해 법학적성시험(LEET) 수준의 논리 퍼즐을 해결해야 합니다. (3문제 중 2문제 이상 통과)",
                questions: [
                    { q: "갑, 을, 병 세 명 중 한 명만 진실을 말합니다.\n갑: '을이 범인입니다.'\n을: '저는 범인이 아닙니다.'\n병: '저도 범인이 아닙니다.'\n범인은 누구일까요?", options: ["갑", "을", "병"], answer: 2 },
                    { q: "A가 1등이면 B는 2등이 아니다. B가 2등이면 C는 3등이다. C가 3등이 아니라면 위 문장들에 모순이 없기 위해 확실한 사실은?", options: ["A는 1등이 아니다", "B는 2등이다", "C는 1등이다"], answer: 0 },
                    { q: "모든 인간은 죽는다. 소크라테스는 인간이다. 그러므로 소크라테스는 죽는다. 이 추론 방식은?", options: ["귀납법", "연역법", "변증법"], answer: 1 }
                ],
                passScore: 2
            },
            {
                type: "quiz",
                title: "변호사 시험: 법학 기초",
                desc: "기초적인 법학 지식을 묻습니다. (3문제 중 2문제 이상 통과)",
                questions: [
                    { q: "타인의 재물을 절취한 자에게 성립하는 범죄는?", options: ["사기죄", "절도죄", "배임죄"], answer: 1 },
                    { q: "개인 간의 재산상, 신분상 분쟁을 해결하기 위한 소송은?", options: ["형사소송", "민사소송", "행정소송"], answer: 1 },
                    { q: "헌법상 국민의 기본권이 아닌 것은?", options: ["평등권", "자유권", "납세권"], answer: 2 }
                ],
                passScore: 2
            },
            {
                type: "interactive",
                title: "메인 퀘스트: 역전! 모의재판",
                desc: "당신은 원고 대리인입니다. 제출된 증거를 바탕으로 올바른 법리를 제시하세요.",
                image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800&h=300",
                imgCaption: "증거 자료 1호: 부동산 매매 계약서 사본",
                prompt: "**👨‍⚖️ 판사:** 원고는 피고가 계약을 일방적으로 파기했으므로 계약금의 배액 상환을 요구하고 있습니다. 변호인, 이 주장의 근거가 되는 조항은 무엇입니까?",
                options: [
                    "해약금에 의한 계약해제 (민법 제565조)",
                    "착오에 의한 의사표시 취소 (민법 제109조)",
                    "불공정한 법률행위 무효 (민법 제104조)"
                ],
                answer: 0,
                successMsg: "**판사:** 타당한 근거군요. 주장을 인용합니다! (승소)",
                failMsg: "**판사:** 기각합니다. 해당 조항은 본 사건의 본질과 맞지 않습니다."
            }
        ],
        roadmap: [
            "다양한 학부 전공 수학 (GPA, 외국어 집중 관리)",
            "법학적성시험(LEET) 응시 및 초고득점 달성",
            "법학전문대학원(로스쿨) 3년 과정 입학 및 이수",
            "변호사시험 합격 및 6개월 실무수습",
            "로펌/기업 사내변호사/공공기관 입사"
        ],
        tiers: [
            { level: 'Tier 1', desc: '김&장, 광장 등 6대 대형 로펌 파트너 (억 단위 초봉, 극상의 워라밸 압박)' },
            { level: 'Tier 2', desc: '주요 대기업 사내 인하우스 변호사 및 중견 네트워크 로펌 (안정성과 워라밸)' },
            { level: 'Tier 3', desc: '개인 법률 사무소 개업 및 소규모 서초동 어소시에이트 (영업력에 따른 수익)' }
        ]
    },
    fundManager: {
        title: "펀드매니저",
        icon: "📈",
        stages: [
            {
                type: "quiz",
                title: "튜토리얼: 투자자산운용사 (경제 기초)",
                desc: "거시 경제 흐름을 읽는 능력 테스트 (3문제 중 2문제 이상 통과)",
                questions: [
                    { q: "수요가 일정할 때, 공급이 증가하면 가격은 어떻게 되는가?", options: ["상승한다", "하락한다", "변함없다"], answer: 1 },
                    { q: "일반적으로 물가가 지속적으로 오르는 현상을 무엇이라고 하는가?", options: ["디플레이션", "인플레이션", "스태그플레이션"], answer: 1 },
                    { q: "한국은행이 기준금리를 인하하면 시중 통화량은 어떻게 되는가?", options: ["증가한다", "감소한다", "영향없다"], answer: 0 }
                ],
                passScore: 2
            },
            {
                type: "quiz",
                title: "심화: 금융투자 실무",
                desc: "자본 시장에 대한 이해도 테스트 (3문제 중 2문제 이상 통과)",
                questions: [
                    { q: "한국은행이 '기준금리를 인상'했습니다. 펀드매니저의 가장 적절한 판단은?", options: ["주식 비중을 최대로 늘린다.", "기존 장기 채권 비중을 축소한다.", "부동산 투자를 늘린다."], answer: 1 },
                    { q: "주식회사가 자금을 조달하기 위해 발행하는 증서는?", options: ["주식", "예금", "환어음"], answer: 0 },
                    { q: "하이리스크 하이리턴 원칙에 비추어 볼 때 가장 위험도가 높은 자산은?", options: ["국채", "우량 회사채", "가상화폐(암호화폐)"], answer: 2 }
                ],
                passScore: 2
            },
            {
                type: "allocation",
                title: "메인 퀘스트: 타임슬립 2010년 자산배분",
                desc: "2010년 5월입니다. 헤드라인 뉴스를 참고하여 1년 뒤 10% 이상 수익을 낼 포트폴리오를 구성하세요. (총합 100%)",
                images: [
                    { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=250", caption: "2010년 경제신문: 스마트폰 대중화 원년" },
                    { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400&h=250", caption: "2010년 경제신문: 중국 경제 고속 성장 (화학/정유)" }
                ],
                assets: {
                    "LG화학": 110.0,
                    "현대차": 85.0,
                    "엔씨소프트": 45.0,
                    "삼성전자": 25.0,
                    "한국전력": -5.0
                },
                targetReturn: 10
            }
        ],
        roadmap: [
            "경제/경영/통계/수학 등 수리·상경계 학부 전공",
            "학부 시절 투자자산운용사, CFA 등의 전문 라이선스 취득",
            "금융 동아리 및 증권사/운용사 인턴십 경험 축적",
            "대형 증권사 리서치 RA 또는 자산운용사 주니어 편입",
            "독자적인 운용 자산(AUM)을 굴리는 메인 펀드매니저 승급"
        ],
        tiers: [
            { level: 'Tier 1', desc: '외국계 IB 뱅커, 탑티어 자산운용사 헤지펀드 매니저 (실적 비례 무제한 인센티브)' },
            { level: 'Tier 2', desc: '국내 대형 증권사/운용사 주식운용본부 메인 매니저 및 스타 애널리스트' },
            { level: 'Tier 3', desc: '일반 시중은행 및 보험사의 리테일/자산 관리 리서치 부서원' }
        ]
    },
    teacher: {
        title: "학교 교사",
        icon: "🏫",
        stages: [
            {
                type: "quiz",
                title: "튜토리얼 퀘스트: 교육 심리학",
                desc: "학생들의 발달과 심리를 이해하기 위한 기초 지식 테스트입니다. (3문제 중 2문제 이상 통과)",
                questions: [
                    { q: "피아제(Piaget)의 인지발달이론에서 추상적, 논리적 사고가 가능한 시기는?", options: ["감각운동기", "전조작기", "형식적 조작기"], answer: 2 },
                    { q: "바람직한 행동을 증가시키기 위해 불쾌한 자극을 제거해 주는 강화 기법은?", options: ["정적 강화", "부적 강화", "소거"], answer: 1 },
                    { q: "학습자가 자신의 인지 과정을 스스로 통제하고 조절하는 능력은?", options: ["자기효능감", "메타인지", "통찰력"], answer: 1 }
                ],
                passScore: 2
            },
            {
                type: "quiz",
                title: "교원 임용 시험: 교육학 기초",
                desc: "미래의 교사로서 필수적인 교육학 논리 테스트입니다. (3문제 중 2문제 이상 통과)",
                questions: [
                    { q: "교사가 학생에게 가지는 기대가 실제 학생의 성취에 영향을 미치는 현상은?", options: ["피그말리온 효과", "플라시보 효과", "헤일로 효과"], answer: 0 },
                    { q: "학습자 중심의 교육을 강조하며, 경험을 통한 성장을 중시한 학자는?", options: ["존 듀이(Dewey)", "파블로프(Pavlov)", "스키너(Skinner)"], answer: 0 },
                    { q: "교육 평가 중, 학습과정 중에 피드백을 주어 개선을 돕는 평가는?", options: ["진단평가", "형성평가", "총괄평가"], answer: 1 }
                ],
                passScore: 2
            },
            {
                type: "match",
                title: "메인 퀘스트: 위기 학생 상담센터 매칭",
                desc: "학생들이 현재 겪고 있는 아픔이나 필요에 맞는 올바른 지원 기관을 찾아 연결(선택)해 주세요.",
                scenarios: [
                    {
                        img: "https://images.unsplash.com/photo-1574610758891-5b822d561aec?auto=format&fit=crop&q=80&w=300&h=300",
                        caption: "따돌림과 우울 증세로 인해 심리적 안정과 깊은 상담이 필요한 학생",
                        options: ["청소년수련관", "Wee센터 (학교폭력/심리상담)", "고용복지플러스센터"],
                        answer: 1,
                        feedback: "Wee센터는 학교 부적응 및 심리적 위기 학생을 돕는 전문 상담 기관입니다."
                    },
                    {
                        img: "https://images.unsplash.com/photo-1628190566367-12b2df40d5b7?auto=format&fit=crop&q=80&w=300&h=300",
                        caption: "심각한 학교 폭력 피해(성폭력 등)로 인해 경찰 조사 지원과 의료적 개입이 응급한 학생",
                        options: ["보건소", "해바라기센터 (성폭력/아동학대 지원)", "진로진학지원센터"],
                        answer: 1,
                        feedback: "해바라기센터는 성폭력, 가정폭력 피해자에 대해 의료/상담/법률/수사 지원을 통합 제공합니다."
                    }
                ]
            }
        ],
        roadmap: [
            "사범대학교 진학 또는 일반 전공 최상위권 교직 이수 (교육대학원 진학)",
            "학부/대학원 재학 중 교육봉사 및 학교 현장 교생 실습",
            "초중등 교원 자격증 취득 (2급 정교사)",
            "초고난도 국가 교원 임용고시 합격 (국공립) 또는 사립 정교사/기간제 교사 채용",
            "학교 발령 후 정교사(담임/교과 전담) 활동 및 1급 승급"
        ],
        tiers: [
            { level: 'Tier 1', desc: '국공립 학교 수석 교사, 장학사 및 교육청 교육 연구관 (최고 호봉 및 권한, 평생 연금)' },
            { level: 'Tier 2', desc: '일반 국공립 학교 정교사 및 재단/대우가 매우 우수한 명문 사립학교 정교사' },
            { level: 'Tier 3', desc: '단기 기간제 교사 및 시간 강사 (계약직, 고용 불안정성)' }
        ]
    }
};

let appState = {
    currentView: 'dashboard',
    testMode: null, // 'basic' | 'quest'
    subStep: 0, 
    qIndex: 0,
    answers: {
        riasec: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
        values: { salary: 0, worklife: 0, stability: 0, impact: 0 }
    },
    quest: {
        activeJobId: null, // 'lawyer', 'fundManager', 'teacher'
        stage: 0,
        tempScore: 0, // For quizzes
        allocation: {} // For fund manager
    }
};



function init() {
    renderDashboard();
}

function navigate(view) {
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById(view).classList.add('active');
    appState.currentView = view;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetState(mode) {
    appState.testMode = mode;
    appState.subStep = 0;
    appState.qIndex = 0;
    appState.answers = {
        riasec: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
        values: { salary: 0, worklife: 0, stability: 0, impact: 0 },
        rpg: { STR: 0, INT: 0, CHA: 0, FTH: 0 }
    };
}

/* --- DASHBOARD --- */
function renderDashboard() {
    const html = `
        <div id="dashboard" class="view active">
            <header style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; margin-bottom: 3rem;">
                <h1 style="font-size: 1.5rem; text-align: left; margin: 0; cursor: pointer;">🧭 The Guidance — 진로 탐색 가이드</h1>
            </header>
            
            <div style="text-align: center; margin-bottom: 4rem;">
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 0.5rem 1.2rem; border-radius: 99px; font-weight: 700; font-size: 0.9rem; margin-bottom: 1.5rem;">
                    <i data-lucide="clock" style="width: 16px; height: 16px;"></i>
                    소요 시간: 약 3분
                </div>
                <h2 style="font-size: 3rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem;">
                    나에게 딱 맞는<br />
                    <span style="color: #818cf8;">전공과 직업</span> 찾기
                </h2>
                <p style="font-size: 1.2rem; max-width: 600px; margin: 0 auto; color: #cbd5e1;">
                    홀랜드 적성 이론 기반 36문항 진단 + 가치관 분석으로<br />
                    당신에게 최적화된 진로 로드맵을 제공합니다.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 4rem;">
                <div class="glass-card" style="text-align: center; padding: 2rem;">
                    <div style="width: 50px; height: 50px; background: rgba(99, 102, 241, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <i data-lucide="target" style="color: #818cf8;"></i>
                    </div>
                    <h3 style="font-size: 1.2rem; color: #fff; margin: 0 0 0.5rem 0;">적성 정밀 진단</h3>
                    <p style="font-size: 0.95rem; margin: 0;">RIASEC 6가지 유형 중 나의 강점 분석</p>
                </div>
                <div class="glass-card" style="text-align: center; padding: 2rem;">
                    <div style="width: 50px; height: 50px; background: rgba(99, 102, 241, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <i data-lucide="sparkles" style="color: #818cf8;"></i>
                    </div>
                    <h3 style="font-size: 1.2rem; color: #fff; margin: 0 0 0.5rem 0;">가치관 밸런스</h3>
                    <p style="font-size: 0.95rem; margin: 0;">연봉·워라밸·안정성 등 내 우선순위 파악</p>
                </div>
                <div class="glass-card" style="text-align: center; padding: 2rem;">
                    <div style="width: 50px; height: 50px; background: rgba(99, 102, 241, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <i data-lucide="check-circle" style="color: #818cf8;"></i>
                    </div>
                    <h3 style="font-size: 1.2rem; color: #fff; margin: 0 0 0.5rem 0;">맞춤 로드맵</h3>
                    <p style="font-size: 0.95rem; margin: 0;">추천 직업 TOP5 + 진입 경로 + 티어 정보</p>
                </div>
            </div>

            <div style="text-align: center; margin-bottom: 2rem;">
                <button class="btn" onclick="startBasicTest()" style="padding: 1.2rem 3rem; font-size: 1.2rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                    무료 진단 시작하기
                    <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
                </button>
            </div>
            
            <p style="text-align: center; font-size: 0.85rem; color: #64748b; margin-bottom: 5rem;">
                ※ 홀랜드(RIASEC) 적성 이론은 미국 심리학자 존 홀랜드가 개발한<br />
                세계적으로 인정받는 직업 적성 분류 체계입니다.
            </p>

            <div style="margin-top: 4rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4rem;">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <h2 style="font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem;">
                        <span style="color: #10b981;">Plant the Seed:</span><br />
                        직무 몰입형 시뮬레이션 퀘스트
                    </h2>
                    <p style="font-size: 1.15rem; color: #cbd5e1;">단순한 성향 테스트를 넘어 실제 로스쿨/여의도의 치열함을 체험하세요.</p>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; max-width: 900px; margin: 0 auto;">
                    <div class="glass-card menu-card" onclick="startQuestBoard()" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#10b981;">Gamification - Quest</div>
                        <img src="${IMAGES.wizard}" alt="직업 체험 퀘스트" style="width: 140px; height: 140px;" />
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">시뮬레이션 퀘스트 입장</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">당신의 직업적 로망, 현실의 미션을 통해 검증해보세요.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='fund_manager.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#3b82f6;">Trading Mission</div>
                        <div style="font-size: 80px; margin: 10px 0;">📈</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">2010 펀드매니저 미션</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">자산 비중을 100% 분배하여 1년 후 10% 이상의 수익률을 창출하라.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='mock_trial.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#eab308;">New Sub-Menu</div>
                        <div style="font-size: 80px; margin: 10px 0;">🏛️</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">알렉산드로스 모의재판</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">과연 그는 폭군인가 영웅인가? 단서를 역사 크라임씬에서 변호하세요.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='habitus_sim.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#8b5cf6;">Socioeconomic Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">🎲</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">아비투스 인생게임</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">타고난 자본과 선택이 만드는 계층 이동 사다리를 체험해 보세요.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='supply_demand.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#10b981;">Economy Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">⚖️</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">수요와 공급 게임</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">자원 비대칭과 화폐의 탄생, 시장의 원리를 체험하는 시뮬레이션입니다.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='separation_of_powers.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#dc2626;">Law / Politics Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">🏛️</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">삼권분립 마블 보드게임</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">주사위를 굴리며 헌법재판소, 입법부, 사법부 등 국가 기관을 점령하세요.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='consulting_tycoon.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#6366f1;">Business Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">🏢</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">컨설팅 타이쿤</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">위기에 처한 기업을 구하는 컨설턴트가 되어 파산을 막아주세요.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='mock_investment_game.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#ea580c;">Investment Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">📊</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">글로벌 모의투자 보드게임</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">과거로 돌아가 거시경제 퀴즈를 맞히고 투자를 통해 자산을 불리세요.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='social_mock_trial.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#0284c7;">Law / Society Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">🧑‍⚖️</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">사회 모의재판: 역전의 명수</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">증거를 모으고 법정 공방을 통해 진실을 밝혀내는 법률 모의재판 게임입니다.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='bond_history.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#4f46e5;">Economy / History Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">💵</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">채권 역사 프리미엄 게임</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">연준의 역사적 결정 속에서 살아남아라. 채권을 직접 선택하며 배우는 인터랙티브 시뮬레이션입니다.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.open('https://historymonopoly.vercel.app/', '_blank')" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#f59e0b;">History Monopoly</div>
                        <div style="font-size: 80px; margin: 10px 0;">🌍</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">세계사 모노폴리</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">유라시아 교역로를 장악하고 문명을 발전시켜 승리하세요.</p>
                    </div>

                    <div class="glass-card menu-card" onclick="window.location.href='daehanghaesiidae/index.html'" style="flex: 1; min-width: 320px; padding: 2rem;">
                        <div class="badge" style="background:#10b981;">History Trading Sim</div>
                        <div style="font-size: 80px; margin: 10px 0;">⛵</div>
                        <h3 style="font-size: 1.6rem; color: #fff; margin: 0;">대항해시대: 부와 권력</h3>
                        <p style="font-size: 1rem; color: #cbd5e1; margin-top: 0.5rem;">15세기 무역의 중심에서 교역로를 개척해 대제독에 오르세요!</p>
                    </div>
                </div>
            </div>
            
        </div>
    `;
    document.getElementById('app').innerHTML = html;
    
    // Lucide 아이콘 렌더링
    if(window.lucide) {
        window.lucide.createIcons();
    }
}

/* --- LOGIC ROUTERS --- */
window.startBasicTest = function() {
    resetState('basic');
    renderBasicQuestion();
};

window.startQuestBoard = function() {
    resetState('quest');
    renderQuestBoard();
};

/* --- QUEST BOARD --- */
function renderQuestBoard() {
    let boardHTML = `
        <div id="quest_board" class="view active" style="margin-top: 2rem;">
            <div class="header">
                <h1>어떤 직업을 체험하시겠습니까?</h1>
                <p>원하는 퀘스트 라인을 선택하세요.</p>
            </div>
            <div class="dashboard-grid">
    `;

    for (const [jobId, jobData] of Object.entries(questData)) {
        boardHTML += `
            <div class="glass-card menu-card" onclick="startQuest('${jobId}')" style="padding: 3rem 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${jobData.icon}</div>
                <h3 style="font-size: 1.8rem; color: #fff;">${jobData.title} 체험</h3>
                <p style="color: #94a3b8; font-size: 1.1rem; margin-top: 1rem;">자격 검증 퀴즈와 모의 실무 미션 진행</p>
                <div style="margin-top: 1.5rem; padding: 0.5rem 1rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 99px; font-size: 0.9rem; color: #e2e8f0; display: inline-block;">
                    총 ${jobData.stages.length} 단계
                </div>
            </div>
        `;
    }

    boardHTML += `
            </div>
            <div style="text-align: center; margin-top: 4rem;">
                <button class="btn back-btn" onclick="init()">메인 대시보드로 돌아가기</button>
            </div>
        </div>
    `;

    document.getElementById('app').innerHTML = boardHTML;
}

window.startQuest = function(jobId) {
    appState.quest.activeJobId = jobId;
    appState.quest.stage = 0;
    appState.quest.tempScore = 0;
    appState.quest.qTempIndex = 0;
    appState.quest.sTempIndex = 0;
    appState.quest.allocation = {};
    renderQuestStage();
};
/* --- BASIC TEST: RIASEC + VALUES --- */
function renderBasicQuestion() {
    const viewHTML = `
        <div id="test_view" class="view active">
            <div class="glass-card question-container">
                <div class="step-indicator">Step ${appState.subStep + 1} / 2: ${appState.subStep === 0 ? '적성검사' : '가치관 분석'}</div>
                <div class="progress-bar">
                    <div id="progress_fill" class="progress-fill" style="width: 0%"></div>
                </div>
                <h2 id="q_title" class="q-title">질문</h2>
                <div class="scale-options">
                    <span class="scale-label">전혀 아니다</span>
                    <div class="scale-buttons" id="scale_btns"></div>
                    <span class="scale-label">매우 그렇다</span>
                </div>
            </div>
        </div>
    `;
    if(appState.qIndex === 0 && appState.subStep === 0) {
        document.getElementById('app').innerHTML = viewHTML;
    }
    
    let currentQuestions = appState.subStep === 0 ? riasecQuestions : valuesQuestions;
    
    if (appState.qIndex >= currentQuestions.length) {
        if (appState.subStep === 0) {
            appState.subStep = 1;
            appState.qIndex = 0;
            renderBasicQuestion(); // Move to values
        } else {
            showBasicResult();
        }
        return;
    }

    const q = currentQuestions[appState.qIndex];
    const progress = (appState.qIndex / currentQuestions.length) * 100;
    
    document.getElementById('progress_fill').style.width = progress + '%';
    document.getElementById('q_title').innerText = q.q;
    
    let btnsHTML = '';
    for(let i=1; i<=5; i++) {
        btnsHTML += `<button class="scale-btn" onclick="handleBasicAnswer(${i})">${i}</button>`;
    }
    document.getElementById('scale_btns').innerHTML = btnsHTML;
}

window.handleBasicAnswer = function(score) {
    if (appState.subStep === 0) {
        const type = riasecQuestions[appState.qIndex].type;
        appState.answers.riasec[type] += score;
    } else {
        const id = valuesQuestions[appState.qIndex].id;
        appState.answers.values[id] += score;
    }
    
    appState.qIndex++;
    
    const container = document.querySelector('.scale-options');
    container.style.opacity = '0';
    setTimeout(() => {
        renderBasicQuestion();
        container.style.opacity = '1';
    }, 250);
};

function showBasicResult() {
    document.getElementById('progress_fill').style.width = '100%';
    
    // Calculate top RIASEC type
    const r = appState.answers.riasec;
    const sortedRiasec = Object.keys(r).sort((a,b) => r[b] - r[a]);
    const topType = sortedRiasec[0];
    const secondType = sortedRiasec[1];
    const code = topType + secondType;
    
    const typeDesc = {
        'R': '현실형(Realistic): 손재주가 뛰어나고 실용적',
        'I': '탐구형(Investigative): 분석적이고 학구적',
        'A': '예술형(Artistic): 창조적이고 자유로움',
        'S': '사회형(Social): 친절하고 봉사정신 투철',
        'E': '진취형(Enterprising): 리더십과 설득력',
        'C': '관습형(Conventional): 꼼꼼하고 규칙적'
    };
    
    const jobsData = {
        'RI': [
            { name: '로봇/자율주행 공학자', major: '기계/컴퓨터공학', subjects: '물리학, 미적분, 정보', 
              keyVariables: ["기초 학문(수학/물리) 성적", "포트폴리오 학부연구생/프로젝트", "AI 알고리즘 코딩 구현 능력", "석/박사 이상 학위 유무"],
              diversePaths: ["완성차 직속 R&D 센터 리더", "자율주행 테크 유니콘 스타트업", "국가 모빌리티 연구소 소속", "로보틱스 벤처 창업", "대학 전임 교원"],
              roadmap: ['명문 공대 입학', '학부 연구생 및 랩실 인턴', 'AI/로보틱스 석사 수료', '국내외 테크기업 R&D 합격'],
              tiers: [
                { level: 'Tier 1', desc: '테슬라, 현대자동차 등 코어 로보틱스 리드 (초봉 8천~1억+)' },
                { level: 'Tier 2', desc: '자율주행/로봇 분야 유망 테크 스타트업 책임 연구원' },
                { level: 'Tier 3', desc: '일반 제조업 자동화 설비 담당 엔지니어' }
              ]
            },
            { name: '전기 설비 설계자', major: '전기전자공학', subjects: '물리학, 공업수학',
              keyVariables: ["기사 및 쌍기사 자격증 취득 여부", "관련 학부 학점 3.5 이상", "AutoCAD/제어도면 작성 실무 경험", "공기업 NCS 통과 점수"],
              diversePaths: ["한전 등 대형 공기업 전기직", "1군 메이저 건설사 전기사업부", "반도체 장비 자동화(FA) 제어설계", "소방/전기 전문 기술사 사무소 개업", "일반 사기업 전기안전관리자"],
              roadmap: ['전기전자공학부 졸업', '전기기사/쌍기사 자격증 취득', 'NCS 수석 및 실무 역량 개발', '대기업/공기업 입사'],
              tiers: [
                { level: 'Tier 1', desc: '한국전력공사 등 최상위 공기업 및 삼성전자 인프라 (초봉 6천~)' },
                { level: 'Tier 2', desc: '1군 건설사 플랜트/전기사업부' },
                { level: 'Tier 3', desc: '중견/중소기업 전기 설계 담당' }
              ]
            },
            { name: '항공기 정비사', major: '항공정비학', subjects: '기하, 물리학',
              keyVariables: ["항공정비사 면장(자격증)", "공인영어성적(토익 800+)", "체력 및 성실성", "군 정비 특기 실무경험(보특)"],
              diversePaths: ["대형 국적사(Full Service) 메인정비", "제주항공 등 LCC 정비요원", "산림청/경찰기/해경 항공대 특채", "경비행기 비행학교 교관겸 정비관", "전투기 부사관 장기 복무"],
              roadmap: ['항공정비학과 입학', '항공정비사 면장 취득 (실습수료)', '군 정비 보특 실무경험', '항공사 공채 합격'],
              tiers: [
                { level: 'Tier 1', desc: '대한항공 등 대형 국적기 항공사 정규직 (초봉 5천+)' },
                { level: 'Tier 2', desc: 'LCC (저비용 항공사) 메인 정비사' },
                { level: 'Tier 3', desc: '하청 조업사 및 경비행기 정비수리' }
              ]
            }
        ],
        'IR': [
            { name: '데이터 사이언티스트', major: '통계학/컴퓨터공학', subjects: '확률과 통계, 정보',
              keyVariables: ["학점/수학적 모델링 역량", "캐글(Kaggle), Dacon 입상 스펙", "Python/R, SQL 코딩능력", "AI 관련 석박사 학위"],
              diversePaths: ["빅테크 기업(네카라쿠배) 핵심 리서처", "금융권(은행/증권) 마이데이터 퀀트", "스타트업 그로스 해킹/퍼포먼스 엔지니어", "대학/국책 연구소 데이터 분석가", "독립 분석 솔루션 B2B 창업"],
              roadmap: ['수학/통계/CS 학사', '캐글(Kaggle) 및 AI 공모전 입상', '데이터사이언스 대학원 진학', 'IT 플랫폼 기업 입사'],
              tiers: [
                { level: 'Tier 1', desc: '네이버, 카카오 등 빅테크 AI 코어 리서처 (초봉 8천~1.2억)' },
                { level: 'Tier 2', desc: '금융권/유니콘 스타트업 데이터 전담 분석가' },
                { level: 'Tier 3', desc: '일반 SI 데이터 엔지니어' }
              ]
            },
            { name: '신소재 연구원', major: '신소재공학/화학공학', subjects: '화학, 물리학',
              keyVariables: ["전공 평점(A0 유지)", "석/박사 과정 SCI급 1저자 논문 수", "연구실 장비 다루는 경험", "어학 성적(토익/스피킹)"],
              diversePaths: ["대기업 2차전지/배터리 핵심 R&D", "반도체 파운드리 소재 엔지니어", "디스플레이 화합물 선행기술 연구관", "정부/정출연 산하 수석 연구원", "신소재 전문 장비 스타트업 임원"],
              roadmap: ['관련 공대 입학', '소재/배터리 랩실 학부연구생', '석/박사 과정 중 SCI급 논문 게재', '대기업 R&D센터 입사'],
              tiers: [
                { level: 'Tier 1', desc: 'LG에너지솔루션, SK 등 메인 배터리/소재 랩 (초봉 7천+)' },
                { level: 'Tier 2', desc: '중견 반도체/디스플레이 장비 소재 파트' },
                { level: 'Tier 3', desc: '일반 벤처기업 연구보조원' }
              ]
            },
            { name: '의료/제약 연구원', major: '생명공학/의학', subjects: '생명과학, 화학',
              keyVariables: ["최상위 학부 학점 및 대학원 간판", "임상/비임상 연구 논문 실적(Nature 등)", "외국어(영어) 논문 독해/작성 능력", "제약 공정(GMP) 및 식약처 규제 숙지"],
              diversePaths: ["글로벌 파마(화이자 등) 본사 리서치", "국내 대기업(삼성바이오) 수석", "백신/바이오시밀러 벤처 창업 임원", "대학병원 소속 임상병리 기초교수", "국과수/질병관리청 국가 전문직"],
              roadmap: ['명문 생명/의과학대 입학', '국내외 유명 대학원 박사 수료', '바이오/제약 기업 연구소 합류', '핵심 임상/R&D 리드 진입'],
              tiers: [
                { level: 'Tier 1', desc: '셀트리온, 삼성바이오에피스 등 최고 백신/제약 수석급 리서처' },
                { level: 'Tier 2', desc: '중견 생명공학 스타트업 및 국책 연구기관 보조' },
                { level: 'Tier 3', desc: '진단검사 전문 수탁 기관 및 바이오 시밀러 품질 검수' }
              ]
            }
        ],
        'IA': [
            { name: '정신과 의사', major: '의과대학', subjects: '생명과학, 심리학',
              keyVariables: ["의과대학 예과/본과 내신 평점", "의사국가고시 합격점수", "관련 수련 병원(빅5) 인턴/레지던트 과정", "따뜻하고 단단한 멘탈리티"],
              diversePaths: ["명문 대학병원 임상교수/스태프", "전문 정신과 병원 페이닥터", "프라이빗(강남 등) 1인 개원의", "기업 부설 임직원 심리상담 센터장", "방송 패널/의학 채널 운영"],
              roadmap: ['의과대학 입학 (최상위 성적)', '의사 국가고시 통과', '인턴 수료 후 정신의학과 레지던트 수련', '전문의 자격 취득 및 펠로우 수료'],
              tiers: [
                { level: 'Tier 1', desc: '빅5 병원 임상교수 및 초특급 프라이빗 개원 (억대 연봉)' },
                { level: 'Tier 2', desc: '지방 종합병원 스태프 및 중대형 병원 페이닥터' },
                { level: 'Tier 3', desc: '소규모 개인 의원 및 요양병원 봉직의' }
              ]
            },
            { name: 'UX/UI 리서처', major: '인지심리학/디자인', subjects: '사회문화, 심리학',
              keyVariables: ["포트폴리오의 논리성(Why 고민)", "Data-driven 분석 역량(GA, SQL)", "인지심리학 기저 지식", "도구(Figma, Framer 등) 활용 숙련도"],
              diversePaths: ["최상위 IT 테크 서비스 Product Owner(PO)", "전통 금융사/대기업 UX 조직", "유명 에이전시 시니어 디자이너", "다국적 기업 고객경험(CX) 임원", "1인 프리랜서 디자인 컨설턴트"],
              roadmap: ['인문/디자인 융합 전공 학사', '사용자 조사 및 포트폴리오 구축', '기업 UX 랩실 인턴십', 'IT 대기업 프로덕트 그룹 입사'],
              tiers: [
                { level: 'Tier 1', desc: '구글, 토스, 라인 등 최상위 IT 기업 리드 리서처' },
                { level: 'Tier 2', desc: '국내 대견 에이전시 시니어 기획자' },
                { level: 'Tier 3', desc: '소형 웹에이전시 UX 담당' }
              ]
            },
            { name: 'AI 윤리 연구원', major: '철학/컴퓨터공학', subjects: '생활과 윤리, 정보',
              keyVariables: ["철학적 통찰과 CS 지식의 융합력", "대학원 논문/정부 과제 참여", "AI 법적 규제 스터디", "글로벌 트렌드(EU AI Act 등) 이해력"],
              diversePaths: ["초거대 AI 기업(OpenAI 등) Safety R&D", "국가인권위 및 윤리 정부 부처 자문", "법무법인 소속 컨설턴트", "관련 학제 협업 대학 전임교수", "빅테크 대관(Policy) 매니저"],
              roadmap: ['철학/CS 이중전공 졸업', 'AI 윤리 관련 대학원 연구원', '정부 주도 AI 정책 프로젝트 참여', '국가연구소/글로벌 빅테크 자문위원'],
              tiers: [
                { level: 'Tier 1', desc: '오픈AI, 구글 등 AI Safety 팀 (최고대우)' },
                { level: 'Tier 2', desc: '국내 빅테크 대기업 AI 윤리 거버넌스 담당' },
                { level: 'Tier 3', desc: '대학 및 윤리 공공 연구원' }
              ]
            }
        ],
        'AI': [
            { name: '프론트엔드 개발자', major: '자유전공/컴공', subjects: '수학, 프로그래밍',
              keyVariables: ["핵심 프레임워크(React 등) 실무 포트폴리오", "자료구조/알고리즘 코테 실력", "부트캠프 수료 타이틀(우테코 등)", "Web Performance 최적화 경험"],
              diversePaths: ["네이버, 카카오 등 대형 플랫폼 파트장", "유니콘/시리즈B 로켓 스타트업 리드/CTO", "프론트/백 아우르는 풀스택 엔지니어 전향", "글로벌 테크기업 한국/미국 본사", "프리랜서 및 1인 솔루션/SaaS 개발자"],
              roadmap: ['기초 프로그래밍 학습', '개인 런칭 (React/Vue 등)', '개발 부트캠프 수료 (우테코 등)', '테스팅/알고리즘 코테 최종합격'],
              tiers: [
                { level: 'Tier 1', desc: '네카라쿠배 프론트엔드 시니어 (초봉 6~8천)' },
                { level: 'Tier 2', desc: '시리즈B 이상 유망 테크 스타트업 리드 개발자' },
                { level: 'Tier 3', desc: '일반 SI/SM 및 소형 웹에이전시 사원' }
              ]
            },
            { name: '테크니컬 아티스트(TA)', major: '멀티미디어학', subjects: '정보, 미술',
              keyVariables: ["그래픽 엔진(Unreal, Unity) 딥-다이브", "쉐이더 코딩 및 파이썬 숙련도", "아트+프로그래밍 양방향 포트폴리오", "문제해결 최적화 실적"],
              diversePaths: ["3N 2K 등 국내 대형 게임사 핵심 개발 디렉터", "메타버스/XR 전담 혁신 스튜디오 치프", "할리우드 글로벌 FX 파이프라인 리드", "플랫폼 기업 아바타 사업부 시니어", "독립 인디게임 창작 스튜디오 운영"],
              roadmap: ['3D 모델링 및 엔진(Unreal/Unity) 마스터', '쉐이더 코딩 기술 습득', '융합 포트폴리오 완성', '대형 게임사 공채 합격'],
              tiers: [
                { level: 'Tier 1', desc: '엔씨/넥슨/크래프톤 등 3N/2K 최상위 게임사 TA 파트장' },
                { level: 'Tier 2', desc: '중견 글로벌 아트 스튜디오 및 외주 TA' },
                { level: 'Tier 3', desc: '소형 모바일 인디게임 개발팀 엔지니어' }
              ]
            },
            { name: '제품/산업 디자이너', major: '산업디자인', subjects: '미술, 기하',
              keyVariables: ["국제 어워드(Red Dot, iF 등) 입상 실적", "UX 프로세스 기반 논리적 리디자인", "라이노/키샷 등 3D 모델링 스킬", "현업 산학협력/인턴 경험"],
              diversePaths: ["삼성/LG/현대자동차 선행디자인 파트", "글로벌 유명 디자인 에이전시 리드", "가구/조명 브랜드 오프라인 기획자", "전자상거래 및 플랫폼 기업 공간경험 담당", "크라우드 펀딩을 통한 자기 브랜딩 창업"],
              roadmap: ['산업디자인 전공 입학', '국제 어워드 출품 (Red Dot, iF)', '산학협력 인턴', '글로벌 제조사 디자인센터 입사'],
              tiers: [
                { level: 'Tier 1', desc: '삼성전자/현대차 선행디자인 및 애플 본사 등 (글로벌 탑티어)' },
                { level: 'Tier 2', desc: '국내 유수 디자인 에이전시 및 대기업 가전 파트' },
                { level: 'Tier 3', desc: '소비재/가구 중소기업 인하우스 디자이너' }
              ]
            }
        ],
        'AS': [
            { name: '메인 연출 PD (방송/콘텐츠)', major: '미디어/언론홍보', subjects: '사회문화, 국어',
              keyVariables: ["언론고시 준비 및 시사/작문 논술 스터디", "단편영화/공모전 등 화제성 있는 포폴", "편집 툴 숙련도 및 독창적 기획안", "다수를 이끄는 소통과 리더십"],
              diversePaths: ["나영석/김태호 급 예능국 스타 전속 PD", "넷플릭스 등 멀티 글로벌 OTT 오리지널 제작", "대형 유튜브 스튜디오 채널 책임", "종합 미디어 프로덕션 임원/총괄 디렉터", "외주 프로덕션 설립 대표"],
              roadmap: ['방송/영상 관련 학회 스펙 빌딩', '공모전 및 개인 채널 흥행', '언론고시 준비 및 방송사 인턴십', '메인 조연출 최종 합격'],
              tiers: [
                { level: 'Tier 1', desc: '지상파 3사 및 나영석/김태호 급 메인 연출 PD (스타 PD시 백지수표)' },
                { level: 'Tier 2', desc: '유명 종편/티빙/넷플릭스 등 OTT 및 대형 유튜브 스튜디오 PD' },
                { level: 'Tier 3', desc: '소규모 외주 프로덕션 조연출' }
              ]
            },
            { name: '예술 심리 치료사', major: '심리학/미술치료학', subjects: '심리학, 미술',
              keyVariables: ["석사 이상 학위(상담/치료 전공)", "임상 실습시간(보통 1000~3000시간)", "미술/음악 등 예술적 베이스 및 감수성", "타인에 대한 자기 통제력"],
              diversePaths: ["대형 종합병원/정신건강의학과 전임 치료사", "시간당 수십만 원 급 프라이빗 1인 치료소 원장", "국공립 Wee센터 정규 카운셀러", "보육시설 순회 프리랜서", "기업 연수원 힐링 워크샵 강사"],
              roadmap: ['심리/예술 학부 전공', '미술상담치료 대학원 석사 진학', '임상수련 자격증 수료 (3천 시간 이상)', '국가 인증 임상심리사 취득'],
              tiers: [
                { level: 'Tier 1', desc: '대형 병원 정신건강센터 마스터 급 및 프라이빗 최고급 센터 소장' },
                { level: 'Tier 2', desc: '국공립 아동 상담센터/위센터 정규직 (안정적)' },
                { level: 'Tier 3', desc: '지역 소형 복지관 계약직 카운셀러 및 프리랜서' }
              ]
            },
            { name: '카피라이터', major: '광고홍보학', subjects: '문학, 사회문화',
              keyVariables: ["유명 광고제 수상 이력(제일기획 등)", "자신만의 카피북/포트폴리오", "최신 트렌드 캐치력", "비주얼을 텍스트로 풀어내는 프레젠테이션 스킬"],
              diversePaths: ["종합광고대행사 C-Level 크리에이티브 디렉터(CD)", "독립 크리에이티브 부티크 헤드 창업자", "대기업 브랜드 마케팅 커뮤니케이션 리드", "인기 에세이 작가/북튜버 전향", "소형 대행사/프리랜서"],
              roadmap: ['메이저 광고 공모전 대상 (제일기획 등)', '창의적 글쓰기 포트폴리오 준비', '종합광고대행사 공채 합격', '정규 카피라이터/CD 진급'],
              tiers: [
                { level: 'Tier 1', desc: '제일기획/이노션 등 탑티어 대행사 CD (크리에이티브 디렉터)' },
                { level: 'Tier 2', desc: '알려진 독립 크리에이티브 부티크 (돌고래유괴단 등) 헤드 카피' },
                { level: 'Tier 3', desc: '일반 바이럴 마케팅 대행사 콘텐츠 에디터' }
              ]
            }
        ],
        'SA': [
            { name: '상담 심리사', major: '심리학', subjects: '심리학, 사회문화',
              keyVariables: ["심리학회 공인 1급/2급 자격 소지 유무", "임상/상담 전공 석사 이상 학력", "풍부한 개인/집단 상담 수련 거침", "공감력 및 위기 상황 개입 훈련 경험"],
              diversePaths: ["대기업 복지차원 인하우스 EAP 센터장", "국가 지자체 통합 정신건강 공무원", "사설 전문 심리 상담 센터 공동/개인 개원", "대학 학생생활상담 전임 외래교수", "범죄심리/교정행정 심층 특채 공무원"],
              roadmap: ['심리학부 이수', '임상/상담 심리 석사 학위 취득', '국가 보건복지부 특수임상수련(1~3년)', '1급 자격 부여 전문 카운셀러'],
              tiers: [
                { level: 'Tier 1', desc: '대기업 임직원 상담센터(EAP) 인하우스 심리사 (대기업 수준 연봉/복지)' },
                { level: 'Tier 2', desc: '명문대학 학생생활상담센터 및 지방자치단체 소속 정규직' },
                { level: 'Tier 3', desc: '유료 개인상담센터 시간당 수련/파트타임' }
              ]
            },
            { name: '특수 교육 교사', major: '특수교육학', subjects: '교육학, 생명과학',
              keyVariables: ["특수교육학 평점 상위 10% 컷 유지", "초고난도 국가 임용고시 합격점 도달", "특수 교육 실습 이력 유무", "남다른 인내심과 확고한 직업 윤리"],
              diversePaths: ["국공립 특수학교 정교사 (연금 및 정년 보장)", "명문/복지 최상 사립 특수학교 소속 교원", "특수 장애 영유아 전담 보육시설 원장 파견", "청각/시각 등 맞춤형 특수 치료 교육원 창설", "특수교육 전공 대학 임상 강사, 장학사"],
              roadmap: ['교육과 및 특수교육 학위 입학', '필수 전공 학점 올A+ 이수 및 교생 실습', '초고난도 임용고시 패스', '국공립 특수학교 정교사 임용'],
              tiers: [
                { level: 'Tier 1', desc: '국공립 특수학교/특수학급 정규 교사 (철밥통, 연금, 훌륭한 방학 혜택)' },
                { level: 'Tier 2', desc: '처우가 우수한 재단 소속 상위 사립 특수학교 교사' },
                { level: 'Tier 3', desc: '기간제 계약직 보조 특수 교사' }
              ]
            },
            { name: '조직개발 매니저 (Culture/HR)', major: '경영/사회학', subjects: '사회문화, 경제',
              keyVariables: ["HR 학회장 이력 및 인사 인턴십", "조직문화 개선 프로젝트 주도 포트폴리오", "피플 애널리틱스(데이터) 활용력", "경영진 설득 프레젠테이션/가설 검증 스킬"],
              diversePaths: ["초대기업 인사/조직문화 리드팀장", "외국계 기업 한국 브랜치 HR/Culture 총괄 임원", "전통 그룹사 인재개발원(연수원) 교수 요원", "스타트업 보상/전략 컨설팅 프리랜서 조력자", "경영컨설팅 펌 조직개발 파트 이직"],
              roadmap: ['인사/조직 학회 출신 학사', '조직개발/HRD 인턴 경험', 'IT 빅테크 피플팀(People) 공채 입사', '전사 문화 개선 프로젝트 총괄'],
              tiers: [
                { level: 'Tier 1', desc: '토스/당근/카카오 등 워라밸과 복지 끝판왕 피플 리드 팀장급' },
                { level: 'Tier 2', desc: '전통적 그룹계열사/금융권 인사지원 및 교육 파트장' },
                { level: 'Tier 3', desc: '중소/중견 인사/총무 일반 담당사원' }
              ]
            }
        ],
        'SE': [
            { name: '노무사 (공인노무사)', major: '법학/경영학', subjects: '경제, 정치와법',
              keyVariables: ["노동법/행정법 집중 특화 성적 유지", "인사조직 실무/노무관리지식 체득", "장문의 법전 독해 속도 및 암기력", "고시반 전업 수험 버티기 전략"],
              diversePaths: ["메이저 및 초대형 노무법인 지분 파트너", "10대 대기업 인사노무팀 ইন하우스 사내 노무사", "지역 거점 노동위원회 공익위원", "노동조합 전문 노동권 보호 단체 활동", "개인 노무법인/노무 컨설팅 독립 창업"],
              roadmap: ['경영/법학 계열 진학 및 노동법 스터디', '고시반 입실 및 전업 수험 (평균 3년)', '1/2/3차 시험 최종 패스', '메이저 노무법인 파트너/사내 인하우스 합류'],
              tiers: [
                { level: 'Tier 1', desc: '전국 메이저 노무법인 파트너 및 대기업/공기업 사내 전임 노무사 (연봉 1.5억 이상)' },
                { level: 'Tier 2', desc: '수도권 중형 전문 노무법인 소속 고용 노무사 (기본급+인센티비)' },
                { level: 'Tier 3', desc: '지방권 소형 법인 근무 및 초기 소형 개업 (수익 변동성 높음)' }
              ]
            },
            { name: 'HR / 비즈니스 파트너 (HRBP)', major: '경영/심리', subjects: '경제, 심리학',
              keyVariables: ["고도의 인간 관찰/공감 및 평가 기준 객관화", "조직 내 네트워킹 및 중재 조정 능력", "PHR, SPHR 등 국제 공인 HR 자격", "비즈니스 경영(MBA) 학위 유무"],
              diversePaths: ["글로벌 최고 외국계 기업 한국지사 인사 임원", "국내 초우량 IT/제조 대기업 인사 최고책임자", "소수 정예 글로벌 헤드헌팅 서치펌 전문 파트너", "노무 평가/보상(C&B) 전문 독립 컨설턴트", "외주 채용솔루션 스타트업 코파운더"],
              roadmap: ['인사조직 이수', '채용/평가/보상(C&B) 실무 커리어 개발', 'PHR 등 글로벌 HR 자격 취득', '현업 비서실/인사 핵심 임원(HRBP) 승진'],
              tiers: [
                { level: 'Tier 1', desc: '삼성, SK, 현대차 그룹 컨트롤타워 인사/조직기획 전략 임원 (억대 이상 대우)' },
                { level: 'Tier 2', desc: '최고 외국계 기업 (보쉬 등) 한국 로컬 HR 제너럴리스트 (연 8천~)' },
                { level: 'Tier 3', desc: '일반 인력 파견 에이전시 헤드헌터 및 외주 채용' }
              ]
            },
            { name: '병원 시스템/행정 원무장', major: '보건행정학', subjects: '생활과윤리, 정치와법',
              keyVariables: ["보건의료정보관리사 필수 자격", "초대형 대학병원 장기 근속 평가", "복잡한 의료법/건보청구 규정 마스터", "의료진과의 신속한 커뮤니케이션 기술"],
              diversePaths: ["빅5 대학병원 기획조정실/원무 실장(요직)", "지방의료원 공공 보건 행정직 5급", "의료경영지원(MSO) 네트워크 의원 대표 이사", "보건복지부 특채 관료 혹은 산하기관 임원", "병원 컨설팅(심평원 대응 등) 전문 센터 설립"],
              roadmap: ['보건행정/경영 전공', '보건의료정보관리사 국가면허 취득', '대학병원 정규직 입사 후 순환 근무', '기획/총무 핵심 보직 과장 승진'],
              tiers: [
                { level: 'Tier 1', desc: '서울아산, 삼성서울 등 빅5 대학병원 기획조정실 실장/처장 급 (1억 내외)' },
                { level: 'Tier 2', desc: '지역 거점 국립대 부속 병원 및 2차 대형 종합병원 원무 과장' },
                { level: 'Tier 3', desc: '보통의 개인 병의원/네트워크 의원 원무 실장급' }
              ]
            }
        ],
        'ES': [
            { name: '변호사', major: '법학/자유전공 (무관)', subjects: '정치와법, 국어, 사회문화',
              keyVariables: ["초명문대 학벌 및 로스쿨 입학 티어 (KY이상)", "LEET(법학적성시험) 전국 상위 백분위", "학점(GPA) 및 어학 점수 철저한 관리", "기록적인 공부량 소화와 체력/멘탈리티"],
              diversePaths: ["탑 티어 메이저 로펌(김앤장, 세종 등) 파트너", "대기업 사내 인하우스 변호사/컴플라이언스 리더", "법관(판사) 혹은 검사 임용", "글로벌 경영 컨설팅/IB 매니저 이직", "독자적 전문 부티크 소형 펌 대표변호사 개업"],
              roadmap: ['명문 대학 상위 학점 졸업', '법학적성시험(LEET) 초고득점', '법학전문대학원(로스쿨) 3년 후 변호사 시험 패스', '원하는 진로의 로펌/인하우스 취직'],
              tiers: [
                { level: 'Tier 1', desc: '김&장, 광장, 태평양, 세종 등 메이저 대형 로펌 파트너 (초봉 1.5억+ 유지시 수십억)' },
                { level: 'Tier 2', desc: '대기업 사내변호사 및 YK 등 유명 네트워크 로펌 (초봉 8천~1억 후반, 워라밸 양호)' },
                { level: 'Tier 3', desc: '개인 법률 사무소 개업 및 서초동 소규모 고속/서브 변호사 (영업력에 따라 상이)' }
              ]
            },
            { name: '전략 컨설턴트', major: '경영학/경제학', subjects: '경제, 확률과통계',
              keyVariables: ["Case Interview 논리적 돌파 및 프레젠테이션 스킬", "전략 학회장 이력 및 글로벌 IB 인턴십", "엑셀(재무 모델링) 및 재무제표 해독 스킬", "극악무도한 업무/야근 견뎌내는 강철 체력"],
              diversePaths: ["글로벌 MBB(맥킨지, 베인, BCG) 시니어 파트너", "사모펀드(PEF) 바이아웃 심사역", "재벌 그룹사(SK, 롯데 등) 인하우스 CSO 임원", "주요 스타트업 C-Level 창업/CFO 합류", "전문 로컬 컨설팅 펌 독자 설립"],
              roadmap: ['국내외 최고 명문 학부', '핵심 전략 학회 활약 및 학부 인턴십', '초고난도 Case Interview 돌파', '주요 컨설팅 펌 비즈니스 애널리스트 입사'],
              tiers: [
                { level: 'Tier 1', desc: 'MBB (맥킨지, BCG, 베인) 시니어 및 파트너 (신입부터 1억 돌파, 워라밸 극악)' },
                { level: 'Tier 2', desc: 'Big 4 회계펌 연계 컨설팅 부서 (딜로이트, PWC 등) 매니저' },
                { level: 'Tier 3', desc: '부티크 컨설팅 및 소형 로컬 마케팅 조사 펌 컨설턴트' }
              ]
            },
            { name: '글로벌 세일즈 총괄장', major: '국제통상/어문', subjects: '영어, 세계지리',
              keyVariables: ["원어민 수준의 외국어(영어+제2외국어) 구사", "해외 주재원 파견 실적 및 현지 네트워킹", "이해관계 충돌 조율을 위한 탁월한 외교력", "거시경제와 지정학 무역 규제 통찰"],
              diversePaths: ["삼성/현대차 등 글로벌 수출기업 주요 대륙 법인장", "글로벌 소비재 럭셔리 브랜드 한국지사장", "대형 종합 상사 비철금속/식량 부문 임원", "글로벌 테크/클라우드 플랫폼 메가세일즈 매니저", "독자적 해외무역 에이전시(오퍼상) 대표"],
              roadmap: ['글로벌 어학 점수 만점 및 외국어 특기', '포스코인터/LX인터 등 종합 상사 공채', '현지 법인 파견 5년 실적 초과 달성', '본사 임원 및 지사장 승격'],
              tiers: [
                { level: 'Tier 1', desc: '삼성전자 스마트폰/반도체 주재 법인장 (파견 시 수당, 주택 지원 등 2억+ 혜택)' },
                { level: 'Tier 2', desc: '중견 글로벌 인프라/제약회사 B2B 해외 영업 팀장' },
                { level: 'Tier 3', desc: '중소 무역 상사 수출입 오퍼레이터' }
              ]
            }
        ],
        'EC': [
            { name: '공인회계사 (CPA)', major: '경영/경제/회계', subjects: '기하, 확률과통계, 경제',
              keyVariables: ["유예 최소화 단기 돌파 암기 및 계산 속도", "회계, 세법, 원가 전 방위적 이해", "빅4 내 요직(Deal, Tax) 부서 생존 경쟁력", "어학 및 클라이언트 협상 기술"],
              diversePaths: ["삼일/삼정 등 글로벌 빅4 파트너", "상장 대기업 또는 유력 IT기업 CFO", "글로벌 사모투자펀드(PEF) 밸류에이션 리드", "증권사 IB 본부 상장 주간사 디렉터", "지역/인맥 기반 1인 세무회계법인 대표"],
              roadmap: ['경영대학 입학 및 회계 기본기 수강', 'CPA 전문 고시반 2~4년 휴학 돌입', '최종 합격 후 회계법인 어소시에이트 수습', 'Tax/Deal/Audit 부서 전문성 배양'],
              tiers: [
                { level: 'Tier 1', desc: '삼일, 삼정 등 Big4 파트너 및 IT/대기업 C-Level 재무 이사 (최고 인센티브)' },
                { level: 'Tier 2', desc: '로컬 중대형 회계법인 소속 시니어 및 금융권(PEF/VC) 내부 회계사' },
                { level: 'Tier 3', desc: '초기 개인 기장 세무회계 독립 개업 (영업력 절대 의존기)' }
              ]
            },
            { name: '투자 매니저 / 펀드 뱅커', major: '경제/금융공학', subjects: '경제, 미적분',
              keyVariables: ["글로벌 금융시장 트렌드 인사이트", "CFA 3차 올패스 등 퀀트/재무 라이선스", "가치투자 운용 성과 증빙(수익률)", "마감과 리스크 압박을 이기는 극강의 배짱"],
              diversePaths: ["블랙록 등 탑티어 자산운용사 헤지펀드 매니저", "미래/한투 등 국내 대형 증권사 리서치 센터장", "초대형 연기금(국민연금 등) 기금운용 책임", "딥테크/IT 특화 벤처캐피탈(VC) 심사역", "초고액 자산가 전담 패밀리 오피스 운용"],
              roadmap: ['석사 과정 혹은 특급 학부 인턴 스펙', 'CFA (국제재무분석사) 3레벨 전체 통과 획득', '대형 증권사 리서치 RA 입사', '메인 운용 펀드 매니저 등록'],
              tiers: [
                { level: 'Tier 1', desc: '탑 밸류 자산운용사(블랙록 등) / 해외 IB 뱅커 (실적에 따라 인센티브 무제한)' },
                { level: 'Tier 2', desc: '국내 대형 증권사(미래에셋 등) 스타 애널리스트 및 IB 본부 팀장' },
                { level: 'Tier 3', desc: '시중 보험사/자산운용의 일반 리서쳐 사원' }
              ]
            },
            { name: '세무사', major: '조세/세무회계', subjects: '수학, 경제',
              keyVariables: ["복잡한 최신 세법 및 판례 해석-암기 루프", "강남 자산가/중소기업 영업 및 네트워킹", "실무 커넥션과 경력 레퍼런스", "부동산 양도/증여 특화 전문성"],
              diversePaths: ["고액 자산가 특화 프라이빗 1인 개업 세무사", "인플루언서/스타트업 특화 전략 세무 컨설턴트", "초대형 세무법인 근로 임원 및 지분 파트너", "국가/지방청 조세 전담 특채 관료 승진", "그룹 대기업 조세 전략팀 전문 인하우스"],
              roadmap: ['학부 중반 세무사(CTA) 1/2차 집중 수험', '최단기 최종 합격 영예', '세무법인 6개월~1년 수습 후 실무 인맥 확보', '부심급 승진 및 파트너/개업 진출'],
              tiers: [
                { level: 'Tier 1', desc: '특급 스타트업/인플루언서 전담 대형 세무조세 법인 대표 (독점적 부 획득)' },
                { level: 'Tier 2', desc: '중대형 세무법인 근로 세무사 및 국가직 세무공무원 특별채용 7급' },
                { level: 'Tier 3', desc: '초기 영세 개인 사무실 수습 (소득이 최저임금 수준인 통과구간)' }
              ]
            }
        ],
        'CE': [
            { name: '감정평가사', major: '부동산학/경제', subjects: '경제, 정치와법',
              keyVariables: ["국토법령과 감정/수학 수험 난이도 돌파", "부동산 시장 흐름 파악 및 평가보고서 신속 작성", "현장 오프라인 금융/관공서 영업망 확보", "오지 출장을 불사하는 체력 및 꼼꼼함"],
              diversePaths: ["대형 감정평가법인의 실무 총괄 지분 파트너 본부장", "한국부동산원, 주택금융공사 등 1금융권 공기업", "시중 금융 은행 여신 담보 가치 산정역", "LH 지사, 국토부 등 공공 보상/설계 지시관", "시행사(디벨로퍼) 직접 참여 창업가"],
              roadmap: ['감정평가사 고시반 진입 및 토지경제학/민법 몰입', '2차 논술까지 최종 우수 합격', '1년 수습 기간 내 업계 커뮤니티 장악', '지분 출자 후 독자 법인 파트너 승진'],
              tiers: [
                { level: 'Tier 1', desc: '전국 단위 탑클라스 평가법인 본부장 및 파트너 (수당 등 억 단위 초월 대우)' },
                { level: 'Tier 2', desc: '한국부동산원, 은행 여신심사역 등 안정적인 공기업/금융권 정직원' },
                { level: 'Tier 3', desc: '중소형 지역 법인 소속 막내 출장 전문 어소시에이트 평가사' }
              ]
            },
            { name: '5급 중앙부처 행정사무관 (행시)', major: '정외/경제/행정', subjects: '정치와법, 국어, 경제',
              keyVariables: ["초난도 행정고시(5급 PSAT/논술) 최단기 패스", "국가 정책 기안 및 예산안 해독 능력", "국가인재재원 연수 당시 최상위 배정 스펙", "초과근무와 대정부 국감을 견디는 멘탈"],
              diversePaths: ["기재부, 금융위원회 핵심 요직 총괄 (국장/차관급)", "광역 지자체(서울시/경기도) 기획실 수석 간부", "국토부, 산자부 등 한국 산업 조율 파트 실장", "해외 대사관/OECD 파견 기획 서기관", "퇴직 후 대형 로펌, 민간 대기업 임원으로 이직"],
              roadmap: ['명문 대학 고시반 및 신림동 합류', '행정고시(5급 공채) PSAT/2/3차 패스', '국가공무원인재개발원 상위권 성적 순 이수', '기재부/금융위/금감원 핵심 요직 배정'],
              tiers: [
                { level: 'Tier 1', desc: '기획재정부 차관 및 청장급 고속 승진 코스 (공공 초고선 엘리트의 정점)' },
                { level: 'Tier 2', desc: '광역지자체 (서울시 등) 기조실 총괄 수석 간부 및 상위 부서 과장' },
                { level: 'Tier 3', desc: '권한 및 예산이 약한 산하 산하기관 파견 및 지방직 5급' }
              ]
            },
            { name: '기업 금융 뱅커 (IB/대기업 심사)', major: '경영/통계/수학', subjects: '수학, 경제',
              keyVariables: ["상경계 네트워킹 학벌, CPA 등 금융 자격 보유", "대기업 연결 재무제표 현금흐름 분석력", "수주/영업점 KPI 달성을 이끄는 협상 매너", "대규모 인수합병(M&A) 모델링 구축 실무"],
              diversePaths: ["최우량 시중은행 IB본부장 로열로드 승진", "초우량 고객 네트워크 VIP 전담 대기업 영업 허브장", "자산운용사의 상업용 빌딩 부동산 PF 역", "외국계 상업은행(BoA등) 한국 코어 심사", "사모펀드 합류 후 바이아웃/경영권 인수 지휘"],
              roadmap: ['상경계 금융동아리 및 자격증파티 완료', '1/2금융 시중은행 (KB, 신한 등) 통합 공채 최종 합격', '영업점 근무 우수 후 본점 승격 발탁', '해외 프로젝트 파이낸싱/M&A 승인 총괄'],
              tiers: [
                { level: 'Tier 1', desc: '본점 핵심 투자금융(IB)본부 부장 및 대기업 전담 심사총괄 (고액 억대 대우)' },
                { level: 'Tier 2', desc: '강남구/여의도 핵심 업무지구 기업 전담 지점(RM) 부지점장' },
                { level: 'Tier 3', desc: '일반 리테일 중심 영업점 개인(가계대출) 창구 계장' }
              ]
            }
        ],
        'CR': [
            { name: '사이버 보안 책임자 (CISO)', major: '정보보안/컴공', subjects: '정보, 프로그래밍',
              keyVariables: ["하드웨어 코어 로우레벨 언어 마스터 (C/C++, 어셈블리)", "네트워크 취약점 분석 및 고난도 리버스 엔지니어링", "데프콘(DEF CON) 등 글로벌 화이트해킹 공모전 실적", "군/국가(사이버사) 출신의 보안 기밀 핸들링 경력"],
              diversePaths: ["초거대 데이터 플랫폼 최고 기술 보안 이사(CISO)", "국장원(NIS) 치안/사이버 대테러 통신 감찰역", "글로벌 화이트해커 컨설팅 전담 에이전시 공동 창립", "초유 침해사고 조사 및 데이터 복구 포렌식 수석연구원", "초대형 글로벌 가상화폐 거래소 코어 보안 본부장"],
              roadmap: ['최신 해킹/방어 툴 마스터와 C OS 지식 완비', '국가 BOB 수료 및 DEF CON 등 국제 CTF 우승', '사이버사령부 복무 및 최우수 입직', '빅테크 최고 보안 본부 리더 발탁'],
              tiers: [
                { level: 'Tier 1', desc: '국가정보원 요원 및 주요 빅테크 CISO 책임역 (사이버 안보 총괄사령관)' },
                { level: 'Tier 2', desc: '안랩, SK 등 주요 보안업체 시니어 모의해킹 전담 컨설턴트' },
                { level: 'Tier 3', desc: '하청 파견 보안 관제 인원 (심야 야간 교대 체력전)' }
              ]
            },
            { name: '데이터베이스 아키텍트 (DBA)', major: '컴퓨터공학/통계', subjects: '정보, 수학',
              keyVariables: ["분당 수천만 트래픽 병목 통찰 및 튜닝 제어 알고리즘", "멀티 클라우드(AWS, GCP) DB 클러스터 아키텍팅 숙련도", "대규모 유저 DB의 이관(Migration) 다운타임 리스크 제로화", "백엔드 개발진에게 쿼리 표준을 제시하는 시스템 오너십"],
              diversePaths: ["쿠팡, 배민 발 메가 플랫폼 초당 트랜잭션 수성 DBA 그룹장", "보안/정합성 중심의 금융권 주요 차세대 전산 인프라 코어", "클라우드 서비스 업체(AWS, MS등) 매니지드 파트 리드", "IT 유니콘/시리즈 메이저 스타트업 전권 부여 데이터 총괄", "복잡도 강한 쿼리를 건단위 수임하는 독립 데이터 튜너"],
              roadmap: ['데이터 시스템 설계 구조 숙달', '오라클 OCP 및 핵심 클라우드 DB 자격 통과', '대규모 데이터 마이그레이션 프로젝트 무결점 완수', '최고 데이터베이스 마스터 등극'],
              tiers: [
                { level: 'Tier 1', desc: '토스, 쿠팡 등 거대 빅테크 최상위 데이터 인프라 아키텍트 리더 (초봉 1억)' },
                { level: 'Tier 2', desc: '1금융 은행권 차세대 전산실 전담 고연봉 DBA' },
                { level: 'Tier 3', desc: '외주 용역(SI) 기반 DB 모니터링 관리 및 쿼리 도우미' }
              ]
            },
            { name: '품질 경영 관리관 (QC/QA)', major: '공학/통계', subjects: '확률과통계, 화학',
              keyVariables: ["식스시그마(Six Sigma) 등 공인된 통계적 품질 인증", "화학/기계 세부 현장 라인 공정 사이클 지식", "대량 양산 수백만 개 불량률 제로화 리드 경험", "벤더(협력업체)의 일정/기준을 통제하는 리더십"],
              diversePaths: ["ASML, 삼성 등 초정밀 팹 본사 품질경영 위원", "현대차, LG엔솔 메가팩토리 현장 품질 통합 라인 지휘", "바이오/제약 기업 소속 식약처/FDA 규제 통과 리드", "글로벌 규격/표준 인증원 현장 투입 실사 감사관", "자동차 메이저 부품 핵심 조달 협력사 C-Level 품질 임원"],
              roadmap: ['제조 공정 학사/석사 졸업', '가장 까다로운 식스시그마 블랙벨트 인증 및 품질경영기사 취득', '현장 실습/대기업 공채 합류', '초정밀 라인 불량률 0% 달성하여 본사 품질경영역 진급'],
              tiers: [
                { level: 'Tier 1', desc: '삼성전자 반도체/현대차 최고급 라인 총괄 품질 수석위원 (고보상 수당)' },
                { level: 'Tier 2', desc: '중견 전기차 부품업체/화학회사 공장장 직속 QC 라인장' },
                { level: 'Tier 3', desc: '일반 소비재 소형 공장 검수 공정 조장' }
              ]
            }
        ],
        'RC': [
            { name: '클라우드 인프라 솔루션 아키텍트', major: '통신/네트워크', subjects: '물리학, 정보',
              keyVariables: ["운영체제 로우레벨부터 최상단 네트워크 대역 패킷 분석 통찰", "AWS Pro / Azure SA 고급 아키텍쳐 자격증", "대형 B2B 기업(서버리스/컨테이너) 컨설팅 실적", "끊임없는 신기술 학습 및 장애 발생 시 리딩 대처력"],
              diversePaths: ["퍼블릭 벤더(AWS/구글 클라우드) 솔루션 아키텍트", "글로벌 최상위 매니지드 서비스(MSP) 최고 리드 엔지니어", "이커머스 트래픽 대규모 유니콘 사 인프라 망 총괄 기술부장", "클라우드 구축부터 보안/DevOps 자동화 컨설턴트 펌 창업", "국가망(스마트시티, 빅데이터허브) 네트워크 설계 마스터"],
              roadmap: ['네트워크 기본서 마스터', '최고난도 AWS SA 프로, GCP 자격 다수 취득', '거대 기업의 온프레미스->클라우드 이전 프로젝트 무결성 지휘 완수', '글로벌 벤더사 영입'],
              tiers: [
                { level: 'Tier 1', desc: 'AWS 코리아, 구글 클라우드 사옥 본점 마스터 클라우드 SA 파트너 (억대 시작)' },
                { level: 'Tier 2', desc: '메가존클라우드 등 주요 MSP 시니어 클라우드 시스템 리드' },
                { level: 'Tier 3', desc: '일반 IDC 서버 야간 순찰단 관제 오퍼레이터' }
              ]
            },
            { name: '건축 구조/현장 총지휘 소장', major: '건축공학/토목', subjects: '기하, 물리학',
              keyVariables: ["최고난이도 쌍기사(건축/시공안전)와 시공기술사 면허", "도면 오차율 제로와 구조물 원가/공기를 조율하는 리더십", "극강의 카리스마 및 대외/대관 관공서 네트워크 대처", "척박한 오지 현장에서 생존할 수 있는 강인한 야전형 체력"],
              diversePaths: ["메이저 1군 래미안/디에이치 등 최고가 아파트 현장 총사령관 소장", "가혹한 사막/오지 개척 신규 스마트시티(Neom 등) 파견 본부장", "한국도로공사, LH 공사 등 공공 시설물 토목 전문 감리/심위 결재권자", "국토부/지방청 도시 계획 담당 및 중앙 정부 건물 안전 심사 장관", "독자적 하도급/시공 사업권을 가진 건설 디벨로퍼 대표 창업"],
              roadmap: ['건축/토목 학과 탑 성적', '쌍기사(건축/안전기사) 및 시공기술사 면허 취득 행군 돌입', '1군 대건설사 공채 통과', '주요 아파트 및 해외 랜드마크 현장 총소장 등극'],
              tiers: [
                { level: 'Tier 1', desc: '삼성/현대 등 메이저 1군 기업 해외 대형 프로젝트 및 최고가 브랜드 아파트 총구축 소장' },
                { level: 'Tier 2', desc: '안정적인 공공기관(주택공사/도로공사 등) 정규직 현장 감리/결정권자' },
                { level: 'Tier 3', desc: '지역 소규모 철콘/단종 면허 하청업체 공무 파트' }
              ]
            },
            { name: '경찰 간부 (범죄조사)', major: '경찰행정/법학', subjects: '정치와법, 교련, 체육',
              keyVariables: ["경찰대학(수석) 혹은 간부후보생 시험 최상위권 취득의 두뇌", "지능 범죄를 파훼하는 형법적 지식과 데이터 추리 직관력", "목숨이 오가는 상황의 실전 신체 방어 무술 및 팀원 오더 리더십", "참혹한 강력 범죄 현장의 스트레스를 견뎌내는 정신적 사명감/멘탈리티"],
              diversePaths: ["권력 엘리트 코스 경찰청 본청 기획/보안 총괄 및 주요 서장 영전", "수도권 일급 관서 광역수사대 및 형사 강력계 계장급 현장 책임자", "대형 IT/복합 대기업의 보안/기업윤리 컴플라이언스 총괄 임원 특채", "국가정보원 대테러 실무, 검찰/사이버사령부 특수 요원 이적 스카우트", "강력한 경호 병력 보유 사설 VIP 전담 경호 부티크 및 탐정 법인 설립"],
              roadmap: ['체력 고과 및 법학 스터디', '경찰대학 졸업 혹은 간부후보생(준고시급) 시험 패스', '전국 단위 경찰 인재개발원 1위 그룹 졸업 후 경위 임관', '광역수사대 요직 부임'],
              tiers: [
                { level: 'Tier 1', desc: '경찰청 본청 보안국/수사국 총경 라인 핵심 지휘부 승진 영전 (연금/국가유공급 명예)' },
                { level: 'Tier 2', desc: '서울/수도권 일급 관서 광역수사대 및 형사 강력계 팀장급 리더' },
                { level: 'Tier 3', desc: '파출소/지구대 순찰 전담 지역 안전 요원' }
              ]
            }
        ]
    };
    
    // fallback if code not in exact dictionary
    let codeMatrix = code;
    if(!jobsData[code]) {
        codeMatrix = topType + (topType === 'R' ? 'I' : topType === 'I' ? 'A' : topType === 'A' ? 'S' : topType === 'S' ? 'E' : topType === 'E' ? 'S' : 'R');
    }
    const recommendedJobs = jobsData[codeMatrix] || jobsData['IR'];

    const resultHTML = `
        <div id="result_view" class="view active result-screen" style="max-width: 1200px; width: 100%;">
            <div class="glass-card result-container" style="max-width: 100%;">
                <div class="badge" style="margin-bottom:1rem; padding: 0.5rem 1.2rem; font-size: 1.1rem;">RIASEC 정밀 진단 결과</div>
                <h1 style="font-size: 3rem; margin-bottom: 0.5rem; color: #fff;">${code} 유형</h1>
                <p style="font-size:1.4rem; color:#a8a2ff; margin-bottom: 1.5rem; font-weight: 700;">${typeDesc[topType]} & ${typeDesc[secondType]}</p>
                <img src="${IMAGES.hero}" class="result-image" style="width: 200px; height: 200px; margin-bottom: 2rem;" />
                
                <div class="roadmap-box" style="margin-top: 2rem; background: rgba(0,0,0,0.5); text-align: left; padding: 3rem; border-radius: 20px;">
                    <h3 style="font-size: 2rem; margin-bottom: 2.5rem; color: #fff; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem;">🏆 프리미엄 직업 로드맵 딥다이브 (TOP 3)</h3>
                    
                    ${recommendedJobs.map((j, idx) => `
                        <details class="job-accordion" ${idx === 0 ? 'open' : ''}>
                            <summary>
                                <span>💼 ${j.name}</span>
                                <span class="accordion-icon"><i data-lucide="chevron-down"></i> 자세히 보기</span>
                            </summary>
                            
                            <div class="job-details-content">
                                <div style="display: flex; gap: 2.5rem; margin-bottom: 2.5rem; flex-wrap: wrap; background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                                    <div style="font-size: 1.1rem; color: #fff; flex: 1; min-width: 250px;"><strong>🎓 핵심 추천 전공:</strong> <span style="color:#e2e8f0; margin-left: 0.5rem; display:block; margin-top:0.5rem; font-size:1.2rem;">${j.major}</span></div>
                                    <div style="font-size: 1.1rem; color: #fff; flex: 1; min-width: 250px;"><strong>📚 추천 고교 선택과목:</strong> <span style="color:#e2e8f0; margin-left: 0.5rem; display:block; margin-top:0.5rem; font-size:1.2rem;">${j.subjects}</span></div>
                                </div>

                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem;">
                                    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 1.5rem;">
                                        <h4 style="color:#34d399; margin-top: 0; margin-bottom: 1rem; font-size: 1.2rem; display:flex; align-items:center; gap:0.5rem;">⚡ 핵심 진입 변수 (Key Variables)</h4>
                                        <ul style="margin: 0; padding-left: 1.2rem; color: #e2e8f0; line-height: 1.6;">
                                            ${j.keyVariables ? j.keyVariables.map(v => `<li>${v}</li>`).join('') : '<li>데이터 준비중</li>'}
                                        </ul>
                                    </div>
                                    <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; padding: 1.5rem;">
                                        <h4 style="color:#fb7185; margin-top: 0; margin-bottom: 1rem; font-size: 1.2rem; display:flex; align-items:center; gap:0.5rem;">🔮 다양한 진로 확장 (Diverse Paths)</h4>
                                        <ul style="margin: 0; padding-left: 1.2rem; color: #e2e8f0; line-height: 1.6;">
                                            ${j.diversePaths ? j.diversePaths.map(p => `<li>${p}</li>`).join('') : '<li>데이터 준비중</li>'}
                                        </ul>
                                    </div>
                                </div>
                                
                                <h4 style="color:#60a5fa; margin-bottom: 1.5rem; font-size: 1.3rem;">🚀 커리어 확장 스텝업 로드맵 (Path)</h4>
                                <div style="display: flex; gap: 0.8rem; align-items: center; flex-wrap: wrap; margin-bottom: 3rem;">
                                    ${j.roadmap.map((step, idx) => `
                                        <div style="background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); padding: 0.8rem 1.2rem; border-radius: 8px; font-weight: 700; color: #fff; font-size: 1rem;">${idx + 1}. ${step}</div>
                                        ${idx < j.roadmap.length - 1 ? `<span style="color:#818cf8; font-size:1.5rem; display: flex; align-items: center; margin: 0 0.2rem;">➔</span>` : ''}
                                    `).join('')}
                                </div>
                                
                                <h4 style="color:#f472b6; margin-bottom: 1.5rem; font-size: 1.3rem;">🏢 직업별 선호도 및 성공 분기 (Tiers)</h4>
                                <div style="display: flex; flex-direction: column; gap: 1rem;">
                                    ${j.tiers.map(t => `
                                        <div style="background: rgba(0,0,0,0.3); padding: 1.2rem 1.5rem; border-radius: 8px; display: flex; gap: 1.5rem; align-items: center; border-left: 4px solid ${t.level==='Tier 1'?'#fbbf24': t.level==='Tier 2'?'#9ca3af' : '#b45309'}">
                                            <div style="background: ${t.level==='Tier 1'?'#fbbf24': t.level==='Tier 2'?'#9ca3af' : '#b45309'}; color: ${t.level==='Tier 2'?'#000':'#000'}; font-weight: 900; padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.95rem; text-align: center; min-width: 65px;">${t.level}</div>
                                            <div style="color: #f8fafc; font-size: 1.1rem; line-height: 1.6;">${t.desc}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </details>
                    `).join('')}
                </div>
                
                <div class="roadmap-box" style="margin-top: 3rem; padding: 3rem; text-align: center;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2.5rem;">📊 나의 가치관 분석 시각화</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; text-align: left; max-width: 900px; margin: 0 auto;">
                        <div class="stat-bar"><span class="label" style="font-size: 1.1rem; margin-bottom: 0.8rem;">💰 초봉 및 기대 소득 (Salary)</span><div class="bar-bg" style="height:20px; border-radius:10px;"><div class="bar-fill" style="width:${(appState.answers.values.salary/5)*100}%; border-radius:10px;"></div></div></div>
                        <div class="stat-bar"><span class="label" style="font-size: 1.1rem; margin-bottom: 0.8rem;">⚖️ 워라밸 및 자율성 (Work-Life)</span><div class="bar-bg" style="height:20px; border-radius:10px;"><div class="bar-fill" style="width:${(appState.answers.values.worklife/5)*100}%; border-radius:10px;"></div></div></div>
                        <div class="stat-bar"><span class="label" style="font-size: 1.1rem; margin-bottom: 0.8rem;">🛡️ 고용 안정성 (Stability)</span><div class="bar-bg" style="height:20px; border-radius:10px;"><div class="bar-fill" style="width:${(appState.answers.values.stability/5)*100}%; border-radius:10px;"></div></div></div>
                        <div class="stat-bar"><span class="label" style="font-size: 1.1rem; margin-bottom: 0.8rem;">🌍 사회 파급력 (Impact)</span><div class="bar-bg" style="height:20px; border-radius:10px;"><div class="bar-fill" style="width:${(appState.answers.values.impact/5)*100}%; border-radius:10px;"></div></div></div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 4rem;">
                    <button class="btn back-btn" onclick="goHome()" style="font-size: 1.2rem; padding: 1.2rem 3rem;">메인보드로 돌아가기</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('app').innerHTML = resultHTML;
    if(window.lucide) window.lucide.createIcons();
}

/* --- QUEST RENDERER --- */
function renderQuestStage() {
    const jobData = questData[appState.quest.activeJobId];
    const stageData = jobData.stages[appState.quest.stage];

    if (!stageData) {
        showQuestResult();
        return;
    }

    const progress = (appState.quest.stage / jobData.stages.length) * 100;

    let contentHTML = '';

    if (stageData.type === 'quiz') {
        contentHTML = renderQuizTemplate(stageData);
    } else if (stageData.type === 'interactive') {
        contentHTML = renderInteractiveTemplate(stageData);
    } else if (stageData.type === 'allocation') {
        contentHTML = renderAllocationTemplate(stageData);
    } else if (stageData.type === 'match') {
        contentHTML = renderMatchTemplate(stageData);
    }

    const viewHTML = `
        <div id="quest_view" class="view active">
            <div class="glass-card question-container game-mode-card" style="max-width: 900px;">
                <div class="badge" style="background:#10b981; margin-bottom: 2rem;">Stage ${appState.quest.stage + 1} / ${jobData.stages.length}</div>
                
                <h2 style="font-size: 2rem; color: #fff; margin-bottom: 0.5rem;">${stageData.title}</h2>
                <p style="color: #cbd5e1; font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.6;">${stageData.desc}</p>
                
                <div class="progress-bar" style="margin-bottom: 3rem;">
                    <div id="progress_fill" class="progress-fill" style="width: ${progress}%; background: linear-gradient(90deg, #10b981, #059669);"></div>
                </div>

                ${contentHTML}
            </div>
        </div>
    `;

    document.getElementById('app').innerHTML = viewHTML;
}

function renderQuizTemplate(stageData) {
    if (appState.quest.qTempIndex === undefined) appState.quest.qTempIndex = 0;
    const qData = stageData.questions[appState.quest.qTempIndex];

    const isLast = appState.quest.qTempIndex === stageData.questions.length - 1;

    let html = `
        <div style="text-align: left; background: rgba(0,0,0,0.2); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
            <div style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">문제 ${appState.quest.qTempIndex + 1} / ${stageData.questions.length}</div>
            <h3 style="font-size: 1.3rem; color: #fff; white-space: pre-line; line-height: 1.6;">${qData.q}</h3>
        </div>
        <div class="options-grid">
            ${qData.options.map((opt, idx) => `
                <button class="option-btn game-btn" onclick="handleQuizAnswer(${idx}, ${qData.answer}, ${isLast}, ${stageData.passScore})">${opt}</button>
            `).join('')}
        </div>
    `;
    return html;
}

window.handleQuizAnswer = function(selectedIdx, correctIdx, isLast, passScore) {
    let message = "";
    if (selectedIdx === correctIdx) {
        appState.quest.tempScore++;
        message = "✅ 정답입니다!\n\n";
    } else {
        message = "❌ 오답입니다.\n\n";
    }

    const jobData = questData[appState.quest.activeJobId];
    const stageData = jobData.stages[appState.quest.stage];
    const totalQuestions = stageData.questions.length;
    const questionsAnswered = appState.quest.qTempIndex + 1;
    const remainingQuestions = totalQuestions - questionsAnswered;

    if (!isLast && (appState.quest.tempScore + remainingQuestions < passScore)) {
        alert(message + `😢 불합격입니다. (현재 ${appState.quest.tempScore}점)\n오답 누적으로 합격 기준점(${passScore}점)에 도달할 수 없어 퀘스트를 조기 종료합니다.`);
        init(); // Fail fast
        return;
    }

    if (isLast) {
        if (appState.quest.tempScore >= passScore) {
            alert(message + `🎉 퀘스트 통과! (${appState.quest.tempScore}/${passScore}점)\n다음 단계로 이동합니다.`);
            appState.quest.stage++;
            appState.quest.tempScore = 0;
            appState.quest.qTempIndex = 0;
            renderQuestStage();
        } else {
            alert(message + `😢 불합격입니다. (${appState.quest.tempScore}/${passScore}점)\n기초부터 다시 준비해야 합니다.`);
            init(); 
        }
    } else {
        alert(message + `다음 문제로 넘어갑니다. (현재 ${appState.quest.tempScore}점)`);
        appState.quest.qTempIndex++;
        renderQuestStage();
    }
};

function renderInteractiveTemplate(stageData) {
    let html = `
        <div style="background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
            <img src="${stageData.image}" alt="현장 단서" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;" />
            <div style="text-align: center; color: #94a3b8; font-size: 0.9rem; margin-bottom: 2rem;">${stageData.imgCaption}</div>
            
            <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; color: #fff; font-size: 1.2rem; line-height: 1.8; margin-bottom: 2rem;">
                ${stageData.prompt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${stageData.options.map((opt, idx) => `
                    <button class="option-btn game-btn" style="text-align: left; padding: 1.2rem;" onclick="handleInteractiveAnswer(${idx}, ${stageData.answer}, '${stageData.successMsg}', '${stageData.failMsg}')">
                        💡 ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    return html;
}

window.handleInteractiveAnswer = function(selectedIdx, correctIdx, successMsg, failMsg) {
    if (selectedIdx === correctIdx) {
        alert(successMsg.replace(/\*\*(.*?)\*\*/g, '$1'));
        appState.quest.stage++;
        renderQuestStage();
    } else {
        alert(failMsg.replace(/\*\*(.*?)\*\*/g, '$1'));
        alert("치명적인 실수로 패소/손실을 입었습니다. 처음부터 다시 시작하세요.");
        init();
    }
};

function renderAllocationTemplate(stageData) {
    let html = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            ${stageData.images.map(img => `
                <div>
                    <img src="${img.url}" alt="News" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 0.5rem;" />
                    <div style="text-align: center; color: #94a3b8; font-size: 0.85rem;">${img.caption}</div>
                </div>
            `).join('')}
        </div>
        
        <div style="background: rgba(0,0,0,0.2); padding: 2rem; border-radius: 12px;">
            <h3 style="color: #fff; margin-bottom: 1.5rem;">자산 포트폴리오 비중 설정 (총합 100%)</h3>
            <form id="allocationForm" style="display: flex; flex-direction: column; gap: 1rem;">
                ${Object.keys(stageData.assets).map(asset => `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
                        <label style="color: #e2e8f0; font-size: 1.1rem;">${asset}</label>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="number" id="asset_${asset}" min="0" max="100" value="0" style="width: 80px; padding: 0.5rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; border-radius: 6px; text-align: right;" onchange="updateTotalAllocation()" />
                            <span style="color: #94a3b8;">%</span>
                        </div>
                    </div>
                `).join('')}
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 2px solid rgba(255,255,255,0.2); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.3rem; color: #fff; font-weight: bold;">TOTAL:</span>
                    <span id="allocationTotal" style="font-size: 1.5rem; color: #ef4444; font-weight: bold;">0%</span>
                </div>
            </form>
            <button class="game-btn" style="width: 100%; margin-top: 2rem; background: #10b981; color: #000;" onclick="submitAllocation()">투자 실행 확정</button>
        </div>
    `;
    return html;
}

window.updateTotalAllocation = function() {
    const jobData = questData[appState.quest.activeJobId];
    const stageData = jobData.stages[appState.quest.stage];
    let total = 0;
    
    Object.keys(stageData.assets).forEach(asset => {
        const val = parseInt(document.getElementById(`asset_${asset}`).value) || 0;
        total += val;
    });
    
    const totalEl = document.getElementById('allocationTotal');
    totalEl.innerText = total + '%';
    totalEl.style.color = total === 100 ? '#10b981' : '#ef4444';
};

window.submitAllocation = function() {
    const jobData = questData[appState.quest.activeJobId];
    const stageData = jobData.stages[appState.quest.stage];
    let total = 0;
    let expectedReturn = 0;
    
    Object.keys(stageData.assets).forEach(asset => {
        const weight = parseInt(document.getElementById(`asset_${asset}`).value) || 0;
        total += weight;
        expectedReturn += (weight / 100) * stageData.assets[asset];
    });

    if (total !== 100) {
        alert("⚠️ 경고: 포트폴리오 비중의 합은 반드시 100%가 되어야 합니다.");
        return;
    }

    if (expectedReturn >= stageData.targetReturn) {
        alert(`📈 1년 뒤 결과: 당신의 포트폴리오는 약 +${expectedReturn.toFixed(1)}%의 수익을 냈습니다!\n고객들이 환호합니다. (합격)`);
        appState.quest.stage++;
        renderQuestStage();
    } else {
        alert(`📉 1년 뒤 결과: 당신의 포트폴리오는 약 ${expectedReturn.toFixed(1)}%의 수익을 냈습니다. (목표수익률 ${stageData.targetReturn}% 미달)\n고객들이 자금을 회수합니다. 파면당했습니다.`);
        init();
    }
};

function renderMatchTemplate(stageData) {
    if (appState.quest.sTempIndex === undefined) appState.quest.sTempIndex = 0;
    
    const sData = stageData.scenarios[appState.quest.sTempIndex];
    if (!sData) {
        return '';
    }

    let html = `
        <div style="display: flex; gap: 2rem; background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; align-items: center;">
            <img src="${sData.img}" alt="학생 상태" style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%; border: 4px solid rgba(255,255,255,0.1);" />
            <div>
                <h3 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">🚨 상황 포착</h3>
                <p style="color: #e2e8f0; font-size: 1.1rem; line-height: 1.6; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px;">
                    "${sData.caption}"
                </p>
            </div>
        </div>
        
        <h4 style="color: #94a3b8; margin-bottom: 1rem; text-align: center;">어느 기관으로 학생을 연계하시겠습니까?</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;">
            ${sData.options.map((opt, idx) => `
                <button class="option-btn game-btn" style="font-size: 1.1rem; padding: 2rem 1rem;" onclick="handleMatchAnswer(${idx}, ${sData.answer}, '${sData.feedback}')">
                    지원기관:<br/><strong>${opt}</strong>
                </button>
            `).join('')}
        </div>
    `;
    return html;
}

window.handleMatchAnswer = function(selectedIdx, correctIdx, feedback) {
    const jobData = questData[appState.quest.activeJobId];
    const stageData = jobData.stages[appState.quest.stage];

    if(selectedIdx === correctIdx) {
        alert("올바른 조치입니다!\n\n" + feedback);
        appState.quest.sTempIndex++;
        
        if (appState.quest.sTempIndex >= stageData.scenarios.length) {
            alert("모든 위기 학생을 올바른 기관으로 안내했습니다! 퀘스트 통과!");
            appState.quest.stage++;
            appState.quest.sTempIndex = 0;
        }
        renderQuestStage();
    } else {
        alert("올바르지 않은 조치입니다. 학생의 거부감이 심화되었습니다. (실패)");
        init();
    }
};

function showQuestResult() {
    const jobData = questData[appState.quest.activeJobId];
    
    // Generate roadmap HTML
    const roadmapHTML = jobData.roadmap ? `
        <div style="background: rgba(0,0,0,0.4); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); text-align: left;">
            <h3 style="color: #60a5fa; margin-bottom: 1.5rem; font-size: 1.4rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.8rem;">🚀 커리어 확장 스텝업 로드맵</h3>
            <div style="display: flex; gap: 0.8rem; align-items: stretch; flex-wrap: wrap;">
                ${jobData.roadmap.map((step, idx) => `
                    <div style="background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); padding: 1rem 1.2rem; border-radius: 8px; color: #fff; font-size: 1rem; flex: 1; min-width: 200px; line-height: 1.5;">
                        <span style="color: #818cf8; font-weight: 900; margin-right: 0.5rem; font-size: 1.1rem;">${idx + 1}.</span>${step}
                    </div>
                    ${idx < jobData.roadmap.length - 1 ? `<div style="display: flex; align-items: center; justify-content: center; color:#818cf8; font-size:1.5rem; min-width: 20px;">➔</div>` : ''}
                `).join('')}
            </div>
        </div>
    ` : '';

    // Generate tiers HTML
    const tiersHTML = jobData.tiers ? `
        <div style="background: rgba(0,0,0,0.4); padding: 2rem; border-radius: 12px; margin-bottom: 3rem; border: 1px solid rgba(255,255,255,0.1); text-align: left;">
            <h3 style="color: #f472b6; margin-bottom: 1.5rem; font-size: 1.4rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.8rem;">🏢 직업별 선호도 및 성공 분기 (Tiers)</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${jobData.tiers.map(t => `
                    <div style="background: rgba(0,0,0,0.3); padding: 1.2rem 1.5rem; border-radius: 8px; display: flex; gap: 1.5rem; align-items: center; border-left: 4px solid ${t.level==='Tier 1'?'#fbbf24': t.level==='Tier 2'?'#9ca3af' : '#b45309'}">
                        <div style="background: ${t.level==='Tier 1'?'#fbbf24': t.level==='Tier 2'?'#9ca3af' : '#b45309'}; color: ${t.level==='Tier 2'?'#000':'#000'}; font-weight: 900; padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.95rem; text-align: center; min-width: 65px;">${t.level}</div>
                        <div style="color: #f8fafc; font-size: 1.1rem; line-height: 1.6;">${t.desc}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    const resultHTML = `
        <div id="result_view" class="view active result-screen" style="max-width: 900px;">
            <div class="glass-card result-container game-mode-card" style="text-align: center; padding: 3rem;">
                <div style="font-size: 5rem; margin-bottom: 1rem;">${jobData.icon}</div>
                <div class="badge" style="background:#10b981; margin-bottom:1rem; font-size: 1.1rem; padding: 0.5rem 1rem;">직무 시뮬레이션 클리어</div>
                <h1 style="color: #fff; font-size: 2.5rem; margin-bottom: 1.5rem;">[${jobData.title}]의 자격을 증명했습니다!</h1>
                
                <p style="color: #cbd5e1; font-size: 1.2rem; line-height: 1.8; margin-bottom: 2.5rem; background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px;">
                    치열한 선발 과정과 실무 위기 대처 능력을 모두 검증받았습니다.<br/>
                    이 직업에 필요한 지식과 실무 역량이 당신의 가능성과 연결됨을 확인했습니다.
                </p>

                ${roadmapHTML}
                ${tiersHTML}
                
                <h3 style="color: #fff; font-size: 1.4rem; margin-top: 1rem; margin-bottom: 2rem;"><strong>이제 튜토리얼을 끄고, 진짜 당신의 커리어 패스를 개척하세요!</strong></h3>
                
                <button class="btn back-btn" onclick="init()" style="font-size: 1.2rem; padding: 1.2rem 3rem;">메인 대시보드로 복귀</button>
            </div>
        </div>
    `;
    
    document.getElementById('app').innerHTML = resultHTML;
    createParticles();
}

function createParticles() {
    const container = document.getElementById('result_view');
    for(let i=0; i<40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.background = Math.random() > 0.5 ? '#10b981' : '#3b82f6';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${2 + Math.random() * 3}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(particle);
    }
}

window.goHome = () => {
    init();
}

// Start
window.onload = init;
