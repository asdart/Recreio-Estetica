"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUp } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/commerce/loading-state";
import { Button } from "@/components/ui/button";
import { mockProducts, mockCategories } from "@/mocks";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

type SortOption = "name" | "price-asc" | "price-desc";

export function LojaContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const [sort, setSort] = useState<SortOption>("name");
  const [activeCategory, setActiveCategory] = useState<string | null>(categorySlug);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    if (activeCategory) {
      const cat = mockCategories.find((c) => c.slug === activeCategory);
      if (cat) {
        products = products.filter((p) => p.categoryId === cat.id);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "name":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
    }

    return products;
  }, [activeCategory, search, sort]);

  // Reset page when filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [activeCategory, search, sort]);

  const visibleProducts = filteredProducts.slice(0, page * PAGE_SIZE);
  const hasMore = visibleProducts.length < filteredProducts.length;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    // Simulate a brief async tick so skeleton is visible
    setTimeout(() => {
      setPage((p) => p + 1);
      setIsLoading(false);
    }, 600);
  }, [hasMore, isLoading]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  // Show back-to-top after one full viewport scroll
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeCategoryData = mockCategories.find((c) => c.slug === activeCategory);

  return (
    <div className="mx-auto flex max-w-[1366px] flex-col gap-12 px-6 pb-24 pt-16">
      {/* Page header */}
      <div className="flex items-end justify-between">
        {/* Left: breadcrumb + title + count */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-xs tracking-[0.4px] text-[#6a6662]">
            <Link href="/" className="hover:underline">Início</Link>
            {" / "}
            {activeCategoryData ? (
              <Link href="/loja" className="hover:underline" onClick={() => setActiveCategory(null)}>
                Todos os Produtos
              </Link>
            ) : null}
            {activeCategoryData ? ` / ${activeCategoryData.name}` : "Todos os Produtos"}
          </p>
          <h1 className="font-heading text-[64px] leading-[64px] tracking-[-2.25px] text-[#2b2927]">
            {activeCategoryData ? activeCategoryData.name : "Todos os Produtos"}
          </h1>
          <p className="font-sans text-xs uppercase tracking-[1.65px] text-[#666]">
            {filteredProducts.length} produto{filteredProducts.length !== 1 && "s"} encontrado{filteredProducts.length !== 1 && "s"}
          </p>
        </div>

        {/* Right: Filter button + Search */}
        <div className="flex items-center gap-4">
          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex h-12 items-center gap-2 rounded-full bg-[#f5f4f0] px-5 font-sans text-sm tracking-[0.4px] text-[#2b2927] transition-colors hover:bg-[#eae8e3]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtrar
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-14 z-20 min-w-[240px] rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] p-4 shadow-lg">
                {/* Category filter */}
                <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[1.5px] text-[#6a6662]">
                  Categoria
                </p>
                <div className="mb-4 flex flex-col gap-1">
                  <button
                    onClick={() => { setActiveCategory(null); setFilterOpen(false); }}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-left font-sans text-sm transition-colors",
                      !activeCategory ? "bg-[#2b2927] text-[#fdfcfb]" : "text-[#2b2927] hover:bg-[#f5f4f0]"
                    )}
                  >
                    Todos
                  </button>
                  {mockCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(activeCategory === cat.slug ? null : cat.slug); setFilterOpen(false); }}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-left font-sans text-sm transition-colors",
                        activeCategory === cat.slug ? "bg-[#2b2927] text-[#fdfcfb]" : "text-[#2b2927] hover:bg-[#f5f4f0]"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                {/* Sort */}
                <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[1.5px] text-[#6a6662]">
                  Ordenar
                </p>
                <div className="flex flex-col gap-1">
                  {(["name", "price-asc", "price-desc"] as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSort(opt); setFilterOpen(false); }}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-left font-sans text-sm transition-colors",
                        sort === opt ? "bg-[#2b2927] text-[#fdfcfb]" : "text-[#2b2927] hover:bg-[#f5f4f0]"
                      )}
                    >
                      {opt === "name" ? "Nome A–Z" : opt === "price-asc" ? "Menor preço" : "Maior preço"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search input */}
          <div className="flex h-12 w-[251px] items-center gap-2 rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5">
            <Search className="h-5 w-5 shrink-0 text-[#bab1a8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por produtos"
              className="w-full bg-transparent font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Product grid — 3 columns */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-8 gap-y-[79px] sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Sentinel */}
          <div ref={sentinelRef} aria-hidden />

          {/* Skeleton rows while loading next batch */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-[79px] sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="py-20 text-center">
          <p className="font-sans text-[#6a6662]">
            Nenhum produto encontrado.
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-full"
            onClick={() => { setActiveCategory(null); setSearch(""); }}
          >
            Ver todos os produtos
          </Button>
        </div>
      )}
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className={cn(
          "fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full bg-[#2b2927] py-3 pl-5 pr-4 text-[#fdfcfb] shadow-lg transition-all duration-300 hover:bg-[#3d3a37]",
          showBackToTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <span className="font-sans text-xs uppercase tracking-[1.5px]">Voltar ao topo</span>
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
