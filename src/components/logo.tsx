import { cn } from '@/lib/utils';
import { Briefcase } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
<<<<<<< HEAD
      <Briefcase className="h-6 w-6 text-primary" />
=======
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect width="20" height="14" x="2" y="6" rx="2" />
      </svg>
>>>>>>> cec7630 (change User Interface)
      <h1 className="text-xl font-bold text-foreground tracking-tight">JobTrackr</h1>
    </div>
  );
}
