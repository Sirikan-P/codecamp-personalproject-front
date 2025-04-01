/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // This completely replaces the default 'sans' with your Google Font
      'sans': ['Montserrat',  'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

