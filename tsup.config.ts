import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['react', 'react-dom'],
  target: 'es2019',
  esbuildOptions(options) {
    options.banner = {
      js: '/* ht-i18n — Kreyòl Ayisyen i18n for React | MIT | mrsaget2003 */',
    };
  },
});
