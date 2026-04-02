"use client";

import { useEffect, useRef } from "react";
import { HeroSearch } from "./hero-search";

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.classList.add("is-visible");
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-entrance flex flex-col items-center gap-10 w-full max-w-[900px] text-center"
    >
      {/* Headline */}
      <div className="flex flex-col gap-0 w-full">
        <h1 className="hero-stagger !font-heading !font-normal !text-[clamp(3rem,7vw,6rem)] !leading-[1.0] tracking-[-2px] text-[#fdfcfb]">
          <span className="hero-word block">
            Produtos para estética
          </span>
          <span className="hero-word block">
            com confiança profissional.
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="hero-fade font-sans text-lg leading-7 text-[#fdfcfb]/80 max-w-[520px]">
        Conectamos profissionais da área a marcas, produtos e suporte
        especializado para uma compra mais segura, técnica e eficiente.
      </p>

      {/* Search pill CTA — full width, large */}
      <HeroSearch />
    </div>
  );
}
