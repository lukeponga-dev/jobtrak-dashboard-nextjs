import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Middleware function to handle session updates for incoming requests.
 *
 * This function is invoked for every incoming request and uses the `updateSession`
 * utility from Supabase to manage user sessions. It ensures that the session is
 * kept up-to-date and authentication state is properly handled.
 *
 * @param request - The incoming Next.js request object.
 * @returns A promise that resolves to the response after session handling.
 */
export async function middleware(request: NextRequest) {
  // `updateSession` handles session updates, including refreshing tokens
  // and ensuring the user's authentication state is current.
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
