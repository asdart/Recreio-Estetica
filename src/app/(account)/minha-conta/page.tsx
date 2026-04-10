"use client";

import { useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderCard } from "@/components/account/order-card";
import { useOrders } from "@/features/orders/use-orders";
import type { OrderStatus } from "@/types";

const TABS = [
  { key: "all", label: "Sobre" },
  { key: "processing", label: "Processando" },
  { key: "shipped", label: "Em trânsito" },
  { key: "delivered", label: "Entregues" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const STATUS_MAP: Record<TabKey, OrderStatus[] | null> = {
  all: null,
  processing: ["pending", "confirmed", "processing"],
  shipped: ["shipped"],
  delivered: ["delivered"],
};

export default function MinhaContaPage() {
  const orders = useOrders();
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filtered =
    STATUS_MAP[activeTab] === null
      ? orders
      : orders.filter((o) => STATUS_MAP[activeTab]!.includes(o.status));

  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(43,41,39,0.08)]">
          <Package className="h-5 w-5 text-[#2b2927]" strokeWidth={1.5} />
        </div>
        <h2 className="font-heading text-[32px] leading-10 tracking-[0.3px] text-[#2b2927]">
          Pedidos
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-full bg-[rgba(43,41,39,0.04)] p-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "min-w-[120px] rounded-full px-4 py-2.5 font-sans text-sm font-medium transition-colors",
              activeTab === key
                ? "bg-[#6a6662] text-white"
                : "text-[#6a6662] hover:bg-[rgba(43,41,39,0.04)]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f4f0]">
            <Package className="h-8 w-8 text-[#c8c4be]" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-heading text-xl text-[#2b2927]">
              Nenhum pedido encontrado
            </p>
            <p className="font-sans text-sm text-[#9c9690]">
              Quando você fizer um pedido, ele aparecerá aqui.
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
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
