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
import { ProductCard } from "@/components/product/product-card";

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
  const whatsappUrl = getWhatsAppUrl(buildWhatsAppProductMessage(product.name));

  const [qty, setQty] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("Sobre");

  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 6);

  return (
    <div data-header-theme="dark" className="bg-[#faf9f7]">
      {/* ─── Breadcrumb ───────────────────────────────── */}
      <div className="mx-auto max-w-[1360px] px-6 pt-12 pb-0">
        <p className="font-sans text-xs tracking-[0.4px] text-[#6a6662]">
          <Link href="/" className="hover:underline">Início</Link>
          {" / "}
          <Link href="/loja" className="hover:underline">Todos os Produtos</Link>
          {category && (
            <>
              {" / "}
              <Link href={`/loja?category=${category.slug}`} className="hover:underline">
                {category.name}
              </Link>
            </>
          )}
          {" / "}
          <span className="text-[#2b2927]">{product.name}</span>
        </p>
      </div>

      {/* ─── HERO: Gallery + Sticky Info ──────────────── */}
      <section className="flex flex-col lg:flex-row">
        {/* Left — gallery: thumbnail strip + main image */}
        <div className="w-full lg:sticky lg:top-[76px] lg:self-start lg:h-auto lg:w-1/2 lg:flex lg:justify-end">
          {product.images.length > 0 ? (
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-end pt-6 pb-16">
              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3 lg:w-[96px] lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:px-4 lg:pt-0 lg:pb-4 lg:scrollbar-none">
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
            <div className="flex flex-col gap-10 bg-[#faf9f7] p-8 lg:pb-16 lg:pt-6 lg:pr-6 xl:pr-8">
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
                <div className="flex flex-col gap-2">
                  {product.compareAtPrice && (
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                        <path d="M9.7854 11.1518C9.95372 10.9835 10.2474 10.9829 10.4159 11.1518L12.8157 13.5519C13.2597 13.9953 13.8501 14.2398 14.4777 14.2398L14.7669 14.2396L11.7188 17.2881C10.7694 18.2373 9.23054 18.2373 8.28136 17.2881L5.24189 14.2486H5.71484C6.0236 14.2494 6.32946 14.189 6.61473 14.0709C6.89999 13.9528 7.15901 13.7793 7.3768 13.5605L9.7854 11.1518Z" fill="#6A6662"/>
                        <path d="M4.56128 6.4318C4.59999 6.44647 4.64115 6.45666 4.68496 6.45666H5.71484C6.15076 6.45789 6.5686 6.63105 6.87757 6.93857L9.28636 9.3472C9.39326 9.4542 9.52024 9.53905 9.66001 9.59685C9.79978 9.65466 9.9496 9.68429 10.1008 9.68404C10.2521 9.68426 10.4019 9.65459 10.5417 9.59676C10.6815 9.53892 10.8085 9.45404 10.9153 9.347L13.315 6.94755C13.624 6.64007 14.0418 6.46689 14.4777 6.46562H15.3152C15.3616 6.46562 15.4055 6.45543 15.446 6.43912L17.2881 8.28105C18.2373 9.23064 18.2373 10.7695 17.2881 11.7187L15.446 13.5609C15.4055 13.5446 15.3616 13.5344 15.3152 13.5344H14.4777C14.0418 13.5331 13.624 13.3599 13.315 13.0524L10.9153 10.6528C10.4803 10.2175 9.72143 10.2177 9.28617 10.6528L6.87757 13.0614C6.56855 13.3688 6.15073 13.5419 5.71484 13.5431H4.68496C4.64115 13.5431 4.59999 13.5533 4.56128 13.568L2.71203 11.7189C1.76266 10.7694 1.76266 9.23044 2.71203 8.28126L4.56128 6.4318Z" fill="#6A6662"/>
                        <path d="M8.28115 2.71189C9.23053 1.7627 10.7694 1.7627 11.7188 2.71189L14.7669 5.76016H14.4777C14.1689 5.7593 13.8631 5.81965 13.5778 5.93774C13.2926 6.05582 13.0335 6.22929 12.8157 6.4481L10.4159 8.84836C10.3322 8.93186 10.2188 8.97876 10.1006 8.97876C9.98244 8.97876 9.86907 8.93186 9.7854 8.84836L7.3768 6.43934C6.93278 5.99572 6.34246 5.75139 5.71484 5.75139H5.24208L8.28115 2.71189Z" fill="#6A6662"/>
                      </svg>
                      <span className="font-sans text-sm text-[#6a6662]">
                        Desconto de {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% à vista
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                      <path d="M8.05566 12C8.33158 12.0003 8.55566 12.224 8.55566 12.5C8.55566 12.776 8.33158 12.9997 8.05566 13H4.72266C4.44651 13 4.22266 12.7761 4.22266 12.5C4.22266 12.2239 4.44651 12 4.72266 12H8.05566Z" fill="#6A6662"/>
                      <path d="M15.2783 12C15.5541 12.0004 15.7783 12.2241 15.7783 12.5C15.7783 12.7759 15.5541 12.9996 15.2783 13H14.167C13.8908 13 13.667 12.7761 13.667 12.5C13.667 12.2239 13.8908 12 14.167 12H15.2783Z" fill="#6A6662"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.833 3.66602C17.3363 3.66602 18.5555 4.8854 18.5557 6.38867V13.6104C18.5557 15.1138 17.3364 16.333 15.833 16.333H4.16699C2.66355 16.333 1.44434 15.1138 1.44434 13.6104V6.38867C1.44453 4.8854 2.66367 3.66602 4.16699 3.66602H15.833ZM2.44434 13.6104C2.44434 14.5615 3.21584 15.333 4.16699 15.333H15.833C16.7842 15.333 17.5557 14.5615 17.5557 13.6104V8.55566H2.44434V13.6104ZM4.16699 4.66602C3.21596 4.66602 2.44453 5.43768 2.44434 6.38867V7.55566H17.5557V6.38867C17.5555 5.43768 16.784 4.66602 15.833 4.66602H4.16699Z" fill="#6A6662"/>
                    </svg>
                    <span className="font-sans text-sm text-[#6a6662]">
                      ou em até 6x sem juros {formatCurrency(product.price / 6)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                      <path d="M4.44444 17.5C5.51833 17.5 6.38889 16.6294 6.38889 15.5555C6.38889 14.4816 5.51833 13.6111 4.44444 13.6111C3.37056 13.6111 2.5 14.4816 2.5 15.5555C2.5 16.6294 3.37056 17.5 4.44444 17.5Z" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5001 17.5C13.574 17.5 14.4446 16.6294 14.4446 15.5555C14.4446 14.4816 13.574 13.6111 12.5001 13.6111C11.4262 13.6111 10.5557 14.4816 10.5557 15.5555C10.5557 16.6294 11.4262 17.5 12.5001 17.5Z" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.5769 15.2777H6.38916" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.27783 3.05554H10.2778C11.5056 3.05554 12.5001 4.04999 12.5001 5.27776V13.6111" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5 6.38892H14.9489C15.3267 6.38892 15.6789 6.58114 15.8833 6.89892L17.8789 10.0034C17.9944 10.1822 18.0556 10.3911 18.0556 10.6045V13.0556C18.0556 14.2834 17.0611 15.2778 15.8333 15.2778H14.4444" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5 10.2777H17.9478" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.05566 6.38892H7.77789" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M0.833496 9.72217H5.55572" stroke="#6A6662" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-sans text-sm text-[#6a6662]">
                      Envio em 24h para todo o Brasil
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#f5f4f0] px-5 py-3">
                <p className="font-sans text-sm text-[#6a6662]">
                  Faça login para visualizar os preços
                </p>
              </div>
            )}

            {/* Quantity + Shipping row */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
                  Quantidade
                </span>
                <div className="flex h-10 w-[136px] items-center justify-between rounded-full bg-[#f5f4f0] p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edeae5] transition-colors hover:bg-[#e0ddd8]"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="h-3.5 w-3.5 text-[#2b2927]" />
                  </button>
                  <span className="w-6 text-center font-sans text-sm text-[#2b2927]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edeae5] transition-colors hover:bg-[#e0ddd8]"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="h-3.5 w-3.5 text-[#2b2927]" />
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-4">
                {!access.isLoggedIn ? (
                  <Link
                    href="/login"
                    className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#2b2927] font-sans text-lg tracking-[0.4px] text-[#fdfcfb] transition-colors hover:bg-[#3a3835]"
                  >
                    <LogIn className="h-5 w-5" />
                    Faça login para comprar
                  </Link>
                ) : access.canCheckout ? (
                  <button
                    disabled={!product.inStock}
                    onClick={() => {
                      for (let i = 0; i < qty; i++) addItem(product);
                    }}
                    className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#2b2927] font-sans text-lg tracking-[0.4px] text-[#fdfcfb] transition-colors hover:bg-[#3a3835] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                    Adicionar ao carrinho
                  </button>
                ) : (
                  <span className="flex h-16 w-full items-center justify-center gap-2 rounded-full bg-[#f0ede9] font-sans text-lg text-[#9c9690]">
                    <Clock className="h-5 w-5" />
                    Aguardando validação
                  </span>
                )}

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-full border border-[#4a4744] bg-[#f5f4f0] font-sans text-lg tracking-[0.4px] text-[#2b2927] transition-colors hover:border-[#2b2927] hover:bg-white"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
                  Dúvidas? Fale conosco no Whatsapp
                </a>
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
            </div>

            {/* Combina Bem Com */}
            {relatedProducts.length > 0 && (
              <div className="flex flex-col gap-6 rounded-2xl bg-[rgba(43,41,39,0.04)] p-6">
                <span className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
                  Combina Bem Com
                </span>
                <div className="flex flex-col gap-6">
                  {relatedProducts.slice(0, 3).map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-6">
                      <div className="flex flex-1 items-center gap-3">
                        {p.images[0] && (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#faeee9]">
                            <Image
                              src={p.images[0].url}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="font-sans text-sm font-medium text-[#2b2927]">
                            {p.name}
                          </span>
                          <span className="font-sans text-sm text-[#6a6662]">
                            {formatCurrency(p.price)}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/loja/${p.slug}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6a6662] transition-colors hover:bg-[#2b2927]"
                        aria-label={`Ver ${p.name}`}
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </Link>
                    </div>
                  ))}
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
            <div
              className="flex gap-8 overflow-x-auto pr-6 scrollbar-none"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="w-[72vw] max-w-[360px] shrink-0 sm:w-[45vw] lg:w-[30vw]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProductCard key={p.id} product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
