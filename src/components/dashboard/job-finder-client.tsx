"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { findJobs as findJobsAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import type { FindJobsOutput } from "@/ai/flows/find-jobs-flow";
import { JobCard } from "./job-card";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  query: z.string().min(1, "A search query is required."),
});

export function JobFinderClient() {
  const [isSearching, startSearchTransition] = useTransition();
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<FindJobsOutput | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "React Engineer",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSearchResults(null);
    startSearchTransition(async () => {
      const result = await findJobsAction({ query: values.query });

      if (result.success && result.data) {
        setSearchResults(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Search Failed",
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-end gap-2"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>What job are you looking for?</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="e.g., 'Senior Frontend Developer in New York'"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" loading={isSearching} className="w-full sm:w-auto">
            {!isSearching && <Search className="h-4 w-4 sm:mr-2" />}
            <span className="sm:inline">Search</span>
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        {isSearching && (
          <>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </>
        )}
        {searchResults && searchResults.jobs.length > 0 && (
          searchResults.jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))
        )}
        {searchResults && searchResults.jobs.length === 0 && !isSearching && (
            <div className="text-center text-muted-foreground py-12">
                <p>No job openings found for your query.</p>
                <p className="text-sm">Try a different search term.</p>
            </div>
        )}
      </div>
    </div>
  );
}
