export const DataProviders = {
  PlanetScale: 'PlanetScale',
  Supabase: 'Supabase',
} as const

export type DataProvider = keyof typeof DataProviders
