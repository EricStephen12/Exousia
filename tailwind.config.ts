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
        black: "#0A0A0A",
        cream: "#F5F2E9",
        gold: "#C9A96E",
        "gold-light": "rgba(201, 169, 110, 0.2)",
        "cream-light": "rgba(245, 242, 233, 0.7)",
        "black-light": "rgba(10, 10, 10, 0.8)",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        "clash-display": ["var(--font-clash-display)", "Georgia", "serif"],
        didot: ["Didot", "serif"],
        playfair: ["var(--font-playfair)", "serif"],
        "neue-haas": ["Helvetica Neue", "Arial", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "Helvetica", "Arial", "sans-serif"],
        manrope: ["system-ui", "sans-serif"],
        italiana: ["var(--font-italiana)", "Georgia", "Times New Roman", "serif"],
        parisienne: ["cursive"],
        "dancing-script": ["cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "scroll": "scroll 20s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow": "glow 1.5s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(201, 169, 110, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(201, 169, 110, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config; 