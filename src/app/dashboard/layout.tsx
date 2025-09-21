
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
import { cn } from "@/lib/utils";
import { AddApplicationDialog } from "@/components/dashboard/add-application-dialog";
import { addApplication } from "@/lib/actions";
import React from 'react';


// This layout previously had to fetch the user itself. Now, to support
// lifting state up from the DashboardClient, it must be a client component.
// We will pass the user in from the page component that uses this layout.
// For now, we will assume a user is present. A more robust solution
// would involve a session provider.
//
// We also lift the view state here to control the layout's padding.

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [view, setView] = useState<"card" | "table">("card");

  if (!user) {
    // Or a loading spinner
    return null; 
  }

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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SidebarNav isMobile={true} />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 md:hidden">
             <AddApplicationDialog onApplicationAdd={addApplication}>
                <Button size="sm" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New
                </Button>
            </AddApplicationDialog>
          </div>
          <div className="w-full flex-1 hidden md:block">
            {/* Can add a search bar here if needed */}
          </div>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                 <Avatar>
                  <AvatarImage
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name}
                  />
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                 <form action="/auth/signout" method="post" className="w-full">
                  <button type="submit" className="w-full text-left">Logout</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main
          className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"
        >
          {/* We need to pass the state and dispatcher to the children */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              // @ts-expect-error - Cloned element will have the props
              return React.cloneElement(child, { user });
            }
            return child;
          })}
        </main>
      </div>
    </div>
  );
}
