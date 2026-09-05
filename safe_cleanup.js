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
    
    // Remove imports
    content = content.replace(/import Navbar from "@\/components\/Navbar";\r?\n/g, '');
    content = content.replace(/import CTAFooter from "@\/components\/CTAFooter";\r?\n/g, '');
    content = content.replace(/import SmoothCursor from "@\/components\/magicui\/smooth-cursor";\r?\n/g, '');
    content = content.replace(/import BeamsBackground from "@\/components\/animations\/BeamsBackground";\r?\n/g, '');
    
    // Remove components
    content = content.replace(/<Navbar \/>\r?\n?/g, '');
    content = content.replace(/<CTAFooter \/>\r?\n?/g, '');
    content = content.replace(/<SmoothCursor \/>\r?\n?/g, '');
    content = content.replace(/<BeamsBackground[^\/>]*\/>\r?\n?/g, '');
    
    // Fix backgrounds: replace bg-[#F8FAFC] and bg-[#050505] and bg-white with empty string
    content = content.replace(/bg-\[#F8FAFC\]/g, '');
    content = content.replace(/bg-\[#050505\]/g, '');
    content = content.replace(/bg-\[#ffffff\]/g, '');
    content = content.replace(/bg-white/g, '');
    
    // Fix wrapper text colors that might override layout
    content = content.replace(/text-\[#071326\]/g, 'text-[#0a1628]');
    
    fs.writeFileSync(p, content, 'utf8');
});
console.log('Safely cleaned up pages.');