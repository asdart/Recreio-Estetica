"use client";

import { useCartStore } from "./cart-store";

export function useCart() {
  const store = useCartStore();
  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    itemCount: store.itemCount(),
    subtotal: store.subtotal(),
  };
}
