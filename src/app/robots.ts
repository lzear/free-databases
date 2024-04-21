import { MetadataRoute } from 'next'

import { FREE_DATABASES_URL } from '@/site-data'

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: '*', allow: '/' },
  sitemap: `${FREE_DATABASES_URL}/sitemap.xml`,
})

export default robots
