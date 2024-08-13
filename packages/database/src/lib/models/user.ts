import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@repo/misc/types/user.d.ts";
import { IMongooseGeneric } from "@repo/misc/types/index.d.ts";
import bcrypt from "bcrypt";

export interface IUserMethods {
  comparePassword: () => boolean;
}

type TUser = IUser<mongoose.Schema.Types.ObjectId>;

type UserModel = Model<TUser, {}, IUserMethods>;

export const UserSchema = new Schema<TUser & IMongooseGeneric>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    bookmarkedMovies: {
      type: Array<mongoose.Schema.Types.ObjectId>,
      ref: "Movie",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
// TODO: Add error handling

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const generatedSalt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(
        this.password,
        parseInt(generatedSalt)
      );

      this.password = hashedPwd;
      return next();
    } catch (e) {
      return next(e);
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<TUser & IMongooseGeneric>("User", UserSchema);

export default User;
