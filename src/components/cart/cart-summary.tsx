"use client";

import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useAuth } from "@/features/auth/use-auth";
import { useCart } from "@/features/cart/use-cart";
import {
  buildWhatsAppCartMessage,
  getWhatsAppUrl,
} from "@/features/whatsapp/whatsapp-utils";

export function CartSummary() {
  const { items, subtotal } = useCart();
  const { access } = useAuth();

  const whatsappUrl = getWhatsAppUrl(buildWhatsAppCartMessage(items));

  return (
    <div className="rounded-lg border border-border/60 bg-card p-6">
      <h3 className="!text-lg mb-4 !font-sans font-semibold">Resumo</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Frete</span>
          <span className="text-muted-foreground">Calculado no checkout</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {!access.isLoggedIn ? (
          <Button asChild size="lg" className="w-full">
            <Link href="/login">Faça login para finalizar</Link>
          </Button>
        ) : access.canCheckout ? (
          <Button asChild size="lg" className="w-full">
            <Link href="/checkout">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Finalizar Pedido
            </Link>
          </Button>
        ) : (
          <Button size="lg" className="w-full" disabled>
            Aguardando validação profissional
          </Button>
        )}

        <Button variant="outline" size="lg" className="w-full" asChild>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Enviar Pedido via WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
