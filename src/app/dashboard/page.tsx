
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { JobApplication } from "@/lib/types";

/**
 * The main dashboard page, responsible for server-side data fetching and authentication.
 * This component fetches the user's job applications from the Supabase database
 * and passes them to a client component for rendering.
 *
 * @returns {Promise<JSX.Element>} A promise that resolves to the dashboard page component.
 */
export default async function DashboardPage() {
  // Create a Supabase client for server-side operations.
  const supabase = createClient();

  // Retrieve the authenticated user's information.
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  // If no user is authenticated, redirect to the login page.
  if (!authUser) {
    redirect("/login");
  }

  let applications: JobApplication[] = [];
  try {
    // Fetch job applications for the authenticated user from the database.
    const { data, error } = await supabase
      .from("job_applications")
      .select("id, company, role, date, status, notes")
      .eq("user_id", authUser.id)
      .order("date", { ascending: false });

    // If an error occurs during the fetch, throw it to be caught by the catch block.
    if (error) throw error;
    // If the fetch is successful, assign the data to the applications array.
    applications = data || [];
  } catch (error) {
    // Log the error for debugging purposes.
    console.error("Database error:", error);
    // Fail gracefully by providing an empty array if the database call fails.
    applications = [];
  }

  // Render the client-side component with the initial data.
  // This separates server-side data fetching from client-side interactivity.
  return (
    <DashboardClient
      initialApplications={applications}
    />
  );
}

// Set a display name for the component, which is helpful for debugging in React DevTools.
DashboardPage.displayName = "DashboardPage";
