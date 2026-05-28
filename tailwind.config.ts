import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F2EEE8",
        white: "#FFFFFF",
        ink: "#292929",
        muted: "#6B6B6B",
        panel: "#E8E3DC",
        navy: "#101A25",
        "navy-deep": "#051227",
        green: "#6DAF33",
        "green-hover": "#5C962B",
        gold: "#FFBE49",
        "yacht-gold": "#D8A85E",
        "strip-cream": "#F4F1EA",
        "green-cta": "#6FA22F",
        border: "rgba(41, 41, 41, 0.1)",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        luxury: "12px",
        brand: "8px",
        pill: "100px",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(16, 26, 37, 0.06)",
        lift: "0 12px 40px rgba(16, 26, 37, 0.1)",
        card: "0 4px 24px rgba(16, 26, 37, 0.05)",
      },
      transitionDuration: {
        premium: "500ms",
      },
      screens: {
        tablet: "768px",
        desktop: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
