import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { getTokenSecret } from "../../utils";

import * as jose from "jose";

export const generateToken = async (
  userId: string,
  tokenType: "access" | "refresh"
) => {
  const tokenSecret = await getTokenSecret(tokenType);
  if (!userId) {
    throw new Error("Missing userId or token secret");
  }

  const token = await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(tokenType === "refresh" ? "15m" : "30s")
    .sign(tokenSecret as Uint8Array);

  if (!token) {
    throw new Error("Could not create token");
  }

  const tokenName = `${tokenType}Token`;
  cookies().set({
    name: tokenName,
    value: token,
    httpOnly: true,
    sameSite: "lax",
  });

  return token;
};

export const verifyToken = async (
  tokenType: "access" | "refresh",
  token?: Uint8Array
) => {
  try {
    const tokenSecret = await getTokenSecret(tokenType);

    if (!token || !tokenSecret) {
      throw new Error("Missing access token or secret");
    }
    await jose.jwtVerify(token, tokenSecret);
    return true;
  } catch (e) {
    return false;
  }
};

export const decryptToken = async (token: string) => {
  const secret = await getTokenSecret("access");

  if (!secret) {
    throw new Error("Missing token secret");
  }
  const decodedJWT = jose.decodeJwt(token);
  return decodedJWT;
};

export const deleteToken = (tokenType: "access" | "refresh") => {
  cookies().delete(`${tokenType}Token`);
};
