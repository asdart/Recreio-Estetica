import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const events = [
  {
    id: "ev-1",
    title: "Workshop de Harmonização Facial Avançada",
    description:
      "Técnicas avançadas de aplicação de toxina botulínica e ácido hialurônico com demonstração prática em modelos.",
    date: "12 de Abril, 2026",
    time: "09:00 - 17:00",
    location: "Hotel Windsor — Barra da Tijuca, RJ",
    type: "Workshop",
    spots: 5,
  },
  {
    id: "ev-2",
    title: "Congresso de Bioestimuladores 2026",
    description:
      "Evento com palestrantes nacionais e internacionais sobre as novidades em bioestimuladores de colágeno e protocolos de tratamento.",
    date: "20-21 de Maio, 2026",
    time: "08:00 - 18:00",
    location: "Centro de Convenções SulAmérica — Centro, RJ",
    type: "Congresso",
    spots: 50,
  },
  {
    id: "ev-3",
    title: "Hands-on: Fios de PDO para Lifting Facial",
    description:
      "Treinamento prático e teórico sobre técnicas de lifting com fios de PDO espiculados e lisos.",
    date: "15 de Junho, 2026",
    time: "13:00 - 18:00",
    location: "Clínica Escola — Ipanema, RJ",
    type: "Hands-on",
    spots: 12,
  },
];

export default function EventosPage() {
  return (
    <Container className="py-10 md:py-16">
      <div className="mb-12 text-center">
        <h1>Eventos e Workshops</h1>
        <p className="mt-2 text-muted-foreground">
          Capacitação e atualização para profissionais da estética
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-lg border border-border/60 p-6 transition-all hover:border-foreground/20 hover:shadow-sm md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                  {event.spots <= 10 && (
                    <Badge className="text-xs bg-accent text-accent-foreground">
                      Últimas {event.spots} vagas
                    </Badge>
                  )}
                </div>
                <h3 className="!text-xl">{event.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {event.date} — {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="flex-shrink-0 mt-2 md:mt-0">
                Inscrever-se
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
