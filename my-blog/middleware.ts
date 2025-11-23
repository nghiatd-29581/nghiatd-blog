import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASS) {
        return NextResponse.next();
      }
    }
    const url = req.nextUrl.clone();
    url.pathname = '/api/auth';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};