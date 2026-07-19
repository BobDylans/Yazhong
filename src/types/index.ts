export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

export interface ProductCardData {
  id: string;
  title: string;
  description?: string;
  image: string;
  badge?: string;
  badgeColor?: "red" | "blue" | "green" | "gold";
  category?: string;
  series?: string;
  /** Display-only price anchor (e.g. "From $89"). Optional — inquiry-driven model. */
  priceFrom?: string;
}
