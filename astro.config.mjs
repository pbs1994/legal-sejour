import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://legal-sejour.fr',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
});
