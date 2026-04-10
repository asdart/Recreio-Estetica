"use client";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/use-auth";
import { VALIDATION_STATUS_LABELS } from "@/lib/constants";

export default function MeusDadosPage() {
  const { customer } = useAuth();

  if (!customer) {
    return (
      <p className="py-12 text-center font-sans text-sm text-[#9c9690]">
        Faça login para acessar seus dados.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(43,41,39,0.08)]">
          <User className="h-5 w-5 text-[#2b2927]" strokeWidth={1.5} />
        </div>
        <h2 className="font-heading text-[32px] leading-10 tracking-[0.3px] text-[#2b2927]">
          Dados pessoais
        </h2>
      </div>

      <div className="rounded-3xl border border-[#e4dfd8] bg-[#faf9f7] p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
              Nome
            </Label>
            <Input
              value={customer.firstName}
              readOnly
              className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
              Sobrenome
            </Label>
            <Input
              value={customer.lastName}
              readOnly
              className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
              E-mail
            </Label>
            <Input
              value={customer.email}
              readOnly
              className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
              Telefone
            </Label>
            <Input
              value={customer.phone}
              readOnly
              className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
              Registro Profissional
            </Label>
            <Input
              value={customer.registrationNumber}
              readOnly
              className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]">
              Status da Validação
            </Label>
            <Input
              value={VALIDATION_STATUS_LABELS[customer.validationStatus] ?? customer.validationStatus}
              readOnly
              className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
