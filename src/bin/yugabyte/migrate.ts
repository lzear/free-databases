import path from 'node:path'
import url from 'node:url'

import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import pkg from 'pg'

const { Pool } = pkg

console.log('Migrating...')

const migrationsFolder = path.join(
  url.fileURLToPath(import.meta.url),
  '../../../..',
  '/drizzle',
)

const c = {
  host: process.env.YUGABYTE_POSTGRES_HOST,
  user: process.env.YUGABYTE_POSTGRES_USER,
  database: 'yugabyte',
  port: 5433,
  password: process.env.YUGABYTE_POSTGRES_PASSWORD,
  max: 1,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.YUGABYTE_POSTGRES_CA_CERT,
  },
}

const pool = new Pool(c)

// @ts-expect-error top level await
await migrate(drizzle(pool), {
  migrationsFolder,
})

console.log('Migration completed.')
