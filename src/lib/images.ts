/**
 * Image URL utility
 *
 * During development: serves images from /public/images/
 * When deployed with R2: serves images from Cloudflare R2
 *
 * To enable R2 mode, set NEXT_PUBLIC_R2_URL in .env.local:
 *   NEXT_PUBLIC_R2_URL=https://pub-xxxxx.r2.dev
 */

export function getImageUrl(path: string): string {
  const r2Url = process.env.NEXT_PUBLIC_R2_URL;

  // If R2 is configured, use it
  if (r2Url) {
    // path is like "/images/production_2.webp"
    const filename = path.replace("/images/", "");
    return `${r2Url}/${filename}`;
  }

  // Otherwise use local path
  return path;
}
