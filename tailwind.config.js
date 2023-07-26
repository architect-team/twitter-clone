/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#c6ecc9',
          200: '#a1e0a6',
          300: '#78d581',
          400: '#55cb64',
          500: '#2dc147',
          600: '#21b13e',
          700: '#0d9e31',
          800: '#008d26',
          900: '#006d12',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
