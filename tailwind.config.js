/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B',
        },
        teal: {
          DEFAULT: '#00B4D8',
          accent: '#48CAE4',
          dark: '#0077B6', // AA-contrast teal for text on light backgrounds
        }
      }
    },
  },
  plugins: [],
}