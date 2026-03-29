import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format-currency";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import type { Order } from "@/types";

type OrderCardProps = {
  order: Order;
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  confirmed: "secondary",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-lg border border-border/60 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-medium">{order.number}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <Badge variant={statusVariant[order.status] ?? "secondary"}>
          {ORDER_STATUS_LABELS[order.status] ?? order.status}
        </Badge>
      </div>

      {/* Items preview */}
      <div className="flex gap-2 mb-3">
        {order.items.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-warm-100"
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
        {order.items.length > 3 && (
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-secondary text-xs font-medium">
            +{order.items.length - 3}
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {order.items.reduce((s, i) => s + i.quantity, 0)} itens
        </span>
        <span className="font-semibold">{formatCurrency(order.total)}</span>
      </div>
    </div>
  );
}
