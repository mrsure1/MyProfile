const fs = require('fs');
let content = fs.readFileSync('js/app_v2.js', 'utf8');

const regexReplacements = [
    [/console\.log\('. Loading dictionary:', nextLang\);/g, "console.log('🌐 Loading dictionary:', nextLang);"],
    [/console\.warn\('.{1,3} Dictionary load timeout'\);/g, "console.warn('⚠️ Dictionary load timeout');"],
    [/console\.log\('. Language changed to:', lang\);/g, "console.log('🌐 Language changed to:', lang);"],
    [/\/\/ --- .트.리...이지 .더.\(.세 카드 .함\) ---/g, "// --- 포트폴리오 페이지 렌더링 (상세 카드 포함) ---"],
    [/console\.log\('. Rendering Portfolio Page\.\.\.'\);/g, "console.log('🎨 Rendering Portfolio Page...');"],
    [/\/\/ .단 .비게이.../g, "// 상단 내비게이션"],
    [/\/\/ ..트.리.......세 카드..더./g, "// 포트폴리오 데이터 기반 상세 카드 렌더링"],
    [/\/\/ 기술 .택 .그 HTML/g, "// 기술 스택 태그 HTML"],
    [/\(lang === 'ko' \? '직접 기획.고 개발...로.트.입.다\.' : 'Projects I planned and built myself\.'\)/g, "(lang === 'ko' ? '직접 기획하고 개발한 프로젝트입니다.' : 'Projects I planned and built myself.')"],
    [/\/\/ .어 .환 버튼 .벤..바인../g, "// 언어 전환 버튼 이벤트 바인딩"],
    [/\/\/ .크....이.인 .니메이...용/g, "// 스크롤 시 페이드인 애니메이션 적용"],
    [/\/\/ \[.규 추.\] .이지 .적 로딩 ...커 .치..동 .크./g, "// [신규 추가] 페이지 동적 로딩 시 앵커 위치로 자동 스크롤"],
    [/\/\/ --- Spline 3D 배경 초기..\(.공..링크.Iframe.로 .용\) ---/g, "// --- Spline 3D 배경 초기화 (제공된 링크를 Iframe으로 사용) ---"],
    [/console\.warn\('.{1,3} Spline load delayed - showing wrapper anyway'\);/g, "console.warn('⚠️ Spline load delayed - showing wrapper anyway');"],
    [/console\.log\('. Spline refreshed:', reason \|\| 'manual'\);/g, "console.log('🔄 Spline refreshed:', reason || 'manual');"],
    [/console\.log\('. Initializing Spline background\.\.\.'\);/g, "console.log('✨ Initializing Spline background...');"],
    [/console\.log\('. Rendering glassmorphic design\.\.\.'\);/g, "console.log('🎨 Rendering glassmorphic design...');"],
    [/\/\/ ..카드 - .쪽 .렬 \(mx-auto .거\)/g, "// 연락처 카드 - 좌측 정렬 (mx-auto 제거)"],
    [/lang === 'ko' \? '문의가 .공.으..송.었.니..' : 'Your inquiry was sent successfully\.'/g, "lang === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry was sent successfully.'"],
    [/lang === 'ko' \? '.송 .패\. .메.로 직접 문의.주.요\.' : 'Failed to send\. Please email directly\.'/g, "lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Failed to send. Please email directly.'"],
];

let changes = 0;
for (const [bad, good] of regexReplacements) {
    const match = content.match(bad);
    if (match) {
        content = content.replace(bad, good);
        changes += match.length;
    } else {
        console.log("NOT FOUND REGEX: " + bad);
    }
}

fs.writeFileSync('js/app_v2.js', content, 'utf8');
console.log(`Made ${changes} string replacements in app_v2.js`);
