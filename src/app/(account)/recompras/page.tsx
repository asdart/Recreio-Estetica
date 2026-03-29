"use client";

import Link from "next/link";
import { RefreshCw, ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/commerce/empty-state";
import { useOrders } from "@/features/orders/use-orders";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCartStore } from "@/features/cart/cart-store";
import { mockProducts } from "@/mocks";

export default function RecomprasPage() {
  const orders = useOrders();
  const addItem = useCartStore((s) => s.addItem);

  const deliveredOrders = orders.filter((o) => o.status === "delivered");

  if (deliveredOrders.length === 0) {
    return (
      <Container className="py-10 md:py-16">
        <h1 className="mb-8 !text-3xl">Recompras</h1>
        <EmptyState
          icon={<RefreshCw className="h-16 w-16" />}
          title="Nenhuma recompra disponível"
          description="Quando você tiver pedidos entregues, poderá repeti-los facilmente aqui."
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
    <Container className="py-10 md:py-16">
      <h1 className="mb-2 !text-3xl">Recompras</h1>
      <p className="mb-8 text-muted-foreground">
        Repita pedidos anteriores com um clique
      </p>

      <div className="space-y-4">
        {deliveredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-border/60 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium">{order.number}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR")} —{" "}
                  {formatCurrency(order.total)}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  order.items.forEach((item) => {
                    const product = mockProducts.find(
                      (p) => p.id === item.productId
                    );
                    if (product) addItem(product, item.quantity);
                  });
                }}
              >
                <ShoppingBag className="mr-2 h-3.5 w-3.5" />
                Repetir Pedido
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {order.items.map((item) => item.productName).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
