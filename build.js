const fs = require('fs-extra');
const path = require('path');
const htmlMinifier = require('html-minifier');
const JavaScriptObfuscator = require('javascript-obfuscator');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

async function build() {
    console.log('Starting build process...');

    // Clean dist folder
    if (fs.existsSync(distDir)) {
        await fs.emptyDir(distDir);
    } else {
        await fs.mkdir(distDir);
    }

    const items = await fs.readdir(srcDir);

    for (let item of items) {
        // Skip these folders/files
        if (['node_modules', 'dist', '.git', 'package.json', 'package-lock.json', 'build.js', 'scripts'].includes(item)) {
            continue;
        }

        const fullPath = path.join(srcDir, item);
        const stats = await fs.stat(fullPath);

        if (stats.isDirectory()) {
            // We assume mostly flat structure based on previous interactions, but just in case, copy standard dirs
            await fs.copy(fullPath, path.join(distDir, item));
            continue;
        }

        const distPath = path.join(distDir, item);

        if (item.endsWith('.html')) {
            console.log(`Minifying HTML: ${item}`);
            let content = await fs.readFile(fullPath, 'utf-8');
            try {
                content = htmlMinifier.minify(content, {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyCSS: true,
                    minifyJS: true
                });
            } catch (err) {
                console.error(`Error minifying ${item}:`, err.message);
            }
            await fs.writeFile(distPath, content, 'utf-8');
        } else if (item.endsWith('.js')) {
            const galleryScripts = ['gallery-data.js', 'project-gallery.js'];
            if (galleryScripts.includes(item)) {
                console.log(`Copying gallery JS: ${item}`);
                await fs.copy(fullPath, distPath);
                continue;
            }

            console.log(`Obfuscating JS: ${item}`);
            let content = await fs.readFile(fullPath, 'utf-8');

            try {
                const obfuscationResult = JavaScriptObfuscator.obfuscate(content, {
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 0.75,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0.4,
                    debugProtection: true,
                    debugProtectionInterval: 2000,
                    disableConsoleOutput: true,
                    identifierNamesGenerator: 'hexadecimal',
                    log: false,
                    numbersToExpressions: true,
                    renameGlobals: false,
                    selfDefending: true,
                    simplify: true,
                    splitStrings: true,
                    splitStringsChunkLength: 10,
                    stringArray: true,
                    stringArrayCallsTransform: true,
                    stringArrayCallsTransformThreshold: 0.5,
                    stringArrayEncoding: ['base64'],
                    stringArrayIndexShift: true,
                    stringArrayRotate: true,
                    stringArrayShuffle: true,
                    stringArrayWrappersCount: 1,
                    stringArrayWrappersChainedCalls: true,
                    stringArrayWrappersParametersMaxCount: 2,
                    stringArrayWrappersType: 'variable',
                    stringArrayThreshold: 0.75,
                    unicodeEscapeSequence: false
                });
                content = obfuscationResult.getObfuscatedCode();
            } catch (err) {
                console.error(`Error obfuscating ${item}:`, err.message);
            }
            await fs.writeFile(distPath, content, 'utf-8');
        } else {
            console.log(`Copying asset: ${item}`);
            await fs.copy(fullPath, distPath);
        }
    }

    console.log('Build completed! Protected files are in the "dist" directory.');
}

build().catch(console.error);
