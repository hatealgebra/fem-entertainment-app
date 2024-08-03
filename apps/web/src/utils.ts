import { NextRequest } from "next/server";

export const getSearchParam = (req: NextRequest, key: string) => {
  const paramValue = req.nextUrl.searchParams.get(key);
  console.log({ key, paramValue });
  return paramValue;
};

export const getTokenSecret = async (
  tokenType: "refresh" | "access" = "access"
): Promise<Uint8Array | Error> => {
  const tokenTypeUpper = tokenType.toUpperCase();
  const tokenSecret = process.env[`${tokenTypeUpper}_TOKEN_SECRET`];

  if (!tokenSecret) {
    throw new Error(`Missing token ${tokenType} secret`);
  }

  const encodedTokenSecret = new TextEncoder().encode(tokenSecret);

  return encodedTokenSecret;
};
