const fs = require('fs');
let content = fs.readFileSync('js/app_v2.js', 'utf8');

const R = '\uFFFD';

const RRep = [
    [`// ${R}이${R}웃: 짝수/${R}${R}${R}교차`, `// 레이아웃: 짝수/홀수 교차`],
    [`(lang === 'ko' ? '직접 기획${R}고 개발${R}${R}${R}로${R}트${R}입${R}다.' : 'Projects I planned and built myself.')`, `(lang === 'ko' ? '직접 기획하고 개발한 프로젝트입니다.' : 'Projects I planned and built myself.')`],
    [`// ${R}어 ${R}환 버튼 ${R}벤${R}${R}바인${R}${R}`, `// 언어 전환 버튼 이벤트 바인딩`],
    [`// ${R}크${R}${R}${R}${R}이${R}인 ${R}니메이${R}${R}${R}용`, `// 스크롤 시 페이드인 애니메이션 적용`],
    [`// [${R}규 추${R}] ${R}이지 ${R}적 로딩 ${R}${R}${R}커 ${R}치${R}${R}동 ${R}크${R}`, `// [신규 추가] 페이지 동적 로딩 시 앵커 위치로 자동 스크롤`],
    [`// --- Spline 3D 배경 초기${R}${R}(${R}공${R}${R}링크${R}Iframe${R}로 ${R}용) ---`, `// --- Spline 3D 배경 초기화 (제공된 링크를 Iframe으로 사용) ---`],
    [`console.warn('${R}️ Spline load delayed - showing wrapper anyway');`, `console.warn('⚠️ Spline load delayed - showing wrapper anyway');`],
    [`console.log('${R} Spline refreshed:', reason || 'manual');`, `console.log('🔄 Spline refreshed:', reason || 'manual');`],
    [`console.log('${R} Initializing Spline background...');`, `console.log('✨ Initializing Spline background...');`],
    [`console.log('${R} Rendering glassmorphic design...');`, `console.log('🎨 Rendering glassmorphic design...');`],
    [`// ${R}${R}카드 - ${R}쪽 ${R}렬 (mx-auto ${R}거)`, `// 연락처 카드 - 좌측 정렬 (mx-auto 제거)`],
    [`lang === 'ko' ? '문의가 ${R}공${R}으${R}${R}송${R}었${R}니${R}${R}' : 'Your inquiry was sent successfully.'`, `lang === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry was sent successfully.'`],
    [`lang === 'ko' ? '${R}송 ${R}패. ${R}메${R}로 직접 문의${R}주${R}요.' : 'Failed to send. Please email directly.'`, `lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Failed to send. Please email directly.'`]
];

let changed = 0;
for (const [bad, good] of RRep) {
    if (content.includes(bad)) {
        content = content.replaceAll(bad, good);
        changed++;
    } else {
        console.log("NOT FOUND: " + bad);
    }
}

fs.writeFileSync('js/app_v2.js', content, 'utf8');
console.log(`Replaced ${changed} patterns using U+FFFD based string matching.`);
