
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfigErrorPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            Configuration Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            The application is missing essential configuration details.
          </p>
          <div className="space-y-2 rounded-md bg-muted p-4 text-sm">
            <p className="font-semibold">Action Required:</p>
            <p>
              You need to set your Supabase credentials in the{' '}
              <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">
                .env
              </code>{' '}
              file.
            </p>
            <ol className="list-inside list-decimal space-y-1 pl-2">
              <li>
                Find your Supabase URL and anonymous key in your Supabase project settings.
              </li>
              <li>
                Open the{' '}
                <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">
                  .env
                </code>{' '}
                file in the root of this project.
              </li>
              <li>
                Replace the placeholder values with your actual credentials.
              </li>
            </ol>
            <div className="mt-2 rounded-md border border-border bg-background p-2 font-mono text-xs">
              <p>NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            After updating the file, the application should restart automatically with the correct configuration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
