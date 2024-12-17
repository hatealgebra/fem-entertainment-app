import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../../helpers/server/errorHandler";
import dbConnect from "@repo/db/dbConnection.ts";
import User from "@repo/db/models/user.ts";
import { decryptToken } from "../../../../helpers/server/handlingTokens";
import Movie from "@repo/db/models/movie.ts";

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
  const movieDoc = await Movie.findOne({ id: movieId });

  if (!movieDoc) {
    return NextResponse.json(
      { message: "Movie does not exist in the database" },
      { status: 404 }
    );
  }

  const { _id } = movieDoc;

  const isAlreadyBookmarked = user.bookmarkedMovies.includes(_id);
  if (isAlreadyBookmarked) {
    await user.bookmarkedMovies.pull(_id);
  } else {
    await user.bookmarkedMovies.addToSet(_id);
  }

  await user.save();

  const message = isAlreadyBookmarked ? "Bookmark removed" : "Bookmark added";

  return NextResponse.json({ message }, { status: 200 });
});
