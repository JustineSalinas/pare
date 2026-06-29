/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#dfc07a',
          dark: '#9a7b36',
        },
        dark: {
          DEFAULT: '#111111',
          2: '#1a1a1a',
          3: '#242424',
        },
        border: '#2e2e2e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.4em',
      },
    },
  },
  plugins: [],
}
