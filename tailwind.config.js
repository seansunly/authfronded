/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
    colors: {
      coffee: {
        light: '#D2B48C', // Light tan
        DEFAULT: '#8B4513', // Rich brown
        dark: '#4B3023', // Dark espresso
      },
      accent: "#FFC107",
      cream: '#FFF4E6', // Creamy beige
      accent: '#FFC107', // Accent yellow
    },
  },
  plugins: [flowbite.plugin()],
};
