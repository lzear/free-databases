export const Databases = {
  aiven: 'Aiven',
  'bit-io': 'Bit.io',
  cockroach: 'CockroachDB',
  convex: 'Convex',
  cookie: 'Cookie',
  cosmosdb: 'Cosmos DB',
  deta: 'Deta',
  elephant: 'Elephant',
  fauna: 'FaunaDB',
  firebase: 'Firebase',
  'fly-io': 'Fly.io',
  koyeb: 'Koyeb',
  mongodb: 'MongoDB Atlas',
  neon: 'Neon',
  planetscale: 'PlanetScale',
  railway: 'Railway',
  supabase: 'Supabase',
  tidbcloud: 'TiDB Cloud',
  tembo: 'Tembo',
  turso: 'Turso',
  upstash: 'Upstash',
  vercel: 'Vercel',
  xata: 'Xata',
  yugabyte: 'Yugabyte',
} as const

export type DatabaseSlug = keyof typeof Databases

export const isDatabaseSlug = (slug: unknown): slug is DatabaseSlug =>
  typeof slug === 'string' && Object.keys(Databases).includes(slug)
