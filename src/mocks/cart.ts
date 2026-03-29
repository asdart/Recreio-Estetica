import { Cart } from "@/types";
import { mockProducts } from "./products";

export const mockCartEmpty: Cart = {
  id: "cart-empty",
  items: [],
  subtotal: 0,
  total: 0,
};

export const mockCartWithItems: Cart = {
  id: "cart-1",
  items: [
    {
      id: "ci-1",
      product: mockProducts[0],
      quantity: 2,
    },
    {
      id: "ci-2",
      product: mockProducts[2],
      quantity: 3,
    },
    {
      id: "ci-3",
      product: mockProducts[5],
      quantity: 1,
    },
  ],
  subtotal: 2 * 890 + 3 * 650 + 1 * 1850,
  total: 2 * 890 + 3 * 650 + 1 * 1850,
};
