/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      colors: {
        background : 'rgb(var(--background))',
        foreground: "rgb(var(--foreground))",
        muted: "rgb(var(--muted))",  // Fixed typo
        accent: "rgb(var(--accent))", // Fixed typo
      },
      animation :{
        'spin-slow': 'spin 40s linear infinite',
      },
      screens: {
        xs : '480px'
      }
    },
  },
  plugins: [],
};
