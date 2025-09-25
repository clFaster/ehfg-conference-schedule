/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sailec', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'background-dark': 'rgba(16,16,65,1)',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(40px) scale(0.94)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        countdownPulse: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
            textShadow: '0 0 20px rgba(251, 191, 36, 0.4)',
          },
          '50%': {
            opacity: '0.75',
            transform: 'scale(1.08)',
            textShadow: '0 0 30px rgba(251, 191, 36, 0.7)',
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scrollHorizontal: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        countdownPulse: 'countdownPulse 2.5s ease-in-out infinite',
        gradientShift: 'gradientShift 5s ease-in-out infinite',
        'scroll-horizontal': 'scrollHorizontal 15s linear infinite',
      },
      backgroundSize: {
        200: '200% 200%',
      },
    },
  },
  plugins: [],
};
