import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard", "/api/movies/:path*"] };
