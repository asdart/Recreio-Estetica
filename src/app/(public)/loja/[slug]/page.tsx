"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { TechnicalSpecs } from "@/components/product/technical-specs";
import { FAQAccordion } from "@/components/commerce/faq-accordion";
import { WhatsAppCTA } from "@/components/cart/whatsapp-cta";
import { ProductCard } from "@/components/product/product-card";
import { Separator } from "@/components/ui/separator";
import {
  buildWhatsAppProductMessage,
  getWhatsAppUrl,
} from "@/features/whatsapp/whatsapp-utils";
import { mockProducts } from "@/mocks";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = mockProducts
    .filter(
      (p) => p.categoryId === product.categoryId && p.id !== product.id
    )
    .slice(0, 4);

  const whatsappUrl = getWhatsAppUrl(
    buildWhatsAppProductMessage(product.name)
  );

  return (
    <Container data-header-theme="dark" className="py-10 md:py-16">
      {/* Main product section */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      {/* Details sections */}
      <div className="mt-16 space-y-12">
        {/* Description */}
        <div className="max-w-3xl space-y-4">
          <h3>Descrição</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        <Separator />

        {/* Specs */}
        <TechnicalSpecs specs={product.specs} />

        {/* Composition & Usage */}
        {(product.composition || product.usage) && (
          <>
            <Separator />
            <div className="grid gap-8 md:grid-cols-2">
              {product.composition && (
                <div className="space-y-3">
                  <h4 className="!font-sans font-semibold">Composição</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.composition}
                  </p>
                </div>
              )}
              {product.usage && (
                <div className="space-y-3">
                  <h4 className="!font-sans font-semibold">Modo de Uso</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.usage}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Benefits */}
        {product.benefits.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3>Benefícios</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* FAQ */}
        {product.faq.length > 0 && (
          <>
            <Separator />
            <FAQAccordion items={product.faq} />
          </>
        )}

        {/* WhatsApp */}
        <WhatsAppCTA
          href={whatsappUrl}
          label="Tire suas dúvidas pelo WhatsApp"
          variant="banner"
        />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h3 className="mb-8">Produtos Relacionados</h3>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
