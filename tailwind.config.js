/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f0f1a',
        surface: '#1a1a2e',
        accent: '#3b82f6',
        text: '#ffffff',
        muted: '#94a3b8',
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [],
};
