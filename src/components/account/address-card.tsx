import { MapPin } from "lucide-react";
import type { Address } from "@/types";

type AddressCardProps = {
  address: Address;
};

export function AddressCard({ address }: AddressCardProps) {
  return (
    <div className="rounded-3xl border border-[#e4dfd8] bg-[#faf9f7] p-6">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#6a6662]" strokeWidth={1.5} />
          <span className="font-sans text-sm font-medium text-[#2b2927]">
            {address.label}
          </span>
        </div>
        {address.isDefault && (
          <span className="inline-flex rounded-full bg-[#ecfdf5] px-2.5 py-0.5 font-sans text-[11px] font-medium text-[#007a55]">
            Padrão
          </span>
        )}
      </div>
      <p className="font-sans text-sm leading-6 text-[#6a6662]">
        {address.street}, {address.number}
        {address.complement && ` — ${address.complement}`}
      </p>
      <p className="font-sans text-sm text-[#6a6662]">
        {address.neighborhood} — {address.city}/{address.state}
      </p>
      <p className="font-sans text-sm text-[#6a6662]">CEP: {address.zipCode}</p>
    </div>
  );
}
