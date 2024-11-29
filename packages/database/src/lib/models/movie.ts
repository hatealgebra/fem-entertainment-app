import mongoose, { Schema, model } from "mongoose";
import { IMovieBackend } from "@repo/misc/types/movies.d.ts";
const MovieSchema = new Schema<IMovieBackend>({
  _id: {
    type: String,
  },
  adult: {
    type: Boolean,
  },
  budget: {
    type: Number,
  },
  genres: {
    id: Number,
    name: String,
  },
  id: {
    type: Number,
  },
  imdb_id: {
    type: String,
  },
  original_language: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  poster_path: {
    type: String,
  },
  production_companies: {
    id: Number,
    name: String,
  },
  production_countries: {
    id: Number,
    name: String,
  },
  release_date: {
    id: Number,
    name: String,
  },
  revenue: {
    type: Number,
  },
  runtime: {
    type: Number,
  },
  spoken_languages: {
    iso_639_1: String,
    name: String,
  },
  status: {
    type: String,
  },
  tagline: {
    type: String,
  },
  title: {
    type: String,
  },
  video: {
    type: Boolean,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
});

const Movie =
  (mongoose.models?.Movie as mongoose.Model<IMovieBackend>) ||
  model("Movie", MovieSchema);

export default Movie;
