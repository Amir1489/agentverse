import { NextRequest, NextResponse } from "next/server";

// Lightweight edge check: only looks for the session cookie's presence.
// Full verification (JWT + DB session) happens in getCurrentUser() on the
// server, which every protected page/route also calls.
const SESSION_COOKIE = "agentverse_session";
const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_PAGES = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) && !hasCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (AUTH_PAGES.includes(pathname) && hasCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
