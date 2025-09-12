/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#284738',
        foreground: '#FBFEFB',
        primary: '#5F9770',
        secondary: '#A24759',
        accent: '#F7E6A1'
      },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
    },
      fontFamily: {
        'fraunces': ['Fraunces', 'serif'],
        'questrial': ['Questrial', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Questrial', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
