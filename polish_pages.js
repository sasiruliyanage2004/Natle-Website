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
    
    // Fix colors
    content = content.replace(/bg-\[#F8FAFC\]/g, 'bg-[#f8faff]');
    content = content.replace(/text-\[#071326\]/g, 'text-[#0a1628]');
    
    // Remove empty spaces left by removed components
    content = content.replace(/\{\/\* Background Luminous Beams \*\/\}\s*<div className="relative z-10">/g, '<div className="relative z-10">');
    
    fs.writeFileSync(p, content, 'utf8');
});
console.log('Polished pages.');