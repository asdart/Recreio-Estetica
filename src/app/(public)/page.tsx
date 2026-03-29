import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, Award, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { mockProducts, mockCategories } from "@/mocks";
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";

const featuredProducts = mockProducts.filter((p) => p.featured);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-warm-100">
        <Container className="py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Exclusivo para profissionais
            </p>
            <h1 className="mb-6">
              Produtos premium para harmonização facial e corporal
            </h1>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              Distribuição de toxinas botulínicas, ácidos hialurônicos,
              bioestimuladores e skincare profissional para clínicas e
              consultórios.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/loja">
                  Explorar Produtos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href={`${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar com Consultor
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-10 text-center">
            <h2>Nossas Categorias</h2>
            <p className="mt-2 text-muted-foreground">
              Encontre o produto ideal para seu protocolo
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                href={`/loja?category=${category.slug}`}
                className="group relative flex flex-col items-center rounded-lg border border-border/60 bg-card p-6 text-center transition-all hover:border-foreground/20 hover:shadow-sm"
              >
                <div className="mb-4 h-20 w-20 rounded-full bg-warm-100 flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="object-contain opacity-70"
                  />
                </div>
                <h4 className="!text-sm !font-sans font-semibold mb-1">
                  {category.name}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="bg-warm-50 py-20 md:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2>Destaques</h2>
              <p className="mt-2 text-muted-foreground">
                Produtos mais procurados por profissionais
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/loja">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/loja">Ver todos os produtos</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-28">
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
      <section className="bg-foreground text-background py-16 md:py-20">
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

      {/* Editorial Block */}
      <section className="py-20 md:py-28">
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
