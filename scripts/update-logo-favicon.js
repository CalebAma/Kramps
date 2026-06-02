const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const faviconLines =
    '    <link rel="icon" href="logo.png" type="image/png">\n' +
    '    <link rel="apple-touch-icon" href="logo.png">\n';

for (const file of fs.readdirSync(root)) {
    if (!file.endsWith('.html')) continue;

    const filePath = path.join(root, file);
    let html = fs.readFileSync(filePath, 'utf8');

    html = html.replace(/logo\.jpeg/gi, 'logo.png');

    if (!html.includes('rel="icon"')) {
        html = html.replace(
            /<meta name="viewport" content="[^"]+">/,
            (match) => `${match}\n${faviconLines.trimEnd()}`
        );
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Updated', file);
}
