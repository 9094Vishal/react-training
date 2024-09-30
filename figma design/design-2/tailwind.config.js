/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector"],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        btn: "#EE6C4D",
        darkBg: "#293241",
        secondry: "#FDBA0E",
      },
    },
  },
  plugins: [],
};
