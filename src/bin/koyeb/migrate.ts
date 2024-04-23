#!/usr/bin/env node

import path from 'node:path'
import * as process from 'node:process'
import * as Process from 'node:process'
import url from 'node:url'

import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

console.time('Migration')
console.log('Migrating...')

dotenv.config({
  path: `${path.dirname(url.fileURLToPath(import.meta.url))}/../../../.env.local`,
})

if (!process.env.KOYEB_POSTGRES_URL)
  throw new Error('Missing KOYEB_POSTGRES_URL')

const migrationClient = postgres(process.env.KOYEB_POSTGRES_URL, { max: 1 })

const migrationsFolder = path.join(
  url.fileURLToPath(import.meta.url),
  '../../../..',
  '/drizzle',
)

// @ts-expect-error top level await
await migrate(drizzle(migrationClient), { migrationsFolder })

console.log('Migration completed.')
console.timeEnd('Migration')

Process.exit()
