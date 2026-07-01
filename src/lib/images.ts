/**
 * Image URL utility
 *
 * All images are stored in R2 and served through the admin Worker proxy.
 * Paths contain "imgs/" prefix after stripping "/images/":
 *   /images/imgs/productsImgs/xxx.webp → proxied through admin
 */

export function getImageUrl(path: string): string {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  // R2 images carry an "imgs/" prefix after "/images/"
  const r2path = path.replace("/images/", "");
  if (r2path.startsWith("imgs/")) {
    // Proxy through admin Worker
    return adminUrl ? `${adminUrl}/r2/${r2path}` : path;
  }

  // Fallback (legacy local paths)
  return path;
}
