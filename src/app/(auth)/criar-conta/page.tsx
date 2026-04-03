"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/use-auth";

export default function CriarContaPage() {
  const router = useRouter();
  const { setMockStatus } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMockStatus("not_submitted");
    router.push("/registro-profissional");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f5f4f0] px-4 py-16">
      {/* Close button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute right-4 top-4 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[rgba(43,41,39,0.08)] transition-colors hover:bg-[rgba(43,41,39,0.14)]"
        aria-label="Fechar"
      >
        <X className="h-[10px] w-[10px] text-[#2b2927]" strokeWidth={2.5} />
      </button>

      <div className="flex w-full max-w-[480px] flex-col">
        {/* Logo */}
        <span className="font-heading mb-4 text-center text-2xl leading-8 tracking-[-0.6px] text-[#2b2927]">
          recreio.estética
        </span>

        {/* Modal card */}
        <div className="w-full rounded-[32px] border border-[#e4dfd8] bg-[#faf9f7] p-12">
          <h1 className="!font-heading mb-0 text-center !text-[32px] !font-normal !leading-10 !tracking-[0.4px] text-black">
            Crie sua conta
          </h1>

          <form onSubmit={handleSubmit} className="mt-[35px] flex flex-col gap-4">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                {/* Nome completo */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fullName"
                    className="font-sans text-xs font-medium uppercase tracking-[1.32px] text-[#6a6662]"
                  >
                    Nome completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    className="h-[50px] w-full rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5 font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] outline-none transition-colors focus:border-[#2b2927]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-sans text-xs font-medium uppercase tracking-[1.32px] text-[#6a6662]"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="h-[50px] w-full rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5 font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] outline-none transition-colors focus:border-[#2b2927]"
                  />
                </div>

                {/* Senha */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="font-sans text-xs font-medium uppercase tracking-[1.32px] text-[#6a6662]"
                  >
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-[50px] w-full rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5 font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] outline-none transition-colors focus:border-[#2b2927]"
                  />
                </div>

                {/* Telefone */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="font-sans text-xs font-medium uppercase tracking-[1.32px] text-[#6a6662]"
                  >
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(21) 99999-9999"
                    required
                    className="h-[50px] w-full rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5 font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] outline-none transition-colors focus:border-[#2b2927]"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-full bg-[#2b2927] py-[14px] font-sans text-base tracking-[0.4px] text-[#f5f4f0] transition-opacity hover:opacity-90 active:opacity-80"
              >
                Criar conta
              </button>
            </div>

            {/* Login link */}
            <p className="mt-0 text-center font-sans text-base tracking-[0.4px]">
              <span className="text-[#6a6662]">Já possui conta? </span>
              <Link
                href="/login"
                className="font-medium text-[#2b2927] underline-offset-2 hover:underline"
              >
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
