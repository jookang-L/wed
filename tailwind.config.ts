import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
      },
      fontFamily: {
        // 기본 UI (시스템 폰트)
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // 한글 본문 (Gowun Batang) - next/font에서 로드
        korean: ["var(--font-body)", "'Gowun Batang'", "serif"],
        // 제목 (MaruBuri) - CSS @font-face에서 로드
        title: ["'MaruBuri'", "var(--font-title)", "serif"],
        // 영문 필기체 (Alex Brush) - next/font에서 로드
        script: ["var(--font-script)", "'Alex Brush'", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;

