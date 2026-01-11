import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#fdd22c",
        "main-dull": "#e3b609",
        "main-text": "#2e2726",
      },
      // ... your other theme extensions
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
};
