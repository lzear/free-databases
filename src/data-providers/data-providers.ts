export const DataProviders = {
  planetscale: 'PlanetScale',
  supabase: 'Supabase',
  cookie: 'Cookie',
  'fly-io': 'Fly.io',
  vercel: 'Vercel',
  fauna: 'FaunaDB',
} as const

export type DataProviderSlug = keyof typeof DataProviders

export const isDataProviderSlug = (slug: unknown): slug is DataProviderSlug =>
  typeof slug === 'string' && Object.keys(DataProviders).includes(slug)
