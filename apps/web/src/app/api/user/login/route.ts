import dbConnection from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { NextRequest, NextResponse } from "next/server";

import withErrorHandler from "../../../../helpers/server/errorHandler";

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
        statusText: "Incorrect login",
      }
    );
  }
  const result = userDoc.comparePassword(password);

  return NextResponse.json(
    {
      message: "User signed in successfully",
    },
    { status: 200 }
  );
});
