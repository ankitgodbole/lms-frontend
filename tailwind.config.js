import lineClamp from "@tailwindcss/line-clamp";
import daisyui from "daisyui";
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class" ,
  
  plugins: [lineClamp, daisyui],
});
