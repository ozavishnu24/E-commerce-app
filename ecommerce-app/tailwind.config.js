// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo
        secondary: '#10B981', // Emerald
        accent: '#F59E0B', // Amber
        dark: '#1F2937', // Gray-800
        light: '#F9FAFB', // Gray-50
      }
    },
  },
  plugins: [],
}