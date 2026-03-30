"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuth } from "@/features/auth/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (data: Record<string, string>) => {
    login(data.email, data.password);
    router.push("/");
  };

  return (
    <Container data-header-theme="dark" className="py-10 md:py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="!text-3xl">Entrar</h1>
          <p className="mt-2 text-muted-foreground">
            Acesse sua conta para comprar e gerenciar pedidos
          </p>
        </div>
        <AuthForm mode="login" onSubmit={handleLogin} />
      </div>
    </Container>
  );
}
