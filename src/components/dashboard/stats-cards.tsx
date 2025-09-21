
"use client";

import { Award, Briefcase, ClipboardList, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatsCardsProps = {
  applications: JobApplication[];
  activeFilter: ApplicationStatus | "All";
  onFilterChange: (filter: ApplicationStatus | "All") => void;
};

export function StatsCards({
  applications,
  activeFilter,
  onFilterChange,
}: StatsCardsProps) {
  const totalApplications = applications.length;
  const interviewingCount = applications.filter(
    (app) => app.status === "Interviewing"
  ).length;
  const offerCount = applications.filter((app) => app.status === "Offer").length;
  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;
  const appliedCount = totalApplications - interviewingCount - offerCount - rejectedCount;


  const stats: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    filter: ApplicationStatus | "All";
  }[] = [
    {
      title: "Total Applied",
      value: totalApplications,
      icon: Briefcase,
      color: "text-primary",
      filter: "All",
    },
     {
      title: "Applied",
      value: appliedCount,
      icon: ClipboardList,
      color: "text-blue-400",
      filter: "Applied",
    },
    {
      title: "Interviewing",
      value: interviewingCount,
      icon: ClipboardList,
      color: "text-yellow-400",
      filter: "Interviewing",
    },
    {
      title: "Offers Received",
      value: offerCount,
      icon: Award,
      color: "text-green-400",
      filter: "Offer",
    },
    {
      title: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      color: "text-red-400",
      filter: "Rejected",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 lg:px-6">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md hover:-translate-y-1",
            activeFilter === stat.filter
              ? "ring-2 ring-primary bg-primary/10"
              : "ring-0"
          )}
          onClick={() => onFilterChange(stat.filter)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon
              className={cn("h-4 w-4 text-muted-foreground", stat.color)}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
