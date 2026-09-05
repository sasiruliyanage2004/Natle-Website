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
    
    // Backgrounds
    content = content.replace(/bg-\[#050505\]/g, 'bg-[#f8faff]');
    content = content.replace(/bg-\[#070d24\]/g, 'bg-[#f8faff]');
    content = content.replace(/bg-base\/[0-9]+/g, 'bg-[#f8faff]');
    content = content.replace(/bg-base/g, 'bg-[#f8faff]');
    content = content.replace(/dark:bg-\[#[a-zA-Z0-9]+\]/g, '');
    content = content.replace(/dark:bg-[a-zA-Z0-9\-\/]+/g, '');
    content = content.replace(/bg-slate-100/g, 'bg-[#ffffff]');
    
    // Text Primary
    content = content.replace(/text-slate-900/g, 'text-[#0a1628]');
    content = content.replace(/text-ink(?!-)/g, 'text-[#0a1628]');
    content = content.replace(/dark:text-white/g, '');
    content = content.replace(/dark:text-emerald-50/g, '');
    content = content.replace(/text-\[#e8f0fe\]/g, 'text-[#0a1628]');
    
    // Text Secondary
    content = content.replace(/text-slate-600/g, 'text-[#475569]');
    content = content.replace(/text-ink-muted/g, 'text-[#475569]');
    content = content.replace(/text-\[#94a3b8\]/g, 'text-[#475569]');
    content = content.replace(/text-slate-500/g, 'text-[#475569]');
    content = content.replace(/dark:text-zinc-[0-9]+/g, '');
    content = content.replace(/dark:text-emerald-100\/70/g, '');
    
    // Borders
    content = content.replace(/border-white\/[0-9]+/g, 'border-[#e2e8f0]');
    content = content.replace(/border-slate-200/g, 'border-[#e2e8f0]');
    content = content.replace(/dark:border-white\/[0-9]+/g, '');
    
    // Cards
    content = content.replace(/card-glass/g, 'clay-card border-none');
    content = content.replace(/glass-card/g, 'clay-card border-none');
    
    // Accents
    content = content.replace(/text-accent-cyan/g, 'text-[#0ea5e9]');
    content = content.replace(/text-accent-lime/g, 'text-[#0ea5e9]');
    content = content.replace(/btn-primary/g, 'clay-btn px-6 py-2.5 rounded-full');
    
    // Selection
    content = content.replace(/selection:bg-\[#[a-zA-Z0-9]+\]/g, 'selection:bg-[#0ea5e9]');

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Done!');