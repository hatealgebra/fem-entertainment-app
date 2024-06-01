import dbConnection from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../helpers/server/errorHandler";
import { cookies } from "next/headers";
import {
  createToken,
  verifiedRefreshToken,
} from "../../../helpers/server/handlingTokens";
import { redirect } from "next/navigation";

export const GET = withErrorHandler(async (req: NextRequest) => {
  console.log(req.cookies.getAll());
  // console.log("I'M REFRESHING THE ACCESS TOKEN");
  const refreshCookie = cookies().get("refreshToken");
  // console.log(refreshCookie);
  const { email, refreshToken } = refreshCookie;
  await dbConnection();
  // console.log({ email, refreshToken });
  const userInstance = await User.findOne({ email });
  const selectedToken = userInstance?.refreshTokens.find(
    (token) => token === refreshToken
  );

  const refreshTokenVerified = await verifiedRefreshToken(selectedToken);
  if (!selectedToken || !refreshTokenVerified) {
    cookies().delete("refreshToken");
    return NextResponse.redirect("/login");
  }
  const accessToken = await createToken(email, "access");

  cookies().set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  // console.log({ accessToken });

  return NextResponse.json(
    {
      message: "Access token created successfully",
      body: true,
    },
    { status: 200 }
  );
});
