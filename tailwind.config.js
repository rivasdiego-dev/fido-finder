/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  darkMode: ["class", `[data-theme="dark"]`],
  plugins: [nextui({
    addCommonColors: true,
    themes: {
      dark: {
        extend: 'dark',
        colors: {
          primary: {
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
            'DEFAULT': '#4285F4',
            foreground: "#EEEEEE",
          },
          secondary: {
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
            DEFAULT: '#3991A1',
            foreground: "#EEEEEE",
          },
          danger: {
            '50': '#fdf3f3',
            '100': '#fce4e4',
            '200': '#facece',
            '300': '#f5acac',
            '400': '#ed7c7c',
            '500': '#e25151',
            '600': '#ce3434',
            '700': '#a32626',
            '800': '#8f2525',
            '900': '#772525',
            DEFAULT: '#a32626',
            foreground: "#EEEEEE",
          }
        }
      }
    }
  })],

}

