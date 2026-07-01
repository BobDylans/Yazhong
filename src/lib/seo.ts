import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rimhappywoods.top";

/**
 * Helper to create page-level metadata with canonical URL.
 * Usage in a page.tsx:
 *
 *   export const metadata = pageMetadata({
 *     title: "Products",
 *     description: "...",
 *     path: "/products",
 *   });
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — Yazhong`,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Yazhong`,
      description,
      images: [image],
    },
  };
}
