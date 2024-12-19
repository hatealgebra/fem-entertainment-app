import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authentication } from "./services/server/auth.services";

const publicPaths = ["login", "signup"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isApi = pathname.includes("/api");
  const isPublic =
    !isApi && publicPaths.some((path) => pathname.includes(path));

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const responseNext = NextResponse.next();
  const authResponse = (await authentication(accessToken, refreshToken)) as any;
  const isAuth = !(
    (await authResponse) instanceof Error || authResponse.status !== 200
  );

  console.log({ pathname, isPublic, isApi, isAuth });
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

  if (!isPublic && !isApi && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isApi && !isAuth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (isAuth && isPublic) {
    console.log("prompted");
    return NextResponse.redirect(new URL("/", request.url));
  }
  return responseNext;
};

export const config = {
  matcher: [
    "/api/user",
    "/api/media/:path*",
    "/",
    "/login",
    "/signup",
    "/bookmarked",
  ],
};
