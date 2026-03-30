"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/use-auth";
import { VALIDATION_STATUS_LABELS } from "@/lib/constants";

export default function MeusDadosPage() {
  const { customer } = useAuth();

  return (
    <Container data-header-theme="dark" className="py-10 md:py-16">
      <h1 className="mb-8 !text-3xl">Meus Dados</h1>

      <div className="mx-auto max-w-lg space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input defaultValue={customer?.firstName ?? ""} />
          </div>
          <div className="space-y-2">
            <Label>Sobrenome</Label>
            <Input defaultValue={customer?.lastName ?? ""} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input defaultValue={customer?.email ?? ""} type="email" />
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input defaultValue={customer?.phone ?? ""} type="tel" />
        </div>
        <div className="space-y-2">
          <Label>Registro Profissional</Label>
          <div className="flex items-center gap-3">
            <Input
              defaultValue={customer?.registrationNumber ?? ""}
              readOnly
              className="flex-1"
            />
            {customer && (
              <Badge variant="outline">
                {VALIDATION_STATUS_LABELS[customer.validationStatus]}
              </Badge>
            )}
          </div>
        </div>
        <Button size="lg" className="w-full">
          Salvar Alterações
        </Button>
      </div>
    </Container>
  );
}
