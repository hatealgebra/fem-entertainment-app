import Movie from "../models/movie";

export const getTrending = async () => {
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

export const getBestRated = async () => {
  const bestRatedMovies = await Movie.find({
    adult: false,
    vote_count: { $gte: 20000 },
    vote_average: { $gte: 7 },
  })
    .sort({ vote_average: -1 })
    .limit(12)
    .lean()
    .exec();

  return bestRatedMovies;
};

export const getThisYear = async () => {
  const thisYearMovies = await Movie.find({
    adult: false,
    release_date: { $gte: new Date(2023, 1, 1), $lt: new Date(2024, 1, 1) },
    vote_count: { $gte: 1000 },
  })
    .sort({ vote_count: -1 })
    .lean()
    .limit(10);

  return thisYearMovies;
};

export const getPlanned = async () => {
  const plannedMovies = await Movie.find({
    adult: false,
    status: "Planned",
    backdrop_path: { $exists: true },
    poster_path: { $exists: true },
  })
    .sort({ popularity: -1 })
    .lean()
    .limit(10);

  return plannedMovies;
};

export const getByGenre = async (genre: string) => {
  const movies = await Movie.find({ genres: genre })
    .sort({ popularity: -1 })
    .limit(30)
    .lean();

  return movies;
};

export const searchMovie = async (searchString: string) => {
  const movies = await Movie.find()
    .find({
      title: {
        $regex: searchString,
        $options: "i",
      },
    })
    .limit(40)
    .exec();

  return movies;
};
