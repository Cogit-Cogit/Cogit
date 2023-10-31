/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        primary: '#C3D9FB',
        disabled: '#9CA2AA',
        background: '#F0F7FF',
        hover: '#619FFF',
        warning: '#FF6161',
      },
      borderRadius: {
        small: '10px',
        medium: '20px',
        large: '30px',
      },
    },
  },
  plugins: [],
};
