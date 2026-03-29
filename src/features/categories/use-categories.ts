import { mockCategories } from "@/mocks";
import type { Category } from "@/types";

export function useCategories(): Category[] {
  return mockCategories;
}
