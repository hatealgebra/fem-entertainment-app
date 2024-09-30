import { NextRequest, NextResponse } from "next/server";

import withErrorHandler from "../../../../helpers/server/errorHandler";
import { cookies } from "next/headers";

export const DELETE = withErrorHandler(async (req: NextRequest) => {
  const cookieStore = cookies();
  cookieStore.delete("refreshToken");
  cookieStore.delete("accessToken");

  return NextResponse.json({ message: "Logged out" });
});
