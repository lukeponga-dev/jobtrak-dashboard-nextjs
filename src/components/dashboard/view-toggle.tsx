"use client";

import { List, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewToggleProps = {
  view: "card" | "table";
  setView: (view: "card" | "table") => void;
};

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-md bg-muted p-1">
      <Button
        variant={view === "card" ? "secondary" : "ghost"}
        size="sm"
        className="p-2 h-auto"
        onClick={() => setView("card")}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "table" ? "secondary" : "ghost"}
        size="sm"
        className="p-2 h-auto"
        onClick={() => setView("table")}
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  );
}
