import Movie from "@repo/db/models/movie.ts";
import dbConnection from "@repo/db/dbConnection.ts";
import { NextRequest, NextResponse } from "next/server";
import { getSearchParam } from "../../../src/utils";

export async function GET(req: NextRequest) {
  const isTrending = getSearchParam(req, "isTrending");
  const isBookmarked = getSearchParam(req, "isBookmarked");
  const category = getSearchParam(req, "category");
  const searchParam = getSearchParam(req, "search")?.trim();
  const regex = new RegExp(searchParam || "");

  try {
    await dbConnection();

    const media = await Movie.find(isTrending ? { isTrending } : {})
      .find(category ? { category } : {})
      .find(isBookmarked ? { isBookmarked } : {})
      .find({
        title: {
          $regex: regex,
          $options: "i",
        },
      });

    return NextResponse.json(
      { data: media, totalLength: media.length },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
