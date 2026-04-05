"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { mockProducts, mockCategories } from "@/mocks";

type Suggestion =
  | { type: "product"; label: string; image: string; slug: string }
  | { type: "category"; label: string; image: string; slug: string };

function getSuggestions(query: string): Suggestion[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const categories: Suggestion[] = mockCategories
    .filter((c) => c.name.toLowerCase().includes(q))
    .slice(0, 2)
    .map((c) => ({ type: "category", label: c.name, image: "/images/placeholder.svg", slug: c.slug }));

  const products: Suggestion[] = mockProducts
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice(0, 5)
    .map((p) => ({
      type: "product",
      label: p.name,
      image: p.images[0]?.url ?? "/images/placeholder.svg",
      slug: p.slug,
    }));

  return [...categories, ...products];
}

function HighlightedLabel({ label, query }: { label: string; query: string }) {
  const q = query.trim();
  if (!q) {
    return (
      <span className="font-sans text-sm font-semibold leading-5 text-[#fdfcfb]">
        {label}
      </span>
    );
  }

  const idx = label.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) {
    return (
      <span className="font-sans text-sm font-semibold leading-5 text-[#fdfcfb]">
        {label}
      </span>
    );
  }

  return (
    <span className="font-sans text-sm leading-5">
      <span className="font-semibold text-[#fdfcfb]">{label.slice(0, idx)}</span>
      <span className="font-semibold text-[#fdfcfb]">{label.slice(idx, idx + q.length)}</span>
      <span className="font-normal text-[rgba(253,252,251,0.48)]">{label.slice(idx + q.length)}</span>
    </span>
  );
}

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const results = getSuggestions(query);
    setSuggestions(results);
    setActiveIndex(-1);
    setOpen(results.length > 0 && query.trim().length > 0);
  }, [query]);

  const navigate = useCallback(
    (suggestion?: Suggestion) => {
      if (suggestion) {
        const href =
          suggestion.type === "product"
            ? `/loja/${suggestion.slug}`
            : `/loja?category=${suggestion.slug}`;
        router.push(href);
      } else if (query.trim()) {
        router.push(`/loja?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push("/loja");
      }
      setOpen(false);
    },
    [query, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "Enter") navigate();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigate(activeIndex >= 0 ? suggestions[activeIndex] : undefined);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="hero-fade relative w-full max-w-[640px]">
      {/* Input pill */}
      <div className="flex items-center justify-between w-full rounded-full border border-[rgba(253,252,251,0.16)] bg-[rgba(253,252,251,0.24)] backdrop-blur-[10px] pl-8 pr-[7px] py-[7px] transition-all duration-300 ease-out focus-within:bg-[rgba(253,252,251,0.32)] focus-within:border-[rgba(253,252,251,0.30)]">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
          placeholder="O que você procura?"
          className="flex-1 bg-transparent font-sans text-base leading-6 text-[#fdfcfb] placeholder:text-[rgba(253,252,251,0.70)] outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={() => navigate(activeIndex >= 0 ? suggestions[activeIndex] : undefined)}
          className="flex items-center justify-center rounded-full bg-[#2b2927] p-5 transition-transform duration-200 hover:scale-105 active:scale-95"
          aria-label="Buscar"
        >
          <ArrowUpRight className="h-5 w-5 text-[#fdfcfb]" />
        </button>
      </div>

      {/* Autocomplete dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-[32px] border border-[rgba(255,255,255,0.16)] bg-[rgba(253,252,251,0.16)] backdrop-blur-[10px] shadow-2xl">
          <ul role="listbox" className="flex flex-col p-3 max-h-[280px] overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={`${s.type}-${s.slug}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  navigate(s);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex cursor-pointer items-center gap-[13px] rounded-3xl p-[10px] transition-colors duration-150 ${
                  i === activeIndex
                    ? "bg-[rgba(255,255,255,0.08)]"
                    : "hover:bg-[rgba(43,41,39,0.06)]"
                }`}
              >
                {/* Product image thumbnail */}
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={s.image}
                    alt={s.label}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>

                {/* Product name with highlight */}
                <HighlightedLabel label={s.label} query={query} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
