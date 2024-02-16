/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        darkcolor: {
          50: "#C3C6DA",
          100: "#B4B7D0",
          200: "#9498BC",
          300: "#757AA9",
          400: "#5A6090",
          500: "#474B71",
          600: "#333652",
          700: "#292C42",
          800: "#1F2132",
          900: "#161723",
          950: "#0A0B14",
        },
        white: {
          50: "#999999",
          100: "#BFBFBF",
          200: "#D6D6D6",
          300: "#E4E4E4",
          400: "#EDEDED",
          500: "#F1F1F1",
          600: "#F5F5F5",
          700: "#F9F9F9",
          800: "#FCFCFC",
          900: "#FEFEFE",
          950: "#FFFFFF",
        },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "max-2xl": { max: "1535px" },
      "max-xl": { max: "1279px" },
      "max-lg": { max: "1023px" },
      "max-md": { max: "767px" },
      "max-sm": { max: "639px" },
    },
  },
  plugins: [],
};
