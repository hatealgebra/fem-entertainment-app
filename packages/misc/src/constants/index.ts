export enum APP_PATHS {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  MOVIES = "/movies",
  BOOKMARKED = "/bookmarked",
}

const { REGISTER, LOGIN, ...rest } = APP_PATHS;

export const NAV_PATHS = rest;
