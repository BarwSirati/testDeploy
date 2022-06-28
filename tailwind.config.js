/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "red-logo": "#F33B13",
        "purple-joker": "#644CF9",
        "gray-mission-box": "#55656F",
        "black-mission-box": "#0A0E21",
        "purple-search": "#08303C",
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
