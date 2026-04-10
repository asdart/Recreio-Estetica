"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AboutBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const update = useCallback(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!section || !wrapper || !card) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // progress: 0 when section top enters viewport bottom, 1 when section top hits viewport top
    const raw = 1 - Math.max(0, rect.top) / vh;
    const progress = Math.min(1, Math.max(0, raw));

    const padding = 24 * (1 - progress);
    const radius = 24 * (1 - progress);
    const maxW = 1360 + (window.innerWidth - 1360) * progress;

    wrapper.style.maxWidth = `${maxW}px`;
    wrapper.style.paddingLeft = `${padding}px`;
    wrapper.style.paddingRight = `${padding}px`;
    card.style.borderRadius = `${radius}px`;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="py-6"
    >
      <div
        ref={wrapperRef}
        className="mx-auto w-full overflow-hidden"
        style={{ maxWidth: 1360, paddingLeft: 24, paddingRight: 24 }}
      >
        <Link
          ref={cardRef}
          href="/sobre"
          className="group relative block aspect-[1312/738] w-full overflow-hidden bg-[#eae8e3]"
          style={{ borderRadius: 24 }}
        >
          <video
            src="/images/Video 1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex max-w-[600px] flex-col items-center gap-6">
              <h2 className="text-center font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.06] tracking-[-0.5px] text-[#fdfcfb]">
                Sua parceira em harmonização de excelência
              </h2>

              <p className="text-center font-sans text-lg leading-7 text-[#fdfcfb]">
                Há mais de 10 anos no mercado, a Recreio Estética é referência
                na distribuição de produtos para harmonização facial e corporal
                no Rio de Janeiro.
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-[#e4dfd8] py-[13px] pl-[25px] pr-[13px] transition-colors duration-300 group-hover:bg-white/10">
                <span className="px-2 py-1 font-sans text-base leading-6 tracking-[0.4px] text-[#fdfcfb]">
                  Conheça nossa história
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6a6662]">
                  <ArrowUpRight className="h-4 w-4 text-[#fdfcfb]" />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
