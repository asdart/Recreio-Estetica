import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { CartItem } from "@/types";

export function buildWhatsAppCartMessage(items: CartItem[]): string {
  if (items.length === 0) return "Olá! Gostaria de tirar uma dúvida.";

  const lines = items.map(
    (item) =>
      `• ${item.product.name} — Qtd: ${item.quantity} — ${formatCurrency(item.product.price * item.quantity)}`
  );

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return [
    "Olá! Gostaria de fazer um pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(total)}`,
    "",
    "Aguardo retorno para confirmar.",
  ].join("\n");
}

export function buildWhatsAppProductMessage(productName: string): string {
  return `Olá! Gostaria de saber mais sobre o produto: ${productName}`;
}

export function getWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
