import type { MetadataRoute } from 'next';

import { host } from '@/app.config';
import { ROUTE } from '@/routes';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: `${host}/${ROUTE.SERVER_LIST}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
];

export default sitemap;
