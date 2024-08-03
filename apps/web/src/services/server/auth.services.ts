import { verifyToken } from "../../helpers/server/handlingTokens";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const authentication = async (
  accessToken?: RequestCookie,
  refreshToken?: RequestCookie
) => {
  const isAccessTokenLegit = await verifyToken("access", accessToken?.value);

  if (isAccessTokenLegit) {
    return new Response("Authenticated", {
      status: 200,
      headers: {
        "Set-Cookie": `accessToken=${accessToken?.value}; HttpOnly; SameSite=strict;`,
      },
    });
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/refreshToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken?.value,
        }),
        credentials: "include",
      }
    );

    const { status } = response;

    return status === 401 ? new Error("Refreshed token expired") : response;
  } catch (e) {
    return e;
  }
};
