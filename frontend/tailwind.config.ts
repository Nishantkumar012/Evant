import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'neumorphic': '0 5px 15px rgba(0, 0, 0, 0.08), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
        'neumorphic-hover': '0 8px 25px rgba(0, 0, 0, 0.12), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
        'neumorphic-focus': '0 12px 35px rgba(0, 0, 0, 0.15), inset 0 1px 3px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
