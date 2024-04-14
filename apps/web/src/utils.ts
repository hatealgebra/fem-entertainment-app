import { NextRequest } from "next/server";
import { Url } from "url";

export const getSearchParam = (req: NextRequest, key: string) => {
  const paramValue = req.nextUrl.searchParams.get(key);
  return paramValue;
};
