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
        navy: {
          DEFAULT: "#0A1628",
          light: "#12203d",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#d9bc72",
          dark: "#a8872e",
        },
        "off-white": "#F8F8F6",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C9A84C 0%, #d9bc72 50%, #C9A84C 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
