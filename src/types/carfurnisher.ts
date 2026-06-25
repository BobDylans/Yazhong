export interface Product {
  id: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  url: string;
  rating?: number;
  reviewCount?: number;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface BrandLogo {
  name: string;
  image: string;
  href?: string;
}

export interface IconFeature {
  icon: string;
  title: string;
  subtitle?: string;
}

export interface BlogPost {
  title: string;
  image: string;
  date?: string;
  excerpt: string;
  url: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date?: string;
  product?: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}
