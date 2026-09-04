import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NATLE Technologies brand tokens — do not use ad-hoc hex values
        // elsewhere in the app; reference these instead.
        base: {
          DEFAULT: "#070D24", // Deep Space Navy — page background
          raised: "#0d1535",  // card surface (used with /60 opacity for glass)
          border: "#151f47",
        },
        accent: {
          cyan: "#0EA5E9",
          lime: "#5AEC8F",
        },
        ink: {
          DEFAULT: "#E7ECFB", // primary body text on dark bg
          muted: "#8C97BE",   // secondary/body-muted text
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #0EA5E9 0%, #5AEC8F 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(90,236,143,0.15) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(90,236,143,0.35)",
        "glow-cyan": "0 0 40px -10px rgba(14,165,233,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(2%, -3%) scale(1.05)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
