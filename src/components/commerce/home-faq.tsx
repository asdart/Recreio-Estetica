"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

const faqs = [
  {
    question: "Como funcionam as entregas?",
    answer:
      "Enviamos para todo o Brasil. Você acompanha o rastreio e recebe atualizações por e-mail. Em regiões específicas, o prazo pode variar conforme a disponibilidade do transportador.",
  },
  {
    question: "Os produtos precisam de receita médica?",
    answer:
      "Sim. Todos os nossos produtos são de uso exclusivo por profissionais habilitados (CRM, CRO, CRBM ou equivalente). O cadastro e a validação profissional são obrigatórios para realizar compras.",
  },
  {
    question: "Posso cancelar ou trocar meu pedido?",
    answer:
      "Pedidos podem ser cancelados em até 24 horas após a confirmação. Para trocas por defeito de fabricação, entre em contato com nossa equipe em até 7 dias após o recebimento.",
  },
  {
    question: "Como faço para falar com o suporte?",
    answer:
      "Você pode falar com nossa equipe pelo WhatsApp ou pelo e-mail contato@recreioestetica.com.br. O atendimento acontece de segunda a sexta, das 9h às 18h.",
  },
  {
    question: "Os produtos possuem registro ANVISA?",
    answer:
      "Sim. Trabalhamos exclusivamente com produtos regularizados junto à ANVISA. Todos os registros estão disponíveis na página de cada produto.",
  },
];

export function HomeFaq() {
  return (
    <section data-header-theme="dark" className="bg-[#faf9f7] py-24">
      <div className="mx-auto flex max-w-[640px] flex-col gap-8 px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center">
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-[-1.8px] text-[#2b2927]">
            Perguntas Frequentes
          </h2>
          <p className="font-sans text-base leading-6 text-[#6a6662]">
            Encontre respostas rápidas sobre entregas, produtos e suporte.
          </p>
        </div>

        {/* Accordion */}
        <AccordionPrimitive.Root className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <AccordionPrimitive.Item
              key={i}
              value={`faq-${i}`}
              className="group rounded-3xl bg-[#f5f4f0] px-6 py-6"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-4 text-left">
                  <span className="flex-1 font-sans text-base font-medium leading-6 text-[#2b2927]">
                    {faq.question}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edeae5] transition-colors group-aria-expanded:bg-[#2b2927]">
                    <ChevronDown className="h-4 w-4 text-[#2b2927] group-aria-expanded:hidden" />
                    <ChevronUp className="hidden h-4 w-4 text-white group-aria-expanded:block" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Panel className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
                <p className="h-(--accordion-panel-height) pt-3 font-sans text-sm leading-5 text-[#6a6662] data-ending-style:h-0 data-starting-style:h-0">
                  {faq.answer}
                </p>
              </AccordionPrimitive.Panel>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
