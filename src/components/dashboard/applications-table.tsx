
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
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";
import { StatusBadge } from "./status-badge";

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
    className,
  }: {
    sortKey: SortKey;
    children: React.ReactNode;
    className?: string;
  }) => (
    <TableHead className={className}>
      <Button variant="ghost" onClick={() => handleSort(key)}>
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-xl font-semibold">No Applications Yet</h3>
          <p className="text-muted-foreground mt-2">
            Click "Add New" to start tracking your job search.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <div className="relative w-full overflow-auto">
        {/* Mobile View: Cards */}
        <div className="grid gap-4 sm:hidden p-4">
          {sortedApplications.map((app) => (
            <div key={app.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{app.role}</p>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mt-2 -mr-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditApplication(app)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDeleteApplication(app.id)} className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                 <span>{format(new Date(app.date), "MMM d, yyyy")}</span>
                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <Table className="hidden sm:table">
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="company">Company</SortableHeader>
              <SortableHeader sortKey="role">Role</SortableHeader>
              <SortableHeader sortKey="date">Date Applied</SortableHeader>
              <SortableHeader sortKey="status">Status</SortableHeader>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.company}</TableCell>
                <TableCell>{app.role}</TableCell>
                <TableCell>{format(new Date(app.date), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
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
                      <DropdownMenuItem onClick={() => onEditApplication(app)}>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDeleteApplication(app.id)} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
