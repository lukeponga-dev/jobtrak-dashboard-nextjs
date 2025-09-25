
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobFinderFilters, type SearchFilters } from "@/components/dashboard/job-finder-filters";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelLeft } from "lucide-react";
import { JobFinderClient } from "@/components/dashboard/job-finder-client";

export default function JobFinderLayout() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    location: "",
    type: "All",
  });
  const [submittedFilters, setSubmittedFilters] = useState<SearchFilters>(filters);

  const handleSearch = () => {
    setSubmittedFilters(filters);
  };

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="hidden w-72 flex-col border-r bg-card p-4 lg:flex">
         <JobFinderFilters filters={filters} onFilterChange={setFilters} onSearch={handleSearch} />
      </aside>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center gap-4 mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 lg:hidden p-4 bg-card" >
              <JobFinderFilters filters={filters} onFilterChange={setFilters} onSearch={handleSearch} />
            </SheetContent>
          </Sheet>
           <div>
            <h1 className="text-lg font-semibold md:text-2xl">Job Finder</h1>
            <p className="text-muted-foreground text-sm">
              Use our AI-powered search to find your next opportunity.
            </p>
          </div>
        </div>
        <JobFinderClient filters={submittedFilters} />
      </main>
    </div>
  );
}
