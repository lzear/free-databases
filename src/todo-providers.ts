import React from 'react'

import type { DatabaseSlug } from './databases'
import { aiven } from './databases/aiven'
import { bitio } from './databases/bitio'
import { cockroach } from './databases/cockroach'
import { convex } from './databases/convex'
import { cookie } from './databases/cookie'
import { cosmosdb } from './databases/cosmosdb'
import { deta } from './databases/deta'
import { elephant } from './databases/elephant'
import { fauna } from './databases/fauna'
import { firebase } from './databases/firebase'
import { flyio } from './databases/fly-io'
import { koyeb } from './databases/koyeb'
import { mongodb } from './databases/mongodb'
import { neon } from './databases/neon'
import { planetscale } from './databases/planetscale'
import { pockethost } from './databases/pockethost'
import { railway } from './databases/railway'
import { supabase } from './databases/supabase'
import { tembo } from './databases/tembo'
import { tidbcloud } from './databases/tidbcloud'
import { turso } from './databases/turso'
import { upstash } from './databases/upstash'
import { vercel } from './databases/vercel'
import { xata } from './databases/xata'
import { yugabyte } from './databases/yugabyte'
import type { ServerImplementation } from './todos-server/type'

export type TodoProvider = {
  name: string
  slug: DatabaseSlug
  icon: string
  description: React.ReactNode
  server?: ServerImplementation | undefined
}
export type DeadProvider = {
  name: string
  slug: DatabaseSlug
  icon: string
  description: React.ReactNode
  dead: string | React.ReactNode
}

export const todoProvidersArrayWithoutCookie: TodoProvider[] = [
  // cookie,
  aiven,
  // bitio,
  cockroach,
  convex,
  // cosmosdb,
  deta,
  elephant,
  fauna,
  firebase,
  flyio,
  koyeb,
  mongodb,
  neon,
  // planetscale,
  pockethost,
  // railway,
  supabase,
  tidbcloud,
  tembo,
  turso,
  upstash,
  vercel,
  xata,
  yugabyte,
]

export const deadProviders: TodoProvider[] = [
  bitio,
  cosmosdb,
  planetscale,
  railway,
]

export const todoProviders = Object.fromEntries(
  [...todoProvidersArrayWithoutCookie, cookie].map((p) => [p.slug, p]),
) satisfies Record<string, TodoProvider> as Record<DatabaseSlug, TodoProvider>
