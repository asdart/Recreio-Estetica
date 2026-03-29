"use client";

import Link from "next/link";
import { ShoppingBag, MessageCircle, LogIn, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceBlock } from "./price-block";
import { useAuth } from "@/features/auth/use-auth";
import { useCartStore } from "@/features/cart/cart-store";
import {
  buildWhatsAppProductMessage,
  getWhatsAppUrl,
} from "@/features/whatsapp/whatsapp-utils";
import { mockBrands } from "@/mocks";
import type { Product } from "@/types";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { access } = useAuth();
  const addItem = useCartStore((s) => s.addItem);
  const brand = mockBrands.find((b) => b.id === product.brandId);

  const whatsappUrl = getWhatsAppUrl(
    buildWhatsAppProductMessage(product.name)
  );

  return (
    <div className="space-y-6">
      {/* Brand & tags */}
      <div className="space-y-2">
        {brand && (
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {brand.name}
          </p>
        )}
        <h1 className="!text-3xl !md:text-4xl !lg:text-4xl">{product.name}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>

      {/* Price */}
      <PriceBlock
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        showPrice={access.canSeePrice || !access.isLoggedIn}
      />

      {/* Stock */}
      {!product.inStock && (
        <Badge variant="secondary">Produto indisponível no momento</Badge>
      )}

      {/* Volume */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Volume:</span>{" "}
        {product.volume}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        {!access.isLoggedIn ? (
          <Button asChild size="lg" className="w-full">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Faça login para comprar
            </Link>
          </Button>
        ) : access.canCheckout ? (
          <Button
            size="lg"
            className="w-full"
            disabled={!product.inStock}
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        ) : (
          <Button size="lg" className="w-full" disabled>
            <Clock className="mr-2 h-4 w-4" />
            Aguardando validação profissional
          </Button>
        )}

        <Button variant="outline" size="lg" className="w-full" asChild>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Consultar via WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
