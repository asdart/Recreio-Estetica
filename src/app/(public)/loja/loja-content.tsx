"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUp } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/commerce/loading-state";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockProducts, mockCategories, mockBrands } from "@/mocks";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

type SortOption = "name" | "price-asc" | "price-desc";

export function LojaContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const [sort, setSort] = useState<SortOption>("name");
  const [activeCategories, setActiveCategories] = useState<string[]>(categorySlug ? [categorySlug] : []);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Pending state — only committed when user hits "Aplicar"
  const [pendingCategories, setPendingCategories] = useState<string[]>(categorySlug ? [categorySlug] : []);
  const [pendingBrands, setPendingBrands] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    if (activeCategories.length > 0) {
      const catIds = mockCategories
        .filter((c) => activeCategories.includes(c.slug))
        .map((c) => c.id);
      products = products.filter((p) => catIds.includes(p.categoryId));
    }

    if (activeBrands.length > 0) {
      const brandIds = mockBrands
        .filter((b) => activeBrands.includes(b.slug))
        .map((b) => b.id);
      products = products.filter((p) => brandIds.includes(p.brandId));
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
  }, [activeCategories, activeBrands, search, sort]);

  // Reset page when filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [activeCategories, activeBrands, search, sort]);

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

  // Sync pending state when panel opens
  useEffect(() => {
    if (filterOpen) {
      setPendingCategories(activeCategories);
      setPendingBrands(activeBrands);
    }
  }, [filterOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll when filter panel is open
  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [filterOpen]);

  // Close filter panel on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setFilterOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Show back-to-top after one full viewport scroll
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeCategoryData = activeCategories.length === 1
    ? mockCategories.find((c) => c.slug === activeCategories[0])
    : null;

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
              <Link href="/loja" className="hover:underline" onClick={() => setActiveCategories([])}>
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
          {/* Filter button */}
          {(() => {
            const activeFilterCount = activeCategories.length + activeBrands.length;
            return (
              <button
                onClick={() => setFilterOpen(true)}
                className="flex h-12 items-center gap-2 rounded-full bg-[#f5f4f0] px-5 font-sans text-sm tracking-[0.4px] text-[#2b2927] transition-colors hover:bg-[#eae8e3]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtrar
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2b2927] font-sans text-xs font-medium text-[#fdfcfb]">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            );
          })()}

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
            onClick={() => { setActiveCategories([]); setActiveBrands([]); setSearch(""); }}
          >
            Ver todos os produtos
          </Button>
        </div>
      )}
      {/* Filter sidepanel backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setFilterOpen(false)}
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-[500ms]",
          filterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Filter sidepanel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={cn(
          "fixed right-0 top-0 z-[61] flex h-full w-full max-w-[480px] flex-col bg-white shadow-2xl transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
          filterOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0ede9] px-8 py-6">
          <span className="font-sans text-xs font-medium uppercase tracking-[2px] text-[#1a1917]">
            {(() => { const n = pendingCategories.length + pendingBrands.length; return n > 0 ? `Filtros (${n})` : "Filtros"; })()}
          </span>
          <button
            onClick={() => setFilterOpen(false)}
            aria-label="Fechar filtros"
            className="inline-flex items-center justify-center rounded-full bg-[rgba(43,41,39,0.08)] p-4 text-[#2b2927] transition-colors hover:bg-[rgba(43,41,39,0.14)]"
          >
            <X className="h-[10px] w-[10px]" strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-10">
          {/* Marcas */}
          <div>
            <p className="mb-5 font-heading text-2xl text-[#1a1917]">Marcas</p>
            <div className="flex flex-col">
              {mockBrands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex cursor-pointer items-center gap-3 py-2.5 font-sans text-sm text-[#1a1917] transition-colors hover:text-[#6a6662]"
                >
                  <Checkbox
                    checked={pendingBrands.includes(brand.slug)}
                    onCheckedChange={(checked) => setPendingBrands((prev) =>
                      checked ? [...prev, brand.slug] : prev.filter((s) => s !== brand.slug)
                    )}
                  />
                  {brand.name}
                </label>
              ))}
            </div>
          </div>

          {/* Categorias */}
          <div>
            <p className="mb-5 font-heading text-2xl text-[#1a1917]">Categorias</p>
            <div className="flex flex-col">
              {mockCategories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex cursor-pointer items-center gap-3 py-2.5 font-sans text-sm text-[#1a1917] transition-colors hover:text-[#6a6662]"
                >
                  <Checkbox
                    checked={pendingCategories.includes(cat.slug)}
                    onCheckedChange={(checked) => setPendingCategories((prev) =>
                      checked ? [...prev, cat.slug] : prev.filter((s) => s !== cat.slug)
                    )}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-[#edeae5] bg-[#faf9f7] px-8 py-6">
          <button
            onClick={() => {
              setPendingCategories([]);
              setPendingBrands([]);
              setActiveCategories([]);
              setActiveBrands([]);
              setFilterOpen(false);
            }}
            className="flex flex-1 items-center justify-center rounded-full bg-[#f5f4f0] px-6 py-3 font-sans text-base tracking-[0.4px] text-[#2b2927] transition-colors hover:bg-[#eae8e3]"
          >
            Limpar
          </button>
          <button
            onClick={() => {
              setActiveCategories(pendingCategories);
              setActiveBrands(pendingBrands);
              setFilterOpen(false);
            }}
            className="flex flex-1 items-center justify-center rounded-full bg-[#2b2927] px-6 py-3 font-sans text-base tracking-[0.4px] text-[#f5f4f0] transition-colors hover:bg-[#3d3a37]"
          >
            Aplicar
          </button>
        </div>
      </aside>

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
