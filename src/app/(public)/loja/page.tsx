import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/commerce/loading-state";
import { Container } from "@/components/layout/container";
import { LojaContent } from "./loja-content";

export default function LojaPage() {
  return (
    <Container className="py-10 md:py-16">
      <Suspense fallback={<ProductGridSkeleton />}>
        <LojaContent />
      </Suspense>
    </Container>
  );
}
