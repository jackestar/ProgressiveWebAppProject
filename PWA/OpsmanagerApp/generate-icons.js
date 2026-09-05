import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import sharp from 'sharp';

const sourceFile = path.resolve('../../src/favicon.svg');
const publicDir = path.resolve('public');
const tauriIconsDir = path.resolve('src-tauri/icons');

const cacheDir = path.resolve('node_modules/.cache/app-icons');
const hashFile = path.join(cacheDir, '.icon-hash');

const copyDir = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

if (!fs.existsSync(sourceFile)) {
  console.error(`Source file not found: ${sourceFile}`);
  process.exit(1);
}

const svgContent = fs.readFileSync(sourceFile);
const currentHash = crypto.createHash('md5').update(svgContent).digest('hex');

if (fs.existsSync(hashFile)) {
  const previousHash = fs.readFileSync(hashFile, 'utf-8');
  if (previousHash === currentHash && fs.existsSync(path.join(cacheDir, 'tauri'))) {
    console.log('SVG has not changed. Restoring icons from Netlify cache...');
    fs.mkdirSync(publicDir, { recursive: true });
    fs.mkdirSync(tauriIconsDir, { recursive: true });
    copyDir(path.join(cacheDir, 'public'), publicDir);
    copyDir(path.join(cacheDir, 'tauri'), tauriIconsDir);
    process.exit(0);
  }
}

console.log('SVG changed or cache missing. Generating new icons...');

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(tauriIconsDir, { recursive: true });

fs.copyFileSync(sourceFile, path.join(publicDir, 'favicon.svg'));

try {
  console.log('Generating Tauri icons...');
  execSync(`pnpm tauri icon "${sourceFile}"`, { stdio: 'inherit' });
} catch (err) {
  console.error('Failed to generate Tauri icons:', err);
  process.exit(1);
}

async function generatePWAIcons() {
  try {
    console.log('Generating PWA icons...');
    await sharp(sourceFile).resize(192, 192).toFile(path.join(publicDir, 'favicon-192.png'));
    await sharp(sourceFile).resize(512, 512).toFile(path.join(publicDir, 'favicon-512.png'));
    
    console.log('Saving to Netlify cache...');
    fs.mkdirSync(path.join(cacheDir, 'public'), { recursive: true });
    fs.mkdirSync(path.join(cacheDir, 'tauri'), { recursive: true });
    
    copyDir(publicDir, path.join(cacheDir, 'public'));
    copyDir(tauriIconsDir, path.join(cacheDir, 'tauri'));
    fs.writeFileSync(hashFile, currentHash); // Save the hash last
    
    console.log('All icons successfully generated and cached!');
  } catch (err) {
    console.error('Error generating PWA icons:', err);
    process.exit(1);
  }
}

generatePWAIcons();