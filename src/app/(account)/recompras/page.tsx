"use client";

import Link from "next/link";
import Image from "next/image";
import { Wallet, ShoppingBag } from "lucide-react";
import { useOrders } from "@/features/orders/use-orders";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCartStore } from "@/features/cart/cart-store";
import { mockProducts } from "@/mocks";

export default function RecomprasPage() {
  const orders = useOrders();
  const addItem = useCartStore((s) => s.addItem);

  const deliveredOrders = orders.filter((o) => o.status === "delivered");

  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(43,41,39,0.08)]">
          <Wallet className="h-5 w-5 text-[#2b2927]" strokeWidth={1.5} />
        </div>
        <h2 className="font-heading text-[32px] leading-10 tracking-[0.3px] text-[#2b2927]">
          Carteira
        </h2>
      </div>

      {deliveredOrders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f4f0]">
            <Wallet className="h-8 w-8 text-[#c8c4be]" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-heading text-xl text-[#2b2927]">
              Nenhuma recompra disponível
            </p>
            <p className="font-sans text-sm text-[#9c9690]">
              Quando você tiver pedidos entregues, poderá repeti-los aqui.
            </p>
          </div>
          <Link
            href="/loja"
            className="inline-flex items-center rounded-full border border-[#4a4744] px-6 py-3 font-sans text-sm tracking-[0.4px] text-[#2b2927] transition-colors hover:bg-[#2b2927] hover:text-[#fdfcfb]"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {deliveredOrders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-3xl border border-[#e4dfd8] bg-[#faf9f7] p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-sans text-base font-semibold text-[#2b2927]">
                    {order.number}
                  </p>
                  <p className="font-sans text-sm text-[#6a6662]">
                    {new Date(order.createdAt).toLocaleDateString("pt-BR")} —{" "}
                    {formatCurrency(order.total)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    order.items.forEach((item) => {
                      const product = mockProducts.find(
                        (p) => p.id === item.productId
                      );
                      if (product) addItem(product, item.quantity);
                    });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#2b2927] px-5 py-2.5 font-sans text-sm text-[#f5f4f0] transition-colors hover:bg-[#3a3835]"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  Repetir Pedido
                </button>
              </div>
              <div className="flex gap-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#e4dfd8] bg-[#f0ece8]"
                  >
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 font-sans text-sm text-[#6a6662]">
                {order.items.map((item) => item.productName).join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
