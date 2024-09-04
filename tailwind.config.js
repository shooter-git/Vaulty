const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kali: {
          primary: '#0c0c0c',
          secondary: '#141414',
          text: '#ffffff',
          accent: '#0abdc6',
        },
        synthwave: {
          primary: '#2b213a',
          secondary: '#4c3a6d',
          text: '#ffffff',
          accent: '#ff00ff',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}