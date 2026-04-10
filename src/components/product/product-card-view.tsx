import Image from "next/image";
import { ShoppingBag } from "lucide-react";
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
  shortDescription?: string;
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
  shortDescription,
  className,
}: ProductCardViewProps) {
  return (
    <div className={cn("group flex flex-col gap-6", className)}>
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-[#eae8e3]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#faf9f7]/70">
            <span className="font-sans text-xs uppercase tracking-[1.5px] text-[#6a6662]">
              Indisponível
            </span>
          </div>
        )}
        {compareAtPrice && inStock && (
          <div className="absolute left-4 top-4 rounded-full bg-[#2b2927] px-3 py-1">
            <span className="font-sans text-[11px] font-medium text-[#fdfcfb]">
              {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% off
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        {/* Brand */}
        {brandName && (
          <p className="font-sans text-[12px] uppercase tracking-[2px] text-[#6a6662]">
            {brandName}
          </p>
        )}

        {/* Name + Price + Description */}
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-[24px] leading-8 tracking-[-0.6px] text-[#2b2927]">
            {name}
          </h3>

          {showPrice ? (
            <div className="flex items-center gap-2">
              <span className="font-sans text-[14px] leading-[21px] text-[#2b2927]">
                {formatCurrency(price)}
              </span>
              {compareAtPrice && (
                <span className="font-sans text-xs text-[#bab1a8] line-through">
                  {formatCurrency(compareAtPrice)}
                </span>
              )}
            </div>
          ) : (
            <p className="font-sans text-xs text-[#bab1a8]">
              Login p/ ver
            </p>
          )}

        </div>

        {/* CTA */}
        <div className="group/btn flex items-center gap-2">
          <span className="relative flex overflow-hidden pb-1">
            <span className="font-sans text-[12px] uppercase tracking-[1.65px] text-[#2b2927] transition-transform duration-300 group-hover/btn:-translate-y-full">
              Adicionar ao Carrinho
            </span>
            <span className="absolute left-0 top-0 translate-y-full font-sans text-[12px] uppercase tracking-[1.65px] text-[#2b2927] transition-transform duration-300 group-hover/btn:translate-y-0">
              Adicionar ao Carrinho
            </span>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#2b2927]/20 transition-colors duration-300 group-hover/btn:bg-[#2b2927]" />
          </span>
          <ShoppingBag className="h-[14px] w-[14px] text-[#2b2927]" />
        </div>
      </div>
    </div>
  );
}
