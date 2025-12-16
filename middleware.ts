
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    let hostname = req.headers.get("host") || "";

    // Normalize hostname to handle localhost port
    hostname = hostname.replace(":3000", "");

    // Define domains
    // In production: monportfolioweb.com
    // In dev: localhost
    const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

    // Check if it's a subdomain
    // logic: subdomain.domain.com
    const isSubdomain = hostname.includes(domain) &&
        hostname !== domain &&
        hostname !== `www.${domain}` &&
        hostname !== `app.${domain}`;

    // Extract the subdomain (username)
    // e.g. "madjid.monportfolioweb.com" -> "madjid"
    const subdomain = isSubdomain ? hostname.replace(`.${domain}`, "") : null;

    // ---------------------------------------------------------
    // SCENARIO 1: SUBDOMAIN (PORTFOLIO)
    // ---------------------------------------------------------
    if (isSubdomain && subdomain) {
        // Rewrite the request to our internal portfolio route
        // External: madjid.monportfolioweb.com/some-path
        // Internal: /portfolio/madjid/some-path
        return NextResponse.rewrite(
            new URL(`/portfolio/${subdomain}${url.pathname}`, req.url)
        );
    }

    // ---------------------------------------------------------
    // SCENARIO 2: MAIN APP (SAAS)
    // ---------------------------------------------------------
    // Here we handle auth protection for the dashboard/admin areas

    const protectedPaths = ["/dashboard", "/profile", "/update-profile", "/api/upload"];
    const isProtected = protectedPaths.some(path => url.pathname.startsWith(path));

    if (isProtected) {
        const token = await getToken({ req });

        if (!token) {
            const signInUrl = new URL("/sign-in", req.url);
            signInUrl.searchParams.set("callbackUrl", url.pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    // Allow normal traffic to main app
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api/auth routes (handled internally)
         * 2. /_next (Next.js internals)
         * 3. /static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
};
