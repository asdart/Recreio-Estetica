"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { Container } from "@/components/layout/container";
import { OrderCard } from "@/components/account/order-card";
import { EmptyState } from "@/components/commerce/empty-state";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/features/orders/use-orders";

export default function MeusPedidosPage() {
  const orders = useOrders();

  return (
    <Container data-header-theme="dark" className="py-10 md:py-16">
      <h1 className="mb-8 !text-3xl">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <EmptyState
          icon={<Package className="h-16 w-16" />}
          title="Nenhum pedido ainda"
          description="Quando você fizer seu primeiro pedido, ele aparecerá aqui."
          action={
            <Button asChild>
              <Link href="/loja">Explorar Produtos</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </Container>
  );
}
