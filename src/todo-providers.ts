import type { Todo } from '@prisma/client'
import React from 'react'

import { DataProviderSlug } from './data-providers'
import { aiven } from './data-providers/aiven'
import { cockroach } from './data-providers/cockroach'
import { cookie } from './data-providers/cookie'
import { elephant } from './data-providers/elephant'
import { fauna } from './data-providers/fauna'
import { flyio } from './data-providers/fly-io'
import { neon } from './data-providers/neon'
import { planetscale } from './data-providers/planetscale'
import { railway } from './data-providers/railway'
import { supabase } from './data-providers/supabase'
import { turso } from './data-providers/turso'
import { upstash } from './data-providers/upstash'
import { vercel } from './data-providers/vercel'
import { yugabyte } from './data-providers/yugabyte'

export type TodoProvider = {
  name: string
  slug: DataProviderSlug
  icon: string
  description: React.ReactNode
  isAvailable: boolean
  getTodos: (done: boolean) => Promise<Array<Todo>>
  create: (todoName: string) => Promise<any>
  deleteForever: (todoId: string) => Promise<any>
  rename: (todoId: string, name: string) => Promise<any>
  setDone: (todoId: string, value: boolean) => Promise<any>
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
) satisfies Record<string, TodoProvider> as Record<
  DataProviderSlug,
  TodoProvider
>
