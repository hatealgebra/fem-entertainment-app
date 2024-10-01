import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../helpers/server/errorHandler";
import { decodeJwt } from "jose";
import {
  deleteToken,
  generateToken,
  verifyToken,
} from "../../../helpers/server/handlingTokens";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json(
      {
        message: "Missing refresh token",
        body: false,
      },
      { status: 401 }
    );
  }

  const validRefreshToken = await verifyToken("refresh", refreshToken);
  if (!validRefreshToken) {
    return NextResponse.json(
      {
        message: "Invalid refresh token",
        body: false,
      },
      { status: 401 }
    );
  }

  const { id } = decodeJwt(refreshToken);

  if (!id) {
    deleteToken("refresh");
    deleteToken("access");

    return NextResponse.json(
      {
        message: "User id not provided",
        body: false,
      },
      { status: 401 }
    );
  }

  const accessToken = await generateToken(id as string, "access");

  const response = NextResponse.json("Access token generated successfully");

  response.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    sameSite: "strict",
  });

  return response;
});
