export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type TechnicalSpec = {
  label: string;
  value: string;
};

export type ProductFAQ = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  brandId: string;
  categoryId: string;
  images: ProductImage[];
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  specs: TechnicalSpec[];
  composition: string;
  usage: string;
  benefits: string[];
  volume: string;
  faq: ProductFAQ[];
  featured: boolean;
  tags: string[];
};
