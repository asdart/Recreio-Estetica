"use client";

import Link from "next/link";
import { AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfessionalValidationStatus } from "@/types";

type ValidationStatusBannerProps = {
  status: ProfessionalValidationStatus;
  className?: string;
};

const config: Record<
  ProfessionalValidationStatus,
  {
    icon: React.ReactNode;
    title: string;
    description: string;
    bg: string;
    link?: { href: string; label: string };
  }
> = {
  not_submitted: {
    icon: <AlertTriangle className="h-5 w-5 flex-shrink-0" />,
    title: "Registro profissional pendente",
    description: "Envie seu registro profissional para liberar a compra.",
    bg: "bg-gold-light/50 border-gold/30 text-gold-dark",
    link: { href: "/registro-profissional", label: "Enviar agora" },
  },
  pending: {
    icon: <Clock className="h-5 w-5 flex-shrink-0" />,
    title: "Validação em análise",
    description: "Seu registro está sendo analisado. Retornaremos em breve.",
    bg: "bg-gold-light/50 border-gold/30 text-gold-dark",
  },
  approved: {
    icon: <CheckCircle className="h-5 w-5 flex-shrink-0" />,
    title: "Conta aprovada",
    description: "Seu registro foi validado. Você pode realizar compras.",
    bg: "bg-teal-light/50 border-teal/30 text-teal",
  },
  rejected: {
    icon: <XCircle className="h-5 w-5 flex-shrink-0" />,
    title: "Registro recusado",
    description: "Houve um problema com seu registro. Envie novamente.",
    bg: "bg-destructive/10 border-destructive/20 text-destructive",
    link: { href: "/registro-profissional", label: "Reenviar" },
  },
};

export function ValidationStatusBanner({
  status,
  className,
}: ValidationStatusBannerProps) {
  const c = config[status];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4",
        c.bg,
        className
      )}
    >
      {c.icon}
      <div className="flex-1">
        <p className="text-sm font-medium">{c.title}</p>
        <p className="text-xs opacity-80">{c.description}</p>
        {c.link && (
          <Link
            href={c.link.href}
            className="mt-1 inline-block text-xs font-medium underline underline-offset-2"
          >
            {c.link.label}
          </Link>
        )}
      </div>
    </div>
  );
}
