import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isSignInRoute = createRouteMatcher(["/admin/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // Don't protect the sign-in page itself to avoid redirect loops
    if (isSignInRoute(req)) {
        return;
    }
    // Protect all other admin routes — require authentication
    if (isAdminRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
