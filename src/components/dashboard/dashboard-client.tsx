
"use client";

import { useState } from "react";
import { Download, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ApplicationsTable } from "./applications-table";
import { ApplicationsCards } from "./applications-cards";
import { AddApplicationDialog } from "./add-application-dialog";
import { StatsCards } from "./stats-cards";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  addApplication,
  updateApplicationStatus,
  deleteApplication,
} from "@/lib/actions";
import { ViewToggle } from "./view-toggle";
import { cn } from "@/lib/utils";

type DashboardClientProps = {
  initialApplications: JobApplication[];
};

export function DashboardClient({
  initialApplications
}: DashboardClientProps) {
  const [applications, setApplications] = useState<JobApplication[]>(
    initialApplications
  );
  const [view, setView] = useState<"card" | "table">("card");
  const { toast } = useToast();

  const handleAddApplication = async (
    newApplication: Omit<JobApplication, "id" | "user_id">
  ) => {
    const result = await addApplication(newApplication);

    if (result.success && result.data) {
      setApplications((prev) =>
        [result.data!, ...prev].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
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
    // Optimistic update
    const originalApplications = applications;
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );

    const result = await updateApplicationStatus({ id, status });
    if (result.success) {
      toast({
        title: "Status Updated",
        description: `The status has been updated to "${status}".`,
      });
    } else {
      // Revert on failure
      setApplications(originalApplications);
      toast({
        title: "Error updating status",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleDeleteApplication = async (id: number) => {
    const originalApplications = applications;
    setApplications((prev) => prev.filter((app) => app.id !== id));

    const result = await deleteApplication(id);

    if (result.success) {
      toast({
        title: "Application Deleted",
        description: "The application has been removed from your tracker.",
      });
    } else {
      setApplications(originalApplications);
      toast({
        title: "Error deleting application",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const headers = ["Company", "Role", "Date Applied", "Status"];
    const rows = applications.map((app) => [
      `"${app.company.replace(/"/g, '""')}"`,
      `"${app.role.replace(/"/g, '""')}"`,
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
<<<<<<< HEAD
    <div className="flex flex-col gap-4 lg:gap-6 -mx-4 lg:-mx-6">
      <div className="px-4 lg:px-6">
        <StatsCards applications={applications} />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 lg:px-6">
          <div>
            <h2 className="text-xl font-semibold">Your Applications</h2>
            <p className="text-sm text-muted-foreground">
              Track and manage all your job applications in one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ViewToggle view={view} setView={setView} />
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <div className="hidden md:block">
              <AddApplicationDialog onApplicationAdd={handleAddApplication}>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Application
                </Button>
              </AddApplicationDialog>
            </div>
          </div>
        </div>
        <div>
          {view === "card" ? (
            <div className="px-4 lg:px-6">
            <ApplicationsCards
              applications={applications}
              onUpdateStatus={handleUpdateStatus}
              onDeleteApplication={handleDeleteApplication}
            />
            </div>
          ) : (
            <ApplicationsTable
              applications={applications}
              onUpdateStatus={handleUpdateStatus}
              onDeleteApplication={handleDeleteApplication}
            />
          )}
        </div>
      </div>
    </div>
=======
    <>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
           <div className="sm:hidden">
            <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}>
              {viewMode === 'card' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
           <div className="hidden sm:flex">
             <AddApplicationDialog onApplicationAdd={handleAddApplication}>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New
                </Button>
            </AddApplicationDialog>
           </div>
           <div className="sm:hidden">
            <AddApplicationDialog onApplicationAdd={handleAddApplication}>
                <Button size="icon">
                  <PlusCircle className="h-4 w-4" />
                </Button>
            </AddApplicationDialog>
           </div>
        </div>
      </div>
      <StatsCards applications={applications} />
      <div className="mt-8">
        <h2 className="font-semibold text-lg md:text-xl mb-4">Recent Applications</h2>
        <ApplicationsTable
          applications={applications}
          onUpdateStatus={handleUpdateStatus}
          onDeleteApplication={handleDeleteApplication}
          viewMode={viewMode}
        />
      </div>
    </>
>>>>>>> cec7630 (change User Interface)
  );
}
