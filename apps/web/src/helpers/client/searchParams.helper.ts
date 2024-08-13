import { NAV_PATHS } from "@repo/misc/constants";

const pathnameTranslate = {
  [NAV_PATHS.MOVIES]: "category=Movie",
  [NAV_PATHS.TV_SERIES]: "category=TV Series",
  [NAV_PATHS.BOOKMARKED]: "category=Bookmarked",
};

export const createQueryParams = (
  pathname: string,
  searchQuery: string | null
) => {
  const pathnameParam =
    pathnameTranslate[pathname as keyof typeof pathnameTranslate] || "";
  const searchParam = searchQuery ? `search=${searchQuery}` : "";
  const queryParamsArr = [pathnameParam, searchParam];

  const queryParams =
    queryParamsArr.length > 0 ? `?${queryParamsArr.join("&")}` : "";

  return queryParams;
};
