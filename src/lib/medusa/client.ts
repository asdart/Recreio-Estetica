import { mockProducts, mockCategories, mockBrands } from "@/mocks";
import type { Product, Category, Brand } from "@/types";

/**
 * Placeholder Medusa client. All methods currently return mock data.
 * When integrating with MedusaJS, replace implementations with real API calls.
 */
export const medusaClient = {
  products: {
    list: async (): Promise<Product[]> => {
      return mockProducts;
    },
    retrieve: async (slug: string): Promise<Product | undefined> => {
      return mockProducts.find((p) => p.slug === slug);
    },
    listByCategory: async (categorySlug: string): Promise<Product[]> => {
      const category = mockCategories.find((c) => c.slug === categorySlug);
      if (!category) return [];
      return mockProducts.filter((p) => p.categoryId === category.id);
    },
    listFeatured: async (): Promise<Product[]> => {
      return mockProducts.filter((p) => p.featured);
    },
  },
  categories: {
    list: async (): Promise<Category[]> => {
      return mockCategories;
    },
    retrieve: async (slug: string): Promise<Category | undefined> => {
      return mockCategories.find((c) => c.slug === slug);
    },
  },
  brands: {
    list: async (): Promise<Brand[]> => {
      return mockBrands;
    },
  },
};
