"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  User,
  MapPin,
  Wallet,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/use-auth";

const NAV_ITEMS = [
  { href: "/minha-conta", icon: Package, label: "Pedidos" },
  { href: "/meus-dados", icon: User, label: "Dados pessoais" },
  { href: "/enderecos", icon: MapPin, label: "Endereços" },
  { href: "/recompras", icon: Wallet, label: "Carteira" },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { customer, logout } = useAuth();

  const initials = customer
    ? `${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}`
    : "?";

  return (
    <aside className="w-full shrink-0 lg:w-[280px]">
      <div className="rounded-[32px] border border-[#e4dfd8] bg-[#faf9f7] p-6">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-[#e4dfd8] px-4 py-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d3cbc1]">
            <span className="font-heading text-xl text-[#6a6662]">
              {initials}
            </span>
          </div>
          <div className="text-center">
            <p className="font-sans text-sm font-medium text-[#2b2927]">
              {customer ? `${customer.firstName} ${customer.lastName}` : "—"}
            </p>
            <p className="font-sans text-[11px] text-[#6a6662]">
              {customer?.email ?? ""}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-[14px] px-4 font-sans text-[13px] transition-colors",
                  isActive
                    ? "bg-[#2b2927] font-medium text-[#f5f4f0]"
                    : "font-normal text-[#6a6662] hover:bg-[rgba(43,41,39,0.04)]"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {label}
              </Link>
            );
          })}

          {/* Separator + Logout */}
          <div className="mt-4 border-t border-[#e4dfd8] pt-4">
            <button
              onClick={logout}
              className="flex h-11 w-full items-center gap-3 rounded-[14px] px-4 font-sans text-[13px] text-[#6a6662] transition-colors hover:bg-[rgba(43,41,39,0.04)]"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Sair
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
