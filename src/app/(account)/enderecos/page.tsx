import { MapPin, Plus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AddressCard } from "@/components/account/address-card";
import { Button } from "@/components/ui/button";
import { mockAddresses } from "@/mocks";

export default function EnderecosPage() {
  return (
    <Container className="py-10 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="!text-3xl">Endereços</h1>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Novo Endereço
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mockAddresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </Container>
  );
}
