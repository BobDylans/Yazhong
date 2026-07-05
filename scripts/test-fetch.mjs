#!/usr/bin/env node
/**
 * Smoke test for scripts/lib/fetch-with-fallback.mjs
 *
 * Exercises three paths:
 *   1. Live fetch against the real admin API (integration).
 *   2. Cache fallback: force a bad URL, verify cached file is returned.
 *   3. No-cache failure: bad URL + no cache file, verify it throws.
 *
 * Run: node scripts/test-fetch.mjs
 */
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fetchJsonWithFallback } from "./lib/fetch-with-fallback.mjs";

const ADMIN_API = process.env.ADMIN_API_URL || "https://admin.rimhappywoods.top";
let failures = 0;
function assert(cond, msg) {
  if (cond) {
    console.log("  ✓ " + msg);
  } else {
    console.error("  ✗ " + msg);
    failures++;
  }
}

async function test1_liveFetch() {
  console.log("\n[1] Live fetch against admin API");
  const tmp = mkdtempSync(join(tmpdir(), "fwb-"));
  const cache = join(tmp, "products.json");
  try {
    const data = await fetchJsonWithFallback(`${ADMIN_API}/api/products`, {
      cachePath: cache,
      label: "products (live)",
      timeoutMs: 10000,
    });
    assert(Array.isArray(data), "returns an array");
    assert(data.length > 0, `array is non-empty (${data.length} items)`);
    const fs = await import("node:fs");
    assert(fs.existsSync(cache), "cache file was written on success");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function test2_cacheFallback() {
  console.log("\n[2] Cache fallback on failure");
  const tmp = mkdtempSync(join(tmpdir(), "fwb-"));
  const cache = join(tmp, "cached.json");
  // Pre-populate cache so fallback has something to read.
  writeFileSync(cache, JSON.stringify({ cached: true, items: [1, 2, 3] }));
  try {
    const data = await fetchJsonWithFallback("https://127.0.0.1:1/definitely-down", {
      cachePath: cache,
      label: "cached resource",
      timeoutMs: 500,
    });
    assert(data && data.cached === true, "returns cached content on fetch failure");
    assert(Array.isArray(data.items) && data.items.length === 3, "cached payload intact");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function test3_noCacheFailure() {
  console.log("\n[3] No-cache failure throws");
  const tmp = mkdtempSync(join(tmpdir(), "fwb-"));
  const cache = join(tmp, "never-existed.json"); // not created
  try {
    let threw = false;
    try {
      await fetchJsonWithFallback("https://127.0.0.1:1/definitely-down", {
        cachePath: cache,
        label: "uncached resource",
        timeoutMs: 500,
      });
    } catch {
      threw = true;
    }
    assert(threw, "throws when fetch fails and no cache exists");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

const tests = [test1_liveFetch, test2_cacheFallback, test3_noCacheFailure];
for (const t of tests) {
  try {
    await t();
  } catch (err) {
    console.error(`  ✗ test threw: ${err.message}`);
    failures++;
  }
}
console.log("\n" + (failures === 0 ? "✅ All tests passed" : `❌ ${failures} test(s) failed`));
process.exit(failures === 0 ? 0 : 1);
