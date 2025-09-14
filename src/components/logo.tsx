import { cn } from '@/lib/utils';
import { Briefcase } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Briefcase className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold text-foreground tracking-tight">JobTrackr</h1>
    </div>
  );
}
