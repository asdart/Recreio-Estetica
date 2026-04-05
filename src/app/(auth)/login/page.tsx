"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    setLeaving(true);
    setTimeout(() => router.push("/"), 400);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-[#f5f4f0] px-4 transition-opacity duration-400 ease-in-out"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      {/* Close button — fixed to the page, top-right corner */}
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
        {/* Title */}
        <h1 className="!font-heading mb-0 text-center !text-[32px] !font-normal !leading-10 !tracking-[0.4px] text-black">
          Entre com a sua conta
        </h1>

        <form onSubmit={handleSubmit} className="mt-[35px] flex flex-col gap-4">
          {/* Fields */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nome completo"
                  required
                  className="h-[50px] w-full rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5 font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] outline-none transition-colors focus:border-[#2b2927]"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="font-sans text-xs font-medium uppercase tracking-[1.32px] text-[#6a6662]"
                  >
                    Senha
                  </label>
                  <Link
                    href="/esqueceu-senha"
                    className="font-sans text-sm text-[#6a6662] underline-offset-2 hover:text-[#2b2927] hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-[50px] w-full rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5 pr-12 font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] outline-none transition-colors focus:border-[#2b2927]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bab1a8] transition-colors hover:text-[#6a6662]"
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#2b2927] py-[14px] font-sans text-base tracking-[0.4px] text-[#f5f4f0] transition-opacity hover:opacity-90 active:opacity-80"
            >
              Entrar
            </button>
          </div>

          {/* Register link */}
          <p className="mt-0 text-center font-sans text-base tracking-[0.4px]">
            <span className="text-[#6a6662]">Não possui conta? </span>
            <Link
              href="/criar-conta"
              className="font-medium text-[#2b2927] underline-offset-2 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}
