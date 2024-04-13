import { Schema } from "mongoose";
import { IUser } from "@repo/misc/types/user.d.ts";
import { IMongooseGeneric } from "@repo/misc/types/index.d.ts";

export const UserSchema = new Schema<IUser & IMongooseGeneric>({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 12,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
