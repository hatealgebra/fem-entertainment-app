import { Schema, model } from "mongoose";
import { ERating, IMovie, ECategory } from "@repo/misc/types/movies.d.ts";

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
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
    required: true,
    default: {},
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ECategory,
  },
  rating: {
    type: String,
    enum: ERating,
  },
  isBookmarked: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
});

export const Movie = model<IMovie>("Movie", movieSchema);
