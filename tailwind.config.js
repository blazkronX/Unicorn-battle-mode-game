/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Unicorn themed colors
        'unicorn': {
          'pink': '#FF69B4',
          'purple': '#9370DB',
          'blue': '#87CEEB',
          'lavender': '#E6E6FA',
          'gold': '#FFD700',
        },
        // Game specific colors
        'moon-pot': '#FFD700',
        'charlie-points': '#32CD32',
        'booster-glow': '#00FFFF',
        // Mode colors
        'funny-mode': '#FF6B9D',
        'hardcore-mode': '#DC2626',
        // Battle states
        'victory': '#10B981',
        'defeat': '#EF4444',
        'waiting': '#F59E0B',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'card-flip': 'card-flip 0.6s ease-in-out',
        'battle-shake': 'battle-shake 0.5s ease-in-out',
        'rainbow-spin': 'rainbow-spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        'battle-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'rainbow-spin': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      backgroundImage: {
        'rainbow-gradient': 'linear-gradient(45deg, #FF69B4, #9370DB, #87CEEB, #32CD32, #FFD700)',
        'unicorn-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      },
      boxShadow: {
        'unicorn-glow': '0 0 20px rgba(255, 105, 180, 0.5)',
        'booster-glow': '0 0 15px rgba(0, 255, 255, 0.6)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.2)',
      },
      screens: {
        'xs': '375px',
        'telegram': '414px',
      },
      fontFamily: {
        'game': ['Inter', 'system-ui', 'sans-serif'],
        'unicorn': ['Comic Sans MS', 'cursive'],
      },
    },
  },
  plugins: [],
}