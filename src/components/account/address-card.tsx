import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Address } from "@/types";

type AddressCardProps = {
  address: Address;
};

export function AddressCard({ address }: AddressCardProps) {
  return (
    <div className="rounded-lg border border-border/60 p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{address.label}</span>
        </div>
        {address.isDefault && (
          <Badge variant="secondary" className="text-xs">
            Padrão
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {address.street}, {address.number}
        {address.complement && ` - ${address.complement}`}
      </p>
      <p className="text-sm text-muted-foreground">
        {address.neighborhood} — {address.city}/{address.state}
      </p>
      <p className="text-sm text-muted-foreground">CEP: {address.zipCode}</p>
    </div>
  );
}
