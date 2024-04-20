import path from 'node:path'
import url from 'node:url'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

console.log('Migrating...')

if (!process.env.ELEPHANT_POSTGRES_URL)
  throw new Error('Missing ELEPHANT_POSTGRES_URL')

const migrationClient = postgres(process.env.ELEPHANT_POSTGRES_URL, { max: 1 })

const migrationsFolder = path.join(
  url.fileURLToPath(import.meta.url),
  '../../../..',
  '/drizzle',
)

// @ts-expect-error top level await
await migrate(drizzle(migrationClient), { migrationsFolder })

console.log('Migration completed.')
