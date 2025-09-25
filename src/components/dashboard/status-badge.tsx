
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
      className={cn("capitalize font-normal text-xs", {
        "bg-blue-500/10 text-blue-400 border-blue-500/20": status === "Applied",
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20": status === "Interviewing",
        "bg-green-500/10 text-green-400 border-green-500/20": status === "Offer",
        "bg-red-500/10 text-red-400 border-red-500/20": status === "Rejected",
      })}
    >
      {status}
    </Badge>
  );
}
