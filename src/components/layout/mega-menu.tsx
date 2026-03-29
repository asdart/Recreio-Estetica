import Link from "next/link";

type MegaMenuProps = {
  categories: { href: string; label: string }[];
};

export function MegaMenu({ categories }: MegaMenuProps) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[480px] -translate-x-1/2 rounded-lg border border-border/60 bg-background p-6 shadow-lg">
      <div className="mb-3">
        <Link
          href="/loja"
          className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Ver todos os produtos
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="rounded-md px-3 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            {cat.label}
          </Link>
        ))}
      </div>
      <div className="mt-4 border-t border-border/60 pt-4">
        <p className="text-xs text-muted-foreground">
          Produtos exclusivos para profissionais com registro ativo.
        </p>
      </div>
    </div>
  );
}
