import type { MetadataRoute } from 'next'

import { shuffledProviders } from '@/app/shuffle-providers'
import { FREE_DATABASES_URL } from '@/site-data'

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: FREE_DATABASES_URL,
    priority: 1,
  },
  ...shuffledProviders
    .filter((tp) => tp.server)
    .map((tp) => ({
      url: `${FREE_DATABASES_URL}/${tp.slug}`,
      priority: 0.8,
    })),
]

export default sitemap
