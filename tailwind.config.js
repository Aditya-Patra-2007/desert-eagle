/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        desert: {
          beige: '#F5E6D3',
          sandy: '#E8D5B7',
          tan: '#D4C4A8',
          green: '#8B9A5B',
          'green-dark': '#6B7A4A',
          gold: '#D4AF37',
          'gold-dark': '#B8941F',
        },
      },
    },
  },
  plugins: [],
}

