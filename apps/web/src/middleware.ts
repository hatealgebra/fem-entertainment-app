import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtToken, verifyAccessToken } from "./helpers/server/handlingTokens";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  // console.log(request.cookies.getAll());
  const { pathname } = request.nextUrl;

  // const isAuthenticated = await verifyAccessToken();
  // console.log({ isAuthenticated });

  // if (pathname.startsWith("/login" || pathname.startsWith("/signup"))) {
  // }

  // const { pathname } = request.nextUrl;
  // const jwtToken = cookies().get("jwt");
  // console.log(jwtToken?.value);
  // if (pathname.startsWith("/login")) {x
  //   verifyToken();
  // }
  return NextResponse.next();
  //   return NextResponse.redirect(new URL("/home", request.url));
};
