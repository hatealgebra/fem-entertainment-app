import dbConnection from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { NextRequest, NextResponse } from "next/server";
import { MongoError } from "mongodb";
import withErrorHandler from "../../../../helpers/server/errorHandler";

export const POST = withErrorHandler(async (req: NextRequest) => {
  try {
    await dbConnection();
    const userCredentials = await req.json();

    const user = new User(userCredentials);
    await user.save();
    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof MongoError && e.code === 11000) {
      return NextResponse.json(
        { error: "error", success: false },
        {
          status: 409,
          statusText: "User already exists",
        }
      );
    }
  }
});
