/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F2EC',
          light: '#FAF8F5',
          dark: '#ECE7DD',
        },
        beige: {
          DEFAULT: '#E5DED2',
          light: '#EEE9E0',
          dark: '#D8CFBF',
        },
        taupe: {
          DEFAULT: '#A18F7A',
          light: '#BAAC9A',
          dark: '#84735E',
          deep: '#695A48',
        },
        charcoal: {
          DEFAULT: '#292824',
          dark: '#242421',
          deeper: '#1A1A18',
          surface: '#33322E',
        },
        warmgrey: {
          DEFAULT: '#77736B',
          light: '#9E9A92',
          dark: '#58554F',
        },
        border: {
          subtle: '#E4DDD1',
          medium: '#D1C8B9',
          dark: '#3A3935',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest_architect: '0.2em',
        ultra: '0.28em',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '16/10': '16 / 10',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      }
    },
  },
  plugins: [],
}
