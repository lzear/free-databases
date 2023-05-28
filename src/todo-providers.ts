import type { Todo } from '@prisma/client'
import React from 'react'

import { DatabaseSlug } from './databases'
import { aiven } from './databases/aiven'
import { cockroach } from './databases/cockroach'
import { cookie } from './databases/cookie'
import { elephant } from './databases/elephant'
import { fauna } from './databases/fauna'
import { flyio } from './databases/fly-io'
import { neon } from './databases/neon'
import { planetscale } from './databases/planetscale'
import { railway } from './databases/railway'
import { supabase } from './databases/supabase'
import { turso } from './databases/turso'
import { upstash } from './databases/upstash'
import { vercel } from './databases/vercel'
import { yugabyte } from './databases/yugabyte'
import { ServerImplementation } from './todos-server/type'

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
] as const

export const todoProviders = Object.fromEntries(
  todoProvidersArray.map((p) => [p.slug, p]),
) satisfies Record<string, TodoProvider> as Record<DatabaseSlug, TodoProvider>
