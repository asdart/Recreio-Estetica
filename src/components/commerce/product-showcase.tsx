"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";

type ProductShowcaseProps = {
  image: string;
  imageAlt: string;
  product: Product;
  accentColor?: string;
  imagePosition?: "left" | "right";
};

export function ProductShowcase({
  image,
  imageAlt,
  product,
  accentColor = "#faeee9",
  imagePosition = "left",
}: ProductShowcaseProps) {
  const price = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <section
      data-header-theme="dark"
      className="relative h-screen bg-[#faf9f7] overflow-x-clip"
    >
      <div
        className={`flex flex-col lg:min-h-[920px] ${
          imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Editorial image */}
        <div className="relative aspect-[3/4] w-full lg:aspect-auto lg:w-1/2">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-right"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        {/* Accent panel with featured product */}
        <div
          className="relative flex w-full items-center justify-center px-6 py-16 lg:w-1/2 lg:px-[135px] lg:py-[85px]"
          style={{ backgroundColor: accentColor }}
        >
          {/* Decorative arc */}
          <div className="pointer-events-none absolute left-[60%] top-[25%] hidden h-[128px] w-[128px] lg:block">
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              overflow="visible"
              style={{ display: "block" }}
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.43051e-06 128C42.6667 42.6667 85.3333 42.6667 128 128"
                stroke="#4A4744"
                strokeOpacity="0.1"
                strokeWidth="1.28"
              />
            </svg>
          </div>

          {/* Product card */}
          <Link
            href={`/loja/${product.slug}`}
            className="group flex w-full max-w-[384px] flex-col items-center gap-5"
          >
            {/* Product image */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-none sm:h-[512px]">
              <Image
                src={product.images[0]?.url ?? "/images/placeholder.svg"}
                alt={product.images[0]?.alt ?? product.name}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="384px"
              />
            </div>

            {/* Product info */}
            <div className="flex w-[280px] flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-2 text-[#2b2927]">
                <p className="font-sans text-[20px] font-normal leading-[32px] tracking-[-0.6px]">
                  {product.name}
                </p>
                <p className="font-sans text-[16px] font-semibold leading-[24px]">
                  {price}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#2b2927] transition-colors duration-200 group-hover:text-[#4a4744]">
                <ShoppingBag
                  className="h-[14px] w-[14px] shrink-0"
                  strokeWidth={1.5}
                />
                <span className="font-sans text-[12px] font-normal uppercase tracking-[1.65px]">
                  Adicionar ao Carrinho
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
