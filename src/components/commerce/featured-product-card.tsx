"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";

type FeaturedProductCardProps = {
  product: Product;
  brandName: string;
};

export function FeaturedProductCard({ product, brandName }: FeaturedProductCardProps) {
  const price = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const tag = product.featured ? "Bestseller" : product.tags[0] ?? null;

  // Extract just the ML/unit value from the volume string
  const volumeShort = product.volume.match(/[\d,.]+(ml|ML|g|G|U|u)/i)?.[0] ?? product.volume;

  return (
    <Link
      href={`/loja/${product.slug}`}
      className="group relative flex w-[320px] shrink-0 flex-col items-center overflow-clip rounded-[32px] bg-[#f5f4f0] p-2 transition-colors duration-300 hover:bg-[#b57e71]"
    >
      {/*
        Fixed-height container: always 428px.
        Content shifts up by 68px on hover (the button height + gap),
        revealing the button that was hidden below.
      */}
      <div className="relative h-[428px] w-full overflow-clip">
        {/* Sliding content panel */}
        <div className="absolute inset-x-0 top-0 flex h-[428px] flex-col items-start justify-between p-3 transition-transform duration-300 ease-out group-hover:-translate-y-[68px]">
          {/* Tag */}
          {tag && (
            <div className="shrink-0">
              <span className="inline-flex items-center rounded-full bg-[#d3cbc1] px-2.5 py-1 font-sans text-sm font-medium leading-5 text-[#2b2927]">
                {tag}
              </span>
            </div>
          )}

          {/* Product image */}
          <div className="flex h-[200px] w-full items-center justify-center px-12">
            <div className="relative h-[200px] w-[160px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]">
              <Image
                src={product.images[0]?.url ?? "/images/placeholder.svg"}
                alt={product.images[0]?.alt ?? product.name}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex w-full flex-col gap-2">
            <p className="font-sans text-sm font-medium leading-5 text-[#2b2927] transition-colors duration-300 group-hover:text-[#fdfcfb]">
              {product.name}
            </p>
            <div className="flex items-center justify-between whitespace-nowrap">
              <span className="font-sans text-sm leading-5 text-[#6a6662] transition-colors duration-300 group-hover:text-[#fdfcfb]">
                {brandName}
              </span>
              <span className="font-sans text-sm leading-5 text-[#2b2927] transition-colors duration-300 group-hover:font-semibold group-hover:text-[#fdfcfb]">
                {volumeShort}
              </span>
              <span className="font-sans text-base font-semibold leading-6 text-[#2b2927] transition-colors duration-300 group-hover:text-[#fdfcfb]">
                {price}
              </span>
            </div>
          </div>
        </div>

        {/* Add-to-cart button — sits below the content, slides into view on hover */}
        <div className="absolute inset-x-3 bottom-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          <div className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#2b2927] py-3">
            <ShoppingBag className="h-5 w-5 shrink-0 text-[#f5f4f0]" strokeWidth={1.5} />
            <span className="font-sans text-sm tracking-[0.4px] text-[#f5f4f0]">
              Adicionar ao carrinho
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
