/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('../public/heroImage.jpg')",
        'profile-image01': "url('../public/profile01.jpg')",
        'profile-image02': "url('../public/profile02.jpg')",
      },
    },
  },
  plugins: [],
}
