import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "./container";
import { SITE_NAME, WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";

const footerSections = [
  {
    title: "Produtos",
    links: [
      { href: "/loja?category=toxina-botulinica", label: "Toxina Botulínica" },
      { href: "/loja?category=acido-hialuronico", label: "Ácido Hialurônico" },
      { href: "/loja?category=bioestimuladores", label: "Bioestimuladores" },
      { href: "/loja?category=fios-de-pdo", label: "Fios de PDO" },
      { href: "/loja?category=skincare-profissional", label: "Skincare Profissional" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { href: "/sobre", label: "Sobre Nós" },
      { href: "/eventos", label: "Eventos e Workshops" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Minha Conta",
    links: [
      { href: "/login", label: "Entrar" },
      { href: "/criar-conta", label: "Criar Conta" },
      { href: "/meus-pedidos", label: "Meus Pedidos" },
      { href: "/enderecos", label: "Endereços" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-secondary/30">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl tracking-tight">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Distribuidora premium de produtos para harmonização facial e
              corporal. Exclusivo para profissionais da saúde e estética.
            </p>
            <a
              href={`${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Fale pelo WhatsApp
            </a>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/80">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border/60 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Política de Privacidade
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
