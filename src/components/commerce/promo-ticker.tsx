"use client";

import { Truck, CreditCard } from "lucide-react";

const promoItems = [
  {
    icon: Truck,
    text: "Frete grátis acima de R$750 nas regiões sudeste e sul",
  },
  {
    icon: CreditCard,
    text: "Em até 6x sem juros no cartão",
  },
];

function PromoItemSet() {
  return (
    <>
      {promoItems.map((item, i) => (
        <div key={i} className="flex shrink-0 items-center gap-4">
          <item.icon className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={1.5} />
          <span className="whitespace-nowrap font-sans text-xs font-normal uppercase leading-[18px] tracking-[0.6px] text-white">
            {item.text}
          </span>
        </div>
      ))}
    </>
  );
}

export function PromoTicker() {
  return (
    <section
      data-header-theme="light"
      className="relative overflow-hidden bg-[#2b2927] py-3"
    >
      <div className="flex animate-marquee items-center gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8">
            <PromoItemSet />
          </div>
        ))}
      </div>
    </section>
  );
}
