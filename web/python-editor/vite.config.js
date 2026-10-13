import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: '../../docs/assets/python-editor',
    emptyOutDir: true,
    chunkSizeWarningLimit: 2500,
  },
});
