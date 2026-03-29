"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  LogOut,
  Package,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Container } from "./container";
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
import { MegaMenu } from "./mega-menu";

export function Header() {
  const { customer, access, logout } = useAuth();
  const itemCount = useCartStore((s) => s.itemCount());
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const categoryLinks = NAV_LINKS.filter((l) => l.href.includes("category"));
  const mainLinks = NAV_LINKS.filter((l) => !l.href.includes("category"));

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors lg:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-6">
              <SheetTitle className="font-heading text-xl mb-6">Menu</SheetTitle>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading text-xl tracking-tight lg:text-2xl">
              Recreio Estética
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                Produtos
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {megaMenuOpen && <MegaMenu categories={categoryLinks} />}
            </div>
            {mainLinks
              .filter((l) => l.href !== "/loja")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors">
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
            <Link
              href="/carrinho"
              className="relative inline-flex items-center justify-center rounded-lg h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground p-0 text-[10px] text-background">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
