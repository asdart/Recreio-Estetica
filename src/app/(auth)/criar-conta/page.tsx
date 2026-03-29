"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuth } from "@/features/auth/use-auth";

export default function CriarContaPage() {
  const router = useRouter();
  const { setMockStatus } = useAuth();

  const handleRegister = () => {
    setMockStatus("not_submitted");
    router.push("/registro-profissional");
  };

  return (
    <Container className="py-10 md:py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="!text-3xl">Criar Conta</h1>
          <p className="mt-2 text-muted-foreground">
            Cadastre-se para acessar nossos produtos exclusivos para
            profissionais
          </p>
        </div>
        <AuthForm mode="register" onSubmit={handleRegister} />
      </div>
    </Container>
  );
}
