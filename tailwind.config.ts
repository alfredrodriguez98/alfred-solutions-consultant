import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', '"SF Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--foreground)',
        muted:      'var(--muted)',
        accent: {
          DEFAULT: '#4f8ef7',
          violet:  '#7c6ff7',
          purple:  '#a855f7',
          teal:    '#06b6d4',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          hover:   'rgba(255,255,255,0.07)',
        },
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.4' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to:   { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':       { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-up':   'fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards',
        'fade-in':   'fadeIn 0.5s cubic-bezier(0.23,1,0.32,1) forwards',
        'scale-in':  'scaleIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards',
        'marquee':   'marquee 28s linear infinite',
        'pulse2':    'pulse2 1.8s ease-in-out infinite',
        'spin-slow': 'spinSlow 1.2s linear infinite',
        'float':     'float 4s ease-in-out infinite',
        'shimmer':   'shimmer 2.5s linear infinite',
        'glow':      'glowPulse 3s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'expo':   'cubic-bezier(0.19, 1, 0.22, 1)',
        'smooth': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        'accent-sm': '0 0 20px rgba(79,142,247,0.18)',
        'accent-md': '0 0 40px rgba(79,142,247,0.28)',
        'accent-lg': '0 0 60px rgba(79,142,247,0.35)',
        'glass':     '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
        'card':      '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover':'0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #4f8ef7 0%, #7c6ff7 50%, #a855f7 100%)',
        'gradient-mesh':   'radial-gradient(at 40% 20%, #4f8ef720 0px, transparent 50%), radial-gradient(at 80% 0%, #7c6ff715 0px, transparent 50%), radial-gradient(at 0% 50%, #a855f710 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
