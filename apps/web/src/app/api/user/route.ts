import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../helpers/server/errorHandler";
import dbConnect from "@repo/db/dbConnection.ts";
import { decryptToken } from "../../../helpers/server/handlingTokens";
import User from "@repo/db/models/user.ts";

export const GET = withErrorHandler(async (req: NextRequest) => {
  await dbConnect();
  const accessToken = req.cookies.get("accessToken");

  if (!accessToken?.value) {
    return NextResponse.json(
      { message: "User data could not be fetched." },
      { status: 400 }
    );
  }

  const { value } = accessToken;
  const { id: email } = await decryptToken(value);

  if (!email) {
    return NextResponse.json(
      { message: "User data could not be fetched." },
      { status: 400 }
    );
  }

  const { bookmarkedMovies } = await User.findOne({ email: email });
  return NextResponse.json({ email, bookmarkedMovies }, { status: 200 });
});
