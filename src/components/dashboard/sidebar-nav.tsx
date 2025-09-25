
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Settings, LifeBuoy } from "lucide-react";


export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
  ];

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            { "bg-muted text-primary": pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard') }
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
