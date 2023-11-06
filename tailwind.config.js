/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        base: "1rem",
        md: "1.25rem",
        lg: "1.5rem",
        xl: "1.75rem",
        "2xl": "2rem",
        "header-height": "110px",
        "subsidebar-width": "230px",
        "layout-margin": "106px",
        "row-height": "50px",
      },

      minHeight: {
        "min-height": "110px",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-flip"),
  ],
  themes: ["dark"],
};
