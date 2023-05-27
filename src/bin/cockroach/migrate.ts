#!/usr/bin/env node --loader ts-node/esm --es-module-specifier-resolution=node --no-warnings

import path from 'node:path'
import url from 'node:url'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

console.log('Migrating...')

if (!process.env.COCKROACH_POSTGRES_URL)
  throw new Error('Missing COCKROACH_POSTGRES_URL')

const migrationClient = postgres(process.env.COCKROACH_POSTGRES_URL, { max: 1 })

const migrationsFolder = path.join(
  url.fileURLToPath(import.meta.url),
  '../../../..',
  '/drizzle',
)

// @ts-ignore
await migrate(drizzle(migrationClient), { migrationsFolder })

console.log('Migration completed.')
