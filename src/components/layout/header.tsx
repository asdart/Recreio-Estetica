"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  Menu,
  LogOut,
  Package,
  MapPin,
  ChevronDown,
} from "lucide-react";

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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/use-auth";
import { useCartStore } from "@/features/cart/cart-store";
import { NAV_LINKS } from "@/lib/constants";
import { CartSidepanel } from "@/components/cart/cart-sidepanel";
import { MegaMenu } from "./mega-menu";
import { useHeaderTheme } from "@/hooks/use-header-theme";

const staticNavItems = [
  { label: "Eventos", href: "/eventos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

const themeStyles = {
  light: {
    pill: "bg-[rgba(253,252,251,0.08)]",
    text: "text-[#fdfcfb]",
    textHover: "hover:text-[#fdfcfb]/80",
    chevronBg: "bg-[rgba(253,252,251,0.08)]",
    actionBg: "bg-[rgba(253,252,251,0.06)] hover:bg-[rgba(253,252,251,0.20)]",
    badgeBg: "bg-[#fdfcfb] text-[#2b2927]",
    mobileBtn: "text-[#fdfcfb]/70 hover:text-[#fdfcfb] hover:bg-[rgba(253,252,251,0.12)]",
  },
  dark: {
    pill: "bg-[rgba(43,41,39,0.06)] shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
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

  const categoryLinks = NAV_LINKS.filter((l) => l.href.includes("category"));
  const t = themeStyles[headerTheme];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-2">
      <div
        className={`mx-auto flex max-w-[1360px] items-center justify-between rounded-full border-b border-transparent pl-8 pr-4 py-4 backdrop-blur-sm transition-all duration-500 ease-out ${t.pill}`}
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
              <Link
                href="/loja"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                Produtos
              </Link>
              <Link
                href="/loja"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                Categorias
              </Link>
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
          {/* Produtos with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 text-sm font-medium leading-5 tracking-[-0.2px] transition-colors duration-500 ${t.text} ${t.textHover}`}
            >
              Produtos
              <span
                className={`flex items-center rounded-full p-[2px] transition-colors duration-500 ${t.chevronBg}`}
              >
                <ChevronDown className="h-3 w-3" />
              </span>
            </button>
            {megaMenuOpen && <MegaMenu categories={categoryLinks} />}
          </div>

          {/* Categorias */}
          <div className="relative">
            <Link
              href="/loja"
              className={`flex items-center gap-1.5 text-sm font-medium leading-5 tracking-[-0.2px] transition-colors duration-500 ${t.text} ${t.textHover}`}
            >
              Categorias
              <span
                className={`flex items-center rounded-full p-[2px] transition-colors duration-500 ${t.chevronBg}`}
              >
                <ChevronDown className="h-3 w-3" />
              </span>
            </Link>
          </div>

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
                className={`inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 text-sm font-medium leading-5 tracking-[-0.2px] backdrop-blur-sm transition-all duration-500 ${t.text} ${t.actionBg}`}
              >
                <IconEntrar className="h-5 w-5 shrink-0" />
                <span>{customer?.firstName ?? "Conta"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">
                    {customer?.firstName} {customer?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {customer?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/minha-conta" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    Minha Conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/meus-pedidos" className="flex items-center w-full">
                    <Package className="mr-2 h-4 w-4" />
                    Meus Pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/enderecos" className="flex items-center w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Endereços
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={`inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 text-sm font-medium leading-5 tracking-[-0.2px] backdrop-blur-sm transition-all duration-500 ${t.text} ${t.actionBg}`}
            >
              <IconEntrar className="h-5 w-5 shrink-0" />
              <span>Entrar</span>
            </Link>
          )}

          {/* Cart pill */}
          <button
            onClick={openCart}
            aria-label="Abrir carrinho"
            className={`inline-flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 text-sm font-medium leading-5 tracking-[-0.2px] backdrop-blur-sm transition-all duration-500 ${t.text} ${t.actionBg}`}
          >
            <IconCarrinho className="h-5 w-5 shrink-0" />
            <span className="w-5 text-center">{itemCount}</span>
          </button>
        </div>
      </div>

      <CartSidepanel />
    </header>
  );
}
