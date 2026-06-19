import { NextRequest, NextResponse } from "next/server";

const PASSTHROUGH = /\.(?:jpg|jpeg|png|svg|webp|ico|gif|css|js|map|woff|woff2|ttf)$/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/splash" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    PASSTHROUGH.test(pathname)
  ) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/splash", request.url));
}

export const config = {
  matcher: "/:path*",
};
