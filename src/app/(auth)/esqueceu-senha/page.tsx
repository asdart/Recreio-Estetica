"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

export default function EsqueceuSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f5f4f0] px-4">
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
          {!submitted ? (
            <>
              <h1 className="!font-heading mb-0 text-center !text-[32px] !font-normal !leading-10 !tracking-[0.4px] text-black">
                Esqueceu a senha?
              </h1>
              <p className="mt-3 text-center font-sans text-sm leading-relaxed text-[#6a6662]">
                Informe seu e-mail e enviaremos um link para você redefinir sua senha.
              </p>

              <form onSubmit={handleSubmit} className="mt-[35px] flex flex-col gap-10">
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
                    placeholder="seu@email.com"
                    required
                    className="h-[50px] w-full rounded-2xl border border-[#e4dfd8] bg-[#fdfcfb] px-5 font-sans text-sm text-[#2b2927] placeholder:text-[#bab1a8] outline-none transition-colors focus:border-[#2b2927]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#2b2927] py-[14px] font-sans text-base tracking-[0.4px] text-[#f5f4f0] transition-opacity hover:opacity-90 active:opacity-80"
                >
                  Enviar link
                </button>
              </form>

              <p className="mt-4 text-center font-sans text-base tracking-[0.4px]">
                <Link
                  href="/login"
                  className="font-medium text-[#2b2927] underline-offset-2 hover:underline"
                >
                  Voltar ao login
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="!font-heading mb-0 text-center !text-[32px] !font-normal !leading-10 !tracking-[0.4px] text-black">
                E-mail enviado
              </h1>
              <p className="mt-3 text-center font-sans text-sm leading-relaxed text-[#6a6662]">
                Se o e-mail <span className="font-medium text-[#2b2927]">{email}</span> estiver
                cadastrado, você receberá um link para redefinir sua senha em breve.
              </p>

              <div className="mt-[35px]">
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center rounded-full bg-[#2b2927] py-[14px] font-sans text-base tracking-[0.4px] text-[#f5f4f0] transition-opacity hover:opacity-90 active:opacity-80"
                >
                  Voltar ao login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
