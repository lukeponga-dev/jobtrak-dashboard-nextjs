
"use client";

import { useState, useMemo } from "react";
import { Download, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddApplicationDialog } from "./add-application-dialog";
import { EditApplicationDialog } from "./edit-application-dialog";
import { StatsCards } from "./stats-cards";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  addApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
} from "@/lib/actions";
import { ApplicationsTable } from "./applications-table";
import { ApplicationsCards } from "./applications-cards";
import { ViewToggle } from "./view-toggle";

type DashboardClientProps = {
  initialApplications: JobApplication[];
};

export function DashboardClient({
  initialApplications
}: DashboardClientProps) {
  const [applications, setApplications] = useState<JobApplication[]>(
    initialApplications
  );
  const [view, setView] = useState<"card" | "table">("table");
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | "All">("All");

  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  const { toast } = useToast();

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") {
      return applications;
    }
    return applications.filter((app) => app.status === activeFilter);
  }, [applications, activeFilter]);

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

  const handleEditApplication = async (updatedApplication: JobApplication) => {
    const originalApplications = applications;
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApplication.id ? updatedApplication : app))
    );

    const result = await updateApplication(updatedApplication);
    if (result.success && result.data) {
       setApplications((prev) =>
        prev.map((app) => (app.id === result.data.id ? result.data : app))
      );
      toast({
        title: "Application Updated",
        description: "Your application details have been saved.",
      });
    } else {
      setApplications(originalApplications);
      toast({
        title: "Error updating application",
        description: result.error,
        variant: "destructive",
      });
    }
    setEditingApplication(null);
  };


  const handleUpdateStatus = async (id: number, status: ApplicationStatus) => {
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
    const headers = ["Company", "Role", "Date Applied", "Status", "Notes"];
    const rows = filteredApplications.map((app) => [
      `"${app.company.replace(/"/g, '""')}"`,
      `"${app.role.replace(/"/g, '""')}"`,
      new Date(app.date).toLocaleDateString(),
      app.status,
      `"${(app.notes || '').replace(/"/g, '""')}"`
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
    link.setAttribute("download", `job_applications_${activeFilter.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
        <div className="hidden sm:flex flex-1 items-center justify-end gap-2">
          <ViewToggle view={view} setView={setView} />
          <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <AddApplicationDialog onApplicationAdd={handleAddApplication}>
            <Button size="sm" className="w-full sm:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </AddApplicationDialog>
        </div>
      </div>
      <StatsCards 
        applications={applications}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className="md:hidden">
         <ApplicationsCards
            applications={filteredApplications}
            onUpdateStatus={handleUpdateStatus}
            onDeleteApplication={handleDeleteApplication}
            onEditApplication={setEditingApplication}
          />
      </div>
      <div className="hidden md:block">
        {view === 'table' ? (
          <ApplicationsTable
            applications={filteredApplications}
            onUpdateStatus={handleUpdateStatus}
            onDeleteApplication={handleDeleteApplication}
            onEditApplication={setEditingApplication}
          />
        ) : (
          <ApplicationsCards
            applications={filteredApplications}
            onUpdateStatus={handleUpdateStatus}
            onDeleteApplication={handleDeleteApplication}
            onEditApplication={setEditingApplication}
          />
        )}
      </div>
       <div className="sm:hidden fixed bottom-4 right-4 space-y-2">
        <Button size="icon" variant="outline" className="w-14 h-14 rounded-full shadow-lg" onClick={handleExport}>
          <Download className="h-6 w-6" />
        </Button>
        <AddApplicationDialog onApplicationAdd={handleAddApplication}>
          <Button size="icon" className="w-14 h-14 rounded-full shadow-lg">
            <PlusCircle className="h-6 w-6" />
          </Button>
        </AddApplicationDialog>
      </div>

       {editingApplication && (
        <EditApplicationDialog
          application={editingApplication}
          onApplicationUpdate={handleEditApplication}
          isOpen={!!editingApplication}
          onOpenChange={(open) => !open && setEditingApplication(null)}
        />
      )}
    </main>
  );
}
