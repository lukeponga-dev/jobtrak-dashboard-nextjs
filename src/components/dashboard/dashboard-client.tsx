/**
 * @file This is the main client component for the dashboard.
 * It manages the state for job applications, handles all user interactions (add, edit, delete),
 * and orchestrates the rendering of child components like the stats cards and applications table.
 * It receives its initial data from a server component.
 */
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
import { useIsMobile } from "@/hooks/use-mobile";
import { ApplicationsCards } from "./applications-cards";
import { ViewToggle, type View } from "./view-toggle";


type DashboardClientProps = {
  initialApplications: JobApplication[];
};

export function DashboardClient({
  initialApplications
}: DashboardClientProps) {
  // State for managing the list of applications.
  const [applications, setApplications] = useState<JobApplication[]>(
    initialApplications
  );
  // State for filtering applications by status.
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | "All">("All");
  const isMobile = useIsMobile();
  const [view, setView] = useState<View>(isMobile ? 'card' : 'list');

  // State for tracking which application is currently being edited.
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  const { toast } = useToast();

  // Memoized derivation of applications to display based on the active filter.
  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") {
      return applications;
    }
    return applications.filter((app) => app.status === activeFilter);
  }, [applications, activeFilter]);

  // Handler for adding a new application. Calls a server action.
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

  // Handler for editing an existing application. Calls a server action.
  const handleEditApplication = async (updatedApplication: JobApplication) => {
    const originalApplications = applications;
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApplication.id ? updatedApplication : app))
    );

    const result = await updateApplication(updatedApplication);
    if (result.success && result.data) {
       setApplications((prev) =>
        prev.map((app) => (app.id === result.data!.id ? result.data! : app))
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

  // Handler for updating only the status of an application.
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

  // Handler for deleting an application. Calls a server action.
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

  // Handler for exporting the current view to a CSV file.
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

  const currentView = isMobile ? 'card' : view;

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <StatsCards
          applications={applications}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          {!isMobile && <ViewToggle view={view} setView={setView} />}
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <AddApplicationDialog onApplicationAdd={handleAddApplication}>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </AddApplicationDialog>
        </div>
      </div>

      {currentView === 'list' ? (
        <ApplicationsTable
          applications={filteredApplications}
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

      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <Button size="icon" variant="outline" className="w-14 h-14 rounded-full shadow-lg" onClick={handleExport}>
            <Download className="h-6 w-6" />
            <span className="sr-only">Export</span>
          </Button>
          <AddApplicationDialog onApplicationAdd={handleAddApplication}>
            <Button size="icon" className="w-14 h-14 rounded-full shadow-lg">
              <PlusCircle className="h-6 w-6" />
              <span className="sr-only">Add New Application</span>
            </Button>
          </AddApplicationDialog>
        </div>
      )}

      {editingApplication && (
        <EditApplicationDialog
          application={editingApplication}
          onApplicationUpdate={handleEditApplication}
          isOpen={!!editingApplication}
          onOpenChange={(open) => !open && setEditingApplication(null)}
        />
      )}
    </div>
  );
}
