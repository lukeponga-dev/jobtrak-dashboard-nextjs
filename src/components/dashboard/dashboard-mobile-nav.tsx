
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, Briefcase, BarChart } from "lucide-react";
import { AddApplicationDialog } from "./add-application-dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { JobApplication } from "@/lib/types";
import { addApplication } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";


export function DashboardMobileNav() {
  const pathname = usePathname();
  const { toast } = useToast();
   const [applications, setApplications] = useState<JobApplication[]>([]);

  const handleAddApplication = async (newApplication: Omit<JobApplication, 'id'>) => {
    const result = await addApplication(newApplication);

    if (result.success && result.data) {
      setApplications((prev) => [result.data!, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      toast({
        title: "Application Added",
        description: `${newApplication.company} - ${newApplication.role} has been added to your tracker.`,
      });
    } else {
       toast({
        title: "Error adding application",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const links = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/dashboard/analytics", icon: BarChart, label: "Analytics" },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className="grid h-full grid-cols-4 font-medium">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
              pathname === href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
         <AddApplicationDialog onApplicationAdd={handleAddApplication}>
            <div className={cn(
              "inline-flex flex-col items-center justify-center px-5 hover:bg-muted text-muted-foreground"
            )}>
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">Add New</span>
            </div>
          </AddApplicationDialog>
      </div>
    </div>
  );
}
