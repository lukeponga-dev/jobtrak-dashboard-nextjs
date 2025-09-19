// src/components/dashboard/status-badge.tsx
import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// Define the props for the StatusBadge component
type StatusBadgeProps = {
  status: ApplicationStatus; // The status of the job application
};

/**
 * Renders a styled badge component based on the application status.
 * The badge's appearance (background, text, and border color) changes
 * dynamically depending on the provided status.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={cn("capitalize", {
        // Styling for "Applied" status
        "bg-blue-500/20 text-blue-300 border-blue-400/50": status === "Applied",
        // Styling for "Interviewing" status
        "bg-yellow-500/20 text-yellow-300 border-yellow-400/50": status === "Interviewing",
        // Styling for "Offer" status
        "bg-green-500/20 text-green-300 border-green-400/50": status === "Offer",
        // Styling for "Rejected" status
        "bg-red-500/20 text-red-300 border-red-400/50": status === "Rejected",
      })}
    >
      {status}
    </Badge>
  );
}
