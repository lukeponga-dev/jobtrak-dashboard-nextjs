"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";


type ApplicationsTableProps = {
  applications: JobApplication[];
  onUpdateStatus: (id: number, status: ApplicationStatus) => void;
  onDeleteApplication: (id: number) => void;
};

export function ApplicationsTable({
  applications,
  onUpdateStatus,
  onDeleteApplication,
}: ApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-12">
        <CardContent className="text-center">
          <h3 className="text-xl font-semibold">No Applications Yet</h3>
          <p className="text-muted-foreground mt-2">
            Click "Add Application" to start tracking your job search.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {applications.map((app) => (
        <Card key={app.id} className="flex flex-col">
          <CardHeader className="flex-grow">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold leading-tight">
                  {app.role}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{app.company}</p>
              </div>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDeleteApplication(app.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
             <div className="text-xs text-muted-foreground">
              Applied on {new Date(app.date).toLocaleDateString()}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <StatusBadge status={app.status} />
            <Select
              value={app.status}
              onValueChange={(value: ApplicationStatus) =>
                onUpdateStatus(app.id, value)
              }
            >
              <SelectTrigger className="w-auto text-xs h-7 px-2 py-1">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interviewing">Interviewing</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
