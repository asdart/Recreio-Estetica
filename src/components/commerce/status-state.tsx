import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";

type StatusType = "success" | "pending" | "error" | "warning";

type StatusStateProps = {
  type: StatusType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

const iconMap: Record<StatusType, React.ReactNode> = {
  success: <CheckCircle className="h-12 w-12 text-teal" />,
  pending: <Clock className="h-12 w-12 text-gold" />,
  error: <XCircle className="h-12 w-12 text-destructive" />,
  warning: <AlertTriangle className="h-12 w-12 text-gold" />,
};

export function StatusState({
  type,
  title,
  description,
  action,
  className,
}: StatusStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div className="mb-6">{iconMap[type]}</div>
      <h2 className="!text-2xl mb-2">{title}</h2>
      {description && (
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
