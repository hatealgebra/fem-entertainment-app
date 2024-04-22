export enum APP_PATHS {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  MOVIES = "/movies",
  TV_SERIES = "/tv-series",
  BOOKMARKED = "/bookmarked",
}

const { REGISTER, LOGIN, ...rest } = APP_PATHS;

export const NAV_PATHS = rest;
