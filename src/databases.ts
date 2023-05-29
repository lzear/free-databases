export const Databases = {
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
  yugabyte: 'Yugabyte',
  tidbcloud: 'TiDB Cloud',
  convex: 'Convex',
  deta: 'Deta',
  'bit-io': 'Bit.io',
} as const

export type DatabaseSlug = keyof typeof Databases

export const isDatabaseSlug = (slug: unknown): slug is DatabaseSlug =>
  typeof slug === 'string' && Object.keys(Databases).includes(slug)
