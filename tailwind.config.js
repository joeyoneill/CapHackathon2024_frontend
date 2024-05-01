/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }, 
      colors: {
        capBlue: '#0070AD',
        capVibrantBlue: '#12ABDB',
        claytonDarkBlue: '#0063A0',
        claytonGreen: '#a0cf67',
        claytonDarkGreen: '#76a340',
      }
    },
  },
  plugins: [require("daisyui")],
}

