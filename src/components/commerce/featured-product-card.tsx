"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";

type FeaturedProductCardProps = {
  product: Product;
};

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const price = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Link
      href={`/loja/${product.slug}`}
      className="group flex w-[280px] shrink-0 flex-col gap-4"
    >
      {/* Image */}
      <div className="relative h-[340px] w-full overflow-hidden rounded-[16px]">
        <Image
          src={product.images[0]?.url ?? "/images/placeholder.svg"}
          alt={product.images[0]?.alt ?? product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="280px"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5">
        <p className="font-sans text-[16px] font-semibold leading-[24px] tracking-[-0.4px] text-[#2b2927]">
          {product.name}
        </p>
        <span className="mt-1 font-sans text-base font-medium leading-6 text-[#2b2927]">
          {price}
        </span>
        <div className="mt-2 flex items-center gap-1.5 text-[#9b9790] transition-colors duration-200 group-hover:text-[#2b2927]">
          <ShoppingBag className="h-[14px] w-[14px] shrink-0" strokeWidth={1.5} />
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.1em]">
            Adicionar ao carrinho
          </span>
        </div>
      </div>
    </Link>
  );
}
