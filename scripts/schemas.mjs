#!/usr/bin/env node
/**
 * Zod schemas for validating admin API responses at build time.
 *
 * These schemas match the RAW API response shape (before field mapping
 * in the fetch scripts), not the final mapped/transformed shape.
 * Extra fields are silently allowed so the admin can add new fields
 * without breaking the build.
 */
import { z } from "zod";

// ── Products ────────────────────────────────────────────────────────

export const rawProductSchema = z.object({
  id: z.string().or(z.number()),
  title: z.string(),
  image_key: z.string().optional(),
  description: z.string().optional().nullable(),
  badge: z.string().optional().nullable(),
  badge_color: z.string().optional().nullable(),
  category_name: z.string().optional().nullable(),
  series_name: z.string().optional().nullable(),
});

export const rawProductsResponseSchema = z.array(rawProductSchema);

// ── Blog posts ──────────────────────────────────────────────────────

export const rawBlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  image_key: z.string().optional().nullable(),
  published_at: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  published: z.boolean().or(z.number()).optional(),
});

export const rawBlogPostsResponseSchema = z.array(rawBlogPostSchema);