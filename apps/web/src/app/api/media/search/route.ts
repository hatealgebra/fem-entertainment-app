import { NextRequest, NextResponse } from "next/server";
import withErrorHandler from "../../../../helpers/server/errorHandler";
import { getSearchParam } from "../../../../utils";
import dbConnect from "@repo/db/dbConnection.ts";
import { searchMovie } from "@repo/db/queries/movies.ts";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const searchParam = getSearchParam(req, "queryString")?.trim();
  console.log({ searchParam });
  if (!searchParam) {
    return NextResponse.json({}, { status: 400 });
  }

  await dbConnect();

  const movieData = await searchMovie(searchParam);

  return NextResponse.json({ data: movieData }, { status: 200 });
});
