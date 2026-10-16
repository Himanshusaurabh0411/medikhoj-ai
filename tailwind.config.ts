import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Bespoke Swiss-Apothecary Identity
        chalk: {
          50: "#FAF9F5",
          100: "#F5F3ED",
          200: "#ECE8DE",
          300: "#DDD7C8",
          400: "#C4BCAC",
          500: "#9A907E",
        },
        obsidian: {
          800: "#1E2633",
          900: "#0F1724",
          950: "#090E17",
        },
        // Indian Apothecary Green
        apothecary: {
          50: "#EDF7F2",
          100: "#D3EDE0",
          200: "#A8DBC1",
          500: "#1A8258",
          600: "#116844",
          700: "#0C5134",
          800: "#093F28",
          900: "#05291A",
        },
        // Saffron Terracotta Accent (Medicinal warmth & Indian origin)
        saffron: {
          50: "#FFF4EC",
          100: "#FFE6D5",
          200: "#FFC9A8",
          500: "#E8590C",
          600: "#D9480F",
          700: "#B83A09",
          800: "#902D05",
        },
        // Surgical Medical Red (Statutory Lal Lakir & Red Line alerts)
        surgical: {
          50: "#FFF0F2",
          100: "#FFE0E4",
          500: "#E02438",
          600: "#C8162A",
          700: "#A50E20",
        },
        // Clinical Laboratory Blue (Pharmacopoeial Trust)
        cobalt: {
          50: "#F0F7FF",
          100: "#DFEEFF",
          500: "#1877F2",
          600: "#0E5FCC",
          700: "#0B4BA3",
          900: "#082F66",
        }
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        'flat': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 30px -5px rgba(9, 14, 23, 0.08), 0 4px 6px -2px rgba(9, 14, 23, 0.02)',
        'blister': 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
