import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const { pathname } = request.nextUrl;
  const privateRoutes = ["/add-book", "/my-books", "/my-borrows"];
  const isPrivateBookDetails =
    pathname.startsWith("/books/") && pathname !== "/books";

  if (
    (privateRoutes.includes(pathname) || isPrivateBookDetails) &&
    !sessionCookie
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-book", "/my-books", "/my-borrows", "/books/:path*"],
};
