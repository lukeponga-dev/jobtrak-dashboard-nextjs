import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Building, MapPin } from "lucide-react";

type JobCardProps = {
  job: {
    title: string;
    company: string;
    location: string;
    description: string;
    url: string;
  };
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
                <Building className="h-4 w-4" />
                <span>{job.company}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{job.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm">
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            View Job
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
