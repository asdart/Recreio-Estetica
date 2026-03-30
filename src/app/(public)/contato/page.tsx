import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";

export default function ContatoPage() {
  return (
    <Container data-header-theme="dark" className="py-10 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1>Contato</h1>
          <p className="mt-2 text-muted-foreground">
            Entre em contato com nossa equipe
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Endereço</p>
                <p className="text-sm text-muted-foreground">
                  Av. das Américas, 3500 — Barra da Tijuca
                  <br />
                  Rio de Janeiro, RJ — 22640-102
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Telefone</p>
                <p className="text-sm text-muted-foreground">(21) 3333-4444</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 flex-shrink-0 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">E-mail</p>
                <p className="text-sm text-muted-foreground">
                  contato@recreioestetica.com.br
                </p>
              </div>
            </div>

            <Button
              className="mt-4 bg-[#25D366] text-white hover:bg-[#20BD5A]"
              asChild
            >
              <a
                href={`${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar via WhatsApp
              </a>
            </Button>
          </div>

          {/* Contact form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input id="subject" placeholder="Como podemos ajudar?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <textarea
                id="message"
                rows={5}
                placeholder="Escreva sua mensagem..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
