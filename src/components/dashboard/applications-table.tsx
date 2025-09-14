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
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import type { JobApplication, ApplicationStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Card } from "../ui/card";

type ApplicationsTableProps = {
  applications: JobApplication[];
  onUpdateStatus: (id: number, status: ApplicationStatus) => void;
  onDeleteApplication: (id: number) => void;
};

type SortKey = "company" | "role" | "date" | "status";
type SortDirection = "asc" | "desc";

export function ApplicationsTable({
  applications,
  onUpdateStatus,
  onDeleteApplication,
}: ApplicationsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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

  return (
    <Card>
      <div className="relative w-full overflow-auto">
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
                      <SelectItem value="Interviewing">Interviewing</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
