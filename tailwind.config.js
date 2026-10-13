/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#4F46E5',
          violet: '#7C3AED',
          lightIndigo: '#EEF2FF',
          navy: '#0F172A',
          bg: '#F8FAFC',
          amber: '#F59E0B',
          emerald: '#10B981',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'premium': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'elevated': '0 10px 30px -4px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
}
