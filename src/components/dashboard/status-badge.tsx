import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ApplicationStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("capitalize", {
        "bg-primary/10 text-primary-foreground border-primary/40": status === "Applied",
        "bg-yellow-400/10 text-yellow-300 border-yellow-400/40": status === "Interviewing",
        "bg-accent/10 text-accent-foreground border-accent/40": status === "Offer",
        "bg-destructive/10 text-destructive-foreground border-destructive/40": status === "Rejected",
      })}
    >
      {status}
    </Badge>
  );
}
