
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, MapPin, ExternalLink, Bookmark, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Job } from '@/ai/flows/find-jobs-flow.d';

type JobCardProps = {
  job: Job;
  onSave: (job: Job) => void;
  isSaving: boolean;
};


export function JobCard({ job, onSave, isSaving }: JobCardProps) {
  const daysAgo = formatDistanceToNow(new Date(job.datePosted), { addSuffix: true });

  const getStatus = () => {
    const date = new Date(job.datePosted);
    const now = new Date();
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
    if (diffDays <= 2) return { text: 'New', className: 'bg-green-500/20 text-green-400 border-green-500/30' };
    if (diffDays <= 7) return { text: 'Trending', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    return null;
  };

  const status = getStatus();

  return (
    <Card className="flex flex-col">
      <CardHeader>
         <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg hover:text-primary transition-colors">
              <Link href={job.url} target="_blank">{job.title}</Link>
            </CardTitle>
            {status && <Badge variant="outline" className={cn('whitespace-nowrap', status.className)}>{status.text}</Badge>}
        </div>
        <CardDescription className="flex items-center text-muted-foreground pt-1">
          <Building className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>{job.company}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{job.location}</span>
        </div>
         <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{daysAgo} via {job.source}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild variant="outline" className="w-full">
          <Link href={job.url} target="_blank">
            <ExternalLink className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
        <Button className="w-full" onClick={() => onSave(job)} loading={isSaving}>
          {!isSaving && <Bookmark className="mr-2 h-4 w-4" />}
          Save 
        </Button>
      </CardFooter>
    </Card>
  );
}


export function JobCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
         <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
