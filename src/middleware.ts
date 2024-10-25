import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Get JWT
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  /////////
  console.log('User ID from token:', token.id);

  return NextResponse.next();
}

// Protected routes
export const config = {
  matcher: ['/profile/:path*'],
};
