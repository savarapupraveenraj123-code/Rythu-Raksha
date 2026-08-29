/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#166534',
          'green-bright': '#22C55E',
          'green-soft': '#F0FDF4',
          'green-50': '#F0FDF4',
          'green-100': '#DCFCE7',
          'green-200': '#BBF7D0',
          'green-300': '#86EFAC',
          'green-400': '#4ADE80',
          'green-500': '#22C55E',
          'green-600': '#16A34A',
          'green-700': '#15803D',
          'green-800': '#166534',
          'green-900': '#14532D',
        },
        ink: '#111827',
        muted: '#6B7280',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(22, 101, 52, 0.06)',
        'card': '0 4px 24px rgba(22, 101, 52, 0.08)',
        'card-hover': '0 8px 32px rgba(22, 101, 52, 0.12)',
      },
    },
  },
  plugins: [],
};
