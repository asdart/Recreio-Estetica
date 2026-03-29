import { formatCurrency } from "@/lib/utils/format-currency";
import { cn } from "@/lib/utils";

type PriceBlockProps = {
  price: number;
  compareAtPrice?: number;
  showPrice: boolean;
  className?: string;
};

export function PriceBlock({
  price,
  compareAtPrice,
  showPrice,
  className,
}: PriceBlockProps) {
  if (!showPrice) {
    return (
      <div className={cn("rounded-md bg-secondary/60 px-4 py-3", className)}>
        <p className="text-sm text-muted-foreground">
          Faça login para visualizar os preços
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold tracking-tight">
          {formatCurrency(price)}
        </span>
        {compareAtPrice && (
          <span className="text-sm text-muted-foreground line-through">
            {formatCurrency(compareAtPrice)}
          </span>
        )}
      </div>
      {compareAtPrice && (
        <p className="text-sm font-medium text-accent">
          Economia de {formatCurrency(compareAtPrice - price)}
        </p>
      )}
    </div>
  );
}
