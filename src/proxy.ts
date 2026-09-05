import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import { createRouteMatcher } from './utils/routeMatcher';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/:locale/dashboard(.*)']);

export default function proxy(request: NextRequest) {
  if (isProtectedRoute(request) && !getSessionCookie(request)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set(
      'callbackUrl',
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.+\\.[\\w]+$|_next|api|trpc).*)', '/'],
};
