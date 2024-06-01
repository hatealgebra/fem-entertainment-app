import { SignUpFormValues } from "../../components/forms/SignUpForm";

import { handleResponse } from "../../helpers/client/services.helper";

// TODO: Add Checking of the passwords on the backend

export const createUser = async (
  url: string,
  { arg: { email, pwd } }: { arg: SignUpFormValues }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: pwd }),
  });
  return handleResponse(response);
};

export const signInUser = async (
  url: string,
  { arg: { email, pwd } }: { arg: SignUpFormValues }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: pwd }),
  });
  return handleResponse(response);
};
