import type { MetadataRoute } from 'next';

import { host } from '@/app.config';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    disallow: '/',
  },
  sitemap: `${host}/sitemap.xml`,
});

export default robots;
