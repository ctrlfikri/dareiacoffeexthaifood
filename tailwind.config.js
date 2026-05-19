/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,vue,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B0000',
        'primary-dark': '#550000',
        'primary-light': '#A31515',
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
        'gold-dark': '#9C7A28',
        cream: '#FDF6EC',
        'cream-dark': '#F5E6C8',
        charcoal: '#1A1008',
        'charcoal-light': '#2D1F0E',
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Sarabun', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        slideUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-8px)'
          }
        },
      },
    },
  },
  plugins: [],
}