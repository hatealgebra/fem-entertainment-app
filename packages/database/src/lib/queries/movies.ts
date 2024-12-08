import dbConnect from "../dbConnection";
import Movie from "../models/movie";

export const getTrending = async () => {
  await dbConnect();

  const trendingMovies = await Movie.find({
    adult: false,
    popularity: { $gte: 100 },
  })
    .sort({ popularity: -1 })
    .limit(10)
    .lean()
    .exec();

  const moviesArray = Object.values(trendingMovies);

  return moviesArray;
};
