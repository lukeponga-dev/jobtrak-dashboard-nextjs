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
      <Card className="mx-4 lg:mx-6">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-xl font-semibold">No Applications Yet</h3>
            <p className="text-muted-foreground mt-2">
              Click "Add Application" to start tracking your job search.
            </p>
        </CardContent>
      </Card>
    );
  }

<<<<<<< HEAD
  return (
    <Card className="mx-0">
=======
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];

    let comparison = 0;
    if (valA > valB) {
      comparison = 1;
    } else if (valA < valB) {
      comparison = -1;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

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
  
   const MobileCardView = () => (
    <div className="grid gap-4 sm:hidden">
      {sortedApplications.map((app) => (
        <Card key={app.id}>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold leading-6">
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
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              Applied on {new Date(app.date).toLocaleDateString()}
            </div>
            <Select
              value={app.status}
              onValueChange={(value: ApplicationStatus) =>
                onUpdateStatus(app.id, value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interviewing">Interviewing</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const MobileListView = () => (
    <Card className="sm:hidden">
>>>>>>> cec7630 (change User Interface)
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
<<<<<<< HEAD
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
=======
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
>>>>>>> cec7630 (change User Interface)
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
<<<<<<< HEAD
=======
  );

  return (
    <>
      <div className={cn("sm:hidden", viewMode === 'card' ? 'block' : 'hidden')}>
        <MobileCardView />
      </div>
      <div className={cn("sm:hidden", viewMode === 'list' ? 'block' : 'hidden')}>
        <MobileListView />
      </div>

      {/* Desktop View */}
      <Card className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="company">Company</SortableHeader>
              <SortableHeader sortKey="role">Role</SortableHeader>
              <SortableHeader sortKey="date">Date Applied</SortableHeader>
              <SortableHeader sortKey="status">Status</SortableHeader>
              <TableHead>Current Status</TableHead>
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
                  {new Date(app.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell>
                  <Select
                    value={app.status}
                    onValueChange={(value: ApplicationStatus) =>
                      onUpdateStatus(app.id, value)
                    }
                  >
                    <SelectTrigger className="w-full min-w-[180px]">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interviewing">
                        Interviewing
                      </SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onDeleteApplication(app.id)}
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
      </Card>
    </>
>>>>>>> cec7630 (change User Interface)
  );
}
