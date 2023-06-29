/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "carousel-image": "calc((100vw - 2rem) / 10)",
      },
      spacing: {
        "carousel-image-gap": "1rem",
      },
    },
  },
  plugins: [],
};
