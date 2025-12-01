/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ABC Diatype', 'sans-serif'],
      },
      colors: {
        janta: {
          brown: '#482b22',
          dark: '#282828',
          cream: '#f9f8f6',
          orange: '#E73E07',
          yellow: '#FEDC59',
        },
      },
    },
  },
  plugins: [],
}
