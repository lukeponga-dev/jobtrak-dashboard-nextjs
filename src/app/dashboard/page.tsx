
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
      .from("applications")
      .select("id, company, role, date, status, notes")
      .eq("user_id", authUser.id)
      .order("date", { ascending: false });

    if (error) throw error;
    applications = data || [];
  } catch (error) {
    console.error("Database error:", error);
    // Fail gracefully
    applications = [];
  }

  return (
    <DashboardClient
      initialApplications={applications}
    />
  );
}

DashboardPage.displayName = "DashboardPage";
