import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a3e635",
          secondary: "#8fc43d",
          accent: "#00aaab",
          neutral: "#005942",
          "base-100": "#f3f6e7",
          info: "#34d399",
          success: "#a3e635",
          warning: "#f59e0b",
          error: "#dc2626",
        },
      },
      {
        mytheme2: {
          primary: "#ffffff",
          secondary: "#ffffff",
          accent: "#ffffff",
          neutral: "#000000",
          "base-100": "#5a5a5a",
          info: "#34d399",
          success: "#a3e635",
          warning: "#f59e0b",
          error: "#dc2626",
        },
      },
    ],
  },
};

export default config;
