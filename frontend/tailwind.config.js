/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGray: '#6d6e71',
      },
      backgroundColor: {
        bgNavbar: '#231F20',
        bgPrimary: '#d9edf7',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'winter', 'sunset'],
  },
}
