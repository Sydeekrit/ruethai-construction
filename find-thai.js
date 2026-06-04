import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
const thaiRegex = /[\u0E00-\u0E7F]+/g;

let output = [];
lines.forEach((line, index) => {
  if (thaiRegex.test(line)) {
    const wrapped = /t\(\s*["'`].*?[\u0E00-\u0E7F]+.*?["'`]\s*\)/.test(line);
    const inComment = /\/\/.*[\u0E00-\u0E7F]+/.test(line) || /\/\*.*[\u0E00-\u0E7F]+.*\*\//.test(line);
    if (!wrapped && !inComment) {
      output.push(`${index + 1}: ${line.trim()}`);
    }
  }
});

fs.writeFileSync('thai-matches.txt', output.join('\n'));
console.log(`Saved ${output.length} unwrapped Thai text lines to thai-matches.txt`);
