"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import { useCartStore } from "@/features/cart/cart-store";
import { useAuth } from "@/features/auth/use-auth";
import { CartItem } from "./cart-item";
import { formatCurrency } from "@/lib/utils/format-currency";
import {
  buildWhatsAppCartMessage,
  getWhatsAppUrl,
} from "@/features/whatsapp/whatsapp-utils";

export function CartSidepanel() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const subtotalFn = useCartStore((s) => s.subtotal);
  const itemCountFn = useCartStore((s) => s.itemCount);
  const subtotal = subtotalFn();
  const itemCount = itemCountFn();
  const { access } = useAuth();
  const whatsappUrl = getWhatsAppUrl(buildWhatsAppCartMessage(items));

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-[500ms] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho"
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-[600px] flex-col bg-white shadow-2xl transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0ede9] px-7 py-5">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl tracking-tight text-[#1a1917]">
              Cart
            </span>
            <span className="font-sans text-sm text-[#9c9690]">
              ({itemCount})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#9c9690] transition-colors hover:bg-[#f5f3f0] hover:text-[#1a1917]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-7 py-12 text-center">
              {/* Icon */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f5f3f0]">
                <ShoppingBag className="h-9 w-9 text-[#c8c4be]" />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-heading text-2xl italic text-[#1a1917]">
                  Carrinho vazio
                </p>
                <p className="font-sans text-sm leading-6 text-[#9c9690] max-w-[240px]">
                  Adicione produtos à sua seleção e eles aparecerão aqui.
                </p>
              </div>

              <Link
                href="/loja"
                onClick={closeCart}
                className="group inline-flex items-center justify-between gap-4 rounded-full border border-[#d6d2cc] py-3 pl-6 pr-3 font-sans text-[11px] uppercase tracking-[2px] text-[#1a1917] transition-colors hover:border-[#1a1917]"
              >
                Ver produtos
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1917] text-white transition-transform group-hover:scale-110">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-7 py-2">
                <div className="divide-y divide-[#f0ede9]">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Footer summary */}
              <div className="border-t border-[#f0ede9] px-7 py-6 space-y-5">
                {/* Subtotal row */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9c9690] font-sans">Subtotal</span>
                  <span className="font-sans font-semibold text-[#1a1917]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <p className="font-sans text-xs text-[#b0ada9]">
                  Frete e impostos calculados no checkout.
                </p>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  {!access.isLoggedIn ? (
                    <Link
                      href="/login"
                      onClick={closeCart}
                      className="flex w-full items-center justify-center rounded-full bg-[#1a1917] py-4 font-sans text-[11px] uppercase tracking-[2px] text-white transition-colors hover:bg-[#3a3835]"
                    >
                      Entrar para finalizar
                    </Link>
                  ) : access.canCheckout ? (
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1917] py-4 font-sans text-[11px] uppercase tracking-[2px] text-white transition-colors hover:bg-[#3a3835]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Finalizar Pedido
                    </Link>
                  ) : (
                    <span className="flex w-full items-center justify-center rounded-full bg-[#f0ede9] py-4 font-sans text-[11px] uppercase tracking-[2px] text-[#9c9690]">
                      Aguardando validação profissional
                    </span>
                  )}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d6d2cc] py-4 font-sans text-[11px] uppercase tracking-[2px] text-[#1a1917] transition-colors hover:border-[#1a1917]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Enviar via WhatsApp
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
