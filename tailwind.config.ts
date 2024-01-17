import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        grey: {
          '200': 'oklch(97.91% 0 0)', // #f8f8f8 - extended/grey/lightest
          '300': 'oklch(93.13% 0.001 286.37)', // #e8e8e9 - extended/grey/lighter
          '500': 'oklch(78.9% 0.004 271.36)', // #b9babd - text/grey-base
          '600': 'oklch(64% 0.008 268.51)', // #8a8c91 - text/grey-dark
        },
        neutral: {
          '300': 'oklch(83.57% 0.003 264.54)', // #c8c9cb - core/neutral/neutral-300
          '700': 'oklch(42.59% 0.013 280.15)', // #4d4e56 - core/neutral/neutral-700
          '800': 'oklch(36.17% 0.012 279.31)', // #3C3D44 - core/neutral/neutral-800
          '950': 'oklch(29.09% 0.013 279.13)', // #2A2B32 - text/text-primary
        },
        blue: {
          '50': 'oklch(97.45% 0.008 253.85)', // #f3f7fc - core/blue/blue-0
          '400': 'oklch(64.32% 0.19 261.38)', // #4687ff - primary/blue-base
          '500': 'oklch(67.55% 0.162 267.48)', // 6b90fa - core/blue/blue-500
          '600': 'oklch(56.44% 0.24 268.30)', // 3E5FFF - core/blue/blue-600
          '700': 'oklch(44.97% 0.22 267.56)', // #243dcc - core/blue/blue-700
        },
        red: {
          '500': 'oklch(66.43% 0.20 17.51)', // #f64f64 - primary/red/base
          '600': 'oklch(58.56% 0.22 20.59)', // #e21c3e
          '700': 'oklch(51.43% 0.20 20.13)', // #bf1133
        },

        black: 'oklch(35.51% 0.013 261.73)', // #383c43 - text/grey-darkest
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      fontSize: {
        xs: ['0.75rem', '1.125rem'],
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        md: ['1.25rem', '1.75rem'],
        lg: ['1.75rem', '2.5rem'],
        xl: ['2rem', '2.75rem'],
        '2xl': ['3rem', '4rem'],
      },
      letterSpacing: {
        tightest: '-0.96px',
        tighter: '-0.64px',
        tight: '-0.56px',
        thin: '-0.4px',
      },
      boxShadow: {
        sm: '0px 8px 14px 0px rgba(21, 24, 35, 0.15), 0px 0px 0px 0px rgba(21, 24, 35, 0.07), 0px 15px 20px 0px rgba(21, 24, 35, 0.00)',
        base: '0px 15px 20px 0px rgba(55, 59, 66, 0.12), 0px 0px 0px 0px rgba(55, 59, 66, 0.07)',
      },
    },
  },
  plugins: [],
};
export default config;
