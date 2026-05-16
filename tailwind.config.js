/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a90e2',
        secondary: '#6c5ce7',
        accent: '#00cec9',
        danger: '#ff7675',
        success: '#55efc4',
        warning: '#ffeaa7',
      }
    },
  },
  plugins: [],
}
