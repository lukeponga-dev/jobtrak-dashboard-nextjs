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
  if (user) {
    try {
        applications = await sql<JobApplication[]>`
          SELECT id, company, role, date, status, notes 
          FROM job_applications 
          WHERE user_id = ${user.id}
          ORDER BY date DESC
        `;
    } catch (error) {
      console.error("Database error:", error);
      // Fail gracefully
      applications = [];
    }
  }
  
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Hi, {userName}!
        </h1>
      </div>
      <DashboardClient initialApplications={applications} />
    </>
  );
}
