import type { BlogPost } from "@/types";
import { generatedBlogPosts, generatedBlogCategories } from "./generated/blog-data";

export const blogPosts: BlogPost[] = generatedBlogPosts;
export const blogCategories: string[] = generatedBlogCategories;
