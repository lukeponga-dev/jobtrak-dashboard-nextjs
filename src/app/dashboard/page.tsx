import { mockApplications } from "@/lib/data";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default function DashboardPage() {
  // In a real application, you would fetch this data from your database.
  const applications = mockApplications;

  return <DashboardClient initialApplications={applications} />;
}
