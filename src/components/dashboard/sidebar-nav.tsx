"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import { Button } from "../ui/button";
import { Logo } from "../logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Home, Settings, Briefcase } from "lucide-react";
=======
>>>>>>> 5ad038c (Change the Layout to a easy interface)

type SidebarNavProps = {
  isMobile?: boolean;
};

export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  const navItems = [
<<<<<<< HEAD
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/applications", label: "Applications", icon: Briefcase },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
       {isMobile && (
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold mb-4"
        >
          <Logo />
          <span className="sr-only">JobTrackr</span>
        </Link>
      )}
=======
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
>>>>>>> 5ad038c (Change the Layout to a easy interface)
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
<<<<<<< HEAD
            { "bg-muted text-primary": pathname === item.href }
          )}
        >
          <item.icon className="h-4 w-4" />
=======
            { "text-primary bg-muted": pathname === item.href }
          )}
        >
>>>>>>> 5ad038c (Change the Layout to a easy interface)
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
