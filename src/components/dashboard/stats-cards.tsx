
"use client";
import { Award, Briefcase, ClipboardList, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobApplication } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


type StatsCardsProps = {
  applications: JobApplication[];
};

export function StatsCards({ applications }: StatsCardsProps) {
  const totalApplications = applications.length;
  const interviewingCount = applications.filter(app => app.status === 'Interviewing').length;
  const offerCount = applications.filter(app => app.status === 'Offer').length;
  const rejectedCount = applications.filter(app => app.status === 'Rejected').length;

  const stats = [
    { title: "Total Applied", value: totalApplications, icon: Briefcase, color: "text-primary" },
    { title: "Interviewing", value: interviewingCount, icon: ClipboardList, color: "text-yellow-400" },
    { title: "Offers Received", value: offerCount, icon: Award, color: "text-green-400" },
    { title: "Rejected", value: rejectedCount, icon: XCircle, color: "text-red-400" },
  ];

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden px-4 lg:px-6">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {stats.map((stat, index) => (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-4 lg:px-0">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
