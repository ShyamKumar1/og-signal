import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://og-signal.netlify.app',
  integrations: [sitemap({ filter: (page) => !page.includes('/api/') && !page.includes('/editions') })],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  markdown: { shikiConfig: { theme: 'github-light', wrap: true } },
});
