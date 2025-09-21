import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { JobApplication } from "@/lib/types";
import type { User } from "@supabase/supabase-js";

// Because the layout is now a client component, we pass the user
// and initial applications down from this server component.
export default async function DashboardPage({
  view,
  setView,
  user,
}: {
  view?: "card" | "table";
  setView?: (view: "card" | "table") => void;
  user: User | null;
}) {
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
    // Fail gracefully
    applications = [];
  }

  const userName =
    user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <>
      <div className="flex items-center justify-between px-4 lg:px-0">
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
