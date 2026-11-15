/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mercenary: {
          primary: "#e31c25",
          secondary: "#ffd700",
          bg: "#0a0a0a",
          card: "#1a0a0a",
        }
      }
    }
  },
  plugins: []
}
