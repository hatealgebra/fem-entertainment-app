export const APP_PATHS = {
  home: "/",
  login: "/login",
  register: "/register",
  movies: "/movies",
  tv_series: "/tv-series",
  bookmarked: "/bookmarked",
};

const { register, login, ...rest } = APP_PATHS;

export const NAV_PATHS = rest;
