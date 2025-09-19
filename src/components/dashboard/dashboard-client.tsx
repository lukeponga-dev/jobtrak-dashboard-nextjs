
"use client";

import { useState } from "react";
import { Download, PlusCircle, List, LayoutGrid } from "lucide-react";

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

type ViewMode = "card" | "list";

export function DashboardClient({ initialApplications }: DashboardClientProps) {
  const [applications, setApplications] = useState<JobApplication[]>(
    initialApplications
  );
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("card");

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

  const handleUpdateStatus = async (id: number, status: ApplicationStatus) => {
    // Optimistic update
    const originalApplications = applications;
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );

    const result = await updateApplicationStatus({id, status});
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
           <AddApplicationDialog onApplicationAdd={handleAddApplication}>
              <Button size="sm" className="hidden sm:flex">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New
              </Button>
              <Button size="icon" className="sm:hidden">
                <PlusCircle className="h-4 w-4" />
              </Button>
          </AddApplicationDialog>
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
  );
}
