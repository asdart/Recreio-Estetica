"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format-currency";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import type { Order } from "@/types";

type OrderCardProps = {
  order: Order;
};

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string }
> = {
  pending: { bg: "bg-[#f5f4f0]", text: "text-[#6a6662]" },
  confirmed: { bg: "bg-[#ecfdf5]", text: "text-[#007a55]" },
  processing: { bg: "bg-[#fffbeb]", text: "text-[#bb4d00]" },
  shipped: { bg: "bg-[#fffbeb]", text: "text-[#bb4d00]" },
  delivered: { bg: "bg-[#ecfdf5]", text: "text-[#007a55]" },
  cancelled: { bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
};

export function OrderCard({ order }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const style = STATUS_STYLES[order.status] ?? STATUS_STYLES.pending;
  const dateStr = new Date(order.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-[#e4dfd8] bg-[#faf9f7]">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-sans text-base font-semibold text-[#2b2927]">
              {order.number}
            </span>
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 font-sans text-[11px] font-medium",
                style.bg,
                style.text
              )}
            >
              {ORDER_STATUS_LABELS[order.status] ?? order.status}
            </span>
          </div>
          <span className="font-sans text-sm text-[#6a6662]">
            Realizado em {dateStr}
          </span>
          {order.status === "shipped" && (
            <p className="font-sans text-sm text-[#6a6662]">
              Rastreio:{" "}
              <span className="font-semibold text-[#2b2927] underline">
                BR123456789BR
              </span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-base font-semibold text-[#2b2927]">
            {formatCurrency(order.total)}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-transform",
              expanded && "rotate-180"
            )}
            aria-label={expanded ? "Recolher detalhes" : "Expandir detalhes"}
          >
            <ChevronDown className="h-4 w-4 text-[#6a6662]" />
          </button>
        </div>
      </div>

      {/* Thumbnail strip (always visible) */}
      <div className="flex gap-2 px-6 pb-6">
        {order.items.slice(0, 4).map((item) => (
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
        {order.items.length > 4 && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#e4dfd8] bg-[#f0ece8] font-sans text-xs font-medium text-[#6a6662]">
            +{order.items.length - 4}
          </div>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[#e4dfd8] px-6 py-4">
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] border border-[#e4dfd8] bg-[#f0ece8]">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="font-sans text-sm font-medium text-[#2b2927]">
                    {item.productName}
                  </span>
                  <span className="font-sans text-xs text-[#6a6662]">
                    Qtd: {item.quantity}
                  </span>
                </div>
                <span className="font-sans text-sm font-medium text-[#2b2927]">
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-3 flex items-center justify-between border-t border-[#e4dfd8] pt-4">
            <span className="font-sans text-sm font-medium text-[#2b2927]">
              Total
            </span>
            <span className="font-sans text-sm font-semibold text-[#2b2927]">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      )}

      {/* Reorder button for delivered orders */}
      {order.status === "delivered" && (
        <div className="flex justify-end border-t border-[#e4dfd8] px-6 py-4">
          <Link
            href="/recompras"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f4f0] px-4 py-2 font-sans text-sm text-[#2b2927] transition-colors hover:bg-[#edeae5]"
          >
            <RotateCw className="h-4 w-4" strokeWidth={1.5} />
            Refazer pedido
          </Link>
        </div>
      )}
    </div>
  );
}
