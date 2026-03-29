import Link from "next/link";
import { Container } from "@/components/layout/container";
import { StatusState } from "@/components/commerce/status-state";
import { Button } from "@/components/ui/button";

export default function ContaAprovadaPage() {
  return (
    <Container className="py-10 md:py-20">
      <StatusState
        type="success"
        title="Conta Aprovada!"
        description="Parabéns! Seu registro profissional foi validado com sucesso. Agora você pode visualizar preços e realizar compras em nossa plataforma."
        action={
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/loja">Explorar Produtos</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/minha-conta">Minha Conta</Link>
            </Button>
          </div>
        }
      />
    </Container>
  );
}
