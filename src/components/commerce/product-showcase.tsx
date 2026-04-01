"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FeaturedProductCard } from "./featured-product-card";
import type { Product } from "@/types";

type ProductShowcaseProps = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  products: Product[];
  brandMap: Record<string, string>;
  categorySlug: string;
  imagePosition?: "left" | "right";
};

export function ProductShowcase({
  title,
  subtitle,
  image,
  imageAlt,
  products,
  brandMap,
  categorySlug,
  imagePosition = "left",
}: ProductShowcaseProps) {
  const cardWidth = 320 + 24;
  const maxOffset = Math.max(0, (products.length - 2) * cardWidth);
  const [offset, setOffset] = useState(0);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      setOffset((prev) => {
        const next = prev + (direction === "right" ? cardWidth : -cardWidth);
        return Math.max(0, Math.min(next, maxOffset));
      });
    },
    [cardWidth, maxOffset],
  );

  return (
    <section data-header-theme="dark" className="relative bg-[#faf9f7] overflow-x-clip">
      <div className={`flex flex-col lg:min-h-[920px] ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Editorial image — z-10 so cards slide behind it */}
        <div className="relative z-10 aspect-[3/4] w-full lg:aspect-auto lg:w-1/2">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        {/* Content + product carousel */}
        <div className="relative z-0 flex w-full flex-col justify-between gap-16 py-16 lg:w-1/2 lg:py-24">
          {/* Title block */}
          <div className="flex flex-col gap-2 px-6 lg:px-24">
            <h2 className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-[1] tracking-[-1.5px] text-[#2b2927]">
              {title}
            </h2>
            <p className="max-w-[360px] font-sans text-base leading-6 text-[#8b8985]">
              {subtitle}
            </p>
          </div>

          {/* Product cards — visible overflow, cards slide behind the image */}
          <div className="overflow-visible px-6 lg:px-24">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: imagePosition === "right"
                  ? `translateX(${offset}px)`
                  : `translateX(-${offset}px)`,
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="shrink-0">
                  <FeaturedProductCard
                    product={product}
                    brandName={brandMap[product.brandId] ?? ""}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex items-end justify-between px-6 lg:px-24">
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

            <Link
              href={`/loja?category=${categorySlug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#4a4744] py-3.5 pl-6 pr-3.5 transition-colors hover:bg-[#2b2927] hover:text-[#fdfcfb]"
            >
              <span className="font-sans text-base tracking-[0.4px]">
                Ver todos
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b2927] text-[#fdfcfb]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
