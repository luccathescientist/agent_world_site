import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        "aw-bg":           "rgb(var(--aw-bg) / <alpha-value>)",
        "aw-surface":      "rgb(var(--aw-surface) / <alpha-value>)",
        "aw-border":       "rgb(var(--aw-border) / <alpha-value>)",
        "aw-text":         "rgb(var(--aw-text) / <alpha-value>)",
        "aw-muted":        "rgb(var(--aw-muted) / <alpha-value>)",
        "aw-accent":       "rgb(var(--aw-accent) / <alpha-value>)",
        "aw-accent-hover": "rgb(var(--aw-accent-hover) / <alpha-value>)",
        "aw-green":        "rgb(var(--aw-green) / <alpha-value>)",
        "aw-red":          "rgb(var(--aw-red) / <alpha-value>)",
        "aw-code-bg":      "rgb(var(--aw-code-bg) / <alpha-value>)",
        "aw-code-text":    "rgb(var(--aw-code-text) / <alpha-value>)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
