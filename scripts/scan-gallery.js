const fs = require('fs');
const path = require('path');

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const CATEGORIES = [
    { id: 'asbestos', folder: 'asbestos-assessment-removal-disposal', title: 'Asbestos assessment, removal and disposal' },
    { id: 'stakeholder', folder: 'stakeholder-engagement', title: 'Stakeholder engagement' },
    { id: 'water', folder: 'water-sampling-analysis', title: 'Water sampling and analysis' },
    { id: 'stack', folder: 'stack-emissions-monitoring', title: 'Stack emissions monitoring' },
    { id: 'air-noise', folder: 'air-noise-monitoring', title: 'Air and noise monitoring' },
    { id: 'meteorological', folder: 'meteorological-monitoring', title: 'Meteorological monitoring' },
    { id: 'livelihood', folder: 'livelihood-restoration-programme', title: 'Livelihood restoration and programme implementation' },
    { id: 'trainings', folder: 'trainings-facilitation', title: 'Trainings and facilitation' },
    { id: 'socio-economic', folder: 'socio-economic-survey', title: 'Socio economic survey' },
];

const galleryRoot = path.join(__dirname, '..', 'images', 'project-gallery');
const outFile = path.join(__dirname, '..', 'gallery-data.js');

function listImages(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((name) => `images/project-gallery/${path.basename(dir)}/${name}`.replace(/\\/g, '/'));
}

const categories = CATEGORIES.map(({ id, folder, title }) => {
    const dir = path.join(galleryRoot, folder);
  const folderKey = folder;
    return {
        id,
        title,
        folder: folderKey,
        images: listImages(dir),
    };
});

const payload = { categories };
const js = `window.PROJECT_GALLERY = ${JSON.stringify(payload, null, 4)};\n`;

fs.writeFileSync(outFile, js, 'utf-8');
const total = categories.reduce((n, c) => n + c.images.length, 0);
console.log(`Wrote ${outFile} (${total} image(s) across ${categories.length} categories).`);
