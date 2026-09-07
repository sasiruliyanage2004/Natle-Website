import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#1A1A1A",
        },
        azure: {
          DEFAULT: "#1E7FE8",
          light: "#5CA8F5",
        },
        primary: {
          DEFAULT: "#1E7FE8",
          hover: "#1565C0",
        },
        teal: {
          DEFAULT: "#12B8A6",
        },
        lime: {
          DEFAULT: "#6FCF3E",
          light: "#9AE85C",
        },
        mist: "#F5F8FB",
        paper: "#FCFDFE",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(100deg, #1E7FE8 0%, #12B8A6 55%, #6FCF3E 100%)",
        "brand-gradient-soft": "linear-gradient(120deg, rgba(30,127,232,0.10) 0%, rgba(18,184,166,0.10) 55%, rgba(111,207,62,0.10) 100%)",
        "ink-gradient": "linear-gradient(160deg, #090A0F 0%, #171922 100%)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(11,30,61,0.06), 0 12px 32px -18px rgba(11,30,61,0.25)",
      },
      maxWidth: {
        content: "1240px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;


