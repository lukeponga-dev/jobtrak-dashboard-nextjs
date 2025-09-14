
"use client";
import { Award, Briefcase, ClipboardList, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobApplication } from "@/lib/types";

type StatsCardsProps = {
  applications: JobApplication[];
};

export function StatsCards({ applications }: StatsCardsProps) {
  const totalApplications = applications.length;
  const interviewingCount = applications.filter(
    (app) => app.status === "Interviewing"
  ).length;
  const offerCount = applications.filter((app) => app.status === "Offer").length;
  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: Briefcase,
    },
    {
      title: "Interviewing",
      value: interviewingCount,
      icon: ClipboardList,
      color: "text-yellow-400",
    },
    {
      title: "Offers",
      value: offerCount,
      icon: Award,
      color: "text-green-400",
    },
    {
      title: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
            <CardTitle className="text-xs font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
