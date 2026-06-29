/**
 * Image URL utility
 *
 * Defaults to serving images from the local /public/images/ asset set
 * (the bundled demo product photos). To serve real product photos from the
 * admin Worker's R2 bucket instead, opt in with a single env flag:
 *
 *   NEXT_PUBLIC_USE_R2=true
 *   NEXT_PUBLIC_ADMIN_URL=https://admin.rimhappywoods.top
 *
 * Flip NEXT_PUBLIC_USE_R2 back off (or unset it) to return to local assets.
 */

export function getImageUrl(path: string): string {
  const useR2 = process.env.NEXT_PUBLIC_USE_R2 === "true";
  const adminUrl = useR2
    ? process.env.NEXT_PUBLIC_ADMIN_URL || process.env.NEXT_PUBLIC_R2_URL
    : null;

  // If R2 is opted in and an admin URL is configured, proxy through the Worker's R2 endpoint
  if (adminUrl) {
    // path is like "/images/product-carseat1.jpg" or "/images/imgs/productsImgs/..."
    const filename = path.replace("/images/", "");
    // If it's already a full R2 path (starts with "imgs/"), use directly
    if (filename.startsWith("imgs/")) {
      return `${adminUrl}/r2/${filename}`;
    }
    // Legacy paths: map to the correct R2 folder
    return `${adminUrl}/r2/imgs/productsImgs/${filename}`;
  }

  // Default: local /images/ assets. Generated API paths carry an "imgs/productsImgs/"
  // prefix that only exists on R2 — normalize to the flat local filename so the bundled
  // asset set resolves regardless of the path shape.
  const filename = path
    .replace("/images/", "")
    .replace(/^imgs\/productsImgs\//, "");
  return `/images/${filename}`;
}
