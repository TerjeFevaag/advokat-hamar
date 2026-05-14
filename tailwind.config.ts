import type { Config } from 'tailwindcss'
import theme from './content/theme.json'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: theme.colors.navy,
          dark: theme.colors.navyDark,
          light: theme.colors.navyLight,
        },
        gold: {
          DEFAULT: theme.colors.gold,
          light: theme.colors.goldLight,
          dark: theme.colors.goldDark,
        },
        cream: theme.colors.cream,
        'light-bg': theme.colors.lightBg,
      },
      fontFamily: {
        serif: [theme.fonts.serif, 'Georgia', 'serif'],
        sans: [theme.fonts.sans, 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 5vw, 4.2rem)', { lineHeight: '1.1' }],
        'heading': ['clamp(2rem, 3.5vw, 2.8rem)', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'gold': theme.shadows.gold,
        'card': theme.shadows.card,
        'soft': theme.shadows.soft,
      },
    },
  },
  plugins: [],
}
export default config
