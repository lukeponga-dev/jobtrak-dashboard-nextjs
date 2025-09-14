import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ApplicationStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={cn("capitalize", {
        "bg-blue-500/20 text-blue-300 border-blue-400/50": status === "Applied",
        "bg-yellow-500/20 text-yellow-300 border-yellow-400/50": status === "Interviewing",
        "bg-green-500/20 text-green-300 border-green-400/50": status === "Offer",
        "bg-red-500/20 text-red-300 border-red-400/50": status === "Rejected",
      })}
    >
      {status}
    </Badge>
  );
}
