import dbConnect from "@repo/db/dbConnection.ts";
import withErrorHandler from "../../../../../helpers/server/errorHandler";
import Credit from "@repo/db/models/credit.ts";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = withErrorHandler(
  async (req: NextRequest, { params }: { params: Promise<{ id: number }> }) => {
    const id = (await params).id;
    await dbConnect();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const credit = await Credit.findOne({ id });

    if (credit) {
      return NextResponse.json(credit, { status: 200 });
    }

    const { TMDB_API_KEY } = process.env;
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };

    const response = await fetch(url, options);
    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Credit not found" },
        { status: 404 }
      );
    }
    const { cast: castArray, crew: crewArray, ...rest } = await response.json();

    const cast = castArray.slice(0, 10);
    const crew = crewArray.slice(0, 10);

    const _id = new mongoose.Types.ObjectId();
    const docObject = {
      _id,
      cast,
      crew,
      ...rest,
    };

    await new Credit(docObject).save();
    console.log("prompted");
    return NextResponse.json({ data: docObject }, { status: 200 });
  }
);
