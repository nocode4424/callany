/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Onest', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f3eaf7',
          100: '#e6d5ef',
          200: '#d0b0e1',
          300: '#b98ad3',
          400: '#a364c4',
          500: '#8d3fb6',
          600: '#712e94',
          700: '#5D2586', // Purple
          800: '#4a1c6a',
          900: '#36144e',
          950: '#230d32',
        },
        secondary: {
          50: '#e9f7eb',
          100: '#d3efd7',
          200: '#a7dfb0',
          300: '#7bcf89',
          400: '#50B848', // Kelly Green
          500: '#3e9836',
          600: '#327a2c',
          700: '#265c21',
          800: '#1a3e17',
          900: '#0d1f0c',
          950: '#060f06',
        },
        tertiary: {
          50: '#fef1e7',
          100: '#fde3ce',
          200: '#fbc89d',
          300: '#faad6c',
          400: '#F98128', // Tangerine Orange
          500: '#f76506',
          600: '#c65105',
          700: '#953d04',
          800: '#632802',
          900: '#311401',
          950: '#190a01',
        },
      },
      animation: {
        'scroll-up': 'scrollUp 25s linear infinite',
      },
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};