
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

// Previous strings (from the last step's output)
// Header: class="h-16 w-auto object-contain shadow-lg group-hover:scale-105 transition-transform"
const headerLogoOriginal = 'class="h-16 w-auto object-contain shadow-lg group-hover:scale-105 transition-transform"';
const headerLogoNew = 'class="h-24 w-auto object-contain shadow-lg group-hover:scale-105 transition-transform"';

// Footer: class="h-14 w-auto object-contain"
const footerLogoOriginal = 'class="h-14 w-auto object-contain"';
const footerLogoNew = 'class="h-20 w-auto object-contain"';

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Header Logo Replacement
    content = content.replace(headerLogoOriginal, headerLogoNew);

    // Footer Logo Replacement
    content = content.replace(footerLogoOriginal, footerLogoNew);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated logo size in ${file}`);
        updatedCount++;
    }
});

console.log(`Total files updated: ${updatedCount}`);
