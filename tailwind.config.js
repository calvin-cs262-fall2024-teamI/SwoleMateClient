/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mine: {
          DEFAULT: "#fff",
          dark: "#000",
        },
      },
    },
  },
  plugins: [],
};
