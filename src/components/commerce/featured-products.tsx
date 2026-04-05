"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FeaturedProductCard } from "./featured-product-card";
import type { Product } from "@/types";

type FeaturedProductsProps = {
  products: Product[];
  brandMap: Record<string, string>;
  title?: string;
  subtitle?: string;
  categorySlug?: string;
};

export function FeaturedProducts({ products, brandMap, title, subtitle, categorySlug }: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 320 + 16;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <section data-header-theme="dark" className="overflow-x-clip py-24">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-[72px] px-6">
        {/* Header */}
        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col leading-[60px] tracking-[-1.5px]">
            {title ? (
              <span className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] text-[#2b2927]">
                {title}
              </span>
            ) : (
              <>
                <span className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] text-[#2b2927]">
                  Produtos
                </span>
                <span className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] italic text-[#6a6662]">
                  em destaque
                </span>
              </>
            )}
            {subtitle && (
              <p className="mt-2 max-w-[480px] font-sans text-base leading-6 text-[#8b8985]">
                {subtitle}
              </p>
            )}
          </div>

          {/* Controls row */}
          <div className="flex items-end justify-between">
            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#4a4744] text-[#2b2927] transition-colors hover:bg-[#2b2927] hover:text-[#fdfcfb]"
                aria-label="Anterior"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#4a4744] text-[#2b2927] transition-colors hover:bg-[#2b2927] hover:text-[#fdfcfb]"
                aria-label="Próximo"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* CTA pill */}
            <Link
              href={categorySlug ? `/loja?category=${categorySlug}` : "/loja"}
              className="hidden items-center gap-2 rounded-full border border-[#4a4744] py-3.5 pl-6 pr-3.5 transition-colors hover:bg-[#2b2927] hover:text-[#fdfcfb] sm:flex"
            >
              <span className="font-sans text-base tracking-[0.4px]">
                Conheça nossos produtos
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b2927] text-[#fdfcfb] group-hover:bg-[#fdfcfb] group-hover:text-[#2b2927]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel — breaks out of max-width container */}
      <div className="mx-auto max-w-[1360px] px-6 mt-[72px]">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-visible scrollbar-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <div key={product.id} className="shrink-0" style={{ scrollSnapAlign: "start" }}>
              <FeaturedProductCard
                product={product}
                brandName={brandMap[product.brandId] ?? ""}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mx-auto max-w-[1360px] px-6 mt-[72px] text-center sm:hidden">
        <Link
          href={categorySlug ? `/loja?category=${categorySlug}` : "/loja"}
          className="inline-flex items-center gap-2 rounded-full border border-[#4a4744] px-6 py-3"
        >
          <span className="font-sans text-sm tracking-[0.4px]">
            Conheça nossos produtos
          </span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
