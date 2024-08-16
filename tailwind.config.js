/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "app-pattern": "url('/src/assets/background.png')",
      }
    },
  },
  plugins: [],
}