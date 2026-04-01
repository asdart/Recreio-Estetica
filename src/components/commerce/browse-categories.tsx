"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const categories = [
  {
    slug: "toxina-botulinica",
    name: "Toxina Botulínica",
    image:
      "https://assets.lummi.ai/assets/QmURVmerHag1uTE4KcqBCosHqaA6yuPtH9TnvMVjLv2HWh?auto=format&w=640",
    alt: "Aplicação de toxina botulínica por profissional",
  },
  {
    slug: "acido-hialuronico",
    name: "Ácido Hialurônico",
    image:
      "https://assets.lummi.ai/assets/QmSBdAXMfdZcbwp8XeHjMZJRvUn9FAuNjoVKX2iRqNNoyz?auto=format&w=640",
    alt: "Preenchimento com ácido hialurônico",
  },
  {
    slug: "bioestimuladores",
    name: "Bioestimuladores",
    image:
      "https://assets.lummi.ai/assets/QmNavwtjHfW9Ga7NWBF12Gt88UifMXkzqNwhie66QSS3Er?auto=format&w=640",
    alt: "Bioestimulador de colágeno",
  },
  {
    slug: "fios-de-pdo",
    name: "Fios de PDO",
    image:
      "https://assets.lummi.ai/assets/Qme1jJu11X6FAE9oPsKFkKPDPyNuubbVdEN99PwyZuVw96?auto=format&w=640",
    alt: "Procedimento com fios de PDO",
  },
  {
    slug: "skincare-profissional",
    name: "Skincare Profissional",
    image:
      "https://assets.lummi.ai/assets/QmYybTZZXwoZq3LsG4QQD4dtkQhbdrJRZD9ZGNcD1Cvdaw?auto=format&w=640",
    alt: "Skincare profissional em clínica",
  },
];

export function BrowseCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" });
  }, []);

  return (
    <section data-header-theme="dark" className="overflow-x-clip py-24">
      <div className="mx-auto max-w-[1360px] px-6">
        {/* Header — same structure as FeaturedProducts */}
        <div className="flex flex-col gap-8">
          {/* Two-line serif title */}
          <div className="flex flex-col leading-[60px] tracking-[-1.5px]">
            <span className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] text-[#2b2927]">
              Categorias
            </span>
            <span className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] italic text-[#6a6662]">
              para explorar
            </span>
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
                aria-label="Próxima"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* CTA pill */}
            <Link
              href="/loja"
              className="hidden items-center gap-2 rounded-full border border-[#4a4744] py-3.5 pl-6 pr-3.5 transition-colors hover:bg-[#2b2927] hover:text-[#fdfcfb] sm:flex"
            >
              <span className="font-sans text-base tracking-[0.4px]">
                Ver todas as categorias
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b2927] text-[#fdfcfb]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category tiles — horizontal carousel */}
      <div className="mt-[72px] pl-6 lg:pl-[max(1.5rem,calc((100vw-1360px)/2+1.5rem))]">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none pr-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/loja?category=${cat.slug}`}
              className="group flex w-[320px] shrink-0 flex-col gap-3 lg:w-[380px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#f5f4f0]">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, 320px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-[#2b2927] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              </div>
              <span className="font-sans text-sm font-medium text-[#2b2927] transition-colors duration-200 group-hover:text-[#6a6662]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
