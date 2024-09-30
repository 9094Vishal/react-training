/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        DM: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        form: "url('./assets/form.png')",
      },
      colors: {
        primaryBg: "#2F1893",
        primary: "#2F1893",
        text: "#FFFFFF",
        button: "#482BE7",
        button2: "#25DAC5",
        button3: "#1DA1F2",
      },
    },
  },
  plugins: [],
};
