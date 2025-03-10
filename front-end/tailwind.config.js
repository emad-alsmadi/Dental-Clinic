/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,css,js,ts,jsx,tsx}",
    "./components/**/*.{html,css,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        // Our colors start
        darkColor: "#151515",
        lightColor: "#52525b",
        lightBg: "#F8F8FB",
        darkText: "#686e7d",
        lightBlue: "#7688DB",
        darkBlue: "#6c7fd8",
        // Our colors end
      }
    },
  },
  plugins: [],
}

