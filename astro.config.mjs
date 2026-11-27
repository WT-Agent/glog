// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';
import remarkEntityLinks from './src/plugins/remark-entity-links.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://geniux.net',
  output: 'server',
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkEntityLinks],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  image: {
    domains: ['images.unsplash.com'],
  },
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});