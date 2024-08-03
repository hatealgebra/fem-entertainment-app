import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authentication } from "./services/server/auth.services";

const publicPaths = ["login", "signup"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isPublic = publicPaths.some((path) => pathname.includes(path));

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const authResponse = await authentication(accessToken, refreshToken);

  const notAuth = authResponse instanceof Error;

  if (isPublic && !notAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublic) {
    return NextResponse.next();
  }

  if (pathname.includes("/api")) {
    return;
    // handle the logic if the access token is not available
  }

  if (notAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();
  const accessTokenValue = authResponse.headers
    .getSetCookie()
    .toString()
    .split("=")[1]
    .split(";")[0];

  response.cookies.set({
    name: "accessToken",
    value: accessTokenValue,
    httpOnly: true,
  });

  return response;
};

export const config = {
  matcher: ["/api/:path*", "/", "/login", "/signup"],
};
