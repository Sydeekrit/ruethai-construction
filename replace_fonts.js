import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
let result = content.replace(/font-bold/g, 'font-medium');
result = result.replace(/font-semibold/g, 'font-medium');
result = result.replace(/font-black/g, 'font-medium');
fs.writeFileSync('src/App.tsx', result, 'utf8');
console.log('Fonts updated in App.tsx');

const materialContent = fs.readFileSync('src/MaterialListPage.tsx', 'utf8');
let materialResult = materialContent.replace(/font-bold/g, 'font-medium');
materialResult = materialResult.replace(/font-semibold/g, 'font-medium');
materialResult = materialResult.replace(/font-black/g, 'font-medium');
fs.writeFileSync('src/MaterialListPage.tsx', materialResult, 'utf8');
console.log('Fonts updated in MaterialListPage.tsx');
