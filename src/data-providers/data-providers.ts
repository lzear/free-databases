export const DataProviders = {
  PlanetScale: 'PlanetScale',
} as const

export type DataProvider = keyof typeof DataProviders
