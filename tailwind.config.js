/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vellora: {
          bg: '#0A0C0E',
          'bg-secondary': '#111418',
          'bg-tertiary': '#181C22',
          glass: 'rgba(22, 26, 33, 0.65)',
          'glass-hover': 'rgba(30, 35, 45, 0.75)',
          elevated: 'rgba(35, 41, 53, 0.85)',
          gold: '#E0A82E',
          'gold-glow': 'rgba(224, 168, 46, 0.15)',
          emerald: '#4E9F70',
          amethyst: '#8B7BB8',
          crimson: '#D9534F',
          text: '#F3F4F6',
          'text-secondary': '#9CA3AF',
          'text-muted': '#6B7280',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-medium': 'rgba(255, 255, 255, 0.15)',
          // Stat card accents
          statYellow: '#FCD34D',
          statOrange: '#FB923C',
          statPurple: '#C084FC',
          statGreen: '#4ADE80',
          statCyan: '#38BDF8',
          // Iridescent edge tokens
          ice: '#93C5FD',
          lavender: '#C4B5FD',
          violet: '#A78BFA',
          silver: '#E2E8F0',
          champagne: '#FDE68A',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        reader: ['Merriweather', 'serif'],
        literata: ['Literata', 'serif'],
      },
      backdropBlur: {
        glass: '20px',
        atmospheric: '40px',
        liquid: '28px',
      },
      borderRadius: {
        'vellora-lg': '18px',
        'liquid-panel': '26px',
      },
      boxShadow: {
        'vellora-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'vellora-glow': '0 0 25px rgba(224, 168, 46, 0.25)',
        'liquid-card': '0 16px 40px -8px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.16)',
        'liquid-hover': '0 22px 50px -10px rgba(0, 0, 0, 0.65), 0 0 20px 0 rgba(196, 181, 253, 0.12), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.28)',
        'liquid-gold': '0 8px 24px -4px rgba(224, 168, 46, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.75)',
      }
    },
  },
  plugins: [],
}
