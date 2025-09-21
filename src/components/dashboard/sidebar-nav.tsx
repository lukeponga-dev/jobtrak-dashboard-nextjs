"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import { Logo } from "../logo";
import { Home, Settings } from "lucide-react";
=======
import { Button } from "../ui/button";
import { Logo } from "../logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Home, Settings, Briefcase } from "lucide-react";
>>>>>>> 56c83c2 (please re create entire project)

type SidebarNavProps = {
  isMobile?: boolean;
};

export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
<<<<<<< HEAD
=======
    { href: "/dashboard/applications", label: "Applications", icon: Briefcase },
>>>>>>> 56c83c2 (please re create entire project)
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
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            { "bg-muted text-primary": pathname === item.href }
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
