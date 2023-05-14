export const DataProviders = {
  PlanetScale: 'PlanetScale',
  Supabase: 'Supabase',
  Cookie: 'Cookie',
} as const

export type DataProvider = keyof typeof DataProviders
