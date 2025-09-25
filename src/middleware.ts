import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Middleware function to handle session updates for incoming requests.
 *
 * This function is invoked for every incoming request that matches the `config.matcher` pattern.
 * It uses the `updateSession` utility from the Supabase SSR library to manage user sessions.
 * This is crucial for keeping the user's authentication state (e.g., cookies) in sync
 * between the browser, server components, and server actions.
 *
 * It also includes a check to ensure Supabase environment variables are set, redirecting
 * to an error page if they are missing.
 *
 * @param {NextRequest} request - The incoming Next.js request object.
 * @returns {Promise<Response>} A promise that resolves to the response after session handling.
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export async function middleware(request: NextRequest) {
  // `updateSession` handles session updates, including refreshing tokens
  // and ensuring the user's authentication state is current.
  return await updateSession(request);
}

// The config object specifies which paths the middleware should run on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * This prevents the middleware from running on static assets, which is unnecessary
     * and can hurt performance.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
