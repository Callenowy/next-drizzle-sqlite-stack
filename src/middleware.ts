import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROUTE } from '@/routes';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('authjs.session-token');

  if (!sessionToken && request.nextUrl.pathname !== ROUTE.LOGIN) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = ROUTE.LOGIN;
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.href);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|developer-logo|svg-sprites|icon-192.png|icon-512.png|icon.svg|apple-icon.png/).*)',
  ],
};
