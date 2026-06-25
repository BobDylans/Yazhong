/**
 * Image URL utility
 *
 * During development: serves images from /public/images/
 * When deployed with R2: serves images from the admin Worker proxy
 *
 * Set NEXT_PUBLIC_ADMIN_URL in .env.local or .env.production.local:
 *   NEXT_PUBLIC_ADMIN_URL=https://admin.rimhappywoods.top
 *
 * If not set, falls back to local /images/ path.
 */

export function getImageUrl(path: string): string {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || process.env.NEXT_PUBLIC_R2_URL;

  // If admin URL is configured, proxy through the Worker's R2 endpoint
  if (adminUrl) {
    // path is like "/images/product-carseat1.jpg" or "/images/imgs/productsImgs/..."
    const filename = path.replace("/images/", "");
    // If it's already a full R2 path (starts with "imgs/"), use directly
    if (filename.startsWith("imgs/")) {
      return `${adminUrl}/r2/${filename}`;
    }
    // Legacy paths: map to the correct R2 folder
    // This handles the transition period where old code still uses /images/xxx.jpg
    return `${adminUrl}/r2/imgs/productsImgs/${filename}`;
  }

  // Otherwise use local path (dev mode)
  return path;
}
