import { DashboardClient } from "@/components/dashboard/dashboard-client";
import sql from "@/lib/db";
import type { JobApplication } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let applications: JobApplication[] = [];
  try {
    if (user) {
      applications = await sql<JobApplication[]>`
        SELECT id, company, role, date, status, notes 
        FROM job_applications 
        WHERE user_id = ${user.id}
        ORDER BY date DESC
      `;
    }
  } catch (error) {
    console.error("Database error:", error);
    // You might want to show an error message to the user here
  }

  return <DashboardClient initialApplications={applications} />;
}
