import Movie from "@repo/db/models/movie.ts";
import dbConnection from "@repo/db/dbConnection.ts";
import { NextRequest, NextResponse } from "next/server";
import { getSearchParam } from "../../../src/utils";

export async function GET(req: NextRequest) {
  const isTrending = getSearchParam(req, "isTrending");
  try {
    await dbConnection();

    const movie = await Movie.find(isTrending ? { isTrending: true } : {});

    return NextResponse.json({ data: movie }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
