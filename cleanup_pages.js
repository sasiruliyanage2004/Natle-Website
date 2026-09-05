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
    if (!filePath.endsWith('page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    let changed = false;
    
    if (content.includes('<Navbar />')) {
        content = content.replace(/<Navbar \/>\n?/g, '');
        content = content.replace(/import Navbar from ["'][^"']+["'];?\n?/g, '');
        changed = true;
    }
    
    if (content.includes('<CTAFooter />')) {
        content = content.replace(/<CTAFooter \/>\n?/g, '');
        content = content.replace(/import CTAFooter from ["'][^"']+["'];?\n?/g, '');
        changed = true;
    }
    
    if (content.includes('<SmoothCursor />')) {
        content = content.replace(/<SmoothCursor \/>\n?/g, '');
        content = content.replace(/import SmoothCursor from ["'][^"']+["'];?\n?/g, '');
        changed = true;
    }
    
    if (content.includes('<BeamsBackground')) {
        content = content.replace(/<BeamsBackground[^\/>]*\/>\n?/g, '');
        content = content.replace(/import BeamsBackground from ["'][^"']+["'];?\n?/g, '');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log('Cleaned up duplicated components from pages.');