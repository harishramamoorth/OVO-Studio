import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          950: "#10070F", // Main Background
          900: "#170B15", // Secondary Background
          850: "#21101E", // Card Background
          800: "#291321", // Elevated Surface
        },
        champagne: {
          400: "#D6B65A", // Accent Champagne Gold
          500: "#B9974B", // Soft Gold
        },
        beige: {
          50: "#F4EEE5", // Primary Text
          200: "#C8BDB7", // Secondary Text
          300: "#A39790",
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
