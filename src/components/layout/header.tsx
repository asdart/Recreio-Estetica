"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  ShoppingBag,
  Menu,
  LogOut,
  Package,
  MapPin,
  ChevronDown,
} from "lucide-react";
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
    actionBg: "bg-[rgba(253,252,251,0.24)] hover:bg-[rgba(253,252,251,0.32)]",
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
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`inline-flex items-center justify-center rounded-full backdrop-blur-sm p-1.5 transition-all duration-500 ${t.text} ${t.actionBg}`}
            >
              <User className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {access.isLoggedIn ? (
                <>
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
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/login" className="w-full">Entrar</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/criar-conta" className="w-full">Criar Conta</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Abrir carrinho"
            className={`relative inline-flex items-center justify-center rounded-full backdrop-blur-sm p-1.5 transition-all duration-500 ${t.text} ${t.actionBg}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[9px] font-semibold transition-colors duration-500 ${t.badgeBg}`}
              >
                {itemCount}
              </Badge>
            )}
          </button>
        </div>
      </div>

      <CartSidepanel />
    </header>
  );
}
