import Link from "next/link";
import { Container } from "@/components/layout/container";
import { StatusState } from "@/components/commerce/status-state";
import { Button } from "@/components/ui/button";

export default function SucessoPage() {
  return (
    <Container className="py-10 md:py-20">
      <StatusState
        type="success"
        title="Pedido Realizado!"
        description="Seu pedido foi recebido com sucesso. Você receberá um e-mail de confirmação com os detalhes e o código de rastreamento assim que o pedido for enviado."
        action={
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/meus-pedidos">Ver Meus Pedidos</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/loja">Continuar Comprando</Link>
            </Button>
          </div>
        }
      />
    </Container>
  );
}
