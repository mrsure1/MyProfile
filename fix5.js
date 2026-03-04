const fs = require('fs');
let content = fs.readFileSync('js/app_v2.js', 'utf8');

let lines = content.split('\n');

const replacements = {
    658: "            // 레이아웃: 짝수/홀수 교차\r",
    677: "            '<p class=\"text-white/50 text-center text-lg mb-8\">' + (lang === 'ko' ? '직접 기획하고 개발한 프로젝트입니다.' : 'Projects I planned and built myself.') + '</p>' +\r",
    682: "        // 언어 전환 버튼 이벤트 바인딩\r",
    688: "        // 스크롤 시 페이드인 애니메이션 적용\r",
    699: "        // [신규 추가] 페이지 동적 로딩 시 앵커 위치로 자동 스크롤\r",
    711: "    // --- Spline 3D 배경 초기화 (제공된 링크를 Iframe으로 사용) ---\r",
    721: "            console.warn('⚠️ Spline load delayed - showing wrapper anyway');\r",
    729: "                console.log('✅ Spline iframe loaded');\r",
    752: "        console.log('🔄 Spline refreshed:', reason || 'manual');\r",
    797: "        console.log('✨ Initializing Spline background...');\r",
    822: "        console.log('🎨 Rendering glassmorphic design...');\r",
    1016: "            // 연락처 카드 - 좌측 정렬 (mx-auto 제거)\r",
    1143: "                        successMsg.textContent = lang === 'ko' ? '문의가 성공적으로 전송되었습니다.' : 'Your inquiry was sent successfully.';\r",
    1158: "                        errorMsg.textContent = lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Failed to send. Please email directly.';\r",
    1181: "                alert('오류: ' + e.message);\r"
};

for (const [index, newLine] of Object.entries(replacements)) {
    if (lines[index] !== undefined) {
        // preserve the carriage return based on what the original line had
        let hasCR = lines[index].endsWith('\r');
        let newContent = newLine.replace('\r', '');
        lines[index] = newContent + (hasCR ? '\r' : '');
    }
}

fs.writeFileSync('js/app_v2.js', lines.join('\n'), 'utf8');
console.log('Replaced exact lines successfully.');
