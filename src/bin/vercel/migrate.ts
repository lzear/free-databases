#!/usr/bin/env node --loader ts-node/esm --es-module-specifier-resolution=node --no-warnings

import { createPool, db } from '@vercel/postgres'

console.log('Migrating...')

const client = await createPool({
  connectionString: process.env.VERCEL_POSTGRES_URL,
})

await client.sql`

DROP TABLE IF EXISTS "todos";

CREATE TABLE IF NOT EXISTS "todos" (
    "id" text PRIMARY KEY NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "name" text NOT NULL,
    "done" boolean NOT NULL
);
`

console.log('Migration complete.')
