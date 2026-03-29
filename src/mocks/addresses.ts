import { Address } from "@/types";

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Clínica",
    recipientName: "Ana Oliveira",
    street: "Avenida das Américas",
    number: "3500",
    complement: "Bloco 7, Sala 302",
    neighborhood: "Barra da Tijuca",
    city: "Rio de Janeiro",
    state: "RJ",
    zipCode: "22640-102",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Consultório",
    recipientName: "Ana Oliveira",
    street: "Rua Visconde de Pirajá",
    number: "595",
    complement: "Sala 1201",
    neighborhood: "Ipanema",
    city: "Rio de Janeiro",
    state: "RJ",
    zipCode: "22410-003",
    isDefault: false,
  },
];
