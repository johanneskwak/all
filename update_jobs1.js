const fs = require('fs');
const extendData = {
  "로봇/자율주행 공학자": {
    keyVariables: ["기초 학문(수학/물리) 성적", "포트폴리오 학부연구생/프로젝트", "AI 알고리즘 코딩 구현 능력", "석/박사 이상 학위 유무"],
    diversePaths: ["완성차 직속 R&D 센터 리더", "자율주행 테크 유니콘 스타트업", "국가 모빌리티 연구소 소속", "로보틱스 벤처 창업", "대학 전임 교원"]
  },
  "전기 설비 설계자": {
    keyVariables: ["기사 및 쌍기사 자격증 취득 여부", "관련 학부 학점 3.5 이상", "AutoCAD/제어도면 작성 실무 경험", "공기업 NCS 통과 점수"],
    diversePaths: ["한전 등 대형 공기업 전기직", "1군 메이저 건설사 전기사업부", "반도체 장비 자동화(FA) 제어설계", "소방/전기 전문 기술사 사무소 개업", "일반 사기업 전기안전관리자"]
  },
  "항공기 정비사": {
    keyVariables: ["항공정비사 면장(자격증)", "공인영어성적(토익 800+)", "체력 및 성실성", "군 정비 특기 실무경험(보특)"],
    diversePaths: ["대형 국적사(Full Service) 메인정비", "제주항공 등 LCC 정비요원", "산림청/경찰기/해경 항공대 특채", "경비행기 비행학교 교관겸 정비관", "전투기 부사관 장기 복무"]
  },
  "데이터 사이언티스트": {
    keyVariables: ["학점/수학적 모델링 역량", "캐글(Kaggle), Dacon 입상 스펙", "Python/R, SQL 코딩능력", "AI 관련 석박사 학위"],
    diversePaths: ["빅테크 기업(네카라쿠배) 핵심 리서처", "금융권(은행/증권) 마이데이터 퀀트", "스타트업 그로스 해킹/퍼포먼스 엔지니어", "대학/국책 연구소 소속 데이터 분석가", "독립 분석 솔루션 B2B 창업"]
  },
  "신소재 연구원": {
    keyVariables: ["전공 평점(A0 유지)", "석/박사 과정 SCI급 1저자 논문 수", "연구실 장비 다루는 경험", "어학 성적(토익/스피킹)"],
    diversePaths: ["대기업 2차전지/배터리 핵심 R&D", "반도체 파운드리 소재 엔지니어", "디스플레이 화합물 선행기술 연구관", "정부/정출연 산하 수석 연구원", "신소재 전문 장비 스타트업 임원"]
  },
  "의료/제약 연구원": {
    keyVariables: ["최상위 학부 학점 및 대학원 간판", "임상/비임상 연구 논문 실적(Nature 등)", "외국어(영어) 논문 독해/작성 능력", "제약 공정(GMP) 및 식약처 규제 지식"],
    diversePaths: ["글로벌 메가 파마(화이자 등) 본사 리서치", "국내 대기업(삼성바이오, 셀트리온) 수석", "백신/바이오시밀러 벤처 창업 임원", "대학병원 소속 임상병리 기초교수", "국과수/질병관리청 국가 전문직"]
  },
  "정신과 의사": {
    keyVariables: ["의과대학 예과/본과 내신 평점", "의사국가고시 합격점수", "관련 수련 병원(빅5) 인턴/레지 레퍼런스", "따뜻하고 단단한 멘탈리티"],
    diversePaths: ["명문 대학병원 임상교수/스태프", "규모 있는 전문 정신과 병원 페이닥터", "프라이빗(강남 등) 최고급 1인 개원의", "기업 부설 임직원 심리상담 센터장", "방송 패널/인플루언서 의학 채널 운영"]
  },
  "UX/UI 리서처": {
    keyVariables: ["포트폴리오의 논리성(Why에 대한 고민)", "Data-driven 분석 역량(GA, SQL)", "인지심리학 기저 지식", "도구(Figma, Framer 등) 활용 숙련도"],
    diversePaths: ["최상위 IT 서비스 기업 프로덕트 오너(PO)", "전통적 금융사/대기업 UX 혁신 조직원", "유명 디자인 에이전시 시니어 디자이너", "다국적 기업 고객경험(CX) 담당 임원", "1인 프리랜서 기획/아키텍처 자문"]
  },
  "AI 윤리 연구원": {
    keyVariables: ["철학/인문학적 통찰과 CS 지식 융합력", "대학원 연구 논문과 정부 과제 참여 여부", "AI 법적 규제 스터디", "글로벌 트렌드(EU AI Act 등) 이해력"],
    diversePaths: ["초거대 AI 기업(OpenAI, 구글) Safety R&D", "국가인권위 및 윤리 관련 정부 부처 특별위원", "법무법인(로펌) 소속 AI 컴플라이언스 전문 고문", "관련 학제 협업 대학 전임교수", "빅테크 대관(Policy) 및 리스크 매니지먼트 팀장"]
  },
  "프론트엔드 개발자": {
    keyVariables: ["핵심 프레임워크(React, Vue 등) 실무 포트폴리오", "자료구조/알고리즘 코딩테스트 실력", "부트캠프 수료 타이틀(우테코 등)", "Web Performance 최적화 경험"],
    diversePaths: ["네이버, 카카오 등 B2C 대형 플랫폼 파트장", "유니콘/시리즈B 이상 로켓 스타트업 리드/CTO", "프론트/백 아우르는 풀스택 엔지니어 전향", "글로벌 테크기업 한국/미국 본사 취업", "프리랜서 및 1인 솔루션/SaaS 개발자"]
  },
  "테크니컬 아티스트(TA)": {
    keyVariables: ["그래픽 엔진(Unreal, Unity) 딥-다이브 이해도", "쉐이더(Shader) 코딩 및 파이썬 숙련도", "아트와 프로그래밍 양방향 포트폴리오", "문제해결 최적화(Optimization) 실적"],
    diversePaths: ["3N 2K 등 국내 대형 게임사 핵심 개발 디렉터", "메타버스/XR 전담 혁신 엔진 스튜디오 치프", "할리우드 규모 글로벌 FX/VFX 파이프라인 리드", "플랫폼형 기업 아바타 사업부 시니어", "독립 인디게임/1인 미디어 창작 스튜디오 운영"]
  },
  "제품/산업 디자이너": {
    keyVariables: ["국제 어워드(Red Dot, iF 등) 입상 실적", "UX 프로세스에 기반한 논리적 리디자인", "라이노/키샷 등 3D 모델링 스킬", "현업 산학협력/인턴 경험 유무"],
    diversePaths: ["삼성/LG/현대자동차 선행디자인/양산 파트", "유명 글로벌 디자인 에이전시 크리에이티브 리드", "가구, 조명, 인테리어 소품 브랜드 런칭가", "전자상거래/플랫폼 기업의 공간&오프라인경험 기획자", "크라우드 펀딩을 통한 자기 브랜딩 창업"]
  },
  "메인 연출 PD (방송/콘텐츠)": {
    keyVariables: ["언론고시 준비 및 작문학/시사 논술 스터디", "단편영화, 공모전 등 화제성 있는 포폴", "편집 및 기획 툴 숙련도(프리미어, 파컷 등)", "독창적인 기획안과 소통 리더십"],
    diversePaths: ["나영석, 김태호 등 예능국 스타 메인 PD 전속계약", "넷플릭스 등 멀티 글로벌 OTT 오리지널 제작사", "대형 유튜브(샌드박스 등) 스튜디오 채널 책임", "종합 미디어 프로덕션 임원급 총괄 디렉터", "외주 프로덕션 설립 후 지상파 단독 납품 대표"]
  },
  "예술 심리 치료사": {
    keyVariables: ["석사 이상 학위(상담/치료 전공)", "국가 임상/상담 자격 실습시간(보통 1000~3000시간)", "미술/음악 등 예술적 베이스", "타인에 대한 깊은 감수성과 자기 통제력"],
    diversePaths: ["대형 종합병원/정신건강의학과 소속 전임 치료사", "시간당 수십만 원 급 프라이빗 아동/성인 치료소 원장", "국공립 Wee센터 / 보건소 정규 카운셀러", "보육원 등 복지시설 순회 프리랜서", "기업 연수원 힐링 워크샵 강사 및 아트 테라피스트"]
  },
  "카피라이터": {
    keyVariables: ["유명 광고제 수상 이력(제일기획 아이디어 페스티벌 등)", "자신만의 문장력을 뽐내는 카피북/포트폴리오", "시대 트렌드 캐치력과 다양한 경험", "비주얼을 텍스트로 풀어내는 프레젠테이션 능력"],
    diversePaths: ["최상위 종합광고대행사 C-Level 크리에이티브 디렉터(CD)", "잘 나가는 독립 크리에이티브 부티크(돌고래유괴단 등) 헤드", "대기업(IT, 소비재) 브랜드 마케팅/커뮤니케이션 리드", "인기 작가/에세이스트, 북튜버로의 전향", "소형 광고대행사에서 자유롭게 일하는 프리랜서"]
  },
  "상담 심리사": {
    keyVariables: ["심리학회 발급 공인 1급/2급 자격 소지 유무", "임상/상담 관련 석사 이상의 학력", "풍부한 개인/집단 상담 수련 트랙 시간", "공감 및 위기 개입 훈련 경험"],
    diversePaths: ["대기업 복지차원 인하우스 EAP 심리상담 센터장", "지역 사회 국가 지자체 통합 정신건강 공직", "청소년/가족 대상 전문 유료 사설 센터 공동개원", "학교/대학 내 전단 생활상담 및 외래 교수", "범죄심리/교정행정 관련 심층 국가 공무원 특별채용"]
  },
  "특수 교육 교사": {
    keyVariables: ["학부 전공 특수교육학 평점(상위 10% 컷)", "초고난도 국가 임용고시 합격 성적", "교육 실습 이력 및 교생 성적 유무", "남다른 인내심과 확고한 직업 윤리"],
    diversePaths: ["공립 특수학교의 정교사(연금 및 정년 철밥통)", "명문/복지 최상 사립 특수학교 채용 (면접/실기 비중)", "장애 통합 어린이집 및 유치원 원장 파견", "청각/시각 장애 특화 전문 치료 교육원 원장십", "특수교육 전공 대학 임상 강사 및 연구사 전직"]
  },
  "조직개발 매니저 (Culture/HR)": {
    keyVariables: ["사회/경영 조직분야/HRD 학회장 이력", "실제 전사 조직문화 개선 프로젝트 추진 포폴", "데이터 기반의 피플 애널리틱스 역량", "경영진을 설득하는 프레젠테이션/문서스킬"],
    diversePaths: ["테크 유니콘/초대기업 인사 및 조직문화(People) 리드", "외국계 기업 한국 브랜치 HR/Culture 총괄 임원", "전통 대형 그룹사(SK, 삼성 등) 인력개발원(연수원) 교수", "스타트업 인당 보상/문화 책정하는 C-Level 파트너", "독립 경영컨설팅 펌 조직개발 파트 진출"]
  }
};

let content = fs.readFileSync('C:/Users/halah/.gemini/antigravity/scratch/career-app/app.js', 'utf8');

// Match `const jobsData = { ... };` and replace each job to add keyVariables and diversePaths
const match = content.match(/const\s+jobsData\s*=\s*\{([\s\S]*?)\};\s*\/\/\s*fallback if code not in exact/);
if (match) {
  const jobsDataStr = match[1];
  
  // We will do a simple string replace for each job matched in extendData.
  let newJobsDataStr = jobsDataStr;
  for (const [jobName, extra] of Object.entries(extendData)) {
    // Find the object block for this jobName
    // { name: '로봇/자율주행 공학자', major: ... roadmap: [...], tiers: [...] },
    // We want to append these fields after major/subjects or right before the closing }
    
    // We can regex search for `name: '${jobName}',` and then find the corresponding closing `}`
    // which is tricky. Alternatively, string replace ", \n              roadmap: " with
    // `, \n              keyVariables: ${JSON.stringify(extra.keyVariables)}, \n              diversePaths: ${JSON.stringify(extra.diversePaths)},\n              roadmap: ` 
    // This is much safer and precise!
    
    // Actually, let's just make it simpler: Every job has \`roadmap: [\`
    // We just find \`{ name: '${jobName}',\` block and replace \`roadmap: \` within it.
    
    const blockRegex = new RegExp(`(\\{\\s*name:\\s*'${jobName}'[\\s\\S]*?)(roadmap:\\s*\\[)`);
    newJobsDataStr = newJobsDataStr.replace(blockRegex, `$1keyVariables: ${JSON.stringify(extra.keyVariables)},\n              diversePaths: ${JSON.stringify(extra.diversePaths)},\n              roadmap: [`);
  }
  
  content = content.replace(jobsDataStr, newJobsDataStr);
  fs.writeFileSync('C:/Users/halah/.gemini/antigravity/scratch/career-app/app.js', content);
  console.log("Success phase 1");
} else {
  console.log("Could not find jobsData");
}
