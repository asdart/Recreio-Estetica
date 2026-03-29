import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format-currency";

type ProductCardViewProps = {
  name: string;
  brandName?: string;
  slug: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  showPrice?: boolean;
  className?: string;
};

export function ProductCardView({
  name,
  brandName,
  image,
  price,
  compareAtPrice,
  inStock,
  showPrice = true,
  className,
}: ProductCardViewProps) {
  return (
    <div className={cn("group relative", className)}>
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-warm-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Badge variant="secondary" className="text-xs">
              Indisponível
            </Badge>
          </div>
        )}
        {compareAtPrice && inStock && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs">
            {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% off
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        {brandName && (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {brandName}
          </p>
        )}
        <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
          {name}
        </h3>
        {showPrice ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              {formatCurrency(price)}
            </span>
            {compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(compareAtPrice)}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Faça login para ver preços
          </p>
        )}
      </div>
    </div>
  );
}
