"use client";

import Link from "next/link";
import { Package, MapPin, RefreshCw, User, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ValidationStatusBanner } from "@/components/auth/validation-status-banner";
import { useAuth } from "@/features/auth/use-auth";

const accountLinks = [
  {
    href: "/meus-dados",
    icon: <User className="h-5 w-5" />,
    title: "Meus Dados",
    description: "Dados pessoais e profissionais",
  },
  {
    href: "/meus-pedidos",
    icon: <Package className="h-5 w-5" />,
    title: "Meus Pedidos",
    description: "Histórico e acompanhamento",
  },
  {
    href: "/recompras",
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Recompras",
    description: "Repita pedidos anteriores facilmente",
  },
  {
    href: "/enderecos",
    icon: <MapPin className="h-5 w-5" />,
    title: "Endereços",
    description: "Gerencie seus endereços de entrega",
  },
  {
    href: "/registro-profissional",
    icon: <FileText className="h-5 w-5" />,
    title: "Registro Profissional",
    description: "Status da validação e documentos",
  },
];

export default function MinhaContaPage() {
  const { customer, access } = useAuth();

  return (
    <Container className="py-10 md:py-16">
      <div className="mb-8">
        <h1 className="!text-3xl">Minha Conta</h1>
        {customer && (
          <p className="mt-1 text-muted-foreground">
            Olá, {customer.firstName}!
          </p>
        )}
      </div>

      {access.isLoggedIn && access.validationStatus !== "approved" && (
        <ValidationStatusBanner
          status={access.validationStatus}
          className="mb-8"
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accountLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-start gap-4 rounded-lg border border-border/60 p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
          >
            <div className="text-muted-foreground">{link.icon}</div>
            <div>
              <p className="text-sm font-semibold">{link.title}</p>
              <p className="text-xs text-muted-foreground">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
