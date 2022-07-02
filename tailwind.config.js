/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "red-logo": "#F33B13",
        "purple-joker": "#644CF9",
        "gray-mission-box": "#55656F",
        "black-mission-box": "#0A0E21",
        "purple-search": "#08303C",
        "slate-lighter": "#3a4459",
        "slate-darker": "#111733",
        "slate-dark": "#252F45",
        slates: "#2D374C",
      },
      keyframes: {
        star: {
          "0%": { transform: "scale(1, 1)", opacity: "0" },
          "50%": { transform: "scale(3, 3)", opacity: "1" },
          "100%": { transform: "scale(1, 1)", opacity: "0" },
        },
      },
      animation: {
        star1: "star 2s linear infinite",
        star2: "star 2s linear 1s infinite",
        star3: "star 2s linear 0.5s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
