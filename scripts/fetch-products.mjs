#!/usr/bin/env node
/**
 * Prebuild script: fetch products from admin API and save as JSON
 * This runs before `next build` so products stay up to date.
 */
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_URL = "https://admin.rimhappywoods.top/api/products";
const OUTPUT = path.resolve(__dirname, "..", "src/data/generated/products.json");
const CATE_OUT = path.resolve(__dirname, "..", "src/data/generated/categories.json");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Yazhong-Build" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode === 200) resolve(JSON.parse(data));
        else reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 100)}`));
      });
    }).on("error", reject);
  });
}

async function main() {
  console.log("📦 Fetching products from admin API...");
  const products = await fetch(API_URL);

  const mapped = products.map((p) => {
    // Determine image path: existing files use local path, new files use R2 path
    let image;
    if (p.image_key) {
      const localFile = path.resolve(__dirname, "..", "public/images/" + p.image_key.replace("imgs/productsImgs/", ""));
      if (fs.existsSync(localFile)) {
        // File exists locally — use flat path (served as static asset)
        image = "/images/" + p.image_key.replace("imgs/productsImgs/", "");
      } else {
        // File only in R2 — keep the full imgs/ prefix path
        image = "/images/" + p.image_key;
      }
    }
    return {
      id: p.id,
      title: p.title,
      description: p.description || undefined,
      image,
      badge: p.badge || undefined,
      badgeColor: p.badge_color || undefined,
      category: p.category_name || undefined,
    };
  }).filter(p => p.image); // only include products with images

  const cats = ["All", ...new Set(mapped.map((p) => p.category).filter(Boolean))];

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(mapped, null, 2));
  fs.writeFileSync(CATE_OUT, JSON.stringify(cats, null, 2));

  console.log(`✅ ${mapped.length} products saved to src/data/generated/`);
}

main().catch((err) => {
  console.error("❌ Failed to fetch products:", err.message);
  process.exit(0);
});
