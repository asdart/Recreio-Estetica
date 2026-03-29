import type { TechnicalSpec } from "@/types";

type TechnicalSpecsProps = {
  specs: TechnicalSpec[];
};

export function TechnicalSpecs({ specs }: TechnicalSpecsProps) {
  if (!specs.length) return null;

  return (
    <div className="space-y-4">
      <h3>Informações Técnicas</h3>
      <div className="overflow-hidden rounded-lg border border-border/60">
        <table className="w-full text-sm">
          <tbody>
            {specs.map((spec, i) => (
              <tr
                key={spec.label}
                className={i % 2 === 0 ? "bg-secondary/30" : "bg-background"}
              >
                <td className="px-4 py-3 font-medium text-foreground/80 w-1/3">
                  {spec.label}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
