import mongoose, { Schema, model } from "mongoose";
import { ICreditBackend } from "@repo/misc/types/credit.d.ts";

const CreditSchema = new Schema<ICreditBackend>(
  {
    _id: {
      type: String,
      required: true,
    },
    cast: [],
    crew: [],
    id: Number,
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Credit =
  (mongoose.models?.Credit as mongoose.Model<ICreditBackend>) ||
  model("Credit", CreditSchema);

export default Credit;
