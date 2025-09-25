import { BarChart, Briefcase, Home, Settings } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar-background p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">JobTrackr</h1>
        <nav className="flex flex-col space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-3 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/applications" className="flex items-center space-x-3 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
            <Briefcase className="w-5 h-5" />
            <span>Applications</span>
          </Link>
          <Link href="/analytics" className="flex items-center space-x-3 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
            <BarChart className="w-5 h-5" />
            <span>Analytics</span>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col space-y-4">
        <Link href="/settings" className="flex items-center space-x-3 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}