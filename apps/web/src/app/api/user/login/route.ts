import dbConnection from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { NextRequest, NextResponse } from "next/server";

import withErrorHandler from "../../../../helpers/server/errorHandler";
import { createToken } from "../../../../helpers/server/handlingTokens";
import { NEXT_PUBLIC_BASE_URL } from "../../../../helpers/server/envVars";

export const POST = withErrorHandler(async (req: NextRequest) => {
  await dbConnection();
  const userCredentials = await req.json();
  const { email, password } = userCredentials;
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
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
  const pwdsAreMatching = userDoc.comparePassword(password);

  if (!pwdsAreMatching) {
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
  // create access token
  await createToken(userDoc.email, "access");
  //create refresh token
  const refreshToken = await createToken(userDoc.email, "refresh");
  await fetch(`${NEXT_PUBLIC_BASE_URL}/api/user/token`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userDoc.email, refreshToken }),
  });

  return NextResponse.json(
    {
      message: "User signed in successfully",
    },
    { status: 200 }
  );
});
