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
    
    // Fix remaining dark theme text tokens:
    content = content.replace(/text-slate-300/g, 'text-[#475569]');
    content = content.replace(/text-slate-400/g, 'text-[#475569]');
    content = content.replace(/text-zinc-300/g, 'text-[#475569]');
    content = content.replace(/text-zinc-400/g, 'text-[#475569]');
    content = content.replace(/text-emerald-500/g, 'text-[#0ea5e9]');
    content = content.replace(/bg-emerald-500\/10/g, 'bg-[#0ea5e9]/10');
    content = content.replace(/hover:bg-emerald-500\/20/g, 'hover:bg-[#0ea5e9]/20');
    content = content.replace(/border-emerald-500\/30/g, 'border-[#0ea5e9]/30');
    
    // Let's replace any "dark:" classes completely just in case
    content = content.replace(/dark:[a-zA-Z0-9\-\/]+/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Done fixing remaining dark texts!');