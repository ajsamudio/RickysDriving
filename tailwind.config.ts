import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Asphalt — primary text and dark surfaces
        ink: {
          DEFAULT: "#15171C",
          light: "#23262E",
          soft: "#5B5F6A",
        },
        // Lane-line yellow — calls to action and highlights
        lane: {
          DEFAULT: "#FFC21A",
          light: "#FFD45C",
          strong: "#F2AF00",
          dark: "#8A6200",
        },
        // Freeway-sign green — badges, signage, secondary accents
        sign: {
          DEFAULT: "#0B6B43",
          light: "#12844F",
          dark: "#08502F",
        },
        paper: "#F5F1E8",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Overpass", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
