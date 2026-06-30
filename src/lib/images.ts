/**
 * Image URL utility
 *
 * Two types of image paths:
 * 1. Local: "/images/product-carseat1.jpg" — served as static files (via Cloudflare Pages)
 * 2. R2-only: "/images/imgs/productsImgs/y35-brown.jpg" — proxied through admin Worker
 *
 * When the path starts with "imgs/" after stripping "/images/", it's an R2-only image
 * that must be served through the admin proxy. Other paths are local static assets.
 */

export function getImageUrl(path: string): string {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  // R2-only images carry an "imgs/" prefix after "/images/"
  const r2path = path.replace("/images/", "");
  if (r2path.startsWith("imgs/")) {
    // Proxy through admin Worker
    return adminUrl ? `${adminUrl}/r2/${r2path}` : path;
  }

  // Local static asset (bundled with Cloudflare Pages)
  return path;
}
