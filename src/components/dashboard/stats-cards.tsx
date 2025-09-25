
"use client";

import { Award, Briefcase, ClipboardList, XCircle, FileText } from "lucide-react";
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
<<<<<<< HEAD
  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;
=======
  const appliedCount = applications.filter((app) => app.status === "Applied").length;
>>>>>>> main


  const stats: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    filter: ApplicationStatus | "All";
  }[] = [
    {
      title: "Total Apps",
      value: totalApplications,
      icon: Briefcase,
      color: "text-primary",
      filter: "All",
    },
     {
      title: "Applied",
      value: appliedCount,
<<<<<<< HEAD
      icon: ClipboardList,
      color: "text-blue-500",
=======
      icon: FileText,
      color: "text-blue-400",
>>>>>>> main
      filter: "Applied",
    },
    {
      title: "Interviewing",
      value: interviewingCount,
      icon: ClipboardList,
      color: "text-yellow-500",
      filter: "Interviewing",
    },
    {
      title: "Offers",
      value: offerCount,
      icon: Award,
      color: "text-green-500",
      filter: "Offer",
    },
    {
      title: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      color: "text-red-500",
      filter: "Rejected",
    },
  ];

  return (
<<<<<<< HEAD
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 lg:px-6">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={cn(
            "cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1",
            activeFilter === stat.filter
              ? "ring-2 ring-primary bg-card"
              : "ring-0"
=======
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className={cn(
            "cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1",
            "animate-fade-in-up",
            activeFilter === stat.filter
              ? "ring-2 ring-primary bg-primary/10"
              : "ring-0 hover:bg-card/60"
>>>>>>> main
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
