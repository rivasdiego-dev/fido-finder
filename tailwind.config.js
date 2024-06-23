/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        'b-primary': {
          '50': '#F3F6FC',
          '100': '#E5EDF9',
          '200': '#C6DAF1',
          '300': '#94BDE5',
          '400': '#5B9AD5',
          '500': '#4285F4',
          '600': '#2663A3',
          '700': '#1F4F85',
          '800': '#1E446E',
          '900': '#1B3554',
          '950': '#14263D',
          'DEFAULT': '#1F4F85'
        },
        'b-secondary': {
          '50': '#F1FAFA',
          '100': '#DBF0F2',
          '200': '#BBE1E6',
          '300': '#8BCBD5',
          '400': '#5EB1BF',
          '500': '#3991A1',
          '600': '#327688',
          '700': '#2E6170',
          '800': '#2D515D',
          '900': '#294550',
          '950': '#172D35',
          'DEFAULT': '#E3592D'
        },
        'b-base': {
          'bg': "#222831",
          'bg-800': "#13161B",
          'foreground': "#31363F",
          'text': "#EEEEEE",
          'text-200': "#A8A8A8",
        }
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

