
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
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="company" className="hidden sm:table-cell">Company</SortableHeader>
              <SortableHeader sortKey="role">Role</SortableHeader>
              <SortableHeader sortKey="date" className="hidden sm:table-cell">Date Applied</SortableHeader>
              <SortableHeader sortKey="status" className="hidden sm:table-cell">Status</SortableHeader>
              <TableHead className="hidden sm:table-cell">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApplications.map((app) => (
              <TableRow key={app.id} className="sm:table-row flex flex-col sm:flex-row p-4 sm:p-0 mb-4 sm:mb-0 border sm:border-none rounded-lg">
                <TableCell className="font-medium sm:table-cell block p-0 sm:p-4 border-b sm:border-none">
                  <div className="flex justify-between items-center sm:hidden">
                    <span className="text-sm text-muted-foreground">{app.company}</span>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="-mr-2 -mt-2">
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
                  </div>
                  <span className="hidden sm:inline">{app.company}</span>
                </TableCell>
                <TableCell className="sm:table-cell block p-0 sm:p-4 text-lg sm:text-sm font-bold sm:font-normal border-b sm:border-none">{app.role}</TableCell>
                <TableCell className="hidden sm:table-cell p-0 sm:p-4">
                  {format(new Date(app.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="sm:table-cell p-0 sm:p-4 pt-2">
                   <div className="flex justify-between items-center">
                    <div className="sm:hidden text-sm text-muted-foreground">
                       {format(new Date(app.date), "MMM d, yyyy")}
                    </div>
                     <Select
                        value={app.status}
                        onValueChange={(value: ApplicationStatus) =>
                          onUpdateStatus(app.id, value)
                        }
                      >
                        <SelectTrigger className="w-full sm:w-[120px] text-xs h-8">
                          <SelectValue placeholder="Update..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Applied">Applied</SelectItem>
                          <SelectItem value="Interviewing">Interviewing</SelectItem>
                          <SelectItem value="Offer">Offer</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell p-0 sm:p-4">
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
  );
}
