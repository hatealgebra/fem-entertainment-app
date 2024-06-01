import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { getTokenSecret } from "../../utils";
import { NEXT_PUBLIC_BASE_URL } from "./envVars";

import * as jose from "jose";

export const createToken = async (
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

export const verifiedRefreshToken = async (refreshTokenValue?: string) => {
  if (!refreshTokenValue) {
    return false;
  }

  try {
    const refreshSecret = await getTokenSecret("refresh");
    await jose.jwtVerify(refreshToken.value, refreshSecret);

    return true;
  } catch (e) {
    return false;
  }
};

export const verifyAccessToken = async () => {
  try {
    const accessToken = cookies().get("accessToken");
    const tokenSecret = await getTokenSecret("access");

    if (!accessToken || !tokenSecret) {
      throw new Error("Missing access token or token secret");
    }

    const result = await jose.jwtVerify(accessToken.value, tokenSecret);
    return true;
  } catch (e) {
    if (e.code === "ERR_JWT_EXPIRED") {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh`,
        {
          method: "GET",
        }
      );
    }
    return false;
  }
};
