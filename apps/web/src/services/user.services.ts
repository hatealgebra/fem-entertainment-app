import { SignUpFormValues } from "../components/forms/SignUpForm";

import { handleResponse } from "../helpers/client/services.helper";

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
