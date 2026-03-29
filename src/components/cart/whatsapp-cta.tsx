import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WhatsAppCTAProps = {
  href: string;
  label?: string;
  variant?: "default" | "banner";
  className?: string;
};

export function WhatsAppCTA({
  href,
  label = "Fale com um consultor",
  variant = "default",
  className,
}: WhatsAppCTAProps) {
  if (variant === "banner") {
    return (
      <div
        className={cn(
          "rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 p-6 text-center",
          className
        )}
      >
        <MessageCircle className="mx-auto mb-3 h-8 w-8 text-[#25D366]" />
        <h4 className="!text-lg mb-1 !font-sans font-semibold">
          Precisa de ajuda?
        </h4>
        <p className="mb-4 text-sm text-muted-foreground">
          Nossa equipe de consultores pode ajudá-lo a escolher os melhores
          produtos para sua clínica.
        </p>
        <Button
          asChild
          className="bg-[#25D366] text-white hover:bg-[#20BD5A]"
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            {label}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="lg" className={cn("w-full", className)} asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
