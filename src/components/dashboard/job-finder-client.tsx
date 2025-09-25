
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
import type { FindJobsOutput } from "@/ai/flows/find-jobs-flow.d";
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

'use client';

import { useState, useTransition, useEffect } from 'react';
import { findJobs, addApplication } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { JobCard, JobCardSkeleton } from './job-card';
import type { FindJobsOutput, Job, FindJobsInput } from '@/ai/flows/find-jobs-flow.d';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Sparkles } from 'lucide-react';
import type { JobApplication } from '@/lib/types';

export function JobFinderClient({ filters }: { filters: FindJobsInput }) {
  const [isSearching, startSearchTransition] = useTransition();
  const [savingJobId, setSavingJobId] = useState<string | null>(null);
  const [results, setResults] = useState<FindJobsOutput | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Automatically trigger search when filters change
    startSearchTransition(async () => {
      // Don't search if there are no filters set at all
      if (!filters.query && !filters.location && (!filters.type || filters.type === 'All')) {
        setResults(null);
        return;
      }
      
      setResults(null); // Clear previous results while new ones are loading
      const response = await findJobs(filters);

      if (response.success && response.data) {
        setResults(response.data);
        if (response.data.jobs.length === 0) {
          toast({
            title: 'No jobs found',
            description: 'Try broadening your search criteria.',
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Search Failed',
          description: response.error,
        });
      }
    });
  }, [filters, toast]);

  const handleSaveJob = async (job: Job) => {
    setSavingJobId(job.title + job.company);
    const newApplication: Omit<JobApplication, 'id'> = {
      company: job.company,
      role: job.title,
      date: new Date().toISOString(),
      status: 'Applied',
      notes: `Found via AI Job Finder from ${job.source}.\nOriginal posting: ${job.url}`,
    };

    const result = await addApplication(newApplication);
    
    if (result.success) {
      toast({
        title: 'Job Saved!',
        description: `${job.title} has been added to your applications.`,
      });
    } else {
       toast({
        variant: 'destructive',
        title: 'Error Saving Job',
        description: result.error,
      });
    }
    setSavingJobId(null);
  };


  if (isSearching && !results) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!results) {
     return (
      <div className="flex items-center justify-center h-full">
        <Alert className="max-w-md text-center">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Start Your Search</AlertTitle>
            <AlertDescription>
              Use the filters to find job opportunities with the power of AI. Your results will appear here.
            </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (results.jobs.length === 0) {
     return (
      <div className="flex items-center justify-center h-full">
        <Alert variant="destructive" className="max-w-md text-center">
            <AlertTitle>No Results Found</AlertTitle>
            <AlertDescription>
              We couldn't find any jobs matching your criteria. Try adjusting your filters.
            </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {results?.jobs.map((job, index) => (
        <JobCard 
          key={index}
          job={job}
          onSave={handleSaveJob}
          isSaving={savingJobId === job.title + job.company}
        />
      ))}

    </div>
  );
}
