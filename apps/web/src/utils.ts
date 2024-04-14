import { NextRequest } from "next/server";

export const getSearchParam = (req: NextRequest, key: string) => {
  const paramValue = req.nextUrl.searchParams.get(key);
  return paramValue;
};
