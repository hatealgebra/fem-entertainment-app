import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  console.log("Hello from middleware!");
  return NextResponse.next();
  //   return NextResponse.redirect(new URL("/home", request.url));
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
