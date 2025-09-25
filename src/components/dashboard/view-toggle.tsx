
'use client';

import { List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type View = 'list' | 'card';

type ViewToggleProps = {
  view: View;
  setView: (view: View) => void;
};

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-md bg-muted p-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-7 px-2',
          view === 'card' && 'bg-background text-foreground shadow-sm'
        )}
        onClick={() => setView('card')}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">Card View</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-7 px-2',
          view === 'list' && 'bg-background text-foreground shadow-sm'
        )}
        onClick={() => setView('list')}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List View</span>
      </Button>
    </div>
  );
}
