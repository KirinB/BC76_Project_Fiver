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
        domine: ["Domine"],
      },
      colors: {
        primary: "#1dbf73",
        second: "#e8faf4",
        blackSecond: "#222325",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
