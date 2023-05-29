import React from 'react'

import type { DatabaseSlug } from './databases'
import { aiven } from './databases/aiven'
import { bitio } from './databases/bitio'
import { cockroach } from './databases/cockroach'
import { convex } from './databases/convex'
import { cookie } from './databases/cookie'
import { deta } from './databases/deta'
import { elephant } from './databases/elephant'
import { fauna } from './databases/fauna'
import { flyio } from './databases/fly-io'
import { neon } from './databases/neon'
import { planetscale } from './databases/planetscale'
import { railway } from './databases/railway'
import { supabase } from './databases/supabase'
import { tidbcloud } from './databases/tidbcloud'
import { turso } from './databases/turso'
import { upstash } from './databases/upstash'
import { vercel } from './databases/vercel'
import { yugabyte } from './databases/yugabyte'
import type { ServerImplementation } from './todos-server/type'

export type TodoProvider = {
  name: string
  slug: DatabaseSlug
  icon: string
  description: React.ReactNode
  server?: ServerImplementation | undefined
}

export const todoProvidersArray = [
  cookie,
  planetscale,
  supabase,
  flyio,
  vercel,
  fauna,
  turso,
  railway,
  aiven,
  cockroach,
  neon,
  elephant,
  upstash,
  yugabyte,
  tidbcloud,
  convex,
  deta,
  bitio,
] as const

export const todoProviders = Object.fromEntries(
  todoProvidersArray.map((p) => [p.slug, p]),
) satisfies Record<string, TodoProvider> as Record<DatabaseSlug, TodoProvider>
