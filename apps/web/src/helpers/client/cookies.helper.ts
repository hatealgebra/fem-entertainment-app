const createSecureCookieObject = (name: string) => (value: string) => {
  return {
    name,
    value,
    httpOnly: true,
    sameSite: "lax",
  };
};

export const createAccessTokenCookie = createSecureCookieObject("accessToken");

export const createRefreshTokenCookie =
  createSecureCookieObject("refreshToken");
