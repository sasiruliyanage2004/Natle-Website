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
        base: {
          DEFAULT: "#f8faff", 
          raised: "#ffffff",  
          border: "#e2e8f0",
        },
        accent: {
          cyan: "#0EA5E9",
          lime: "#5AEC8F",
          navy: "#1A3A8F",
        },
        ink: {
          DEFAULT: "#0a1628", 
          muted: "#475569",   
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
