"use client";

import CookieConsent from "react-cookie-consent";

const CookiesConsent = () => {
  return (
    <CookieConsent
      location="bottom"
      cookieName="firstCookie"
      expires={999}
      overlay
    >
      <p>
        This website uses technical cookies to run and by continuing you are
        taking it into account.
      </p>
      <br />
      <p>
        Disclaimer: This project is a personal portfolio piece created for
        educational and demonstration purposes only. It is not intended for
        commercial use and no revenue is generated from this project.
      </p>
      <br />
      <p>These resources were used in this project:</p>
      <ul>
        <li>
          <a className="underline" href="https://www.frontendmentor.io">
            https://www.frontendmentor.io
          </a>
        </li>
        <li>
          <a
            className="underline"
            href="https://developer.themoviedb.org/docs/getting-started"
          >
            TMDB API
          </a>
        </li>
      </ul>
    </CookieConsent>
  );
};

export default CookiesConsent;
