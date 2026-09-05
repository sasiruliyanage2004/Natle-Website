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
    
    // Remove the opaque background from <main> so the layout.tsx background shows through
    content = content.replace(/<main className="([^"]+) bg-\[#f8faff\]([^"]+)">/g, '<main className="">');
    content = content.replace(/<main className="([^"]+) bg-\[#ffffff\]([^"]+)">/g, '<main className="">');
    
    // Also remove duplicated text-[#0a1628] and antialiased from <main> because body already has it
    content = content.replace(/<main className="([^"]+) text-\[#0a1628\]([^"]+)">/g, '<main className="">');
    content = content.replace(/<main className="([^"]+) antialiased([^"]+)">/g, '<main className="">');
    
    // Clean up multiple spaces
    content = content.replace(/className="([^"]+)"/g, (match, p1) => {
        return className="";
    });

    fs.writeFileSync(p, content, 'utf8');
});
console.log('Fixed main backgrounds on 4 pages.');