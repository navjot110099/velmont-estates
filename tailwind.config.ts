import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Velmont palette — warm ink, marble, bronze
        ink: {
          DEFAULT: "#0a0a0b",
          soft: "#111113",
          800: "#16161a",
          700: "#1d1d22",
        },
        marble: {
          DEFAULT: "#f4f1ea",
          50: "#faf8f3",
          100: "#f4f1ea",
          200: "#e8e2d6",
          300: "#d9d1c0",
        },
        bronze: {
          DEFAULT: "#b08d57",
          light: "#c9a877",
          dark: "#8a6d3f",
          glow: "#d8b985",
        },
        stone: {
          DEFAULT: "#8a8578",
          light: "#a8a394",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.35em",
        wide2: "0.18em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxe-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-2%, 1%)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
