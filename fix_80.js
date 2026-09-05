const fs = require('fs');
const path = require('path');

const files = [
    'src/app/blog/page.tsx',
    'src/app/careers/page.tsx',
    'src/app/contact/page.tsx',
    'src/app/projects/page.tsx'
];

files.forEach(f => {
    let p = path.join('C:/projects/natle-website', f);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/ \/80/g, ' bg-white/80');
    fs.writeFileSync(p, content, 'utf8');
});