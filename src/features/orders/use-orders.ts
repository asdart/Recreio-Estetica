import { mockOrders } from "@/mocks";
import type { Order } from "@/types";

export function useOrders(): Order[] {
  return mockOrders;
}
