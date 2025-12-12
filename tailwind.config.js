/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF3E1',       // Light Cream (Background)
          card: '#F5E7C6',     // Sand (Cards/Secondary)
          accent: '#FF6D1F',   // Orange (Buttons/Highlights)
          dark: '#222222',     // Black (Text)
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'], // Added sans for UI elements
      }
    },
  },
  plugins: [],
}