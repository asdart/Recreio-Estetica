"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyState } from "@/components/commerce/empty-state";
import { ValidationStatusBanner } from "@/components/auth/validation-status-banner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/features/cart/use-cart";
import { useAuth } from "@/features/auth/use-auth";

export default function CarrinhoPage() {
  const { items } = useCart();
  const { access } = useAuth();

  if (items.length === 0) {
    return (
      <Container data-header-theme="dark" className="py-10 md:py-20">
        <EmptyState
          icon={<ShoppingBag className="h-16 w-16" />}
          title="Seu carrinho está vazio"
          description="Adicione produtos ao carrinho para continuar com a compra."
          action={
            <Button asChild>
              <Link href="/loja">Explorar Produtos</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  return (
    <Container data-header-theme="dark" className="py-10 md:py-16">
      <h1 className="mb-8 !text-3xl">Carrinho</h1>

      {/* Validation banner */}
      {access.isLoggedIn && access.validationStatus !== "approved" && (
        <ValidationStatusBanner
          status={access.validationStatus}
          className="mb-6"
        />
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-border/60">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <CartSummary />
        </div>
      </div>
    </Container>
  );
}
