
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
