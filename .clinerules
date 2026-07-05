<!-- AUTO-GENERATED from AGENTS.md — do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Guidelines

A short, practical guide for AI assistants working in this codebase. AGENTS.md is the **single source of truth** for agent instructions — after editing it, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific files (`.github/copilot-instructions.md`, `.clinerules`, `.continue/rules/project.md`, etc.).

## Project Overview

**Yazhong** (`package.json` name: `ai-website-clone-template`) is a production e-commerce marketing site for premium custom-fit car seat covers, steering wheel covers, floor mats, and auto accessories. Built on the Next.js + shadcn/ui + Tailwind v4 website-clone template, deployed as a static export to Cloudflare Pages with R2 image storage. Content (products, blog) is fetched at build time from an external admin API and baked into static data modules.

- **Live site:** `https://rimhappywoods.top` (override with `NEXT_PUBLIC_SITE_URL`)
- **Admin API:** `https://admin.rimhappywoods.top` (override with `ADMIN_API_URL`)

## Architecture & Data Flow

```
Admin API ──(prebuild: fetch-*.mjs)──> src/data/generated/*.ts|json ──> Next.js build ──> static export (out/) ──> Cloudflare Pages
                                                  │
                                                  └── R2 bucket (yazhong-images) ── proxied via admin Worker `/r2/`
```

1. **Build-time data fetch** — `npm run prebuild` runs `scripts/fetch-products.mjs` and `scripts/fetch-blog.mjs`, which `curl` the admin API and write generated TS/JSON into `src/data/generated/`. These files are marked `// DO NOT EDIT` and committed.
2. **Data layer** — `src/data/products.ts` and `src/data/blog-posts.ts` re-export from `generated/` and derive views (`featuredProducts`, etc.). Components import from `src/data/*`, never from `generated/` directly.
3. **Rendering** — Next.js App Router with `output: "export"` (fully static). Pages are server components that import data modules; interactive UI is delegated to `"use client"` components.
4. **Images** — `src/lib/images.ts` `getImageUrl()` rewrites R2 paths (`/images/imgs/...`) to the admin Worker proxy when `NEXT_PUBLIC_ADMIN_URL` is set, else passes through.
5. **i18n** — Client-side `LocaleProvider` (React Context) with `en`/`ar` translation maps. RTL applied via `document.documentElement.dir`. Locale persisted in `localStorage` key `yazhong-locale`; an inline `<head>` script in `layout.tsx` sets `dir`/`lang` pre-hydration to avoid RTL flash.
6. **SEO** — `src/lib/seo.ts` `pageMetadata()` helper produces per-page `Metadata` with canonical URL. `sitemap.ts` and `robots.ts` are static routes. `src/lib/schema.tsx` emits JSON-LD.

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/` | App Router routes: `/`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/products`, `/products/[slug]`. Each route has `layout.tsx` + `page.tsx`; root `layout.tsx` sets fonts, metadata, `LocaleProvider`. `sitemap.ts`/`robots.ts`/`manifest.ts` at root. |
| `src/components/` | Feature components (PascalCase, almost all `"use client"`): `Header`, `Footer`, `HeroBanner`, `ProductCard`, `ProductDetails`, `ProductConfigurator`, `BlogCard`, `Reveal`, `BrandMarquee`, `ReviewsSection`, `CustomerGallery`, `WhatsAppButton`, `LanguageSwitcher`, etc. |
| `src/components/ui/` | shadcn/ui primitives (currently `button.tsx`). Style: `base-nova`, base color `neutral`. |
| `src/hooks/` | Custom hooks. Currently `useScrollReveal.ts` (IntersectionObserver-based reveal-on-scroll). |
| `src/lib/` | `utils.ts` (`cn()`), `config.ts` (WhatsApp helpers), `images.ts` (R2 URL rewriter), `seo.ts` (`pageMetadata`), `schema.tsx` (JSON-LD). |
| `src/types/` | `index.ts` (`BlogPost`, `Product`, `NavLink`, `BrandLogo`), `carfurnisher.ts`. |
| `src/data/` | `products.ts`, `blog-posts.ts`, `testimonials.ts` — curated re-exports. |
| `src/data/generated/` | Build-time output: `products-data.ts`, `products.json`, `categories.json`, `blog-data.ts`. **Do not hand-edit.** |
| `src/i18n/` | `LocaleProvider.tsx` (client context), `en.ts`, `ar.ts` (flat key→string maps). |
| `public/` | `images/` (downloaded/local assets), `og-image.png`, `icon.svg`, `manifest.webmanifest`. |
| `scripts/` | Build/asset/recon scripts (see below). |
| `docs/research/` | Inspection output: `INSPECTION_GUIDE.md` (referenced by `@docs/research/INSPECTION_GUIDE.md` import in this file). |
| `docs/design-references/` | Screenshots/comparison images. |
| `docs/superpowers/specs/` | Design specs. |

## Development Commands

```bash
npm run dev          # Next.js dev server
npm run build        # prebuild (fetch products+blog) + next build → static export to out/
npm run lint         # ESLint (flat config, next core-web-vitals + TS)
npm run typecheck    # tsc --noEmit
npm run check        # lint + typecheck + build (run before committing)
npm start            # next start (served build)
```

- **Deployment:** `bash scripts/deploy-cloudflare.sh` — builds, uploads `public/images/*` to R2 bucket `yazhong-images`, deploys `out/` to Cloudflare Pages.
- **Asset recon:** `node scripts/reconnaissance.mjs` (Playwright/CDP, writes to `docs/research/<hostname>/`) and `node scripts/download-assets.mjs` (downloads to `public/images/`).
- **Sync agent rules:** `bash scripts/sync-agent-rules.sh` after editing **AGENTS.md**.
- **Sync skills:** `node scripts/sync-skills.mjs` after editing `.claude/skills/clone-website/SKILL.md`.

## Code Conventions & Common Patterns

- **TypeScript strict**, `noEmit`, target ES2017, `moduleResolution: bundler`. Path alias `@/*` → `./src/*`.
- **Named exports** for components (`export function Header()`), no default exports except route handlers (`page.tsx`, `layout.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`).
- **PascalCase** component files, **camelCase** utility/hook files, **kebab-case** route directories.
- **2-space indent**, double quotes, semicolons, trailing commas.
- **Styling:** Tailwind v4 utilities only — no inline styles except dynamic transition values (see `Reveal.tsx`). `cn()` from `src/lib/utils.ts` for class merging. Design tokens as CSS variables in `src/app/globals.css` (`:root` light, `.dark` dark) — colors are hex/oklch, exposed via `@theme inline` to Tailwind. `cva` for component variants (shadcn).
- **Client vs server:** Route `page.tsx`/`layout.tsx` are server components where possible (import data, export `metadata`). Anything interactive (`useState`, `useEffect`, event handlers, `useLocale`) is a `"use client"` component — currently most feature components and several route pages (`/about`, `/blog`, `/contact`, `/products`) are client.
- **State management:** React `useState`/`useMemo` only — no global store. Cross-cutting UI state (locale) via `LocaleProvider` context.
- **Async/data fetching:** No runtime fetch. All data is build-time static imports from `src/data/*`. Dynamic routes (`[slug]`) use `generateStaticParams` + server `page.tsx` reading from data modules.
- **Animation:** CSS transitions via `Reveal` + `useScrollReveal` (IntersectionObserver). `framer-motion` and `lenis` (smooth scroll) are installed dependencies.
- **Icons:** `lucide-react` named imports (`import { Globe } from "lucide-react"`).
- **i18n consumption:** `const { t, locale, dir, isRTL } = useLocale();` then `t("key")`. Translation keys are flat strings in `src/i18n/en.ts`/`ar.ts`.
- **WhatsApp links:** Always via `whatsappUrl()` / `whatsappProductUrl()` from `src/lib/config.ts` — never hardcode the number.
- **Image URLs:** Always via `getImageUrl()` from `src/lib/images.ts` — R2 paths need proxying.
- **Error handling:** `try/catch` in scripts (e.g. `fetchJson` swallows proxy failures). Route-level `not-found.tsx`/`error.tsx` not present — add when needed.
- **No `any`.** Define types in `src/types/` and import.

## Important Files

- `src/app/layout.tsx` — root layout: Poppins + Tajawal fonts, full `Metadata`, `Viewport`, inline RTL-prevention script, `LocaleProvider`, `OrganizationSchema`.
- `src/app/page.tsx` — homepage.
- `src/app/sitemap.ts` / `robots.ts` / `manifest.ts` — static SEO routes.
- `src/i18n/LocaleProvider.tsx` — locale context, `t()`, RTL state.
- `src/lib/config.ts` — site config (WhatsApp number, default message).
- `src/lib/seo.ts` — `pageMetadata({ title, description, path, ogImage? })`.
- `src/lib/images.ts` — `getImageUrl()` R2 proxy rewriter.
- `src/data/generated/products-data.ts` / `blog-data.ts` — generated, do not edit.
- `next.config.ts` — `output: "export"`, `images.unoptimized: true` (required for static export).
- `components.json` — shadcn config (style `base-nova`, aliases `@/components`, `@/lib`, `@/hooks`).
- `wrangler.toml` — Cloudflare Pages + R2 binding `yazhong_images`.

## Runtime/Tooling Preferences

- **Node:** `>=24` (`.nvmrc` = `24`). Required — `next.config.ts` and modern syntax assume it.
- **Package manager:** `npm` is canonical (scripts use `npm run`). `bun.lock` is present but `package-lock.json` is the committed lockfile of record — prefer `npm install` / `npm run <script>`.
- **Build target:** Static export (`out/`). No Node server at runtime; all pages prerendered. Cloudflare Pages serves static assets; `nodejs_compat` flag set in `wrangler.toml`.
- **ESLint:** flat config (`eslint.config.mjs`), extends `eslint-config-next/core-web-vitals` + `/typescript`. Ignores `.next`, `out`, `build`, `next-env.d.ts`.

## Environment Variables

| Var | Used in | Default |
|-----|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `layout.tsx`, `seo.ts`, `schema.tsx`, `sitemap.ts`, `robots.ts`, `[slug]` pages | `https://rimhappywoods.top` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `lib/config.ts` | `15138009985` |
| `NEXT_PUBLIC_ADMIN_URL` | `lib/images.ts` (R2 proxy) | none — falls back to raw path |
| `ADMIN_API_URL` | `scripts/fetch-products.mjs`, `scripts/fetch-blog.mjs` | `https://admin.rimhappywoods.top` |

Set `NEXT_PUBLIC_*` at build time (baked into static export). `ADMIN_API_URL` is build-time only.

## Testing & QA

- **No test framework configured.** There are no `*.test.*` or `*.spec.*` files in `src/`; `playwright` is installed only for the `reconnaissance.mjs`/`download-assets.mjs` asset scripts, not for tests.
- **QA gate:** `npm run check` (lint + typecheck + build) is the canonical pre-commit verification — run it after non-trivial changes.
- **Build is the integration test:** because `prebuild` fetches live data from the admin API, a successful `npm run build` confirms data layer + types + rendering all line up. If the admin API is unreachable, `fetch-*.mjs` will fail the build (they use `curl -sf`).

## Workflow Notes

- When launching multiple agent teammates, have each work in its own worktree branch and merge at the end — you are the orchestrator with full context.
- After editing **AGENTS.md**, regenerate platform files with `bash scripts/sync-agent-rules.sh`.
- After editing `.claude/skills/clone-website/SKILL.md`, regenerate with `node scripts/sync-skills.mjs`.
- Agents that read AGENTS.md natively (no generated file needed): Codex CLI, OpenCode, Cursor, Windsurf, Copilot Coding Agent, Roo Code, Aider, Augment Code. Generated copies are for Cline, Continue, Amazon Q, GitHub Copilot Chat. Pointer files (`CLAUDE.md`, `GEMINI.md`, `.cursor/rules/project.mdc`, `.windsurfrules`, `.aider.conf.yml`) reference AGENTS.md directly.
