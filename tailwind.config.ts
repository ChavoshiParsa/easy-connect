import type { Config } from 'tailwindcss';

const colorClasses = [
  'sky',
  'blue',
  'cyan',
  'emerald',
  'lime',
  'indigo',
  'violet',
  'pink',
  'rose',
  'orange',
  'amber',
  'red',
  'teal',
  'green',
  'purple',
];

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    ...colorClasses.map((color) => `from-${color}-500 to-${color}-300`),
  ],
  theme: {
    extend: {},
  },
};
export default config;
