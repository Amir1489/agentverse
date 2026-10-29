import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#141413",
        surface: "#1C1B19",
        surface2: "#242320",
        border: "#33312C",
        ink: "#FAF9F5",
        muted: "#B8B5AC",
        faint: "#8A8778",
        accent: "#D97757",
        accent2: "#E8927C",
      },
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
