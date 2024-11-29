import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authentication } from "./services/server/auth.services";

const publicPaths = ["login", "signup"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some((path) => pathname.includes(path));
  const isApi = pathname.includes("/api");

  if (isPublic) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const responseNext = NextResponse.next();
  const authResponse = (await authentication(accessToken, refreshToken)) as any;
  const isAuth = !(
    (await authResponse) instanceof Error || authResponse.status !== 200
  );

  if (isAuth) {
    const accessTokenValue = authResponse.headers
      .getSetCookie()
      ?.toString()
      ?.split("=")[1]
      ?.split(";")[0];
    responseNext.cookies.set({
      name: "accessToken",
      value: accessTokenValue,
      httpOnly: true,
    });
  }

  if (isApi) {
    return responseNext;
  }

  if (!isAuth && !isPublic) {
    console.log("should be prompted");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuth && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return responseNext;
};

export const config = {
  matcher: ["/api/:path*", "/", "/login", "/signup", "/bookmarked"],
};
