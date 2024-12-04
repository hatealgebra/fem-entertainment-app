import { NextRequest } from "next/server";

export const getSearchParam = (req: NextRequest, key: string) => {
  const paramValue = req.nextUrl.searchParams.get(key);
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

export const snakeCaseToCamelCase = (value: string) => {
  const splittedValue = value.split("_");

  if (splittedValue.length === 1) {
    return value;
  }

  const transformedValue = splittedValue
    .map((word, index) =>
      index !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join("");

  return transformedValue;
};

export const transformObjectArray = (objectArray: Object[]) => {
  const entries = Object.entries(objectArray);
  const transformedObject = entries.reduce((acc, [key, value]) => {
    if (key === "_id") {
      return { ...acc, [key]: value };
    }

    const transformedKey = snakeCaseToCamelCase(key);
    return { ...acc, [transformedKey]: value };
  }, {});
  return transformedObject;
};
