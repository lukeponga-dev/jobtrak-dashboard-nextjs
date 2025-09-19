
<<<<<<< HEAD
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
<<<<<<< HEAD
=======
=======
"use client";

import { useState } from "react";
>>>>>>> 08b27bf (when on table view mode make it container-fluid)
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
import { Menu } from "lucide-react";
>>>>>>> 56c83c2 (please re create entire project)
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
<<<<<<< HEAD
import { Logo } from "@/components/logo";
import { Header } from "@/components/dashboard/header";
=======
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

// This layout previously had to fetch the user itself. Now, to support
// lifting state up from the DashboardClient, it must be a client component.
// We will pass the user in from the page component that uses this layout.
// For now, we will assume a user is present. A more robust solution
// would involve a session provider.
//
// We also lift the view state here to control the layout's padding.
>>>>>>> 08b27bf (when on table view mode make it container-fluid)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
=======
  const [view, setView] = useState<"card" | "table">("card");
>>>>>>> 08b27bf (when on table view mode make it container-fluid)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
<<<<<<< HEAD
<<<<<<< HEAD
            <Logo />
=======
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
=======
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
>>>>>>> 08b27bf (when on table view mode make it container-fluid)
              <Logo />
            </Link>
>>>>>>> 56c83c2 (please re create entire project)
          </div>
          <div className="flex-1">
            <SidebarNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
<<<<<<< HEAD
        <Header user={user} />
        <main
          className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"
        >
=======
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
            {/* Can add a search bar here if needed */}
          </div>
        </header>
<<<<<<< HEAD
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
>>>>>>> 56c83c2 (please re create entire project)
          {children}
=======
        <main
          className={cn(
            "flex flex-1 flex-col gap-4 lg:gap-6",
            view === "table" ? "p-4 lg:p-6 px-0" : "p-4 lg:p-6"
          )}
        >
          {/* We need to pass the state and dispatcher to the children */}
          {children &&
            (Array.isArray(children) ? children : [children]).map((child) =>
              // @ts-expect-error - Cloned element will have the props
              child.type.displayName !== "DashboardPage"
                ? child
                : // @ts-expect-error - Cloned element will have the props
                  React.cloneElement(child, {
                    ...child.props,
                    view,
                    setView,
                  })
            )
          }
>>>>>>> 08b27bf (when on table view mode make it container-fluid)
        </main>
      </div>
    </div>
  );
}
