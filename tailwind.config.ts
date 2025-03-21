import type { Config } from 'tailwindcss';
// import colors from 'tailwindcss/colors';
// Custom colors with opacity variants
const customColors = {
  'red-nav': 'hsl(var(--red-nav))',
  'red-highlight': 'hsl(var(--red-highlight))',
  'yellow-highlight': 'hsl(var(--yellow-highlight))',
  'peach-highlight': 'hsl(var(--peach-highlight))',
  'green-highlight': 'hsl(var(--green-highlight))',
  'brown-leaf': 'hsl(var(--brown-leaf))',
  'yellow-background': 'hsl(var(--yellow-background))',
};

const opacityVariants = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const generateOpacityVariants = (colors: Record<string, string>) => {
  const variants: Record<string, string> = {};
  Object.keys(colors).forEach((color) => {
    opacityVariants.forEach((opacity) => {
      variants[`${color}/${opacity}`] =
        `hsla(var(--${color}), ${opacity / 100})`;
    });
  });
  return variants;
};

// const {
//   default: flattenColorPalette,
// } = require('tailwindcss/lib/util/flattenColorPalette');

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...customColors,
        ...generateOpacityVariants(customColors),

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        // // Custom colors
        // 'red-nav': 'hsl(var(--red-nav))',
        // 'red-highlight': 'hsl(var(--red-highlight))',
        // 'yellow-highlight': 'hsl(var(--yellow-highlight))',
        // 'peach-highlight': 'hsl(var(--peach-highlight))',
        // 'green-highlight': 'hsl(var(--green-highlight))',
        // 'brown-leaf': 'hsl(var(--brown-leaf))',
        // 'yellow-background': 'hsl(var(--yellow-background))',
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

// function addVariablesForColors({ addBase, theme }: any) {
//   let allColors = flattenColorPalette(theme('colors'));
//   let newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
//   );

//   addBase({
//     ':root': newVars,
//   });
// }
