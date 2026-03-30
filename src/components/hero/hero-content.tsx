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
      className="hero-entrance flex flex-col items-center gap-10 max-w-[768px] w-full text-center"
    >
      <div className="flex flex-col gap-[18px] w-full">
        <h1 className="hero-stagger !text-[clamp(2.5rem,6vw,5rem)] !leading-[0.95] tracking-[-1px] text-[#fdfcfb]">
          <span className="hero-word">Produtos </span>
          <span className="hero-word">para </span>
          <span className="hero-word">estética </span>
          <br className="hidden md:inline" />
          <span className="hero-word">com </span>
          <span className="hero-word">confiança </span>
          <span className="hero-word">profissional.</span>
        </h1>
        <p className="hero-fade font-sans text-lg leading-7 text-[#f5f4f0]">
          Nós conectamos profissionais da área a marcas, produtos e
          suporte especializado para uma compra mais segura, técnica e
          eficiente.
        </p>
      </div>

      <Link
        href="/loja"
        className="hero-fade flex items-center justify-between w-full max-w-[600px] rounded-full border border-[rgba(253,252,251,0.16)] bg-[rgba(253,252,251,0.24)] backdrop-blur-[10px] pl-8 pr-[7px] py-[7px] transition-all hover:bg-[rgba(253,252,251,0.32)]"
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
