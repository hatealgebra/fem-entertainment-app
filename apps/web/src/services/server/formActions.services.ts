"use server";

import User from "@repo/db/models/user.ts";
import dbConnect from "@repo/db/dbConnection.ts";
import { generateToken } from "../../helpers/server/handlingTokens";

export const loginAction = async (email: string, password: string) => {
  try {
    await dbConnect();
    const userDoc = await User.findOne({ email: email });
    if (!userDoc) {
      throw new Error("Authentication failed. Please check your credentials.");
    }
    console.log({ password });
    const pwdsAreMatching = userDoc.comparePassword(password);
    console.log("hey");

    if (!pwdsAreMatching) {
      throw new Error("Authentication failed. Please check your credentials.");
    }
    await generateToken(userDoc.email, "refresh");
  } catch (e) {
    throw new Error(e);
  }
};
