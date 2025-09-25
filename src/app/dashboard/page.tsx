import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { JobApplication } from "@/lib/types";

/**
 * The main dashboard page, acting as a server-side entry point for the `/dashboard` route.
 *
 * This component is responsible for server-side concerns:
 * 1.  **Authentication Check**: It verifies that a user is logged in. If not, it redirects them to the `/login` page.
 * 2.  **Initial Data Fetching**: It fetches the initial list of job applications for the authenticated user directly from the Supabase database.
 * 3.  **Passing Data to Client**: It passes the fetched data as props to the `DashboardClient` component, which handles all client-side interactivity.
 *
 * This pattern separates concerns, allowing the server to handle security and data fetching,
 * while the client handles the interactive user interface.
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
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">Welcome, {authUser.user_metadata.full_name || authUser.email}!</h1>
      <DashboardClient
      initialApplications={applications}
      />
    </>
  );
}

// Set a display name for the component, which is helpful for debugging in React DevTools.
DashboardPage.displayName = "DashboardPage";
