/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "san-serif"],
    },
    extend: {
      backgroundImage: {
        "banner-homepage": "url('./src/assets/HomePage/banner.png')",
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
