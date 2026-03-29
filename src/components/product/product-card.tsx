"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { mockBrands } from "@/mocks";
import { useAuth } from "@/features/auth/use-auth";
import { ProductCardView } from "./product-card-view";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { access } = useAuth();
  const brand = mockBrands.find((b) => b.id === product.brandId);

  return (
    <Link href={`/loja/${product.slug}`} className="block">
      <ProductCardView
        name={product.name}
        brandName={brand?.name}
        slug={product.slug}
        image={product.images[0]?.url ?? "/images/placeholder.svg"}
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        inStock={product.inStock}
        showPrice={access.canSeePrice || !access.isLoggedIn}
        className={className}
      />
    </Link>
  );
}
