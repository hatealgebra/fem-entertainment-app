import { ServerError } from "./asyncError.helper";

export const handleResponse = (
  response: Response
): Promise<typeof ServerError | JSON> => {
  if (!response.ok) {
    throw new ServerError(response.statusText, response);
  }

  return response.json();
};
