/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-green': '0 0 20px 10px rgba(84, 246, 165, 0.5)', // Your custom shadow
      },
    },
  },
  plugins: [],
}

