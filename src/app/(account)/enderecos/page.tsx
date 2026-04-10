"use client";

import { MapPin, Plus } from "lucide-react";
import { AddressCard } from "@/components/account/address-card";
import { mockAddresses } from "@/mocks";

export default function EnderecosPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(43,41,39,0.08)]">
            <MapPin className="h-5 w-5 text-[#2b2927]" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-[32px] leading-10 tracking-[0.3px] text-[#2b2927]">
            Endereços
          </h2>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f4f0] px-4 py-2 font-sans text-sm text-[#2b2927] transition-colors hover:bg-[#edeae5]">
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Novo Endereço
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mockAddresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
}
