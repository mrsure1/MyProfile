const fs = require('fs');
let linesNew = fs.readFileSync('js/app_v2.js', 'utf8').split('\n');
let linesOld = fs.readFileSync('app_v2_old.js', 'utf8').split('\n');

for (let i = 0; i < linesNew.length; i++) {
    if (linesNew[i].includes('\uFFFD')) {
        let bestMatch = null;
        let maxLen = 0;
        for (let j = 0; j < linesOld.length; j++) {
            if (linesOld[j].trim() !== '' && !linesOld[j].includes('\uFFFD')) {
                let common = 0;
                for (let c = 0; c < Math.min(linesNew[i].length, linesOld[j].length); c++) {
                    if (linesNew[i][c] === linesOld[j][c] && linesNew[i][c] !== '\uFFFD') common++;
                }
                if (common > maxLen) {
                    maxLen = common;
                    bestMatch = linesOld[j];
                }
            }
        }
        if (bestMatch && maxLen > 10) {
            let oldStr = linesNew[i].replace('\r', '');
            let newStr = bestMatch.replace('\r', '');
            console.log('REPLACING:', oldStr.trim());
            console.log('WITH     :', newStr.trim());
            linesNew[i] = newStr + (linesNew[i].endsWith('\r') ? '\r' : '');
        } else {
            console.log('FAILED TO MATCH:', linesNew[i].trim());
        }
    }
}
fs.writeFileSync('js/app_v2.js', linesNew.join('\n'), 'utf8');
