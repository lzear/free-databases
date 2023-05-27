#!/usr/bin/env node --loader ts-node/esm --es-module-specifier-resolution=node --no-warnings

import { createClient } from '@libsql/client'

console.log('Migrating...')

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_SECRET_TOKEN)
  throw new Error('Missing TURSO_DATABASE_URL or TURSO_SECRET_TOKEN')

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_SECRET_TOKEN,
})

await client.execute(`

DROP TABLE IF EXISTS todos;

`)

await client.execute(`

CREATE TABLE \`todos\` (
    \`id\` text NOT NULL,
    \`created_at\` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
    \`updated_at\` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
    \`name\` text NOT NULL,
    \`done\` integer NOT NULL
);

`)

console.log('Migration complete.')
