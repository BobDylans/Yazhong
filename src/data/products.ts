import type { ProductCardData } from "@/components/ProductCard";
import { generatedProducts, generatedCategories } from "./generated/products-data";

export const products = generatedProducts as ProductCardData[];
export const productCategories = generatedCategories;
export const featuredProducts = (products as ProductCardData[]).slice(0, 8);
