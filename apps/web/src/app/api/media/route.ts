import Movie from "@repo/db/models/movie.ts";
import dbConnection from "@repo/db/dbConnection.ts";
import { NextRequest, NextResponse } from "next/server";
import { getSearchParam } from "../../../utils";
import withErrorHandler from "../../../helpers/server/errorHandler";
import { decryptToken } from "../../../helpers/server/handlingTokens";
import User from "@repo/db/models/user.ts";
import {
  getBestRated,
  getPlanned,
  getThisYear,
  getTrending,
} from "@repo/db/queries/movies.ts";

const queryTypes = {
  bestRated: getBestRated(),
  thisYear: getThisYear(),
  planned: getPlanned(),
};

export const GET = withErrorHandler(async (req: NextRequest) => {
  const isTrending = getSearchParam(req, "isTrending");
  const queryType = getSearchParam(req, "queryType");
  const category = getSearchParam(req, "category");
  const searchParam = getSearchParam(req, "search")?.trim();
  const regex = new RegExp(searchParam || "");

  try {
    await dbConnection();

    if (isTrending) {
      const queryResult = await getTrending();
      return NextResponse.json({ data: queryResult }, { status: 200 });
    }
    const accessToken = req.cookies.get("accessToken")?.value;

    if (category === "Bookmarked" && accessToken) {
      const accessToken = req.cookies.get("accessToken")?.value;
      const tokenPayload = await decryptToken(accessToken!);
      const { id: email } = tokenPayload;

      const user = await User.findOne({ email: email as string })
        .populate("bookmarkedMovies")
        .exec();

      return NextResponse.json(
        {
          data: user?.bookmarkedMovies,
          totalLength: user?.bookmarkedMovies.length,
        },
        { status: 200 }
      );
    }

    if (queryType) {
      const data = await queryTypes[queryType];
      return NextResponse.json(
        { data, totalLength: data.length },
        { status: 200 }
      );
    }

    const media = await Movie.find(isTrending ? { isTrending } : {})
      .find(category ? { category } : {})
      .find({
        title: {
          $regex: regex,
          $options: "i",
        },
      })
      .limit(20)
      .exec();

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
});
