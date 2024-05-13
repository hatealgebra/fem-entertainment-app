import mongoose, { Schema } from "mongoose";
import { IUser } from "@repo/misc/types/user.d.ts";
import { IMongooseGeneric } from "@repo/misc/types/index.d.ts";
import bcrypt from "bcrypt";

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
  // generate salt
  if (this.isModified("password")) {
    try {
      const saltedPwd = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(saltedPwd, 10);

      this.password = hashedPwd;
      return next();
    } catch (e) {
      return next(e);
    }
  }
  next();
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: any
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User =
  mongoose.models.User ||
  mongoose.model<IUser & IMongooseGeneric>("User", UserSchema);

export default User;
