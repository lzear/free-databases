export const DataProviders = {
  planetscale: 'PlanetScale',
  supabase: 'Supabase',
  cookie: 'Cookie',
  'fly-io': 'Fly.io',
  vercel: 'Vercel',
  fauna: 'FaunaDB',
  turso: 'Turso',
  railway: 'Railway',
  aiven: 'Aiven',
  cockroach: 'CockroachDB',
  neon: 'Neon',
  elephant: 'Elephant',
  upstash: 'Upstash',
} as const

export type DataProviderSlug = keyof typeof DataProviders

export const isDataProviderSlug = (slug: unknown): slug is DataProviderSlug =>
  typeof slug === 'string' && Object.keys(DataProviders).includes(slug)
