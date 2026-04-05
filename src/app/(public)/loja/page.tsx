import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/commerce/loading-state";
import { LojaContent } from "./loja-content";

export default function LojaPage() {
  return (
    <div data-header-theme="dark" className="min-h-screen bg-[#f9f9f8]">
      <Suspense fallback={
        <div className="mx-auto max-w-[1366px] px-6 pb-24 pt-[160px]">
          <ProductGridSkeleton />
        </div>
      }>
        <LojaContent />
      </Suspense>
    </div>
  );
}
