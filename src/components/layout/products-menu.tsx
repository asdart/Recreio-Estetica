"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { mockCategories } from "@/mocks";

type ProductsMenuProps = {
  open: boolean;
  onClose: () => void;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85";

const allProductsItem = {
  label: "Todos os Produtos",
  href: "/loja",
  image: DEFAULT_IMAGE,
};

const categoryLinks = mockCategories.map((c) => ({
  label: c.name,
  href: `/loja?category=${c.slug}`,
  image: c.menuImage ?? DEFAULT_IMAGE,
}));

const menuItems = [allProductsItem, ...categoryLinks];

export function ProductsMenu({ open, onClose }: ProductsMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeImage =
    hoveredIndex !== null ? menuItems[hoveredIndex].image : null;

  const menu = (
    <div
      ref={containerRef}
      className={`products-menu fixed inset-0 z-[200] ${open ? "is-open" : "is-closed"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className="products-menu__backdrop absolute inset-0 bg-[#f9f9f8]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="products-menu__panel absolute inset-0 bg-[#f9f9f8]">
        {/* Header row — mirrors the site header */}
        <div className="absolute top-0 left-0 right-0 z-10 border-b border-[#e4dfd8] bg-[#faf9f7]">
          <div className="mx-auto flex max-w-[1360px] items-center justify-between pl-8 pr-4 py-5">
            <Link href="/" onClick={onClose} className="w-[128px] flex-shrink-0">
              <span className="font-heading text-2xl leading-8 tracking-[-0.6px] text-[#2b2927]">
                recreio.estética
              </span>
            </Link>

            <div className="flex-1" />

            <div className="flex w-[128px] items-center justify-end">
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-[6px] text-sm font-medium leading-5 tracking-[-0.2px] text-[#2b2927] bg-[rgba(43,41,39,0.08)] hover:bg-[rgba(43,41,39,0.14)] transition-colors duration-300"
              >
                <X className="h-4 w-4 text-[#2b2927]" strokeWidth={2} />
                <span>Fechar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu content */}
        <div className="absolute left-0 right-0 top-[60px] px-12 pt-24 pb-16">
          <div className="mx-auto flex max-w-[1360px] items-start gap-24">
            {/* Left — title + links */}
            <div className="flex flex-col gap-12">
              <h2 className="font-heading text-[64px] leading-[64px] tracking-[-0.5px] text-[#2b2927]">
                Produtos
              </h2>

              <nav className="-ml-4 flex flex-col gap-4">
                {menuItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`products-menu__link group inline-flex items-center gap-2 self-start rounded-[24px] px-4 py-2 transition-[background-color] duration-300 ease-in-out ${
                      i === 0
                        ? "hover:bg-[rgba(43,41,39,0.08)]"
                        : "hover:bg-[rgba(43,41,39,0.06)]"
                    }`}
                    style={{ transitionDelay: `${80 + i * 50}ms` }}
                  >
                    <span className="font-sans text-2xl font-normal leading-8 tracking-[-0.5px] text-[#2b2927]">
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[#2b2927] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right — image with crossfade */}
            <div className="relative h-[600px] w-[450px] flex-shrink-0 overflow-hidden rounded-[32px]">
              {menuItems.map((item, i) => (
                <Image
                  key={item.href}
                  src={item.image}
                  alt={item.label}
                  fill
                  className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
                    hoveredIndex === i ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="450px"
                  unoptimized
                />
              ))}
              {/* Default image shown when nothing is hovered */}
              <Image
                src={DEFAULT_IMAGE}
                alt=""
                fill
                className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
                  hoveredIndex === null ? "opacity-100" : "opacity-0"
                }`}
                sizes="450px"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(menu, document.body);
}
