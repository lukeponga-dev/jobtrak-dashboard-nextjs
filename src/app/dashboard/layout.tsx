
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusCircle } from "lucide-react";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import type { User } from "@supabase/supabase-js";
import { AddApplicationDialog } from "@/components/dashboard/add-application-dialog";
import { addApplication } from "@/lib/actions";
import React from 'react';

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  if (!user) {
    // Or a loading spinner
    return null; 
  }

  // Pass user to children
  const childrenWithUser = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-expect-error - Cloned element will have the props
      return React.cloneElement(child, { user });
    }
    return child;
  });

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Logo />
            </Link>
          </div>
          <div className="flex-1">
            <SidebarNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
         {/* The header is now part of the page */}
        <main
          className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"
        >
          {childrenWithUser}
        </main>
      </div>
    </div>
  );
}
