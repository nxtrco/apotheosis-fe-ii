import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/admin', '/settings'];
  
  // Auth routes (login/signup) - redirect to dashboard if already logged in
  const authRoutes = ['/signin', '/signup'];
  
  
  // Public routes that don't require authentication

  const publicRoutes = ['/blocked'];
  
  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname === route
  );
  
  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route
  );
  
  // If trying to access a protected route without a token
  if (isProtectedRoute && !token && !isPublicRoute) {
    const url = new URL('/signin', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  // If trying to access login/signup while already logged in
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/settings/:path*', '/signin', '/signup', '/blocked'],
};