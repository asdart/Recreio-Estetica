"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    // card width 577 + gap 24
    el.scrollBy({ left: direction === "left" ? -601 : 601, behavior: "smooth" });
  }, []);

  return (
    <section data-header-theme="dark" className="overflow-x-clip py-24">
      <div className="mx-auto max-w-[1360px] px-8">
        {/* Title */}
        <h2 className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-[1] tracking-[-1.5px] text-[#2b2927]">
          Categorias
        </h2>

        {/* Arrows */}
        <div className="mt-8 flex items-center gap-2">
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
      </div>

      {/* Carousel */}
      <div className="mt-[72px] pl-8 lg:pl-[max(2rem,calc((100vw-1360px)/2+2rem))]">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pr-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/loja?category=${cat.slug}`}
              className="group flex w-[420px] shrink-0 flex-col gap-3 lg:w-[577px]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <div className="relative h-[488px] w-full overflow-hidden rounded-none bg-[#e8e6e1]">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(min-width: 1024px) 577px, 420px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  priority={i < 2}
                />
              </div>

              {/* Label */}
              <span className="font-sans text-base font-medium text-[#2b2927]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
