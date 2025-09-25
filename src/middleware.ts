/**
 * @fileoverview This middleware is responsible for managing user sessions in the application.
 * It runs on every request to paths defined in the `matcher` config.
 *
 * The `updateSession` function from `@/lib/supabase/middleware` is called to:
 * 1. Check for Supabase environment variables and redirect to an error page if they are missing.
 * 2. Initialize the Supabase server client with cookies from the incoming request.
 * 3. Refresh the user's auth session if it's expired.
 * 4. Pass the updated session information to subsequent server components via response cookies.
 *
 * This ensures that user authentication state is always up-to-date and consistent
 * throughout the application.
 */

import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
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
}
