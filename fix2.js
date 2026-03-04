const fs = require('fs');
let content = fs.readFileSync('js/app_v2.js', 'utf8');

const replacements = {
    "console.error('??Root element not found!');": "console.error('🚨 Root element not found!');",
    "// --- ?트?리???이??(?제 ?로?트 기반 ?세 ?보 ?함) ---": "// --- 포트폴리오 데이터 (실제 프로젝트 기반 상세 정보 포함) ---",
    "console.log('? Loading dictionary:', nextLang);": "console.log('🌐 Loading dictionary:', nextLang);",
    "console.log('??Dictionary loaded:', nextLang);": "console.log('✅ Dictionary loaded:', nextLang);",
    "console.warn('?️ Dictionary load timeout');": "console.warn('⚠️ Dictionary load timeout');",
    "console.log('? Language changed to:', lang);": "console.log('🌐 Language changed to:', lang);",
    "console.log('??Initializing Galaxy Cursor...');": "console.log('✨ Initializing Galaxy Cursor...');",
    "// --- ?트?리???이지 ?더?(?세 카드 ?함) ---": "// --- 포트폴리오 페이지 렌더링 (상세 카드 포함) ---",
    "console.log('? Rendering Portfolio Page...');": "console.log('🎨 Rendering Portfolio Page...');",
    "// ?단 ?비게이???": "// 상단 내비게이션",
    "// ??트?리???????세 카드??더?": "// 포트폴리오 데이터 기반 상세 카드 렌더링",
    "// 기술 ?택 ?그 HTML": "// 기술 스택 태그 HTML",
    "// 주요 기능 리스??HTML": "// 주요 기능 리스트 HTML",
    "// ?그 ?벨 HTML": "// 태그 라벨 HTML",
    "// 주요 기능 ?션": "// 주요 기능 섹션",
    "// ?키?처 ?징 ?션": "// 아키텍처 특징 섹션",
    "(lang === 'ko' ? '?키?처' : 'Architecture')": "(lang === 'ko' ? '아키텍처' : 'Architecture')",
    "// 기술 ?택 ?션": "// 기술 스택 섹션",
    "(lang === 'ko' ? '기술 ?택' : 'Tech Stack')": "(lang === 'ko' ? '기술 스택' : 'Tech Stack')",
    "// ?이?웃: 짝수/???교차": "// 레이아웃: 짝수/홀수 교차",
    "(lang === 'ko' ? '직접 기획?고 개발???로?트?입?다.' : 'Projects I planned and built myself.')": "(lang === 'ko' ? '직접 기획하고 개발한 프로젝트입니다.' : 'Projects I planned and built myself.')",
    "// ?어 ?환 버튼 ?벤??바인??": "// 언어 전환 버튼 이벤트 바인딩",
    "// ?크????이?인 ?니메이???용": "// 스크롤 시 페이드인 애니메이션 적용",
    "// [?규 추?] ?이지 ?적 로딩 ???커 ?치??동 ?크?": "// [신규 추가] 페이지 동적 로딩 시 앵커 위치로 자동 스크롤",
    "// --- Spline 3D 배경 초기??(?공??링크?Iframe?로 ?용) ---": "// --- Spline 3D 배경 초기화 (제공된 링크를 Iframe으로 사용) ---",
    "console.warn('?️ Spline load delayed - showing wrapper anyway');": "console.warn('⚠️ Spline load delayed - showing wrapper anyway');",
    "console.log('??Spline iframe loaded');": "console.log('✅ Spline iframe loaded');",
    "console.log('? Spline refreshed:', reason || 'manual');": "console.log('🔄 Spline refreshed:', reason || 'manual');",
    "console.log('? Initializing Spline background...');": "console.log('✨ Initializing Spline background...');",
    "console.log('? Rendering glassmorphic design...');": "console.log('🎨 Rendering glassmorphic design...');",
    "// ??카드 - ?쪽 ?렬 (mx-auto ?거)": "// 연락처 카드 - 좌측 정렬 (mx-auto 제거)",
    "lang === 'ko' ? '문의가 ?공?으??송?었?니??' : 'Your inquiry was sent successfully.'": "lang === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry was sent successfully.'",
    "lang === 'ko' ? '?송 ?패. ?메?로 직접 문의?주?요.' : 'Failed to send. Please email directly.'": "lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Failed to send. Please email directly.'",
    "console.log('??Glassmorphic Landing Page Loaded');": "console.log('✅ Glassmorphic Landing Page Loaded');",
    "console.log('?? Initializing...');": "console.log('🚀 Initializing...');"
};

let changes = 0;
for (const [bad, good] of Object.entries(replacements)) {
    if (content.includes(bad)) {
        content = content.replaceAll(bad, good);
        changes++;
    } else {
        console.log("NOT FOUND: " + bad);
    }
}

fs.writeFileSync('js/app_v2.js', content, 'utf8');
console.log(`Made ${changes} string replacements in app_v2.js`);
