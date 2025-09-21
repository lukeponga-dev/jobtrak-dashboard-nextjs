
"use client";

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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusCircle } from "lucide-react";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import type { User } from "@supabase/supabase-js";
import { AddApplicationDialog } from "@/components/dashboard/add-application-dialog";
import { addApplication } from "@/lib/actions";

export function Header({ user }: { user: User }) {
  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
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
      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">Hi, {userName}!</h1>
      </div>
      <div className="md:hidden">
        <AddApplicationDialog
          onApplicationAdd={async () => {
            // This is a dummy function, the actual logic is in DashboardClient
            // but the dialog needs a prop. Re-fetch or optimistic update
            // would happen in the main client component.
          }}
        >
          <Button size="sm" className="">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </AddApplicationDialog>
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
              <button type="submit" className="w-full text-left">
                Logout
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
