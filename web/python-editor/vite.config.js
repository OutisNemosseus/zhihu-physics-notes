import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: '../../docs/assets/python-editor',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        editor: resolve(import.meta.dirname, 'index.html'),
        compare: resolve(import.meta.dirname, 'compare.html'),
      },
    },
    chunkSizeWarningLimit: 2500,
  },
});
