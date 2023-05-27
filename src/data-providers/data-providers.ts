export const DataProviders = {
  planetscale: 'PlanetScale',
  supabase: 'Supabase',
  cookie: 'Cookie',
} as const

export type DataProviderSlug = keyof typeof DataProviders

export const isDataProviderSlug = (slug: unknown): slug is DataProviderSlug =>
  typeof slug === 'string' && Object.keys(DataProviders).includes(slug)
