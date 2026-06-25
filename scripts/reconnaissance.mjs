/**
 * Reconnaissance — luxuscarmats.com
 * Connects to Windows Chrome via CDP (port 9222)
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TARGET_URL = 'https://luxuscarmats.com';
const HOSTNAME = new URL(TARGET_URL).hostname;
const RESEARCH = resolve(ROOT, 'docs/research', HOSTNAME);
mkdirSync(RESEARCH, { recursive: true });

async function waitForContent(page) {
  await page.waitForLoadState('load', { timeout: 30000 });
  await page.waitForTimeout(2000);
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  await page.waitForTimeout(1000);
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { window.scrollTo(0, 0); });
  await page.waitForTimeout(500);
}

async function run() {
  console.log('=== Reconnaissance: luxuscarmats.com ===\n');
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 30000 });
  await waitForContent(page);
  console.log(`Title: "${await page.title()}"\n`);

  // ---- DESIGN TOKENS ----
  console.log('=== DESIGN TOKENS ===\n');

  const fonts = await page.evaluate(() => {
    const textEls = document.querySelectorAll('h1, h2, h3, h4, p, a, button, span, li');
    const f = new Set(), w = new Set();
    textEls.forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.fontFamily) f.add(cs.fontFamily);
      if (cs.fontWeight) w.add(cs.fontWeight);
    });
    const links = [...document.querySelectorAll('link')].map(l => l.href);
    return {
      families: [...f], weights: [...w],
      googleFonts: links.filter(h => h.includes('googleapis')),
    };
  });
  console.log('Fonts:', fonts.families.join(' | '));
  if (fonts.googleFonts.length) console.log('Google Fonts:', fonts.googleFonts);
  console.log('Weights:', [...new Set(fonts.weights)].join(', '));

  const colors = await page.evaluate(() => {
    const cssVars = {};
    const rootCS = getComputedStyle(document.documentElement);
    for (let i = 0; i < rootCS.length; i++) {
      const n = rootCS[i];
      if (n.startsWith('--')) cssVars[n] = rootCS.getPropertyValue(n).trim();
    }
    const tags = ['body','h1','h2','h3','p','a','button','header','footer'];
    const elementColors = {};
    tags.forEach(t => {
      const el = document.querySelector(t);
      if (el) {
        const cs = getComputedStyle(el);
        elementColors[t] = { color: cs.color, bg: cs.backgroundColor };
      }
    });
    return { cssVars, elementColors };
  });
  console.log(`\nCSS variables: ${Object.keys(colors.cssVars).length}`);
  Object.entries(colors.cssVars).slice(0, 20).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  console.log('\nElement colors:');
  Object.entries(colors.elementColors).forEach(([tag, c]) => console.log(`  ${tag}: color=${c.color}, bg=${c.bg}`));

  // ---- PAGE TOPOLOGY ----
  console.log('\n=== PAGE TOPOLOGY ===');
  const topology = await page.evaluate(() => {
    const sections = [];
    const candidates = document.querySelectorAll(
      'section, header, footer, nav, div[id], ' +
      'div[class*="hero"], div[class*="section"], div[class*="banner"], ' +
      'div[class*="grid"], div[class*="container"], div[class*="content"], ' +
      'div[class*="product"], div[class*="feature"], div[class*="card"]'
    );
    const seen = new Set();
    candidates.forEach(el => {
      if (el.offsetHeight < 50) return;
      const key = el.tagName + '.' + (el.className?.toString() || '').slice(0, 30);
      if (seen.has(key)) return; seen.add(key);
      const r = el.getBoundingClientRect();
      if (r.width < 200) return;
      const heading = el.querySelector('h1, h2, h3, h4');
      sections.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        classes: (el.className?.toString() || '').slice(0, 150),
        rect: `top=${Math.round(r.top)} h=${Math.round(r.height)} w=${Math.round(r.width)}`,
        heading: heading?.textContent?.trim().slice(0, 80) || '',
        imgs: el.querySelectorAll('img').length,
        links: el.querySelectorAll('a').length,
      });
    });
    return sections;
  });
  console.log(`Found ${topology.length} sections:`);
  topology.forEach((s, i) => {
    const h = s.heading ? ` "${s.heading}"` : '';
    console.log(`  [${i}] <${s.tag}> ${s.rect}${h}`);
    if (s.classes) console.log(`       ${s.classes.slice(0, 100)}`);
  });

  // ---- ASSETS ----
  console.log('\n=== ASSETS ===');
  const assets = await page.evaluate(() => {
    const images = [...document.querySelectorAll('img')]
      .filter(img => img.src && !img.src.startsWith('data:'))
      .map(img => ({ src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight }));
    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => l.href);
    return { images: images.slice(0, 20), favicons };
  });
  console.log(`Images: ${assets.images.length}`);
  assets.images.forEach(img => console.log(`  ${img.w}x${img.h} ${img.src.slice(0, 100)}`));
  console.log(`Favicons: ${assets.favicons.length}`);

  // ---- BEHAVIORS ----
  console.log('\n=== BEHAVIORS ===');
  const behaviors = await page.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      sticky: [...document.querySelectorAll('*')]
        .filter(el => ['sticky','fixed'].includes(getComputedStyle(el).position))
        .map(el => ({ tag: el.tagName, cls: (el.className||'').slice(0,60), text: (el.textContent||'').trim().slice(0,40) })),
    };
  });
  console.log(`Scroll height: ${behaviors.scrollHeight}px`);
  console.log(`Sticky/fixed: ${behaviors.sticky.length}`);
  behaviors.sticky.forEach(e => console.log(`  <${e.tag}> "${e.text}"`));

  // ---- SAVE ----
  const report = { url: TARGET_URL, fonts, colors, topology, assets, behaviors };
  writeFileSync(resolve(RESEARCH, 'reconnaissance-report.json'), JSON.stringify(report, null, 2));
  console.log(`\n✅ Report → ${RESEARCH}/reconnaissance-report.json`);
  await ctx.close();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
