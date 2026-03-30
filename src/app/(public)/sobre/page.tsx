import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Shield, Users, Heart } from "lucide-react";

export default function SobrePage() {
  return (
    <Container data-header-theme="dark" className="py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Sobre nós
        </p>
        <h1 className="mb-6">Recreio Estética</h1>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Fundada em 2014 no Rio de Janeiro, a Recreio Estética nasceu da
            necessidade de oferecer aos profissionais da estética e saúde acesso
            a produtos de harmonização de alta qualidade com atendimento
            consultivo e personalizado.
          </p>
          <p>
            Somos uma distribuidora B2B especializada em toxinas botulínicas,
            ácidos hialurônicos, bioestimuladores de colágeno, fios de PDO e
            skincare profissional. Trabalhamos exclusivamente com profissionais
            credenciados — médicos, dentistas, biomédicos e farmacêuticos.
          </p>
          <p>
            Nosso diferencial está no atendimento consultivo: cada cliente conta
            com suporte técnico para escolher os melhores produtos e protocolos
            para sua prática clínica.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          {
            icon: <Shield className="h-7 w-7" />,
            title: "Qualidade Garantida",
            text: "Todos os produtos com registro ANVISA e armazenamento em condições controladas.",
          },
          {
            icon: <Users className="h-7 w-7" />,
            title: "Atendimento Consultivo",
            text: "Equipe especializada para orientar sobre produtos e protocolos clínicos.",
          },
          {
            icon: <Heart className="h-7 w-7" />,
            title: "Compromisso com o Profissional",
            text: "Preços competitivos, condições especiais e programa de recompra para parceiros.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-border/60 p-6"
          >
            <div className="mb-3 text-foreground/70">{item.icon}</div>
            <h4 className="!text-base !font-sans font-semibold mb-2">
              {item.title}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 relative aspect-[21/9] overflow-hidden rounded-lg bg-warm-100">
        <Image
          src="/images/editorial-team.svg"
          alt="Equipe Recreio Estética"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </Container>
  );
}
