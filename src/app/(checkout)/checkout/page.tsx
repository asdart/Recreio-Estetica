"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { StatusState } from "@/components/commerce/status-state";
import { useAuth } from "@/features/auth/use-auth";
import { useCart } from "@/features/cart/use-cart";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { access } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  if (!access.isLoggedIn) {
    return (
      <Container className="py-10 md:py-20">
        <StatusState
          type="warning"
          title="Login Necessário"
          description="Você precisa estar logado para acessar o checkout."
          action={
            <Button asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  if (!access.canCheckout) {
    return (
      <Container className="py-10 md:py-20">
        <StatusState
          type="pending"
          title="Validação Pendente"
          description="Seu registro profissional precisa ser aprovado antes de realizar compras. Aguarde a análise ou entre em contato conosco."
          action={
            <Button variant="outline" asChild>
              <Link href="/aguardando-validacao">Ver Status</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-10 md:py-20">
        <StatusState
          type="warning"
          title="Carrinho Vazio"
          description="Adicione produtos ao carrinho antes de continuar."
          action={
            <Button asChild>
              <Link href="/loja">Ver Produtos</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  const handleFinalize = () => {
    clearCart();
    router.push("/sucesso");
  };

  return (
    <Container className="py-10 md:py-16">
      <h1 className="mb-8 !text-3xl">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping address */}
          <div className="space-y-4">
            <h3 className="!text-lg !font-sans font-semibold">
              Endereço de Entrega
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="street">Endereço</Label>
                <Input id="street" placeholder="Rua, Avenida..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" placeholder="123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" placeholder="Sala, Bloco..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" placeholder="Bairro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Cidade" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment */}
          <div className="space-y-4">
            <h3 className="!text-lg !font-sans font-semibold">Pagamento</h3>
            <div className="rounded-lg border border-border/60 p-4">
              <p className="text-sm text-muted-foreground">
                Integração de pagamento será configurada com MedusaJS. Por
                enquanto, o pedido será simulado.
              </p>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="rounded-lg border border-border/60 p-6">
            <h3 className="!text-lg !font-sans font-semibold mb-4">
              Resumo do Pedido
            </h3>
            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <Button
              size="lg"
              className="w-full mt-6"
              onClick={handleFinalize}
            >
              Finalizar Pedido
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
