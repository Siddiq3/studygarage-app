/** @type {import('tailwindcss').Config} */
const nativewindTheme = require('./theme/nativewind.config');

module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      ...(nativewindTheme?.theme?.extend || {}),
      borderRadius: {
        sg: '20px',
        'sg-xl': '24px',
        'sg-2xl': '28px',
      },
      fontSize: {
        'sg-display': ['36px', { lineHeight: '42px' }],
        'sg-h1': ['30px', { lineHeight: '36px' }],
        'sg-title': ['20px', { lineHeight: '26px' }],
        'sg-body': ['16px', { lineHeight: '23px' }],
        'sg-caption': ['13px', { lineHeight: '18px' }],
      },
    },
  },
  plugins: [],
};
