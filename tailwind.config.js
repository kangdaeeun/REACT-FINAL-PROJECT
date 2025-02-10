/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-mint": "#56828C",
        "black-blue": "#395359",
        "selected-white": "#F2F2F2",
        "selected-gray": "#A6A6A6",
      },
    },
  },
  plugins: [],
};
