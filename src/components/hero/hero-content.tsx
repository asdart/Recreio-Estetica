"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

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
      <Link
        href="/loja"
        className="hero-fade flex items-center justify-between w-full max-w-[640px] rounded-full border border-[rgba(253,252,251,0.16)] bg-[rgba(253,252,251,0.24)] backdrop-blur-[10px] pl-8 pr-[7px] py-[7px] transition-all duration-300 ease-out hover:bg-[rgba(253,252,251,0.32)] hover:border-[rgba(253,252,251,0.30)]"
      >
        <span className="font-sans text-base leading-6 text-[#fdfcfb]">
          O que você procura?
        </span>
        <span className="flex items-center justify-center rounded-full bg-[#2b2927] p-5">
          <ArrowUpRight className="h-5 w-5 text-[#fdfcfb]" />
        </span>
      </Link>
    </div>
  );
}
