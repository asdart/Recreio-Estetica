import Link from "next/link";
import { Container } from "@/components/layout/container";
import { StatusState } from "@/components/commerce/status-state";
import { Button } from "@/components/ui/button";

export default function AguardandoValidacaoPage() {
  return (
    <Container className="py-10 md:py-20">
      <StatusState
        type="pending"
        title="Validação em Análise"
        description="Seu registro profissional foi enviado e está sendo analisado pela nossa equipe. Você receberá uma notificação por e-mail quando o processo for concluído. O prazo é de até 48 horas úteis."
        action={
          <Button variant="outline" asChild>
            <Link href="/">Voltar para a Home</Link>
          </Button>
        }
      />
    </Container>
  );
}
