import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { JobApplication } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, PlusCircle } from "lucide-react";
import Link from "next/link";
import { AddApplicationDialog } from "@/components/dashboard/add-application-dialog";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";


// Because the layout is now a client component, we pass the user
// and initial applications down from this server component.
export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  let applications: JobApplication[] = [];
  try {
    const { data, error } = await supabase
      .from("job_applications")
      .select("id, company, role, date, status, notes")
      .eq("user_id", authUser.id)
      .order("date", { ascending: false });

    if (error) throw error;
    applications = data || [];
  } catch (error) {
    console.error("Database error:", error);
    // Fail gracefully
    applications = [];
  }

  const userName =
    authUser?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <>
       <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-0 -mt-4 -mx-4 lg:-mt-6 lg:-mx-6 mb-4 lg:mb-0">
         <div className="px-4 lg:px-6 w-full flex items-center gap-4">
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
          <div className="flex-1">
             <h1 className="text-lg font-semibold md:text-2xl">Hi, {userName}!</h1>
          </div>
          <div className="md:hidden">
             <AddApplicationDialog onApplicationAdd={() => {}}>
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
                    src={authUser.user_metadata.avatar_url}
                    alt={authUser.user_metadata.full_name}
                  />
                  <AvatarFallback>
                    {authUser.email?.charAt(0).toUpperCase()}
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
          </div>
        </header>

      <DashboardClient
        initialApplications={applications}
      />
    </>
  );
}

DashboardPage.displayName = "DashboardPage";
