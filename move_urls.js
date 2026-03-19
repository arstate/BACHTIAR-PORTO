const fs = require('fs');

const text = fs.readFileSync('src/components/PortfolioGallery.tsx', 'utf8');

const extractArray = (varName) => {
    // Basic regex to find the array block
    const regex = new RegExp('const ' + varName + 'Url(s|) = \\\\[([\\\\s\\\\S]*?)\\\\];');
    const match = text.match(regex);
    if (match) {
        return match[2].split(',').map(s => s.trim().replace(/['"\\n]/g, '')).filter(s => s);
    }
    return [];
}

const konser = extractArray('konser');
const graduation = extractArray('graduation');

fs.mkdirSync('src/database/photography', { recursive: true });
fs.mkdirSync('src/database/videography', { recursive: true });
fs.mkdirSync('src/database/design', { recursive: true });
fs.mkdirSync('src/database/bts', { recursive: true });

if (konser.length > 0) fs.writeFileSync('src/database/photography/konser.txt', konser.join('\n'));
if (graduation.length > 0) fs.writeFileSync('src/database/photography/graduation.txt', graduation.join('\n'));

fs.writeFileSync('src/database/videography/wedding.txt', '// Tambahkan link source video wedding di tiap baris sini\n');
fs.writeFileSync('src/database/videography/prewedding.txt', '// Tambahkan link source video prewedding di tiap baris sini\n');
fs.writeFileSync('src/database/design/poster.txt', '// Tambahkan link source design poster di tiap baris sini\n');
fs.writeFileSync('src/database/bts/behindthescenes.txt', '// Tambahkan link source video bts di tiap baris sini\n');

const newText = text.replace(/const konserUrls = \[[\s\S]*?\];\n/, '')
    .replace(/const graduationUrls = \[[\s\S]*?\];\n/, '');

fs.writeFileSync('src/components/PortfolioGallery.tsx', newText);
console.log('Done mapping database!');
