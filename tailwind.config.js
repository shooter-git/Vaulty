const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kali: {
          primary: '#0c0c0c',
          secondary: '#1E1E1E',
          text: '#00FF00',
          accent: '#00FF00',
        },
        synthwave: {
          primary: '#1f1b24',
          secondary: '#27212e',
          text: '#ffffff',
          accent: '#ff9ff3',
        },
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}