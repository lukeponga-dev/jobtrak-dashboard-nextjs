import { DashboardClient } from "@/components/dashboard/dashboard-client";
import sql from "@/lib/db";
import type { JobApplication } from "@/lib/types";

export default async function DashboardPage() {
  let applications: JobApplication[] = [];
  try {
    // This is a placeholder for when auth is implemented.
    // For now, we fetch a default user's data.
    const defaultUserId = '00000000-0000-0000-0000-000000000000';
    applications = await sql<JobApplication[]>`
      SELECT id, company, role, date, status, notes 
      FROM job_applications 
      WHERE user_id = ${defaultUserId}
      ORDER BY date DESC
    `;
  } catch (error) {
    console.error("Database connection test failed:", error);
    // You might want to show an error message to the user here
  }

  return <DashboardClient initialApplications={applications} />;
}
