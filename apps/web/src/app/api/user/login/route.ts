import dbConnection from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { NextRequest, NextResponse } from "next/server";

import withErrorHandler from "../../../../helpers/server/errorHandler";
import { generateToken } from "../../../../helpers/server/handlingTokens";

export const POST = withErrorHandler(async (req: NextRequest) => {
  await dbConnection();
  const userCredentials = await req.json();
  const { email, password } = userCredentials;
  const userDoc = await User.findOne({ email: email.toLowerCase() });
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
  const refreshToken = await generateToken(userDoc.email, "refresh");

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
  await fetch(`${baseURL}/api/user/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userDoc.email, refreshToken }),
    credentials: "include",
  });

  return NextResponse.json(
    {
      success: true,
      refreshToken,
    },
    {
      status: 200,
      statusText: "Authentication successful",
    }
  );
});
