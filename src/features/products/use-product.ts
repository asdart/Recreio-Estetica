import { mockProducts } from "@/mocks";
import type { Product } from "@/types";

export function useProduct(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}
