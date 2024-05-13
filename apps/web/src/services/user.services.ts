import { SignUpFormValues } from "../components/forms/SignUpForm";
import { ServerError } from "../helpers/client/asyncError.helper";

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
  if (!response.ok) {
    throw new ServerError(response.statusText, response);
  }

  return response.json();
};
