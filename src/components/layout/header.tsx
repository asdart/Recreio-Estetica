"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
} from "lucide-react";

function IconMinhaConta({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 15.504 15.503" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7.75195 10.001C8.99455 10.001 10.002 8.9937 10.002 7.75101C10.002 6.50837 8.99455 5.50101 7.75195 5.50101C6.50931 5.50101 5.50195 6.50837 5.50195 7.75101C5.50195 8.9937 6.50931 10.001 7.75195 10.001Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.002 8.106V7.396C15.002 6.886 14.619 6.458 14.112 6.402L13.018 6.28L12.515 5.066L13.203 4.207C13.521 3.809 13.49 3.236 13.129 2.875L12.627 2.373C12.267 2.013 11.693 1.981 11.295 2.299L10.436 2.987L9.222 2.484L9.1 1.39C9.044 0.884 8.616 0.5 8.106 0.5H7.396C6.886 0.5 6.458 0.883 6.402 1.39L6.28 2.484L5.066 2.987L4.207 2.3C3.809 1.982 3.236 2.013 2.875 2.374L2.373 2.876C2.013 3.236 1.981 3.81 2.299 4.208L2.987 5.067L2.484 6.281L1.39 6.403C0.884 6.459 0.5 6.887 0.5 7.397V8.107C0.5 8.617 0.883 9.045 1.39 9.101L2.484 9.223L2.987 10.437L2.3 11.296C1.982 11.694 2.013 12.268 2.374 12.628L2.876 13.13C3.236 13.49 3.81 13.522 4.208 13.204L5.067 12.516L6.281 13.019L6.403 14.113C6.459 14.619 6.887 15.003 7.397 15.003H8.107C8.617 15.003 9.045 14.62 9.101 14.113L9.223 13.019L10.437 12.516L11.296 13.204C11.694 13.522 12.267 13.491 12.628 13.13L13.13 12.628C13.49 12.268 13.522 11.694 13.204 11.296L12.517 10.437L13.02 9.223L14.114 9.101C14.62 9.045 15.004 8.617 15.004 8.107L15.002 8.106Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconMeusPedidos({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 15 15.8415" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3.611 8.18V4.895L10.611 1.784" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.921 0.589L14.5 3.513L7.921 6.436C7.652 6.556 7.347 6.556 7.079 6.436L0.5 3.513L7.079 0.589C7.348 0.47 7.653 0.47 7.921 0.589Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M0.5 3.513V11.654C0.5 12.063 0.742 12.435 1.116 12.601L7.079 15.252C7.348 15.371 7.653 15.371 7.921 15.252L13.884 12.601C14.258 12.435 14.5 12.063 14.5 11.654V3.513" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 6.526V15.251" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconSair({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14.8889 14.8889" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M8.278 0.5H12.167C13.394 0.5 14.389 1.494 14.389 2.722V12.167C14.389 13.394 13.394 14.389 12.167 14.389H8.278" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.944 11.333L8.833 7.444L4.944 3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.833 7.444H0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconEntrar({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M10.8335 3.05556H14.7224C15.9502 3.05556 16.9446 4.05 16.9446 5.27778V14.7222C16.9446 15.95 15.9502 16.9444 14.7224 16.9444H10.8335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 13.8889L11.3889 10L7.5 6.11111" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.389 10H3.05566" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconCarrinho({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.1963 2.34488C11.5583 2.14376 12.0146 2.27394 12.2158 2.6359L14.502 6.75016H17.0605C17.4748 6.75016 17.8105 7.08594 17.8105 7.50016C17.8105 7.9143 17.4747 8.25016 17.0605 8.25016H16.5L15.9609 14.7287C15.8423 16.1546 14.6502 17.2501 13.2207 17.2502H6.40039C4.97093 17.2501 3.77876 16.1546 3.66016 14.7287L3.12109 8.25016H2.56055C2.14639 8.25016 1.81063 7.9143 1.81055 7.50016C1.81055 7.08594 2.14633 6.75016 2.56055 6.75016H5.11914L7.40527 2.6359C7.60648 2.27394 8.06277 2.14376 8.4248 2.34488C8.78672 2.54611 8.91694 3.00241 8.71582 3.36442L6.83496 6.75016H12.7861L10.9053 3.36442C10.7042 3.00241 10.8344 2.54611 11.1963 2.34488ZM4.625 8.25016L5.15527 14.6037C5.2093 15.251 5.75044 15.7501 6.40039 15.7502H13.2207C13.8708 15.7501 14.412 15.2513 14.4658 14.6037L14.9961 8.25016H4.625Z" fill="currentColor"/>
    </svg>
  );
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/use-auth";
import { useCartStore } from "@/features/cart/cart-store";
import { CartSidepanel } from "@/components/cart/cart-sidepanel";
import { ProductsMenu } from "./products-menu";
import { useHeaderTheme } from "@/hooks/use-header-theme";

const staticNavItems = [
  { label: "Eventos", href: "/eventos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

const themeStyles = {
  light: {
    header: "bg-transparent border-[rgba(253,252,251,0.12)]",
    text: "text-[#fdfcfb]",
    textHover: "hover:text-[#fdfcfb]/80",
    chevronBg: "bg-[rgba(253,252,251,0.12)]",
    actionBg: "bg-[rgba(253,252,251,0.08)] hover:bg-[rgba(253,252,251,0.16)]",
    badgeBg: "bg-[#fdfcfb] text-[#2b2927]",
    mobileBtn: "text-[#fdfcfb]/70 hover:text-[#fdfcfb] hover:bg-[rgba(253,252,251,0.12)]",
  },
  dark: {
    header: "bg-[#faf9f7] border-[#e4dfd8]",
    text: "text-[#2b2927]",
    textHover: "hover:text-[#2b2927]/70",
    chevronBg: "bg-[rgba(43,41,39,0.08)]",
    actionBg: "bg-[rgba(43,41,39,0.08)] hover:bg-[rgba(43,41,39,0.14)]",
    badgeBg: "bg-[#2b2927] text-[#fdfcfb]",
    mobileBtn: "text-[#2b2927]/70 hover:text-[#2b2927] hover:bg-[rgba(43,41,39,0.08)]",
  },
} as const;

export function Header() {
  const { customer, access, logout } = useAuth();
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const headerTheme = useHeaderTheme();
  const pathname = usePathname();

  const t = themeStyles[headerTheme];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm transition-all duration-500 ease-out ${t.header}`}
    >
      <div
        className="mx-auto flex max-w-[1360px] items-center justify-between pl-8 pr-4 py-5"
      >
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            className={`inline-flex items-center justify-center rounded-full h-8 w-8 transition-colors lg:hidden ${t.mobileBtn}`}
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-6">
            <SheetTitle className="font-heading text-xl mb-6">Menu</SheetTitle>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setMegaMenuOpen(true)}
                className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                Produtos
              </button>
              {staticNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 w-[128px]">
          <span
            className={`font-heading text-2xl leading-8 tracking-[-0.6px] whitespace-nowrap transition-colors duration-500 ${t.text}`}
          >
            recreio.estética
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:justify-center lg:gap-6 flex-1">
          {/* Produtos — opens fullscreen menu */}
          <button
            onClick={() => setMegaMenuOpen(true)}
            className={`flex items-center gap-1.5 text-sm font-medium leading-5 tracking-[-0.2px] transition-colors duration-500 ${t.text} ${t.textHover}`}
          >
            Produtos
            <span
              className={`flex items-center rounded-full p-[2px] transition-colors duration-500 ${t.chevronBg}`}
            >
              <ChevronDown className="h-3 w-3" />
            </span>
          </button>

          {/* Static links */}
          {staticNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium leading-5 tracking-[-0.2px] transition-colors duration-500 ${t.text} ${t.textHover}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 w-[128px] justify-end">
          {/* User pill — link to login when logged out, dropdown when logged in */}
          {access.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-[6px] text-sm font-medium leading-5 tracking-[-0.2px] transition-all duration-500 ${t.text} ${t.actionBg}`}
              >
                <IconEntrar className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">Olá, {customer?.firstName ?? "Conta"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-max min-w-[200px] rounded-[32px] border border-[rgba(255,255,255,0.16)] bg-[rgba(253,252,251,0.16)] p-0 px-2 pt-4 pb-2 backdrop-blur-[10px] shadow-none"
              >
                {/* User info */}
                <div className="px-2">
                  <div className="flex flex-col border-b border-[rgba(253,252,251,0.08)] pb-5 pt-2">
                    <span className="font-sans text-sm font-semibold leading-5 text-[#fdfcfb]">
                      {customer?.firstName} {customer?.lastName}
                    </span>
                    <span className="font-sans text-sm font-normal leading-5 text-[#fdfcfb]">
                      {customer?.email}
                    </span>
                  </div>
                </div>

                {/* Menu items + Logout */}
                <div className="flex flex-col pt-2 pb-0">
                  <Link
                    href="/minha-conta"
                    className="flex items-center justify-between gap-2 rounded-[24px] px-3 py-[10px] text-[#fdfcfb] transition-colors hover:bg-[rgba(253,252,251,0.08)]"
                  >
                    <span className="font-sans text-sm font-medium leading-5">Minha conta</span>
                    <IconMinhaConta className="h-[15px] w-[15px] shrink-0" />
                  </Link>
                  <Link
                    href="/meus-pedidos"
                    className="flex items-center justify-between gap-2 rounded-[24px] px-3 py-[10px] text-[#fdfcfb] transition-colors hover:bg-[rgba(253,252,251,0.08)]"
                  >
                    <span className="font-sans text-sm font-medium leading-5">Meus pedidos</span>
                    <IconMeusPedidos className="h-[15px] w-[15px] shrink-0" />
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center justify-between gap-2 rounded-[24px] px-3 py-[10px] text-[#fdfcfb] transition-colors hover:bg-[rgba(253,252,251,0.08)]"
                  >
                    <span className="font-sans text-sm font-medium leading-5">Sair</span>
                    <IconSair className="h-[15px] w-[15px] shrink-0" />
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={`/login?redirect=${encodeURIComponent(pathname)}`}
              className={`inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-[6px] text-sm font-medium leading-5 tracking-[-0.2px] transition-all duration-500 ${t.text} ${t.actionBg}`}
            >
              <IconEntrar className="h-5 w-5 shrink-0" />
              <span>Entrar</span>
            </Link>
          )}

          {/* Cart pill */}
          <button
            onClick={openCart}
            aria-label="Abrir carrinho"
            className={`inline-flex items-center gap-1 rounded-full px-2 py-[6px] text-sm font-medium leading-5 tracking-[-0.2px] transition-all duration-500 ${t.text} ${t.actionBg}`}
          >
            <IconCarrinho className="h-5 w-5 shrink-0" />
            <span className="w-5 text-center">{itemCount}</span>
          </button>
        </div>
      </div>

      <CartSidepanel />
      <ProductsMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
    </header>
  );
}
