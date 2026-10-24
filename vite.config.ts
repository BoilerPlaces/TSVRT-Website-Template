import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';
import { join } from 'path';

const root = __dirname;
const srcRoot = join(__dirname, 'src');
const outDir = join(root, 'dist');

export default defineConfig(({ command }) => ({
  root,
  base: command === 'build' ? '/TSVRT-Website-Template/' : '/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      apply: 'build',
      closeBundle() {
        copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'));
      }
    }
  ],
  resolve: {
    alias: {
      '@': srcRoot,
      '/@': srcRoot
    }
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: { external: [''] }
  },
  server: {
    port: 3000
  }
}));
