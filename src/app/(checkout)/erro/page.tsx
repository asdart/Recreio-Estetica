import Link from "next/link";
import { Container } from "@/components/layout/container";
import { StatusState } from "@/components/commerce/status-state";
import { Button } from "@/components/ui/button";

export default function ErroPage() {
  return (
    <Container className="py-10 md:py-20">
      <StatusState
        type="error"
        title="Erro no Pedido"
        description="Não foi possível processar seu pedido. Tente novamente ou entre em contato com nosso suporte."
        action={
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/carrinho">Voltar ao Carrinho</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contato">Falar com Suporte</Link>
            </Button>
          </div>
        }
      />
    </Container>
  );
}
