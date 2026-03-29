"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: (data: Record<string, string>) => void;
  className?: string;
};

export function AuthForm({ mode, onSubmit, className }: AuthFormProps) {
  const [form, setForm] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {mode === "register" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input
              id="firstName"
              placeholder="Seu nome"
              onChange={(e) => update("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              id="lastName"
              placeholder="Seu sobrenome"
              onChange={(e) => update("lastName", e.target.value)}
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          onChange={(e) => update("email", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          onChange={(e) => update("password", e.target.value)}
          required
        />
      </div>

      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(21) 99999-9999"
            onChange={(e) => update("phone", e.target.value)}
            required
          />
        </div>
      )}

      <Button type="submit" size="lg" className="w-full">
        {mode === "login" ? "Entrar" : "Criar Conta"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            Não tem conta?{" "}
            <Link href="/criar-conta" className="font-medium text-foreground underline-offset-4 hover:underline">
              Criar conta
            </Link>
          </>
        ) : (
          <>
            Já tem conta?{" "}
            <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Entrar
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
