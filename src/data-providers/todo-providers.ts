import type { Todo } from '@prisma/client'
import React from 'react'

import { aiven } from './aiven'
import { cockroach } from './cockroach'
import { cookie } from './cookie'
import { DataProviderSlug } from './data-providers'
import { elephant } from './elephant'
import { fauna } from './fauna'
import { flyio } from './fly-io'
import { neon } from './neon'
import { planetscale } from './planetscale'
import { railway } from './railway'
import { supabase } from './supabase'
import { turso } from './turso'
import { vercel } from './vercel'
import { upstash } from './upstash'

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
] as const

export const todoProviders = Object.fromEntries(
  todoProvidersArray.map((p) => [p.slug, p]),
) satisfies Record<string, TodoProvider> as Record<
  DataProviderSlug,
  TodoProvider
>
