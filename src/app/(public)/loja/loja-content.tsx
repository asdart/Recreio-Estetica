"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockProducts, mockCategories } from "@/mocks";

type SortOption = "name" | "price-asc" | "price-desc";

export function LojaContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const [sort, setSort] = useState<SortOption>("name");
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categorySlug
  );

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    if (activeCategory) {
      const cat = mockCategories.find((c) => c.slug === activeCategory);
      if (cat) {
        products = products.filter((p) => p.categoryId === cat.id);
      }
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
  }, [activeCategory, sort]);

  const activeCategoryData = mockCategories.find(
    (c) => c.slug === activeCategory
  );

  return (
    <>
      {/* Page header */}
      <div className="mb-8">
        <h1>
          {activeCategoryData ? activeCategoryData.name : "Todos os Produtos"}
        </h1>
        {activeCategoryData && (
          <p className="mt-2 max-w-xl text-muted-foreground">
            {activeCategoryData.description}
          </p>
        )}
      </div>

      {/* Filters bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveCategory(null)}>
            <Badge
              variant={!activeCategory ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-xs"
            >
              Todos
            </Badge>
          </button>
          {mockCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.slug ? null : cat.slug
                )
              }
            >
              <Badge
                variant={activeCategory === cat.slug ? "default" : "outline"}
                className="cursor-pointer px-3 py-1 text-xs"
              >
                {cat.name}
              </Badge>
            </button>
          ))}
        </div>

        {/* Sort & count */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} produto
            {filteredProducts.length !== 1 && "s"}
          </span>
          <Select
            value={sort}
            onValueChange={(v) => v && setSort(v as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome A-Z</SelectItem>
              <SelectItem value="price-asc">Menor preço</SelectItem>
              <SelectItem value="price-desc">Maior preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">
            Nenhum produto encontrado nesta categoria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setActiveCategory(null)}
          >
            Ver todos os produtos
          </Button>
        </div>
      )}
    </>
  );
}
