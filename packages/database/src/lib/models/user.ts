import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "@repo/misc/types/user.d.ts";
import { IMongooseGeneric } from "@repo/misc/types/index.d.ts";
import bcrypt from "bcrypt";

interface IUserMethods {
  comparePassword: () => boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

export const UserSchema = new Schema<IUser & IMongooseGeneric>(
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
    refreshTokens: {
      type: [String],
      default: [],
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
      const hashedPwd = await bcrypt.hash(this.password, generatedSalt);

      this.password = hashedPwd;
      return next();
    } catch (e) {
      return next(e);
    }
  }
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compareSync(
    candidatePassword,
    "$2a$10$qBLIR64HUMqljvYECFn2DuGoyJdd.8wVoeoXq30LsmyWrfbxy713C"
  );
};

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<IUser & IMongooseGeneric>("User", UserSchema);

export default User;
