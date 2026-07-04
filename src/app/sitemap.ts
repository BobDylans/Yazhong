import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { blogPosts } from "@/data/blog-posts";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rimhappywoods.top";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE_URL}/products`, lastModified, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE_URL}/blog`, lastModified, priority: 0.7, changeFrequency: "weekly" },
    { url: `${SITE_URL}/about`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`, lastModified, priority: 0.6, changeFrequency: "monthly" },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    lastModified,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified,
    priority: 0.5,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
