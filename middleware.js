import { NextResponse } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes = {
  '/verify': ['admin', 'verifier'],
  '/institution': ['admin', 'institution'],
  '/admin': ['admin'],
  '/dashboard': ['admin', 'verifier', 'institution']
};

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/unauthorized',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout'
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const requiredRoles = protectedRoutes[pathname];
  
  if (requiredRoles) {
    // In a real application, you would:
    // 1. Extract the JWT token from cookies/headers
    // 2. Verify the token
    // 3. Check user roles
    // 4. Redirect if unauthorized
    
    // For now, we'll let the client-side handle the protection
    // This middleware serves as a foundation for server-side protection
    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
