'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { findJobs } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { JobCard, JobCardSkeleton } from './job-card';
import type { FindJobsOutput } from '@/ai/flows/find-jobs-flow.d';
import { Sparkles } from 'lucide-react';

export function JobFinderClient() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<FindJobsOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast({
        variant: 'destructive',
        title: 'Search query is empty',
        description: 'Please enter a job title or keywords to search.',
      });
      return;
    }

    startTransition(async () => {
      setResults(null); // Clear previous results
      const response = await findJobs({ query });

      if (response.success && response.data) {
        setResults(response.data);
        if(response.data.jobs.length === 0){
           toast({
              title: 'No jobs found',
              description: 'Try a different search query.',
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
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex w-full max-w-2xl items-center space-x-2">
        <Input
          type="text"
          placeholder="e.g., Senior Product Manager in New York"
          value={query}
          onChange={e => setQuery(e.target.value)}
          disabled={isPending}
          className="h-11 text-base"
        />
        <Button type="submit" size="lg" loading={isPending}>
          {!isPending && <Sparkles className="mr-2 h-4 w-4" />}
          Find Jobs
        </Button>
      </form>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isPending && Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)}
        {results?.jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}
