import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
    publicRoutes:['/','/about-us','/contact-us','/f/(.*)']
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)',
    "/((?!_next/static|_next/image|favicon.ico|logo.svg).*)",
    "/",
    "/api/(.*)",
  ],
}