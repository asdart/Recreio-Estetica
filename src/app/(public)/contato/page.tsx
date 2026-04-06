"use client";

import { useState } from "react";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getWhatsAppUrl } from "@/features/whatsapp/whatsapp-utils";
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Av. das Américas, 3500 — Barra da Tijuca\nRio de Janeiro, RJ — 22640-102",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(21) 3333-4444",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@recreioestetica.com.br",
  },
];

export default function ContatoPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const whatsappUrl = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de entrar em contato.")}`;

  return (
    <div data-header-theme="dark" className="bg-[#faf9f7]">
      {/* ─── Hero ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[1360px] px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-xl">
          <span className="inline-flex w-fit rounded-full bg-[rgba(43,41,39,0.04)] px-3 py-1 font-sans text-xs uppercase tracking-[1.2px] text-[#6a6662]">
            Fale conosco
          </span>
          <h1 className="mt-5 font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-1px] text-[#2b2927]">
            Como podemos{" "}
            <em className="italic text-[#6a6662]">ajudar?</em>
          </h1>
          <p className="mt-4 max-w-[440px] font-sans text-base leading-7 text-[#6a6662]">
            Nossa equipe está disponível para tirar dúvidas, receber pedidos e apoiar profissionais da saúde.
          </p>
        </div>
      </div>

      {/* ─── Divider ──────────────────────────────────── */}
      <div className="border-t border-[#edeae5]" />

      {/* ─── Content ──────────────────────────────────── */}
      <div className="mx-auto max-w-[1360px] px-6 py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">

          {/* Left — contact info */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(43,41,39,0.04)]">
                    <Icon className="h-4 w-4 text-[#6a6662]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#9c9690]">
                      {label}
                    </p>
                    <p className="font-sans text-sm leading-6 text-[#2b2927] whitespace-pre-line">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="rounded-2xl bg-[rgba(43,41,39,0.04)] p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#9c9690]">
                Atendimento rápido
              </p>
              <p className="mt-2 font-heading text-xl leading-7 text-[#2b2927]">
                Prefere falar pelo WhatsApp?
              </p>
              <p className="mt-1 font-sans text-sm leading-6 text-[#6a6662]">
                Respondemos em até 1 hora em dias úteis.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 font-sans text-sm font-medium tracking-[0.4px] text-white transition-colors hover:bg-[#20BD5A]"
              >
                <MessageCircle className="h-4 w-4" />
                Falar via WhatsApp
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              const url = getWhatsAppUrl(
                `Olá! Meu nome é ${form.name}.\n\nAssunto: ${form.subject}\n\n${form.message}\n\nE-mail para retorno: ${form.email}`
              );
              window.open(url, "_blank");
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]"
                >
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927] placeholder:text-[#c0bbb5] focus-visible:border-[#2b2927] focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]"
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927] placeholder:text-[#c0bbb5] focus-visible:border-[#2b2927] focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="subject"
                className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]"
              >
                Assunto
              </Label>
              <Input
                id="subject"
                placeholder="Como podemos ajudar?"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                required
                className="h-11 rounded-xl border-[#e0ddd8] bg-white px-4 font-sans text-sm text-[#2b2927] placeholder:text-[#c0bbb5] focus-visible:border-[#2b2927] focus-visible:ring-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="message"
                className="font-sans text-xs font-semibold uppercase tracking-[1px] text-[#6a6662]"
              >
                Mensagem
              </Label>
              <textarea
                id="message"
                rows={6}
                placeholder="Escreva sua mensagem..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
                className="w-full resize-none rounded-xl border border-[#e0ddd8] bg-white px-4 py-3 font-sans text-sm text-[#2b2927] placeholder:text-[#c0bbb5] outline-none transition-colors focus:border-[#2b2927]"
              />
            </div>

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#2b2927] font-sans text-sm tracking-[0.4px] text-[#fdfcfb] transition-colors hover:bg-[#3a3835]"
            >
              Enviar via WhatsApp
              <MessageCircle className="h-4 w-4" />
            </button>

            <p className="text-center font-sans text-xs text-[#9c9690]">
              Ao enviar, você será redirecionado ao WhatsApp com sua mensagem preenchida.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
