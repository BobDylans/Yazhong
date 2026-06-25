/**
 * Download all assets from carfurnisher.com
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TARGET_URL = 'https://carfurnisher.com/?srsltid=AfmBOopik9NFweLkq6kD2EhqSoOTU7Xp6yD4THgpWmaACtuW8tePWJSG';
const PUBLIC_DIR = resolve(ROOT, 'public', 'images');

mkdirSync(PUBLIC_DIR, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { file.close(); reject(err); });
  });
}

async function run() {
  console.log('=== Download Assets ===\n');
  
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // Get all unique image URLs
  const imageUrls = await page.evaluate(() => {
    const urls = new Set();
    // <img> tags
    document.querySelectorAll('img').forEach(img => {
      const src = img.src || img.getAttribute('src');
      if (src && !src.startsWith('data:') && !src.includes('svg')) urls.add(src);
    });
    // Background images
    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.includes('url')) {
        const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
        if (match) urls.add(match[1]);
      }
    });
    return [...urls];
  });
  
  console.log(`Found ${imageUrls.length} unique image URLs\n`);
  
  let success = 0;
  let failed = 0;
  
  // Download in batches of 4
  const batchSize = 4;
  for (let i = 0; i < imageUrls.length; i += batchSize) {
    const batch = imageUrls.slice(i, i + batchSize);
    await Promise.all(batch.map(async (url) => {
      try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        const filename = pathParts.pop() || 'image';
        // Keep original filename, prepend directory context
        const parentDir = pathParts.slice(-2).join('-') || 'misc';
        const safeName = `${parentDir}-${filename}`.replace(/[^a-zA-Z0-9._-]/g, '_');
        const dest = resolve(PUBLIC_DIR, safeName);
        
        if (require('fs').existsSync(dest)) {
          console.log(`  SKIP ${safeName} (already exists)`);
          success++;
          return;
        }
        
        await downloadFile(url, dest);
        console.log(`  OK ${safeName}`);
        success++;
      } catch (err) {
        console.log(`  FAIL ${url.slice(0, 80)}: ${err.message.slice(0, 50)}`);
        failed++;
      }
    }));
  }
  
  console.log(`\nDone: ${success} OK, ${failed} failed`);
  await ctx.close();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
