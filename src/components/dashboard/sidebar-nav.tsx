
"use client";

import { usePathname } from "next/navigation";
import { Home, Briefcase, Settings } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton href="/dashboard" isActive={pathname === "/dashboard"}>
          <Home />
          Dashboard
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton href="#" isActive={pathname.startsWith("/dashboard/analytics")}>
          <Briefcase />
          Analytics
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton href="/dashboard/settings" isActive={pathname === "/dashboard/settings"}>
          <Settings />
          Settings
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
