import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This middleware protects all routes including api/trpc routes
export default clerkMiddleware(async (auth, req) => {
  // Public routes that don't require authentication
  const isPublicRoute = createRouteMatcher([
    "/",
    "/shop",
    "/shop/products(.*)",
    "/shop/collections(.*)",
    "/about",
    "/contact",
    "/faq",
    "/terms",
    "/privacy-policy",
    "/cookie-policy",
    "/size-guide",
    "/shipping",
    "/track-order",
    "/api/webhook(.*)",
    "/api/products(.*)",
    "/api/collections(.*)",
    "/api/public(.*)",
  ]);
  
  // If not a public route, protect it
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 