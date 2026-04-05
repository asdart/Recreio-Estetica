import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, Award, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PromoTicker } from "@/components/commerce/promo-ticker";
import { FeaturedProducts } from "@/components/commerce/featured-products";
import { BrowseCategories } from "@/components/commerce/browse-categories";
import { ProductShowcase } from "@/components/commerce/product-showcase";
import { HomeFaq } from "@/components/commerce/home-faq";
import { HeroContent } from "@/components/hero/hero-content";
import { mockProducts, mockBrands } from "@/mocks";
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";

const featuredProducts = mockProducts.filter((p) => p.featured);
const fillerProducts = mockProducts.filter((p) => p.categoryId === "cat-2");
const skincareProducts = mockProducts.filter((p) => p.categoryId === "cat-5");
const brandMap = Object.fromEntries(mockBrands.map((b) => [b.id, b.name]));

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section data-header-theme="light" className="relative flex items-center justify-center min-h-[600px] md:min-h-[800px] lg:min-h-[948px] -mt-[72px]">
        {/* Background image + overlay — clipped independently so dropdown is not cut off */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(43,41,39,0.72)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1360px] px-6 py-12">
          <HeroContent />
        </div>
      </section>

      {/* Promo Ticker */}
      <PromoTicker />

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} brandMap={brandMap} />

      {/* Browse by Category */}
      <BrowseCategories />

      {/* Product Showcase — Preenchedores */}
      <ProductShowcase
        title="Preenchedores"
        subtitle="Mantenha-se brilhante e saudável sem ter que pensar nisso."
        image="https://assets.lummi.ai/assets/QmYybTZZXwoZq3LsG4QQD4dtkQhbdrJRZD9ZGNcD1Cvdaw?auto=format&w=1200"
        imageAlt="Tratamento estético profissional com preenchedores"
        products={fillerProducts}
        brandMap={brandMap}
        categorySlug="acido-hialuronico"
        imagePosition="left"
      />

      {/* Skinboosters */}
      <FeaturedProducts
        title="Skinboosters"
        subtitle="Hidratação profunda e biorevitalização para uma pele radiante."
        products={skincareProducts}
        brandMap={brandMap}
        categorySlug="skincare-profissional"
      />

      {/* Trust Section */}
      <section data-header-theme="dark" className="py-20 md:py-28">
        <Container>
          <div className="mb-12 text-center">
            <h2>Para Profissionais da Estética</h2>
            <p className="mt-2 text-muted-foreground">
              Confiança, qualidade e suporte consultivo
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Produtos com Registro ANVISA",
                description:
                  "Todos os nossos produtos possuem registro e aprovação da ANVISA, garantindo segurança para seus pacientes.",
              },
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Logística Especializada",
                description:
                  "Transporte com controle de temperatura e embalagens adequadas para produtos sensíveis.",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Suporte Técnico",
                description:
                  "Equipe de consultores especializados para auxiliar na escolha dos produtos e protocolos.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warm-100 text-foreground/70">
                  {item.icon}
                </div>
                <h4 className="!text-base !font-sans font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WhatsApp Banner */}
      <section data-header-theme="light" className="bg-foreground text-background py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="!text-background mb-4">
              Venda Consultiva
            </h2>
            <p className="mb-8 text-base leading-relaxed text-background/70">
              Prefere um atendimento personalizado? Nossa equipe está pronta
              para montar o pedido ideal para sua clínica via WhatsApp.
            </p>
            <Button
              size="lg"
              className="bg-[#25D366] text-white hover:bg-[#20BD5A]"
              asChild
            >
              <a
                href={`${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Iniciar Conversa
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <HomeFaq />

      {/* Editorial Block */}
      <section data-header-theme="dark" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-warm-100">
              <Image
                src="/images/editorial-clinic.svg"
                alt="Clínica moderna de estética"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Sobre a Recreio Estética
              </p>
              <h2 className="mb-4">
                Sua parceira em harmonização de excelência
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Há mais de 10 anos no mercado, a Recreio Estética é referência
                na distribuição de produtos para harmonização facial e corporal
                no Rio de Janeiro.
              </p>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                Trabalhamos exclusivamente com profissionais credenciados,
                oferecendo produtos de alta qualidade com suporte técnico
                especializado.
              </p>
              <Button variant="outline" asChild>
                <Link href="/sobre">
                  Conheça nossa história
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
