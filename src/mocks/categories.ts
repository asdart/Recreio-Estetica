import { Category } from "@/types";

const Q = "auto=format&fit=crop&w=900&q=85";
const U = (id: string) => `https://images.unsplash.com/photo-${id}?${Q}`;

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    slug: "toxina-botulinica",
    name: "Toxina Botulínica",
    description:
      "Toxinas de alta pureza para tratamentos de linhas de expressão e harmonização facial.",
    image: "/images/categories/toxina.svg",
    menuImage: U("1579684385127-1ef15d508118"),
    productCount: 9,
  },
  {
    id: "cat-2",
    slug: "acido-hialuronico",
    name: "Ácido Hialurônico",
    description:
      "Preenchedores em diversas densidades para volumização, contorno e hidratação profunda.",
    image: "/images/categories/acido-hialuronico.svg",
    menuImage: U("1570172619644-dfd03ed5d881"),
    productCount: 34,
  },
  {
    id: "cat-3",
    slug: "bioestimuladores",
    name: "Bioestimuladores",
    description:
      "Bioestimuladores de colágeno para rejuvenescimento e melhora da qualidade da pele.",
    image: "/images/categories/bioestimuladores.svg",
    menuImage: U("1540555700478-4be289fbecef"),
    productCount: 8,
  },
  {
    id: "cat-4",
    slug: "fios-de-pdo",
    name: "Fios de PDO",
    description:
      "Fios de polidioxanona para lifting e sustentação facial e corporal.",
    image: "/images/categories/fios-pdo.svg",
    menuImage: U("1559757148-5c350d0d3c56"),
    productCount: 18,
  },
  {
    id: "cat-5",
    slug: "skincare-profissional",
    name: "Skincare Profissional",
    description:
      "Dermocosméticos de uso profissional para protocolos clínicos avançados.",
    image: "/images/categories/skincare.svg",
    menuImage: U("1512290923902-8a9f81dc236c"),
    productCount: 8,
  },
  {
    id: "cat-6",
    slug: "microcanulas-acessorios",
    name: "Microcânulas e Acessórios",
    description:
      "Microcânulas, seringas e acessórios para procedimentos minimamente invasivos.",
    image: "/images/categories/acessorios.svg",
    menuImage: U("1556228578-0d85b1a4d571"),
    productCount: 18,
  },
];
