import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rimhappywoods.top";
  const lastModified = new Date();

  const staticPages = [
    {
      url: `${base}/`,
      priority: 1.0,
      changeFrequency: "weekly" as const,
    },
    {
      url: `${base}/products`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      url: `${base}/blog`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      url: `${base}/about`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${base}/contact`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
  ];

  // Blog posts (from hardcoded data)
  const blogSlugs = [
    "how-to-choose-car-seat-covers",
    "benefits-leather-steering-wheel-cover",
    "interior-car-care-tips",
    "why-custom-fit-seat-covers",
    "floor-mats-protection-guide",
    "car-accessories-upgrade-2026",
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    priority: 0.5,
    changeFrequency: "monthly" as const,
    lastModified,
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified })),
    ...blogPages,
  ];
}
