import { mutate } from "swr";

export const getMovieCredit = async (url: string) => {
  const response = await fetch(url, { method: "PATCH" });
  return response;
};

export const bookmarkMovie = async (movieId: number) => {
  const url = "/api/media/bookmark/";

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieId,
    }),
  });
  mutate("/api/user");
  return response;
};
