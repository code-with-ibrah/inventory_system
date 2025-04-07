/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
        '4xl': '1920px',
        '5xl': '2180px',
      },
      colors: {
        // 'app-red': '#E65C4FFF',
        'app-red': '#223D80',
        'app-yellow': '#FFC107',
        'midnight-blue': '#00004B',
        'sky-blue': '#61CBF4',
        'light-gray': '#F2F3F4',
      },
      backgroundImage: {
        'login-bg': "url('/src/assets/images/final-bg.jpg')",
        'drone': "url('/src/assets/images/drone.jpg')",
      }
    },
  },
  plugins: [],
}

