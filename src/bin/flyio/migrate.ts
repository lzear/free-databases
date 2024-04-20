import path from 'node:path'
import url from 'node:url'

import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import pkg from 'pg'

const { Client } = pkg

console.log('Migrating...')

const migrationsFolder = path.join(
  url.fileURLToPath(import.meta.url),
  '../../../..',
  '/drizzle',
)

const pool = new Client(process.env.FLYIO_POSTGRES_URL)

// @ts-expect-error top level await
await migrate(drizzle(pool), {
  migrationsFolder,
})

console.log('Migration completed.')
