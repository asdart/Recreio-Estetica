import Link from "next/link";
import { Container } from "@/components/layout/container";
import { StatusState } from "@/components/commerce/status-state";
import { Button } from "@/components/ui/button";

export default function ContaRecusadaPage() {
  return (
    <Container className="py-10 md:py-20">
      <StatusState
        type="error"
        title="Registro Recusado"
        description="Infelizmente não conseguimos validar seu registro profissional. Verifique se o documento enviado está correto e legível, e tente novamente. Se precisar de ajuda, entre em contato conosco."
        action={
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/registro-profissional">Enviar Novamente</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contato">Falar Conosco</Link>
            </Button>
          </div>
        }
      />
    </Container>
  );
}
