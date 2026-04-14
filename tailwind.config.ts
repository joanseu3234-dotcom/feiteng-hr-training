import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8ec1ff",
          400: "#599dff",
          500: "#3278fb",
          600: "#1a57e6",
          700: "#1744bd",
          800: "#183b96",
          900: "#19366f",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "PingFang TC",
          "Microsoft JhengHei",
          "Noto Sans TC",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
