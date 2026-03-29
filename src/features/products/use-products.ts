import { mockProducts } from "@/mocks";
import { mockCategories } from "@/mocks";
import type { Product } from "@/types";

export function useProducts(categorySlug?: string): Product[] {
  if (!categorySlug) return mockProducts;
  const category = mockCategories.find((c) => c.slug === categorySlug);
  if (!category) return mockProducts;
  return mockProducts.filter((p) => p.categoryId === category.id);
}

export function useFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.featured);
}
