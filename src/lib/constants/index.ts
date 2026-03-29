export const SITE_NAME = "Recreio Estética";
export const SITE_DESCRIPTION =
  "Distribuidora premium de produtos para harmonização facial e corporal.";

export const WHATSAPP_NUMBER = "5521999999999";
export const WHATSAPP_BASE_URL = "https://wa.me";

export const CURRENCY = "BRL";
export const LOCALE = "pt-BR";

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  processing: "Em preparo",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export const VALIDATION_STATUS_LABELS: Record<string, string> = {
  not_submitted: "Não enviado",
  pending: "Em análise",
  approved: "Aprovado",
  rejected: "Recusado",
};

export const NAV_LINKS = [
  { href: "/loja", label: "Loja" },
  { href: "/loja?category=toxina-botulinica", label: "Toxina Botulínica" },
  { href: "/loja?category=acido-hialuronico", label: "Ácido Hialurônico" },
  { href: "/loja?category=bioestimuladores", label: "Bioestimuladores" },
  { href: "/loja?category=fios-de-pdo", label: "Fios de PDO" },
  { href: "/loja?category=skincare-profissional", label: "Skincare" },
  { href: "/sobre", label: "Sobre" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contato", label: "Contato" },
];
