import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "aw-bg": "#ffffff",
        "aw-surface": "#f9fafb",
        "aw-border": "#e5e7eb",
        "aw-text": "#111827",
        "aw-muted": "#6b7280",
        "aw-accent": "#111827",
        "aw-accent-hover": "#374151",
        "aw-green": "#16a34a",
        "aw-red": "#dc2626",
        "aw-code-bg": "#f3f4f6",
        "aw-code-text": "#111827",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
