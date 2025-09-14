"use client";

import { useState } from "react";
import { Download, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ApplicationsTable } from "./applications-table";
import { AddApplicationDialog } from "./add-application-dialog";
import { StatsCards } from "./stats-cards";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { addApplication, updateApplicationStatus, deleteApplication } from "@/lib/actions";


type DashboardClientProps = {
  initialApplications: JobApplication[];
};

export function DashboardClient({ initialApplications }: DashboardClientProps) {
  const [applications, setApplications] = useState<JobApplication[]>(
    initialApplications
  );
  const { toast } = useToast();

  const handleAddApplication = async (newApplication: Omit<JobApplication, 'id'>) => {
    const result = await addApplication(newApplication);

    if (result.success && result.data) {
      setApplications((prev) => [result.data!, ...prev]);
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

  const handleUpdateStatus = async (id: number, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    await updateApplicationStatus({id, status});
    toast({
      title: "Status Updated",
      description: `The status has been updated to "${status}".`,
    });
  };

  const handleDeleteApplication = async (id: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    await deleteApplication(id);
    toast({
      title: "Application Deleted",
      description: "The application has been removed from your tracker.",
      variant: "destructive",
    });
  };

  const handleExport = () => {
    const headers = ["Company", "Role", "Date Applied", "Status"];
    const rows = applications.map((app) => [
      app.company,
      app.role,
      new Date(app.date).toLocaleDateString(),
      app.status,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\r\n";
    rows.forEach((rowArray) => {
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "job_applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <AddApplicationDialog onApplicationAdd={handleAddApplication}>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </AddApplicationDialog>
        </div>
      </div>
      <StatsCards applications={applications} />
      <ApplicationsTable
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
        onDeleteApplication={handleDeleteApplication}
      />
    </main>
  );
}
