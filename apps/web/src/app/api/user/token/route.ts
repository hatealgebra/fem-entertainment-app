import dbConnection from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../../helpers/server/errorHandler";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = req.json();
  const { email, refreshToken } = await body;

  await dbConnection();

  const updateResult = await User.findOneAndUpdate(
    { email },
    { $push: { refreshTokens: refreshToken } }
  );

  if (!updateResult) {
    return NextResponse.json(
      {
        error: "error",
        success: false,
      },
      {
        status: 403,
        statusText: "Authentication failed",
      }
    );
  }

  return NextResponse.json(
    {
      message: "User signed in successfully",
    },
    { status: 200 }
  );
});

export const DELETE = withErrorHandler(async (req: NextRequest) => {
  const body = req.json();
  const { email, refreshToken } = await body;

  await dbConnection();

  await User.findOneAndUpdate(
    { email },
    { $pull: { refreshTokens: refreshToken } }
  );

  return NextResponse.json(
    {
      message: "The user was succesfully logged out.",
    },
    { status: 200 }
  );
});
