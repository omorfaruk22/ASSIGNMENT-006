import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './context/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { fit: { bg: '#07090a', panel: '#101316', panel2: '#14181b', line: '#242a2e', green: '#22c55e', muted: '#7d858b' } }, boxShadow: { glow: '0 0 0 1px rgba(34,197,94,.15), 0 14px 40px rgba(0,0,0,.35)' } } },
  plugins: []
};
export default config;
