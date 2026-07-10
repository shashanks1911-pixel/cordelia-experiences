import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// On GitHub Pages the app is served from /cordelia-experiences/, so production
// asset paths must be prefixed. Local dev and tests stay at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/cordelia-experiences/' : '/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}));
