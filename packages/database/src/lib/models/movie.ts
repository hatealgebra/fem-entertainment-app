import mongoose, { Schema, model } from "mongoose";
import { IMovieBackend } from "@repo/misc/types/movies.d.ts";
const MovieSchema = new Schema<IMovieBackend>({
  _id: { name: String, type: mongoose.Schema.Types.ObjectId },
  adult: Boolean,
  budget: Number,
  genres: Array,
  id: Number,
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: String,
  production_countries: String,
  release_date: Date,
  revenue: Number,
  runtime: Number,
  spoken_languages: {
    iso_639_1: String,
    name: String,
  },
  status: String,
  tagline: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
});

const Movie =
  (mongoose.models?.Movie as mongoose.Model<IMovieBackend>) ||
  model("Movie", MovieSchema);

export default Movie;
