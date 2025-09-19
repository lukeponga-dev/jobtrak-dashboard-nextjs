
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Card, CardContent } from "../ui/card";

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
      <Card className="flex flex-col items-center justify-center py-12 mx-4 lg:mx-6">
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
    <Card className="mx-4 lg:mx-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.company}</TableCell>
              <TableCell>{app.role}</TableCell>
              <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <StatusBadge status={app.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                   <Select
                    value={app.status}
                    onValueChange={(value: ApplicationStatus) =>
                      onUpdateStatus(app.id, value)
                    }
                  >
                    <SelectTrigger className="w-[120px] text-xs h-8">
                      <SelectValue placeholder="Update..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interviewing">Interviewing</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onDeleteApplication(app.id)}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
