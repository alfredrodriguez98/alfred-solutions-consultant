import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        // Theme-switching tokens via CSS variables (no opacity modifier needed)
        background: 'var(--bg)',
        foreground: 'var(--foreground)',
        muted:      'var(--muted)',
        // Accent: hardcoded so Tailwind opacity modifiers work (e.g. border-accent/30)
        accent: {
          DEFAULT: '#4f8ef7',
          violet:  '#7c6ff7',
          purple:  '#a855f7',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          hover:   'rgba(255,255,255,0.07)',
        },
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px currentColor' },
          '50%':       { opacity: '0.5', boxShadow: '0 0 2px currentColor' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.9s cubic-bezier(0.19,1,0.22,1) forwards',
        'marquee':  'marquee 30s linear infinite',
        'pulse2':   'pulse2 1.5s infinite',
        'spin-slow':'spinSlow 1.2s linear infinite',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}

export default config
