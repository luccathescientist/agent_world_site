import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Agent World palette — deep blues + gold from styles.css
        "aw-bg": "#0d1b2a",
        "aw-surface": "#1a2d42",
        "aw-border": "#2a4060",
        "aw-gold": "#f0c040",
        "aw-gold-dim": "#c09830",
        "aw-text": "#c8d8e8",
        "aw-muted": "#6080a0",
        "aw-green": "#40c080",
        "aw-red": "#c04040",
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
