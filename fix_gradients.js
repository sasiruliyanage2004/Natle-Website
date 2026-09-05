const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const dir = 'C:/projects/natle-website/src/app';

walk(dir, function(filePath) {
    if (!filePath.endsWith('.tsx') || filePath.includes('layout.tsx')) {
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix gradients
    content = content.replace(/text-gradient-brand/g, 'gradient-text');
    content = content.replace(/bg-brand-gradient-soft/g, 'bg-[#0ea5e9]/10');
    
    // Fix missing clay button styles
    content = content.replace(/btn-ghost/g, 'clay-btn px-6 py-2.5 rounded-full');

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Done fixing gradients and ghost buttons!');