/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunset-orange': '#F2994A',
        coral: '#E8907E',
        rose: '#EC5F8B',
        magenta: '#D6336C',
        berry: '#9C1F5A',
        cream: '#FDF7F4',
        blush: '#FBE9E4',
        ink: '#1F1A1C',
        muted: '#6B5E62',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'signature-gradient': 'linear-gradient(120deg, #F2994A 0%, #EC5F8B 50%, #D6336C 100%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
