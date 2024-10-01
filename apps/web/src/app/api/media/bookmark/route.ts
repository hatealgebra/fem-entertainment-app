import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../../helpers/server/errorHandler";
import dbConnect from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { decryptToken } from "../../../../helpers/server/handlingTokens";

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const token = req.cookies.getAll()[0];

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 400 });
  }
  const { id: email } = await decryptToken(token.value);
  const body = await req.json();
  const { movieId } = body;

  await dbConnect();
  const user = await User.findOne({ email: email as string });

  if (!user || !movieId) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const isAlreadyBookmarked = user.bookmarkedMovies.includes(movieId);
  if (isAlreadyBookmarked) {
    await user.bookmarkedMovies.pull(movieId);
  } else {
    await user.bookmarkedMovies.addToSet(movieId);
  }

  await user.save();

  const message = isAlreadyBookmarked ? "Bookmark removed" : "Bookmark added";

  return NextResponse.json({ message }, { status: 200 });
});
