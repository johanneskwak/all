const fs = require('fs');

const path = 'C:/Users/halah/.gemini/antigravity/scratch/career-app/app.js';
let content = fs.readFileSync(path, 'utf8');

const replacement = `    const jobsData = {
        'RI': [
            { name: '로봇/자율주행 공학자', major: '기계/컴퓨터공학', subjects: '물리학, 미적분, 정보', 
              roadmap: ['명문 공대 관련학과 입학', '학부 연구생 및 랩실 인턴', 'AI/로보틱스 석사 수료', '국내외 테크기업 R&D 합격'],
              tiers: [
                { level: 'Tier 1', desc: '테슬라, 현대자동차 등 코어 로보틱스 리드 (초봉 8천~1억+)' },
                { level: 'Tier 2', desc: '자율주행/로봇 분야 유망 테크 스타트업 책임 연구원' },
                { level: 'Tier 3', desc: '일반 제조업 자동화 설비 담당 엔지니어' }
              ]
            },
            { name: '전기 설비 설계자', major: '전기전자공학', subjects: '물리학, 공업수학',
              roadmap: ['전기전자공학부 졸업', '전기기사/쌍기사 자격증 취득', 'NCS 수석 및 실무 역량 개발', '대기업/공기업 입사'],
              tiers: [
                { level: 'Tier 1', desc: '한국전력공사 등 최상위 공기업 및 삼성전자 인프라 (초봉 6천~)' },
                { level: 'Tier 2', desc: '1군 건설사 플랜트/전기사업부' },
                { level: 'Tier 3', desc: '중견/중소기업 전기 설계 담당' }
              ]
            },
            { name: '항공기 정비사', major: '항공정비학', subjects: '기하, 물리학',
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
              roadmap: ['수학/통계/CS 학사', '캐글(Kaggle) 및 AI 공모전 입상', '데이터사이언스 대학원 진학', 'IT 플랫폼 기업 입사'],
              tiers: [
                { level: 'Tier 1', desc: '네이버, 카카오 등 빅테크 AI 코어 리서처 (초봉 8천~1.2억)' },
                { level: 'Tier 2', desc: '금융권/유니콘 스타트업 데이터 전담 분석가' },
                { level: 'Tier 3', desc: '일반 SI 데이터 엔지니어' }
              ]
            },
            { name: '신소재 연구원', major: '신소재공학/화학공학', subjects: '화학, 물리학',
              roadmap: ['관련 공대 입학', '소재/배터리 랩실 학부연구생', '석/박사 과정 중 SCI급 논문 게재', '대기업 R&D센터 입사'],
              tiers: [
                { level: 'Tier 1', desc: 'LG에너지솔루션, SK 등 메인 배터리/소재 랩 (초봉 7천+)' },
                { level: 'Tier 2', desc: '중견 반도체/디스플레이 장비 소재 파트' },
                { level: 'Tier 3', desc: '일반 벤처기업 연구보조원' }
              ]
            },
            { name: '의사 (연구/병리)', major: '의과대학', subjects: '생명과학, 화학',
              roadmap: ['의과대학 입학', '의사 국가고시 통과', '인턴/레지던트 진단검사의학과/병리과 전수', '전문의 취득 및 펠로우 수료'],
              tiers: [
                { level: 'Tier 1', desc: '빅5 대형 종합병원 임상교수 및 분원 과장 (연봉 2억+)' },
                { level: 'Tier 2', desc: '지방 대학병원 및 종합병원 스태프' },
                { level: 'Tier 3', desc: '진단검사 전문 수탁 기관 의료진' }
              ]
            }
        ],
        'IA': [
            { name: '정신과 의사', major: '의과대학', subjects: '생명과학, 심리학',
              roadmap: ['의과대학 입학 (최상위 성적)', '의사 국가고시 통과', '인턴 수료 후 정신의학과 레지던트 수련', '전문의 자격 취득 및 펠로우 수료'],
              tiers: [
                { level: 'Tier 1', desc: '빅5 병원 임상교수 및 초특급 프라이빗 개원 (억대 연봉)' },
                { level: 'Tier 2', desc: '지방 종합병원 스태프 및 중대형 병원 페이닥터' },
                { level: 'Tier 3', desc: '소규모 개인 의원 및 요양병원 봉직의' }
              ]
            },
            { name: 'UX/UI 리서처', major: '인지심리학/디자인', subjects: '사회문화, 심리학',
              roadmap: ['인문/디자인 융합 전공 학사', '사용자 조사 및 포트폴리오 구축', '기업 UX 랩실 인턴십', 'IT 대기업 프로덕트 그룹 입사'],
              tiers: [
                { level: 'Tier 1', desc: '구글, 토스, 라인 등 최상위 IT 기업 리드 리서처' },
                { level: 'Tier 2', desc: '국내 대견 에이전시 시니어 기획자' },
                { level: 'Tier 3', desc: '소형 웹에이전시 UX 담당' }
              ]
            },
            { name: 'AI 윤리 연구원', major: '철학/컴퓨터공학', subjects: '생활과 윤리, 정보',
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
              roadmap: ['기초 프로그래밍 학습', '개인 런칭 (React/Vue 등)', '개발 부트캠프 수료 (우테코 등)', '테스팅/알고리즘 코테 최종합격'],
              tiers: [
                { level: 'Tier 1', desc: '네카라쿠배 프론트엔드 시니어 (초봉 6~8천)' },
                { level: 'Tier 2', desc: '시리즈B 이상 유망 테크 스타트업 리드 개발자' },
                { level: 'Tier 3', desc: '일반 SI/SM 및 소형 웹에이전시 사원' }
              ]
            },
            { name: '테크니컬 아티스트(TA)', major: '멀티미디어학', subjects: '정보, 미술',
              roadmap: ['3D 모델링 및 엔진(Unreal/Unity) 마스터', '쉐이더 코딩 기술 습득', '융합 포트폴리오 완성', '대형 게임사 공채 합격'],
              tiers: [
                { level: 'Tier 1', desc: '엔씨/넥슨/크래프톤 등 3N/2K 최상위 게임사 TA 파트장' },
                { level: 'Tier 2', desc: '중견 글로벌 아트 스튜디오 및 외주 TA' },
                { level: 'Tier 3', desc: '소형 모바일 인디게임 개발팀 엔지니어' }
              ]
            },
            { name: '산업/제품 디자이너', major: '산업디자인', subjects: '미술, 기하',
              roadmap: ['산업디자인 전공 입학', '국제 어워드 출품 (Red Dot, iF)', '산학협력 인턴', '글로벌 제조사 디자인센터 입사'],
              tiers: [
                { level: 'Tier 1', desc: '삼성전자/현대차 선행디자인 및 애플 본사 등 (글로벌 탑티어)' },
                { level: 'Tier 2', desc: '국내 유수 디자인 에이전시 및 대기업 가전 파트' },
                { level: 'Tier 3', desc: '소비재/가구 중소기업 인하우스 디자이너' }
              ]
            }
        ],
        'AS': [
            { name: '방송 크리에이터/PD', major: '미디어/언론홍보', subjects: '사회문화, 국어',
              roadmap: ['방송/영상 관련 학회 스펙 빌딩', '공모전 및 개인 채널 흥행', '언론고시 준비 및 방송사 인턴십', '메인 조연출 최종 합격'],
              tiers: [
                { level: 'Tier 1', desc: '지상파 3사 및 나영석/김태호 급 메인 연출 PD (스타 PD시 백지수표)' },
                { level: 'Tier 2', desc: '유명 종편/티빙/넷플릭스 등 OTT 및 대형 유튜브 스튜디오 PD' },
                { level: 'Tier 3', desc: '소규모 외주 프로덕션 조연출' }
              ]
            },
            { name: '예술 심리 치료사', major: '심리학/미술치료학', subjects: '심리학, 미술',
              roadmap: ['심리/예술 학부 전공', '미술상담치료 대학원 석사 진학', '임상수련 자격증 수료 (3천 시간 이상)', '국가 인증 임상심리사 취득'],
              tiers: [
                { level: 'Tier 1', desc: '대형 병원 정신건강센터 마스터 급 및 프라이빗 최고급 센터 소장' },
                { level: 'Tier 2', desc: '국공립 아동 상담센터/위센터 정규직 (안정적)' },
                { level: 'Tier 3', desc: '지역 소형 복지관 계약직 카운셀러 및 프리랜서' }
              ]
            },
            { name: '카피라이터', major: '광고홍보학', subjects: '문학, 사회문화',
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
              roadmap: ['심리학부 이수', '임상/상담 심리 석사 학위 취득', '국가 보건복지부 특수임상수련(1~3년)', '1급 자격 부여 전문 카운셀러'],
              tiers: [
                { level: 'Tier 1', desc: '대기업 임직원 상담센터(EAP) 인하우스 심리사 (대기업 수준 연봉/복지)' },
                { level: 'Tier 2', desc: '명문대학 학생생활상담센터 및 지방자치단체 소속 정규직' },
                { level: 'Tier 3', desc: '유료 개인상담센터 시간당 수련/파트타임' }
              ]
            },
            { name: '특수 교육 교사', major: '특수교육학', subjects: '교육학, 생명과학',
              roadmap: ['교육과 및 특수교육 학위 입학', '필수 전공 학점 올A+ 이수 및 교생 실습', '초고난도 임용고시 패스', '국공립 특수학교 정교사 임용'],
              tiers: [
                { level: 'Tier 1', desc: '국공립 특수학교/특수학급 정규 교사 (철밥통, 연금, 훌륭한 방학 혜택)' },
                { level: 'Tier 2', desc: '처우가 우수한 재단 소속 상위 사립 특수학교 교사' },
                { level: 'Tier 3', desc: '기간제 무기계약직 보조 특수 교사' }
              ]
            },
            { name: '조직문화 담당자 (Culture Corp)', major: '경영/사회학', subjects: '사회문화, 경제',
              roadmap: ['인사/조직 학회 출신 학사', '조직개발/HRD 인턴 경험', 'IT 빅테크 피플팀(People) 공채 입사', '전사 문화 개선 프로젝트 총괄'],
              tiers: [
                { level: 'Tier 1', desc: '토스/당근/카카오 등 워라밸과 복지 끝판왕 피플 리드 팀장급' },
                { level: 'Tier 2', desc: '전통적 그룹계열사/금융권 인사지원 및 교육 파트 파트장' },
                { level: 'Tier 3', desc: '일반 중소/중견 인사, 총무 짬뽕 담당사원' }
              ]
            }
        ],
        'SE': [
            { name: '노무사 (공인노무사)', major: '법학/경영학', subjects: '경제, 정치와법',
              roadmap: ['경영/법학 계열 진학 및 노동법 스터디', '고시반 입실 및 전업 수험 (평균 3년)', '1/2/3차 시험 최종 패스', '메이저 노무법인 파트너/사내변급 인하우스 합류'],
              tiers: [
                { level: 'Tier 1', desc: '전국 탑티어 메이저 노무법인 파트너 및 대기업/공기업 사내 전임 노무사 (연봉 1.5억 이상)' },
                { level: 'Tier 2', desc: '수도권 중형 전문 노무법인 소속 고용 노무사 (기본급+인센)' },
                { level: 'Tier 3', desc: '지방권 소형 법인 근무 및 막 개업 수익 불안정 구간' }
              ]
            },
            { name: 'HR/인재개발 매니저', major: '경영/심리', subjects: '경제, 심리학',
              roadmap: ['경영/인사조직 이수', '채용/평가/보상(C&B) 실무 커리어', '글로벌 HR 자격(PHR 등) 취득 및 MBA', 'HR 비즈니스 파트너(HRBP) 핵심 임원 진급'],
              tiers: [
                { level: 'Tier 1', desc: '삼성, SK, 현대차 그룹 컨트롤타워 인사/조직기획 전략 임원코스 (억대 대우)' },
                { level: 'Tier 2', desc: '최고 외국계 기업 (보쉬, 구글 등) 로컬 HR 제너럴리스트 (연 8천~)' },
                { level: 'Tier 3', desc: '일반 채용 에이전시 헤드헌터 및 외주 채용 담당관' }
              ]
            },
            { name: '병원 행정 원무장', major: '보건행정학', subjects: '생활과윤리, 정치와법',
              roadmap: ['보건행정/경영 전공', '보건의료정보관리사 국가면허 취득', '대학병원 정규직 입사 후 각 파트 순환 근무', '기획/총무 핵심 보직 과장 이상 승진'],
              tiers: [
                { level: 'Tier 1', desc: '서울아산, 삼성서울 등 빅5 대학병원 기획조정실 실장/행정처장 급 (1억 내외)' },
                { level: 'Tier 2', desc: '지역 거점 국립대 부속 병원 및 2차 대형 종합병원 원무 행정 과장' },
                { level: 'Tier 3', desc: '보통의 개인 병의원 및 네트워크 의원 원무 실장급' }
              ]
            }
        ],
        'ES': [
            { name: '변호사', major: '자유전공/법학', subjects: '정치와법, 비문학, 철학',
              roadmap: ['SKY 등 명문대 최상위 학점 학사 졸업', '법학적성시험(LEET) 초고득점', '법학전문대학원(로스쿨) 3년 수석권 수료/변호사 시험 합격', '신입 어소시에이트 입사'],
              tiers: [
                { level: 'Tier 1', desc: '김·장, 광장, 태평양, 세종, 율촌 등 초대형 펌 (초봉 1.5억 기본, 파트너시 수십억)' },
                { level: 'Tier 2', desc: '대기업/공기업 사내변호사(인하우스) 및 대륙아주/YK 등 네트워크 로펌 (초봉 8천~1억+워라밸 확보)' },
                { level: 'Tier 3', desc: '서초동 소형 법률사무소 취직 및 고용변호사 / 개인 사무소 개업 (초봉 6천~ / 영업에 따라 다름)' }
              ]
            },
            { name: '전략 컨설턴트 (MBB)', major: '경영학/경제학', subjects: '경제, 확률과통계',
              roadmap: ['국내외 초일류 명문대 수석권', '핵심 경영전략 학회 활약 및 학부 인턴십', '극악의 케이스 인터뷰(Case Interview) 돌파', '주요 컨설팅사 입사'],
              tiers: [
                { level: 'Tier 1', desc: 'MBB (McKinsey, BCG, Bain) Business Analyst (신입 1억 육박, 워라밸 전무)' },
                { level: 'Tier 2', desc: 'Big 4 펌 (딜로이트, PWC, EY, KPMG) 전략 컨설팅 부서 (Deal/FAS 등)' },
                { level: 'Tier 3', desc: '국내 로컬/중견 전문 컨설팅 펌 시니어 및 부티크 컨설팅' }
              ]
            },
            { name: '글로벌 세일즈 상사맨', major: '국제통상/어문', subjects: '영어, 세계지리',
              roadmap: ['2개 국어(영어/제2외국어) 네이티브 수준 마스터', '포스코인터/LX인터 등 대기업 종합상사 및 B2B영업 합격', '주재원 파견 후 현지 시장 장악', '지사장 승진'],
              tiers: [
                { level: 'Tier 1', desc: '삼성전자 반도체/포스코 대형 해외주재 법인장 (파견 체류비 포함 2억 혜택+)' },
                { level: 'Tier 2', desc: '글로벌 중견 제조회사 글로벌 영업 파트장급' },
                { level: 'Tier 3', desc: '소규모 무역 상사 수출입 오퍼레이터 및 일반 영업사원' }
              ]
            }
        ],
        'EC': [
            { name: '공인회계사 (CPA)', major: '경영/경제/회계', subjects: '기하, 확률과통계, 경제',
              roadmap: ['상위권 경영대학 입학 밑 필수과목 선이수', 'CPA 전문 고시반 2~4년 휴학 및 몰입', '2차 유예 없이 초시 합격', '초호황기 4대 회계법인 본부 최종 오퍼 수락'],
              tiers: [
                { level: 'Tier 1', desc: '삼일, 삼정, 한영, 안진 등 Big4 파트너 및 대기업 CFO 재무/C-Level 감사역 (연봉 엄청남)' },
                { level: 'Tier 2', desc: 'Big4 5년차 택스/딜 부서 시니어 및 우량 금융권(IB/VC) 내부 회계사' },
                { level: 'Tier 3', desc: '개인 세무/기장 개업 시장 진입 (영업력 절대 의존)' }
              ]
            },
            { name: '펀드 매니저/IB 뱅커', major: '경제학/금융/수학', subjects: '경제, 미적분',
              roadmap: ['경영 경제 석사 및 MBA', '특급 인턴 및 CFA (국제재무분석사) 3레벨 전체 패스', '여의도 대형 증권사 리서치 RA 입사', '메인 운용 매니저 등록 및 수백억 굴림'],
              tiers: [
                { level: 'Tier 1', desc: '탑티어 골드만삭스, 블랙록, 맥쿼리 등 글로벌 자산운용 메인 플레이어 (인센티브 무제한)' },
                { level: 'Tier 2', desc: '국내 메이저 증권사(미래에셋, 한국투자 등) 스타 애널리스트 및 IB 본부 팀장' },
                { level: 'Tier 3', desc: '일반 자산운용/투자자문사 말단 리서쳐' }
              ]
            },
            { name: '세무사', major: '조세/세무회계', subjects: '수학, 경제',
              roadmap: ['학업 중 조세 특화 수험 (회계학/세법 강행군)', '세무사(CTA) 2차 합격 후 동차', '초기 세무법인 6개월 수습 및 네트워크 확보', '개인 특화 세무사로 독립'],
              tiers: [
                { level: 'Tier 1', desc: '스타트업/연예인 전담 대형 세무 기장 법인 대표 원장급 개업' },
                { level: 'Tier 2', desc: '업계 유명 대형 세무법인(세무서 출신 대표) 근로 세무사 (안정/중상위 퀄)' },
                { level: 'Tier 3', desc: '영세 개인 사무실 신입 수습기 (최하 소득 구간 통과시기)' }
              ]
            }
        ],
        'CE': [
            { name: '감정평가사', major: '부동산학/경제', subjects: '경제, 법',
              roadmap: ['극악의 수험 몰입 (토지경제학/민법 등)', '감정평가사 최종 합격 증서 부여', '수습 및 영업 전쟁 출사표', '독자적인 법인 파트너 지분 확보'],
              tiers: [
                { level: 'Tier 1', desc: '전국 단위 탑클라스 법인(하나, 제일 등) 본부장 및 파트너 (억 단위 초월 배당)' },
                { level: 'Tier 2', desc: '한국부동산원 및 국공립 공사 내부 전문가 소속 정규직 (정년 보장)' },
                { level: 'Tier 3', desc: '지방 사무소 막내 출장 전문 고용(어소) 평가사' }
              ]
            },
            { name: '5급 행정사무관 (재경/행정)', major: '국경/행정', subjects: '정치와법, 국어, 경제',
              roadmap: ['명문 대학 상경계 열등 수석', '최우수 5급 행정고시 재경직 최종 합격', '국가공무원인재개발원 상위 성적 연수', '기재부/금융위 핵심 요직 배정'],
              tiers: [
                { level: 'Tier 1', desc: '기획재정부 차관 급 및 국세청장 로열로드 승진 (공공의 초고위 엘리트)' },
                { level: 'Tier 2', desc: '일반 부처 및 광역지자체 (서울시 등) 기조실 총괄 핵심 간부' },
                { level: 'Tier 3', desc: '변두리 소속 기관장 파견 및 권한 약한 국 라인' }
              ]
            },
            { name: '시중은행 기업여신/IB 뱅커', major: '경영/통계', subjects: '수학, 경제',
              roadmap: ['명문대 상경계 및 금융/경제 자격증 3종 신기', '1금융권 시중은행 (KB, 신한 등) 통합 공채 수석 합격', '핵심 점포 OJT 후 본점 IB 부서 트랙 지명', '해외 프로젝트파이낸싱 담당 승진'],
              tiers: [
                { level: 'Tier 1', desc: '본점 핵심 IB그룹(투자금융부)/글로벌 파트 리더 (억대 인센 부여 기업 금융 리드)' },
                { level: 'Tier 2', desc: '여의도/강남 등 주요 대형 거점 지점 부지점장 (RM 담당)' },
                { level: 'Tier 3', desc: '일반 개인 고객 대응 리테일 지점 창구 주임계장' }
              ]
            }
        ],
        'CR': [
            { name: '정보 보안 전문가 (화이트해커)', major: '정보보안/컴공', subjects: '정보, 미적분',
              roadmap: ['최신 해킹/방어 툴 마스터와 C/OS 지식 완비', '국가 BOB (차세대 보안리더 양성프로그램) 스펙 확보', 'DEF CON 등 국제 해킹대회 입상', '최상위 테크 보안본부 입사'],
              tiers: [
                { level: 'Tier 1', desc: '국가정보원 요원(NCSC) 및 통신/빅테크 등 최상위 CISO (보안총괄책임)' },
                { level: 'Tier 2', desc: 'SK쉴더스, 안랩 등 주요 보안 관제 및 모의해킹 전담 컨설턴트' },
                { level: 'Tier 3', desc: '하청 파견 보안 관제 계약직 사원 (연중 상시 야간 교대)' }
              ]
            },
            { name: '데이터베이스 관리자 (DBA)', major: '컴퓨터공학', subjects: '정보, 수학',
              roadmap: ['데이터 시스템 설계 구조 숙달', '오라클 OCP 및 클라우드(AWS DB) 자격 확보', '주니어 엔지니어 입사 후 대용량 마이그레이션 프로젝트 성과 입증', '최고 DBA 마스터 승진'],
              tiers: [
                { level: 'Tier 1', desc: '쿠팡, 배민 등 트래픽이 목숨인 메가 플랫폼 최상위 데이터 아키텍트' },
                { level: 'Tier 2', desc: '1금융 은행권 데이터베이스 전담 차세대 시스템 인프라 담당' },
                { level: 'Tier 3', desc: 'SI/외주 용역 기반 DB 모니터링 관리 사원' }
              ]
            },
            { name: '공정/품질 (QA/QC) 엔지니어', major: '공학/통계', subjects: '확률과통계, 공업수학',
              roadmap: ['통계/산업공학/신소재 공학 테크 수료', '식스시그마 블랙벨트 인증 및 품질경영기사 취득', '현장 실습/인턴십', '대기업 플랜트/팹(Fab) 품질관리 보증 리드 발령'],
              tiers: [
                { level: 'Tier 1', desc: '삼성전자 반도체/ASML 코리아 등 초정밀 수율의 신, 수석 QA 엔지니어' },
                { level: 'Tier 2', desc: '현대차 등 거대 제조업 남양연구소/울산공장 총괄 품질 보증관' },
                { level: 'Tier 3', desc: '소형 F&B/단순 가공 공장 제품 검수 조장' }
              ]
            }
        ],
        'RC': [
            { name: '클라우드 인프라 아키텍트', major: '통신/네트워크공학', subjects: '물리학, 정보',
              roadmap: ['인프라/네트워킹 패킷 분석 기술 습득', '솔루션 아키텍트 최고 자격 (AWS/GCP/Azure) 다수 획득', '대형 클라우드 마이그레이션 컨설팅 리드 이행', '아키텍트 파트장 전직'],
              tiers: [
                { level: 'Tier 1', desc: 'AWS 코리아, 구글클라우드 등 글로벌 빅테크 사옥 본사 클라우드 SA 파트너' },
                { level: 'Tier 2', desc: '메가존, 베스핀글로벌 등 최상위 매니지드 파트너(MSP) 시니어 솔루션즈 리더' },
                { level: 'Tier 3', desc: '초급 IDC 장비 관리 및 서버 야간 관제 오퍼레이터' }
              ]
            },
            { name: '건축 구조/시공 소장', major: '건축공학', subjects: '기하, 물리학',
              roadmap: ['건축/토목 과목 수석', '건축기사 시험 합격 후 안전/시공기술사 자격 획득의 길 시작', '1군 대기업(삼성, 현대건설 등) 공채 최종 통과', '국내외 핵심 랜드마크 현장 총지휘 소장 발령'],
              tiers: [
                { level: 'Tier 1', desc: '10대 메이저 건설사 본사 현장 총괄 소장 및 해외 메가 프로젝트(네옴 등) 리드 지휘자 (고액의 급여)' },
                { level: 'Tier 2', desc: '안정적인 공공기관(주택공사, 도로공사 등) 소속 현장 감독관 정규직' },
                { level: 'Tier 3', desc: '단종 하청 면허 소규모 시공업자 공무 소장' }
              ]
            },
            { name: '소방 간부 (재난지휘)', major: '소방/안전/체육', subjects: '체육, 생명과학',
              roadmap: ['체력 극대화 훈련 및 안전 규제 마스터', '간부후보생(준고시급) 시험 준비 혹은 소방설비 특채로 입직 입교', '소방학교 1년 입소 수료 후 임관', '본부 기획 및 현장 지휘대장 로테이션 수료'],
              tiers: [
                { level: 'Tier 1', desc: '소방청 본청 정책본부 국장급 라인 승진 코스 (안정성 역대급 + 명예)' },
                { level: 'Tier 2', desc: '서울/수도권 핵심 대형 특급 소방서 재난 현장 구조 지휘대장' },
                { level: 'Tier 3', desc: '동네 일반 안전 관할 센터 소방 펌프차 현장 출동 소방경/소방장' }
              ]
            }
        ]
    };
    
    // fallback if code not in exact dictionary
    let codeMatrix = code;
    if(!jobsData[code]) {
        // Just resolve to some default if user manages to get perfectly unmapped code
        codeMatrix = topType + (topType === 'R' ? 'I' : topType === 'I' ? 'A' : topType === 'A' ? 'S' : topType === 'S' ? 'E' : topType === 'E' ? 'S' : 'R');
    }
    const recommendedJobs = jobsData[codeMatrix] || jobsData['IR'];

    const resultHTML = \`
        <div id="result_view" class="view active result-screen" style="max-width: 1000px; width: 100%;">
            <div class="glass-card result-container" style="max-width: 100%;">
                <div class="badge" style="margin-bottom:1rem;">The Guidance 정밀 검사 결과</div>
                <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">\${code} 유형</h1>
                <p style="font-size:1.3rem; color:#a8a2ff;">\${typeDesc[topType]} & \${typeDesc[secondType]}</p>
                <img src="\${IMAGES.hero}" class="result-image" style="width: 200px; height: 200px;" />
                
                <div class="roadmap-box" style="margin-top: 2.5rem; background: rgba(0,0,0,0.4); text-align: left; padding: 2.5rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #fff; text-align: center;">🏆 프리미엄 직업 로드맵 분석 (TOP 3)</h3>
                    
                    \${recommendedJobs.map(j => \`
                        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; border-left: 6px solid #6366f1;">
                            <div style="font-size: 1.8rem; font-weight: 800; color: #a8a2ff; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">💼 \${j.name}</div>
                            
                            <div style="display: flex; gap: 2.5rem; margin-bottom: 2rem; flex-wrap: wrap;">
                                <div style="font-size: 1.1rem; color: #fff;"><strong>🎓 추천 전공:</strong> <span style="color:#cbd5e1;">\${j.major}</span></div>
                                <div style="font-size: 1.1rem; color: #fff;"><strong>📚 고차원 고교선택과목:</strong> <span style="color:#cbd5e1;">\${j.subjects}</span></div>
                            </div>
                            
                            <h4 style="color:#60a5fa; margin-bottom: 1.2rem; font-size: 1.2rem;">🚀 커리어 스텝업 로드맵</h4>
                            <div style="display: flex; gap: 0.8rem; align-items: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
                                \${j.roadmap.map((step, idx) => \`
                                    <div style="background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; color: #fff; font-size: 1rem;">\${idx + 1}. \${step}</div>
                                    \${idx < j.roadmap.length - 1 ? \`<span style="color:#818cf8; font-size:1.2rem;">➞</span>\` : ''}
                                \`).join('')}
                            </div>
                            
                            <h4 style="color:#f472b6; margin-bottom: 1.2rem; font-size: 1.2rem;">🏢 직업 선호도 및 성공 티어 (Tiers)</h4>
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                \${j.tiers.map(t => \`
                                    <div style="background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: 8px; display: flex; gap: 1rem; align-items: center; border-left: 4px solid \${t.level==='Tier 1'?'#fbbf24': t.level==='Tier 2'?'#9ca3af' : '#b45309'}">
                                        <div style="background: \${t.level==='Tier 1'?'#fbbf24': t.level==='Tier 2'?'#9ca3af' : '#b45309'}; color: \${t.level==='Tier 2'?'#000':'#000'}; font-weight: 900; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.95rem; width: 60px; text-align: center;">\${t.level}</div>
                                        <div style="color: #f8fafc; font-size: 1.1rem; line-height: 1.5;">\${t.desc}</div>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                    \`).join('')}
                </div>
                
                <div class="roadmap-box" style="margin-top: 2rem; padding: 2.5rem;">
                    <h3 style="font-size: 1.6rem; margin-bottom: 2rem; text-align: center;">📊 나의 가치관 분석 요약</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="stat-bar"><span class="label">초봉 및 소득 (Salary)</span><div class="bar-bg" style="height:18px;"><div class="bar-fill" style="width:\${(appState.answers.values.salary/5)*100}%"></div></div></div>
                        <div class="stat-bar"><span class="label">워라밸 보장성 (Work-Life)</span><div class="bar-bg" style="height:18px;"><div class="bar-fill" style="width:\${(appState.answers.values.worklife/5)*100}%"></div></div></div>
                        <div class="stat-bar"><span class="label">고용 안정성 (Stability)</span><div class="bar-bg" style="height:18px;"><div class="bar-fill" style="width:\${(appState.answers.values.stability/5)*100}%"></div></div></div>
                        <div class="stat-bar"><span class="label">사회 파급력 (Impact)</span><div class="bar-bg" style="height:18px;"><div class="bar-fill" style="width:\${(appState.answers.values.impact/5)*100}%"></div></div></div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 4rem;">
                    <button class="btn back-btn" onclick="goHome()" style="font-size: 1.3rem; padding: 1rem 3rem;">메인보드로 돌아가기</button>
                </div>
            </div>
        </div>
    \`;
    document.getElementById('app').innerHTML = resultHTML;
    // lucide update not needed here as icon is unicode arrow
`;

const startIndex = content.indexOf("const jobsData = {");
const endIndexStr = "document.getElementById('app').innerHTML = resultHTML;";
const endIndex = content.indexOf(endIndexStr, startIndex) + endIndexStr.length;

const finalStr = content.substring(0, startIndex) + replacement + content.substring(endIndex + 1); // +1 to capture next couple chars or just let it snap
fs.writeFileSync(path, finalStr);
