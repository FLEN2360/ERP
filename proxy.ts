import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

const staticPaths = [
  '/_next/',
  '/static/',
  '/favicon.ico',
  '/images/',
  '/assets/',
  '/fonts/',
  '/public/',
  '/background.jpg',
  '/logo.png',
  '/logo1.jpg',
];

const PUBLIC_ROUTES = ['/login', '/api/auth'];

/**
 * Authentication proxy for protected routes.
 *
 * Redirects unauthenticated users to the login page. Public routes and static
 * assets bypass authentication checks.
 *
 * @example
 * To make a route public, add it to PUBLIC_ROUTES:
 * ```ts
 * const PUBLIC_ROUTES = ['/login', '/register', '/api/auth'];
 * ```
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStatic = staticPaths.some((path) => pathname.startsWith(path));
  const isPublic = PUBLIC_ROUTES.some((path) => pathname.startsWith(path));

  if (isStatic || isPublic) {
    console.log('isStaticisPublicpathname', pathname);
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.log('sessionpathname', pathname);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin role for /admin routes
  if (pathname.startsWith('/admin')) {
    const isAdmin = session.user.role === 'admin';

    if (!isAdmin) {
      const homeUrl = new URL('/', request.url);
      homeUrl.searchParams.set('error', 'admin_required');
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}
