import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const adminRoutes = ["/admin"];
  const isAuthRoute = adminRoutes.some(
    (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`),
  );
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Only protect /admin and subroutes
  if (!isAuthRoute) {
    return NextResponse.next();
  }

  // Get and verify cookie
  const cookie = request.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Protect admin routes
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If already logged in, skip login page
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|content|favicon.ico).*)"],
};
