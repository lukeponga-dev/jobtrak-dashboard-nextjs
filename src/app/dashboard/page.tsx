/**
 * @fileoverview This is the main server component for the dashboard page.
 * It is responsible for fetching the initial set of job applications for the
 * logged-in user from the Supabase database.
 *
 * - It first authenticates the user using `supabase.auth.getUser()`. If the user
 *   is not logged in, they are redirected to the `/login` page.
 * - It then fetches the user's job applications and passes them as a prop
 *   to the `<DashboardClient />` component.
 * - The actual rendering and all user interactions are handled by the client component,
 *   keeping this page as a lean, data-fetching server component.
 */

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { JobApplication } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  let applications: JobApplication[] = [];
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
    // Fail gracefully on the server, the client will show an empty state.
    applications = [];
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      </div>
      <DashboardClient
        initialApplications={applications}
      />
    </main>
  );
}

DashboardPage.displayName = "DashboardPage";
