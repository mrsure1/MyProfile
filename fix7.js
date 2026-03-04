const fs = require('fs');
let content = fs.readFileSync('js/app_v2.js', 'utf8');

let lines = content.split('\n');

const replacements = {
    209: "        console.error('🚨 Root element not found!');\r",
    232: "    // --- 포트폴리오 데이터 (실제 프로젝트 기반 상세 정보 포함) ---\r",
    445: "        console.log('🌐 Loading dictionary:', nextLang);\r",
    452: "                    console.log('✅ Dictionary loaded:', nextLang);\r",
    458: "                        console.warn('⚠️ Dictionary load timeout');\r",
    474: "        console.log('🌐 Language changed to:', lang);\r",
    512: "        console.log('✨ Initializing Galaxy Cursor...');\r",
    561: "    // --- 포트폴리오 페이지 렌더링 (상세 카드 포함) ---\r",
    563: "        console.log('🎨 Rendering Portfolio Page...');\r",
    565: "        // 상단 내비게이션\r",
    575: "        // 포트폴리오 데이터 기반 상세 카드 렌더링\r",
    582: "            // 기술 스택 태그 HTML\r",
    587: "            // 주요 기능 리스트 HTML\r",
    595: "            // 태그 라벨 HTML\r",
    628: "                '<h3 class=\"text-xs font-bold text-neon-orange uppercase tracking-wider mb-1.5\"><i class=\"fa-solid fa-cubes mr-1.5\"></i>' + (lang === 'ko' ? '아키텍처' : 'Architecture') + '</h3>' +\r",
    634: "                '<h3 class=\"text-sm font-bold text-accent uppercase tracking-wider mb-3\"><i class=\"fa-solid fa-code mr-1.5\"></i>' + (lang === 'ko' ? '기술 스택' : 'Tech Stack') + '</h3>' +\r"
};

for (const [index, newLine] of Object.entries(replacements)) {
    if (lines[index] !== undefined) {
        let hasCR = lines[index].endsWith('\r');
        let newContent = newLine.replace('\r', '');
        lines[index] = newContent + (hasCR ? '\r' : '');
    }
}

fs.writeFileSync('js/app_v2.js', lines.join('\n'), 'utf8');
console.log('Replaced exact lines successfully.');
