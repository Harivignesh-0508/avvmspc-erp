/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7A1E1E",
          dark: "#5A1515",
          light: "#9B2525",
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          dark: "#EDE8D8",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E0B93A",
        },
        charcoal: {
          DEFAULT: "#2B2B2B",
          light: "#3D3D3D",
        },
        dark: {
          bg: "#0F1117",
          card: "#1A1D27",
          border: "#2A2D3A",
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
