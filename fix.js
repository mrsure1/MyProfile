const fs = require('fs');
let content = fs.readFileSync('js/app_v2.js', 'utf8');

const replacements = {
    '\\?\\?Root element not found!': '🚨 Root element not found!',
    '\\?\\? Loading dictionary:': '🌐 Loading dictionary:',
    '\\?\\?Dictionary loaded:': '✅ Dictionary loaded:',
    '\\?️ Dictionary load timeout': '⚠️ Dictionary load timeout',
    '\\?\\? Language changed to:': '🌐 Language changed to:',
    '\\?\\?Initializing Galaxy Cursor...': '✨ Initializing Galaxy Cursor...',
    '\\?\\? Rendering Portfolio Page...': '🎨 Rendering Portfolio Page...',
    '\\?단 \\?비게이\\?\\?': '상단 내비게이션',
    '기술 \\?택 \\?그 HTML': '기술 스택 태그 HTML',
    '주요 기능 리스\\?\\?HTML': '주요 기능 리스트 HTML',
    '\\?그 \\?벨 HTML': '태그 라벨 HTML',
    '주요 기능 \\?션': '주요 기능 섹션',
    '\\?키\\?처 \\?징 \\?션': '아키텍처 특징 섹션',
    '\\(\\?키\\?처\\' \\: \\'Architecture\\)': '(\\'아키텍처\\' : \\'Architecture\\) ',
  '기술 \\?택 \\?션': '기술 스택 섹션',
    '\\(\\'기술 \\?택\\' \\: \\'Tech Stack\\) ': '(\\'기술 스택\\' : \\'Tech Stack\\)',
  '\\?이\\?웃\\: 짝수\\/\\?\\?\\?교차': '레이아웃: 짝수/홀수 교차',
  '직접 기획\\?고 개발\\?\\?\\?로\\?트\\?입\\?다\\.': '직접 기획하고 개발한 프로젝트입니다.',
  '\\?어 \\?환 버튼 \\?벤\\?\\?바인\\?\\?': '언어 전환 버튼 이벤트 바인딩',
  '\\?크\\?\\?\\?\\?\\?이\\?인 \\?니메이\\?\\?\\?용': '스크롤 시 페이드인 애니메이션 적용',
  '\\[\\?규 추\\?\\] \\?이지 \\?적 로딩 \\?\\?\\?커 \\?치\\?\\?동 \\?크\\?': '[신규 추가] 페이지 동적 로딩 시 앵커 위치로 자동 스크롤',
  '\\?️ Spline load delayed - showing wrapper anyway': '⚠️ Spline load delayed - showing wrapper anyway',
  '\\?\\?Spline iframe loaded': '✅ Spline iframe loaded',
  '\\?\\? Spline refreshed:': '🔄 Spline refreshed:',
  '\\?\\? Rendering glassmorphic design...': '🎨 Rendering glassmorphic design...',
  '\\?\\?지\\?\\?\\?쪽\\/\\?른\\?교차 배치 \\(짝수\\: \\?\\?지 \\?쪽\\, \\?\\?\\? \\?\\?지 \\?른\\?\\(': '이미지의 왼쪽/오른쪽 교차 배치 (짝수: 이미지 왼쪽, 홀수: 이미지 오른쪽)'
};

const exactReplacements = [
    ['// --- ?트?리???이??(?제 ?로?트 기반 ?세 ?보 ?함) ---', '// --- 포트폴리오 데이터 (실제 프로젝트 기반 상세 정보 포함) ---'],
    ['// --- ?트?리???이지 ?더?(?세 카드 ?함) ---', '// --- 포트폴리오 페이지 렌더링 (상세 카드 포함) ---'],
    ['// ??트?리???????세 카드??더?', '// 포트폴리오 데이터 기반 상세 카드 렌더링'],
    ['// --- Spline 3D 배경 초기??(?공??링크?Iframe?로 ?용) ---', '// --- Spline 3D 배경 초기화 (제공된 링크를 Iframe으로 사용) ---']
];

let changes = 0;
for (const [bad, good] of Object.entries(replacements)) {
    const regex = new RegExp(bad.replace(/\\/g, '\\\\'), 'g');
    const count = (content.match(regex) || []).length;
    if (count > 0) {
        content = content.replace(regex, good);
        changes += count;
    }
}

for (const [bad, good] of exactReplacements) {
    if (content.includes(bad)) {
        content = content.split(bad).join(good);
        changes++;
    }
}

fs.writeFileSync('js/app_v2.js', content, 'utf8');
console.log(`Made ${changes} string replacements in app_v2.js`);
