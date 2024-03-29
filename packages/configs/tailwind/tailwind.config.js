module.exports = {
    content: [
      "../../packages/ui/**/*.{js,ts,jsx,tsx}",
      "./**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'red': '#FC4747',
        'black': '#10141E',
        'blue': '#5A698F',
        'darkBlue': '#161D2F',
        'white': '#FFFFFF',
      },
      fontFamily: {
        primary: ['Outfit Variable', 'sans-serif']
      },
      fontSize: {
        "sm": "1.3rem",
        "base": "1.5rem",
        'xl': "1.8rem",
        '2xl': '2.4rem',
        '3xl': '2.4rem',
        '4xl': '3.2rem',
      },
      extend: {},
    },
  };