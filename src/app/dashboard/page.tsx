import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { JobApplication } from "@/lib/types";

// Because the layout is now a client component, we pass the user
// and initial applications down from this server component.
export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  let applications: JobApplication[] = [];
<<<<<<< HEAD
  try {
    const { data, error } = await supabase
      .from("job_applications")
      .select("id, company, role, date, status, notes")
      .eq("user_id", authUser.id)
      .order("date", { ascending: false });

    if (error) throw error;
    applications = data || [];
  } catch (error) {
    console.error("Database error:", error);
    // Fail gracefully
    applications = [];
=======
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
>>>>>>> 56c83c2 (please re create entire project)
  }
  
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  return (
<<<<<<< HEAD
    <DashboardClient
      initialApplications={applications}
    />
=======
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Hi, {userName}!
        </h1>
      </div>
      <DashboardClient initialApplications={applications} />
    </>
>>>>>>> 56c83c2 (please re create entire project)
  );
}

DashboardPage.displayName = "DashboardPage";
