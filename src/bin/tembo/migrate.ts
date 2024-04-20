#!/usr/bin/env node --loader ts-node/esm --es-module-specifier-resolution=node --no-warnings

import path from 'node:path'
import url from 'node:url'

import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import pkg from 'pg'

dotenv.config({
  path: `${path.dirname(url.fileURLToPath(import.meta.url))}/../../../.env.local`,
})

const { Pool } = pkg

console.log('Migrating...')

const migrationsFolder = path.join(
  url.fileURLToPath(import.meta.url),
  '../../../..',
  '/drizzle',
)

const c = {
  connectionString: process.env.TEMBO_POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.TEMBO_POSTGRES_CA_CERT,
  },
}

const pool = new Pool(c)

// @ts-ignore
await migrate(drizzle(pool), {
  migrationsFolder,
})

console.log('Migration completed.')
