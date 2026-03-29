import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProductFAQ } from "@/types";

type FAQAccordionProps = {
  items: ProductFAQ[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  if (!items.length) return null;

  return (
    <div className="space-y-4">
      <h3>Perguntas Frequentes</h3>
      <Accordion className="w-full">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-sm font-medium text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
