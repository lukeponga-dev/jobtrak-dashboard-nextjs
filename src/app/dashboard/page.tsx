
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import sql from "@/lib/db";
import type { JobApplication } from "@/lib/types";

// Because the layout is now a client component, we pass the user
// and initial applications down from this server component.
export default async function DashboardPage({
  view,
  setView,
}: {
  view?: "card" | "table";
  setView?: (view: "card" | "table") => void;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let applications: JobApplication[] = [];
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

  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <>
      <div className="flex items-center justify-between px-4 lg:px-6">
        <h1 className="text-lg font-semibold md:text-2xl">Hi, {userName}!</h1>
      </div>
      <DashboardClient
        initialApplications={applications}
        view={view}
        setView={setView}
      />
    </>
  );
}

DashboardPage.displayName = "DashboardPage";
