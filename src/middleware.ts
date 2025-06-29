import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/shop(.*)',
  '/about',
  '/contact',
  '/faq',
  '/terms',
  '/privacy-policy',
  '/cookie-policy',
  '/size-guide',
  '/shipping',
  '/track-order',
  '/api/webhook(.*)',
  '/api/products(.*)',
  '/api/collections(.*)',
  '/api/public(.*)',
];

const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace(/\*/g, '.*')}$`);
    return regex.test(path);
  });
};

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = new URL(req.url);
  
  // If it's a public route, allow access
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // For all other routes, require authentication
  const session = await auth();
  if (!session) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};