
"use client";

import { useState, useMemo } from "react";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { format } from "date-fns";

type ApplicationsTableProps = {
  applications: JobApplication[];
  onUpdateStatus: (id: number, status: ApplicationStatus) => void;
  onDeleteApplication: (id: number) => void;
  onEditApplication: (application: JobApplication) => void;
};

type SortKey = keyof JobApplication | null;
type SortDirection = "asc" | "desc";

export function ApplicationsTable({
  applications,
  onUpdateStatus,
  onDeleteApplication,
  onEditApplication,
}: ApplicationsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedApplications = useMemo(() => {
    if (!sortKey) return applications;

    return [...applications].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return sortDirection === "desc" ? comparison * -1 : comparison;
    });
  }, [applications, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const SortableHeader = ({
    sortKey: key,
    children,
  }: {
    sortKey: SortKey;
    children: React.ReactNode;
  }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => handleSort(key)}>
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  if (applications.length === 0) {
    return (
      <div className="px-4 lg:px-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
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
    <div className="px-4 lg:px-6">
      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {sortedApplications.map((app) => (
          <Card key={app.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-base font-bold leading-tight">
                  {app.role}
                </CardTitle>
                <div className="text-sm text-muted-foreground font-medium">
                  {app.company}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                    className="-mt-2 -mr-2"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditApplication(app)}>
                      Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeleteApplication(app.id)}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium">Applied on</p>
                <p>{format(new Date(app.date), "MMM d, yyyy")}</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium">Status</p>
                <Select
                  value={app.status}
                  onValueChange={(value: ApplicationStatus) =>
                    onUpdateStatus(app.id, value)
                  }
                >
                  <SelectTrigger>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View */}
      <Card className="hidden md:block">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader sortKey="company">Company</SortableHeader>
                <SortableHeader sortKey="role">Role</SortableHeader>
                <SortableHeader sortKey="date">Date Applied</SortableHeader>
                <SortableHeader sortKey="status">Status</SortableHeader>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>
                    {format(new Date(app.date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem onClick={() => onEditApplication(app)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDeleteApplication(app.id)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
