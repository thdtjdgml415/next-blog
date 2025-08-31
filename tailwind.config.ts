import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        ST_primary: "#0C0E22", // 메인 컬러
        ST_accent: "#22d3ee", // 강조 컬러
        ST_asist: "#ffffff", // 보조 컬러
        ST_postive: "#9370DB", // 긍정 컬러
        ST_negative: "#F28858", // 긍정 컬러
        ST_disable: "#666666", // 비활성화
        ST_grayHover1: "#dfe2ea20", // 호버색상
        ST_placeHolder: "#707070", // placeholder
        ST_white_opacity_10: "#ffffff1a", // 투명도

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        list: {
          DEFAULT: "hsl(var(--list))",
          foreground: "hsl(var(--list-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(24px)", opacity: "0" },
        },
        "fade-in-right": {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-24px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out-left": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-24px)", opacity: "0" },
        },

        typewriter: {
          to: { left: "100%" },
        },
        blink: {
          "0%": { opacity: "0" },
          "0.1%": { opacity: "1" },
          "50%": { opacity: "1" },
          "50.1%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 500ms ease-out forwards",
        "slide-out-right": "slide-out-right 500ms ease-in forwards",
        "slide-in-left": "slide-in-left 300ms ease-out forwards",
        "slide-out-left": "slide-out-left 200ms ease-in forwards",
        "fade-in-right": "fade-in-right 500ms ease-out forwards",
        typewriter: "typewriter 2s steps(25) forwards",
        caret:
          "typewriter 2s steps(25) forwards, blink 1s steps(1) infinite 2s",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animation-delay"),
  ],
} satisfies Config;

export default config;
