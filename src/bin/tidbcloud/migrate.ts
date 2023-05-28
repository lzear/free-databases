#!/usr/bin/env node --loader ts-node/esm --es-module-specifier-resolution=node --no-warnings

import path from 'node:path'
import url from 'node:url'

import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { type ConnectionOptions, createConnection } from 'mysql2'

console.log('Migrating...')

const migrationsFolder = path.join(
  url.fileURLToPath(import.meta.url),
  '../../../..',
  '/drizzle',
)

const config: ConnectionOptions = {
  // @ts-expect-error wrong types?
  uri: process.env.TIDBCLOUD_MYSQL_URL,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
}
const client = createConnection(config)

// @ts-ignore
await migrate(drizzle(client), {
  migrationsFolder,
})

console.log('Migration completed.')
