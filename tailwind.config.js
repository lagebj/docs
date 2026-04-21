/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx,md,mdx,html}'],
  theme: {
    extend: {
      colors: {
        'gs-brand-blue': '#1e40af',
        'gs-brand-slate': '#334155',
        'gs-border-muted': 'rgba(51, 65, 85, 0.2)',
      },
      boxShadow: {
        'gs-chrome': '0 14px 34px rgba(30, 64, 175, 0.12)',
      },
      spacing: {
        'vertical': 'clamp(2.5rem, 2rem + 1vw, 3.5rem)',
      },
    },
  },
  plugins: [],
}