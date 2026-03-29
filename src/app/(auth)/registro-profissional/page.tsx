"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/features/auth/use-auth";

const professionalTypes = [
  { value: "medico", label: "Médico(a)" },
  { value: "dentista", label: "Dentista" },
  { value: "biomedico", label: "Biomédico(a)" },
  { value: "farmaceutico", label: "Farmacêutico(a)" },
  { value: "enfermeiro", label: "Enfermeiro(a)" },
  { value: "fisioterapeuta", label: "Fisioterapeuta" },
  { value: "esteticista", label: "Esteticista" },
];

export default function RegistroProfissionalPage() {
  const router = useRouter();
  const { setMockStatus } = useAuth();
  const [profType, setProfType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMockStatus("pending");
    router.push("/aguardando-validacao");
  };

  return (
    <Container className="py-10 md:py-20">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="!text-3xl">Registro Profissional</h1>
          <p className="mt-2 text-muted-foreground">
            Envie seu registro profissional para liberar o acesso à compra de
            produtos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Tipo de Profissional</Label>
            <Select value={profType} onValueChange={(v) => setProfType(v ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione sua profissão" />
              </SelectTrigger>
              <SelectContent>
                {professionalTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registration">Número do Registro</Label>
            <Input
              id="registration"
              placeholder="Ex: CRM-RJ 123456"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Documento do Registro</Label>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-foreground/30">
              <div className="text-center">
                <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Clique ou arraste o arquivo
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG ou PNG até 5MB
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Enviar para Validação
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            A análise do seu registro será realizada em até 48 horas úteis.
          </p>
        </form>
      </div>
    </Container>
  );
}
