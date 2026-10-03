import type { Config } from 'tailwindcss'

/**
 * Chief of Sniff — design tokens.
 * These map 1:1 to the CSS variables in src/styles/tokens.css.
 * Use the semantic names (navy, blue, cheese…) everywhere; never hardcode hex.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0D1B2A', 2: '#122A45' },
        blue: { DEFAULT: '#0077E6', dark: '#0062BD', sky: '#4DA8FF' },
        cheese: { DEFAULT: '#F2C14E', soft: '#FBEBB9' },
        sage: { DEFAULT: '#F5F7F2', 2: '#EBEFE7' },
        line: '#D7DFD5',
        muted: '#5C6B62',
        wa: { DEFAULT: '#25D366', dark: '#1DA851' },
        chat: {
          bg: '#E4DDD3',
          in: '#FFFFFF',
          out: '#D6EAFF',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        card: '20px',
        xl2: '24px',
      },
      maxWidth: { content: '1180px' },
      boxShadow: {
        card: '0 14px 30px -18px rgba(13,27,42,.3)',
        phone: '0 30px 60px -20px rgba(13,27,42,.45), 0 0 0 1px rgba(0,0,0,.2)',
      },
      keyframes: {
        'bubble-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        blink: {
          '0%,80%,100%': { opacity: '.3' },
          '40%': { opacity: '1' },
        },
        sniff: {
          '0%,100%': { transform: 'none' },
          '15%': { transform: 'translateY(-1.5px) scale(1.08) rotate(-6deg)' },
          '35%': { transform: 'translateY(1px) scale(0.96) rotate(5deg)' },
          '55%': { transform: 'translateY(-1px) scale(1.06) rotate(-4deg)' },
          '75%': { transform: 'scale(1.02) rotate(2deg)' },
        },
      },
      animation: {
        'bubble-in': 'bubble-in .35s ease forwards',
        blink: 'blink 1.2s infinite',
        sniff: 'sniff .9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
