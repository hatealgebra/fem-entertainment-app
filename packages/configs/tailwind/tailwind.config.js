const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "380px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      red: "#FC4747",
      black: "#10141E",
      blue: "#5A698F",
      darkBlue: "#161D2F",
      dark: "#10141E",
      white: "#FFFFFF",
    },
    fontFamily: {
      primary: ["Outfit Variable", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.8125rem",
      base: "0.9375rem",
      xl: "1.125rem",
      "2xl": "1.5rem",
      "3xl": "1.5rem",
      "4xl": "2rem",
      "5xl": "2.5rem",
    },
    extend: {
      keyframes: {
        caret: {
          "50%": { borderColor: "transparent" },
        },
        movieDetail: {
          "0%": { background: "red", opacity: 0 },
          "50%": { background: "blue", opacity: 1 },
          "100%": { width: "90vw", height: "90vh" },
        },
      },
      animation: {
        caretBlink: "caret 1s infinite",
        openMovieDetail: "movieDetail 1s ease-in",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".remove-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".remove-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
