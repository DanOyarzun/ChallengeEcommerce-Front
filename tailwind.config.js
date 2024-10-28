/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    safelist: ['animate-[fade-in-up_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]'],
    extend: {},
  },
  plugins: [],
}

