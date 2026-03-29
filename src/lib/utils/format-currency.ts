import { CURRENCY, LOCALE } from "@/lib/constants";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
}
