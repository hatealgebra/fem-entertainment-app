import mongoose, { Schema, model } from "mongoose";
import { ERating, IMovie, ECategory } from "@repo/misc/types/movies.d.ts";

const MovieSchema = new Schema<IMovie>({
  title: {
    type: String,
  },
  thumbnail: {
    trending: {
      small: String,
      large: String,
    },
    regular: {
      small: String,
      medium: String,
      large: String,
    },
  },
  year: {
    type: Number,
  },
  category: {
    type: String,
    enum: ECategory,
  },
  rating: {
    type: String,
    enum: ERating,
  },
  isTrending: { type: Boolean, default: false },
});

const Movie =
  (mongoose.models?.Movie as mongoose.Model<IMovie>) ||
  model("Movie", MovieSchema);

export default Movie;
