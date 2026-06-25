/**
 * Phase 1: Reconnaissance — design token & page structure extraction
 * Connects to Windows Chrome via CDP (port 9222)
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TARGET_URL = 'https://carfurnisher.com/?srsltid=AfmBOopik9NFweLkq6kD2EhqSoOTU7Xp6yD4THgpWmaACtuW8tePWJSG';
const HOSTNAME = new URL(TARGET_URL).hostname;
const RESEARCH = resolve(ROOT, 'docs/research', HOSTNAME);
mkdirSync(RESEARCH, { recursive: true });

async function waitForContent(page) {
  await page.waitForLoadState('load', { timeout: 30000 });
  await page.waitForTimeout(2000);
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  await page.waitForTimeout(1000);
  // Scroll to trigger lazy loading
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { window.scrollTo(0, 0); });
  await page.waitForTimeout(500);
}

async function run() {
  console.log('=== Reconnaissance ===\n');
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 30000 });
  await waitForContent(page);
  console.log(`Page: "${await page.title()}"\n`);

  // ---- DESIGN TOKENS ----
  console.log('=== DESIGN TOKENS ===\n');

  // Fonts
  const fonts = await page.evaluate(() => {
    const textEls = document.querySelectorAll('h1, h2, h3, h4, p, a, button, span, li, label, input, .text, [class*="font"], [class*="text-"]');
    const f = new Set(), w = new Set();
    textEls.forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.fontFamily) f.add(cs.fontFamily);
      if (cs.fontWeight) w.add(cs.fontWeight);
    });
    const links = [...document.querySelectorAll('link')].map(l => l.href);
    return {
      families: [...f],
      weights: [...w],
      googleFonts: links.filter(h => h.includes('googleapis')),
      preconnect: links.filter(h => h.includes('preconnect')),
    };
  });
  console.log('Fonts:');
  fonts.families.forEach(f => console.log(`  - ${f}`));
  if (fonts.googleFonts.length) {
    console.log('Google Fonts URLs:');
    fonts.googleFonts.forEach(f => console.log(`  ${f}`));
  }
  if (fonts.weights.length) {
    console.log('Weights used:', [...new Set(fonts.weights)].join(', '));
  }

  // Colors — systematic extraction
  const colors = await page.evaluate(() => {
    // Extract all unique colors from the page's CSS
    const styleEls = [...document.querySelectorAll('style, link[rel="stylesheet"]')];
    const allRules = [];
    styleEls.forEach(el => {
      try {
        if (el.sheet) allRules.push(...el.sheet.cssRules);
      } catch {}
    });
    const cssTexts = styleEls.map(el => el.textContent || '').join('\n');

    // CSS custom properties
    const cssVars = {};
    const rootCS = getComputedStyle(document.documentElement);
    for (let i = 0; i < rootCS.length; i++) {
      const n = rootCS[i];
      if (n.startsWith('--')) cssVars[n] = rootCS.getPropertyValue(n).trim();
    }

    // Extract all unique rgb/rgba/hex colors from computed styles
    const colorSet = new Set();
    const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, li, label, div, section, header, footer, nav, input, img');
    els.forEach(el => {
      const cs = getComputedStyle(el);
      ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderBottomColor'].forEach(p => {
        const v = cs[p];
        if (v && v !== 'transparent' && v !== 'rgba(0, 0, 0, 0)') colorSet.add(v);
      });
    });

    // Extract important colors per element type
    const elementColors = {
      background: (() => {
        const bg = getComputedStyle(document.body).backgroundColor;
        return bg;
      })(),
      text: getComputedStyle(document.body).color,
    };
    ['h1', 'h2', 'h3', 'a', 'button', 'header', 'footer'].forEach(tag => {
      const el = document.querySelector(tag);
      if (el) {
        const cs = getComputedStyle(el);
        elementColors[tag] = { color: cs.color, bg: cs.backgroundColor };
      }
    });

    return {
      cssVars,
      elementColors,
      palette: [...colorSet].slice(0, 50),
      cssTextSample: cssTexts.slice(0, 3000),
    };
  });
  console.log('\nCSS Variables:', Object.keys(colors.cssVars).length);
  Object.entries(colors.cssVars).slice(0, 30).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  console.log('\nElement colors:');
  Object.entries(colors.elementColors).forEach(([tag, c]) => {
    if (typeof c === 'string') console.log(`  ${tag}: ${c}`);
    else console.log(`  ${tag}: color=${c.color}, bg=${c.bg}`);
  });

  console.log('\nColor palette (unique):');
  colors.palette.slice(0, 20).forEach(c => console.log(`  ${c}`));

  // ---- SPACING & LAYOUT ----
  const layout = await page.evaluate(() => {
    const body = document.body;
    const cs = getComputedStyle(body);
    return {
      bodyMargin: cs.margin,
      bodyPadding: cs.padding,
      maxWidth: cs.maxWidth,
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      color: cs.color,
      bgColor: cs.backgroundColor,
    };
  });
  console.log('\nBody layout:', JSON.stringify(layout, null, 2));

  // ---- PAGE TOPOLOGY ----
  console.log('\n=== PAGE TOPOLOGY ===');
  const topology = await page.evaluate(() => {
    // Find all major visual sections
    const candidates = document.querySelectorAll(
      'body > :not(script):not(style):not(noscript), ' +
      '#main > :not(script):not(style), ' +
      '[role="main"] > :not(script):not(style), ' +
      'header, footer, nav, section, ' +
      'div[id], div[class*="section"], div[class*="hero"], div[class*="banner"], ' +
      'div[class*="grid"], div[class*="container"], div[class*="wrapper"], ' +
      'div[class*="content"], div[class*="product"], div[class*="feature"], ' +
      'div[class*="showcase"], div[class*="gallery"], div[class*="list"], ' +
      'div[class*="card"], div[class*="row"]'
    );
    const seen = new Set();
    const sections = [];
    candidates.forEach(el => {
      if (el.offsetHeight < 50) return;
      const key = el.tagName + '.' + (el.className?.toString() || '').slice(0, 30);
      if (seen.has(key)) return; seen.add(key);
      const r = el.getBoundingClientRect();
      if (r.width < 200) return;
      const heading = el.querySelector('h1, h2, h3, h4, h5, h6');
      const imgs = el.querySelectorAll('img');
      const links = el.querySelectorAll('a');
      sections.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        classes: (el.className?.toString() || '').slice(0, 150),
        rect: `top=${Math.round(r.top)} h=${Math.round(r.height)} w=${Math.round(r.width)}`,
        heading: heading?.textContent?.trim().slice(0, 80) || '',
        images: imgs.length,
        links: links.length,
        children: el.children.length,
      });
    });
    return sections;
  });

  console.log(`\nFound ${topology.length} sections:`);
  topology.forEach((s, i) => {
    const h = s.heading ? ` "${s.heading}"` : '';
    console.log(`\n  [${i}] <${s.tag}> ${s.rect}${h}`);
    console.log(`       class: ${s.classes.slice(0, 100)}`);
    if (s.images) console.log(`       images: ${s.images}, links: ${s.links}`);
  });

  // ---- ASSETS ----
  console.log('\n=== ASSETS ===');
  const assets = await page.evaluate(() => {
    const images = [...document.querySelectorAll('img')]
      .filter(img => img.src && !img.src.startsWith('data:'))
      .map(img => ({ src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight }));
    const bgImgs = [...document.querySelectorAll('*')]
      .filter(el => {
        const bg = getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none' && bg.includes('url');
      })
      .map(el => ({ url: getComputedStyle(el).backgroundImage, tag: el.tagName }))
      .slice(0, 20);
    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => l.href);
    return { images, bgImages: bgImgs, favicons };
  });
  console.log(`Images: ${assets.images.length}`);
  assets.images.slice(0, 10).forEach(img => console.log(`  ${img.w}x${img.h} ${img.src.slice(0, 120)}`));
  console.log(`BG images: ${assets.bgImages.length}`);
  console.log(`Favicons: ${assets.favicons.length}`);

  // ---- BEHAVIORS ----
  console.log('\n=== BEHAVIORS ===');
  const behaviors = await page.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      sticky: [...document.querySelectorAll('*')]
        .filter(el => ['sticky', 'fixed'].includes(getComputedStyle(el).position))
        .map(el => ({ tag: el.tagName, cls: (el.className?.toString() || '').slice(0, 60), text: (el.textContent || '').trim().slice(0, 40) })),
      animating: [...document.querySelectorAll('*')].filter(el => {
        const a = getComputedStyle(el).animation; return a && a !== 'none';
      }).length,
      transitions: [...document.querySelectorAll('*')].filter(el => {
        const t = getComputedStyle(el).transition; return t && t !== 'none' && !t.includes('none');
      }).length,
    };
  });
  console.log(`Scroll height: ${behaviors.scrollHeight}px`);
  console.log(`Sticky/fixed: ${behaviors.sticky.length}`);
  behaviors.sticky.forEach(e => console.log(`  <${e.tag}> "${e.text}"`));
  console.log(`Elements with animations: ${behaviors.animating}`);
  console.log(`Elements with transitions: ${behaviors.transitions}`);

  // ---- SAVE ----
  const report = {
    url: TARGET_URL,
    timestamp: new Date().toISOString(),
    fonts, colors, layout, topology, assets, behaviors,
  };
  writeFileSync(resolve(RESEARCH, 'reconnaissance-report.json'), JSON.stringify(report, null, 2));
  console.log(`\n✅ Report → ${RESEARCH}/reconnaissance-report.json`);
  await ctx.close();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
