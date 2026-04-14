import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],      // 原 0.75rem → 0.875rem (+2級)
        'sm': ['1rem', { lineHeight: '1.5rem' }],           // 原 0.875rem → 1rem
        'base': ['1.125rem', { lineHeight: '1.75rem' }],    // 原 1rem → 1.125rem
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],       // 原 1.125rem → 1.25rem
        'xl': ['1.375rem', { lineHeight: '1.75rem' }],      // 原 1.25rem → 1.375rem
        '2xl': ['1.625rem', { lineHeight: '2rem' }],        // 原 1.5rem → 1.625rem
        '3xl': ['2rem', { lineHeight: '2.25rem' }],         // 原 1.875rem → 2rem
        '4xl': ['2.5rem', { lineHeight: '2.5rem' }],        // 原 2.25rem → 2.5rem
        '5xl': ['3.25rem', { lineHeight: '1' }],            // 原 3rem → 3.25rem
        '6xl': ['4rem', { lineHeight: '1' }],               // 原 3.75rem → 4rem
        '7xl': ['5rem', { lineHeight: '1' }],               // 原 4.5rem → 5rem
        '8xl': ['6.5rem', { lineHeight: '1' }],             // 原 6rem → 6.5rem
        '9xl': ['8.5rem', { lineHeight: '1' }],             // 原 8rem → 8.5rem
      },
      colors: {
        bg: {
          DEFAULT: '#eeeee8',
          card: '#f8f8f4',
          hover: '#f0f0ea',
        },
        teal: {
          DEFAULT: '#73c6cb',
          dk: '#107a7f',
          lt: '#96d5d9',
          faint: 'rgba(115,198,203,0.10)',
          line: 'rgba(115,198,203,0.25)',
          bg: '#e4f3f4',
        },
        txt: {
          1: '#1a3530',
          2: '#3d7a7e',
          3: '#8abfc2',
        },
        border: {
          DEFAULT: 'rgba(115,198,203,0.20)',
          hi: 'rgba(16,122,127,0.40)',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'serif'],
        en: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        widest2: '5px',
        widest3: '6px',
      },
    },
  },
} satisfies Config
