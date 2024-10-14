import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "main-1" : "#bf3919",
      "main-2": "#f8f8f8",
      "secondary-1": "#a5672f",
      "secondary-2": "#48666a",
      "accent-1": "#c1cdbf",
      "accent-2": "#818a3a"
    },
    fontFamily: {
      "titles": ['Oswald', 'ui-serif'],
      "body-text": ['Montserrat', 'ui-sans-serif'],
      "display" :['Oswald', 'ui-serif']
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
