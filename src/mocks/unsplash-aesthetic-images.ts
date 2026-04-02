import type { ProductImage } from "@/types";

/**
 * Fotos do Unsplash (medicina estética, dermatologia, clínica, skincare profissional).
 * URLs verificadas (images.unsplash.com). @see https://unsplash.com/license
 */
const Q = "auto=format&fit=crop&w=1600&q=85";

/** Pool rotativo — cada produto recebe sequências distintas via hash do id */
const POOL: { id: string; alt: string }[] = [
  { id: "1570172619644-dfd03ed5d881", alt: "Cuidados com a pele em ambiente profissional" },
  { id: "1579684385127-1ef15d508118", alt: "Consulta e avaliação em clínica de estética" },
  { id: "1556228578-0d85b1a4d571", alt: "Produtos dermatológicos e frascos profissionais" },
  { id: "1516975080664-ed2fc6a32937", alt: "Ambiente de spa e tratamentos faciais" },
  { id: "1559757148-5c350d0d3c56", alt: "Medicina e protocolos clínicos" },
  { id: "1512290923902-8a9f81dc236c", alt: "Cosméticos e linha profissional" },
  { id: "1576091160399-112ba8d25d1d", alt: "Equipe de saúde em ambiente clínico" },
  { id: "1556228720-195a672e8a03", alt: "Produtos de dermocosmética" },
  { id: "1582719478250-c89cae4dc85b", alt: "Ambiente clínico moderno" },
  { id: "1498837167922-ddd27525d352", alt: "Bem-estar e autocuidado com a pele" },
  { id: "1540555700478-4be289fbecef", alt: "Spa e tratamentos de rejuvenescimento" },
  { id: "1506126613408-eca07ce68773", alt: "Harmonização e equilíbrio estético" },
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Gera 1–3 imagens Unsplash por produto (estável para o mesmo `productId`). */
export function buildUnsplashProductImages(
  productId: string,
  count: 1 | 2 | 3
): ProductImage[] {
  const start = hashString(productId) % POOL.length;
  const out: ProductImage[] = [];
  for (let i = 0; i < count; i++) {
    const p = POOL[(start + i) % POOL.length];
    out.push({
      id: `us-${productId}-${i}`,
      url: `https://images.unsplash.com/photo-${p.id}?${Q}`,
      alt: p.alt,
    });
  }
  return out;
}
