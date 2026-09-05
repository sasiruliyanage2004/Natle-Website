const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('C:/projects/natle-website/src', function(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove all dark: classes (e.g. dark:bg-black, dark:text-white, dark:hover:text-blue-500)
    content = content.replace(/\bdark:[^\s"'}]+\b/g, '');
    
    // Clean up double spaces left behind
    content = content.replace(/  +/g, ' ');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed dark classes in ' + filePath);
    }
});