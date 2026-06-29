# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Architecture — Yazhong (car-accessories marketing site)

This repo is a customized instance of the "AI Website Cloner Template" (see `AGENTS.md`). The
template's `/clone-website` workflow and `docs/research/` inspection process are inherited. The
notes below are the project-specific architecture that is **not** in `AGENTS.md` and that requires
reading several files to piece together.

### Static export — there is no server runtime
- `next.config.ts` sets `output: "export"` and `images.unoptimized: true`. The whole app compiles
  to a static site in `out/`. **There is no Next.js server**, so server-only features do not work:
  API routes, SSR, `next/image` optimization, and dynamic routes without `generateStaticParams`.
- Deploy target is **Cloudflare Pages** (`wrangler.toml` → `pages_build_output_dir = "out/"`,
  built via `@cloudflare/next-on-pages`). Product images are served from an **R2 bucket**
  (`yazhong-images`).

### Build-time data pipeline (the key thing to know)
Product data is pulled from an external admin API at **build time**, never at request time:

1. `npm run build` runs `prebuild` → `scripts/fetch-products.mjs`.
2. That script GETs `https://admin.rimhappywoods.top/api/products`, maps fields
   (`image_key` → `/images/<key>`, `category_name` → `category`, `badge_color` → `badgeColor`),
   drops items without an image, and writes `src/data/generated/products.json` + `categories.json`.
3. `src/data/products.ts` imports the generated JSON and re-exports `products`,
   `productCategories`, `featuredProducts`. If the JSON is missing it falls back to a hardcoded
   sample array in the same file.

Gotchas:
- **`npm run dev` does NOT run prebuild** (only `build` does), so dev shows the hardcoded sample
  data while prod shows live API data. To verify real product content locally, run `npm run build`
  and inspect `src/data/generated/*.json` (or serve `out/`).
- The fetch script **hardcodes** the API URL — `.env.local`'s `NEXT_PUBLIC_ADMIN_URL` is currently
  unused by it. Moving the endpoint means editing `scripts/fetch-products.mjs`.
- The script `process.exit(0)` on failure so it never fails the build; a broken API silently
  leaves stale/fallback data. Watch build logs for the `❌` line.

### Data model & pages
- Canonical product shape is `ProductCardData` in `src/components/ProductCard.tsx`; the admin API's
  raw shape lives in `src/types/carfurnisher.ts`. Pages consume only the mapped `products.ts`
  exports, never the raw API response.
- Routes: `/` (Hero → IconFeatures → Featured → BrandMarquee → Blog), `/products` (client-side
  category filter, reads `?category=`), `/blog` + `/blog/[slug]`, `/about`, `/contact`.
- Animation is a **mix of two systems** (not yet unified): (1) `framer-motion` — used by
  `src/components/ProductCard.tsx` and the variants in `src/lib/animations.tsx`; (2) a hand-rolled
  CSS scroll-reveal — `src/components/Reveal.tsx` + `src/hooks/useScrollReveal.ts` + keyframes in
  `globals.css`. Note: `framer-motion` is present in `node_modules` but is **not listed in
  `package.json`** (add it explicitly if you regenerate the lockfile). `src/lib/animations.tsx`
  also dynamically imports `lenis` for smooth scroll.
