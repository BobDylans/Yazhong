/**
 * Fetch JSON from a URL with cache fallback.
 *
 * Strategy:
 * 1. Try native fetch (Node 24+ honors HTTP_PROXY/HTTPS_PROXY when
 *    NODE_USE_ENV_PROXY=1 is set — set it automatically here so the
 *    original "curl because Node ignores proxy" workaround is no longer
 *    needed).
 * 2. On success: write the raw JSON to `cachePath` (if given) and return parsed.
 * 3. On failure: if `cachePath` exists, read it, log a clear WARNING that
 *    stale data is being used, return parsed. This keeps deploys working
 *    through transient API outages.
 * 4. On failure with no cache: throw. First-build/fresh-checkout case —
 *    failing loudly here is correct, otherwise `next build` fails later
 *    with a confusing "cannot find module" error.
 *
 * Exit code semantics are the caller's responsibility:
 *   - success or cache-fallback → exit 0
 *   - failure with no cache     → exit non-zero (let it throw)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// Force Node 24+ to honor HTTP_PROXY/HTTPS_PROXY/NO_PROXY env vars.
// Idempotent — only sets if not already set by the caller.
if (!process.env.NODE_USE_ENV_PROXY) {
  process.env.NODE_USE_ENV_PROXY = "1";
}

const DEFAULT_TIMEOUT_MS = 15000;

/**
 * @param {string} url
 * @param {object} opts
 * @param {string} [opts.cachePath]  Path to read on failure / write on success.
 * @param {string} [opts.label]      Human label for logs (e.g. "products").
 * @param {number} [opts.timeoutMs]
 * @returns {Promise<any>}           Parsed JSON (fresh or cached).
 */
export async function fetchJsonWithFallback(url, opts = {}) {
  const { cachePath, label = "resource", timeoutMs = DEFAULT_TIMEOUT_MS } = opts;

  let parsed;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    parsed = JSON.parse(text);
    console.log(`✅ Fetched ${label} (${url})`);

    if (cachePath) {
      mkdirSync(dirname(cachePath), { recursive: true });
      writeFileSync(cachePath, text);
    }
  } catch (err) {
    const reason = err?.name === "TimeoutError" ? "timeout" : err?.message || String(err);
    if (cachePath && existsSync(cachePath)) {
      console.warn(`⚠️  Fetch ${label} failed (${reason}) — using cached ${cachePath}`);
      parsed = JSON.parse(readFileSync(cachePath, "utf-8"));
    } else {
      throw new Error(
        `Fetch ${label} failed and no cache exists at ${cachePath || "(none)"}: ${reason}`
      );
    }
  }
  return parsed;
}
