#!/usr/bin/env node --loader ts-node/esm --es-module-specifier-resolution=node --no-warnings

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

const pool = new Pool({
  host: `${process.env.FLYIO_POSTGRES_HOST}`,
  user: process.env.FLYIO_POSTGRES_USER,
  password: process.env.FLYIO_POSTGRES_PASSWORD,
  max: 1,
})

// @ts-ignore
await migrate(drizzle(pool), {
  migrationsFolder,
})

console.log('Migration completed.')
