import Movie from "@repo/db/models/movie.ts";
import dbConnection from "@repo/db/dbConnection.ts";

export async function GET() {
  try {
    await dbConnection();

    const movie = await Movie.find({});
    return Response.json({ movie }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
