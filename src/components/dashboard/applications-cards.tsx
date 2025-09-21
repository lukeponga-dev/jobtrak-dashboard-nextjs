
"use client";

import { useState } from "react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";


type ApplicationsCardsProps = {
  applications: JobApplication[];
  onUpdateStatus: (id: number, status: ApplicationStatus) => void;
  onDeleteApplication: (id: number) => void;
};

export function ApplicationsCards({
  applications,
  onUpdateStatus,
  onDeleteApplication,
}: ApplicationsCardsProps) {
  if (applications.length === 0) {
    return (
      <div className="px-4 lg:px-6">
        <Card className="flex flex-col items-center justify-center py-12">
          <CardContent className="text-center">
            <h3 className="text-xl font-semibold">No Applications Yet</h3>
            <p className="text-muted-foreground mt-2">
              Click "Add Application" to start tracking your job search.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 lg:px-6">
      {applications.map((app) => (
        <Collapsible key={app.id} asChild>
          <Card className="flex flex-col">
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
                    <DropdownMenuItem onClick={() => onDeleteApplication(app.id)} className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <div className="text-xs text-muted-foreground">
                Applied on {new Date(app.date).toLocaleDateString()}
              </div>
              {app.notes && (
                <CollapsibleContent className="space-y-2">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{app.notes}</p>
                </CollapsibleContent>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
               <div className="flex-1">
                {app.notes && (
                  <CollapsibleTrigger asChild>
                    <Button variant="link" className="p-0 h-auto text-xs text-primary/80">
                      View Notes
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              <div className="flex items-center gap-2">
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
              </div>
            </CardFooter>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
}
