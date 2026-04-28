import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        white: "#F1F1F1",
        silver: "#b5b5b3",
        charcoal: "#4c4b4b",
        black: "#171719",
        // semantic aliases
        bg: "#171719",
        surface: "#1e1e20",
        "surface-2": "#26262a",
        border: "#4c4b4b",
        "border-subtle": "#2e2e32",
        text: "#F1F1F1",
        muted: "#b5b5b3",
        accent: "#F1F1F1",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-up": "fade-up 0.7s ease-out forwards",
        "pulse-dot": "pulse-dot 2.5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      boxShadow: {
        glow: "0 0 32px rgba(241,241,241,0.06)",
        card: "0 1px 3px rgba(0,0,0,0.4), 0 1px 1px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
