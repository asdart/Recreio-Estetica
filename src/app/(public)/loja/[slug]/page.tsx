"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ShoppingBag,
  MessageCircle,
  LogIn,
  Clock,
  Check,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ArrowUpRight,
  Truck,
} from "lucide-react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useAuth } from "@/features/auth/use-auth";
import { useCartStore } from "@/features/cart/cart-store";
import {
  buildWhatsAppProductMessage,
  getWhatsAppUrl,
} from "@/features/whatsapp/whatsapp-utils";
import { mockProducts, mockBrands, mockCategories } from "@/mocks";
import { FeaturedProductCard } from "@/components/commerce/featured-product-card";

/* ─── Tabs for "About" section ────────────────────────────── */

const TABS = ["Sobre", "Ingredientes", "Uso", "FAQ"] as const;
type Tab = (typeof TABS)[number];

/* ─── Page ────────────────────────────────────────────────── */

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const { access } = useAuth();
  const addItem = useCartStore((s) => s.addItem);
  const brand = mockBrands.find((b) => b.id === product.brandId);
  const category = mockCategories.find((c) => c.id === product.categoryId);
  const brandMap = Object.fromEntries(mockBrands.map((b) => [b.id, b.name]));
  const whatsappUrl = getWhatsAppUrl(buildWhatsAppProductMessage(product.name));

  const [qty, setQty] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("Sobre");

  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 6);

  return (
    <div data-header-theme="dark" className="bg-[#faf9f7]">
      {/* ─── HERO: Gallery + Sticky Info ──────────────── */}
      <section className="flex flex-col lg:flex-row">
        {/* Left — gallery: thumbnail strip + main image */}
        <div className="w-full lg:sticky lg:top-[88px] lg:h-auto lg:w-1/2 lg:flex lg:justify-end">
          {product.images.length > 0 ? (
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-end">
              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3 lg:w-[96px] lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:px-4 lg:py-16 lg:scrollbar-none">
                  {product.images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setGalleryIndex(i)}
                      className={cn(
                        "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all lg:aspect-square lg:h-auto lg:w-full",
                        i === galleryIndex
                          ? "border-[#2b2927]"
                          : "border-transparent opacity-50 hover:opacity-90"
                      )}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="relative h-[600px] w-full max-w-[540px] overflow-hidden bg-[#f5f4f0] lg:h-[600px] lg:min-w-[460px] lg:rounded-3xl lg:m-4 lg:mt-0 lg:ml-0">
                <Image
                  key={product.images[galleryIndex]?.id}
                  src={product.images[galleryIndex]?.url ?? product.images[0]?.url ?? ""}
                  alt={product.images[galleryIndex]?.alt ?? product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                />

                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute left-5 top-5 rounded-full bg-[#2b2927] px-4 py-2">
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#fdfcfb]">
                      Novo Lançamento
                    </span>
                  </div>
                )}

                {/* Prev / Next arrows */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-5 right-5 flex gap-2">
                    <button
                      onClick={() => setGalleryIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition hover:bg-white"
                      aria-label="Foto anterior"
                    >
                      <ChevronDown className="h-4 w-4 rotate-90 text-[#2b2927]" />
                    </button>
                    <button
                      onClick={() => setGalleryIndex((i) => (i + 1) % product.images.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition hover:bg-white"
                      aria-label="Próxima foto"
                    >
                      <ChevronDown className="h-4 w-4 -rotate-90 text-[#2b2927]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#f5f4f0]">
              <span className="font-sans text-sm text-[#9c9690]">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Right — sticky product details (max 600px, Figma) */}
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-start lg:pl-4 xl:pl-6">
          <div className="w-full max-w-[600px]">
            <div className="flex flex-col gap-10 bg-[#faf9f7] p-8 lg:py-16 lg:pr-6 xl:pr-8">
            {/* Category pill */}
            {category && (
              <span className="inline-flex w-fit rounded-full bg-[rgba(43,41,39,0.04)] px-3 py-1 font-sans text-xs uppercase tracking-[1.2px] text-[#6a6662]">
                {category.name}
              </span>
            )}

            {/* Title + description */}
            <div className="flex flex-col gap-4">
              <h1 className="font-heading text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.15] tracking-[-0.5px] text-[#2b2927]">
                {product.name}
              </h1>
              <p className="max-w-[460px] font-sans text-base leading-6 text-[#6a6662]">
                {product.shortDescription}
              </p>
            </div>

            {/* Price */}
            {access.canSeePrice || !access.isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <span className="font-heading text-[40px] leading-[48px] text-[#2b2927]">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-full bg-[#f5f4f0] p-0.5 text-center text-xs text-[#6a6662]">%</span>
                      <span className="font-sans text-sm text-[#6a6662]">
                        Desconto de {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% à vista
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-full bg-[#f5f4f0] p-0.5 text-center text-[10px] text-[#6a6662]">💳</span>
                      <span className="font-sans text-sm text-[#6a6662]">
                        ou em até 6x sem juros {formatCurrency(product.price / 6)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-[#f5f4f0] px-5 py-3">
                <p className="font-sans text-sm text-[#6a6662]">
                  Faça login para visualizar os preços
                </p>
              </div>
            )}

            {/* Volume */}
            <div className="flex flex-col gap-2">
              <p className="font-sans text-base text-[#2b2927]">Volume</p>
              <div className="flex gap-1.5">
                <span className="rounded-full bg-[#2b2927] px-3 py-2 font-sans text-sm font-medium text-[#fdfcfb]">
                  {product.volume}
                </span>
              </div>
            </div>

            {/* Warning box */}
            <div className="flex flex-col gap-2 rounded-2xl bg-[#faeee9] p-4">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="h-5 w-5 text-[#8f5f54]" strokeWidth={1.5} />
                <span className="font-sans text-sm font-medium text-[#8f5f54]">
                  Aviso importante
                </span>
              </div>
              <p className="font-sans text-sm leading-5 text-[#8f5f54]">
                Medicamento sujeito a prescrição e aplicação exclusiva de profissionais da saúde habilitados.
              </p>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                {/* Quantity selector */}
                <div className="flex items-center gap-0 rounded-full bg-[#f5f4f0] p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edeae5] transition-colors hover:bg-[#e0ddd8]"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="h-4 w-4 text-[#2b2927]" />
                  </button>
                  <span className="w-8 text-center font-sans text-sm text-[#2b2927]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edeae5] transition-colors hover:bg-[#e0ddd8]"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="h-4 w-4 text-[#2b2927]" />
                  </button>
                </div>

                {/* Add to cart CTA */}
                {!access.isLoggedIn ? (
                  <Link
                    href="/login"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2b2927] font-sans text-sm tracking-[0.4px] text-[#fdfcfb] transition-colors hover:bg-[#3a3835]"
                  >
                    <LogIn className="h-4 w-4" />
                    Faça login para comprar
                  </Link>
                ) : access.canCheckout ? (
                  <button
                    disabled={!product.inStock}
                    onClick={() => {
                      for (let i = 0; i < qty; i++) addItem(product);
                    }}
                    className="flex flex-1 items-center justify-center gap-3 rounded-full bg-[#2b2927] font-sans text-sm tracking-[0.4px] text-[#fdfcfb] transition-colors hover:bg-[#3a3835] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                    Adicionar ao carrinho
                  </button>
                ) : (
                  <span className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f0ede9] font-sans text-sm text-[#9c9690]">
                    <Clock className="h-4 w-4" />
                    Aguardando validação
                  </span>
                )}
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[#d6d2cc] py-4 font-sans text-sm tracking-[0.4px] text-[#2b2927] transition-colors hover:border-[#2b2927]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                Dúvidas? Fale conosco no Whatsapp
              </a>

              {/* Shipping note */}
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#6a6662]" strokeWidth={1.5} />
                <span className="font-sans text-sm text-[#6a6662]">
                  Envio em 24h para todo o Brasil
                </span>
              </div>
            </div>

            {/* Related SKU preview */}
            {brand && (
              <div className="flex flex-col gap-3 border-t border-[#edeae5] pt-6">
                <span className="font-sans text-xs uppercase tracking-[1.2px] text-[#9c9690]">
                  Conheça bem mais
                </span>
                <div className="flex items-center justify-between rounded-2xl bg-[#f5f4f0] p-3">
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-sans text-sm font-medium text-[#2b2927]">
                        {brand.name}
                      </span>
                      <span className="font-sans text-xs text-[#6a6662]">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/loja?category=${product.categoryId}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d6d2cc]"
                  >
                    <Plus className="h-3.5 w-3.5 text-[#2b2927]" />
                  </Link>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── "O que você precisa saber" Section ───────── */}
      <section className="border-t border-[#edeae5]">
        <div className="mx-auto max-w-[1360px] px-6 py-20 md:py-28">
          {/* Title */}
          <h2 className="mb-10 text-center font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-1px] text-[#2b2927]">
            O que você precisa saber{" "}
            <em className="italic text-[#6a6662]">sobre o produto</em>
          </h2>

          {/* Tab bar */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "min-w-[120px] rounded-full px-4 py-2.5 font-sans text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-[#6a6662] text-white"
                    : "text-[#6a6662] hover:bg-[#f5f4f0]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mx-auto max-w-[960px]">
            {activeTab === "Sobre" && (
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Image */}
                {product.images[1] && (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f5f4f0]">
                    <Image
                      src={product.images[1]?.url ?? product.images[0]?.url ?? "/images/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 460px, 100vw"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center gap-8">
                  <div className="flex flex-col gap-4">
                    <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#9c9690]">
                      Sobre o produto
                    </h4>
                    <p className="font-sans text-base leading-7 text-[#6a6662]">
                      {product.description}
                    </p>
                  </div>
                  {product.benefits.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#9c9690]">
                        Indicado para
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {product.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#2b2927]" strokeWidth={2} />
                            <span className="font-sans text-sm leading-5 text-[#2b2927]">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Ingredientes" && (
              <div className="flex flex-col gap-6">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#9c9690]">
                  Composição
                </h4>
                <p className="font-sans text-base leading-7 text-[#6a6662]">
                  {product.composition || "Informação não disponível para este produto."}
                </p>
                {product.specs.length > 0 && (
                  <>
                    <h4 className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#9c9690]">
                      Especificações Técnicas
                    </h4>
                    <div className="overflow-hidden rounded-2xl bg-[#f5f4f0]">
                      {product.specs.map((spec, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center justify-between px-6 py-4 font-sans text-sm",
                            i !== product.specs.length - 1 && "border-b border-[#edeae5]"
                          )}
                        >
                          <span className="font-medium text-[#2b2927]">{spec.label}</span>
                          <span className="text-[#6a6662]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "Uso" && (
              <div className="mx-auto max-w-[640px] text-center">
                <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#9c9690]">
                  Modo de uso
                </h4>
                <p className="font-sans text-base leading-7 text-[#6a6662]">
                  {product.usage || "Informação não disponível para este produto."}
                </p>
              </div>
            )}

            {activeTab === "FAQ" && (
              <div className="mx-auto max-w-[640px]">
                {product.faq.length > 0 ? (
                  <AccordionPrimitive.Root className="flex flex-col gap-4">
                    {product.faq.map((item, i) => (
                      <AccordionPrimitive.Item
                        key={i}
                        value={`faq-${i}`}
                        className="group rounded-3xl bg-[#f5f4f0] px-6 py-6"
                      >
                        <AccordionPrimitive.Header className="flex">
                          <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-4 text-left">
                            <span className="flex-1 font-sans text-base font-medium leading-6 text-[#2b2927]">
                              {item.question}
                            </span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edeae5] transition-colors group-aria-expanded:bg-[#2b2927]">
                              <ChevronDown className="h-4 w-4 text-[#2b2927] group-aria-expanded:hidden" />
                              <ChevronUp className="hidden h-4 w-4 text-white group-aria-expanded:block" />
                            </span>
                          </AccordionPrimitive.Trigger>
                        </AccordionPrimitive.Header>
                        <AccordionPrimitive.Panel className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
                          <p className="h-(--accordion-panel-height) pt-3 font-sans text-sm leading-5 text-[#6a6662] data-ending-style:h-0 data-starting-style:h-0">
                            {item.answer}
                          </p>
                        </AccordionPrimitive.Panel>
                      </AccordionPrimitive.Item>
                    ))}
                  </AccordionPrimitive.Root>
                ) : (
                  <p className="text-center font-sans text-sm text-[#9c9690]">
                    Nenhuma pergunta frequente para este produto.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Related Products ─────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="overflow-x-clip border-t border-[#edeae5] py-20 md:py-28">
          <div className="mx-auto max-w-[1360px] px-6">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-1px] text-[#2b2927]">
                Produtos{" "}
                <em className="italic text-[#6a6662]">relacionados</em>
              </h2>
              <Link
                href={`/loja?category=${product.categoryId}`}
                className="hidden items-center gap-2 rounded-full border border-[#4a4744] py-3.5 pl-6 pr-3.5 transition-colors hover:bg-[#2b2927] hover:text-[#fdfcfb] sm:flex"
              >
                <span className="font-sans text-base tracking-[0.4px]">Ver todos</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b2927] text-[#fdfcfb]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
          <div className="pl-6 lg:pl-[max(1.5rem,calc((100vw-1360px)/2+1.5rem))]">
            <div className="flex gap-4 overflow-x-auto pr-6 scrollbar-none" style={{ scrollSnapType: "x mandatory" }}>
              {relatedProducts.map((p) => (
                <div key={p.id} className="shrink-0" style={{ scrollSnapAlign: "start" }}>
                  <FeaturedProductCard product={p} brandName={brandMap[p.brandId] ?? ""} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
