import { mutate } from "swr";
import { SignUpFormValues } from "../../components/forms/SignUpForm";

import { handleResponse } from "../../helpers/client/services.helper";
import { LoginFormValues } from "../../components/forms/LoginForm";

export const createUser = async (
  url: string,
  { arg: { email, pwd } }: { arg: SignUpFormValues }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.toLowerCase(), password: pwd }),
  });
  return handleResponse(response);
};

export const signInUser = async (
  url: string,
  { arg: { email, pwd } }: { arg: LoginFormValues }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.toLowerCase(), password: pwd }),
  });
  return handleResponse(response);
};

export const bookmarkMovie = async (movieId: number) => {
  const url = "/api/media/bookmark";

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
  mutate("api/media?category=bookmarked");
  return response;
};

export const getUserInfo = async () => {
  const url = `/api/user`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};
