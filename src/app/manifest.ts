import type { MetadataRoute } from 'next';

import { siteName, description } from '@/app.config';

const manifest = (): MetadataRoute.Manifest => ({
  name: siteName,
  short_name: siteName,
  description,
  start_url: '/',
  display: 'standalone',
  background_color: '#fff',
  theme_color: '#fff',
  icons: [
    {
      src: '/icon-192.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'maskable',
    },
    { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
  ],
});

export default manifest;
