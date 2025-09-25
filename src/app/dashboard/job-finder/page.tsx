import { JobFinderClient } from "@/components/dashboard/job-finder-client";

export default function JobFinderPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Job Finder</h1>
        <p className="text-muted-foreground text-sm">
          Use our AI-powered search to find your next opportunity.
        </p>
      </div>
      <JobFinderClient />
    </div>
  );
}
